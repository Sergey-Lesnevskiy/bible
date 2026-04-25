import { COLORS } from '../../../../constants/theme';
import { useTheme } from '../../../../context/ThemeContext';
import PopupAlert from '../PopupAlert/PopupAlert';

const PopupAlertError = () => {
  const handleCancel = () => {
    //TODO закрыть алерт
    alert('close alert');
  };

  const { theme } = useTheme();

  return (
    <PopupAlert
      title={`Error`}
      description={
        'Unfortunately, the purchase is unavailable for an unknown reason. Try again later.'
      }
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

export default PopupAlertError;
