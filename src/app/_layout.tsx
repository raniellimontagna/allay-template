import { ToastProvider, ToastViewport } from '@tamagui/toast';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { TamaguiProvider, Theme } from 'tamagui';

import { Toast } from '@/components/ui/toast';
import { useLoadFonts } from '@/hooks';
import { QueryProvider } from '@/providers';
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
    <QueryProvider>
      <TamaguiProvider config={config}>
        <Theme name={theme}>
          <ToastProvider>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            <Stack screenOptions={{ headerShown: false }} />
            <Toast />
            <ToastViewport flexDirection="column-reverse" top="$8" left={0} right={0} />
          </ToastProvider>
        </Theme>
      </TamaguiProvider>
    </QueryProvider>
  );
}
