/**
 * OnboardingScreen
 * Matches: onboarding_face_detection/code.html + onboarding_ai_insights + onboarding_voice_analysis
 * - 3 slides with swipe-style pagination
 * - Animated face detection illustration with scanning line
 * - Voice analysis waveform slide
 * - AI insights slide
 * - Progress dots + Next/Skip buttons
 */
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '../styles/theme';

const { width } = Dimensions.get('window');

// Onboarding data for 3 slides
const SLIDES = [
  {
    id: 'face',
    title: 'See Every',
    titleAccent: 'Smile',
    subtitle: 'Advanced AI tracks facial expressions to decode emotions instantly.',
    icon: 'face-recognition',
    chipTop: { icon: 'auto-fix-high', text: '98.4% MATCH', color: Colors.primary },
    chipBottom: { icon: 'favorite', text: 'JOY DETECTED', color: Colors.secondary },
    illustrationType: 'face',
  },
  {
    id: 'voice',
    title: 'Hear Your',
    titleAccent: 'Voice',
    subtitle: 'Real-time voice pattern analysis reveals your emotional state through tone and cadence.',
    icon: 'microphone',
    chipTop: { icon: 'waveform', text: 'ANALYZING', color: Colors.tertiary },
    chipBottom: { icon: 'mood', text: 'CALM TONE', color: Colors.secondary },
    illustrationType: 'voice',
  },
  {
    id: 'ai',
    title: 'Understand',
    titleAccent: 'Yourself',
    subtitle: 'AI insights reveal hidden emotional patterns to help you thrive every day.',
    icon: 'brain',
    chipTop: { icon: 'auto-fix-high', text: 'AI READY', color: Colors.primary },
    chipBottom: { icon: 'chart-line', text: 'INSIGHTS ON', color: Colors.tertiary },
    illustrationType: 'ai',
  },
];

// Face Illustration Slide
function FaceIllustration({ scanAnim }) {
  const scanTranslate = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-80, 80],
  });
  const scanOpacity = scanAnim.interpolate({
    inputRange: [0, 0.3, 0.7, 1],
    outputRange: [0, 1, 1, 0],
  });

  return (
    <View style={illStyles.faceCard}>
      {/* Grid lines overlay */}
      <View style={illStyles.gridOverlay} pointerEvents="none">
        {[0, 1, 2, 3, 4].map((i) => (
          <View key={i} style={illStyles.gridLine} />
        ))}
      </View>

      {/* Abstract face */}
      <View style={illStyles.faceShape}>
        {/* Eyes */}
        <View style={illStyles.eyeRow}>
          <View style={illStyles.eye} />
          <View style={illStyles.eye} />
        </View>
        {/* Smile */}
        <View style={illStyles.smile} />
      </View>

      {/* Scanning line */}
      <Animated.View
        style={[
          illStyles.scanLine,
          {
            transform: [{ translateY: scanTranslate }],
            opacity: scanOpacity,
          },
        ]}
      >
        <LinearGradient
          colors={['transparent', Colors.primary, 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1, height: 2 }}
        />
      </Animated.View>
    </View>
  );
}

// Voice Illustration Slide
function VoiceIllustration() {
  const barAnims = useRef(
    Array.from({ length: 12 }, () => new Animated.Value(0.3))
  ).current;

  useEffect(() => {
    barAnims.forEach((anim, i) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 0.5 + Math.random() * 0.5,
            duration: 400 + i * 60,
            useNativeDriver: false,
          }),
          Animated.timing(anim, {
            toValue: 0.2 + Math.random() * 0.3,
            duration: 400 + i * 60,
            useNativeDriver: false,
          }),
        ])
      ).start();
    });
  }, []);

  return (
    <View style={illStyles.voiceCard}>
      <Ionicons name="mic" size={48} color={Colors.secondary} style={{ marginBottom: 16 }} />
      <View style={illStyles.waveRow}>
        {barAnims.map((anim, i) => (
          <Animated.View
            key={i}
            style={{
              width: 6,
              borderRadius: 3,
              backgroundColor: i % 2 === 0 ? Colors.primary : Colors.secondary,
              height: anim.interpolate({ inputRange: [0, 1], outputRange: [8, 64] }),
            }}
          />
        ))}
      </View>
      <Text style={illStyles.voiceLabel}>Voice Pattern Analysis</Text>
    </View>
  );
}

// AI Illustration Slide
function AIIllustration() {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.1, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={illStyles.aiCard}>
      <Animated.View
        style={[illStyles.aiOrb, { transform: [{ scale: pulseAnim }] }]}
      >
        <LinearGradient
          colors={[Colors.gradientBlue, Colors.gradientPurple]}
          style={illStyles.aiGradient}
        >
          <Ionicons name="analytics" size={52} color="#fff" />
        </LinearGradient>
      </Animated.View>
      <Text style={illStyles.aiLabel}>AI Neural Analysis</Text>
    </View>
  );
}

