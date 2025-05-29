# MediaPipe and SORT for Smart Home Event Detection

## Overview
This document explains the key technologies used in our Fall Detection system for smart home monitoring.

## MediaPipe

### What is MediaPipe?
MediaPipe is Google's open-source framework for building multimodal (vision, audio, etc.) applied machine learning pipelines.

### Key Benefits for Our Project
- **Production-ready pose estimation**: Provides accurate human pose tracking without requiring GPU hardware
- **Cross-platform compatibility**: Works on various devices including mobile and embedded systems
- **Real-time performance**: Optimized for low latency processing on CPU
- **Pre-trained models**: No need to train custom pose models from scratch
- **Robust skeleton tracking**: Provides 33 key body landmarks with visibility confidence scores

### Advantages Over Alternatives
- **More efficient than YOLOv8 Pose**: Requires less computational resources while maintaining accuracy
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

## Implementation in Our System

Our fall detection system combines these technologies to:

1. **Detect human poses** with MediaPipe's pose estimation
2. **Track individuals over time** using SORT to maintain identity consistency
3. **Analyze movement patterns** by tracking skeletal positions across frames
4. **Detect falls** by identifying rapid vertical movement and body orientation changes

This combination provides an excellent balance between accuracy, performance, and reliability, enabling our system to detect falls effectively while remaining computationally efficient for continuous operation in a smart home environment.