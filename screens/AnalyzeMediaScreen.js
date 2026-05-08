/**
 * AnalyzeMediaScreen
 * - Photo / Video toggle tabs
 * - Glassmorphic drag-and-drop upload zone with animated cloud icon
 * - Recent Uploads grid with status badges (Analyzed / Processing)
 * - Bottom nav handled by the tab navigator
 */
import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  Alert,
  Modal,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '../styles/theme';
import GlassCard from '../components/GlassCard';
import EmotionOrb from '../components/EmotionOrb';
import TopAppBar from '../components/TopAppBar';

const { width } = Dimensions.get('window');
const THUMB = (width - Spacing.gutter * 2 - Spacing.sm) / 2;

// ─── Mock recent-upload data ─────────────────────────────────────────────────
const RECENT_UPLOADS = [
  {
    id: '1',
    type: 'photo',
    status: 'analyzed',
    color: ['#1a0e33', '#0f1e3a'],
    icon: 'person',
    iconColor: '#ddb7ff',
    label: 'Portrait',
  },
  {
    id: '2',
    type: 'video',
    status: 'processing',
    color: ['#0f1e3a', '#1a2a3a'],
    icon: 'videocam',
    iconColor: '#60a5fa',
    label: 'Meeting Clip',
  },
  {
    id: '3',
    type: 'photo',
    status: 'analyzed',
    color: ['#1f0a2e', '#0b1326'],
    icon: 'people',
    iconColor: '#f472b6',
    label: 'Group Photo',
  },
  {
    id: '4',
    type: 'photo',
    status: 'analyzed',
    color: ['#0a1a2e', '#0f1e3a'],
    icon: 'happy',
    iconColor: '#facc15',
    label: 'Selfie',
  },
];

