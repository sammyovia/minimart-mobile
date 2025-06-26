// import React from 'react';
// import { SafeAreaView, StatusBar, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
// import { GlobalStyles } from '../../styles/GlobalStyles';
// import { Colors } from '../../constants/Colors';
// import { Layout } from '../../constants/Layout';
// import { Ionicons } from '@expo/vector-icons';
// import { useAuth } from '../../contexts/AuthContext';

// const AdminDashboardScreen = () => {
//   const { user, logout } = useAuth(); // Get admin user details and logout

//   return (
//     <SafeAreaView style={[GlobalStyles.screenContainer, { paddingTop: StatusBar.currentHeight || 0 }]}>
//       {/* Consistent Top Header Section */}
//       <View style={[GlobalStyles.header, { borderBottomWidth: 0, paddingTop: Layout.spacing.md }]}>
//         <View style={GlobalStyles.logo}>
//           <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.primary }}>Admin Dashboard</Text>
//         </View>
//         <View style={GlobalStyles.deliveryAddressContainer}>
//           <Text style={GlobalStyles.deliveryAddressLabel}>ADMIN USER</Text>
//           <Text style={GlobalStyles.deliveryAddressText}>{user?.username || 'N/A'}</Text>
//         </View>
//         <TouchableOpacity style={GlobalStyles.notificationIcon}>
//           <Ionicons name="notifications-outline" size={24} color={Colors.darkGray} />
//         </TouchableOpacity>
//       </View>

//       <View style={localStyles.content}>
//         <Text style={GlobalStyles.heading1}>Welcome, Admin {user?.username}!</Text>
//         <Text style={GlobalStyles.bodyText}>Manage users, products, orders, and more.</Text>

//         <TouchableOpacity style={[GlobalStyles.primaryButton, { marginTop: Layout.spacing.xl }]} onPress={() => console.log('Manage Users')}>
//           <Text style={GlobalStyles.primaryButtonText}>Manage Users</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[GlobalStyles.primaryButton, { marginTop: Layout.spacing.md }]} onPress={() => console.log('View Reports')}>
//           <Text style={GlobalStyles.primaryButtonText}>View Reports</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[GlobalStyles.primaryButton, { marginTop: Layout.spacing.md }]} onPress={() => console.log('Manage Vendors')}>
//           <Text style={GlobalStyles.primaryButtonText}>Manage Vendors</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[GlobalStyles.primaryButton, { marginTop: Layout.spacing.md }]} onPress={() => console.log('Manage Deliveries')}>
//           <Text style={GlobalStyles.primaryButtonText}>Manage Deliveries</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={[GlobalStyles.secondaryButton, { marginTop: Layout.spacing.xxl }]} onPress={logout}>
//           <Text style={GlobalStyles.secondaryButtonText}>Log Out</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const localStyles = StyleSheet.create({
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: Layout.spacing.lg,
//   },
// });

// export default AdminDashboardScreen;