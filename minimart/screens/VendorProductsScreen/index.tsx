// // app/(vendor)/products.tsx (NEW FILE)
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   StatusBar,
//   TouchableOpacity,
//   FlatList,
//   Image,
//   TextInput,
//   StyleSheet,
//   ActivityIndicator,
//   Modal, // For upload modal
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { GlobalStyles } from '../../styles/GlobalStyles';
// import { Colors } from '../../constants/Colors';
// import { Layout } from '../../constants/Layout';
// import { useAuth } from '../../contexts/AuthContext';
// import { VendorProduct } from '../../types'; // Ensure VendorProduct type is defined

// const VendorProductsScreen = () => {
//   const { user } = useAuth(); // Get vendor user details
//   const [products, setProducts] = useState<VendorProduct[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isUploadModalVisible, setUploadModalVisible] = useState(false);
//   const [newProductName, setNewProductName] = useState('');
//   const [newProductPrice, setNewProductPrice] = useState('');
//   const [newProductDescription, setNewProductDescription] = useState('');
//   const [isDistressSale, setIsDistressSale] = useState(false);

//   // --- API URL Placeholders ---
//   const VENDOR_PRODUCTS_ENDPOINT = 'YOUR_DJANGO_VENDOR_PRODUCTS_ENDPOINT'; // e.g., /api/vendor/products/
//   const UPLOAD_PRODUCT_ENDPOINT = 'YOUR_DJANGO_UPLOAD_PRODUCT_ENDPOINT'; // e.g., /api/vendor/products/upload/

//   useEffect(() => {
//     fetchVendorProducts();
//   }, [user]); // Refetch if user changes (e.g., re-login)

