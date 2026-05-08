/**
 * DetectionScreen
 * Matches: live_detection/code.html
 * - Full-screen camera placeholder with gradient dark background
 * - Neon bounding box with corner markers
 * - Floating "Joy detected 94%" label (pulsing dot)
 * - Animated audio waveform
 * - Current emotion display + share/bookmark actions
 * - Pause/Stop button with ping animation
 * - Floating emotion orb top-right
 */
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Button,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '../styles/theme';
import AudioWaveform from '../components/AudioWaveform';
import EmotionOrb from '../components/EmotionOrb';
import TopAppBar from '../components/TopAppBar';

const { width, height } = Dimensions.get('window');

export default function DetectionScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();

  // Animation refs
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pingAnim = useRef(new Animated.Value(1)).current;
  const pingOpacity = useRef(new Animated.Value(0.25)).current;

  useEffect(() => {
    // Pulse dot
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.4, duration: 700, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    ).start();

    // Ping ring
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(pingAnim, { toValue: 2, duration: 1500, useNativeDriver: true }),
          Animated.timing(pingOpacity, { toValue: 0, duration: 1500, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(pingAnim, { toValue: 1, duration: 0, useNativeDriver: true }),
          Animated.timing(pingOpacity, { toValue: 0.25, duration: 0, useNativeDriver: true }),
        ])
      ])
    ).start();

    // Request permissions on mount if not already granted
    if (!permission) {
      requestPermission();
    }
  }, []);

  if (!permission) {
    // Camera permissions are still loading
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.permissionText}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
          <Text style={styles.permissionBtnText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleStop = () => {
    navigation.navigate('Results');
  };

  return (
    <View style={styles.container}>
      {/* Full-screen camera feed */}
      <CameraView style={StyleSheet.absoluteFill} facing="front" />
      
      {/* Dark overlay for better UI contrast */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.3)' }]} />

      {/* Background orbs */}
      <View style={[styles.orbBlue, { top: -60, left: -60 }]} />
      <View style={[styles.orbPurple, { bottom: -60, right: -60 }]} />

      {/* Floating emotion orb top-right */}
      <EmotionOrb
        color={Colors.primary}
        size={120}
        style={{ top: insets.top + 60, right: -20 }}
        opacity={0.35}
      />

      {/* Top App Bar */}
      <TopAppBar onProfilePress={() => navigation.navigate('Profile')} />

      {/* Neon bounding box (face tracking frame) */}
      <View style={[styles.boundingBoxWrapper, { top: insets.top + 70 }]}>
        {/* Floating label */}
        <View style={styles.detectionLabel}>
          <Animated.View style={[styles.labelDot, { transform: [{ scale: pulseAnim }] }]} />
          <Text style={styles.labelText}>Joy detected 94%</Text>
        </View>

        <View style={styles.boundingBox}>
          {/* Neon corners */}
          <View style={[styles.corner, styles.cornerTL]} />
          <View style={[styles.corner, styles.cornerTR]} />
          <View style={[styles.corner, styles.cornerBL]} />
          <View style={[styles.corner, styles.cornerBR]} />
        </View>
      </View>

      {/* Bottom Overlay Panel */}
      <View style={[styles.bottomPanel, { paddingBottom: insets.bottom + 110 }]}>
        {/* Detection Controls Card */}
        <View style={styles.controlsCard}>
          {/* Current Emotion */}
          <View style={styles.emotionRow}>
            <View>
              <Text style={styles.emotionLabel}>CURRENT EMOTION</Text>
              <Text style={styles.emotionValue}>Ecstatic & Positive</Text>
            </View>
            <View style={styles.actionBtns}>
              <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
                <Ionicons name="share-social" size={20} color={Colors.secondary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
                <Ionicons name="bookmark" size={20} color={Colors.secondary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Audio Waveform */}
          <AudioWaveform style={{ marginTop: 8 }} />
        </View>

        {/* Pause / Stop Button */}
        <TouchableOpacity
          onPress={handleStop}
          activeOpacity={0.85}
          style={styles.stopBtnWrapper}
        >
          {/* Ping ring */}
          <Animated.View
            style={[
              styles.pingRing,
              {
                transform: [{ scale: pingAnim }],
                opacity: pingOpacity,
              },
            ]}
          />
          <LinearGradient
            colors={[Colors.gradientBlue, Colors.gradientPurple]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.stopBtn}
          >
            <Ionicons name="pause" size={30} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  orbBlue: {
    position: 'absolute',
    width: width * 0.55,
    height: width * 0.55,
    borderRadius: width * 0.275,
    backgroundColor: 'rgba(221,183,255,0.08)',
  },
  orbPurple: {
    position: 'absolute',
    width: width * 0.55,
    height: width * 0.55,
    borderRadius: width * 0.275,
    backgroundColor: 'rgba(173,198,255,0.08)',
  },
  // Bounding box
  boundingBoxWrapper: {
    position: 'absolute',
    left: (width - 230) / 2,
    width: 230,
    height: 290,
    alignItems: 'center',
  },
  detectionLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: `${Colors.primary}45`,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: BorderRadius.full,
    marginBottom: 12,
  },
  labelDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 4,
  },
  labelText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: Colors.primary,
  },
  boundingBox: {
    width: 230,
    height: 260,
    borderWidth: 2,
    borderColor: Colors.primaryContainer,
    borderRadius: 12,
    // Neon glow
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  },
  corner: {
    position: 'absolute',
    width: 18,
    height: 18,
  },
  cornerTL: {
    top: -2,
    left: -2,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#fff',
    borderTopLeftRadius: 4,
  },
  cornerTR: {
    top: -2,
    right: -2,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: '#fff',
    borderTopRightRadius: 4,
  },
  cornerBL: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#fff',
    borderBottomLeftRadius: 4,
  },
  cornerBR: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: '#fff',
    borderBottomRightRadius: 4,
  },
  // Bottom panel
  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: Spacing.lg,
    paddingHorizontal: Spacing.md,
  },
  controlsCard: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: BorderRadius.DEFAULT,
    padding: Spacing.md,
    gap: 8,
  },
  emotionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emotionLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    color: Colors.onSurfaceVariant,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  emotionValue: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: '#fff',
  },
  actionBtns: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  // Stop / pause button
  stopBtnWrapper: {
    width: 76,
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pingRing: {
    position: 'absolute',
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  stopBtn: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.gradientPurple,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 12,
  },

  // Permissions
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  permissionText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: Colors.onSurface,
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: BorderRadius.full,
  },
  permissionBtnText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 15,
    color: '#fff',
  },
});
