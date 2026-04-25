import { COLORS } from '../../../../constants/theme';
import { useTheme } from '../../../../context/ThemeContext';
import PopupTwoButtons from '../PopupTwoButtons/PopupTwoButtons';
import { IWithPopupTwoButtons } from '../../../../types/iWith';
import { useAppDispatch } from '../../../../store/store';
import { closePopupAction } from '../../../../store/features/popup/actions';

const PopupNoInternet = ({ onCancel, onTryAgain, visible }: IWithPopupTwoButtons & { visible: boolean }) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const handleCancel = () => {
    onCancel();
    dispatch(closePopupAction());
  };
  const handleTryAgain = () => {
    onTryAgain();
    dispatch(closePopupAction());
  };

  return (
    <PopupTwoButtons
      visible={visible}
      onClose={handleCancel}
      preset="warning"
      isTextCenter
      title={`No Internet Connection`}
      description={
        'Please check your internet connection and try again to continue'
      }
      leftAction={{
        title: 'Cancel',
        onPress: handleCancel,
        variant: 'popup_button_not_track',
        style: {
          backgroundColor:
            theme === 'light'
              ? COLORS.BUTTON_COLOR_ACTIVE_LIGHT
              : COLORS.GRAY_725,
        },
      }}
      rightAction={{
        title: 'Try again',
        onPress: handleTryAgain,
        variant: 'primary',
        onlyWhiteText: true,
      }}
    />
  );
};

export default PopupNoInternet;
