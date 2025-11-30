import { FC } from "react";
import { Box, Button, Icon, Text } from "zmp-ui";
import { useTranslation } from "react-i18next";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  index: number;
  isPurchasing: boolean;
  onPurchase: (product: Product) => void;
  disabled: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  product,
  index,
  isPurchasing,
  onPurchase,
}) => {
  const { t } = useTranslation();

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

  const isPopular = index === 1;

  return (
    <Box
      className={`relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl p-5 shadow-xl border-2 transition-all hover:scale-[1.02] backdrop-blur-sm ${
        isPopular
          ? "border-purple-500 shadow-purple-500/30 animate-glow-pulse"
          : "border-purple-500/20 hover:border-purple-500/50"
      }`}
    >
      {/* Popular Badge */}
      {isPopular && (
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
          <span role="img" aria-label="credit emoji" className="text-2xl">
            💖
          </span>
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
          isPopular
            ? "bg-gradient-to-r from-purple-500 to-pink-500"
            : "bg-gradient-to-r from-purple-600 to-purple-700"
        }`}
        loading={isPurchasing}
        onClick={() => onPurchase(product)}
      >
        {t("shop.buyNow")}
      </Button>
    </Box>
  );
};

export default ProductCard;
