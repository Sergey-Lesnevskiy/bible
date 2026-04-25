import React, { useEffect } from 'react';
import { View, TouchableOpacity, Image, ScrollView } from 'react-native';
import WrapperContent from '../../../components/WrapperContent/WrapperContent';
import { ThemedButton } from '../../../components/General/ThemeButton/ThemedButton';
import { ThemedText } from '../../../components/General/ThemedText/ThemedText';
import { styles } from './RestoreStreakPage.styles';
import DaysStreak from '../../../components/DaysStreak/DaysStreak';
import { ThemedView } from '../../../components/General/ThemedView/ThemedView';
import SvgCalendarDark from '../../../assets/icons/streak/calendar-dark.svg';
import SvgCalendarLight from '../../../assets/icons/streak/calendar-light.svg';
import ThemedSvgIcon from '../../../components/General/ThemedSvgIcon/ThemedSvgIcon';
import SvgFireDark from '../../../assets/icons/streak/fire-dark.svg';
import SvgFireLight from '../../../assets/icons/streak/fire-light.svg';
import { COLORS } from '../../../constants/theme';
import { useTheme } from '../../../context/ThemeContext';
import VerseOfTheDay from '../../../components/VerseOfTheDay/VerseOfTheDay';
import { useStreakData } from '../../../hooks/useStreakData';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { isLastCurrentStreakTodaySelector } from '../../../store/features/streak/selectors';
import { selectPageAction, setCalendarModeAction } from '../../../store/features/page/actions';
import {
  selectDailyVerseSelector,
  selectUserDataDenominationSelector,
} from '../../../store/features/userData/selectors';
import { isNil } from '../../../utils/nil';
import { loadDailyVerseAction } from '../../../store/features/userData/actions';
import { selectHolidaysDataSelector } from '../../../store/features/holidays/selectors';
import { getTodayHoliday } from '../../../utils/getHolidaysFromStore';
import HolidayNotification from '../../../components/Calendar/HolidayNotification/HolidayNotification';

const RestoreStreakPage = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const dailyVerse = useAppSelector(selectDailyVerseSelector);
  const holidaysData = useAppSelector(selectHolidaysDataSelector);
  const denomination = useAppSelector(selectUserDataDenominationSelector);
  const { DayContainer, day } = useStreakData();

  const todayHoliday = getTodayHoliday(holidaysData, denomination);

  const handleOpenHolyCalendar = () => {
    dispatch(selectPageAction({ page: 'Calendar' }));
    dispatch(setCalendarModeAction({ mode: 'holy' }));
  };

  const handleOpenStreakPage = () => {
    dispatch(selectPageAction({ page: 'Streak' }));
  };

  const handleOpenDailyStreakCalendar = () => {
    dispatch(selectPageAction({ page: 'Calendar' }));
    dispatch(setCalendarModeAction({ mode: 'daily' }));
  };

  useEffect(() => {
    if (isNil(dailyVerse)) {
      dispatch(loadDailyVerseAction());
    }
  }, [dailyVerse]);
  const isActiveStreak = useAppSelector(isLastCurrentStreakTodaySelector);

  return (
    <WrapperContent style={styles.container} type="launcher">
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <View style={styles.headerTop}>
            <View style={styles.headerTitle}>
              <ThemedText variant="sfTitle2Bold" align="center">
                Today's Journey
              </ThemedText>
            </View>
            <ThemedView style={styles.headerActions} type="notification">
              <ThemedButton
                title={
                  <ThemedSvgIcon
                    LightIcon={SvgCalendarDark}
                    DarkIcon={SvgCalendarLight}
                  />
                }
                style={styles.iconButton}
                variant={'transparent'}
                onlyWhiteText
                onPress={handleOpenHolyCalendar}
              />
              <View
                style={[
                  styles.headerActionsDivider,
                  {
                    backgroundColor:
                      theme === 'light' ? COLORS.GRAY_50 : COLORS.GRAY_700,
                  },
                ]}
              />
              <TouchableOpacity
                style={styles.dayBadge}
                onPress={handleOpenDailyStreakCalendar}
                activeOpacity={0.7}
              >
                {isActiveStreak ? (
                  <Image
                    source={require('../../../assets/images/streak/Fire.png')}
                    style={styles.imageFireActive}
                  />
                ) : (
                  <ThemedSvgIcon
                    LightIcon={SvgFireDark}
                    DarkIcon={SvgFireLight}
                  />
                )}
                <ThemedText>{day}</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </View>
          <TouchableOpacity
            style={styles.daysSection}
            onPress={handleOpenStreakPage}
            activeOpacity={0.7}
          >
            <DaysStreak days={DayContainer} isNameContainer />
          </TouchableOpacity>
          <View style={styles.mainContainer}>
            <VerseOfTheDay
              text={dailyVerse ? dailyVerse.verse : ''}
              acts={dailyVerse?.acts}
            />
            {todayHoliday && (
              <HolidayNotification
                title={todayHoliday.title}
                description={todayHoliday.description || ''}
                date={todayHoliday.date}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </WrapperContent>
  );
};

export { RestoreStreakPage };
