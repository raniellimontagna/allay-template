import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider, Theme } from 'tamagui';

import { useAppStore } from '@/stores';
import config from '@/theme/tamagui.config';

export default function RootLayout() {
  const theme = useAppStore((state) => state.theme);

  return (
    <TamaguiProvider config={config}>
      <Theme name={theme}>
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
        <Stack screenOptions={{ headerShown: false }} />
      </Theme>
    </TamaguiProvider>
  );
}
