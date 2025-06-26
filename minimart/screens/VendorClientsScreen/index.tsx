// // app/(vendor)/clients.tsx (NEW FILE)
// import React from 'react';
// import { SafeAreaView, StatusBar, Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import { GlobalStyles } from '../../styles/GlobalStyles';
// import { Colors } from '../../constants/Colors';
// import { Layout } from '../../constants/Layout';
// import { Ionicons } from '@expo/vector-icons';
// import { useAuth } from '../../contexts/AuthContext'; // To get vendor user details

// const clientsData = [ // Dummy client data
//   { id: 1, name: 'Alice Smith', email: 'alice@example.com', totalOrders: 5 },
//   { id: 2, name: 'Bob Johnson', email: 'bob@example.com', totalOrders: 2 },
//   { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', totalOrders: 8 },
// ];

// const VendorClientsScreen = () => {
//   const { user } = useAuth(); // Assuming useAuth provides user details

//   const renderClientItem = ({ item }: { item: typeof clientsData[0] }) => (
//     <View style={[GlobalStyles.card, localStyles.clientCard]}>
//       <View style={localStyles.clientInfo}>
//         <Text style={localStyles.clientName}>{item.name}</Text>
//         <Text style={localStyles.clientEmail}>{item.email}</Text>
//       </View>
//       <Text style={localStyles.clientOrders}>Orders: {item.totalOrders}</Text>
//     </View>
//   );

//   return (
//     <SafeAreaView style={[GlobalStyles.screenContainer, { paddingTop: StatusBar.currentHeight || 0 }]}>
//       {/* Consistent Top Header Section for Vendor Dashboard */}
//       <View style={[GlobalStyles.header, { borderBottomWidth: 0, paddingTop: Layout.spacing.md }]}>
//         <View style={GlobalStyles.logo}>
//           <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.primary }}>Vendor Dashboard</Text>
//         </View>
//         <View style={GlobalStyles.deliveryAddressContainer}>
//           <Text style={GlobalStyles.deliveryAddressLabel}>VENDOR ID</Text>
//           <Text style={GlobalStyles.deliveryAddressText}>{user?.id || 'N/A'}</Text>
//         </View>
//         <TouchableOpacity style={GlobalStyles.notificationIcon}>
//           <Ionicons name="notifications-outline" size={24} color={Colors.darkGray} />
//         </TouchableOpacity>
//       </View>

//       {/* Clients Section */}
//       <View style={[GlobalStyles.contentPadding, localStyles.sectionHeaderContainer]}>
//         <Text style={GlobalStyles.heading2}>Your Clients ({clientsData.length})</Text>
//       </View>

//       <FlatList
//         data={clientsData}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderClientItem}
//         contentContainerStyle={localStyles.clientListContent}
//         ListEmptyComponent={
//           <View style={localStyles.emptyStateContainer}>
//             <Ionicons name="people-outline" size={80} color={Colors.darkGray} />
//             <Text style={GlobalStyles.bodyText}>No clients yet.</Text>
//           </View>
//         }
//       />
//     </SafeAreaView>
//   );
// };

// const localStyles = StyleSheet.create({
//   sectionHeaderContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: Layout.spacing.md,
//     marginTop: Layout.spacing.sm,
//   },
//   clientListContent: {
//     paddingHorizontal: Layout.spacing.lg,
//     paddingBottom: Layout.spacing.md,
//   },
//   clientCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: Layout.spacing.md,
//     marginBottom: Layout.spacing.sm,
//     borderRadius: Layout.borderRadius.md,
//     backgroundColor: Colors.white,
//     ...Layout.shadow.small,
//   },
//   clientInfo: {
//     flex: 1,
//   },
//   clientName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: Colors.text,
//   },
//   clientEmail: {
//     fontSize: 12,
//     color: Colors.textSecondary,
//   },
//   clientOrders: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: Colors.primary,
//   },
//   emptyStateContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: Layout.spacing.xl,
//   },
// });

// export default VendorClientsScreen;