import { defaultConfig } from '@tamagui/config/v4';
import { createTamagui } from 'tamagui';

export const config = createTamagui(defaultConfig);

export default config;

type CustomConfig = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends CustomConfig {}
}