//   const fetchVendorProducts = async () => {
//     if (!user || user.role !== 'vendor') {
//       setLoading(false);
//       return;
//     }
//     setLoading(true);
//     try {
//       // Replace with your actual API call to fetch vendor's products
//       // You'll likely need to send an auth token in headers
//       const response = await fetch(`${VENDOR_PRODUCTS_ENDPOINT}?vendor_id=${user.id}`, {
//         headers: {
//           'Authorization': `Token YOUR_AUTH_TOKEN`, // Replace with actual token from auth context/storage
//         },
//       });
//       const data = await response.json();
//       setProducts(data); // Assuming data is an array of VendorProduct
//     } catch (error) {
//       console.error('Error fetching vendor products:', error);
//       // Handle error, e.g., show error message
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleProductUpload = async () => {
//     if (!user || !newProductName || !newProductPrice || !newProductDescription) {
//       console.log('Please fill all fields'); // Use a custom modal for user feedback
//       return;
//     }

//     setLoading(true);
//     try {
//       // Replace with your actual API call to upload a new product
//       // For image, you'd typically use FormData and a file picker (e.g., expo-image-picker)
//       const response = await fetch(UPLOAD_PRODUCT_ENDPOINT, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json', // Or 'multipart/form-data' if sending image directly
//           'Authorization': `Token YOUR_AUTH_TOKEN`, // Replace with actual token
//         },
//         body: JSON.stringify({
//           name: newProductName,
//           price: newProductPrice,
//           description: newProductDescription,
//           is_distress_sale: isDistressSale,
//           vendor_id: user.id, // Link to the current vendor
//           // image: 'base64_image_string_or_image_url' // Handle image upload properly
//         }),
//       });

//       if (response.ok) {
//         console.log('Product uploaded successfully!');
//         setUploadModalVisible(false);
//         setNewProductName('');
//         setNewProductPrice('');
//         setNewProductDescription('');
//         setIsDistressSale(false);
//         fetchVendorProducts(); // Refresh the list
//       } else {
//         const errorData = await response.json();
//         console.error('Failed to upload product:', errorData);
//         // Show error message
//       }
//     } catch (error) {
//       console.error('Network error during product upload:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderProductItem = ({ item }: { item: VendorProduct }) => (
//     <View style={[GlobalStyles.card, localStyles.productCard]}>
//       <Image source={item.image} style={localStyles.productImage} />
//       <View style={localStyles.productInfo}>
//         <Text style={localStyles.productNameText}>{item.name}</Text>
//         <Text style={localStyles.productPriceText}>${item.price}</Text>
//         <Text style={localStyles.productStock}>Stock: {item.stock}</Text>
//         {item.isDistressSale && (
//           <Text style={localStyles.distressSaleTag}>Distress Sale!</Text>
//         )}
//       </View>
//       <View style={localStyles.productActions}>
//         {/* Add Edit/Delete buttons here */}
//         <TouchableOpacity style={localStyles.actionButton}>
//           <Ionicons name="create-outline" size={20} color={Colors.primary} />
//         </TouchableOpacity>
//         <TouchableOpacity style={localStyles.actionButton}>
//           <Ionicons name="trash-outline" size={20} color={Colors.danger} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={[GlobalStyles.screenContainer, { paddingTop: StatusBar.currentHeight || 0 }]}>
//       {/* Top Header Section for Vendor Dashboard */}
//       <View style={[GlobalStyles.header, { borderBottomWidth: 0, paddingTop: Layout.spacing.md }]}>
//         <View style={GlobalStyles.logo}>
//           <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.primary }}>Vendor Dashboard</Text>
//         </View>
//         <View style={GlobalStyles.deliveryAddressContainer}>
//           {/* Adapt to vendor context, e.g., Vendor ID or Store Name */}
//           <Text style={GlobalStyles.deliveryAddressLabel}>VENDOR ID</Text>
//           <Text style={GlobalStyles.deliveryAddressText}>{user?.id || 'N/A'}</Text>
//         </View>
//         <TouchableOpacity style={GlobalStyles.notificationIcon}>
//           <Ionicons name="notifications-outline" size={24} color={Colors.darkGray} />
//         </TouchableOpacity>
//       </View>

//       {/* Search Bar for products */}
//       <View style={GlobalStyles.searchInputContainer}>
//         <Ionicons name="search" size={20} color={Colors.darkGray} style={GlobalStyles.searchIcon} />
//         <TextInput
//           style={GlobalStyles.searchInput}
//           placeholder="Search products..."
//           placeholderTextColor={Colors.textSecondary}
//         />
//       </View>

//       {/* Products Section */}
//       <View style={[GlobalStyles.contentPadding, localStyles.sectionHeaderContainer]}>
//         <Text style={GlobalStyles.heading2}>Your Products ({products.length})</Text>
//         <TouchableOpacity
//           style={GlobalStyles.primaryButton}
//           onPress={() => setUploadModalVisible(true)}
//         >
//           <Text style={GlobalStyles.primaryButtonText}>Upload Product</Text>
//         </TouchableOpacity>
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color={Colors.primary} style={localStyles.loadingIndicator} />
//       ) : products.length === 0 ? (
//         <View style={localStyles.emptyStateContainer}>
//           <Ionicons name="cube-outline" size={80} color={Colors.darkGray} />
//           <Text style={GlobalStyles.bodyText}>No products found. Upload your first product!</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={products}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={renderProductItem}
//           contentContainerStyle={localStyles.productListContent}
//         />
//       )}

//       {/* Product Upload Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={isUploadModalVisible}
//         onRequestClose={() => setUploadModalVisible(false)}
//       >
//         <View style={localStyles.modalOverlay}>
//           <View style={localStyles.modalContent}>
//             <Text style={localStyles.modalTitle}>Upload New Product</Text>
//             <TextInput
//               style={GlobalStyles.searchInput}
//               placeholder="Product Name"
//               value={newProductName}
//               onChangeText={setNewProductName}
//             />
//             <TextInput
//               style={[GlobalStyles.searchInput, { marginTop: Layout.spacing.sm }]}
//               placeholder="Price"
//               value={newProductPrice}
//               onChangeText={setNewProductPrice}
//               keyboardType="numeric"
//             />
//             <TextInput
//               style={[GlobalStyles.searchInput, { marginTop: Layout.spacing.sm, height: 80 }]}
//               placeholder="Description"
//               value={newProductDescription}
//               onChangeText={setNewProductDescription}
//               multiline
//             />
//             <View style={localStyles.checkboxContainer}>
//               <TouchableOpacity onPress={() => setIsDistressSale(!isDistressSale)}>
//                 <Ionicons
//                   name={isDistressSale ? 'checkbox-outline' : 'square-outline'}
//                   size={24}
//                   color={isDistressSale ? Colors.primary : Colors.darkGray}
//                 />
//               </TouchableOpacity>
//               <Text style={localStyles.checkboxLabel}>Tag as Distress Sale</Text>
//             </View>

//             <TouchableOpacity
//               style={[GlobalStyles.primaryButton, { marginTop: Layout.spacing.lg }]}
//               onPress={handleProductUpload}
//               disabled={loading}
//             >
//               {loading ? (
//                 <ActivityIndicator color={Colors.white} />
//               ) : (
//                 <Text style={GlobalStyles.primaryButtonText}>Upload</Text>
//               )}
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[GlobalStyles.secondaryButton, { marginTop: Layout.spacing.sm }]}
//               onPress={() => setUploadModalVisible(false)}
//             >
//               <Text style={GlobalStyles.secondaryButtonText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
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
//   productListContent: {
//     paddingHorizontal: Layout.spacing.lg,
//     paddingBottom: Layout.spacing.md,
//   },
//   productCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: Layout.spacing.sm,
//     marginBottom: Layout.spacing.md,
//     borderRadius: Layout.borderRadius.md,
//     backgroundColor: Colors.white,
//     ...Layout.shadow.small,
//   },
//   productImage: {
//     width: 90,
//     height: 90,
//     borderRadius: Layout.borderRadius.sm,
//     marginRight: Layout.spacing.md,
//     resizeMode: 'contain',
//   },
//   productInfo: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   productNameText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: Colors.text,
//     marginBottom: Layout.spacing.xs,
//   },
//   productPriceText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: Colors.primary,
//     marginBottom: Layout.spacing.xs,
//   },
//   productStock: {
//     fontSize: 12,
//     color: Colors.textSecondary,
//   },
//   distressSaleTag: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: Colors.danger,
//     marginTop: Layout.spacing.xs,
//   },
//   productActions: {
//     flexDirection: 'row',
//     marginLeft: Layout.spacing.md,
//   },
//   actionButton: {
//     padding: Layout.spacing.xs,
//     marginLeft: Layout.spacing.sm,
//   },
//   // Modal Styles
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     backgroundColor: Colors.white,
//     borderRadius: Layout.borderRadius.lg,
//     padding: Layout.spacing.xl,
//     width: '90%',
//     ...Layout.shadow.medium,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: Colors.text,
//     marginBottom: Layout.spacing.lg,
//     textAlign: 'center',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: Layout.spacing.md,
//     marginBottom: Layout.spacing.lg,
//   },
//   checkboxLabel: {
//     marginLeft: Layout.spacing.sm,
//     fontSize: 16,
//     color: Colors.text,
//   },
// });

// export default VendorProductsScreen;