/**
 * HistoryScreen
 * Matches: emotion_history/code.html
 * - Header with title "History" + subtitle
 * - Emotion trend SVG-style chart (using View-based bar chart in RN)
 * - Filter pill buttons (All, Joy, Stress, Calm)
 * - Timeline event list with emotion icons, timestamps
 * - AI Insight card with gradient border
 * - Background decorative orbs
 */
import React, { useState, useRef, useEffect } from 'react';
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
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop, Line } from 'react-native-svg';

const FILTERS = ['All', 'Joy', 'Stress', 'Calm'];

const TIMELINE = [
  {
    id: 1,
    icon: 'happy',
    iconColor: Colors.tertiaryContainer,
    iconBg: 'rgba(247,81,161,0.15)',
    title: 'Peak Joy Detected',
    subtitle: 'High-frequency positive verbal cues during the morning briefing.',
    time: '2h ago',
    accent: null,
  },
  {
    id: 2,
    icon: 'sad',
    iconColor: Colors.secondary,
    iconBg: `${Colors.secondaryContainer}25`,
    title: 'Elevated Stress',
    subtitle: 'Slightly increased speech rate and cortisol-mapped vocal tension.',
    time: '5h ago',
    accent: '#60a5fa',
  },
  {
    id: 3,
    icon: 'leaf',
    iconColor: Colors.onSurfaceVariant,
    iconBg: 'rgba(255,255,255,0.05)',
    title: 'Deep Calm',
    subtitle: 'Evening relaxation session. Heart rate variability stabilized.',
    time: 'Yesterday',
    accent: null,
  },
];

// Simple SVG chart representation
function EmotionChart() {
  return (
    <View style={chartStyles.container}>
      {/* Legend */}
      <View style={chartStyles.legendRow}>
        <View style={chartStyles.legendItem}>
          <View style={[chartStyles.legendDot, { backgroundColor: Colors.gradientPurple, shadowColor: Colors.gradientPurple }]} />
          <Text style={chartStyles.legendLabel}>Joy</Text>
        </View>
        <View style={chartStyles.legendItem}>
          <View style={[chartStyles.legendDot, { backgroundColor: '#60a5fa', shadowColor: '#60a5fa' }]} />
          <Text style={chartStyles.legendLabel}>Stress</Text>
        </View>
      </View>

      {/* SVG Chart */}
      <Svg width="100%" height={120} viewBox="0 0 400 100">
        <Defs>
          <SvgGradient id="joyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#A855F7" stopOpacity="0.2" />
            <Stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
          </SvgGradient>
          <SvgGradient id="stressGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
            <Stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </SvgGradient>
        </Defs>

        {/* Grid */}
        <Line x1="0" y1="20" x2="400" y2="20" stroke="white" strokeOpacity="0.05" strokeDasharray="4" />
        <Line x1="0" y1="50" x2="400" y2="50" stroke="white" strokeOpacity="0.05" strokeDasharray="4" />
        <Line x1="0" y1="80" x2="400" y2="80" stroke="white" strokeOpacity="0.05" strokeDasharray="4" />

        {/* Stress fill */}
        <Path d="M0,80 Q50,40 100,60 T200,30 T300,70 T400,20 V100 H0 Z" fill="url(#stressGrad)" />
        {/* Stress line */}
        <Path d="M0,80 Q50,40 100,60 T200,30 T300,70 T400,20" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />

        {/* Joy fill */}
        <Path d="M0,60 Q60,20 120,40 T240,10 T360,50 T400,30 V100 H0 Z" fill="url(#joyGrad)" />
        {/* Joy line */}
        <Path d="M0,60 Q60,20 120,40 T240,10 T360,50 T400,30" fill="none" stroke="#A855F7" strokeWidth="2.5" strokeLinecap="round" />
      </Svg>

      {/* X axis labels */}
      <View style={chartStyles.xLabels}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <Text key={day} style={chartStyles.xLabel}>{day}</Text>
        ))}
      </View>
    </View>
  );
}

