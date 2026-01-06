import {
  CheckCircleBold,
  CloseCircleBold,
  DangerCircleBold,
  InfoSquareBold,
} from '@solar-icons/react-native';
import { Toast as TamaguiToast, useToastController, useToastState } from '@tamagui/toast';
import { useTheme, YStack } from 'tamagui';

/*
 * Toast component that renders the current toast from state.
 * Using standard Tamagui Toast primitives.
 */
export function Toast() {
  const currentToast = useToastState();
  const theme = useTheme();

  if (!currentToast || currentToast.isHandledNatively) return null;

  const type = currentToast.type || 'info';

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleBold size={24} color={theme.green9?.val} />;
      case 'error':
        return <CloseCircleBold size={24} color={theme.red9?.val} />;
      case 'warning':
        return <DangerCircleBold size={24} color={theme.yellow9?.val} />;
      default:
        return <InfoSquareBold size={24} color={theme.blue9?.val} />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return { border: '$green9', background: '$green2' } as const;
      case 'error':
        return { border: '$red9', background: '$red2' } as const;
      case 'warning':
        return { border: '$yellow9', background: '$yellow2' } as const;
      default:
        return { border: '$blue9', background: '$blue2' } as const;
    }
  };

  const colors = getColors();

  return (
    <TamaguiToast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.95, y: -10 }}
      exitStyle={{ opacity: 0, scale: 1, y: -10 }}
      y={0}
      opacity={1}
      scale={1}
      animation="100ms"
      viewportName={currentToast.viewportName}
      p="$3"
      bg={colors.background}
      gap="$2"
      width="90%"
      maxW={350}
      flexDirection="row"
      items="center"
      self="center"
      borderRadius="$5"
      borderWidth={1}
      borderLeftWidth={5}
      borderColor="$borderColor"
      borderLeftColor={colors.border}
    >
      <YStack
        p="$2"
        items="center"
        justify="center"
        backgroundColor={colors.background}
        borderRadius={100}
      >
        {getIcon()}
      </YStack>

      <YStack flex={1}>
        <TamaguiToast.Title fontWeight="600" fontSize="$4" color="$color">
          {currentToast.title}
        </TamaguiToast.Title>
        {!!currentToast.message && (
          <TamaguiToast.Description fontSize="$3" color="$color10" opacity={0.8} lineHeight={18}>
            {currentToast.message}
          </TamaguiToast.Description>
        )}
      </YStack>
    </TamaguiToast>
  );
}

export { useToastController, useToastState };
export const useToast = useToastController;
