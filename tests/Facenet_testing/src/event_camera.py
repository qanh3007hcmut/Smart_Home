import cv2
import numpy as np
import os
import time
import argparse
from datetime import datetime
import mediapipe as mp
from sort import Sort 
from ultralytics import YOLO
import torch

class EventDetectionCamera:
    def __init__(self, video_source=0, output_path=None, detect_types=None):
        """Initialize the event detection camera"""
        self.video_path = video_source
        self.output_path = output_path
        self.detect_types = detect_types if detect_types else ["motion", "fall"]
        
        # Create output directories
        os.makedirs('events', exist_ok=True)
        os.makedirs('video', exist_ok=True)
        
        # Initialize motion detection variables
        self.previous_frame = None
        self.motion_threshold = 200
        self.last_motion_time = 0
        
        # Initialize YOLOv8 pose model
        model_path = "models/yolov8n-pose.pt"
        self.pose_model = YOLO(model_path)
        
        # Initialize SORT tracker for consistent person tracking
        self.tracker = Sort(max_age=30, min_hits=3, iou_threshold=0.3)
        
        # Fall detection parameters
        self.fall_records = {}  # Track people for fall detection
        self.fall_speed_threshold = 15  # px/s - vertical movement threshold
        self.fall_window = 1.0  # seconds to analyze for fall
        
        # Video recording parameters
        self.fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        self.out = None
        self.event_out = None
        self.recording_event = False
        self.recording_start_time = 0
        self.recording_duration = 10  # seconds
        
        # Pose keypoints parameters
        self.keypoint_names = [
            "nose", "left_eye", "right_eye", "left_ear", "right_ear",
            "left_shoulder", "right_shoulder", "left_elbow", "right_elbow",
            "left_wrist", "right_wrist", "left_hip", "right_hip",
            "left_knee", "right_knee", "left_ankle", "right_ankle"
        ]
    
    def setup_video_output(self, cap):
        """Set up video writer if needed"""
        if self.output_path:
            frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
            frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
            fps = cap.get(cv2.CAP_PROP_FPS)
            if fps <= 0:
                fps = 30.0
            self.out = cv2.VideoWriter(self.output_path, self.fourcc, fps, (frame_width, frame_height))
            return True
        return False
    
    def detect_motion(self, frame, person_boxes):
        """Detect human motion in frame using background subtraction and YOLOv8 pose detection"""
        # Convert frame to grayscale
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        gray = cv2.GaussianBlur(gray, (21, 21), 0)
        
        # Initialize previous frame if needed
        if self.previous_frame is None:
            self.previous_frame = gray
            return False, []
        
        # Calculate absolute difference between current and previous frame
        frame_diff = cv2.absdiff(self.previous_frame, gray)
        self.previous_frame = gray
        
        # Apply threshold to highlight differences
        thresh = cv2.threshold(frame_diff, 25, 255, cv2.THRESH_BINARY)[1]
        thresh = cv2.dilate(thresh, None, iterations=2)
        
        # Find contours of motion regions
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        motion_regions = []
        motion_detected = False
        
        # If we have detected people, check if they're moving
        if person_boxes and len(person_boxes) > 0:
            # Check each contour for overlap with any person box
            for contour in contours:
                if cv2.contourArea(contour) > self.motion_threshold:
                    (x, y, w, h) = cv2.boundingRect(contour)
                    
                    # Check if motion overlaps with any person
                    for box in person_boxes:
                        x1, y1, x2, y2 = box[:4]
                        # Check for overlap
                        if (x < x2 and x + w > x1 and y < y2 and y + h > y1):
                            motion_detected = True
                            motion_regions.append((x, y, w, h))
                            break
            
            # Also add the person bounding boxes to motion regions if motion is detected
            if motion_detected:
                for box in person_boxes:
                    x1, y1, x2, y2 = box[:4]
                    motion_regions.append((int(x1), int(y1), int(x2-x1), int(y2-y1)))
        
        return motion_detected, motion_regions
    
    def extract_pose_features(self, keypoints):
        """Extract key features from pose keypoints for fall detection"""
        # Check if all key keypoints are present
        if keypoints is None or len(keypoints) < 17:
            return None
        
        # Map keypoints to their names for easier access
        kp_dict = {self.keypoint_names[i]: keypoints[i] for i in range(len(self.keypoint_names))}
        
        # Extract key body points
        nose = kp_dict["nose"]
        left_shoulder = kp_dict["left_shoulder"]
        right_shoulder = kp_dict["right_shoulder"]
        left_hip = kp_dict["left_hip"]
        right_hip = kp_dict["right_hip"]
        left_ankle = kp_dict["left_ankle"]
        right_ankle = kp_dict["right_ankle"]
        
        # Calculate midpoints
        mid_shoulder_x = (left_shoulder[0] + right_shoulder[0]) / 2
        mid_shoulder_y = (left_shoulder[1] + right_shoulder[1]) / 2
        
        mid_hip_x = (left_hip[0] + right_hip[0]) / 2
        mid_hip_y = (left_hip[1] + right_hip[1]) / 2
        
        # Calculate body angles and proportions
        # Vertical angle (angle between shoulders and hips)
        vertical_angle = abs(np.arctan2(mid_hip_y - mid_shoulder_y, mid_hip_x - mid_shoulder_x) * 180 / np.pi)
        
        # Body height (from nose to mid-hip)
        body_height = ((nose[1] - mid_hip_y)**2 + (nose[0] - mid_hip_x)**2)**0.5
        
        # Return the extracted features
        return {
            "nose": (nose[0], nose[1], nose[2]),  # x, y, confidence
            "mid_shoulder": (mid_shoulder_x, mid_shoulder_y),
            "mid_hip": (mid_hip_x, mid_hip_y),
            "vertical_angle": vertical_angle,
            "body_height": body_height
        }
    
    def detect_poses_and_falls(self, frame, frame_height, frame_width):
        """Detect multiple human poses and check for falls using YOLOv8"""
        current_time = time.time()
        
        # Run YOLOv8 pose detection
        results = self.pose_model(frame, verbose=False)
        
        # Variables to track detection results
        person_boxes = []
        fall_detected = False
        fall_info = None
        
        # Process results
        if results and len(results) > 0:
            result = results[0]  # Get first result
            
            # Get keypoints and bounding boxes
            if hasattr(result, 'keypoints') and result.keypoints is not None:
                # Extract keypoints as numpy array - move to CPU first
                keypoints = result.keypoints.data.cpu().numpy() if torch.is_tensor(result.keypoints.data) else result.keypoints.data
                
                # Extract boxes (can get from result.boxes or we can calculate from keypoints)
                boxes = result.boxes.data.cpu().numpy() if torch.is_tensor(result.boxes.data) else result.boxes.data
                
                # Prepare format for SORT tracker: [x1, y1, x2, y2, confidence]
                tracking_boxes = []
                for i, box in enumerate(boxes):
                    x1, y1, x2, y2, conf, class_id = box
                    if conf > 0.3:  # Confidence threshold
                        tracking_boxes.append([x1, y1, x2, y2, conf])
                
                if tracking_boxes:
                    # Update SORT tracker with CPU numpy array
                    tracked_objects = self.tracker.update(np.array(tracking_boxes))
                    
                    # Process each tracked person
                    for tracked_box in tracked_objects:
                        x1, y1, x2, y2, tracking_id = tracked_box
                        person_key = f"person_{int(tracking_id)}"
                        
                        # Find the corresponding keypoints for this bbox
                        best_keypoints = None
                        best_iou = 0
                        
                        for i, box in enumerate(boxes):
                            # Calculate IoU to match tracker box with detection box
                            box_x1, box_y1, box_x2, box_y2 = box[:4]
                            iou = self._calculate_iou(
                                [x1, y1, x2, y2], 
                                [box_x1, box_y1, box_x2, box_y2]
                            )
                            
                            if iou > best_iou:
                                best_iou = iou
                                best_keypoints = keypoints[i] if i < len(keypoints) else None
                        
                        # Process pose if keypoints available
                        if best_keypoints is not None and best_iou > 0.5:
                            # Extract pose features
                            person_keypoints = best_keypoints.cpu().numpy() if torch.is_tensor(best_keypoints) else best_keypoints
                            pose_features = self.extract_pose_features(person_keypoints)
                            
                            if pose_features:
                                # Get nose position
                                nose_x, nose_y = pose_features["nose"][0], pose_features["nose"][1]
                                mid_hip_x, mid_hip_y = pose_features["mid_hip"]
                                vertical_angle = pose_features["vertical_angle"]
                                
                                # Create or update record for this person
                                if person_key not in self.fall_records:
                                    self.fall_records[person_key] = {
                                        'positions': [(current_time, nose_y, mid_hip_y, vertical_angle)],
                                        'initial_y': nose_y
                                    }
                                    positions = self.fall_records[person_key]['positions']
                                else:
                                    # Add current position to record
                                    self.fall_records[person_key]['positions'].append(
                                        (current_time, nose_y, mid_hip_y, vertical_angle)
                                    )
                                    
                                    # Remove old positions outside the fall detection window
                                    self.fall_records[person_key]['positions'] = [
                                        pos for pos in self.fall_records[person_key]['positions'] 
                                        if current_time - pos[0] <= self.fall_window
                                    ]
                                    
                                    # Get updated positions list
                                    positions = self.fall_records[person_key]['positions']
                                    
                                    # Check for fall if we have enough data points
                                    if len(positions) >= 3:
                                        # Get first and last position in window
                                        first_pos = positions[0]
                                        last_pos = positions[-1]
                                        
                                        # Calculate time difference
                                        time_diff = last_pos[0] - first_pos[0]
                                        
                                        if time_diff > 0.2:  # Ensure enough time has passed
                                            # Calculate movement metrics
                                            nose_y_change = last_pos[1] - first_pos[1]
                                            vertical_speed = nose_y_change / time_diff  # pixels per second
                                            vertical_angle_change = last_pos[3] - first_pos[3]
                                            total_y_change = last_pos[1] - self.fall_records[person_key]['initial_y']
                                            
                                            # Debug info
                                            print(f"ID {int(tracking_id)}: Speed={vertical_speed:.1f} px/s, " +
                                                f"Angle Change={vertical_angle_change:.1f}°, Total Y={total_y_change:.1f}px")
                                            
                                            # Fall detection conditions: Check for rapid downward movement AND 
                                            # significant angle change (person becoming horizontal)
                                            if ((vertical_speed > self.fall_speed_threshold and nose_y_change > 30) or  # Fast downward motion
                                                (vertical_speed > 10 and abs(vertical_angle_change) > 30) or  # Angle change with movement
                                                (abs(vertical_angle_change) > 45 and vertical_speed > 5)):  # Major orientation change
                                                
                                                fall_detected = True
                                                fall_info = {
                                                    "id": int(tracking_id),
                                                    "position": (int(nose_x), int(nose_y)),
                                                    "speed": vertical_speed,
                                                    "angle_change": vertical_angle_change
                                                }
                                
                                # Draw bounding box and tracking ID
                                cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
                                
                                # Draw keypoints and connections
                                self._draw_keypoints(frame, person_keypoints)
                                
                                # Display tracking ID and vertical speed if available
                                if len(positions) > 1 and 'vertical_speed' in locals():
                                    speed_text = f"ID:{int(tracking_id)} Speed:{vertical_speed:.1f}"
                                    cv2.putText(frame, speed_text, (int(x1), int(y1) - 10),
                                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 255), 1)
                                else:
                                    cv2.putText(frame, f"ID:{int(tracking_id)}", (int(x1), int(y1) - 10),
                                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 255), 1)
                                
                                # Add to person boxes for motion detection
                                person_boxes.append([x1, y1, x2, y2, tracking_id])
        
        # Clean up old tracking data
        current_keys = list(self.fall_records.keys())
        for key in current_keys:
            if current_time - self.fall_records[key]['positions'][-1][0] > 5.0:
                self.fall_records.pop(key, None)
                
        return person_boxes, fall_detected, fall_info
    
    def _calculate_iou(self, box1, box2):
        """Calculate Intersection over Union (IoU) between two boxes"""
        # Box coordinates
        x1_1, y1_1, x2_1, y2_1 = box1
        x1_2, y1_2, x2_2, y2_2 = box2
        
        # Calculate intersection area
        x_left = max(x1_1, x1_2)
        y_top = max(y1_1, y1_2)
        x_right = min(x2_1, x2_2)
        y_bottom = min(y2_1, y2_2)
        
        if x_right < x_left or y_bottom < y_top:
            return 0.0
            
        intersection_area = (x_right - x_left) * (y_bottom - y_top)
        
        # Calculate union area
        box1_area = (x2_1 - x1_1) * (y2_1 - y1_1)
        box2_area = (x2_2 - x1_2) * (y2_2 - y1_2)
        union_area = box1_area + box2_area - intersection_area
        
        # Calculate IoU
        iou = intersection_area / union_area if union_area > 0 else 0
        return iou
    
    def _draw_keypoints(self, frame, keypoints):
        """Draw pose keypoints and connections on the frame"""
        # Define the skeleton connections
        skeleton = [
            (0, 1), (0, 2),  # nose to eyes
            (1, 3), (2, 4),  # eyes to ears
            (0, 5), (0, 6),  # nose to shoulders
            (5, 7), (7, 9),  # left arm
            (6, 8), (8, 10), # right arm
            (5, 11), (6, 12), # shoulders to hips
            (11, 13), (13, 15), # left leg
            (12, 14), (14, 16)  # right leg
        ]
        
        # Draw the keypoints
        for i, kp in enumerate(keypoints):
            x, y, conf = kp
            if conf > 0.5:  # Only draw if confidence is above threshold
                cv2.circle(frame, (int(x), int(y)), 3, (0, 255, 0), -1)
        
        # Draw the connections
        for connection in skeleton:
            idx1, idx2 = connection
            if idx1 < len(keypoints) and idx2 < len(keypoints):
                kp1 = keypoints[idx1]
                kp2 = keypoints[idx2]
                
                # Only draw if both points are confident
                if kp1[2] > 0.5 and kp2[2] > 0.5:
                    cv2.line(frame, (int(kp1[0]), int(kp1[1])), 
                            (int(kp2[0]), int(kp2[1])), (0, 255, 0), 2)
    
    def start_event_recording(self, frame, event_type):
        """Start recording a detected event"""
        current_time = time.time()
        self.recording_event = True
        self.recording_start_time = current_time
        
        # Create video file for event
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        event_video_path = f"events/{event_type}_{timestamp}.mp4"
        h, w = frame.shape[:2]
        
        self.event_out = cv2.VideoWriter(event_video_path, self.fourcc, 20.0, (w, h))
        
        # Save screenshot of event
        screenshot_path = f"events/{event_type}_{timestamp}.jpg"
        cv2.imwrite(screenshot_path, frame)
        
        print(f"Event detected: {event_type}! Recording to {event_video_path}")
        return event_video_path
    
    def update_event_recording(self, frame):
        """Update ongoing event recording"""
        current_time = time.time()
        
        # Write frame to event video
        if self.recording_event:
            self.event_out.write(frame)
            
            # Add recording indicator
            cv2.circle(frame, (20, 20), 10, (0, 0, 255), -1)
            
            # Check if recording duration has elapsed
            if current_time - self.recording_start_time > self.recording_duration:
                self.recording_event = False
                self.event_out.release()
                self.event_out = None
                print("Finished recording event")
    
    def run(self):
        """Run the event detection camera"""
        # Open video capture
        cap = cv2.VideoCapture(self.video_path)
        if not cap.isOpened():
            print(f"Error: Could not open video source {self.video_path}")
            return
        
        # Get video properties
        frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        fps = cap.get(cv2.CAP_PROP_FPS)
        if fps <= 0:
            fps = 30.0
            
        print(f"Video dimensions: {frame_width}x{frame_height}, FPS: {fps}")
        
        # Setup video writer if needed
        is_recording = self.setup_video_output(cap)
        
        # Calculate frame delay for proper playback speed
        frame_delay = 1.0 / fps if self.video_path != 0 else 0
        
        try:
            while True:
                ret, frame = cap.read()
                if not ret or frame is None:
                    break
                
                current_time = time.time()
                
                # Control playback speed for consistent processing
                if frame_delay > 0:
                    time.sleep(frame_delay)
                
                # Create a copy for event recording
                display_frame = frame.copy()
                
                # POSE DETECTION AND FALL DETECTION
                person_boxes = []
                fall_detected = False
                
                if "fall" in self.detect_types or "motion" in self.detect_types:
                    person_boxes, fall_detected, fall_info = self.detect_poses_and_falls(display_frame, frame_height, frame_width)
                
                # MOTION DETECTION
                motion_detected = False
                if "motion" in self.detect_types:
                    motion_detected, motion_regions = self.detect_motion(frame, person_boxes)
                    
                    if motion_detected:
                        self.last_motion_time = current_time
                        
                        # Draw motion regions
                        for x, y, w, h in motion_regions:
                            cv2.rectangle(display_frame, (x, y), (x+w, y+h), (0, 255, 255), 2)
                        
                        # Show motion alert
                        cv2.putText(display_frame, "MOTION DETECTED", (10, 30), 
                                  cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)
                
                # Handle fall detection
                if "fall" in self.detect_types and fall_detected:
                    # Add fall detection overlay
                    overlay = display_frame.copy()
                    cv2.rectangle(overlay, (10, 60), (300, 100), (0, 0, 0), -1)
                    cv2.addWeighted(overlay, 0.6, display_frame, 0.4, 0, display_frame)
                    cv2.putText(display_frame, "FALL DETECTED!", (20, 90),
                              cv2.FONT_HERSHEY_DUPLEX, 0.8, (0, 0, 255), 2)
                    
                    # Start recording if not already recording an event
                    if not self.recording_event:
                        self.start_event_recording(frame, "fall")
                
                # Update event recording if active
                self.update_event_recording(display_frame)
                
                # Save to main recording if enabled
                if is_recording and self.out is not None:
                    self.out.write(display_frame)
                
                # Display status and output
                cv2.putText(display_frame, "Press 'q' to quit", (10, frame_height - 10), 
                           cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 1)
                
                # Show the resulting frame
                cv2.imshow('Event Detection Camera', display_frame)
                
                # Break the loop on 'q' key press
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break
        
        finally:
            # Clean up resources
            cap.release()
            if self.out is not None:
                self.out.release()
            if self.event_out is not None:
                self.event_out.release()
            cv2.destroyAllWindows()
            print("Event detection camera stopped")


def main():
    # Parse command line arguments
    parser = argparse.ArgumentParser(description='Event Detection Camera')
    parser.add_argument('--path', help='Path of the video to process', default=0)
    parser.add_argument('--live', action='store_true', help='Use live camera feed')
    parser.add_argument('--detect', nargs='+', choices=['motion', 'fall'], 
                        default=['motion', 'fall'],
                        help='Which events to detect')
    args = parser.parse_args()
    
    # Setup video source
    if args.live:
        print("Starting live camera feed...")
        video_path = 0  # Default camera
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_path = f'video/event_recording_{timestamp}.mp4'
    else:
        video_path = args.path
        output_path = None
        print(f"Processing video: {video_path}")
    
    # Initialize and run event detection camera
    camera = EventDetectionCamera(
        video_source=video_path,
        output_path=output_path,
        detect_types=args.detect
    )
    
    camera.run()


if __name__ == "__main__":
    main()