import { Colors } from './Colors';

export const Typography = {
  heading: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: Colors.text,
  },
  subheading: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  body: {
    fontSize: 14,
    color: Colors.text,
  },
  caption: {
    fontSize: 12,
    color: Colors.muted,
  },
};