# BirdWatch

BirdWatch is an AI-powered mobile application that combines computer vision and statistical modeling to create an interactive birdwatching experience. Users photograph birds in the wild, receive species identification through a deep learning model, and earn rarity-based points that contribute to a global leaderboard.

---

## Overview

BirdWatch encourages wildlife exploration and environmental awareness by integrating:

- CNN-based image classification for bird species identification
- A statistical rarity model for scoring sightings
- A full-stack backend for AI inference and data storage
- A mobile frontend for real-time interaction

Each newly identified species is unlocked in a digital **BirdDex**, where users can view species information and rarity metrics.

---

## AI Model – Bird Classification

The application uses a Convolutional Neural Network (CNN) implemented in PyTorch to perform fine-grained bird species classification.

### Pipeline

1. User uploads an image.
2. Image is preprocessed using OpenCV (resizing, normalization).
3. CNN performs inference and outputs:
   - Predicted species
   - Confidence score
4. Low-confidence predictions are filtered.

The model is trained and evaluated using PyTorch, NumPy, and Scikit-learn.

---

## Statistical Rarity Model

Rarity is computed using regional sighting data retrieved from the eBird API.

### Inputs
- Predicted species
- User GPS location
- Regional sighting frequency
- Seasonal distribution data

### Concept

Rarity is inversely proportional to regional frequency:

Rarity ∝ 1 / log(regional_sightings + 1)

Less frequent sightings result in higher rarity scores. These scores are accumulated and reflected in a global leaderboard.

---

## Backend Architecture

The backend is built using Python and FastAPI.

### Responsibilities
- Accept image uploads
- Run CNN inference
- Query external APIs (eBird, Maps)
- Compute rarity scores
- Store user and sighting data
- Return structured responses to frontend

All frontend communication occurs through REST endpoints.

---

## Database

Database: PostgreSQL (managed via Supabase)

### Stored Data

Users
- user_id
- username
- email
- total_points

Sightings
- sighting_id
- user_id
- species
- latitude
- longitude
- rarity_score
- timestamp

Supabase handles authentication and persistent storage.

---

## Frontend

Built with React Native (mobile) and React.js (optional web interface).

Features:
- Camera integration
- GPS capture
- BirdDex collection tracking
- Leaderboard display
- Interactive map visualization

---

## External APIs

- eBird API – species metadata and regional sighting frequency
- Google Maps API / OpenStreetMap – geolocation and mapping

---

## Tech Stack

### Programming Languages
- Python
- SQL
- JavaScript

### AI / ML
- PyTorch
- Convolutional Neural Networks (CNNs)
- OpenCV

### Backend
- FastAPI
- NumPy
- Pandas
- Scikit-learn

### Database
- Supabase
- PostgreSQL

### Frontend
- React Native
- React.js

### APIs
- eBird API
- Google Maps API
- OpenStreetMap

---

## End-to-End Flow

1. User captures image.
2. Image and GPS sent to backend.
3. CNN predicts species.
4. Backend queries eBird for regional data.
5. Statistical model computes rarity.
6. Data stored in PostgreSQL.
7. Results returned to frontend and leaderboard updated.

---

## Goals

BirdWatch demonstrates applied deep learning, statistical modeling, and full-stack system integration while promoting environmental education and wildlife conservation.
