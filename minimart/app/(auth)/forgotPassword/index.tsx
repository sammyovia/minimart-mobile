import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
import { GlobalStyles } from '../../styles/GlobalStyles';

const ForgotPasswordScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    // In a real app, you would send this email to your backend to send a reset link/code
    console.log('Sending password reset email to:', email);

    Alert.alert(
      'Password Reset Link Sent',
      `If an account exists for ${email}, a password reset link has been sent to your inbox.`,
      [
        {
          text: 'OK',
          onPress: () => router.replace('/login'), // Go back to login after sending reset
        },
      ]
    );
  };

  return (
    <SafeAreaView style={GlobalStyles.screenContainer}>
      <KeyboardAvoidingView
        style={GlobalStyles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={localStyles.scrollContent}>
          <View style={localStyles.header}>
            <TouchableOpacity onPress={() => router.back()} style={localStyles.backButton}>
              <Ionicons name="arrow-back" size={28} color={Colors.text} />
            </TouchableOpacity>
            <Text style={localStyles.title}>Forgot Password?</Text>
          </View>

          <Text style={localStyles.description}>
            Enter your email address below and we'll send you a link to reset your password.
          </Text>

          <View style={localStyles.formContainer}>
            <Text style={localStyles.label}>Email Address</Text>
            <TextInput
              style={GlobalStyles.input}
              placeholder="Enter your email"
              placeholderTextColor={Colors.mediumGray}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={GlobalStyles.primaryButton}
              onPress={handleResetPassword}
            >
              <Text style={GlobalStyles.primaryButtonText}>Reset Password</Text>
            </TouchableOpacity>

            <View style={localStyles.backToLoginContainer}>
              <Text style={localStyles.backToLoginText}>Remember your password? </Text>
              <TouchableOpacity onPress={() => router.replace('/login')}>
                <Text style={localStyles.backToLoginLink}>Back to Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Layout.spacing.lg,
    paddingBottom: Layout.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
    paddingHorizontal: Layout.spacing.md,
  },
  backButton: {
    marginRight: Layout.spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Layout.spacing.xl,
    lineHeight: 24,
    paddingHorizontal: Layout.spacing.md,
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: Layout.spacing.xs,
    marginTop: Layout.spacing.md,
    fontWeight: '600',
  },
  backToLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Layout.spacing.xl,
  },
  backToLoginText: {
    color: Colors.textSecondary,
    fontSize: 15,
  },
  backToLoginLink: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default ForgotPasswordScreen;