/**
 * AudioWaveform - Animated audio bar visualization
 * Recreates the audio bar waveform from the live_detection HTML screen
 * Uses Animated API to make bars pulse with varying heights
 */
import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const BAR_HEIGHTS = [40, 20, 70, 90, 60, 15, 45, 85, 50, 35, 75, 95, 40, 25, 65, 80, 30, 55, 70, 90];

function AnimatedBar({ baseHeight, delay }) {
  const anim = useRef(new Animated.Value(baseHeight)).current;

  useEffect(() => {
    // Loop animation: bars oscillate around their base height
    const animate = () => {
      Animated.sequence([
        Animated.timing(anim, {
          toValue: Math.max(8, baseHeight + (Math.random() * 30 - 15)),
          duration: 300 + Math.random() * 400,
          useNativeDriver: false,
        }),
        Animated.timing(anim, {
          toValue: baseHeight,
          duration: 300 + Math.random() * 400,
          useNativeDriver: false,
        }),
      ]).start(() => animate());
    };

    const timeout = setTimeout(animate, delay);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View style={[styles.barWrapper, { height: anim }]}>
      <LinearGradient
        colors={['#3b82f6', '#a855f7']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.bar}
      />
    </Animated.View>
  );
}

export default function AudioWaveform({ style }) {
  return (
    <View style={[styles.container, style]}>
      {BAR_HEIGHTS.map((h, i) => (
        <AnimatedBar key={i} baseHeight={h * 0.55} delay={i * 50} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 3,
    height: 64,
  },
  barWrapper: {
    width: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  bar: {
    flex: 1,
  },
});
