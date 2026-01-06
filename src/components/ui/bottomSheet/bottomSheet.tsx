import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { useTheme } from 'tamagui';

import type { BottomSheetProps } from './bottomSheet.types';

export interface BottomSheetRef {
  open: () => void;
  close: () => void;
}

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  (
    {
      isOpen,
      onClose,
      children,
      snapPoints: customSnapPoints,
      enablePanDownToClose = true,
      handleIndicator = true,
    },
    ref
  ) => {
    const theme = useTheme();
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo(() => customSnapPoints ?? ['50%'], [customSnapPoints]);

    const open = useCallback(() => {
      bottomSheetRef.current?.present();
    }, []);

    const close = useCallback(() => {
      bottomSheetRef.current?.dismiss();
    }, []);

    useImperativeHandle(ref, () => ({ open, close }), [open, close]);

    useEffect(() => {
      if (isOpen) {
        open();
      } else {
        close();
      }
    }, [isOpen, open, close]);

    const handleDismiss = useCallback(() => {
      onClose();
    }, [onClose]);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={enablePanDownToClose}
        onDismiss={handleDismiss}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{
          backgroundColor: theme.color11?.val,
          width: 40,
          display: handleIndicator ? 'flex' : 'none',
        }}
        backgroundStyle={{
          backgroundColor: theme.background?.val,
        }}
      >
        <BottomSheetView style={{ flex: 1 }}>{children}</BottomSheetView>
      </BottomSheetModal>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';
