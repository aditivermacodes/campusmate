<div align="center">

# 🎓 CampusMate
### *Your All-in-One Daily College & Study Productivity Companion*

[![React Native](https://img.shields.io/badge/React%20Native-0.86-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
[![Expo SDK](https://img.shields.io/badge/Expo-SDK%2057-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Platforms](https://img.shields.io/badge/Platforms-Android%20%7C%20iOS%20%7C%20Web-4E73DF?style=for-the-badge)](https://expo.dev/)

<p align="center">
  A clean, cross-platform mobile application designed specifically for university students to manage deadlines, power through study sessions, calculate semester SGPA, and track daily hostel/campus expenses.
</p>

[Quick Start](#-quick-start) • [Core Features](#-core-features) • [Architecture](#-project-architecture) • [Engineering Highlights](#-engineering--interview-talking-points) • [Author](#-author)

---

</div>

## 🌟 Core Modules

| Module | Description | Key Capabilities |
| :--- | :--- | :--- |
| 📋 **Task Tracker** | Daily academic & hostel deadline manager | Priority tags (`Assignment`, `Exam`, `General`, `Hostel`), status filtering (`All`, `Active`, `Done`), checkmark strike-throughs, and single-tap cleanup. |
| ⏱️ **Focus Timer** | Pomodoro study timer | 25-min study sprints + 5-min recharge break mode, live countdown circular readout, daily study streak counter (🍅), and completion alerts. |
| 📊 **SGPA Calculator** | Semester GPA estimator | 10-point university grading scale (`O` to `F`), weighted credit calculation, dynamic course entry, and real-time academic distinction feedback. |
| 💸 **Expense Tracker** | Student pocket expense logger | Quick category spending (`Chai / Snacks`, `Stationery`, `Hostel`, `Travel`), running total balance card, and timestamped transaction logs. |
| 💡 **Daily Motivation** | Interactive study quote card | Curated inspirational thoughts for engineering students; tap card anytime to cycle quotes. |

---

## 🏗️ Project Architecture

Built with a modular, component-driven hierarchy following the **Single Responsibility Principle**:

```
campusmate/
├── App.js                         # Root shell managing navigation tabs & active views
├── components/                    # Feature modules
│   ├── Header.js                  # App header, academic badge & motivational quote card
│   ├── TaskManager.js             # Daily task tracker, category filters & checkboxes
│   ├── PomodoroTimer.js           # 25-minute focus sprints, break mode & focus stats
│   ├── GpaCalculator.js           # 10-point university SGPA calculation & course breakdown
│   └── ExpenseTracker.js          # Student spending log, running total balance & categories
├── app.json                       # Expo application manifest & platform metadata
├── package.json                   # Dependencies (Expo 57, React 19, React Native 0.86)
└── README.md                      # Comprehensive developer guide
```

---

## 💡 Engineering & Interview Talking Points

### 1. Separation of Concerns
Rather than cramming hundreds of lines into a monolithic screen, each functional domain is encapsulated into an isolated component under `components/`. State flows predictably and components can be tested or styled independently.

### 2. React Hooks & Interval Lifecycle Management
In `PomodoroTimer.js`, the timer leverages `useEffect` to safely manage native interval ticks:
```javascript
useEffect(() => {
  let interval = null;
  if (isTimerRunning && timerSeconds > 0) {
    interval = setInterval(() => setTimerSeconds((prev) => prev - 1), 1000);
  }
  return () => clearInterval(interval); // Clean cleanup prevents memory leaks
}, [isTimerRunning, timerSeconds, timerMode]);
```

### 3. Data Aggregation & Mathematical Modeling
In `GpaCalculator.js`, the semester SGPA is computed in real time using JavaScript's `.reduce()` array method:
$$\text{SGPA} = \frac{\sum (\text{Credits} \times \text{Grade Points})}{\sum \text{Credits}}$$
This eliminates stale state bugs by deriving the computed score directly during render.

### 4. Cross-Platform Adaptability
The application seamlessly bridges differences between mobile runtimes and web environments with safe platform checks:
```javascript
const showAlert = (title, message) => {
  Platform.OS === 'web' ? window.alert(`${title}\n\n${message}`) : Alert.alert(title, message);
};
```

### 5. 100% Original Implementation
Crafted specifically for college students with zero copy-pasted templates or heavy third-party UI libraries—pure React Native primitive components (`View`, `Text`, `TextInput`, `TouchableOpacity`, `ScrollView`, `SafeAreaView`).

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: v18+ (tested on Node v24)
- **npm** or **yarn**

### 1. Clone & Install
```bash
git clone https://github.com/aditivermacodes/campusmate.git
cd campusmate
npm install
```

### 2. Run in Web Browser (Instant Preview)
```bash
npm run web
```
> Metro will compile the bundle and launch the application directly in your default browser.

### 3. Run on Mobile (Android & iOS)
1. Install **Expo Go** on your device from Google Play Store or Apple App Store.
2. Run the development server:
   ```bash
   npm start
   ```
3. Connect your computer and phone to the **same Wi-Fi network**.
4. Scan the terminal QR code with **Expo Go** (Android) or the default **Camera app** (iOS).

---

## 🛠️ Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) (v0.86.3)
- **Tooling / Runtime**: [Expo](https://expo.dev/) (SDK 57)
- **UI Library**: [React](https://react.dev/) (v19.2.3)
- **Web Bundler**: `@expo/metro-runtime` & `react-native-web`
- **Language**: JavaScript (ES6+)

---

## 👤 Author

**Aditi Verma**  
- GitHub: [@aditivermacodes](https://github.com/aditivermacodes)


