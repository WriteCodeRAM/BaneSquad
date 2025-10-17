import { Redirect, Tabs } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TabsLayout() {
  const { isSignedIn } = useAuth();

  // If not signed in, redirect to auth
  if (!isSignedIn) {
    return <Redirect href="/(auth)/signIn" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#E31C25",
        tabBarActiveBackgroundColor: "#000000",
        tabBarInactiveBackgroundColor: "#000000",
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
      <Tabs.Screen name="referrals" options={{ title: "Referrals" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
