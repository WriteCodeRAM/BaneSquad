import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import {
  colors,
  spacing,
  fontSize,
  fontWeight,
} from "../../../constants/theme";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function ProfileScreen() {
  const { user } = useUser();

  const discordAccount = user?.externalAccounts.find(
    (account) => account.provider === "discord"
  );

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.card}>
        <Image
          source={{ uri: discordAccount?.imageUrl }}
          style={styles.profilePic}
        />

        <Text style={styles.username}>@{discordAccount?.username}</Text>
        <Text style={styles.joinDate}>Joined October 2025</Text>

        {/* Social Handles */}
        <View style={styles.handlesContainer}>
          <View style={styles.handleRow}>
            <FontAwesome6
              name="x-twitter"
              size={16}
              color={colors.textSecondary}
            />
            <Text style={styles.handleValue}>@smartproof</Text>
          </View>
          <View style={styles.handleRow}>
            <Text style={styles.handleLabel}>Playback:</Text>
            <Text style={styles.handleValue}>PrimeCreated</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          {/* Referrals */}
          <View style={styles.statBox}>
            <Text style={styles.statIcon}>📋</Text>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Referrals</Text>
          </View>

          {/* Earnings */}
          <View style={styles.statBox}>
            <Text style={styles.statIcon}>💰</Text>
            <Text style={styles.statValue}>$500</Text>
            <Text style={styles.statLabel}>Earnings</Text>
          </View>

          {/* BanePoints */}
          <View style={styles.statBox}>
            <Text style={styles.statIcon}>⚡</Text>
            <Text style={styles.statValue}>3000</Text>
            <Text style={styles.statLabel}>BanePoints</Text>
          </View>
        </View>

        {/* POTD Record */}
        <View style={styles.recordCard}>
          <Text style={styles.recordTitle}>POTD Record</Text>
          <View style={styles.recordRow}>
            <Text style={styles.recordWins}>8</Text>
            <Text style={styles.recordSeparator}>-</Text>
            <Text style={styles.recordLosses}>3</Text>
            <Text style={styles.recordSeparator}>-</Text>
            <Text style={styles.recordDraws}>1</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    margin: spacing.md,
    alignItems: "center",
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  username: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  joinDate: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  handlesContainer: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  handleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
  },
  handleLabel: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  handleValue: {
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: fontWeight.semibold,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: spacing.xl,
  },
  statBox: {
    alignItems: "center",
    flex: 1,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    marginHorizontal: spacing.xs,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  recordCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    width: "80%",
    alignItems: "center",
  },
  recordTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  recordValue: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  recordRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  recordWins: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.success, // Green
  },
  recordLosses: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.error, // Red
  },
  recordDraws: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textSecondary,
  },
  recordSeparator: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textSecondary,
    marginHorizontal: spacing.xs,
  },
});
