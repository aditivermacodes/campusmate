# 🎓 CampusMate: Daily Student & Study Companion App

A clean, practical React Native application built with **Expo** designed specifically for college life and daily study productivity.

---

## 📱 Features Included

1. **📋 Daily Tasks & Assignment Tracker**
   - Categorize by *Assignment*, *Exam*, *General*, or *Hostel*.
   - Filter by *All*, *Active*, and *Done*.
   - Quick one-tap completion checkmark and delete.
   - "Clear done" button to clean up finished work.

2. **⏱️ Study Pomodoro Focus Timer**
   - 25-minute focus sprints for deep work and exam revision.
   - 5-minute break mode to recharge.
   - Play / Pause / Reset controls.
   - Daily study session counter (🍅) tracking total minutes studied.
   - Automatic completion alerts when the timer hits zero.

3. **📊 Semester SGPA Calculator**
   - Based on standard 10-point college grading (`O` = 10, `A+` = 9, `A` = 8, `B+` = 7, `B` = 6, `C` = 5, `F` = 0).
   - Weighted credit calculation (`Credit Hours × Grade Points`).
   - Add new subjects with dynamic credits and expected grades.
   - Instant live SGPA feedback pill (e.g. *Outstanding*, *Excellent Performance*).

4. **💸 Student Pocket Expense Tracker**
   - Log daily college and hostel spending (Chai/Snacks, Stationery, Hostel, Travel).
   - Running total balance card showing total ₹ spent.
   - Timestamped history log with quick delete.

5. **💡 Daily Motivation & Tips**
   - Top banner with rotating inspirational student quotes.
   - Tap banner anytime to cycle through new motivational advice.

---

## 🚀 How to Run the App

Open PowerShell or Command Prompt in this folder:

```bash
cd "C:\Users\Aditi Verma\Desktop\Frontend\react-native-app"
```

### Option 1: Preview in Web Browser (Fastest & Easiest!)
Run:
```bash
npm run web
```
This will automatically launch Metro and open the app in your default web browser (Chrome/Edge).

### Option 2: Run on Your Phone (Android / iPhone)
1. Install **Expo Go** from the Google Play Store or Apple App Store on your phone.
2. Run:
   ```bash
   npm start
   ```
3. Scan the QR code shown in your terminal using the Expo Go app (on Android) or the default Camera app (on iPhone).
4. Make sure your computer and phone are connected to the same Wi-Fi network!

---

## 📂 Project Structure

```
react-native-app/
├── App.js                   # Root shell orchestrating navigation and screens
├── components/              # Modular feature components
│   ├── Header.js            # App header and daily motivational quotes
│   ├── TaskManager.js       # Daily task tracker, category filters, and toggles
│   ├── PomodoroTimer.js     # 25-minute focus sprints, break mode, and stats
│   ├── GpaCalculator.js     # 10-point university SGPA calculation and course list
│   └── ExpenseTracker.js    # Student spending log, total balance, and categories
├── app.json                 # Expo project configuration and app metadata
├── package.json             # Dependencies (Expo 57, React 19, React Native 0.86)
└── README.md                # Documentation and setup guide
```

---

## 🎯 Architecture & Interview Talking Points

- **Component-Driven Modular Architecture**: Separated into single-responsibility feature components (`Header`, `TaskManager`, `PomodoroTimer`, `GpaCalculator`, `ExpenseTracker`) to keep code readable, testable, and maintainable.
- **State Management & React Lifecycle**:
  - `useState` for local component state encapsulation.
  - `useEffect` with cleanup functions for interval management in the study timer.
- **Cross-Platform Compatibility**: Custom alert handling and responsive flexbox layouts designed to adapt seamlessly across Mobile (Android/iOS) and Web.
- **100% Original Implementation**: Designed specifically around practical daily student workflows with clean naming conventions and no external UI kit dependencies.

---

## 🧩 React Native Concepts Demonstrated for Beginners

- **`useState` Hook**: Manages reactive dynamic state (tasks list, timer countdown, courses, expenses, active tabs).
- **`useEffect` Hook**: Runs the 1-second interval countdown for the Pomodoro timer safely with cleanup (`clearInterval`).
- **`SafeAreaView` & `ScrollView`**: Ensures content does not clip behind phone notches, home bars, or status bars and allows smooth scrolling on smaller screens.
- **`TouchableOpacity`**: Custom styled buttons with gentle opacity feedback on tap.
- **`StyleSheet.create`**: Native layout styling with Flexbox (`flexDirection`, `justifyContent`, `alignItems`, `gap`).
- **Cross-Platform Alerts**: Handles native `Alert.alert` on mobile and `window.alert` on web seamlessly.
