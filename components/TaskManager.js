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

export default function TaskManager() {
  const [taskInput, setTaskInput] = useState('');
  const [taskCategory, setTaskCategory] = useState('Assignment');
  const [taskFilter, setTaskFilter] = useState('all'); // 'all' | 'active' | 'done'
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Complete DSA Lab file & assignment', category: 'Assignment', done: false },
    { id: '2', title: 'Revise Operating System unit 2 notes', category: 'Exam', done: true },
    { id: '3', title: 'Practice React Native component styling', category: 'General', done: false },
    { id: '4', title: 'Check hostel mess menu for dinner', category: 'Hostel', done: true },
  ]);

  const handleAddTask = () => {
    if (!taskInput.trim()) {
      showAlert('Empty Task', 'Please enter a task description before adding.');
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      title: taskInput.trim(),
      category: taskCategory,
      done: false,
    };
    setTasks([newTask, ...tasks]);
    setTaskInput('');
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearCompletedTasks = () => {
    setTasks(tasks.filter((t) => !t.done));
  };

  const filteredTasks = tasks.filter((t) => {
    if (taskFilter === 'active') return !t.done;
    if (taskFilter === 'done') return t.done;
    return true;
  });

  return (
    <View style={styles.container}>
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <Text style={styles.sectionTitle}>Daily Tasks & Deadlines</Text>
        <Text style={styles.sectionSub}>
          {tasks.filter((t) => !t.done).length} pending • {tasks.filter((t) => t.done).length} completed
        </Text>
      </View>

      {/* Input Card */}
      <View style={styles.inputCard}>
        <TextInput
          style={styles.textInput}
          placeholder="What needs to get done? (e.g. Lab file)"
          placeholderTextColor="#999"
          value={taskInput}
          onChangeText={setTaskInput}
        />

        {/* Category Pills */}
        <View style={styles.pillRow}>
          {['Assignment', 'Exam', 'General', 'Hostel'].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.pill, taskCategory === cat && styles.pillActive]}
              onPress={() => setTaskCategory(cat)}
            >
              <Text style={[styles.pillText, taskCategory === cat && styles.pillTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleAddTask}>
          <Text style={styles.primaryButtonText}>➕ Add Task</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Row */}
      <View style={styles.filterRow}>
        <View style={styles.filterGroup}>
          {['all', 'active', 'done'].map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterBtn, taskFilter === f && styles.filterBtnActive]}
              onPress={() => setTaskFilter(f)}
            >
              <Text style={[styles.filterBtnText, taskFilter === f && styles.filterBtnTextActive]}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {tasks.some((t) => t.done) && (
          <TouchableOpacity onPress={clearCompletedTasks}>
            <Text style={styles.clearDoneText}>Clear done</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyIcon}>🎉</Text>
          <Text style={styles.emptyText}>No tasks in this view!</Text>
        </View>
      ) : (
        filteredTasks.map((item) => (
          <View key={item.id} style={[styles.taskItem, item.done && styles.taskItemDone]}>
            <TouchableOpacity
              style={[styles.checkbox, item.done && styles.checkboxDone]}
              onPress={() => toggleTask(item.id)}
            >
              {item.done && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>

            <View style={styles.taskBody}>
              <Text style={[styles.taskTitle, item.done && styles.taskTitleDone]}>
                {item.title}
              </Text>
              <View style={styles.taskMetaRow}>
                <Text style={styles.taskTag}>{item.category}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTask(item.id)}
            >
              <Text style={styles.deleteButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
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
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  filterGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  filterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
  },
  filterBtnActive: {
    backgroundColor: '#1E293B',
  },
  filterBtnText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  filterBtnTextActive: {
    color: '#FFFFFF',
  },
  clearDoneText: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '600',
  },
  taskItem: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  taskItemDone: {
    backgroundColor: '#F8FAFC',
    opacity: 0.75,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxDone: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  checkmark: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 13,
  },
  taskBody: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  taskMetaRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  taskTag: {
    fontSize: 11,
    color: '#6366F1',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontWeight: '600',
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyBox: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '500',
  },
});
