import { CloundCrossLinear } from '@solar-icons/react-native';
import { useTranslation } from 'react-i18next';
import { Text, useTheme, XStack } from 'tamagui';

import { useNetwork } from '@/hooks';

/**
 * Banner that appears when the device is offline
 */
export function OfflineBanner() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { isOffline } = useNetwork();

  if (!isOffline) return null;

  return (
    <XStack bg="$red9" py="$2" px="$4" items="center" justify="center" gap="$2">
      <CloundCrossLinear size={18} color={theme.white?.val || '#fff'} />
      <Text color="white" fontSize="$3" fontWeight="500">
        {t('common.offline')}
      </Text>
    </XStack>
  );
}
