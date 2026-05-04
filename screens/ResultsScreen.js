/**
 * ResultsScreen
 * Matches: detection_results/code.html
 * - Floating emoji orb with glassmorphism background + "Happy" badge
 * - "High Vitality" headline with 96% certainty badge
 * - AI Analysis card with left accent bar
 * - 2-column data bento grid (Stability, Aura Level)
 * - Recommended Actions list
 * - "New Emotion Scan" CTA button
 */
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '../styles/theme';
import GlassCard from '../components/GlassCard';
import EmotionOrb from '../components/EmotionOrb';
import TopAppBar from '../components/TopAppBar';

export default function ResultsScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  // Float animation for the emoji orb
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -10, duration: 1500, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 1500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Background orbs */}
      <EmotionOrb color="#173EA5" size={280} style={{ top: -80, left: -80 }} opacity={0.08} />
      <EmotionOrb color={Colors.primaryContainer} size={260} style={{ bottom: 100, right: -80 }} opacity={0.1} />

      {/* Top App Bar */}
      <TopAppBar onProfilePress={() => navigation.navigate('Profile')} />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 72, paddingBottom: insets.bottom + 40 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Result Hero — Emoji Orb */}
        <View style={styles.heroSection}>
          {/* Glow behind orb */}
          <LinearGradient
            colors={['rgba(59,130,246,0.3)', 'rgba(168,85,247,0.3)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGlow}
          />

          {/* Glassmorphism emoji circle */}
          <Animated.View
            style={[styles.emojiCircle, { transform: [{ translateY: floatAnim }] }]}
          >
            <Text style={styles.emojiText}>😊</Text>
            {/* Happy badge */}
            <View style={styles.happyBadge}>
              <LinearGradient
                colors={[Colors.gradientBlue, Colors.gradientPurple]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.happyBadgeGrad}
              >
                <Text style={styles.happyBadgeText}>Happy</Text>
              </LinearGradient>
            </View>
          </Animated.View>

          {/* Headline */}
          <View style={styles.headlineBlock}>
            <Text style={styles.headlineText}>High Vitality</Text>
            <View style={styles.certaintyBadge}>
              <Ionicons name="checkmark-circle" size={16} color={Colors.secondary} />
              <Text style={styles.certaintyText}>96% Certainty</Text>
            </View>
          </View>
        </View>

        {/* AI Analysis Card */}
        <View style={styles.aiCard}>
          {/* Left accent bar */}
          <LinearGradient
            colors={['#60a5fa', Colors.gradientPurple]}
            style={styles.accentBar}
          />
          <View style={styles.aiCardContent}>
            <View style={styles.aiIconBg}>
              <Ionicons name="bulb" size={20} color={Colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.aiCardTitle}>AI Analysis</Text>
              <Text style={styles.aiCardBody}>
                Your micro-expressions suggest a{' '}
                <Text style={{ color: Colors.primary, fontFamily: 'Inter_700Bold' }}>
                  peak in positive energy
                </Text>
                . You seem very focused and in a state of cognitive flow.
              </Text>
            </View>
          </View>
        </View>

        {/* Data Bento Grid */}
        <View style={styles.bentoGrid}>
          <GlassCard style={styles.bentoCard} borderRadius={BorderRadius.DEFAULT}>
            <Ionicons name="pulse" size={22} color="#60a5fa" />
            <Text style={styles.bentoLabel}>Stability</Text>
            <Text style={styles.bentoValue}>88%</Text>
          </GlassCard>
          <GlassCard style={styles.bentoCard} borderRadius={BorderRadius.DEFAULT}>
            <Ionicons name="sparkles" size={22} color="#c084fc" />
            <Text style={styles.bentoLabel}>Aura Level</Text>
            <Text style={[styles.bentoValue, { fontSize: 20 }]}>Zen</Text>
          </GlassCard>
        </View>

        {/* Recommended Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.actionsHeader}>Recommended Actions</Text>

          {/* Action 1 */}
          <TouchableOpacity activeOpacity={0.8} style={styles.actionRow}>
            <LinearGradient
              colors={[Colors.gradientBlue, Colors.gradientPurple]}
              style={styles.actionIconGrad}
            >
              <Ionicons name="rocket" size={18} color="#fff" />
            </LinearGradient>
            <Text style={styles.actionText}>Keep this momentum!</Text>
            <Ionicons name="chevron-forward" size={18} color={Colors.onSurfaceVariant} />
          </TouchableOpacity>

          {/* Action 2 */}
          <TouchableOpacity activeOpacity={0.8} style={styles.actionRow}>
            <View style={styles.actionIconGlass}>
              <Ionicons name="share-social" size={18} color={Colors.secondary} />
            </View>
            <Text style={styles.actionText}>Share this moment</Text>
            <Ionicons name="chevron-forward" size={18} color={Colors.onSurfaceVariant} />
          </TouchableOpacity>
        </View>

        {/* New Scan CTA */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Detection')}
          style={styles.newScanWrapper}
        >
          <LinearGradient
            colors={[Colors.gradientBlue, Colors.gradientPurple]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.newScanBtn}
          >
            <Text style={styles.newScanText}>New Emotion Scan</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: Spacing.gutter,
    gap: Spacing.md,
    alignItems: 'center',
  },
  // Hero
  heroSection: {
    alignItems: 'center',
    paddingTop: 8,
    gap: 20,
    width: '100%',
  },
  heroGlow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.3,
    top: 0,
  },
  emojiCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  emojiText: {
    fontSize: 88,
  },
  happyBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  happyBadgeGrad: {
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  happyBadgeText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  headlineBlock: {
    alignItems: 'center',
    gap: 10,
  },
  headlineText: {
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 44,
    color: Colors.primary,
    letterSpacing: -1.5,
  },
  certaintyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  certaintyText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: Colors.secondary,
    letterSpacing: 0.5,
  },
  // AI Card
  aiCard: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: BorderRadius.DEFAULT,
    overflow: 'hidden',
  },
  accentBar: {
    width: 4,
  },
  aiCardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: Spacing.md,
    gap: 12,
  },
  aiIconBg: {
    backgroundColor: 'rgba(183,109,255,0.15)',
    padding: 8,
    borderRadius: 10,
  },
  aiCardTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: Colors.onSurface,
    marginBottom: 6,
  },
  aiCardBody: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    lineHeight: 22,
  },
  // Bento Grid
  bentoGrid: {
    flexDirection: 'row',
    gap: Spacing.gutter,
    width: '100%',
  },
  bentoCard: {
    flex: 1,
    aspectRatio: 1,
    padding: Spacing.md,
    justifyContent: 'space-between',
  },
  bentoLabel: {
    fontFamily: 'Inter_700Bold',
    fontSize: 9,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: 'auto',
    marginBottom: 2,
  },
  bentoValue: {
    fontFamily: 'Inter_700Bold',
    fontSize: 26,
    color: Colors.onSurface,
  },
  // Actions
  actionsSection: {
    width: '100%',
    gap: Spacing.sm,
  },
  actionsHeader: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    textAlign: 'center',
    marginBottom: 4,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: BorderRadius.DEFAULT,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    gap: 14,
  },
  actionIconGrad: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.gradientPurple,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  actionIconGlass: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 3,
  },
  actionText: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: Colors.onSurface,
  },
  // New Scan CTA
  newScanWrapper: {
    width: '100%',
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    marginTop: 8,
    shadowColor: Colors.gradientPurple,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  newScanBtn: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  newScanText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: '#fff',
    letterSpacing: -0.5,
  },
});
