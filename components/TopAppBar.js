/**
 * TopAppBar - Shared header component used on all main screens
 * Features: brand logo text, gradient brand name, optional right action
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography } from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';

export default function TopAppBar({ onProfilePress, rightIcon = 'person-circle-outline' }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      {/* Brand */}
      <View style={styles.brand}>
        <Ionicons name="radio-button-on" size={22} color={Colors.primaryContainer} />
        <Text style={styles.brandName}>EmotionSense</Text>
      </View>

      {/* Right Action */}
      {onProfilePress && (
        <TouchableOpacity onPress={onProfilePress} activeOpacity={0.7} style={styles.iconBtn}>
          <Ionicons name={rightIcon} size={24} color={Colors.onSurfaceVariant} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingBottom: 12,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandName: {
    ...Typography.headlineMd,
    fontSize: 20,
    // Simulate gradient text with solid primary color
    color: Colors.primary,
    letterSpacing: -0.5,
    marginLeft: 6,
  },
  iconBtn: {
    padding: 4,
  },
});
