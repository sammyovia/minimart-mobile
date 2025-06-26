// // app/(delivery)/orders.tsx (NEW FILE)
// import React, { useState, useEffect } from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   Text,
//   View,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import { GlobalStyles } from '../../styles/GlobalStyles';
// import { Colors } from '../../constants/Colors';
// import { Layout } from '../../constants/Layout';
// import { Ionicons } from '@expo/vector-icons';
// import { useAuth } from '../../contexts/AuthContext';
// import { Order } from '../../types';

// const DeliveryOrdersScreen = () => {
//   const { user } = useAuth();
//   const [assignedOrders, setAssignedOrders] = useState<Order[]>([]);
//   const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState<'assigned' | 'completed'>('assigned');

//   // --- API URL Placeholders ---
//   const DELIVERY_ASSIGNED_ORDERS_ENDPOINT = 'YOUR_DJANGO_DELIVERY_ASSIGNED_ORDERS_ENDPOINT'; // e.g., /api/delivery/assigned-orders/
//   const DELIVERY_COMPLETED_ORDERS_ENDPOINT = 'YOUR_DJANGO_DELIVERY_COMPLETED_ORDERS_ENDPOINT'; // e.g., /api/delivery/completed-orders/
//   const MARK_DELIVERED_ENDPOINT = 'YOUR_DJANGO_MARK_DELIVERED_ENDPOINT'; // e.g., /api/orders/{id}/mark-delivered/

//   useEffect(() => {
//     fetchOrders();
//   }, [user]);

//   const fetchOrders = async () => {
//     if (!user || user.role !== 'delivery') {
//       setLoading(false);
//       return;
//     }
//     setLoading(true);
//     try {
//       const assignedResponse = await fetch(`${DELIVERY_ASSIGNED_ORDERS_ENDPOINT}?delivery_id=${user.id}`, {
//         headers: { 'Authorization': `Token YOUR_AUTH_TOKEN` },
//       });
//       const completedResponse = await fetch(`${DELIVERY_COMPLETED_ORDERS_ENDPOINT}?delivery_id=${user.id}`, {
//         headers: { 'Authorization': `Token YOUR_AUTH_TOKEN` },
//       });

//       const assignedData = await assignedResponse.json();
//       const completedData = await completedResponse.json();

//       setAssignedOrders(assignedData);
//       setCompletedOrders(completedData);
//     } catch (error) {
//       console.error('Error fetching delivery orders:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMarkDelivered = async (orderId: number) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${MARK_DELIVERED_ENDPOINT.replace('{id}', orderId.toString())}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Token YOUR_AUTH_TOKEN`,
//         },
//       });
//       if (response.ok) {
//         console.log(`Order ${orderId} marked as delivered.`);
//         fetchOrders(); // Refresh lists
//       } else {
//         const errorData = await response.json();
//         console.error(`Failed to mark order ${orderId} delivered:`, errorData);
//       }
//     } catch (error) {
//       console.error('Network error marking order delivered:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderOrderItem = ({ item }: { item: Order }) => (
//     <View style={[GlobalStyles.card, localStyles.orderCard]}>
//       <View style={localStyles.orderInfo}>
//         <Text style={localStyles.orderTitle}>Order #{item.id}</Text>
//         <Text style={localStyles.orderDetail}>Total: ${item.totalAmount}</Text>
//         <Text style={localStyles.orderDetail}>Status: {item.status.toUpperCase()}</Text>
//         <Text style={localStyles.orderDetail}>Address: {item.deliveryAddress}</Text>
//       </View>
//       {activeTab === 'assigned' && item.status !== 'delivered' && (
//         <TouchableOpacity
//           style={localStyles.markDeliveredButton}
//           onPress={() => handleMarkDelivered(item.id)}
//           disabled={loading}
//         >
//           <Text style={localStyles.markDeliveredButtonText}>Mark Delivered</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );

//   return (
//     <SafeAreaView style={[GlobalStyles.screenContainer, { paddingTop: StatusBar.currentHeight || 0 }]}>
//       {/* Consistent Top Header Section */}
//       <View style={[GlobalStyles.header, { borderBottomWidth: 0, paddingTop: Layout.spacing.md }]}>
//         <View style={GlobalStyles.logo}>
//           <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.primary }}>Delivery Dashboard</Text>
//         </View>
//         <View style={GlobalStyles.deliveryAddressContainer}>
//           <Text style={GlobalStyles.deliveryAddressLabel}>DELIVERY PERSON ID</Text>
//           <Text style={GlobalStyles.deliveryAddressText}>{user?.id || 'N/A'}</Text>
//         </View>
//         <TouchableOpacity style={GlobalStyles.notificationIcon}>
//           <Ionicons name="notifications-outline" size={24} color={Colors.darkGray} />
//         </TouchableOpacity>
//       </View>

//       {/* Tab Selector for Assigned/Completed Orders */}
//       <View style={localStyles.tabSelector}>
//         <TouchableOpacity
//           style={[localStyles.tabButton, activeTab === 'assigned' && localStyles.tabButtonActive]}
//           onPress={() => setActiveTab('assigned')}
//         >
//           <Text style={[localStyles.tabButtonText, activeTab === 'assigned' && localStyles.tabButtonTextActive]}>
//             Assigned ({assignedOrders.length})
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[localStyles.tabButton, activeTab === 'completed' && localStyles.tabButtonActive]}
//           onPress={() => setActiveTab('completed')}
//         >
//           <Text style={[localStyles.tabButtonText, activeTab === 'completed' && localStyles.tabButtonTextActive]}>
//             Completed ({completedOrders.length})
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color={Colors.primary} style={localStyles.loadingIndicator} />
//       ) : (
//         <FlatList
//           data={activeTab === 'assigned' ? assignedOrders : completedOrders}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={renderOrderItem}
//           contentContainerStyle={localStyles.orderListContent}
//           ListEmptyComponent={
//             <View style={localStyles.emptyStateContainer}>
//               <Ionicons name="clipboard-outline" size={80} color={Colors.darkGray} />
//               <Text style={GlobalStyles.bodyText}>No {activeTab} orders.</Text>
//             </View>
//           }
//         />
//       )}
//     </SafeAreaView>
//   );
// };

// const localStyles = StyleSheet.create({
//   loadingIndicator: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyStateContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: Layout.spacing.xl,
//   },
//   tabSelector: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.lightGray,
//     paddingVertical: Layout.spacing.sm,
//     marginHorizontal: Layout.spacing.lg, // Align with content padding
//     marginBottom: Layout.spacing.md,
//   },
//   tabButton: {
//     paddingVertical: Layout.spacing.xs,
//     paddingHorizontal: Layout.spacing.md,
//     borderRadius: Layout.borderRadius.md,
//   },
//   tabButtonActive: {
//     backgroundColor: Colors.primary,
//   },
//   tabButtonText: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: Colors.textSecondary,
//   },
//   tabButtonTextActive: {
//     color: Colors.white,
//   },
//   orderListContent: {
//     paddingHorizontal: Layout.spacing.lg,
//     paddingBottom: Layout.spacing.md,
//   },
//   orderCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: Layout.spacing.md,
//     marginBottom: Layout.spacing.sm,
//     borderRadius: Layout.borderRadius.md,
//     backgroundColor: Colors.white,
//     ...Layout.shadow.small,
//   },
//   orderInfo: {
//     flex: 1,
//   },
//   orderTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: Colors.text,
//     marginBottom: Layout.spacing.xs,
//   },
//   orderDetail: {
//     fontSize: 12,
//     color: Colors.textSecondary,
//     marginBottom: Layout.spacing.xs,
//   },
//   markDeliveredButton: {
//     backgroundColor: Colors.success,
//     paddingVertical: Layout.spacing.sm,
//     paddingHorizontal: Layout.spacing.md,
//     borderRadius: Layout.borderRadius.md,
//     marginLeft: Layout.spacing.md,
//   },
//   markDeliveredButtonText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: Colors.white,
//   },
// });

// export default DeliveryOrdersScreen;