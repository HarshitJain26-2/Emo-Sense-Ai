/**
 * HomeScreen
 * Matches: home_dashboard/code.html
 * - Top app bar with brand logo
 * - Camera feed placeholder with scan indicators
 * - "Start Detection" gradient CTA button
 * - Emotion summary 3-widget row (Joy, Stress, Calm)
 * - Session vitals glass card
 * - AI Insight bento card with animated orb
 * - Floating bottom nav (rendered by tab navigator)
 */
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '../styles/theme';
import GlassCard from '../components/GlassCard';
import EmotionOrb from '../components/EmotionOrb';
import TopAppBar from '../components/TopAppBar';

const { width } = Dimensions.get('window');

// Camera feed placeholder with scanning UI overlay
function CameraPlaceholder({ onStartDetection }) {
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, { toValue: 1, duration: 2500, useNativeDriver: false }),
        Animated.timing(scanLineAnim, { toValue: 0, duration: 0, useNativeDriver: false }),
      ])
    ).start();
  }, []);

  const scanTranslate = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 180],
  });

  return (
    <GlassCard style={styles.cameraCard} borderRadius={BorderRadius.DEFAULT}>
      {/* Camera view area */}
      <View style={styles.cameraViewArea}>
        {/* Dark gradient placeholder simulating a camera feed */}
        <LinearGradient
          colors={['#0f1e3a', '#1a0e33', '#0b1326']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />

        {/* Ambient face silhouette suggestion */}
        <View style={styles.faceSilhouette} />

        {/* Scan Bounding Box */}
        <View style={styles.scanBoundingBox}>
          {/* Corner marks */}
          <View style={[styles.corner, styles.cornerTL]} />
          <View style={[styles.corner, styles.cornerTR]} />
          <View style={[styles.corner, styles.cornerBL]} />
          <View style={[styles.corner, styles.cornerBR]} />

          {/* Scanning line */}
          <Animated.View
            style={[styles.scanLine, { transform: [{ translateY: scanTranslate }] }]}
          >
            <LinearGradient
              colors={[`${Colors.primary}00`, Colors.primary, `${Colors.primary}00`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1, height: 1.5 }}
            />
          </Animated.View>

          {/* Analysis label */}
          <View style={styles.analysisLabel}>
            <Text style={styles.analysisText}>Analyzing Micro-Expressions</Text>
          </View>
        </View>
      </View>

      {/* Camera card footer */}
      <View style={styles.cameraFooter}>
        <View>
          <Text style={styles.footerLabel}>Real-time Sync</Text>
          <Text style={styles.footerTitle}>Ready to Detect</Text>
        </View>
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>Live</Text>
        </View>
      </View>
    </GlassCard>
  );
}

