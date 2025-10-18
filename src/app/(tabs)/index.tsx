import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import {
  colors,
  spacing,
  fontSize,
  fontWeight,
  borderRadius,
} from "../../../constants/theme";

export default function HomeScreen() {
  const { user } = useUser();

  const discordAccount = user?.externalAccounts.find(
    (account) => account.provider === "discord"
  );

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.username}>
          @{discordAccount?.username || "BaneSquad Member"}
        </Text>
      </View>

      {/* Hero Section */}
      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>🔥 BaneSquad Central Hub</Text>
        <Text style={styles.heroDescription}>
          Welcome to the BaneSquad app—the central hub for all members of the
          community to come together and earn money as a collective.
        </Text>
        <Text style={styles.heroDescription}>
          The app currently acts as a referral tracker but will soon allow users
          to post their POTD and discover other ways to earn points in the
          community.
        </Text>
        <Text style={styles.heroDescription}>
          These points can be used to get rewards such as protected slips,
          follows, mod status, giveaway entries, and more.
        </Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsCard}>
        <Text style={styles.cardTitle}>Your Stats</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Referrals</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.success }]}>
              $500
            </Text>
            <Text style={styles.statLabel}>Earned</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              3000
            </Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
        </View>
      </View>

      {/* Current Features */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📱 Current Features</Text>
        <FeatureItem
          icon="rocket"
          title="Referral Tracking"
          description="Submit and track your DFS referrals. Get paid for every successful signup."
        />
        <FeatureItem
          icon="trophy"
          title="Leaderboards"
          description="Compete with the community. Top referrers get recognition and rewards."
        />
        <FeatureItem
          icon="user"
          title="Profile & Stats"
          description="Track your earnings, points, and referral history all in one place."
        />
      </View>

      {/* Coming Soon */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🚀 Coming Soon</Text>
        <FeatureItem
          icon="star"
          title="POTD (Pick of the Day)"
          description="Share your daily picks and build your reputation as a capper."
          comingSoon
        />
        <FeatureItem
          icon="gift"
          title="Rewards Shop"
          description="Spend your points on protected slips, follows, and exclusive perks."
          comingSoon
        />
        <FeatureItem
          icon="calendar"
          title="Weekly Challenges"
          description="Compete in weekly contests and earn bonus points."
          comingSoon
        />
      </View>

      {/* Community Info */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>💰 How It Works</Text>
        <Text style={styles.infoText}>
          1. Get someone to sign up using code{" "}
          <Text style={styles.highlight}>BANESQUAD</Text>
        </Text>
        <Text style={styles.infoText}>
          2. Submit their info through the app
        </Text>
        <Text style={styles.infoText}>3. Admin reviews and approves</Text>
        <Text style={styles.infoText}>
          4. Get paid via Cash App, Venmo, or PayPal
        </Text>
      </View>
    </ScrollView>
  );
}

function FeatureItem({
  icon,
  title,
  description,
  comingSoon = false,
}: {
  icon: string;
  title: string;
  description: string;
  comingSoon?: boolean;
}) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureIconContainer}>
        <AntDesign
          name={icon as any}
          size={20}
          color={comingSoon ? colors.textTertiary : colors.primary}
        />
      </View>
      <View style={styles.featureContent}>
        <View style={styles.featureTitleRow}>
          <Text
            style={[
              styles.featureTitle,
              comingSoon && styles.featureTitleDisabled,
            ]}
          >
            {title}
          </Text>
          {comingSoon && (
            <View style={styles.comingSoonBadge}>
              <Text style={styles.comingSoonText}>SOON</Text>
            </View>
          )}
        </View>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  welcomeText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  username: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.black,
    color: colors.text,
  },
  heroCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    margin: spacing.md,
    marginTop: 0,
  },
  heroTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  heroDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  statsCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    margin: spacing.md,
  },
  cardTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.black,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    margin: spacing.md,
  },
  featureItem: {
    flexDirection: "row",
    marginBottom: spacing.md,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  featureContent: {
    flex: 1,
  },
  featureTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  featureTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  featureTitleDisabled: {
    color: colors.textSecondary,
  },
  featureDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  comingSoonBadge: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: spacing.sm,
  },
  comingSoonText: {
    fontSize: 10,
    fontWeight: fontWeight.bold,
    color: colors.textTertiary,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md,
    borderRadius: borderRadius.md,
    margin: spacing.md,
    gap: spacing.sm,
  },
  ctaButtonText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    margin: spacing.md,
    marginBottom: spacing.xl,
  },
  infoTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  infoText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  highlight: {
    color: colors.primary,
    fontWeight: fontWeight.bold,
  },
});
