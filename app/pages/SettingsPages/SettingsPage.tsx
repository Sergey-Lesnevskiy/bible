import React, { useCallback, useRef, useState } from 'react';

import { Image, Pressable, View, Linking, Platform, Share } from 'react-native';
import WrapperContent from '../../components/WrapperContent/WrapperContent';
import { ThemedText } from '../../components/General/ThemedText/ThemedText';
import { styles } from './SettingsPage.styles';

import SettingsSection from '../../components/SettingsList/SettingsSection/SettingsList';
import SettingsListItem from '../../components/SettingsList/SettingsListItem/SettingsListItem';
import { getAdaptiveSize } from '../../constants/typography';

import StarIcon from '../../assets/icons/settings/star-light.svg';
import ShareIcon from '../../assets/icons/settings/share-light.svg';
import RestoreIcon from '../../assets/icons/settings/restore-light.svg';
import LetterIcon from '../../assets/icons/settings/letter-light.svg';
import PrivacyIcon from '../../assets/icons/settings/privacy-light.svg';
import TermsIcon from '../../assets/icons/settings/terns-light.svg';
import SvgBibleLight from '../../assets/icons/onboarding/bible-light.svg';

import { COLORS } from '../../constants/theme';
import { AnchorRect } from '../../components/Popups/PopupBibleMoreMenu/PopupBibleMoreMenu';
import PopupChangeDenomination from '../../components/Popups/PopupChangeDenomination/PopupChangeDenomination.';

 import PopupChangeBibleVersion from '../../components/Popups/PopupChangeBibleVersion/PopupChangeBibleVersion';
 import { useAppDispatch, useAppSelector } from '../../store/store';
 import {
   selectUserDataBibleVersionSelector,
   selectUserDataDenominationSelector,
   selectUserDataIsProSelector,
 } from '../../store/features/userData/selectors';
 import {
   changeBibleVersionAndSyncAction,
   changeDenominationAndSyncAction,
   restorePurchaseAction,
 } from '../../store/features/userData/actions';
 import { selectPageAction } from '../../store/features/page/actions';


const bannerImage = require('../../assets/images/settings/Banner.png');

