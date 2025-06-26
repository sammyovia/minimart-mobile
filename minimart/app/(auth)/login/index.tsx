// app/login.tsx (NEW FILE)
import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors } from '../constants/Colors';
import { Layout } from '../constants/Layout';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer'); // Default role for signup/login
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      // Implement a user-friendly message, e.g., a custom modal
      console.log('Please enter email and password.');
      return;
    }
    setLoading(true);
    const success = await login(email, password, selectedRole); // Pass selected role
    setLoading(false);
    if (success) {
      // AuthProvider's useEffect will handle redirection based on role
      // For now, let's explicitly navigate to root after login
      router.replace('/');
    } else {
      // Implement a user-friendly error message, e.g., a custom modal
      console.log('Login failed. Check credentials.');
    }
  };

  return (
    <SafeAreaView style={[GlobalStyles.screenContainer, localStyles.container]}>
      <Text style={GlobalStyles.logoText}>MiniMart</Text>
      <Text style={localStyles.title}>Welcome Back!</Text>

      <TextInput
        style={GlobalStyles.searchInput} // Reusing searchInput style for general input
        placeholder="Email"
        placeholderTextColor={Colors.textSecondary}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={[GlobalStyles.searchInput, { marginTop: Layout.spacing.md }]}
        placeholder="Password"
        placeholderTextColor={Colors.textSecondary}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Role Selection (can be part of signup, or a simple selector for demo) */}
      <View style={localStyles.roleSelectorContainer}>
        <Text style={localStyles.roleLabel}>Login as:</Text>
        {['customer', 'vendor', 'delivery', 'admin'].map((roleType) => (
          <TouchableOpacity
            key={roleType}
            style={[
              localStyles.roleButton,
              selectedRole === roleType ? localStyles.roleButtonActive : {},
            ]}
            onPress={() => setSelectedRole(roleType as UserRole)}
          >
            <Text style={[
              localStyles.roleButtonText,
              selectedRole === roleType ? localStyles.roleButtonTextActive : {},
            ]}>
              {roleType.charAt(0).toUpperCase() + roleType.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>


      <TouchableOpacity
        style={[GlobalStyles.primaryButton, { marginTop: Layout.spacing.lg }]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <Text style={GlobalStyles.primaryButtonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={localStyles.signupTextContainer}>
        <Text style={localStyles.signupText}>Don't have an account? </Text>
        <Text style={[localStyles.signupText, localStyles.signupLink]}>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Layout.spacing.xl,
  },
  roleSelectorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow wrapping for more roles
    justifyContent: 'center',
    marginTop: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
    gap: Layout.spacing.sm, // Space between buttons (RN 0.71+)
  },
  roleLabel: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: Layout.spacing.sm,
    width: '100%', // Take full width
    textAlign: 'center',
  },
  roleButton: {
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
    backgroundColor: Colors.lightGray,
  },
  roleButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  roleButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  roleButtonTextActive: {
    color: Colors.white,
  },
  signupTextContainer: {
    flexDirection: 'row',
    marginTop: Layout.spacing.lg,
  },
  signupText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  signupLink: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

export default LoginScreen;