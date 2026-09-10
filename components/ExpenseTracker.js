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

const showAlert = (title, message) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};

export default function ExpenseTracker() {
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Chai / Snacks');
  const [expenses, setExpenses] = useState([
    { id: 'e1', title: 'Evening Chai & Samosa', amount: 35, category: 'Chai / Snacks', time: '5:30 PM' },
    { id: 'e2', title: 'Assignment Xerox & Printout', amount: 40, category: 'Stationery', time: '1:15 PM' },
    { id: 'e3', title: 'Hostel Room Supplies', amount: 120, category: 'Hostel', time: 'Yesterday' },
  ]);

  const handleAddExpense = () => {
    if (!expenseTitle.trim()) {
      showAlert('Missing Title', 'Please enter what you spent money on (e.g., Chai, Photocopy).');
      return;
    }
    const amountNum = parseFloat(expenseAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      showAlert('Invalid Amount', 'Please enter a valid amount in ₹.');
      return;
    }
    const newExp = {
      id: Date.now().toString(),
      title: expenseTitle.trim(),
      amount: amountNum,
      category: expenseCategory,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setExpenses([newExp, ...expenses]);
    setExpenseTitle('');
    setExpenseAmount('');
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <View style={styles.container}>
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <Text style={styles.sectionTitle}>Daily Pocket Expenses</Text>
        <Text style={styles.sectionSub}>Keep track of college & hostel spending</Text>
      </View>

      {/* Balance Summary Hero */}
      <View style={styles.expenseHeroCard}>
        <Text style={styles.expenseHeroLabel}>Total Spent Logged</Text>
        <Text style={styles.expenseHeroAmount}>₹{totalSpent.toFixed(2)}</Text>
        <Text style={styles.expenseHeroMeta}>
          Across {expenses.length} student purchases
        </Text>
      </View>

      {/* Add Expense Input Card */}
      <View style={styles.inputCard}>
        <Text style={styles.cardSubtitle}>Log New Expense</Text>
        <TextInput
          style={styles.textInput}
          placeholder="What did you buy? (e.g. Samosa, Notebook)"
          placeholderTextColor="#999"
          value={expenseTitle}
          onChangeText={setExpenseTitle}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Amount in ₹ (e.g. 50)"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={expenseAmount}
          onChangeText={setExpenseAmount}
        />

        <Text style={styles.label}>Category:</Text>
        <View style={styles.pillRow}>
          {['Chai / Snacks', 'Stationery', 'Hostel', 'Travel', 'Other'].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.pill, expenseCategory === cat && styles.pillActive]}
              onPress={() => setExpenseCategory(cat)}
            >
              <Text style={[styles.pillText, expenseCategory === cat && styles.pillTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleAddExpense}>
          <Text style={styles.primaryButtonText}>💸 Add Expense Entry</Text>
        </TouchableOpacity>
      </View>

      {/* Expense History */}
      <Text style={styles.courseListHeader}>Recent Expense Logs</Text>
      {expenses.map((exp) => (
        <View key={exp.id} style={styles.expenseItem}>
          <View style={styles.expenseMain}>
            <Text style={styles.expenseTitle}>{exp.title}</Text>
            <Text style={styles.expenseMeta}>
              {exp.category} • {exp.time}
            </Text>
          </View>
          <View style={styles.expenseRight}>
            <Text style={styles.expenseCost}>- ₹{exp.amount}</Text>
            <TouchableOpacity
              style={styles.deleteButtonSmall}
              onPress={() => deleteExpense(exp.id)}
            >
              <Text style={styles.deleteButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
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
  expenseHeroCard: {
    backgroundColor: '#0F766E',
    padding: 20,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  expenseHeroLabel: {
    fontSize: 13,
    color: '#CCFBF1',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  expenseHeroAmount: {
    fontSize: 44,
    fontWeight: '900',
    color: '#FFFFFF',
    marginVertical: 4,
  },
  expenseHeroMeta: {
    fontSize: 12,
    color: '#99F6E4',
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
  expenseItem: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  expenseMain: {
    flex: 1,
  },
  expenseTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  expenseMeta: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  expenseRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  expenseCost: {
    fontSize: 15,
    fontWeight: '700',
    color: '#DC2626',
  },
  deleteButtonSmall: {
    padding: 6,
  },
  deleteButtonText: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
