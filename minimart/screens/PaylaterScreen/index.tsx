// // app/(customer)/paylater.tsx (NEW FILE - or adjust if part of existing checkout flow)
// import React, { useState } from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   Text,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   ActivityIndicator,
// } from 'react-native';
// import { GlobalStyles } from '../../styles/GlobalStyles';
// import { Colors } from '../../constants/Colors';
// import { Layout } from '../../constants/Layout';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { useAuth } from '../../contexts/AuthContext';
// import { useCart } from '../../contexts/CartContext'; // To get cart total

// const PaylaterScreen = () => {
//   const router = useRouter();
//   const { user } = useAuth();
//   const { cartItems, clearCart } = useCart(); // Assuming you have cart total logic
//   const [loadingEligibility, setLoadingEligibility] = useState(false);
//   const [eligibilityResult, setEligibilityResult] = useState<boolean | null>(null);
//   const [selectedPayOption, setSelectedPayOption] = useState<'Outright' | 'Pay 40%' | 'Pay 0%'>('Outright');
//   const [paymentProcessing, setPaymentProcessing] = useState(false);

//   const totalAmount = cartItems.reduce(
//     (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
//     0
//   ) + 10; // + shipping

//   // --- API URL Placeholders ---
//   const PAYLATER_ELIGIBILITY_ENDPOINT = 'YOUR_DJANGO_PAYLATER_ELIGIBILITY_ENDPOINT'; // e.g., /api/paylater/eligibility/
//   const PROCESS_ORDER_ENDPOINT = 'YOUR_DJANGO_PROCESS_ORDER_ENDPOINT'; // e.g., /api/orders/create/

//   const checkEligibility = async () => {
//     if (!user) {
//       console.log('Please log in to check eligibility.'); // Custom modal
//       return;
//     }
//     setLoadingEligibility(true);
//     setEligibilityResult(null);
//     try {
//       // Send user data or criteria to backend
//       const response = await fetch(PAYLATER_ELIGIBILITY_ENDPOINT, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Token YOUR_AUTH_TOKEN`,
//         },
//         body: JSON.stringify({
//           user_id: user.id,
//           // Add other user/financial data needed for eligibility check
//         }),
//       });
//       const data = await response.json();
//       setEligibilityResult(data.is_eligible); // Assuming backend returns { is_eligible: true/false }
//     } catch (error) {
//       console.error('Error checking eligibility:', error);
//       setEligibilityResult(false);
//     } finally {
//       setLoadingEligibility(false);
//     }
//   };

//   const handlePlaceOrder = async () => {
//     if (!user) {
//       console.log('User not logged in.');
//       return;
//     }
//     setPaymentProcessing(true);
//     try {
//       const response = await fetch(PROCESS_ORDER_ENDPOINT, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Token YOUR_AUTH_TOKEN`,
//         },
//         body: JSON.stringify({
//           customer_id: user.id,
//           products: cartItems.map(item => ({ product_id: item.product.id, quantity: item.quantity })),
//           total_amount: totalAmount.toFixed(2),
//           delivery_address: 'Umuezike Road, Oyo State', // Replace with actual selected address
//           paylater_option: selectedPayOption,
//           paylater_eligibility: eligibilityResult, // Send eligibility result if checked
//         }),
//       });

//       if (response.ok) {
//         console.log('Order placed successfully!');
//         clearCart(); // Clear the cart after successful order
//         router.replace('/(tabs)/order-confirmation'); // Navigate to a confirmation screen
//       } else {
//         const errorData = await response.json();
//         console.error('Failed to place order:', errorData);
//         // Show error message
//       }
//     } catch (error) {
//       console.error('Network error placing order:', error);
//     } finally {
//       setPaymentProcessing(false);
//     }
//   };


//   return (
//     <SafeAreaView style={[GlobalStyles.screenContainer, { paddingTop: StatusBar.currentHeight || 0 }]}>
//       {/* Header */}
//       <View style={[GlobalStyles.header, { borderBottomWidth: 0, paddingTop: Layout.spacing.md }]}>
//         <TouchableOpacity onPress={() => router.back()} style={GlobalStyles.flexRow}>
//           <Ionicons name="arrow-back" size={24} color={Colors.text} />
//           <Text style={[GlobalStyles.headerTitle, { marginLeft: Layout.spacing.sm }]}>Pay Later Options</Text>
//         </TouchableOpacity>
//         {/* You can still have notification icon if needed */}
//         <TouchableOpacity style={GlobalStyles.notificationIcon}>
//           <Ionicons name="notifications-outline" size={24} color={Colors.darkGray} />
//         </TouchableOpacity>
//       </View>

