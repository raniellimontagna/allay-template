import type { PropsWithChildren } from 'react';
import {
  type GestureResponderEvent,
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useHaptics } from '@/hooks';

// Create an animated Pressable component
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface AnimatedScaleButtonProps extends Omit<PressableProps, 'children'>, PropsWithChildren {
  scaleTo?: number;
  hapticStyle?: 'light' | 'medium' | 'heavy' | 'selection';
  style?: StyleProp<ViewStyle>;
}

export function AnimatedScaleButton({
  children,
  scaleTo = 0.96,
  hapticStyle = 'light',
  style,
  onPressIn,
  onPressOut,
  ...props
}: AnimatedScaleButtonProps) {
  const scale = useSharedValue(1);
  const haptics = useHaptics();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = (e: GestureResponderEvent) => {
    scale.value = withSpring(scaleTo, { damping: 10, stiffness: 300 });
    haptics.trigger(hapticStyle);
    onPressIn?.(e);
  };

  const handlePressOut = (e: GestureResponderEvent) => {
    scale.value = withSpring(1, { damping: 10, stiffness: 300 });
    onPressOut?.(e);
  };

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[style, animatedStyle]}
      {...props}
    >
      {children}
    </AnimatedPressable>
  );
}