const SettingsNoProPage = () => {
  const dispatch = useAppDispatch();
  const denomination = useAppSelector(selectUserDataDenominationSelector);
  const bibleVersion = useAppSelector(selectUserDataBibleVersionSelector);
  const isPro = useAppSelector(selectUserDataIsProSelector);

  const [popupVisible, setPopupVisible] = useState(false);
  const [anchorRect, setAnchorRect] = useState<AnchorRect | null>(null);


  const [versionPopupVisible, setVersionPopupVisible] = useState(false);
  const [versionAnchorRect, setVersionAnchorRect] = useState<AnchorRect | null>(
    null,
  );

  const changeDenominationRef = useRef<View>(null);
  const changeBibleVersionRef = useRef<View>(null);

  const handleAddPro = () => {
    dispatch(selectPageAction({ page: 'PayWall' }));
  };
  
  const handleContinue = (page: string) => {
    // TODO добавить переход по станицам
    alert(page);
  };

  const handleOpenPrivacyPolicy = async () => {
    const url = 'https://sites.google.com/view/bible-one-privacy-policy';
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  const handleOpenTermsOfUse = async () => {
    const url = 'https://sites.google.com/view/bible-one-terms';
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  const handleRateUs = async () => {
    const bundleId = 'com.vautika.holyBible';
    const appStoreUrl = `https://apps.apple.com/app/id${bundleId}`;
    const playStoreUrl = `market://details?id=${bundleId}`;
    
    try {
      const url = Platform.OS === 'ios' ? appStoreUrl : playStoreUrl;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Failed to open store:', error);
    }
  };

  const handleShareApp = async () => {
    const bundleId = 'com.vautika.holyBible';
    const appStoreUrl = `https://apps.apple.com/app/id${bundleId}`;
    const playStoreUrl = `https://play.google.com/store/apps/details?id=${bundleId}`;
    const shareUrl = Platform.OS === 'ios' ? appStoreUrl : playStoreUrl;

    try {
      await Share.share({
        message: `Check out this amazing Bible app! ${shareUrl}`,
        url: shareUrl,
        title: 'Bible App',
      });
    } catch (error) {
      console.error('Failed to share:', error);
    }
  };

  const handleShowDenominationPopup = () => {
    changeDenominationRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setAnchorRect({ x: pageX, y: pageY, width, height });
      setPopupVisible(true);
    });
  };

  const handleCloseDenominationPopup = () => {
    setPopupVisible(false);
  };


  const handleReligionSelect = (religion: string) => {
    dispatch(changeDenominationAndSyncAction(religion as any));
  };

  const handleShowBibleVersionPopup = () => {
    changeBibleVersionRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setVersionAnchorRect({ x: pageX, y: pageY, width, height });
      setVersionPopupVisible(true);
    });
  };

  const handleCloseBibleVersionPopup = () => {
    setVersionPopupVisible(false);
  };

  const handleBibleVersionSelect = (version: string) => {
    dispatch(changeBibleVersionAndSyncAction(version as any));
  };

  const handleRestorePurchase = () => {
    dispatch(restorePurchaseAction());
  };


  const iconSize = getAdaptiveSize(18, false, 2);

  return (
    <WrapperContent style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTitle}>
          <ThemedText variant="sfTitle2Bold" align="center">
            Settings
          </ThemedText>
        </View>
      </View>

      <View style={styles.mainContainer}>
        {!isPro && (
          <View style={styles.proBanner}>
            <Image
              source={bannerImage}
              style={styles.proBannerImage}
              resizeMode="cover"
            />
            <View style={styles.proBannerContent}>
              <ThemedText
                variant="amBody20Default"
                style={styles.proBannerTitle}
              >
                PRO Version
              </ThemedText>
              <ThemedText
                variant="sfBody14Regular"
                style={[styles.proBannerSubtitle, { color: COLORS.WHITE_30 }]}
              >
                Get full access without limits
              </ThemedText>
              <Pressable
                onPress={handleAddPro}
                hitSlop={10}
                style={({ pressed }) => [
                  styles.proBannerButton,
                  pressed && styles.proBannerButtonPressed,
                ]}
              >
                <ThemedText
                  variant="sfBody14Semibold"
                  style={[
                    styles.proBannerButtonText,
                    { color: COLORS.PRIMARY_TEXT_THEME_LIGHT },
                  ]}
                >
                  Get PRO
                </ThemedText>
              </Pressable>
            </View>
          </View>
        )}

        <SettingsSection>
          <View ref={changeDenominationRef}>
            <SettingsListItem
              title="Change denomination"
              icon={<SvgBibleLight width={iconSize} height={iconSize} />}
              onPress={handleShowDenominationPopup}
              rotateArrow={popupVisible}
            />
          </View>
          <View ref={changeBibleVersionRef}>
            <SettingsListItem
              title="Change Bible version"
              icon={<SvgBibleLight width={iconSize} height={iconSize} />}
              onPress={handleShowBibleVersionPopup}
              rotateArrow={versionPopupVisible}
            />
          </View>
          <SettingsListItem
            title="Rate Us"
            icon={<StarIcon width={iconSize} height={iconSize} />}
            onPress={handleRateUs}
          />
          <SettingsListItem
            title="Share Application"
            icon={<ShareIcon width={iconSize} height={iconSize} />}
            onPress={handleShareApp}
          />
          <SettingsListItem
            title="Restore Purchase"
            icon={<RestoreIcon width={iconSize} height={iconSize} />}
            onPress={handleRestorePurchase}
          />
          <SettingsListItem
            title="Help"
            icon={<LetterIcon width={iconSize} height={iconSize} />}
            onPress={() => handleContinue('Help')}
            showDivider={false}
          />
        </SettingsSection>

        <SettingsSection>
          <SettingsListItem
            title="Privacy & Policy"
            icon={<PrivacyIcon width={iconSize} height={iconSize} />}
            onPress={handleOpenPrivacyPolicy}
          />
          <SettingsListItem
            title="Terms of Usage"
            icon={<TermsIcon width={iconSize} height={iconSize} />}
            onPress={handleOpenTermsOfUse}
            showDivider={false}
          />
        </SettingsSection>
      </View>

      <PopupChangeDenomination
        visible={popupVisible}
        anchorRect={anchorRect}
        onClose={handleCloseDenominationPopup}
        selectedReligion={denomination}
        onReligionSelect={handleReligionSelect}
      />

      <PopupChangeBibleVersion
        visible={versionPopupVisible}
        anchorRect={versionAnchorRect}
        onClose={handleCloseBibleVersionPopup}
        selectedVersion={bibleVersion}
        onVersionSelect={handleBibleVersionSelect}
      />
    </WrapperContent>
  );
};

export default SettingsNoProPage;