export default function HistoryScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <View style={styles.container}>
      {/* Background orbs */}
      <EmotionOrb color={Colors.gradientPurple} size={340} style={{ top: '15%', right: -100 }} opacity={0.07} />
      <EmotionOrb color={Colors.gradientBlue} size={420} style={{ bottom: '-5%', left: -80 }} opacity={0.06} />

      {/* Top App Bar */}
      <TopAppBar onProfilePress={() => navigation.navigate('Profile')} />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 72, paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero title */}
        <View style={styles.heroSection}>
          <Text style={styles.pageTitle}>History</Text>
          <Text style={styles.pageSubtitle}>Your emotional journey over the last 7 days.</Text>
        </View>

        {/* Trends Chart Card */}
        <GlassCard style={styles.chartCard} borderRadius={BorderRadius.DEFAULT}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartTitle}>Trends</Text>
              <Text style={styles.chartSubtitle}>Weekly Joy vs Stress</Text>
            </View>
          </View>
          <EmotionChart />
        </GlassCard>

        {/* Filter Pills */}
        <View style={styles.filterRow}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setActiveFilter(f)}
              activeOpacity={0.75}
              style={styles.filterBtnWrapper}
            >
              {activeFilter === f ? (
                <LinearGradient
                  colors={[Colors.gradientBlue, Colors.gradientPurple]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.filterBtnActive}
                >
                  <Text style={styles.filterTextActive}>{f}</Text>
                </LinearGradient>
              ) : (
                <View style={styles.filterBtnInactive}>
                  <Text style={styles.filterTextInactive}>{f}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Timeline */}
        <View style={styles.timeline}>
          {TIMELINE.map((item, index) => (
            <React.Fragment key={item.id}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.timelineItem, item.accent ? { borderLeftColor: item.accent, borderLeftWidth: 3 } : {}]}
              >
                <View style={[styles.timelineIcon, { backgroundColor: item.iconBg }]}>
                  <Ionicons name={item.icon} size={22} color={item.iconColor} />
                </View>
                <View style={styles.timelineBody}>
                  <View style={styles.timelineRow}>
                    <Text style={styles.timelineTitle}>{item.title}</Text>
                    <Text style={styles.timelineTime}>{item.time}</Text>
                  </View>
                  <Text style={styles.timelineSubtitle}>{item.subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={Colors.onSurfaceVariant} />
              </TouchableOpacity>

              {/* Insert AI Insight card after item 2 */}
              {index === 1 && <AIInsightCard />}
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function AIInsightCard() {
  return (
    <View style={aiStyles.wrapper}>
      <LinearGradient
        colors={['#60a5fa', Colors.gradientPurple]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={aiStyles.border}
      >
        <View style={aiStyles.inner}>
          <View style={aiStyles.header}>
            <Ionicons name="sparkles" size={18} color={Colors.primary} />
            <Text style={aiStyles.headerText}>AI Insight</Text>
          </View>
          <Text style={aiStyles.body}>
            You tend to experience a 15% drop in stress levels after 3:00 PM on days you logged a "Calm" morning session. Consider a 5-minute meditation at noon tomorrow.
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: Spacing.containerPadding,
    gap: Spacing.lg,
  },
  heroSection: {
    gap: 4,
  },
  pageTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    lineHeight: 40,
    color: Colors.onSurface,
    letterSpacing: -0.5,
  },
  pageSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: Colors.onSurfaceVariant,
  },
  chartCard: {
    padding: Spacing.md,
  },
  chartHeader: {
    marginBottom: Spacing.sm,
  },
  chartTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    color: Colors.primary,
  },
  chartSubtitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  filterBtnWrapper: {
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  filterBtnActive: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
  },
  filterBtnInactive: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  filterTextActive: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: '#fff',
  },
  filterTextInactive: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: Colors.onSurfaceVariant,
  },
  timeline: {
    gap: Spacing.gutter,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: BorderRadius.DEFAULT,
    padding: Spacing.gutter,
  },
  timelineIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  timelineBody: {
    flex: 1,
    gap: 4,
  },
  timelineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  timelineTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    color: Colors.onSurface,
    flex: 1,
    marginRight: 8,
  },
  timelineTime: {
    fontFamily: 'Inter_700Bold',
    fontSize: 9,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  timelineSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    lineHeight: 20,
  },
});

const aiStyles = StyleSheet.create({
  wrapper: {
    borderRadius: BorderRadius.DEFAULT + 2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  border: {
    padding: 2,
    borderRadius: BorderRadius.DEFAULT + 2,
  },
  inner: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.DEFAULT,
    padding: Spacing.md,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  body: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.onSurface,
    lineHeight: 22,
  },
});

const chartStyles = StyleSheet.create({
  container: {
    marginTop: 4,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 2,
  },
  legendLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  xLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  xLabel: {
    fontFamily: 'Inter_700Bold',
    fontSize: 9,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
