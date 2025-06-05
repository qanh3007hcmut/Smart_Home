# YOLOv8 Pose and SORT for Smart Home Event Detection

## Overview
This document explains the key technologies used in our Fall Detection system for smart home monitoring.

## YOLOv8 Pose

### What is YOLOv8 Pose?
YOLOv8 Pose is part of the Ultralytics YOLO family, providing state-of-the-art pose estimation capabilities with real-time performance.

### Key Benefits for Our Project
- **Production-ready pose estimation**: Provides accurate human pose tracking with 17 key body landmarks
- **Cross-platform compatibility**: Works on various devices including mobile and embedded systems
- **Real-time performance**: Optimized for efficient processing on both CPU and GPU
- **Pre-trained models**: Ready-to-use models with different size options (n, s, m, l, x)
- **Robust skeleton tracking**: Provides key body landmarks with confidence scores

### Advantages Over Alternatives
- **More efficient than MediaPipe**: Better accuracy-to-speed ratio for multi-person tracking
- **Better than OpenPose**: More stable across different lighting conditions and partial occlusions
- **More complete than simple HOG detectors**: Provides full skeletal structure instead of just bounding boxes

## SORT (Simple Online and Realtime Tracking)

### What is SORT?
SORT is a pragmatic tracking algorithm that associates detections across video frames using Kalman filtering and Hungarian algorithm for assignment.

### Key Benefits for Our Project
- **Consistent person tracking**: Maintains unique IDs for each person across frames
- **Motion prediction**: Uses Kalman filtering to predict positions when detection is uncertain
- **Lightweight implementation**: Minimal computational overhead (critical for real-time applications)
- **Low false positive rate**: Minimizes ID switching through effective tracking algorithms
- **Temporal analysis**: Enables tracking position changes over time to detect falls

### Advantages Over Alternatives
- **Simpler than DeepSORT**: No feature extraction overhead, better for real-time applications
- **More reliable than OpenCV trackers**: Better handling of occlusions and multiple subjects
- **Lower latency than complex trackers**: Maintains real-time performance even with multiple people

## Fall Detection Implementation

Our fall detection system uses the following approach:

1. **Pose Detection**: YOLOv8 Pose model extracts 17 key body landmarks for each person in the frame
2. **Person Tracking**: SORT algorithm maintains consistent tracking IDs across video frames
3. **Feature Extraction**: Key pose features are extracted, including:
   - Nose and mid-hip positions
   - Vertical body angle
   - Body height proportions

4. **Fall Detection Logic**: Falls are detected by analyzing:
   - Vertical movement speed (pixels/second)
   - Changes in body orientation angles
   - Rapid vertical position changes

5. **Event Recording**: When a fall is detected, the system:
   - Marks the event with visual indicators
   - Records a video clip of the fall event
   - Saves a screenshot for verification

This combination provides an excellent balance between accuracy, performance, and reliability, enabling our system to detect falls effectively while remaining computationally efficient for continuous operation in a smart home environment.