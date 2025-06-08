import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ToastMessageProps = {
  message: string;
  onClose: () => void;
};

const ToastMessage: React.FC<ToastMessageProps> = ({ message, onClose }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Ionicons name="checkmark-circle" size={24} color="#28a745" />
      </View>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={onClose}>
        <Ionicons name="close" size={20} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    borderLeftColor: '#28a745',
    borderLeftWidth: 4,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 999,
  },
  iconWrapper: {
    marginRight: 10,
  },
  message: {
    flex: 1,
    color: '#333',
    fontSize: 14,
  },
});

export default ToastMessage;
