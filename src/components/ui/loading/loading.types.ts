export interface LoadingProps {
  /** Size of the spinner */
  size?: 'small' | 'medium' | 'large';
  /** Optional message to display below spinner */
  message?: string;
  /** Whether to show as full screen overlay */
  fullScreen?: boolean;
  /** Custom color for the spinner */
  color?: string;
}
