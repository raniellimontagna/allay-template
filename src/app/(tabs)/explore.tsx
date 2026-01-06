import { CompassLinear } from '@solar-icons/react-native';
import { useTranslation } from 'react-i18next';
import { H1, Text, useTheme, YStack } from 'tamagui';

import { SafeAreaContainer } from '@/components';

export default function ExploreTab() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <SafeAreaContainer edges={['top']}>
      <YStack flex={1} items="center" justify="center" p="$4">
        <YStack
          width={80}
          height={80}
          borderRadius="$10"
          items="center"
          justify="center"
          bg="$color3"
          mb="$4"
        >
          <CompassLinear size={40} color={theme.blue10?.val} />
        </YStack>

        <H1 size="$6">{t('explore.title')}</H1>
        <Text color="$color11" text="center">
          {t('explore.description')}
        </Text>
      </YStack>
    </SafeAreaContainer>
  );
}
