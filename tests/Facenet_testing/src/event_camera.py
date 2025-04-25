import cv2
import numpy as np
import os
import time
import argparse
from datetime import datetime
import mediapipe as mp
from sort import Sort 

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
        
        # Initialize MediaPipe pose detector
        self.mp_pose = mp.solutions.pose
        self.mp_drawing = mp.solutions.drawing_utils
        self.pose = self.mp_pose.Pose(
            static_image_mode=False,
            model_complexity=1,  # 0, 1 or 2 (higher is more accurate but slower)
            smooth_landmarks=True,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
        
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
    
    def detect_motion(self, frame):
        """Detect motion in frame using background subtraction"""
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
        
        # Process contours
        for contour in contours:
            if cv2.contourArea(contour) > self.motion_threshold:
                motion_detected = True
                x, y, w, h = cv2.boundingRect(contour)
                motion_regions.append((x, y, w, h))
        
        return motion_detected, motion_regions
    
    def extract_pose_features(self, landmarks):
        """Extract key features from pose landmarks"""
        # Check if all key landmarks are present
        if not landmarks or not landmarks.landmark:
            return None
        
        # Extract key body points
        nose = landmarks.landmark[self.mp_pose.PoseLandmark.NOSE]
        left_shoulder = landmarks.landmark[self.mp_pose.PoseLandmark.LEFT_SHOULDER]
        right_shoulder = landmarks.landmark[self.mp_pose.PoseLandmark.RIGHT_SHOULDER]
        left_hip = landmarks.landmark[self.mp_pose.PoseLandmark.LEFT_HIP]
        right_hip = landmarks.landmark[self.mp_pose.PoseLandmark.RIGHT_HIP]
        left_ankle = landmarks.landmark[self.mp_pose.PoseLandmark.LEFT_ANKLE]
        right_ankle = landmarks.landmark[self.mp_pose.PoseLandmark.RIGHT_ANKLE]
        
        # Skip if any key point is not detected
        if any(pt.visibility < 0.5 for pt in [nose, left_shoulder, right_shoulder, 
                                            left_hip, right_hip, left_ankle, right_ankle]):
            return None
        
        # Calculate midpoints
        mid_shoulder_x = (left_shoulder.x + right_shoulder.x) / 2
        mid_shoulder_y = (left_shoulder.y + right_shoulder.y) / 2
        
        mid_hip_x = (left_hip.x + right_hip.x) / 2
        mid_hip_y = (left_hip.y + right_hip.y) / 2
        
        # Calculate body angles and proportions
        # Vertical angle (angle between shoulders and hips)
        vertical_angle = abs(np.arctan2(mid_hip_y - mid_shoulder_y, mid_hip_x - mid_shoulder_x) * 180 / np.pi)
        
        # Body height (from nose to mid-hip)
        body_height = ((nose.y - mid_hip_y)**2 + (nose.x - mid_hip_x)**2)**0.5
        
        # Return the extracted features
        return {
            "nose": (nose.x, nose.y, nose.visibility),
            "mid_shoulder": (mid_shoulder_x, mid_shoulder_y),
            "mid_hip": (mid_hip_x, mid_hip_y),
            "vertical_angle": vertical_angle,
            "body_height": body_height
        }
    
    def detect_fall(self, frame, frame_height, frame_width):
        """Detect falls using MediaPipe pose estimation"""
        # Convert frame to RGB for MediaPipe
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.pose.process(rgb_frame)
        
        fall_detected = False
        fall_info = None
        current_time = time.time()
        
        # Process pose landmarks if detected
        if results.pose_landmarks:
            # Extract pose features
            pose_features = self.extract_pose_features(results.pose_landmarks)
            if not pose_features:
                return False, None
            
            # Convert normalized coordinates to pixel coordinates
            nose_x = int(pose_features["nose"][0] * frame_width)
            nose_y = int(pose_features["nose"][1] * frame_height)
            mid_hip_x = int(pose_features["mid_hip"][0] * frame_width)
            mid_hip_y = int(pose_features["mid_hip"][1] * frame_height)
            
            # Use SORT tracker to get consistent person ID
            # Format: [x1, y1, x2, y2, confidence]
            body_width = frame_width / 4  # Estimate body width
            bbox = np.array([[
                max(0, nose_x - body_width/2), 
                max(0, nose_y - body_width/2),
                min(frame_width, nose_x + body_width/2), 
                min(frame_height, mid_hip_y + body_width/2),
                0.9
            ]])
            
            # Get tracking ID from SORT
            tracked_objects = self.tracker.update(bbox)
            
            if len(tracked_objects) > 0:
                # Get tracking ID
                tracking_id = int(tracked_objects[0, 4])
                person_key = f"person_{tracking_id}"
                
                # Create record for new person
                if person_key not in self.fall_records:
                    self.fall_records[person_key] = {
                        'positions': [(current_time, nose_y, mid_hip_y, pose_features["vertical_angle"])],
                        'initial_y': nose_y
                    }
                    # Initialize positions variable for the first detection
                    positions = self.fall_records[person_key]['positions']
                else:
                    # Add current position to record
                    self.fall_records[person_key]['positions'].append(
                        (current_time, nose_y, mid_hip_y, pose_features["vertical_angle"])
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
                            print(f"ID {tracking_id}: Speed={vertical_speed:.1f} px/s, " +
                                 f"Angle Change={vertical_angle_change:.1f}°, Total Y={total_y_change:.1f}px")
                            
                            # Fall detection conditions: Check for rapid downward movement AND 
                            # significant angle change (person becoming horizontal)
                            if ((vertical_speed > self.fall_speed_threshold and nose_y_change > 30) or  # Fast downward motion
                                (vertical_speed > 10 and abs(vertical_angle_change) > 30) or  # Angle change with movement
                                (abs(vertical_angle_change) > 45 and vertical_speed > 5)):  # Major orientation change
                                
                                fall_detected = True
                                fall_info = {
                                    "id": tracking_id,
                                    "position": (nose_x, nose_y),
                                    "speed": vertical_speed,
                                    "angle_change": vertical_angle_change
                                }
                
                # Draw body keypoints and skeleton for visualization
                self.mp_drawing.draw_landmarks(
                    frame,
                    results.pose_landmarks,
                    self.mp_pose.POSE_CONNECTIONS,
                    landmark_drawing_spec=self.mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=2, circle_radius=2),
                    connection_drawing_spec=self.mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=2)
                )
                
                # Display tracking ID and vertical speed if available
                if len(positions) > 1 and 'vertical_speed' in locals():
                    speed_text = f"ID:{tracking_id} Speed:{vertical_speed:.1f}"
                    cv2.putText(frame, speed_text, (nose_x, nose_y - 10),
                               cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 255), 1)
                else:
                    cv2.putText(frame, f"ID:{tracking_id}", (nose_x, nose_y - 10),
                               cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 255), 1)
                
        # Clean up old tracking data
        current_keys = list(self.fall_records.keys())
        for key in current_keys:
            if current_time - self.fall_records[key]['positions'][-1][0] > 5.0:
                self.fall_records.pop(key, None)
                
        return fall_detected, fall_info
    
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
                
                # MOTION DETECTION
                motion_detected = False
                if "motion" in self.detect_types:
                    motion_detected, motion_regions = self.detect_motion(frame)
                    
                    if motion_detected:
                        self.last_motion_time = current_time
                        
                        # Draw motion regions
                        for x, y, w, h in motion_regions:
                            cv2.rectangle(display_frame, (x, y), (x+w, y+h), (0, 255, 255), 2)
                        
                        # Show motion alert
                        cv2.putText(display_frame, "MOTION DETECTED", (10, 30), 
                                  cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)
                
                # FALL DETECTION
                fall_detected = False
                if "fall" in self.detect_types:
                    # Only run fall detection if motion was detected recently or we're forcing detection
                    if current_time - self.last_motion_time < 3 or self.video_path != 0:
                        fall_detected, fall_info = self.detect_fall(display_frame, frame_height, frame_width)
                        
                        if fall_detected:
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
            self.pose.close()
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