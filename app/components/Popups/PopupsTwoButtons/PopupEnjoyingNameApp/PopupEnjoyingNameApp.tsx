import { NAME_APP } from '../../../../constants/metrics';
import { COLORS } from '../../../../constants/theme';
import { useTheme } from '../../../../context/ThemeContext';
import PopupTwoButtons from '../PopupTwoButtons/PopupTwoButtons';
import { IWithPopupTwoButtons } from '../../../../types/iWith';
import { useAppDispatch } from '../../../../store/store';
import { closePopupAction } from '../../../../store/features/popup/actions';

const PopupEnjoyingNameApp = ({
  onCancel,
  onTryAgain,
  visible,
}: IWithPopupTwoButtons & { visible: boolean }) => {
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
      title={`Enjoying ${NAME_APP.nameApp}`}
      description={
        'We put our heart into this. Your review would \nhelp us greatly'
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
        title: 'Leave a review',
        onPress: handleTryAgain,
        variant: 'primary',
        onlyWhiteText: true,
      }}
    />
  );
};

export default PopupEnjoyingNameApp;