// ─── Upload zone with animated cloud icon ────────────────────────────────────
function UploadZone({ onPress, activeTab }) {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -8, duration: 1600, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 1600, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.12, duration: 1800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.uploadZoneTouch}>
      <GlassCard style={styles.uploadZone} borderRadius={BorderRadius.DEFAULT}>
        {/* Subtle inner gradient */}
        <LinearGradient
          colors={['rgba(168,85,247,0.06)', 'rgba(59,130,246,0.04)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />

        {/* Dashed border overlay */}
        <View style={styles.dashedBorder} />

        {/* Floating icon */}
        <Animated.View style={{ transform: [{ translateY: floatAnim }] }}>
          <Animated.View
            style={[
              styles.uploadIconRing,
              { transform: [{ scale: pulseAnim }] },
            ]}
          >
            <LinearGradient
              colors={[Colors.gradientBlue, Colors.gradientPurple]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.uploadIconBg}
            >
              <Ionicons
                name={activeTab === 'video' ? 'videocam' : 'cloud-upload'}
                size={28}
                color="#fff"
              />
            </LinearGradient>
          </Animated.View>
        </Animated.View>

        <Text style={styles.uploadTitle}>Drag &amp; drop files</Text>
        <Text style={styles.uploadSub}>or tap to select from your{'\n'}device</Text>

        <View style={styles.supportedTag}>
          <Text style={styles.supportedText}>
            {activeTab === 'video'
              ? 'SUPPORTS MP4, MOV, AVI UP TO 100MB'
              : 'SUPPORTS JPG, PNG, MP4 UP TO 50MB'}
          </Text>
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
}

// ─── Single upload thumbnail card ────────────────────────────────────────────
function UploadThumb({ item }) {
  const isAnalyzed = item.status === 'analyzed';
  return (
    <View style={styles.thumbWrapper}>
      <LinearGradient
        colors={item.color}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.thumbCard}
      >
        {/* Decorative orb */}
        <View
          style={[
            styles.thumbOrb,
            { backgroundColor: `${item.iconColor}22` },
          ]}
        />

        {/* Center icon */}
        <Ionicons name={item.icon} size={32} color={item.iconColor} />

        {/* Video play indicator */}
        {item.type === 'video' && (
          <View style={styles.playBadge}>
            <Ionicons name="play" size={10} color="#fff" />
          </View>
        )}

        {/* Status badge */}
        <View style={[styles.statusBadge, isAnalyzed ? styles.badgeAnalyzed : styles.badgeProcessing]}>
          <View
            style={[
              styles.badgeDot,
              { backgroundColor: isAnalyzed ? '#22c55e' : '#f59e0b' },
            ]}
          />
          <Text style={styles.badgeText}>
            {isAnalyzed ? '✦ ANALYZED' : '⏳ PROCESSING'}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────
export default function AnalyzeMediaScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('photo');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [uploading, setUploading] = useState(false);

  const requestPermissions = async (type) => {
    if (type === 'camera') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Camera access is required to take photos/videos.');
        return false;
      }
    } else {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Gallery access is required to select photos/videos.');
        return false;
      }
    }
    return true;
  };

  const handleMediaPick = async (source) => {
    const isPhoto = activeTab === 'photo';
    const permissionType = source === 'camera' ? 'camera' : 'library';
    const hasPermission = await requestPermissions(permissionType);

    if (!hasPermission) return;

    let result;
    const options = {
      mediaTypes: isPhoto ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    };

    if (source === 'camera') {
      result = await ImagePicker.launchCameraAsync(options);
    } else {
      result = await ImagePicker.launchImageLibraryAsync(options);
    }

    if (!result.canceled) {
      setSelectedMedia(result.assets[0]);
    }
  };

  const showMediaOptions = () => {
    const isPhoto = activeTab === 'photo';
    Alert.alert(
      `Select ${isPhoto ? 'Photo' : 'Video'}`,
      `Would you like to take a ${isPhoto ? 'photo' : 'video'} or select one from your gallery?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: isPhoto ? 'Take Photo' : 'Record Video', 
          onPress: () => handleMediaPick('camera') 
        },
        { 
          text: isPhoto ? 'Choose Photo' : 'Choose Video', 
          onPress: () => handleMediaPick('library') 
        },
      ]
    );
  };

  const filteredUploads =
    activeTab === 'photo'
      ? RECENT_UPLOADS.filter((u) => u.type === 'photo')
      : RECENT_UPLOADS.filter((u) => u.type === 'video');

  return (
    <View style={styles.container}>
      {/* Background orbs */}
      <EmotionOrb color="#A855F7" size={300} style={{ top: -60, right: -80 }} opacity={0.09} />
      <EmotionOrb color="#3B82F6" size={260} style={{ bottom: 120, left: -70 }} opacity={0.07} />

      {/* Top App Bar */}
      <TopAppBar onProfilePress={() => navigation.navigate('Profile')} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 72, paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ─────────────────────────────────────────────────── */}
        <View style={styles.headerBlock}>
          <Text style={styles.screenTitle}>Analyze Media</Text>
          <Text style={styles.screenSubtitle}>
            Upload content from your gallery for deep{'\n'}emotional insights.
          </Text>
        </View>

        {/* ── Photo / Video Toggle ─────────────────────────────────── */}
        <View style={styles.tabRow}>
          {['photo', 'video'].map((tab) => (
            <TouchableOpacity
              key={tab}
              activeOpacity={0.8}
              onPress={() => setActiveTab(tab)}
              style={styles.tabWrapper}
            >
              {activeTab === tab ? (
                <LinearGradient
                  colors={[Colors.gradientBlue, Colors.gradientPurple]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.tabActive}
                >
                  <Ionicons
                    name={tab === 'photo' ? 'image' : 'videocam'}
                    size={14}
                    color="#fff"
                    style={{ marginRight: 5 }}
                  />
                  <Text style={styles.tabActiveText}>
                    {tab === 'photo' ? 'Photo' : 'Video'}
                  </Text>
                </LinearGradient>
              ) : (
                <View style={styles.tabInactive}>
                  <Ionicons
                    name={tab === 'photo' ? 'image-outline' : 'videocam-outline'}
                    size={14}
                    color="#64748b"
                    style={{ marginRight: 5 }}
                  />
                  <Text style={styles.tabInactiveText}>
                    {tab === 'photo' ? 'Photo' : 'Video'}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Upload Zone ──────────────────────────────────────────── */}
        <UploadZone onPress={showMediaOptions} activeTab={activeTab} />

        {/* ── Selected Media Preview ───────────────────────────────── */}
        {selectedMedia && (
          <GlassCard style={styles.previewCard} borderRadius={BorderRadius.DEFAULT}>
            <Image source={{ uri: selectedMedia.uri }} style={styles.previewImage} />
            <TouchableOpacity 
              style={styles.removeMedia} 
              onPress={() => setSelectedMedia(null)}
            >
              <Ionicons name="close-circle" size={24} color="#ef4444" />
            </TouchableOpacity>
            <View style={styles.previewInfo}>
              <Text style={styles.previewText}>
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Ready
              </Text>
              <Text style={styles.previewSub}>Tap 'Analyze Now' to proceed</Text>
            </View>
          </GlassCard>
        )}

        {/* ── Upload CTA button ────────────────────────────────────── */}
        <TouchableOpacity 
          activeOpacity={0.85} 
          style={styles.ctaWrapper}
          onPress={selectedMedia ? () => Alert.alert('Processing', 'Analysis started...') : showMediaOptions}
        >
          <LinearGradient
            colors={[Colors.gradientBlue, Colors.gradientPurple]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaButton}
          >
            <Ionicons 
              name={selectedMedia ? "analytics" : "add-circle"} 
              size={20} 
              color="#fff" 
              style={{ marginRight: 8 }} 
            />
            <Text style={styles.ctaText}>
              {selectedMedia ? 'Analyze Now' : `Choose ${activeTab === 'photo' ? 'Photos' : 'Videos'}`}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* ── AI Features Row ──────────────────────────────────────── */}
        <View style={styles.featureRow}>
          {[
            { icon: 'sparkles', label: 'Emotion Map', color: Colors.gradientPurple },
            { icon: 'scan', label: 'Face Detect', color: Colors.gradientBlue },
            { icon: 'bar-chart', label: 'Mood Report', color: '#22c55e' },
          ].map((f) => (
            <GlassCard key={f.label} style={styles.featureCard} borderRadius={BorderRadius.sm}>
              <View style={[styles.featureIconBg, { backgroundColor: `${f.color}22` }]}>
                <Ionicons name={f.icon} size={18} color={f.color} />
              </View>
              <Text style={styles.featureLabel}>{f.label}</Text>
            </GlassCard>
          ))}
        </View>

        {/* ── Recent Uploads ───────────────────────────────────────── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Uploads</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        {filteredUploads.length > 0 ? (
          <View style={styles.thumbGrid}>
            {filteredUploads.map((item) => (
              <UploadThumb key={item.id} item={item} />
            ))}
          </View>
        ) : (
          <GlassCard style={styles.emptyState} borderRadius={BorderRadius.DEFAULT}>
            <Ionicons
              name={activeTab === 'video' ? 'videocam-off-outline' : 'image-outline'}
              size={36}
              color="#4d4354"
            />
            <Text style={styles.emptyText}>No {activeTab}s uploaded yet</Text>
            <Text style={styles.emptySubText}>
              Upload your first {activeTab} to start analysis
            </Text>
          </GlassCard>
        )}

        {/* ── Analysis Tips Card ───────────────────────────────────── */}
        <View style={styles.tipsCard}>
          <LinearGradient
            colors={[Colors.surfaceContainerLowest, Colors.surfaceContainerHigh]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
          {/* Glow orb */}
          <View style={styles.tipsOrb} />
          <View style={styles.tipsContent}>
            <Ionicons name="bulb" size={26} color="#facc15" style={{ marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.tipsTitle}>Best Results</Text>
              <Text style={styles.tipsBody}>
                Use well-lit, front-facing images. Clear facial visibility boosts accuracy by up to 40%.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: { flex: 1 },
  scrollContent: {
    paddingHorizontal: Spacing.gutter,
    gap: Spacing.sm,
  },

  // Header
  headerBlock: {
    gap: 4,
  },
  screenTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 26,
    color: Colors.onSurface,
  },
  screenSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    lineHeight: 20,
  },

  // Tabs
  tabRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  tabWrapper: {
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  tabActive: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
  },
  tabActiveText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: '#fff',
  },
  tabInactive: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  tabInactiveText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: '#64748b',
  },

  // Upload Zone
  uploadZoneTouch: {
    borderRadius: BorderRadius.DEFAULT,
  },
  uploadZone: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
    overflow: 'hidden',
    // override the GlassCard border to appear dashed-ish with a different colour
    borderColor: 'rgba(168,85,247,0.3)',
    borderWidth: 1.5,
    borderStyle: 'dashed',
  },
  dashedBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BorderRadius.DEFAULT,
  },
  uploadIconRing: {
    borderRadius: 40,
    shadowColor: Colors.gradientPurple,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  uploadIconBg: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: Colors.onSurface,
    marginTop: 4,
  },
  uploadSub: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 20,
  },
  supportedTag: {
    backgroundColor: Colors.surfaceContainerHighest,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    marginTop: 4,
  },
  supportedText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 9,
    color: '#64748b',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
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
    paddingVertical: 14,
    paddingHorizontal: Spacing.lg,
  },
  ctaText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 17,
    color: '#fff',
  },

  // Feature row
  featureRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  featureCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 6,
    gap: 6,
  },
  featureIconBg: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },

  // Section header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  sectionTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: Colors.onSurface,
  },
  viewAll: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: Colors.primary,
  },

  // Thumbnail grid
  thumbGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  thumbWrapper: {
    width: THUMB,
    height: THUMB,
    borderRadius: BorderRadius.DEFAULT,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  thumbCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  thumbOrb: {
    position: 'absolute',
    width: THUMB * 0.7,
    height: THUMB * 0.7,
    borderRadius: THUMB * 0.35,
    top: -THUMB * 0.1,
    right: -THUMB * 0.1,
  },
  playBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadge: {
    position: 'absolute',
    bottom: 10,
    left: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  badgeAnalyzed: {
    backgroundColor: 'rgba(34,197,94,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.3)',
  },
  badgeProcessing: {
    backgroundColor: 'rgba(245,158,11,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.3)',
  },
  badgeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  badgeText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 8,
    color: '#fff',
    letterSpacing: 1,
  },

  // Empty state
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.lg,
    gap: 8,
  },
  emptyText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: '#475569',
  },
  emptySubText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#334155',
    textAlign: 'center',
  },

  // Tips card
  tipsCard: {
    borderRadius: BorderRadius.DEFAULT,
    borderWidth: 1.5,
    borderColor: 'rgba(250,204,21,0.2)',
    overflow: 'hidden',
    padding: Spacing.md,
    position: 'relative',
  },
  tipsOrb: {
    position: 'absolute',
    right: -20,
    bottom: -20,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(250,204,21,0.06)',
  },
  tipsContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    zIndex: 1,
  },
  tipsTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: Colors.onSurface,
    marginBottom: 6,
  },
  tipsBody: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    lineHeight: 20,
  },

  // Preview
  previewCard: {
    padding: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginTop: Spacing.xs,
  },
  previewImage: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.sm,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  previewInfo: {
    flex: 1,
  },
  previewText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 15,
    color: Colors.onSurface,
  },
  previewSub: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.onSurfaceVariant,
  },
  removeMedia: {
    position: 'absolute',
    top: -5,
    right: -5,
    zIndex: 10,
    backgroundColor: Colors.background,
    borderRadius: 12,
  },
});
