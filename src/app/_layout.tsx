import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { TamaguiProvider, Theme } from 'tamagui';

import { useLoadFonts } from '@/hooks';
import { useAppStore } from '@/stores';
import config from '@/theme/tamagui.config';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const theme = useAppStore((state) => state.theme);
  const { isReady, fontError } = useLoadFonts();

  useEffect(() => {
    if (isReady || fontError) {
      SplashScreen.hideAsync();
    }
  }, [isReady, fontError]);

  if (!isReady && !fontError) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <Theme name={theme}>
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
        <Stack screenOptions={{ headerShown: false }} />
      </Theme>
    </TamaguiProvider>
  );
}
