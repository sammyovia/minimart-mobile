// // app/(vendor)/offers.tsx (NEW FILE)
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
// import { Offer, Product } from '../../types'; // Import Offer and Product types

// // Assuming a way to get product details from its ID if needed (e.g., from a global products array or another API call)
// import { products as allProducts } from '../../data/products'; // Or fetch this from backend

// const VendorOffersScreen = () => {
//   const { user } = useAuth();
//   const [offers, setOffers] = useState<Offer[]>([]);
//   const [loading, setLoading] = useState(true);

//   // --- API URL Placeholders ---
//   const VENDOR_OFFERS_ENDPOINT = 'YOUR_DJANGO_VENDOR_OFFERS_ENDPOINT'; // e.g., /api/vendor/offers/
//   const ACCEPT_OFFER_ENDPOINT = 'YOUR_DJANGO_ACCEPT_OFFER_ENDPOINT'; // e.g., /api/offers/{id}/accept/
//   const DECLINE_OFFER_ENDPOINT = 'YOUR_DJANGO_DECLINE_OFFER_ENDPOINT'; // e.g., /api/offers/{id}/decline/

//   useEffect(() => {
//     fetchVendorOffers();
//   }, [user]);

//   const fetchVendorOffers = async () => {
//     if (!user || user.role !== 'vendor') {
//       setLoading(false);
//       return;
//     }
//     setLoading(true);
//     try {
//       // Fetch offers relevant to this vendor's products
//       const response = await fetch(`${VENDOR_OFFERS_ENDPOINT}?vendor_id=${user.id}`, {
//         headers: {
//           'Authorization': `Token YOUR_AUTH_TOKEN`,
//         },
//       });
//       const data = await response.json();
//       setOffers(data);
//     } catch (error) {
//       console.error('Error fetching vendor offers:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOfferAction = async (offerId: number, action: 'accept' | 'decline') => {
//     setLoading(true);
//     try {
//       const endpoint = action === 'accept' ? ACCEPT_OFFER_ENDPOINT : DECLINE_OFFER_ENDPOINT;
//       const response = await fetch(`${endpoint.replace('{id}', offerId.toString())}`, {
//         method: 'POST', // Or PUT, PATCH depending on your API design
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Token YOUR_AUTH_TOKEN`,
//         },
//       });

//       if (response.ok) {
//         console.log(`Offer ${offerId} ${action}ed successfully.`);
//         fetchVendorOffers(); // Refresh offers list
//       } else {
//         const errorData = await response.json();
//         console.error(`Failed to ${action} offer ${offerId}:`, errorData);
//       }
//     } catch (error) {
//       console.error(`Network error during offer ${action}:`, error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderOfferItem = ({ item }: { item: Offer }) => {
//     const product = allProducts.find(p => p.id === item.productId); // Find product details
//     const offerStatusColor = item.status === 'accepted' ? Colors.success :
//                               item.status === 'declined' ? Colors.danger :
//                               Colors.darkGray; // Pending

//     return (
//       <View style={[GlobalStyles.card, localStyles.offerCard]}>
//         <View style={localStyles.offerInfo}>
//           <Text style={localStyles.offerProduct}>Product: {product?.name || 'Unknown Product'}</Text>
//           <Text style={localStyles.offerAmount}>Offer: ${item.offerAmount}</Text>
//           <Text style={localStyles.offerStatus}>Status: <Text style={{ color: offerStatusColor, fontWeight: 'bold' }}>{item.status.toUpperCase()}</Text></Text>
//           <Text style={localStyles.offerDetails}>From Customer ID: {item.customerId}</Text>
//         </View>
//         {item.status === 'pending' && (
//           <View style={localStyles.offerActions}>
//             <TouchableOpacity
//               style={[localStyles.actionButton, localStyles.acceptButton]}
//               onPress={() => handleOfferAction(item.id, 'accept')}
//               disabled={loading}
//             >
//               <Text style={localStyles.actionButtonText}>Accept</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[localStyles.actionButton, localStyles.declineButton]}
//               onPress={() => handleOfferAction(item.id, 'decline')}
//               disabled={loading}
//             >
//               <Text style={localStyles.actionButtonText}>Decline</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     );
//   };

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

//       {/* Offers Section */}
//       <View style={[GlobalStyles.contentPadding, localStyles.sectionHeaderContainer]}>
//         <Text style={GlobalStyles.heading2}>Offers ({offers.length})</Text>
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color={Colors.primary} style={localStyles.loadingIndicator} />
//       ) : offers.length === 0 ? (
//         <View style={localStyles.emptyStateContainer}>
//           <Ionicons name="pricetags-outline" size={80} color={Colors.darkGray} />
//           <Text style={GlobalStyles.bodyText}>No offers received yet.</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={offers}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={renderOfferItem}
//           contentContainerStyle={localStyles.offerListContent}
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
//   sectionHeaderContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: Layout.spacing.md,
//     marginTop: Layout.spacing.sm,
//   },
//   offerListContent: {
//     paddingHorizontal: Layout.spacing.lg,
//     paddingBottom: Layout.spacing.md,
//   },
//   offerCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: Layout.spacing.md,
//     marginBottom: Layout.spacing.sm,
//     borderRadius: Layout.borderRadius.md,
//     backgroundColor: Colors.white,
//     ...Layout.shadow.small,
//   },
//   offerInfo: {
//     flex: 1,
//   },
//   offerProduct: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: Colors.text,
//     marginBottom: Layout.spacing.xs,
//   },
//   offerAmount: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: Colors.primary,
//     marginBottom: Layout.spacing.xs,
//   },
//   offerStatus: {
//     fontSize: 12,
//     color: Colors.textSecondary,
//     marginBottom: Layout.spacing.xs,
//   },
//   offerDetails: {
//     fontSize: 12,
//     color: Colors.textSecondary,
//   },
//   offerActions: {
//     flexDirection: 'row',
//     marginLeft: Layout.spacing.md,
//   },
//   actionButton: {
//     paddingVertical: Layout.spacing.xs,
//     paddingHorizontal: Layout.spacing.sm,
//     borderRadius: Layout.borderRadius.sm,
//     marginLeft: Layout.spacing.sm,
//   },
//   actionButtonText: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: Colors.white,
//   },
//   acceptButton: {
//     backgroundColor: Colors.success,
//   },
//   declineButton: {
//     backgroundColor: Colors.danger,
//   },
// });

// export default VendorOffersScreen;