import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import type { ReactNode } from 'react';

export interface BottomSheetProps {
  /** Whether the bottom sheet is open */
  isOpen: boolean;
  /** Callback when the bottom sheet closes */
  onClose: () => void;
  /** Content to render inside the bottom sheet */
  children: ReactNode;
  /** Snap points for the bottom sheet (e.g., ['25%', '50%', '90%']) */
  snapPoints?: (string | number)[];
  /** Index of the initial snap point when opened */
  initialSnapIndex?: number;
  /** Whether to enable panning down to close */
  enablePanDownToClose?: boolean;
  /** Custom backdrop component */
  backdropComponent?: React.FC<BottomSheetBackdropProps>;
  /** Whether to show the handle indicator */
  handleIndicator?: boolean;
}