//       <View style={[GlobalStyles.contentPadding, localStyles.content]}>
//         <Text style={localStyles.paylaterTitle}>Pay Later Application</Text>
//         <Text style={localStyles.currentTotal}>Current Total: ${totalAmount.toFixed(2)}</Text>

//         {/* Eligibility Check Section */}
//         <View style={localStyles.sectionContainer}>
//           <Text style={localStyles.sectionHeader}>Check Eligibility</Text>
//           <TouchableOpacity
//             style={GlobalStyles.primaryButton}
//             onPress={checkEligibility}
//             disabled={loadingEligibility}
//           >
//             {loadingEligibility ? (
//               <ActivityIndicator color={Colors.white} />
//             ) : (
//               <Text style={GlobalStyles.primaryButtonText}>Check My Eligibility</Text>
//             )}
//           </TouchableOpacity>
//           {eligibilityResult !== null && (
//             <Text style={[
//               localStyles.eligibilityResult,
//               { color: eligibilityResult ? Colors.success : Colors.danger }
//             ]}>
//               {eligibilityResult ? 'You are eligible!' : 'Sorry, you are not eligible.'}
//             </Text>
//           )}
//         </View>

//         {/* Pay Option Selection */}
//         <View style={localStyles.sectionContainer}>
//           <Text style={localStyles.sectionHeader}>Choose Payment Option</Text>
//           {['Outright', 'Pay 40%', 'Pay 0%'].map((option) => (
//             <TouchableOpacity
//               key={option}
//               style={[
//                 localStyles.payOptionButton,
//                 selectedPayOption === option ? localStyles.payOptionButtonActive : {},
//               ]}
//               onPress={() => setSelectedPayOption(option as 'Outright' | 'Pay 40%' | 'Pay 0%')}
//             >
//               <Text style={[
//                 localStyles.payOptionButtonText,
//                 selectedPayOption === option ? localStyles.payOptionButtonTextActive : {},
//               ]}>
//                 {option}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Place Order Button */}
//         <TouchableOpacity
//           style={[GlobalStyles.primaryButton, { marginTop: 'auto' }]} // Push to bottom
//           onPress={handlePlaceOrder}
//           disabled={paymentProcessing}
//         >
//           {paymentProcessing ? (
//             <ActivityIndicator color={Colors.white} />
//           ) : (
//             <Text style={GlobalStyles.primaryButtonText}>Place Order</Text>
//           )}
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const localStyles = StyleSheet.create({
//   content: {
//     flex: 1,
//     paddingTop: Layout.spacing.md,
//   },
//   paylaterTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: Colors.text,
//     textAlign: 'center',
//     marginBottom: Layout.spacing.md,
//   },
//   currentTotal: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: Colors.textPrimary,
//     textAlign: 'center',
//     marginBottom: Layout.spacing.lg,
//   },
//   sectionContainer: {
//     backgroundColor: Colors.white,
//     borderRadius: Layout.borderRadius.md,
//     padding: Layout.spacing.lg,
//     marginBottom: Layout.spacing.md,
//     ...Layout.shadow.small,
//   },
//   sectionHeader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: Colors.text,
//     marginBottom: Layout.spacing.md,
//   },
//   eligibilityResult: {
//     marginTop: Layout.spacing.md,
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   payOptionButton: {
//     paddingVertical: Layout.spacing.sm,
//     paddingHorizontal: Layout.spacing.md,
//     borderRadius: Layout.borderRadius.md,
//     borderWidth: 1,
//     borderColor: Colors.mediumGray,
//     backgroundColor: Colors.lightGray,
//     marginBottom: Layout.spacing.sm,
//   },
//   payOptionButtonActive: {
//     backgroundColor: Colors.primary,
//     borderColor: Colors.primary,
//   },
//   payOptionButtonText: {
//     fontSize: 16,
//     color: Colors.text,
//   },
//   payOptionButtonTextActive: {
//     color: Colors.white,
//     fontWeight: 'bold',
//   },
// });

// export default PaylaterScreen;