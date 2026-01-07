import { act, renderHook } from '@testing-library/react-native';
import { useBottomSheet } from './useBottomSheet';

describe('useBottomSheet', () => {
  it('should be closed by default', () => {
    const { result } = renderHook(() => useBottomSheet());

    expect(result.current.isOpen).toBe(false);
  });

  it('should be open when initialOpen is true', () => {
    const { result } = renderHook(() => useBottomSheet({ initialOpen: true }));

    expect(result.current.isOpen).toBe(true);
  });

  it('should open when open() is called', () => {
    const { result } = renderHook(() => useBottomSheet());

    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it('should close when close() is called', () => {
    const { result } = renderHook(() => useBottomSheet({ initialOpen: true }));

    act(() => {
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('should toggle state when toggle() is called', () => {
    const { result } = renderHook(() => useBottomSheet());

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('should call onOpen callback when opened', () => {
    const onOpen = jest.fn();
    const { result } = renderHook(() => useBottomSheet({ onOpen }));

    act(() => {
      result.current.open();
    });

    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('should call onClose callback when closed', () => {
    const onClose = jest.fn();
    const { result } = renderHook(() => useBottomSheet({ initialOpen: true, onClose }));

    act(() => {
      result.current.close();
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should call callbacks when toggling', () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const { result } = renderHook(() => useBottomSheet({ onOpen, onClose }));

    act(() => {
      result.current.toggle();
    });
    expect(onOpen).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.toggle();
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
