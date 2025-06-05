# Smart Home Pipeline Execution Guide

This document provides step-by-step instructions to execute the Smart Home system pipeline. The system includes components for facial recognition, motion detection, and fall detection, all integrated within a simulated Home Assistant environment.

## 1. Initialize Home Assistant Environment

To start the Home Assistant simulation:

```bash
./run_hass
```

This command executes the `run_hass.bat` file to simulate the smart home environment.

## 2. Run Preprocessing Pipeline

Before executing specific use cases, run the preprocessing pipeline:

```bash
./model/pipeline/run_preprocess
```

This step prepares necessary data and models for subsequent tasks.

> **Note:** You can add images to `model/Facenet_Yolov8n/dataset/facedata/raw` to include additional face data for recognition during preprocessing.

## 3. Use Case Execution

The system supports three main functionalities. Each can be tested using either a sample video or a live webcam feed.

---

### Facial Recognition

* **Sample Video (`sample.mp4`)**
  Located in `model/Facenet_Yolov8n/video`

```bash
./model/pipeline/face_reg_sample
```

* **Live Webcam Input**

```bash
./model/pipeline/face_reg_live
```

---

### Motion Detection

* **Sample Video (`sample.mp4`)**

```bash
./model/pipeline/motion_sample
```

* **Live Webcam Input**

```bash
./model/pipeline/motion_live
```

---

### Fall Detection

* **Sample Video (`sample.mp4`)**

```bash
./model/pipeline/fall_sample
```

* **Live Webcam Input**

```bash
./model/pipeline/fall_live
```

---

## Notes

* Ensure all dependencies and Python environments are properly set up before running these commands.
* The sample video `sample.mp4` should be located in:
  `model/Facenet_Yolov8n/video/sample.mp4`
* Webcam support requires access permissions from your operating system.

---

For further development or integration details, please refer to the corresponding pipeline scripts and model documentation.

See also:

* [AI Model Documentation](docs/Ai_model.md)
* [Home Assistant Documentation](docs/HomeAssistant.md)
