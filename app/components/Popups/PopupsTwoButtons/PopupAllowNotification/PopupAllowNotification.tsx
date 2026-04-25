import { NAME_APP } from '../../../../constants/metrics';
import { COLORS } from '../../../../constants/theme';
import { useTheme } from '../../../../context/ThemeContext';

import PopupTwoButtons from '../PopupTwoButtons/PopupTwoButtons';
import { useAppDispatch } from '../../../../store/store';
import { updateAllowSendNotificationAction } from '../../../../store/features/userData/actions';
import { closePopupAction } from '../../../../store/features/popup/actions';

export type PopupAllowNotificationProps = {
  visible: boolean;
  onClose: () => void;
};

const PopupAllowNotification = ({ visible, onClose }: PopupAllowNotificationProps) => {
  const dispatch = useAppDispatch();

  const handleNotTrack = () => {
    dispatch(updateAllowSendNotificationAction(false));
    dispatch(closePopupAction());
  };
  const handleAllowTrack = () => {
    dispatch(updateAllowSendNotificationAction(true));
    dispatch(closePopupAction());
  };

  const { theme } = useTheme();
  return (
    <PopupTwoButtons
      visible={visible}
      onClose={onClose}
      title={`${NAME_APP.nameApp} Would like to Send You Notifications`}
      description={
        'Notifications may include alerts, sounds, and icon badges. These can be configuredd in Settings.'
      }
      contentStyle={{ width: 300 }}
      isOnboarding
      withGradient
      preset="agreeNotification"
      leftAction={{
        title: 'Skip',
        onPress: handleNotTrack,
        variant: 'popup_button_not_track',
        style: {
          backgroundColor: theme === 'light' ? '#78788029' : '#78788052',
        },
      }}
      rightAction={{
        title: 'Allow',
        onPress: handleAllowTrack,
        variant: 'popup_button_allow',
        onlyWhiteText: true,
        style: { backgroundColor: COLORS.PRIMARY_ACTIVE_BUTTON },
      }}
    />
  );
};

export default PopupAllowNotification;
