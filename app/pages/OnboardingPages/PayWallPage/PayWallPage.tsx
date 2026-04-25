import React, { useEffect, useMemo, useState } from 'react';
import { styles } from './PayWallPage.styles';
import { ThemedView } from '../../../components/General/ThemedView/ThemedView';
import { ThemedText } from '../../../components/General/ThemedText/ThemedText';
import { useTheme } from '../../../context/ThemeContext';
import { ImageBackground, View } from 'react-native';
import { ThemedButton } from '../../../components/General/ThemeButton/ThemedButton';
import { ChecklistItem } from '../../../components/ChecklistItem/ChecklistItem';
import { PricingRadio } from '../../../components/PricingRadio/PricingRadio';
import { useAppDispatch } from '../../../store/store';
import {
  uploadUserDataAction,
  updateIsProAction,
  updateLastPaymentDateAction,
  updateSubscriptionStatusAction,
} from '../../../store/features/userData/actions';
import { selectUserDataDocIdSelector } from '../../../store/features/userData/selectors';
import { useAppSelector } from '../../../store/store';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../api/firebase';
import { EDBCollection } from '../../../constants/firebase';
import { selectPageAction } from '../../../store/features/page/actions';
import { openPopupAction } from '../../../store/features/popup/actions';
import { MaxWidthContainerOnboarding } from '../../../components/MaxWidthContainer/MaxWidthContainerOnboarding/MaxWidthContainerOnboarding';

// Импорты Apphud SDK (только для iOS/Android)
import { ApphudSdk } from '@apphud/react-native-apphud-sdk';

const data = [
  'Help us reach 1 billion Christians',
  'Take part in Christian charity work',
  'Ask as many questions as you need',
];

// Дефолтные опции цен (на случай если Apphud не загрузится)
const defaultPricingOptions = [
  {
    id: 'weekly',
    title: '7 days Free Trial',
    price: 'then $9.99/per month',
    isBestValue: false,
  },
  {
    id: 'yearly',
    title: '$49.99/year',
    showSavings: true,
    isBestValue: true,
  },
];

