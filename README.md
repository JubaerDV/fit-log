# 🏋️ FITLOG — Workout & Fitness Tracker

**FITLOG** is a modern workout and fitness tracking web application built with **Next.js, TypeScript, and Tailwind CSS**.

Users can browse workouts, view workout details, add workouts to **Today's Plan**, save workouts for later, mark workouts as completed, and manage their workout plan from one place.

---

## 🚀 Features

* 🏠 Modern Home Page
* 🏋️ Workout Library
* 🔎 Workout Details
* ➕ Add to Today's Plan
* 🔖 Save for Later
* 🚫 Duplicate workout prevention
* ✅ Mark Workout as Done
* 🗑️ Remove workouts
* 🔔 Toast Notifications
* 📊 Workout Statistics
* 🔢 Plan & Saved Workout Counts
* 🔃 Workout Sorting
* 📱 Responsive Design
* 🌙 Dark UI
* ⚡ Fast and modern Next.js application

---

## 🛠️ Technologies Used

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **JavaScript**
* **HTML**
* **REST API**
* **LocalStorage**
* **Git**
* **GitHub**

---

## 📋 Main Features

### 🏠 Home

The Home page displays the workout library with workout cards containing:

* Workout name
* Workout image
* Duration
* Calories
* Rating
* Workout category

Users can click a workout card to view its details.

---

### 📖 Workout Details

Each workout has a dedicated details page.

The details page includes:

* Workout image
* Workout name
* Description
* Difficulty
* Muscle groups
* Equipment
* Duration
* Calories
* Rating
* Instructions

Users can also:

* Add the workout to Today's Plan
* Save the workout for later

---

### 📅 Today's Plan

Users can create their own workout plan by adding workouts to Today's Plan.

The My Plan page shows:

* Total exercises
* Total minutes
* Total calories
* Completed workouts

Users can also:

* View workout details
* Mark workouts as done
* Remove workouts
* Prevent duplicate workouts

---

### 🔖 Saved

Users can save workouts for later.

The Saved section includes:

* Saved workout count
* Saved workout cards
* Total exercises
* Total minutes
* Total calories
* Workout rating
* View Details
* Remove saved workout

Duplicate saved workouts are prevented.

---

### 🔔 Toast Notifications

FITLOG provides feedback through toast messages for actions such as:

* Workout added
* Workout already added
* Workout saved
* Workout already saved
* Workout removed
* Workout marked as done

---

### 🔃 Sorting

Workout lists can be sorted by:

* Default
* Duration
* Calories
* Rating

---

## 🌐 API

Workout data is loaded from a REST API.

The application fetches workout information dynamically and displays it throughout the application.

---

## 💾 Data Management

FITLOG uses **LocalStorage** to maintain user-specific workout data.

The following information is stored locally:

* Today's Plan
* Saved Workouts
* Completed Workouts

This allows the user's workout selections to remain available after refreshing the page.

---

## 📱 Responsive Design

The application is designed to work across:

* 📱 Mobile
* 💻 Tablet
* 🖥️ Desktop

The layout automatically adjusts according to the screen size.

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── details/
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   ├── my-plan/
│   │   └── page.tsx
│   │
│   ├── page.tsx
│   ├── layout.tsx
│   ├── loading.tsx
│   └── not-found.tsx
│
├── components/
│   ├── Navbar/
│   ├── WorkoutCard/
│   ├── Toast/
│   └── ...
│
├── lib/
│   ├── plan.ts
│   ├── saved.ts
│   └── completed.ts
│
├── types/
│   └── workout.ts
│
└── assets/
```

---

## ⚙️ Getting Started

First, install the project dependencies:

```bash
npm install
```

Then start the development server:

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

---

## 🏗️ Build for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

---

## 🔧 Development

You can edit the project files and the Next.js development server will automatically update the application.

Main application files are located inside:

```text
src/app/
```

---

## 📸 Screenshots

Screenshots of the application can be added here after the final UI is completed.

Example:

```text
Home Page
Workout Details
Today's Plan
Saved Workouts
```

---

## 🔗 Project Links

### GitHub Repository

Add your GitHub repository link here.

### Live Website

Add your deployed Vercel website link here.

---

## 👨‍💻 Author

**Jubaer**