export default function OnboardingScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  // Scanning line animation for face slide
  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(scanAnim, { toValue: 1, duration: 3000, useNativeDriver: false })
    ).start();
  }, []);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      const next = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: next });
      setCurrentIndex(next);
    } else {
      navigation.replace('Main');
    }
  };

  const handleSkip = () => {
    navigation.replace('Main');
  };

  const renderIllustration = (type) => {
    switch (type) {
      case 'face': return <FaceIllustration scanAnim={scanAnim} />;
      case 'voice': return <VoiceIllustration />;
      case 'ai': return <AIIllustration />;
    }
  };

  const renderSlide = ({ item }) => (
    <View style={[styles.slide, { width }]}>
      {/* Illustration */}
      <View style={styles.illustrationWrapper}>
        {/* Halo glow */}
        <View style={styles.halo} />
        {/* Data Chips */}
        <View style={styles.chipTop}>
          <View style={[styles.chip, { borderColor: `${item.chipTop.color}30` }]}>
            <Ionicons name="sparkles" size={10} color={item.chipTop.color} />
            <Text style={[styles.chipText, { color: item.chipTop.color }]}>
              {item.chipTop.text}
            </Text>
          </View>
        </View>
        <View style={styles.chipBottom}>
          <View style={[styles.chip, { borderColor: `${item.chipBottom.color}30` }]}>
            <Ionicons name="heart" size={10} color={item.chipBottom.color} />
            <Text style={[styles.chipText, { color: item.chipBottom.color }]}>
              {item.chipBottom.text}
            </Text>
          </View>
        </View>
        {renderIllustration(item.illustrationType)}
      </View>

      {/* Text Content */}
      <View style={styles.textContent}>
        <Text style={styles.slideTitle}>
          {item.title}{' '}
          <Text style={styles.slideTitleAccent}>{item.titleAccent}</Text>
        </Text>
        <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Background orbs */}
      <View style={styles.orbBlue} />
      <View style={styles.orbPurple} />

      {/* Logo Header */}
      <View style={styles.header}>
        <Ionicons name="radio-button-on" size={20} color={Colors.primaryContainer} />
        <Text style={styles.headerBrand}>EmotionSense</Text>
      </View>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={styles.flatList}
      />

      {/* Bottom Controls */}
      <View style={[styles.bottomControls, { paddingBottom: insets.bottom + 24 }]}>
        {/* Dots */}
        <View style={styles.dotsRow}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === currentIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        {/* Next button */}
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.85}
          style={styles.nextBtnWrapper}
        >
          <LinearGradient
            colors={[Colors.gradientBlue, Colors.gradientPurple]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.nextBtn}
          >
            <Text style={styles.nextBtnText}>
              {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" style={{ marginLeft: 8 }} />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSkip} activeOpacity={0.7}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    overflow: 'hidden',
  },
  orbBlue: {
    position: 'absolute',
    top: '-8%',
    left: '-12%',
    width: '55%',
    height: '50%',
    borderRadius: 9999,
    backgroundColor: 'rgba(221,183,255,0.08)',
  },
  orbPurple: {
    position: 'absolute',
    bottom: '-10%',
    right: '-12%',
    width: '55%',
    height: '50%',
    borderRadius: 9999,
    backgroundColor: 'rgba(5,102,217,0.08)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 6,
  },
  headerBrand: {
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 20,
    color: Colors.primary,
    letterSpacing: -0.5,
    marginLeft: 4,
  },
  flatList: {
    flex: 1,
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.containerPadding,
  },
  illustrationWrapper: {
    width: 260,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  halo: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(221,183,255,0.15)',
  },
  chipTop: {
    position: 'absolute',
    top: 8,
    right: 0,
    zIndex: 10,
  },
  chipBottom: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    zIndex: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
  },
  chipText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    letterSpacing: 0.5,
  },
  textContent: {
    alignItems: 'center',
    paddingHorizontal: Spacing.gutter,
  },
  slideTitle: {
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 42,
    lineHeight: 50,
    color: Colors.onSurface,
    textAlign: 'center',
    letterSpacing: -1,
    marginBottom: Spacing.sm,
  },
  slideTitleAccent: {
    color: Colors.primary,
  },
  slideSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 25,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
  },
  bottomControls: {
    alignItems: 'center',
    paddingHorizontal: Spacing.containerPadding,
    gap: Spacing.md,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 28,
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 4,
  },
  dotInactive: {
    width: 8,
    backgroundColor: Colors.surfaceContainerHighest,
  },
  nextBtnWrapper: {
    width: '80%',
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    shadowColor: Colors.gradientPurple,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
  },
  nextBtnText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#fff',
  },
  skipText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: 'rgba(218,226,253,0.4)',
  },
});

// Illustration inner styles
const illStyles = StyleSheet.create({
  faceCard: {
    width: 220,
    height: 240,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  gridOverlay: {
    position: 'absolute',
    inset: 0,
    flexDirection: 'row',
    opacity: 0.15,
  },
  gridLine: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.3)',
  },
  faceShape: {
    width: 120,
    height: 160,
    borderRadius: 60,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    paddingTop: 40,
  },
  eyeRow: {
    flexDirection: 'row',
    gap: 28,
    marginBottom: 28,
  },
  eye: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },
  smile: {
    width: 60,
    height: 32,
    borderBottomWidth: 3,
    borderColor: Colors.primary,
    borderRadius: 30,
    opacity: 0.7,
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
  },
  // Voice
  voiceCard: {
    width: 220,
    height: 240,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  waveRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    height: 64,
  },
  voiceLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    marginTop: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  // AI
  aiCard: {
    width: 220,
    height: 240,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiOrb: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    shadowColor: Colors.gradientPurple,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  aiGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    marginTop: 16,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
