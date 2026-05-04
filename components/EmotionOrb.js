/**
 * EmotionOrb - Pulsing blurred orb for ambient visual feedback
 * Simulates the CSS blur + animation from the HTML screens
 */
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

export default function EmotionOrb({ color = '#A855F7', size = 160, style, opacity = 0.25 }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(opacity)).current;

  useEffect(() => {
    // Pulse animation: scale 1 → 1.2, opacity 0.5 → 0.8 (mimicking CSS keyframes)
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, { toValue: 1.2, duration: 2000, useNativeDriver: true }),
          Animated.timing(opacityAnim, { toValue: opacity + 0.15, duration: 2000, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(scaleAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
          Animated.timing(opacityAnim, { toValue: opacity, duration: 2000, useNativeDriver: true }),
        ]),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
        styles.orb,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  orb: {
    position: 'absolute',
  },
});
