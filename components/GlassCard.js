/**
 * GlassCard - Reusable glassmorphism card component
 * Simulates backdrop-filter blur using a dark translucent background
 * with subtle border (React Native has no true backdrop-filter)
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, BorderRadius } from '../styles/theme';

export default function GlassCard({ children, style, borderRadius = BorderRadius.DEFAULT }) {
  return (
    <View style={[styles.card, { borderRadius }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    // Neumorphic pop shadow
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
});
