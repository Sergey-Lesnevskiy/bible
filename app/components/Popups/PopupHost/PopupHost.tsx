import React, { useEffect, useState } from 'react';

import PopupFavorites from '../PopupFavorites/PopupFavorites';
import PopupFontSize from '../PopupFontSize/PopupFontSize';
import PopupConfirmToast from '../PopupConfirmToast/PopupConfirmToast';

import { useAppDispatch, useAppSelector } from '../../../store/store';
import {
  selectActivePopupKey,
  selectPopupPayload,
} from '../../../store/features/popup/selectors';
import { closePopupAction, openPopupAction } from '../../../store/features/popup/actions';
import { selectFontSize } from '../../../store/features/bibleReader/selectors';
import { setFontSizeAction } from '../../../store/features/bibleReader/actions';
import PopupAllow from '../PopupAllowTrack/PopupAllow';
import PopupAllowNotification from '../PopupsTwoButtons/PopupAllowNotification/PopupAllowNotification';
import PopupNoInternet from '../PopupsTwoButtons/PopupNoInternet/PopupNoInternet';
import PopupSomethingWrong from '../PopupsTwoButtons/PopupSomethingWrong/PopupSomethingWrong';
import PopupEnjoyingNameApp from '../PopupsTwoButtons/PopupEnjoyingNameApp/PopupEnjoyingNameApp';
import { IWithPopupTwoButtons } from '../../../types/iWith';
import { voidFn } from '../../../constants/voidFn';
import PopupDontLose from '../PopupDontLose/PopupDontLose';
import PopupAlertFailed from '../PopupAlerts/PopupAlertFailed/PopupAlertFailed';
import PopupAlertError from '../PopupAlerts/PopupAlertError/PopupAlertFailed';
import PopupBiblePicker from '../PopupBiblePicker/PopupBiblePicker';
import PopupBibleActions from '../PopupBibleActions/PopupBibleActions';

const PopupHost = () => {
  const dispatch = useAppDispatch();
  const activeKey = useAppSelector(selectActivePopupKey);
  const payload = useAppSelector(selectPopupPayload);
  const fontSize = useAppSelector(selectFontSize);
  const [renderKey, setRenderKey] = useState(activeKey);
  const onClose = () => dispatch(closePopupAction());
  const [toastText, setToastText] = useState<string | null>(null);
  const [actionPerformed, setActionPerformed] = useState(false);
  const { onCancel, onTryAgain } =
    typeof payload === 'object' &&
      payload &&
      'onCancel' in payload &&
      'onTryAgain' in payload
      ? (payload as IWithPopupTwoButtons)
      : { onCancel: voidFn, onTryAgain: voidFn };

  useEffect(() => {
    if (activeKey) {
      setRenderKey(activeKey);
    } else {
      // Добавляем задержку чтобы анимация оверлея успела завершиться
      const id = setTimeout(() => setRenderKey(null), 400);
      return () => clearTimeout(id);
    }
  }, [activeKey]);
  if (!renderKey) return null;

  switch (renderKey) {
    case 'favorites':
      return <PopupFavorites visible={!!renderKey} onClose={onClose} />;

    case 'fontSize':
      return (
        <PopupFontSize
          visible
          onClose={onClose}
          initialValue={fontSize}
          min={14}
          max={26}
          step={1}
          onChange={(value) => {
            dispatch(setFontSizeAction(value));
          }}
        />
      );

    case 'confirmToast': {
      const text =
        typeof payload === 'object' && payload && 'text' in payload
          ? String((payload as any).text)
          : '';

      return (
        <PopupConfirmToast text={text} visible={!!renderKey} onPress={onClose} />
      );
    }
    case 'allowTrackActivity': {
      return <PopupAllow visible={!!renderKey} onClose={onClose} />;
    }

    case 'allowSendNotifications': {
      return <PopupAllowNotification visible={!!renderKey} onClose={onClose} />;
    }

    case 'noInternet': {
      return <PopupNoInternet onCancel={onCancel} visible={!!renderKey} onTryAgain={onTryAgain} />;
    }

    case 'somethingWrong': {
      return (
        <PopupSomethingWrong onCancel={onCancel} visible={!!renderKey} onTryAgain={onTryAgain} />
      );
    }

    case 'leaveReview': {
      return (
        <PopupEnjoyingNameApp onCancel={onCancel} visible={!!renderKey} onTryAgain={onTryAgain} />
      );
    }

    case 'restoreStreak': {
      return <PopupDontLose visible={!!renderKey} onClose={onClose} />;
    }

    case 'alertFailed': {
      return <PopupAlertFailed />;
    }

    case 'alertError': {
      return <PopupAlertError />;
    }
    case 'bibleActions': {
      if (!payload) return null;
      const {
        onSave,
        onCopy,
        onShare,
        onClose: payloadOnClose,
      } = payload as any;

      const withToast = (fn?: () => void | Promise<void>, text?: string, isAsync: boolean = false, onComplete?: (successText: string) => void) => isAsync
        ? async () => {
          try {
            const result = fn?.();
            if (result instanceof Promise) {
              await result;
            }
            let successText = '';
            if (text) {
              setToastText(text);
              setActionPerformed(true);
              successText = text;
            }
            onComplete?.(successText);
          } catch (error) {
            const errorText = error instanceof Error ? error.message : 'Action failed';
            setToastText(errorText);
            setActionPerformed(true);
            onComplete?.(errorText);
          }
        }
        : () => {
          try {
            fn?.();
            let successText = '';
            if (text) {
              setToastText(text);
              setActionPerformed(true);
              successText = text;
            }
            onComplete?.(successText);
          } catch (error) {
            const errorText = error instanceof Error ? error.message : 'Action failed';
            setToastText(errorText);
            setActionPerformed(true);
            onComplete?.(errorText);
          }
        };

      return (
        <PopupBibleActions
          visible={activeKey === 'bibleActions'}
          onClose={() => {
            payloadOnClose?.();
            onClose();
          }}
          onSave={withToast(onSave, 'Verse saved to favorites', false, (successText) => {
            if (successText) {
              dispatch(openPopupAction({
                key: 'confirmToast',
                payload: { text: successText },
              }));
            }
          })}
          onCopy={withToast(onCopy, 'Verse copied to clipboard', true, (successText) => {
            if (successText) {
              dispatch(openPopupAction({
                key: 'confirmToast',
                payload: { text: successText },
              }));
            }
          })}
          onShare={withToast(onShare, 'Verse shared', true, (successText) => {
            if (successText) {
              dispatch(openPopupAction({
                key: 'confirmToast',
                payload: { text: successText },
              }));
            }
          })}
        />
      );
    }
    case 'biblePicker': {
      if (!payload) return null;
      const {
        versionJson,
        value,
        onSelect,
        onVersionChange,
        onClose: payloadOnClose,
      } = payload as any;

      const handleClose = () => {
        onClose();
        payloadOnClose?.();
      };

      return (
        <PopupBiblePicker
          key={activeKey}
          visible={activeKey === 'biblePicker'}
          onClose={handleClose}
          versionJson={versionJson}
          value={value}
          onSelect={onSelect}
          onVersionChange={onVersionChange}
        />
      );
    }
    default:
      return null;
  }
};

export default PopupHost;
