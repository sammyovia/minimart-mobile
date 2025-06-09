// styles/GlobalStyles.ts

import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { Layout } from '../constants/Layout';

export const GlobalStyles = StyleSheet.create({
  // --- Containers & Layout ---
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background, // Light gray background for all screens
    paddingTop: 0, // Adjust this if you manage StatusBar differently
  },
  contentPadding: {
    paddingHorizontal: Layout.spacing.lg, // 20px padding on left/right
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: Layout.borderRadius.xl, // Increased borderRadius for a smoother, more rounded look
    paddingVertical: Layout.spacing.md, // Consistent vertical padding
    paddingHorizontal: Layout.spacing.lg, // Consistent horizontal padding
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Make it span across by default
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 18, // Slightly increased font size for better readability (replace with your desired size)
    fontWeight: 'bold',
    // Removed padding from here; it should be on the button itself.
  },

  card: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.md, // 10px border radius
    ...Layout.shadow.light, // Apply a subtle shadow to cards
  },

  // --- Header & Navigation ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.mediumGray,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  
  // ... other styles
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },


  logo: {
    // Define styles for your logo if it's an image
    width: 100, // Example width
    height: 30, // Example height
    resizeMode: 'contain',
  },
  notificationIcon: {
    // Styles for notification bell icon
    padding: Layout.spacing.sm, // Add some padding for easier tap
  },
  deliveryAddressContainer: {
    alignItems: 'flex-end',
    flex: 1, // Allows it to take available space
  },
  deliveryAddressLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  deliveryAddressText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },


  // For quantity controls
  quantityButton: {
    backgroundColor: Colors.lightGray,
    borderRadius: Layout.borderRadius.xl, // Fully rounded
    padding: Layout.spacing.xs,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },

  // --- Text Styles ---
  heading1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  heading2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  bodyText: {
    fontSize: 16,
    color: Colors.text,
  },
  secondaryText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },

  // --- Input Fields ---
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.md,
    paddingHorizontal: Layout.spacing.sm,
    marginHorizontal: Layout.spacing.lg,
    marginTop: Layout.spacing.md,
    marginBottom: Layout.spacing.lg,
    ...Layout.shadow.light,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingLeft: Layout.spacing.sm,
    color: Colors.text,
  },
  searchIcon: {
    marginRight: Layout.spacing.sm,
  },

  // --- Tooltips / Notifications ---
  tooltipContainer: {
    position: 'absolute',
    top: Layout.spacing.md, // Adjust as needed
    left: Layout.spacing.lg,
    right: Layout.spacing.lg,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    ...Layout.shadow.heavy, // Heavier shadow for pop-ups
    zIndex: 1000, // Ensure it's above other content
  },
  tooltipBar: {
    width: 5,
    height: '100%', // Take full height of tooltip
    backgroundColor: Colors.success,
    borderRadius: Layout.borderRadius.sm,
    marginRight: Layout.spacing.sm,
  },
  tooltipIcon: {
    marginRight: Layout.spacing.sm,
  },
  tooltipText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  tooltipCloseButton: {
    padding: Layout.spacing.xs,
  },

  // --- Bottom Tabs ---
  bottomTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.mediumGray,
    paddingVertical: Layout.spacing.sm,
    ...Layout.shadow.light, // A subtle shadow for the bottom bar
  },
  tabItem: {
    alignItems: 'center',
    paddingVertical: Layout.spacing.xs,
    flex: 1,
  },
  tabText: {
    fontSize: 12,
    marginTop: Layout.spacing.xs / 2,
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});