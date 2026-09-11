import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Student motivational quotes list
const STUDY_QUOTES = [
  "“Small daily improvements over time lead to stunning results.”",
  "“Consistency is the key to mastering code and exams.”",
  "“Focus on progress, not perfection. Keep pushing forward!”",
  "“Code. Debug. Learn. Repeat. You’re building the future!”",
  "“Take a deep breath, drink chai, and conquer this semester!”",
];

export default function Header() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const handleNextQuote = () => {
    setQuoteIndex((prevIndex) => (prevIndex + 1) % STUDY_QUOTES.length);
  };

  return (
    <View style={styles.headerContainer}>
      {/* App Branding Row */}
      <View style={styles.brandingRow}>
        <View>
          <Text style={styles.appTitle}>CampusMate</Text>
          <Text style={styles.appSubtitle}>Your Daily Student & Study Hub</Text>
        </View>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>B.Tech </Text>
        </View>
      </View>

      {/* Interactive Motivational Quote Banner */}
      <TouchableOpacity
        style={styles.quoteCard}
        activeOpacity={0.8}
        onPress={handleNextQuote}
      >
        <Text style={styles.quoteText}>{STUDY_QUOTES[quoteIndex]}</Text>
        <Text style={styles.quoteHint}> Tap card for new motivation</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 16,
  },
  brandingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  appTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1E293B',
  },
  appSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  badgeContainer: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4338CA',
  },
  quoteCard: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 14,
    borderLeftWidth: 5,
    borderLeftColor: '#3B82F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  quoteText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#334155',
    lineHeight: 20,
  },
  quoteHint: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 6,
    fontWeight: '600',
  },
});
