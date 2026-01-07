import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';

import { AnimatedScaleButton } from './animatedScaleButton';

jest.mock('@/hooks', () => ({
  useHaptics: () => ({
    trigger: jest.fn(),
    light: jest.fn(),
    medium: jest.fn(),
    heavy: jest.fn(),
    selection: jest.fn(),
  }),
}));

jest.mock('@/hooks', () => ({
  useHaptics: () => ({
    trigger: jest.fn(),
    light: jest.fn(),
    medium: jest.fn(),
    heavy: jest.fn(),
    selection: jest.fn(),
  }),
}));

describe('AnimatedScaleButton', () => {
  it('should render children', () => {
    render(
      <AnimatedScaleButton>
        <Text testID="button-text">Press me</Text>
      </AnimatedScaleButton>
    );

    expect(screen.getByTestId('button-text')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const onPress = jest.fn();

    render(
      <AnimatedScaleButton onPress={onPress}>
        <Text>Button</Text>
      </AnimatedScaleButton>
    );

    fireEvent.press(screen.getByText('Button'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('should call onPressIn when press starts', () => {
    const onPressIn = jest.fn();

    render(
      <AnimatedScaleButton onPressIn={onPressIn}>
        <Text>Button</Text>
      </AnimatedScaleButton>
    );

    fireEvent(screen.getByText('Button'), 'pressIn');

    expect(onPressIn).toHaveBeenCalledTimes(1);
  });

  it('should call onPressOut when press ends', () => {
    const onPressOut = jest.fn();

    render(
      <AnimatedScaleButton onPressOut={onPressOut}>
        <Text>Button</Text>
      </AnimatedScaleButton>
    );

    fireEvent(screen.getByText('Button'), 'pressOut');

    expect(onPressOut).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    const onPress = jest.fn();

    render(
      <AnimatedScaleButton onPress={onPress} disabled>
        <Text>Button</Text>
      </AnimatedScaleButton>
    );

    fireEvent.press(screen.getByText('Button'));

    expect(onPress).not.toHaveBeenCalled();
  });
});
