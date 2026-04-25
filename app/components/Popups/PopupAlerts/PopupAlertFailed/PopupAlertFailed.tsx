import { COLORS } from '../../../../constants/theme';
import { useTheme } from '../../../../context/ThemeContext';
import PopupAlert from '../PopupAlert/PopupAlert';

const PopupAlertFailed = () => {
  const handleCancel = () => {
    //TODO закрыть алерт
    alert('close alert');
  };
  const { theme } = useTheme();
  return (
    <PopupAlert
      title={`Failed to Restore Subscription`}
      description={'You don’t have an active subscription'}
      action={{
        title: 'Ok',
        onPress: handleCancel,
        variant: 'popup_button_not_track',
        style: {
          backgroundColor: theme === 'light' ? COLORS.GRAY_25 : COLORS.GRAY_76,
        },
      }}
    />
  );
};

export default PopupAlertFailed;
