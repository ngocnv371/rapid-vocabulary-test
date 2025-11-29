import { FC, useState, useEffect } from "react";
import { Box, Header, Page, Text, useSnackbar, Icon } from "zmp-ui";
import { useTranslation } from "react-i18next";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
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

  const handlePurchase = async (product: Product) => {
    if (purchasing) return;
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
      const result = await purchaseProduct(product.id);
      if (result) {
        window.location.href = result.checkoutUrl;
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
      className="relative min-h-screen w-full max-w-2xl mx-auto bg-gray-900"
    >
      <Header title={t("shop.title")} showBackIcon={false} />
      <div className="min-h-screen">
        {/* My Orders Link */}
        <Box className="px-4 pt-3 pb-2">
          <button
            onClick={() => navigate("/my-orders")}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <Icon icon="zi-list-1" />
            <Text className="text-sm font-semibold">{t("shop.myOrders")}</Text>
          </button>
        </Box>

        <Box className="p-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-4 py-12">
              <Spinner />
              <Text className="text-xl text-purple-300">
                {t("common.loading")}
              </Text>
            </div>
          ) : (
            <>
              {/* Current Credits Display */}
              <Box className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 mb-6 text-white shadow-xl border-2 border-purple-500/50">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-sm text-gray-300">
                      {t("shop.currentCredits")}
                    </Text>
                    <Text className="text-4xl font-bold mt-1 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                      {credits !== null ? credits : "..."}
                    </Text>
                  </div>
                  <Icon
                    icon="zi-star"
                    className="text-6xl text-purple-500/20"
                  />
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
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    isPurchasing={purchasing === product.id}
                    onPurchase={handlePurchase}
                    disabled={purchasing !== null}
                  />
                ))}
              </Box>

              {/* Info Section */}
              <Box className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 mb-6 border border-purple-500/30">
                <div className="flex gap-3">
                  <Icon
                    icon="zi-info-circle"
                    className="text-purple-400 text-xl flex-shrink-0 mt-1"
                  />
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
      </div>

      <NavBar activeKey="shop" />
    </Page>
  );
};

export default ShopPage;
