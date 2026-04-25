import React from 'react';

import { Image, View } from 'react-native';
import WrapperContent from '../../../components/WrapperContent/WrapperContent';
import { ThemedButton } from '../../../components/General/ThemeButton/ThemedButton';
import { ThemedText } from '../../../components/General/ThemedText/ThemedText';
import { styles } from './DayStreakPage.styles';
import DaysStreak from '../../../components/DaysStreak/DaysStreak';
import { useAppDispatch } from '../../../store/store';
import { selectPageAction } from '../../../store/features/page/actions';
import { useStreakData } from '../../../hooks/useStreakData';

const DayStreakPage = () => {
  const dispatch = useAppDispatch();
  const { DayContainer, day } = useStreakData();

  const handleContinue = () => {
    dispatch(selectPageAction({ page: 'Today' }));
  };

  return (
    <WrapperContent type="launcher">
      <View style={styles.header}>
        <Image
          source={require('../../../assets/images/streak/Fire.png')}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <ThemedText variant="amLargeTitleDefault" align="center">
            {day}
          </ThemedText>

          <ThemedText variant="amTitle2_400Semibold" align="center">
            Day Streak
          </ThemedText>
          <ThemedText variant="sfBody17Regular" align="center">
            {'Stay connected with God and\nstrengthen your faith'}
          </ThemedText>
        </View>
        <View style={styles.wrapperDays}>
          <DaysStreak days={DayContainer} />
        </View>
      </View>
      <View style={styles.footer}>
        <ThemedText
          variant="sfBody13Regular"
          style={styles.text}
          align="center"
        >
          {`Your streak ends if you skip tomorrow. You can\n restore only one missed day. Stay faithful\n and connected every day`}
        </ThemedText>
        <View style={styles.containerButton}>
          <ThemedButton
            title="Done"
            variant={'primary'}
            onlyWhiteText
            onPress={handleContinue}
          />
        </View>
      </View>
    </WrapperContent>
  );
};

export default DayStreakPage;
