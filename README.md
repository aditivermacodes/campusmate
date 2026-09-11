# CampusMate

A cross-platform student productivity app built with React Native and Expo. CampusMate helps students organize daily assignments, stay focused during study sessions, calculate semester SGPA, and track everyday college expenses.

---

## Features

- **Task Manager**: Add, complete, and filter assignments and academic deadlines. Completed tasks automatically move to the bottom of the list.
- **Focus Timer**: 25-minute Pomodoro study sprints and 5-minute break intervals with session tracking.
- **SGPA Calculator**: Real-time semester grade point average calculation based on credit hours and grades.
- **Expense Tracker**: Log daily college expenses by category (Groceries, Books, Stationery, Travel) with running balance summaries.
- **Motivational Quotes**: Tap-to-change study quotes for daily academic inspiration.

---

## Project Structure

```
campusmate/
├── App.js                   # Root component managing navigation tabs
├── components/
│   ├── Header.js            # App header and motivational quotes
│   ├── TaskManager.js       # Daily task tracker with auto-sort
│   ├── PomodoroTimer.js     # Study timer and interval controls
│   ├── GpaCalculator.js     # University SGPA calculator
│   └── ExpenseTracker.js    # Student expense logger
├── app.json                 # Expo configuration
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation
```

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
```bash
git clone https://github.com/aditivermacodes/campusmate.git
cd campusmate
npm install
```

### Running the App

**Preview in Web Browser:**
```bash
npm run web
```

**Run on Mobile (Android / iOS):**
```bash
npm start
```
Install the **Expo Go** app on your mobile device and scan the terminal QR code.

---

## Tech Stack

- **Framework**: React Native
- **Platform**: Expo (SDK 57)
- **UI Library**: React (v19)
- **Language**: JavaScript

---

## Author

**Aditi Verma**  
GitHub: [@aditivermacodes](https://github.com/aditivermacodes)
