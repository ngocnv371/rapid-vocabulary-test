import { FC, useState, useEffect } from "react";
import { Box, Button, Header, Page, Text, useSnackbar, Icon } from "zmp-ui";
import { useTranslation } from "react-i18next";
import NavBar from "../components/NavBar";
import { useCreditsContext } from "../contexts/CreditsContext";
import { purchaseProduct, fetchProducts } from "../services/credits";
import { useAppContext } from "../contexts/AppContext";
import Spinner from "../components/Spinner";
import type { Product } from "../types";
import { useNavigate } from "react-router-dom";

const ShopPage: FC = () => {
  const { t } = useTranslation();
  const { profile, user } = useAppContext();
  const isAnonymous = user?.is_anonymous ?? true;
  const navigate = useNavigate();
  const { credits, refreshCredits } = useCreditsContext();
  const { openSnackbar } = useSnackbar();
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from database
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const dbProducts = await fetchProducts();
      setProducts(dbProducts);
      setLoading(false);
    };

    loadProducts();
  }, []);

  const getProductName = (productId: string): string => {
    // Try to get translation, fallback to database name
    const translationKey = `shop.products.${productId}`;
    const translatedName = t(translationKey);
    // If translation key doesn't exist, t() returns the key itself
    return translatedName !== translationKey ? translatedName : productId;
  };

  const formatPrice = (price: number, currency: string): string => {
    if (currency === 'VND') {
      return `${price.toLocaleString('vi-VN')}đ`;
    }
    return `${price} ${currency}`;
  };

  const handlePurchase = async (product: Product) => {
    if (!profile?.id) {
      openSnackbar({
        type: "error",
        text: t("shop.errors.notLoggedIn"),
      });
      return;
    }
    if (isAnonymous) {
      navigate("/login");
      return;
    }

    setPurchasing(product.id);

    try {
      // Here you would integrate with Zalo Pay or your payment provider
      // For now, we'll simulate a successful purchase
      const totalCredits = product.credits + product.bonus_credits;
      
      const result = await purchaseProduct(product.id);

      if (result) {
        console.log('result', result);
        await refreshCredits();
        openSnackbar({
          type: "success",
          text: t("shop.success", { credits: totalCredits }),
        });
      } else {
        throw new Error("Purchase failed");
      }
    } catch (error) {
      console.error("Purchase error:", error);
      openSnackbar({
        type: "error",
        text: t("shop.errors.purchaseFailed"),
      });
    } finally {
      setPurchasing(null);
    }
  };

  return (
    <Page
      hideScrollbar
      className="relative min-h-screen w-full max-w-2xl mx-auto bg-gray-900">
      <Header
        title={t("shop.title")}
        showBackIcon={false}
      />
      
      <Box className="p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12">
            <Spinner />
            <Text className="text-xl text-purple-300">{t("common.loading")}</Text>
          </div>
        ) : (
          <>
            {/* Current Credits Display */}
            <Box className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 mb-6 text-white shadow-xl border-2 border-purple-500/50">
              <div className="flex items-center justify-between">
                <div>
                  <Text className="text-sm text-gray-300">{t("shop.currentCredits")}</Text>
                  <Text className="text-4xl font-bold mt-1 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    {credits !== null ? credits : "..."}
                  </Text>
                </div>
                <Icon icon="zi-star" className="text-6xl text-purple-500/20" />
              </div>
            </Box>

            {/* Shop Description */}
            <Box className="mb-6">
              <Text className="text-lg font-semibold text-gray-200 mb-2">
                {t("shop.description.title")}
              </Text>
              <Text className="text-sm text-gray-400">
                {t("shop.description.subtitle")}
              </Text>
            </Box>

            {/* Products Grid */}
            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
              {products.map((product, index) => (
                <Box
                  key={product.id}
                  className={`relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl p-5 shadow-xl border-2 transition-all hover:scale-[1.02] backdrop-blur-sm ${
                    index === 1
                      ? "border-purple-500 shadow-purple-500/30 animate-glow-pulse"
                      : "border-purple-500/20 hover:border-purple-500/50"
                  }`}
                >
                  {/* Popular Badge */}
                  {index === 1 && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                      {t("shop.popular")}
                    </div>
                  )}

                  {/* Product Name */}
                  <Text className="text-xl font-bold text-white mb-3 text-center">
                    {getProductName(product.id)}
                  </Text>

                  {/* Credits Display */}
                  <Box className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4 mb-3 border border-purple-500/30">
                    <div className="flex items-center justify-center gap-2">
                      <Icon icon="zi-star" className="text-2xl text-purple-400" />
                      <Text className="text-3xl font-bold text-purple-400">
                        {product.credits}
                      </Text>
                      <Text className="text-sm text-gray-300">{t("shop.credits")}</Text>
                    </div>
                    {product.bonus_credits > 0 && (
                      <Text className="text-center text-sm text-green-400 font-semibold mt-2">
                        + {product.bonus_credits} {t("shop.bonus")}
                      </Text>
                    )}
                  </Box>

                  {/* Price */}
                  <Text className="text-center text-2xl font-bold text-white mb-4">
                    {formatPrice(product.price, product.currency)}
                  </Text>

                  {/* Purchase Button */}
                  <Button
                    fullWidth
                    variant="primary"
                    className={`font-semibold ${
                      index === 1
                        ? "bg-gradient-to-r from-purple-500 to-pink-500"
                        : "bg-gradient-to-r from-purple-600 to-purple-700"
                    }`}
                    loading={purchasing === product.id}
                    disabled={purchasing !== null}
                    onClick={() => handlePurchase(product)}
                  >
                    {t("shop.buyNow")}
                  </Button>
                </Box>
              ))}
            </Box>

            {/* Info Section */}
            <Box className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 mb-6 border border-purple-500/30">
              <div className="flex gap-3">
                <Icon icon="zi-info-circle" className="text-purple-400 text-xl flex-shrink-0 mt-1" />
                <div>
                  <Text className="text-sm text-purple-200 font-semibold mb-1">
                    {t("shop.info.title")}
                  </Text>
                  <Text className="text-xs text-gray-400">
                    {t("shop.info.description")}
                  </Text>
                </div>
              </div>
            </Box>
          </>
        )}
      </Box>

      <NavBar activeKey="shop" />
    </Page>
  );
};

export default ShopPage;
