import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';

const GRADE_POINTS = {
  'O': 10,
  'A+': 9,
  'A': 8,
  'B+': 7,
  'B': 6,
  'C': 5,
  'F': 0,
};

const showAlert = (title, message) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};

export default function GpaCalculator() {
  const [subjectName, setSubjectName] = useState('');
  const [subjectCredits, setSubjectCredits] = useState('4');
  const [subjectGrade, setSubjectGrade] = useState('A+');
  const [courses, setCourses] = useState([
    { id: 'c1', name: 'Data Structures & Algorithms', credits: 4, grade: 'O' },
    { id: 'c2', name: 'Computer Networks', credits: 3, grade: 'A+' },
    { id: 'c3', name: 'Operating Systems', credits: 4, grade: 'A' },
    { id: 'c4', name: 'Web Technology Lab', credits: 2, grade: 'O' },
  ]);

  const handleAddCourse = () => {
    if (!subjectName.trim()) {
      showAlert('Missing Subject', 'Please enter a subject name (e.g., Computer Networks).');
      return;
    }
    const creditsNum = parseInt(subjectCredits, 10);
    if (isNaN(creditsNum) || creditsNum <= 0) {
      showAlert('Invalid Credits', 'Credits must be a positive number.');
      return;
    }
    const newCourse = {
      id: Date.now().toString(),
      name: subjectName.trim(),
      credits: creditsNum,
      grade: subjectGrade,
    };
    setCourses([...courses, newCourse]);
    setSubjectName('');
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
  const totalWeightedPoints = courses.reduce(
    (sum, c) => sum + c.credits * (GRADE_POINTS[c.grade] || 0),
    0
  );
  const calculatedSGPA = totalCredits > 0 ? (totalWeightedPoints / totalCredits).toFixed(2) : '0.00';

  return (
    <View style={styles.container}>
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <Text style={styles.sectionTitle}>Semester SGPA Calculator</Text>
        <Text style={styles.sectionSub}>Standard 10-point university scale</Text>
      </View>

      {/* Hero Score Display */}
      <View style={styles.gpaHeroCard}>
        <Text style={styles.gpaHeroLabel}>Estimated Semester SGPA</Text>
        <Text style={styles.gpaHeroScore}>{calculatedSGPA}</Text>
        <Text style={styles.gpaHeroMeta}>
          Based on {courses.length} subjects • {totalCredits} Total Credits
        </Text>
        <View style={styles.gpaStatusPill}>
          <Text style={styles.gpaStatusPillText}>
            {Number(calculatedSGPA) >= 9.0
              ? '🏆 Outstanding (First Class with Distinction)'
              : Number(calculatedSGPA) >= 8.0
              ? '🌟 Excellent Performance'
              : Number(calculatedSGPA) >= 7.0
              ? '👍 Good Standing'
              : '📚 Keep working hard!'}
          </Text>
        </View>
      </View>

      {/* Add Course Form */}
      <View style={styles.inputCard}>
        <Text style={styles.cardSubtitle}>Add Subject / Course</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Subject Name (e.g. Operating Systems)"
          placeholderTextColor="#999"
          value={subjectName}
          onChangeText={setSubjectName}
        />

        <Text style={styles.label}>Credits: ({subjectCredits} Credits)</Text>
        <View style={styles.pillRow}>
          {['1', '2', '3', '4'].map((cr) => (
            <TouchableOpacity
              key={cr}
              style={[styles.pill, subjectCredits === cr && styles.pillActive]}
              onPress={() => setSubjectCredits(cr)}
            >
              <Text style={[styles.pillText, subjectCredits === cr && styles.pillTextActive]}>
                {cr} {cr === '1' ? 'Credit' : 'Credits'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Expected Grade:</Text>
        <View style={styles.pillRow}>
          {Object.keys(GRADE_POINTS).map((gr) => (
            <TouchableOpacity
              key={gr}
              style={[styles.pill, subjectGrade === gr && styles.pillActive]}
              onPress={() => setSubjectGrade(gr)}
            >
              <Text style={[styles.pillText, subjectGrade === gr && styles.pillTextActive]}>
                {gr} ({GRADE_POINTS[gr]} pts)
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleAddCourse}>
          <Text style={styles.primaryButtonText}>➕ Add Subject to GPA</Text>
        </TouchableOpacity>
      </View>

      {/* Course Breakdown */}
      <Text style={styles.courseListHeader}>Current Subject Breakdown</Text>
      {courses.map((c) => (
        <View key={c.id} style={styles.courseItem}>
          <View style={styles.courseInfo}>
            <Text style={styles.courseName}>{c.name}</Text>
            <Text style={styles.courseDetails}>
              {c.credits} Credits • Grade: <Text style={styles.boldGrade}>{c.grade}</Text> ({GRADE_POINTS[c.grade]} pts)
            </Text>
          </View>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteCourse(c.id)}
          >
            <Text style={styles.deleteButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      ))}
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
  gpaHeroCard: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  gpaHeroLabel: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  gpaHeroScore: {
    fontSize: 54,
    fontWeight: '900',
    color: '#38BDF8',
    marginVertical: 6,
  },
  gpaHeroMeta: {
    fontSize: 12,
    color: '#CBD5E1',
    marginBottom: 10,
  },
  gpaStatusPill: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#38BDF8',
  },
  gpaStatusPillText: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '700',
  },
  inputCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardSubtitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1E293B',
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
    marginTop: 4,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 6,
  },
  pill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pillActive: {
    backgroundColor: '#EFF6FF',
    borderColor: '#3B82F6',
  },
  pillText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  pillTextActive: {
    color: '#1D4ED8',
    fontWeight: '700',
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  courseListHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 10,
    marginTop: 6,
  },
  courseItem: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  courseDetails: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  boldGrade: {
    fontWeight: '800',
    color: '#2563EB',
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
