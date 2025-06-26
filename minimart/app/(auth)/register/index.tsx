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
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../constants/Colors';
import { Layout } from '../constants/Layout';
import { GlobalStyles } from '../styles/GlobalStyles';

type UserRole = 'customer' | 'vendor' | 'delivery' | null;

const RegisterScreen = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const roles: { label: string; value: UserRole }[] = [
    { label: 'Customer', value: 'customer' },
    { label: 'Vendor', value: 'vendor' },
    { label: 'Delivery Agent', value: 'delivery' },
  ];

  const handleRegister = () => {
    // Basic Client-side Validation
    if (!fullName || !email || !password || !confirmPassword || !selectedRole) {
      Alert.alert('Error', 'Please fill in all fields and select a role.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    // In a real app, you would send this data to your backend API
    console.log('Registering with:', { fullName, email, password, selectedRole });

    Alert.alert(
      'Registration Successful',
      `Welcome, ${fullName}! You've signed up as a ${selectedRole}. You can now log in.`,
      [
        {
          text: 'OK',
          onPress: () => router.replace('/login'), // Go to login after successful registration
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
            <Text style={localStyles.title}>Create Your Account</Text>
          </View>

          <View style={localStyles.formContainer}>
            <Text style={localStyles.label}>Full Name</Text>
            <TextInput
              style={GlobalStyles.input}
              placeholder="Enter your full name"
              placeholderTextColor={Colors.mediumGray}
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />

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

            <Text style={localStyles.label}>Password</Text>
            <View style={GlobalStyles.passwordInputContainer}>
              <TextInput
                style={GlobalStyles.passwordInputField}
                placeholder="Enter your password"
                placeholderTextColor={Colors.mediumGray}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={GlobalStyles.passwordVisibilityToggle}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color={Colors.mediumGray}
                />
              </TouchableOpacity>
            </View>

            <Text style={localStyles.label}>Confirm Password</Text>
            <View style={GlobalStyles.passwordInputContainer}>
              <TextInput
                style={GlobalStyles.passwordInputField}
                placeholder="Confirm your password"
                placeholderTextColor={Colors.mediumGray}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={GlobalStyles.passwordVisibilityToggle}
              >
                <Ionicons
                  name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color={Colors.mediumGray}
                />
              </TouchableOpacity>
            </View>

            <Text style={localStyles.label}>I am a:</Text>
            <View style={localStyles.roleSelectionContainer}>
              {roles.map((role) => (
                <TouchableOpacity
                  key={role.value}
                  style={[
                    localStyles.roleButton,
                    selectedRole === role.value ? localStyles.roleButtonActive : {},
                  ]}
                  onPress={() => setSelectedRole(role.value)}
                >
                  <Text
                    style={[
                      localStyles.roleButtonText,
                      selectedRole === role.value ? localStyles.roleButtonTextActive : {},
                    ]}
                  >
                    {role.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={GlobalStyles.primaryButton}
              onPress={handleRegister}
            >
              <Text style={GlobalStyles.primaryButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={localStyles.loginLinkContainer}>
              <Text style={localStyles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.replace('/login')}>
                <Text style={localStyles.loginLink}>Log In</Text>
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
    paddingBottom: Layout.spacing.xl, // Add some padding at the bottom
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
    flex: 1, // Allow title to take remaining space
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
  roleSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Layout.spacing.md,
    marginBottom: Layout.spacing.xl,
    flexWrap: 'wrap', // Allow wrapping for more roles or smaller screens
  },
  roleButton: {
    flex: 1, // Distribute space evenly
    minWidth: '30%', // Ensure buttons don't get too small
    backgroundColor: Colors.lightGray,
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    alignItems: 'center',
    marginHorizontal: Layout.spacing.xs,
    marginBottom: Layout.spacing.md, // For wrapping
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  roleButtonActive: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  roleButtonText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  roleButtonTextActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Layout.spacing.xl,
  },
  loginText: {
    color: Colors.textSecondary,
    fontSize: 15,
  },
  loginLink: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default RegisterScreen;