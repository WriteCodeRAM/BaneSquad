import { Redirect, Tabs } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../../../constants/theme";

export default function TabsLayout() {
  const { isSignedIn } = useAuth();

  // If not signed in, redirect to auth
  if (!isSignedIn) {
    return <Redirect href="/(auth)/signIn" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background, // Dark background
        },
        headerTitleAlign: "center",
        headerTintColor: colors.text, // White text
        headerShadowVisible: false, // Remove shadow line
        tabBarStyle: {
          backgroundColor: colors.background, // Dark tab bar
          borderTopColor: colors.border, // Subtle border
        },
        tabBarActiveTintColor: colors.primary, // Red when active
        tabBarInactiveTintColor: colors.textSecondary, // Gray when inactive
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="referrals"
        options={{
          title: "Referrals",
          tabBarIcon: ({ color }) => (
            <AntDesign name="form" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-secret" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
