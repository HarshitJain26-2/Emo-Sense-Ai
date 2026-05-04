/**
 * ProfileScreen
 * Matches: user_profile/code.html
 * - Header with user name and "Premium" badge
 * - Avatar circle with neon glow border
 * - Stats bento grid (Avg. Empathy, Mood Checks)
 * - General Settings section (Dark Mode toggle, Privacy, Notifications)
 * - Account section (Change Password, Email)
 * - Logout button with error styling
 * - Background decorative orbs
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '../styles/theme';
import GlassCard from '../components/GlassCard';
import EmotionOrb from '../components/EmotionOrb';
import TopAppBar from '../components/TopAppBar';

// Avatar placeholder (initials)
function AvatarPlaceholder() {
  return (
    <LinearGradient
      colors={[Colors.gradientBlue, Colors.gradientPurple]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.avatarGrad}
    >
      <Text style={styles.avatarInitials}>AR</Text>
    </LinearGradient>
  );
}

// Settings row
function SettingsRow({ icon, iconColor, title, subtitle, onPress, rightElement }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={styles.settingsRow}
    >
      <Ionicons name={icon} size={22} color={iconColor} style={{ marginRight: Spacing.md }} />
      <View style={styles.settingsText}>
        <Text style={styles.settingsTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingsSubtitle}>{subtitle}</Text>}
      </View>
      {rightElement || <Ionicons name="chevron-forward" size={18} color={Colors.onSurfaceVariant} />}
    </TouchableOpacity>
  );
}

export default function ProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [darkMode, setDarkMode] = useState(true);

  return (
    <View style={styles.container}>
      {/* Background orbs */}
      <EmotionOrb color={Colors.gradientPurple} size={440} style={{ top: '-8%', left: '-12%' }} opacity={0.12} />
      <EmotionOrb color={Colors.gradientBlue} size={360} style={{ bottom: '8%', right: '-12%' }} opacity={0.1} />

      {/* Top App Bar */}
      <TopAppBar />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 72, paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          {/* Avatar */}
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarBorder}>
              <AvatarPlaceholder />
            </View>
            {/* Premium badge */}
            <View style={styles.premiumBadge}>
              <LinearGradient
                colors={[Colors.gradientBlue, Colors.gradientPurple]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.premiumBadgeGrad}
              >
                <Text style={styles.premiumBadgeText}>Premium</Text>
              </LinearGradient>
            </View>
          </View>

          {/* Name */}
          <Text style={styles.profileName}>Alex Rivera</Text>
          <Text style={styles.profileSub}>Emotional Explorer since 2023</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <GlassCard style={styles.statCard} borderRadius={BorderRadius.DEFAULT}>
            <Ionicons name="heart" size={22} color={Colors.primary} />
            <Text style={styles.statValue}>84%</Text>
            <Text style={styles.statLabel}>Avg. Empathy</Text>
          </GlassCard>
          <GlassCard style={styles.statCard} borderRadius={BorderRadius.DEFAULT}>
            <Ionicons name="stats-chart" size={22} color={Colors.secondary} />
            <Text style={styles.statValue}>124</Text>
            <Text style={styles.statLabel}>Mood Checks</Text>
          </GlassCard>
        </View>

        {/* General Settings */}
        <View style={styles.settingsGroup}>
          <Text style={styles.groupLabel}>General Settings</Text>
          <GlassCard style={styles.settingsCard} borderRadius={BorderRadius.DEFAULT}>
            <SettingsRow
              icon="moon"
              iconColor={Colors.primaryContainer}
              title="Dark Mode"
              subtitle="Deep space aesthetic active"
              rightElement={
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: Colors.surfaceContainerHighest, true: Colors.primaryContainer }}
                  thumbColor={darkMode ? '#fff' : '#ccc'}
                />
              }
            />
            <View style={styles.divider} />
            <SettingsRow
              icon="shield"
              iconColor={Colors.secondary}
              title="Privacy Controls"
              subtitle="Manage data & AI encryption"
            />
            <View style={styles.divider} />
            <SettingsRow
              icon="notifications"
              iconColor={Colors.tertiary}
              title="Notification Settings"
              subtitle="Mood reminders & alerts"
            />
          </GlassCard>
        </View>

        {/* Account Settings */}
        <View style={styles.settingsGroup}>
          <Text style={styles.groupLabel}>Account</Text>
          <GlassCard style={styles.settingsCard} borderRadius={BorderRadius.DEFAULT}>
            <SettingsRow
              icon="lock-closed"
              iconColor={Colors.onSurfaceVariant}
              title="Change Password"
            />
            <View style={styles.divider} />
            <SettingsRow
              icon="at"
              iconColor={Colors.onSurfaceVariant}
              title="Email Notifications"
            />
          </GlassCard>
        </View>

        {/* Logout */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.logoutBtn}
        >
          <Ionicons name="log-out-outline" size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Log out of EmotionSense</Text>
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
    paddingHorizontal: Spacing.containerPadding,
    gap: Spacing.lg,
    alignItems: 'center',
  },
  // Profile header
  profileHeader: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 4,
  },
  avatarBorder: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: Colors.primaryContainer,
    padding: 3,
    overflow: 'hidden',
    shadowColor: Colors.gradientPurple,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  },
  avatarGrad: {
    flex: 1,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 36,
    color: '#fff',
    letterSpacing: 2,
  },
  premiumBadge: {
    position: 'absolute',
    bottom: 4,
    right: -4,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  premiumBadgeGrad: {
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  premiumBadgeText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  profileName: {
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    lineHeight: 38,
    color: Colors.onSurface,
    letterSpacing: -0.5,
  },
  profileSub: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    opacity: 0.7,
  },
  // Stats
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
    width: '100%',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing.md,
    gap: 4,
  },
  statValue: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: Colors.onSurface,
  },
  statLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 9,
    color: Colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  // Settings groups
  settingsGroup: {
    width: '100%',
    gap: 8,
  },
  groupLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    color: Colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 2,
    paddingLeft: 4,
  },
  settingsCard: {
    overflow: 'hidden',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
  },
  settingsText: {
    flex: 1,
  },
  settingsTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: Colors.onSurface,
  },
  settingsSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    opacity: 0.65,
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginLeft: Spacing.md + 22 + Spacing.md,
  },
  // Logout
  logoutBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.DEFAULT,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: `${Colors.error}30`,
  },
  logoutText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: Colors.error,
  },
});
