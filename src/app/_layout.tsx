import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ToastProvider, ToastViewport } from '@tamagui/toast';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TamaguiProvider, Theme } from 'tamagui';

import { OfflineBanner } from '@/components/ui/offlineBanner';
import { Toast } from '@/components/ui/toast';
import { useLoadFonts } from '@/hooks';
import { I18nProvider, QueryProvider } from '@/providers';
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
    <I18nProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryProvider>
          <TamaguiProvider config={config}>
            <Theme name={theme}>
              <BottomSheetModalProvider>
                <ToastProvider>
                  <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
                  <OfflineBanner />
                  <Stack screenOptions={{ headerShown: false }} />
                  <Toast />
                  <ToastViewport flexDirection="column-reverse" top="$8" left={0} right={0} />
                </ToastProvider>
              </BottomSheetModalProvider>
            </Theme>
          </TamaguiProvider>
        </QueryProvider>
      </GestureHandlerRootView>
    </I18nProvider>
  );
}
