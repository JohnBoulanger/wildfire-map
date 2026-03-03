# Wildfire Detection System

A drone-based early wildfire detection system that fuses IR, UV, and RGB camera data with onboard telemetry into a multi-sensor ML inference pipeline. This repo contains the React/TypeScript web dashboard and cloud pipeline that processes incoming drone data and visualizes fire detection events in real time.

<img width="1440" height="745" alt="Screenshot 2026-03-03 at 11 29 18 AM" src="https://github.com/user-attachments/assets/4b4a7537-0c2f-4f78-b55e-ce79f41f2777" />


## Overview

Early detection is the difference between a contained burn and a catastrophic fire. This system mounts IR, UV, and RGB sensors on a drone, runs the combined sensor data through an ML model to identify fire signatures, and pushes confirmed detection events to a live web map for field operators to monitor in real time.

---

## Architecture

```
Drone (IR + UV + RGB sensors + telemetry)
                │
                ▼
     Cloud ML Inference Pipeline
                │
                ▼
   React / TypeScript Web Dashboard
                │
                ▼
  Interactive Map with Live Fire Events
```

---

## Features

- **Live detection map** — fire events appear on an interactive map the moment the drone detects them
- **Multi-sensor fusion** — IR, UV, and RGB imagery combined with onboard telemetry for robust, low false-positive detection
- **Cloud inference pipeline** — ML model runs on the cloud, results streamed to the frontend automatically
- **Field-ready** — designed for reliable operation in remote environments

---

## Tech Stack

- **Frontend:** React, TypeScript
- **Pipeline:** Python
- **ML:** PyTorch
- **Sensors:** IR, UV, RGB cameras + onboard telemetry

---

## Status

Active development — dashboard and inference pipeline functional, ongoing work on model accuracy and field testing.

---

## Contact

John Boulanger — [LinkedIn](https://www.linkedin.com/in/john-boulanger-42a706279/) — john03yyc@gmail.com