const PayWallPage = () => {
  const { theme } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState<string | null>('weekly');
  const dispatch = useAppDispatch();
  const [paywall, setPaywall] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const existingDocId = useAppSelector(selectUserDataDocIdSelector);

  // Загрузка продуктов из Apphud
  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      setIsLoadingProducts(true);
      try {
        const placements = await ApphudSdk.placements();

        // Ищем наш paywall
        const maybePaywall =
          placements.find((p: any) => p.paywall?.identifier === 'paywall_1')
            ?.paywall ||
          placements.find((p: any) => p.identifier === 'paywall_1')?.paywall ||
          null;

        if (cancelled) return;

        if (maybePaywall) {
          setPaywall(maybePaywall);
          setProducts(maybePaywall.products || []);
        } else {
          // Если paywall не найден, используем дефолтные продукты
          setPaywall(null);
          setProducts([]);
        }
      } catch (error) {
        console.error('Failed to load Apphud products:', error);
        if (!cancelled) {
          setPaywall(null);
          setProducts([]);
        }
      } finally {
        if (!cancelled) setIsLoadingProducts(false);
      }
    };

    loadProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  // Формируем опции цен из Apphud продуктов или используем дефолтные
  const pricingOptions = useMemo(() => {
    // Если продукты не загрузились, используем дефолтные
    if (products.length === 0) {
      return defaultPricingOptions;
    }

    const options = [];

    // Ищем weekly продукт (trial)
    const weeklyProduct = products.find(
      (p: any) =>
        p.productId.includes('trial') ||
        p.productId.includes('week') ||
        p.productId.includes('monthly'),
    );

    // Ищем yearly продукт
    const yearlyProduct = products.find(
      (p: any) =>
        p.productId.includes('year') || p.productId.includes('annual'),
    );

    if (weeklyProduct) {
      options.push({
        id: 'weekly',
        title: weeklyProduct.name || '7 days Free Trial',
        price: weeklyProduct.priceString || 'then $9.99/per month',
        isBestValue: false,
        product: weeklyProduct,
      });
    } else {
      options.push(defaultPricingOptions[0]);
    }

    if (yearlyProduct) {
      options.push({
        id: 'yearly',
        title: yearlyProduct.name || '$49.99/year',
        price: yearlyProduct.priceString || '$49.99/year',
        showSavings: true,
        isBestValue: true,
        product: yearlyProduct,
      });
    } else {
      options.push(defaultPricingOptions[1]);
    }

    return options;
  }, [products]);

  // Получаем выбранный продукт
  const selectedProduct = useMemo(() => {
    const option = pricingOptions.find((opt) => opt.id === selectedPlan);
    return option || null;
  }, [selectedPlan, pricingOptions]);

  const purchaseSelected = async () => {
    if (!selectedProduct || !paywall) {
      console.error('Cannot purchase: missing product or paywall');
      dispatch(
        openPopupAction({
          key: 'somethingWrong',
          payload: {
            onCancel: () => {},
            onTryAgain: () => {},
          },
        }),
      );
      return;
    }

    setIsPurchasing(true);
    try {
      const result = await ApphudSdk.purchase({
        productId: selectedProduct.id,
        paywallIdentifier: paywall.identifier,
      });

      if (result.success) {
        await handlePurchaseSuccess();
      } else {
        throw new Error('Purchase failed');
      }
    } catch (error) {
      console.error('Purchase error:', error);
      dispatch(
        openPopupAction({
          key: 'somethingWrong',
          payload: {
            onCancel: () => {},
            onTryAgain: purchaseSelected,
          },
        }),
      );
    } finally {
      setIsPurchasing(false);
    }
  };

  const handlePurchaseSuccess = async () => {
    const now = new Date();
    const paymentMethod = selectedPlan === 'weekly' ? 'weekly' : 'yearly';

    // Обновляем Firebase
    if (existingDocId) {
      try {
        await setDoc(
          doc(db, EDBCollection.USERS, existingDocId),
          {
            paymentMethod,
            isPro: true,
            lastPaymentDate: now.toISOString(),
            subscriptionStatus: 'active',
            updatedAt: now.toISOString(),
          },
          { merge: true },
        );
      } catch (error) {
        console.error('Firebase update error:', error);
      }
    }

    // Обновляем Redux
    dispatch(updateIsProAction(true));
    dispatch(updateLastPaymentDateAction(now));
    dispatch(updateSubscriptionStatusAction('active'));
    dispatch(
      uploadUserDataAction({
        paymentMethod,
      }),
    );

    // Показываем успех и переходим
    dispatch(
      openPopupAction({
        key: 'confirmToast',
        payload: { text: 'Welcome to PRO! 🎉' },
      }),
    );
    dispatch(selectPageAction({ page: 'Today' }));
  };

  const handleNotNow = async () => {
    const now = new Date();

    // Обновляем Firebase
    if (existingDocId) {
      try {
        await setDoc(
          doc(db, EDBCollection.USERS, existingDocId),
          {
            paymentMethod: 'not now',
            isPro: false,
            subscriptionStatus: 'none',
            updatedAt: now.toISOString(),
          },
          { merge: true },
        );
      } catch (error) {
        console.error('Failed to update not now status:', error);
      }
    }

    // Обновляем Redux
    dispatch(updateIsProAction(false));
    dispatch(updateSubscriptionStatusAction('none'));
    dispatch(uploadUserDataAction({ paymentMethod: 'not now' }));

    // Переходим на Today
    dispatch(selectPageAction({ page: 'Today' }));
  };

  const handleRestore = async () => {
    try {
      await ApphudSdk.restorePurchases();
      const hasActiveSubscription = await ApphudSdk.hasActiveSubscription();

      if (hasActiveSubscription) {
        await handlePurchaseSuccess();
        dispatch(
          openPopupAction({
            key: 'confirmToast',
            payload: { text: 'Your PRO subscription has been restored! 🎉' },
          }),
        );
      } else {
        dispatch(
          openPopupAction({
            key: 'confirmToast',
            payload: {
              text: 'No active subscription found. Would you like to purchase PRO?',
            },
          }),
        );
      }
    } catch (error) {
      console.error('Restore error:', error);
      dispatch(
        openPopupAction({
          key: 'somethingWrong',
          payload: {
            onCancel: () => {},
            onTryAgain: handleRestore,
          },
        }),
      );
    }
  };

  const getButtonTitle = () => {
    if (isPurchasing) {
      return 'Processing...';
    }

    if (selectedPlan === 'weekly') {
      return 'Try for Free';
    }

    return 'Pay now';
  };

  return (
    <ThemedView type="background" style={{ flex: 1 }}>
      <ImageBackground
        source={
          theme === 'light'
            ? require('../../../assets/images/onboarding/PayWallBG-light.png')
            : require('../../../assets/images/onboarding/PayWallBG-dark.png')
        }
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <MaxWidthContainerOnboarding>
          <View style={styles.overlay}>
            <View style={styles.containerButtons}>
              <ThemedButton
                style={styles.button}
                title="Not Now"
                variant="small"
                variantText="sfBody15Regular"
                onlyWhiteText
                onPress={handleNotNow}
                disabled={isPurchasing}
              />
              <ThemedButton
                style={styles.button}
                title="Restore"
                variant="small"
                variantText="sfBody15Regular"
                onlyWhiteText
                onPress={handleRestore}
                disabled={isPurchasing}
              />
            </View>
            <View>
              <View style={styles.containerText}>
                <ThemedText align="center" variant="amTitle1_400Semibold">
                  Stay Connected to Your Faith Every Day
                </ThemedText>
                <View>
                  {data.map((item, index) => (
                    <ChecklistItem text={item} key={`religion-${index}`} />
                  ))}
                </View>
              </View>
              <View>
                <PricingRadio
                  options={pricingOptions}
                  selectedId={selectedPlan}
                  onSelect={setSelectedPlan}
                />
                <View style={styles.containerButton}>
                  <ThemedButton
                    title={getButtonTitle()}
                    variant={'primary'}
                    onlyWhiteText
                    onPress={purchaseSelected}
                    disabled={
                      isLoadingProducts || isPurchasing || !selectedProduct
                    }
                    loading={isPurchasing}
                  />
                </View>
              </View>
            </View>
          </View>
        </MaxWidthContainerOnboarding>
      </ImageBackground>
    </ThemedView>
  );
};

export default PayWallPage;
