import type { ReactNode } from 'react';

export interface SettingsItemProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  rightElement?: ReactNode;
  onPress?: () => void;
  destructive?: boolean;
}
