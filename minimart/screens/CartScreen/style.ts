import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/types';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  cartHeader: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  cartTitle: {
    ...Typography.heading,
    fontSize: 16,
    marginBottom: 12,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 12,
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  name: {
    ...Typography.body,
    fontSize: 14,
    marginBottom: 4,
  },
  price: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  quantity: {
    fontWeight: '600',
    color: Colors.muted,
  },
  listContent: {
    paddingBottom: 150,
  },
  orderInfo: {
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    color: Colors.muted,
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  infoTotal: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkoutButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
