// // app/onboarding.tsx
// import React, { useRef, useState, useCallback } from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   View,
//   Text,
//   FlatList,
//   Dimensions,
//   TouchableOpacity,
//   NativeSyntheticEvent,
//   NativeScrollEvent,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

// import { Colors } from '../constants/Colors';
// import { Layout } from '../constants/Layout';
// import { GlobalStyles } from '../styles/GlobalStyles';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// // Onboarding data for each slide
// const onboardingSlides = [
//   {
//     key: '1',
//     title: 'Welcome to MiniMart!',
//     description: 'Your one-stop platform for amazing deals on electronics and more. Buy, sell, and even pay later!',
//     icon: 'cube-outline', // Placeholder icon
//   },
//   {
//     key: '2',
//     title: 'For Smart Shoppers',
//     description: 'Browse a wide range of products, make offers on distress sales, and explore flexible Pay Later options.',
//     icon: 'cart-outline', // Placeholder icon
//   },
//   {
//     key: '3',
//     title: 'Empowering Vendors',
//     description: 'Easily upload your products, tag distress sales, manage offers, and connect with your customers.',
//     icon: 'cloud-upload-outline', // Placeholder icon
//   },
//   {
//     key: '4',
//     title: 'Seamless Deliveries',
//     description: 'Get your orders delivered quickly and efficiently, directly to your doorstep.',
//     icon: 'bicycle-outline', // Placeholder icon
//   },
//   {
//     key: '5',
//     title: 'Ready to Get Started?',
//     description: 'Join our community of buyers and sellers today!',
//     icon: 'checkmark-circle-outline', // Placeholder icon
//   },
// ];

// const OnboardingScreen = () => {
//   const router = useRouter();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const flatListRef = useRef<FlatList>(null);

//   const viewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: any[] }) => {
//     if (viewableItems.length > 0) {
//       setCurrentIndex(viewableItems[0].index || 0);
//     }
//   }, []);

//   const viewabilityConfig = {
//     itemVisiblePercentThreshold: 50, // Consider item visible if 50% of it is on screen
//   };

//   const scrollToNext = () => {
//     if (flatListRef.current) {
//       if (currentIndex < onboardingSlides.length - 1) {
//         flatListRef.current.scrollToIndex({ index: currentIndex + 1, animated: true });
//       } else {
//         // Last slide, go to login/main app
//         completeOnboarding();
//       }
//     }
//   };

//   const skipOnboarding = () => {
//     completeOnboarding();
//   };

//   const completeOnboarding = async () => {
//     try {
//       await AsyncStorage.setItem('onboardingCompleted', 'true');
//       router.replace('/login'); // Navigate to login screen
//     } catch (e) {
//       console.error('Failed to save onboarding status:', e);
//       // Fallback: still try to navigate
//       router.replace('/login');
//     }
//   };

//   const renderSlide = ({ item }: { item: typeof onboardingSlides[0] }) => (
//     <View style={localStyles.slide}>
//       <Ionicons name={item.icon as any} size={120} color={Colors.primary} style={localStyles.slideIcon} />
//       <Text style={localStyles.slideTitle}>{item.title}</Text>
//       <Text style={localStyles.slideDescription}>{item.description}</Text>
//     </View>
//   );

//   const renderPagination = () => (
//     <View style={localStyles.paginationContainer}>
//       {onboardingSlides.map((_, index) => (
//         <View
//           key={index.toString()}
//           style={[
//             localStyles.paginationDot,
//             index === currentIndex ? localStyles.paginationDotActive : {},
//           ]}
//         />
//       ))}
//     </View>
//   );

//   return (
//     <SafeAreaView style={GlobalStyles.screenContainer}>
//       <FlatList
//         ref={flatListRef}
//         data={onboardingSlides}
//         keyExtractor={(item) => item.key}
//         renderItem={renderSlide}
//         horizontal
//         pagingEnabled // Snap to each slide
//         showsHorizontalScrollIndicator={false}
//         onViewableItemsChanged={viewableItemsChanged}
//         viewabilityConfig={viewabilityConfig}
//         initialScrollIndex={0} // Ensure it starts at the first slide
//         getItemLayout={(data, index) => ({
//           length: SCREEN_WIDTH,
//           offset: SCREEN_WIDTH * index,
//           index,
//         })}
//       />

//       {renderPagination()}

//       <View style={localStyles.buttonsContainer}>
//         {currentIndex < onboardingSlides.length - 1 ? (
//           <>
//             <TouchableOpacity style={localStyles.skipButton} onPress={skipOnboarding}>
//               <Text style={localStyles.skipButtonText}>Skip</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={GlobalStyles.primaryButton} onPress={scrollToNext}>
//               <Text style={GlobalStyles.primaryButtonText}>Next</Text>
//             </TouchableOpacity>
//           </>
//         ) : (
//           <TouchableOpacity style={GlobalStyles.primaryButton} onPress={completeOnboarding}>
//             <Text style={GlobalStyles.primaryButtonText}>Get Started</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// const localStyles = StyleSheet.create({
//   slide: {
//     width: SCREEN_WIDTH,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: Layout.spacing.xl,
//   },
//   slideIcon: {
//     marginBottom: Layout.spacing.xl,
//   },
//   slideTitle: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: Colors.text,
//     textAlign: 'center',
//     marginBottom: Layout.spacing.md,
//   },
//   slideDescription: {
//     fontSize: 16,
//     color: Colors.textSecondary,
//     textAlign: 'center',
//     lineHeight: 24,
//   },
//   paginationContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: Layout.spacing.lg,
//   },
//   paginationDot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: Colors.mediumGray,
//     marginHorizontal: Layout.spacing.xs,
//   },
//   paginationDotActive: {
//     width: 25, // Wider active dot
//     backgroundColor: Colors.primary,
//   },
//   buttonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: Layout.spacing.lg,
//     paddingBottom: Layout.spacing.md,
//     alignItems: 'center',
//   },
//   skipButton: {
//     paddingVertical: Layout.spacing.md,
//     paddingHorizontal: Layout.spacing.lg,
//     borderRadius: Layout.borderRadius.md,
//   },
//   skipButtonText: {
//     color: Colors.textSecondary,
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default OnboardingScreen;