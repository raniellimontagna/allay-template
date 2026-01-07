const { View } = require('react-native');

module.exports = {
  useSharedValue: (initialValue) => ({ value: initialValue }),
  useAnimatedStyle: () => ({}),
  withSpring: (value) => value,
  withTiming: (value) => value,
  withDelay: (_, callback) => callback,
  withSequence: (...args) => args[0],
  withRepeat: (animation) => animation,
  cancelAnimation: () => {},
  runOnJS: (fn) => fn,
  runOnUI: (fn) => fn,
  interpolate: (value) => value,
  Extrapolate: {
    EXTEND: 'extend',
    CLAMP: 'clamp',
    IDENTITY: 'identity',
  },
  Easing: {
    linear: (t) => t,
    ease: (t) => t,
    inOut: () => (t) => t,
    in: () => (t) => t,
    out: () => (t) => t,
  },
  createAnimatedComponent: (Component) => Component,
  default: {
    createAnimatedComponent: (Component) => Component,
    View,
    Text: require('react-native').Text,
    Image: require('react-native').Image,
    ScrollView: require('react-native').ScrollView,
    addWhitelistedNativeProps: () => {},
    call: () => {},
  },
};
