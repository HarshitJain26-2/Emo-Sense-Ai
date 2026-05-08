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
  Image,
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

  const [selectedFrame, setSelectedFrame] = React.useState(1);

  const timelineFrames = [
    { id: 0, color: '#94a3b8', label: 'Neutral' },
    { id: 1, color: '#a855f7', label: 'Surprise', active: true },
    { id: 2, color: '#3b82f6', label: 'Calm' },
    { id: 3, color: '#a855f7', label: 'Surprise' },
    { id: 4, color: '#facc15', label: 'Joy' },
  ];

  return (
    <View style={styles.container}>
      {/* Background orbs */}
      <EmotionOrb color="#173EA5" size={280} style={{ top: -80, left: -80 }} opacity={0.08} />
      <EmotionOrb color={Colors.primaryContainer} size={260} style={{ bottom: 100, right: -80 }} opacity={0.1} />

      {/* Top App Bar Replacement for Video Analysis Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerLeft}>
          <Ionicons name="color-filter-outline" size={24} color={Colors.primary} />
          <Text style={styles.headerTitle}>Video Analysis</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/100' }} 
            style={styles.profilePic} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: 20, paddingBottom: insets.bottom + 40 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Video Player Frame */}
        <View style={styles.videoPlayerContainer}>
          <GlassCard style={styles.videoCard} borderRadius={BorderRadius.DEFAULT}>
            <Image 
              source={require('../assets/video_main.png')} 
              style={styles.videoMainImage} 
              resizeMode="cover"
            />
            {/* Emotion Badge */}
            <View style={styles.videoEmotionBadge}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeText}>SURPRISE 82%</Text>
            </View>
            {/* Playback Controls Overlay */}
            <View style={styles.videoControls}>
              <Ionicons name="play" size={18} color="#fff" />
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '65%' }]} />
              </View>
              <Text style={styles.timestampText}>02:45 / 04:12</Text>
              <Ionicons name="expand" size={16} color="#fff" />
            </View>
          </GlassCard>
        </View>

        {/* Emotional Timeline */}
        <View style={styles.timelineSection}>
          <Text style={styles.sectionTitle}>EMOTIONAL TIMELINE</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.timelineScroll}>
            {timelineFrames.map((frame) => (
              <TouchableOpacity 
                key={frame.id} 
                onPress={() => setSelectedFrame(frame.id)}
                style={[
                  styles.timelineFrameWrapper,
                  selectedFrame === frame.id && styles.timelineFrameActive
                ]}
              >
                <Image 
                  source={require('../assets/video_timeline.png')} 
                  style={styles.timelineFrameImage}
                />
                <View style={[styles.timelineDot, { backgroundColor: frame.color }]} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Moment Analysis Section */}
        <GlassCard style={styles.momentCard} borderRadius={BorderRadius.DEFAULT}>
          <View style={styles.momentHeader}>
            <View>
              <Text style={styles.momentTitle}>Moment Analysis</Text>
              <Text style={styles.momentSubtitle}>Shift from Neutral to Surprise</Text>
            </View>
            <View style={styles.timestampBadge}>
              <Text style={styles.timestampLabel}>Timestamp</Text>
              <Text style={styles.timestampValue}>02:45</Text>
            </View>
          </View>

          <View style={styles.vitalsRow}>
            <View style={styles.vitalBadge}>
              <Text style={styles.vitalValueText}>94%</Text>
              <Text style={styles.vitalLabelText}>CONFIDENCE</Text>
            </View>
            <View style={styles.vitalBadge}>
              <Text style={[styles.vitalValueText, { color: '#a855f7' }]}>High</Text>
              <Text style={styles.vitalLabelText}>INTENSITY</Text>
            </View>
          </View>

          <View style={styles.metricsList}>
            <View style={styles.metricItem}>
              <View style={styles.metricLabelRow}>
                <Text style={styles.metricLabel}>Voice Fusion</Text>
                <Text style={styles.metricValue}>78% Match</Text>
              </View>
              <View style={styles.metricBarBg}>
                <LinearGradient 
                  colors={['#a855f7', '#a855f7']} 
                  style={[styles.metricBarFill, { width: '78%' }]} 
                />
              </View>
            </View>
            <View style={styles.metricItem}>
              <View style={styles.metricLabelRow}>
                <Text style={styles.metricLabel}>Facial Landmark Stability</Text>
                <Text style={styles.metricValue}>91% Match</Text>
              </View>
              <View style={styles.metricBarBg}>
                <LinearGradient 
                  colors={['#3b82f6', '#3b82f6']} 
                  style={[styles.metricBarFill, { width: '91%' }]} 
                />
              </View>
            </View>
          </View>
        </GlassCard>

        {/* Global Insights */}
        <GlassCard style={styles.insightCard} borderRadius={BorderRadius.DEFAULT}>
          <View style={styles.insightIconWrapper}>
            <Ionicons name="sparkles" size={18} color="#a855f7" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.insightTitle}>GLOBAL INSIGHTS</Text>
            <Text style={styles.insightBody}>
              The subject showed a <Text style={{ color: '#a855f7', fontWeight: 'bold' }}>40% increase</Text> in engagement during the second half. Most significant shift occurred at 02:45.
            </Text>
          </View>
        </GlassCard>

        {/* Bottom Nav Placeholder (handled by navigator) */}
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
    alignItems: 'stretch',
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.gutter,
    paddingBottom: 10,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    color: '#fff',
  },
  profilePic: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
  },

  // Video Player
  videoPlayerContainer: {
    width: '100%',
  },
  videoCard: {
    height: 200,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  videoMainImage: {
    width: '100%',
    height: '100%',
  },
  videoEmotionBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    gap: 8,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#a855f7',
    shadowColor: '#a855f7',
    shadowRadius: 4,
    elevation: 4,
  },
  badgeText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
    color: '#fff',
    letterSpacing: 1,
  },
  videoControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  timestampText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    color: '#fff',
  },

  // Timeline
  timelineSection: {
    gap: 12,
  },
  sectionTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
    color: '#94a3b8',
    letterSpacing: 1.5,
    marginLeft: 4,
  },
  timelineScroll: {
    paddingLeft: 4,
    gap: 12,
  },
  timelineFrameWrapper: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  timelineFrameActive: {
    borderColor: '#a855f7',
    shadowColor: '#a855f7',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  timelineFrameImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  timelineDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#fff',
  },

  // Moment Analysis
  momentCard: {
    padding: 20,
    gap: 20,
  },
  momentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  momentTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: '#fff',
  },
  momentSubtitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 4,
  },
  timestampBadge: {
    backgroundColor: 'rgba(168,85,247,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(168,85,247,0.2)',
  },
  timestampLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 8,
    color: '#94a3b8',
    textTransform: 'uppercase',
  },
  timestampValue: {
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
    color: '#fff',
  },
  vitalsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  vitalBadge: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 40,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  vitalValueText: {
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 24,
    color: Colors.primary,
  },
  vitalLabelText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 9,
    color: '#64748b',
    letterSpacing: 1,
    marginTop: 2,
  },
  metricsList: {
    gap: 16,
  },
  metricItem: {
    gap: 8,
  },
  metricLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: '#94a3b8',
  },
  metricValue: {
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
    color: '#fff',
  },
  metricBarBg: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  metricBarFill: {
    height: '100%',
    borderRadius: 3,
  },

  // Insight Card
  insightCard: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(168,85,247,0.2)',
    backgroundColor: 'rgba(168,85,247,0.03)',
  },
  insightIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(168,85,247,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
    color: '#fff',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  insightBody: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: '#94a3b8',
    lineHeight: 20,
  },
});