// Single emotion metric widget
function EmotionWidget({ icon, iconColor, label, value }) {
  return (
    <GlassCard style={styles.emotionWidget} borderRadius={BorderRadius.DEFAULT}>
      <Ionicons name={icon} size={22} color={iconColor} />
      <Text style={styles.emotionLabel}>{label}</Text>
      <Text style={styles.emotionValue}>{value}</Text>
    </GlassCard>
  );
}

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const aiOrbAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(aiOrbAnim, { toValue: 1.5, duration: 2000, useNativeDriver: true }),
        Animated.timing(aiOrbAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Background orbs */}
      <EmotionOrb color="#3B82F6" size={280} style={{ top: -50, left: -60 }} opacity={0.08} />
      <EmotionOrb color="#A855F7" size={300} style={{ bottom: 80, right: -80 }} opacity={0.1} />

      {/* Top App Bar */}
      <TopAppBar onProfilePress={() => navigation.navigate('Profile')} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 72, paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Camera Feed Section */}
        <View style={styles.section}>
          <EmotionOrb
            color={Colors.primary}
            size={100}
            style={{ top: -30, left: -20 }}
            opacity={0.15}
          />
          <CameraPlaceholder />
        </View>

        {/* Primary CTA */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Detection')}
          style={styles.ctaWrapper}
        >
          <LinearGradient
            colors={[Colors.gradientBlue, Colors.gradientPurple]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaButton}
          >
            <Ionicons name="play" size={22} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.ctaText}>Start Detection</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Emotion Summary Widgets */}
        <View style={styles.emotionRow}>
          <EmotionWidget icon="happy" iconColor="#facc15" label="Joy" value="64%" />
          <EmotionWidget icon="flash" iconColor={Colors.tertiary} label="Stress" value="12%" />
          <EmotionWidget icon="water" iconColor="#60a5fa" label="Calm" value="24%" />
        </View>

        {/* Session Vitals */}
        <GlassCard style={styles.vitalsCard} borderRadius={BorderRadius.DEFAULT}>
          <View style={styles.vitalsHeader}>
            <Text style={styles.vitalsTitle}>Session Vitals</Text>
            <Ionicons name="information-circle-outline" size={18} color={Colors.onSurfaceVariant} />
          </View>
          <View style={styles.vitalsGrid}>
            <View style={styles.vitalItem}>
              <View style={styles.vitalIconBg}>
                <Ionicons name="shield-checkmark" size={16} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.vitalLabel}>Confidence</Text>
                <Text style={styles.vitalValue}>98%</Text>
              </View>
            </View>
            <View style={styles.vitalItem}>
              <View style={styles.vitalIconBg}>
                <Ionicons name="time" size={16} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.vitalLabel}>History</Text>
                <Text style={styles.vitalValue}>2m ago</Text>
              </View>
            </View>
          </View>
        </GlassCard>

        {/* AI Insight Bento Card */}
        <View style={styles.insightCard}>
          <LinearGradient
            colors={[Colors.surfaceContainerLowest, Colors.surfaceContainerHigh]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.insightGradientBg}
          />
          {/* Decorative orb */}
          <Animated.View
            style={[
              styles.insightOrb,
              { transform: [{ scale: aiOrbAnim }] },
            ]}
          />
          <View style={styles.insightContent}>
            <Ionicons name="sparkles" size={28} color={Colors.gradientPurple} style={{ marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.insightTitle}>AI Insight</Text>
              <Text style={styles.insightBody}>
                Your facial symmetry indicates a peak in focus. The "Calm" state is stabilizing after a 5% dip earlier.
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Results')}
                style={styles.insightLink}
                activeOpacity={0.7}
              >
                <Text style={styles.insightLinkText}>View Detailed Report</Text>
                <Ionicons name="arrow-forward" size={12} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.gutter,
    gap: Spacing.lg,
  },
  section: {
    position: 'relative',
  },
  // Camera
  cameraCard: {
    overflow: 'hidden',
  },
  cameraViewArea: {
    height: 220,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceSilhouette: {
    width: 80,
    height: 100,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  scanBoundingBox: {
    position: 'absolute',
    top: 20,
    left: 32,
    right: 32,
    bottom: 32,
    borderWidth: 1.5,
    borderColor: `${Colors.primary}35`,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 8,
  },
  // Corner markers
  corner: {
    position: 'absolute',
    width: 14,
    height: 14,
  },
  cornerTL: { top: -1, left: -1, borderTopWidth: 2.5, borderLeftWidth: 2.5, borderColor: '#fff', borderTopLeftRadius: 3 },
  cornerTR: { top: -1, right: -1, borderTopWidth: 2.5, borderRightWidth: 2.5, borderColor: '#fff', borderTopRightRadius: 3 },
  cornerBL: { bottom: -1, left: -1, borderBottomWidth: 2.5, borderLeftWidth: 2.5, borderColor: '#fff', borderBottomLeftRadius: 3 },
  cornerBR: { bottom: -1, right: -1, borderBottomWidth: 2.5, borderRightWidth: 2.5, borderColor: '#fff', borderBottomRightRadius: 3 },
  scanLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  analysisLabel: {
    marginBottom: 4,
  },
  analysisText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 9,
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 2.5,
  },
  cameraFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
  },
  footerLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 2,
  },
  footerTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: Colors.onSurface,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerHigh,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    gap: 5,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#22c55e',
  },
  liveText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: Colors.onSurface,
  },
  // CTA
  ctaWrapper: {
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    shadowColor: Colors.gradientPurple,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  ctaText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: '#fff',
  },
  // Emotion row
  emotionRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  emotionWidget: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    gap: 4,
  },
  emotionLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 9,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  emotionValue: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    color: Colors.onSurface,
  },
  // Vitals
  vitalsCard: {
    padding: Spacing.md,
  },
  vitalsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  vitalsTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#cbd5e1',
  },
  vitalsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vitalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  vitalIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
  },
  vitalLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: '#94a3b8',
  },
  vitalValue: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: Colors.onSurface,
  },
  // AI Insight
  insightCard: {
    borderRadius: BorderRadius.DEFAULT,
    borderWidth: 1.5,
    borderColor: `${Colors.primary}30`,
    overflow: 'hidden',
    padding: Spacing.md,
    position: 'relative',
  },
  insightGradientBg: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BorderRadius.DEFAULT,
  },
  insightOrb: {
    position: 'absolute',
    right: -16,
    bottom: -16,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(168,85,247,0.12)',
  },
  insightContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    zIndex: 1,
  },
  insightTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: Colors.onSurface,
    marginBottom: 6,
  },
  insightBody: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    lineHeight: 20,
  },
  insightLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  insightLinkText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
});
