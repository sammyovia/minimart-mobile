// style.ts
import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/types';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  goBack: {
    marginBottom: 10,
  },
  goBackText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  name: {
    ...Typography.heading,
    marginBottom: 10,
  },
  price: {
    ...Typography.subheading,
    color: Colors.primary,
    marginBottom: 10,
  },
  description: {
    ...Typography.body,
    color: Colors.text,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tooltipContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  tooltipBar: {
    height: '100%',
    width: 4,
    backgroundColor: Colors.success,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    marginRight: 10,
  },
  tooltipIcon: {
    marginRight: 8,
  },
  tooltipText: {
    flex: 1,
    color: Colors.text,
  },
});
