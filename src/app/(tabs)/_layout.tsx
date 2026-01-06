import { HomeLinear, InfoCircleLinear, SettingsLinear } from '@solar-icons/react-native';
import { Tabs } from 'expo-router';
import { useTheme } from 'tamagui';

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.color?.val,
        tabBarInactiveTintColor: theme.color11?.val,
        tabBarStyle: {
          backgroundColor: theme.background?.val,
          borderTopColor: theme.borderColor?.val,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <HomeLinear color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => <InfoCircleLinear color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <SettingsLinear color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
