/**
 * SplashScreen
 * Matches: splash_screen/code.html
 * - Dark background with animated gradient orbs
 * - Animated logo container with glow ring + pulsing orbitals
 * - Brand text with gradient effect
 * - Loading progress bar
 * - "Enter Experience" CTA button
 * - "Neural Sync Active" bottom indicator
 */
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '../styles/theme';

const { width } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  // Animations
  const logoScale = useRef(new Animated.Value(0.7)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const ctaOpacity = useRef(new Animated.Value(0)).current;
  const progressWidth = useRef(new Animated.Value(0)).current;
  const orbital1Scale = useRef(new Animated.Value(1)).current;
  const orbital2Scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entrance sequence
    Animated.sequence([
      // Logo pops in
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
      // Text fades in
      Animated.timing(textOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      // Progress bar fills
      Animated.timing(progressWidth, { toValue: 1, duration: 800, useNativeDriver: false }),
      // CTA fades in
      Animated.timing(ctaOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();

    // Pulsing orbital rings
    Animated.loop(
      Animated.sequence([
        Animated.timing(orbital1Scale, { toValue: 1.1, duration: 1500, useNativeDriver: true }),
        Animated.timing(orbital1Scale, { toValue: 1, duration: 1500, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(orbital2Scale, { toValue: 1.05, duration: 2000, useNativeDriver: true }),
        Animated.timing(orbital2Scale, { toValue: 1, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const progressInterpolated = progressWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const handleEnter = () => {
    navigation.replace('Onboarding');
  };

  return (
    <View style={styles.container}>
      {/* Background gradient orbs */}
      <View style={styles.orbBlue} />
      <View style={styles.orbPurple} />

      {/* Main Content */}
      <View style={[styles.content, { paddingTop: insets.top }]}>
        {/* Animated Logo Container */}
        <Animated.View
          style={[styles.logoContainer, { transform: [{ scale: logoScale }], opacity: logoOpacity }]}
        >
          {/* Outer Glow Ring */}
          <LinearGradient
            colors={['rgba(59,130,246,0.3)', 'rgba(168,85,247,0.3)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoGlowRing}
          />

          {/* Logo Shell — glass circle */}
          <View style={styles.logoShell}>
            <Ionicons name="radio-button-on" size={72} color={Colors.primary} />
          </View>

          {/* Orbital Rings */}
          <Animated.View
            style={[styles.orbital1, { transform: [{ scale: orbital1Scale }] }]}
          />
          <Animated.View
            style={[styles.orbital2, { transform: [{ scale: orbital2Scale }] }]}
          />
        </Animated.View>

        {/* Brand Typography */}
        <Animated.View style={[styles.textBlock, { opacity: textOpacity }]}>
          <Text style={styles.brandTitle}>EmotionSense</Text>
          <Text style={styles.brandTagline}>Understand emotions. In real time.</Text>
        </Animated.View>

        {/* CTA + Progress */}
        <Animated.View style={[styles.ctaBlock, { opacity: ctaOpacity }]}>
          {/* Loading bar */}
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressFill, { width: progressInterpolated }]}>
              <LinearGradient
                colors={[Colors.gradientBlue, Colors.gradientPurple]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
            </Animated.View>
          </View>

          {/* Enter Button */}
          <TouchableOpacity
            onPress={handleEnter}
            activeOpacity={0.85}
            style={styles.ctaButtonWrapper}
          >
            <LinearGradient
              colors={[Colors.secondaryContainer, Colors.primaryContainer]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.ctaButton}
            >
              <Text style={styles.ctaText}>Enter Experience</Text>
              <Ionicons name="arrow-forward" size={18} color="#fff" style={{ marginLeft: 8 }} />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Bottom "Neural Sync Active" indicator */}
      <View style={[styles.bottomIndicator, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.dotPurple} />
        <Text style={styles.bottomText}>Neural Sync Active</Text>
        <View style={styles.dotBlue} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  // Background orbs (approximate blur with low opacity large circles)
  orbBlue: {
    position: 'absolute',
    top: '-10%',
    left: '-10%',
    width: '70%',
    height: '60%',
    borderRadius: 9999,
    backgroundColor: 'rgba(59,130,246,0.15)',
  },
  orbPurple: {
    position: 'absolute',
    bottom: '-10%',
    right: '-10%',
    width: '70%',
    height: '60%',
    borderRadius: 9999,
    backgroundColor: 'rgba(168,85,247,0.18)',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.containerPadding,
    width: '100%',
  },
  // Logo
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    width: 160,
    height: 160,
  },
  logoGlowRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    opacity: 0.5,
  },
  logoShell: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  orbital1: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  orbital2: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  // Typography
  textBlock: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  brandTitle: {
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 46,
    lineHeight: 54,
    color: Colors.onSurface,
    letterSpacing: -1.5,
    textShadowColor: 'rgba(168,85,247,0.3)',
    textShadowRadius: 20,
  },
  brandTagline: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#94a3b8', // slate-400
    marginTop: 8,
    letterSpacing: 0.5,
  },
  // CTA
  ctaBlock: {
    width: 280,
    alignItems: 'center',
  },
  progressTrack: {
    height: 2,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 1,
    overflow: 'hidden',
    marginBottom: Spacing.md,
  },
  progressFill: {
    height: '100%',
    borderRadius: 1,
    overflow: 'hidden',
  },
  ctaButtonWrapper: {
    width: '100%',
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    shadowColor: Colors.gradientPurple,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 12,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: Spacing.lg,
  },
  ctaText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: '#fff',
    letterSpacing: 0.3,
  },
  // Bottom indicator
  bottomIndicator: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    opacity: 0.4,
  },
  dotPurple: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.gradientPurple,
  },
  dotBlue: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.gradientBlue,
  },
  bottomText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    color: '#64748b', // slate-500
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
});
