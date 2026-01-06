import { Toast as TamaguiToast, useToastController, useToastState } from '@tamagui/toast';
import { YStack } from 'tamagui';

/*
 * Toast component that renders the current toast from state.
 * Using standard Tamagui Toast primitives.
 */
export function Toast() {
  const currentToast = useToastState();

  if (!currentToast || currentToast.isHandledNatively) return null;

  return (
    <TamaguiToast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation="100ms"
      viewportName={currentToast.viewportName}
    >
      <YStack flex={1}>
        <TamaguiToast.Title fontWeight="bold" color="$color">
          {currentToast.title}
        </TamaguiToast.Title>
        {!!currentToast.message && (
          <TamaguiToast.Description color="$color10">
            {currentToast.message}
          </TamaguiToast.Description>
        )}
      </YStack>
    </TamaguiToast>
  );
}

export { useToastController, useToastState };
export const useToast = useToastController;
