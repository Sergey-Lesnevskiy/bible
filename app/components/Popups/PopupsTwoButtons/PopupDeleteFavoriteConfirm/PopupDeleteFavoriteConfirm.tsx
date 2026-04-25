import { COLORS } from '../../../../constants/theme';
import { useTheme } from '../../../../context/ThemeContext';
import PopupTwoButtons from '../PopupTwoButtons/PopupTwoButtons';

export type PopupDeleteFavoriteConfirmProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm?: () => void;
};

const PopupDeleteFavoriteConfirm = ({
  visible,
  onClose,
  onConfirm,
}: PopupDeleteFavoriteConfirmProps) => {
  const { theme } = useTheme();

  return (
    <PopupTwoButtons
      visible={visible}
      onClose={onClose}
      contentStyle={{ paddingHorizontal: 20 }}
      preset="warning"
      isTextCenter
      title={`Delete a Verse From Favourites?`}
      description={
        'Are you sure you want to delete this verse? This action cannot be undone'
      }
      leftAction={{
        title: 'Cancel',
        onPress: onClose ?? (() => {}),
        variant: 'popup_button_not_track',
        style: {
          backgroundColor:
            theme === 'light'
              ? COLORS.BUTTON_COLOR_ACTIVE_LIGHT
              : COLORS.GRAY_725,
        },
      }}
      rightAction={{
        title: 'Delete',
        onPress: onConfirm ?? (() => {}),
        variant: 'primary',
        onlyWhiteText: true,
      }}
    />
  );
};

export default PopupDeleteFavoriteConfirm;
