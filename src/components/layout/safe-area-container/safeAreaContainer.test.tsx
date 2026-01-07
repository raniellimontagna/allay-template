import { Text } from 'tamagui';
import { render } from '@/testing/test-utils';
import { SafeAreaContainer } from './safeAreaContainer';

it('should render children', () => {
  const { getByText } = render(
    <SafeAreaContainer>
      <Text>Test</Text>
    </SafeAreaContainer>
  );

  expect(getByText('Test')).toBeTruthy();
});
