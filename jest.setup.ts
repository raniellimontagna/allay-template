import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// Mock NetInfo for network tests
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(() => jest.fn()),
  fetch: jest.fn(() =>
    Promise.resolve({
      isConnected: true,
      isInternetReachable: true,
      type: 'wifi',
    })
  ),
}));

// Mock react-native-reanimated (Manual mock to avoid Worklets error in v4)
jest.mock('react-native-reanimated', () => {
  const ReactNative = require('react-native');
  return {
    __esModule: true,
    default: {
      addWhitelistedUIProps: jest.fn(),
      View: ReactNative.View,
      Text: ReactNative.Text,
      Image: ReactNative.Image,
      ScrollView: ReactNative.ScrollView,
      createAnimatedComponent: (c: any) => c,
      interpolate: jest.fn(),
      Extrapolation: { CLAMP: 'clamp', IDENTITY: 'identity', EXTEND: 'extend' },
      Easing: {
        linear: jest.fn(),
        ease: jest.fn(),
        quad: jest.fn(),
        cubic: jest.fn(),
        poly: jest.fn(),
        sin: jest.fn(),
        circle: jest.fn(),
        exp: jest.fn(),
        elastic: jest.fn(),
        back: jest.fn(),
        bounce: jest.fn(),
        bezier: jest.fn(),
        in: jest.fn(),
        out: jest.fn(),
        inOut: jest.fn(),
      },
    },
    useSharedValue: jest.fn((v) => ({ value: v })),
    useAnimatedStyle: jest.fn((fn) => fn()),
    useAnimatedProps: jest.fn((fn) => fn()),
    useDerivedValue: jest.fn((fn) => ({ value: fn() })),
    withTiming: jest.fn((v) => v),
    withSpring: jest.fn((v) => v),
    withRepeat: jest.fn((v) => v),
    withSequence: jest.fn((v) => v),
    withDelay: jest.fn((v) => v),
    runOnJS: jest.fn((fn) => fn),
    runOnWorklet: jest.fn((fn) => fn),
    interpolate: jest.fn((v) => v),
    Extrapolation: { CLAMP: 'clamp', IDENTITY: 'identity', EXTEND: 'extend' },
    Easing: {
      linear: (v: any) => v,
      ease: (v: any) => v,
      quad: (v: any) => v,
      cubic: (v: any) => v,
      poly: (v: any) => v,
      sin: (v: any) => v,
      circle: (v: any) => v,
      exp: (v: any) => v,
      elastic: (v: any) => v,
      back: (v: any) => v,
      bounce: (v: any) => v,
      bezier: () => (v: any) => v,
      in: (v: any) => v,
      out: (v: any) => v,
      inOut: (v: any) => v,
    },
    FadeIn: { delay: () => ({ springify: () => ({}) }), springify: () => ({}) },
    FadeInDown: { delay: () => ({ springify: () => ({}) }), springify: () => ({}) },
    FadeInUp: { delay: () => ({ springify: () => ({}) }), springify: () => ({}) },
    FadeOut: { delay: () => ({ springify: () => ({}) }), springify: () => ({}) },
    Layout: { springify: () => ({}), duration: () => ({}) },
    createAnimatedComponent: (c: any) => c,
    useAnimatedScrollHandler: jest.fn(() => () => {}),
    useAnimatedGestureHandler: jest.fn(() => () => {}),
    useAnimatedRef: jest.fn(() => ({ current: null })),
    measure: jest.fn(() => ({ x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 })),
    scrollTo: jest.fn(),
  };
});

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const ReactNative = require('react-native');
  return {
    GestureHandlerRootView: ReactNative.View,
    PanGestureHandler: ReactNative.View,
    GestureDetector: ReactNative.View,
    Gesture: {
      Pan: () => ({
        onUpdate: () => ({
          onEnd: () => ({}),
        }),
      }),
    },
    State: {},
    Directions: {},
  };
});

// Mock @gorhom/bottom-sheet
jest.mock('@gorhom/bottom-sheet', () => {
  const React = require('react');
  const ReactNative = require('react-native');
  return {
    __esModule: true,
    BottomSheetModal: React.forwardRef(({ children, onDismiss, backdropComponent }: any, ref: any) => {
      React.useImperativeHandle(ref, () => ({
        present: jest.fn(),
        dismiss: () => onDismiss?.(),
        snapToIndex: jest.fn(),
        snapToPosition: jest.fn(),
        expand: jest.fn(),
        collapse: jest.fn(),
        close: jest.fn(),
      }));
      return React.createElement(ReactNative.View, {}, [
        backdropComponent && React.createElement(backdropComponent, { key: 'backdrop' }),
        React.createElement(ReactNative.Button, {
          title: 'Close',
          onPress: onDismiss,
          key: 'close-button',
        }),
        children,
      ]);
    }),
    BottomSheetModalProvider: ({ children }: any) => children,
    BottomSheetView: ReactNative.View,
    BottomSheetBackdrop: () => null,
    default: React.forwardRef(({ children, onClose }: any, ref: any) => {
      React.useImperativeHandle(ref, () => ({
        snapToIndex: jest.fn(),
        close: () => onClose?.(),
      }));
      return React.createElement(ReactNative.View, {}, [
        React.createElement(ReactNative.Button, {
          title: 'Close',
          onPress: onClose,
          key: 'close-button',
        }),
        children,
      ]);
    }),
  };
});

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  selectionAsync: jest.fn(),
  notificationAsync: jest.fn(),
  impactAsync: jest.fn(),
  NotificationFeedbackType: {
    Success: 'success',
    Warning: 'warning',
    Error: 'error',
  },
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
}));

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  useGlobalSearchParams: () => ({}),
  Stack: {
    Screen: jest.fn(() => null),
  },
  Tabs: {
    Screen: jest.fn(() => null),
  },
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: jest.fn(),
      language: 'en',
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

