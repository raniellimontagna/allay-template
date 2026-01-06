import { useMemo } from 'react';
import type { Edges } from 'react-native-safe-area-context';

export interface UseSafeAreaContainerProps {
  edges?: Edges;
}

export function useSafeAreaContainer({ edges }: UseSafeAreaContainerProps) {
  const defaultEdges: Edges = useMemo(() => edges || ['top', 'left', 'right', 'bottom'], [edges]);

  return {
    edges: defaultEdges,
  };
}
