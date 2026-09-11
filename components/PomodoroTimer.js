import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';

const showAlert = (title, message) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};

export default function PomodoroTimer() {
  const [timerSeconds, setTimerSeconds] = useState(25 * 60); // 25 mins
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState('focus'); // 'focus' | 'break'
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      if (timerMode === 'focus') {
        setSessionsCompleted((prev) => prev + 1);
        showAlert(
          'Focus Session Complete!',
          'Great job! You completed a 25-minute study sprint. Take a 5-minute break now.'
        );
        setTimerMode('break');
        setTimerSeconds(5 * 60);
      } else {
        showAlert('Break Over!', 'Ready for another study round? Let’s get focused!');
        setTimerMode('focus');
        setTimerSeconds(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, timerMode]);

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    const paddedMins = mins < 10 ? `0${mins}` : mins;
    const paddedSecs = secs < 10 ? `0${secs}` : secs;
    return `${paddedMins}:${paddedSecs}`;
  };

  const handleTimerToggle = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleTimerReset = () => {
    setIsTimerRunning(false);
    setTimerSeconds(timerMode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const switchTimerMode = (mode) => {
    setIsTimerRunning(false);
    setTimerMode(mode);
    setTimerSeconds(mode === 'focus' ? 25 * 60 : 5 * 60);
  };

  return (
    <View style={styles.container}>
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <Text style={styles.sectionTitle}>Study Pomodoro Timer</Text>
        <Text style={styles.sectionSub}>Stay focused in 25-minute sprints</Text>
      </View>

      {/* Mode Switcher */}
      <View style={styles.timerModeContainer}>
        <TouchableOpacity
          style={[styles.modeTab, timerMode === 'focus' && styles.modeTabActive]}
          onPress={() => switchTimerMode('focus')}
        >
          <Text style={[styles.modeTabText, timerMode === 'focus' && styles.modeTabTextActive]}>
            Focus (25m)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeTab, timerMode === 'break' && styles.modeTabActive]}
          onPress={() => switchTimerMode('break')}
        >
          <Text style={[styles.modeTabText, timerMode === 'break' && styles.modeTabTextActive]}>
            Break (5m)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Circular Display */}
      <View style={[styles.timerCircle, timerMode === 'break' && styles.timerCircleBreak]}>
        <Text style={styles.timerDisplay}>{formatTime(timerSeconds)}</Text>
        <Text style={styles.timerStateLabel}>
          {isTimerRunning ? (timerMode === 'focus' ? 'Focusing...' : 'Resting...') : 'Paused'}
        </Text>
      </View>

      {/* Action Controls */}
      <View style={styles.timerControlRow}>
        <TouchableOpacity
          style={[
            styles.timerButton,
            isTimerRunning ? styles.pauseButton : styles.startButton,
          ]}
          onPress={handleTimerToggle}
        >
          <Text style={styles.timerButtonText}>
            {isTimerRunning ? 'Pause' : 'Start Study'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resetButton} onPress={handleTimerReset}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Study Stats */}
      <View style={styles.timerStatsCard}>
        <Text style={styles.timerStatsTitle}>Today's Focus Record</Text>
        <Text style={styles.timerStatsNumber}>{sessionsCompleted}</Text>
        <Text style={styles.timerStatsSub}>
          {sessionsCompleted * 25} minutes of productive studying done
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  cardHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  sectionSub: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  timerModeContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  modeTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  modeTabActive: {
    backgroundColor: '#FFFFFF',
  },
  modeTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  modeTabTextActive: {
    color: '#0F172A',
    fontWeight: '700',
  },
  timerCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#EEF2FF',
    borderWidth: 8,
    borderColor: '#6366F1',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  timerCircleBreak: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  timerDisplay: {
    fontSize: 48,
    fontWeight: '800',
    color: '#1E293B',
    letterSpacing: 1,
  },
  timerStateLabel: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
    fontWeight: '600',
  },
  timerControlRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
    marginBottom: 20,
  },
  timerButton: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  startButton: {
    backgroundColor: '#10B981',
  },
  pauseButton: {
    backgroundColor: '#F59E0B',
  },
  timerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#E2E8F0',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#334155',
    fontSize: 15,
    fontWeight: '700',
  },
  timerStatsCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  timerStatsTitle: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  timerStatsNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#EF4444',
    marginVertical: 4,
  },
  timerStatsSub: {
    fontSize: 12,
    color: '#94A3B8',
  },
});
