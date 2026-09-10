import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Modular Component Imports
import Header from './components/Header';
import TaskManager from './components/TaskManager';
import PomodoroTimer from './components/PomodoroTimer';
import GpaCalculator from './components/GpaCalculator';
import ExpenseTracker from './components/ExpenseTracker';

export default function App() {
  // Navigation State: 'tasks' | 'timer' | 'gpa' | 'expenses'
  const [activeTab, setActiveTab] = useState('tasks');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        
        {/* App Header & Daily Motivation */}
        <Header />

        {/* Top Navigation Tab Bar */}
        <View style={styles.navBar}>
          <TouchableOpacity
            style={[styles.navButton, activeTab === 'tasks' && styles.navButtonActive]}
            onPress={() => setActiveTab('tasks')}
          >
            <Text style={[styles.navText, activeTab === 'tasks' && styles.navTextActive]}>
              📋 Tasks
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, activeTab === 'timer' && styles.navButtonActive]}
            onPress={() => setActiveTab('timer')}
          >
            <Text style={[styles.navText, activeTab === 'timer' && styles.navTextActive]}>
              ⏱️ Focus
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, activeTab === 'gpa' && styles.navButtonActive]}
            onPress={() => setActiveTab('gpa')}
          >
            <Text style={[styles.navText, activeTab === 'gpa' && styles.navTextActive]}>
              📊 SGPA
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, activeTab === 'expenses' && styles.navButtonActive]}
            onPress={() => setActiveTab('expenses')}
          >
            <Text style={[styles.navText, activeTab === 'expenses' && styles.navTextActive]}>
              💸 Expenses
            </Text>
          </TouchableOpacity>
        </View>

        {/* Modular Screen Switcher */}
        {activeTab === 'tasks' && <TaskManager />}
        {activeTab === 'timer' && <PomodoroTimer />}
        {activeTab === 'gpa' && <GpaCalculator />}
        {activeTab === 'expenses' && <ExpenseTracker />}

        {/* App Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>CampusMate • Student Productivity Hub</Text>
          <Text style={styles.footerSub}>Built with React Native & Expo</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    padding: 4,
    borderRadius: 14,
    marginBottom: 16,
  },
  navButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  navButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  navText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  navTextActive: {
    color: '#2563EB',
    fontWeight: '700',
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
    paddingVertical: 12,
  },
  footerText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  footerSub: {
    fontSize: 11,
    color: '#CBD5E1',
    marginTop: 2,
  },
});
