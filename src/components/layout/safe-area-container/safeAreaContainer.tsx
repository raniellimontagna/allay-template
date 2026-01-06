import type { YStackProps } from 'tamagui';

import { StyledSafeAreaView } from './safeAreaContainer.styles';
import { useSafeAreaContainer } from './useSafeAreaContainer';

export interface SafeAreaContainerProps extends YStackProps {
  children: React.ReactNode;
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
}

export function SafeAreaContainer({ children, edges, ...props }: SafeAreaContainerProps) {
  const { edges: safeAreaEdges } = useSafeAreaContainer({ edges });

  return (
    // @ts-expect-error: Tamagui styled component has stricter backfaceVisibility type than RN SafeAreaView
    <StyledSafeAreaView edges={safeAreaEdges} {...props}>
      {children}
    </StyledSafeAreaView>
  );
}
