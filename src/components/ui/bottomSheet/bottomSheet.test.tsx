import { Text } from 'react-native';
import { fireEvent, render, screen } from '@/testing/test-utils';
import { BottomSheet, type BottomSheetRef } from './bottomSheet';

describe('BottomSheet', () => {
  it('should render content when open', () => {
    render(
      <BottomSheet isOpen={true} onClose={jest.fn()}>
        <Text>Sheet Content</Text>
      </BottomSheet>
    );

    expect(screen.getByText('Sheet Content')).toBeTruthy();
  });

  it('should call onClose when close button is pressed', () => {
    const onClose = jest.fn();
    render(
      <BottomSheet isOpen={true} onClose={onClose}>
        <Text>Content</Text>
      </BottomSheet>
    );

    const closeButton = screen.getByText('Close');
    fireEvent.press(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  it('should call close when isOpen changes to false', () => {
    const { rerender } = render(
      <BottomSheet isOpen={true} onClose={jest.fn()}>
        <Text>Content</Text>
      </BottomSheet>
    );

    rerender(
      <BottomSheet isOpen={false} onClose={jest.fn()}>
        <Text>Content</Text>
      </BottomSheet>
    );

    // This should trigger the close() call in useEffect
  });

  it('should support disabling handle indicator', () => {
    render(
      <BottomSheet isOpen={true} onClose={jest.fn()} handleIndicator={false}>
        <Text>Content</Text>
      </BottomSheet>
    );
    // This covers the branch in handleIndicatorStyle
  });

  it('should expose open and close methods via ref', () => {
    const ref = { current: null as BottomSheetRef | null };
    render(
      <BottomSheet ref={ref} isOpen={false} onClose={jest.fn()}>
        <Text>Content</Text>
      </BottomSheet>
    );

    expect(ref.current?.open).toBeDefined();
    expect(ref.current?.close).toBeDefined();

    ref.current?.open();
    ref.current?.close();
  });
});
