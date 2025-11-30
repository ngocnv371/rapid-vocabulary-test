import { FC, useState, useEffect } from "react";
import { Box, Header, Page, Text, Icon } from "zmp-ui";
import { useTranslation } from "react-i18next";
import NavBar from "../components/NavBar";
import { useAppContext } from "../contexts/AppContext";
import { fetchOrders } from "../services/credits";
import Spinner from "../components/Spinner";
import type { Order } from "../types";
import { useNavigate } from "react-router-dom";

interface OrderWithProduct extends Order {
  products?: {
    name: string;
    credits: number;
    bonus_credits: number;
  };
}

const MyOrdersPage: FC = () => {
  const { t } = useTranslation();
  const { profile } = useAppContext();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderWithProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      if (!profile?.id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const fetchedOrders = await fetchOrders(profile.id);
      setOrders(fetchedOrders);
      setLoading(false);
    };

    loadOrders();
  }, [profile?.id]);

  const formatPrice = (price: number, currency: string): string => {
    if (currency === 'VND') {
      return `${price.toLocaleString('vi-VN')}đ`;
    }
    return `${price} ${currency}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(t("locale"), {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "completed":
        return "text-green-400";
      case "pending":
        return "text-yellow-400";
      case "failed":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "zi-check-circle" as const;
      case "pending":
        return "zi-clock-1" as const;
      case "failed":
        return "zi-close-circle" as const;
      default:
        return "zi-help-circle" as const;
    }
  };

  return (
    <Page
      hideScrollbar
      className="relative w-full max-w-2xl mx-auto bg-gray-900"
    >
      <Header
        title={t("orders.title")}
        showBackIcon={true}
        onBackClick={() => navigate("/shop")}
      />

      <Box className="p-4 pb-20 min-h-screen">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12">
            <Spinner />
            <Text className="text-xl text-purple-300">{t("common.loading")}</Text>
          </div>
        ) : orders.length === 0 ? (
          <Box className="flex flex-col items-center justify-center gap-4 py-12">
            <Icon icon="zi-list-1" className="text-6xl text-gray-600" />
            <Text className="text-xl text-gray-400 text-center">
              {t("orders.noOrders")}
            </Text>
            <Text className="text-sm text-gray-500 text-center px-4">
              {t("orders.noOrdersDesc")}
            </Text>
          </Box>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Box
                key={order.id}
                className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl p-5 shadow-xl border-2 border-purple-500/20 hover:border-purple-500/50 transition-all"
              >
                {/* Order Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <Text className="text-lg font-bold text-white mb-1">
                      {order.products?.name || order.product_id}
                    </Text>
                    <Text className="text-xs text-gray-400">
                      {t("orders.orderId")}: #{order.id}
                    </Text>
                  </div>
                  <div className={`flex items-center gap-1 ${getStatusColor(order.payment_status)}`}>
                    <Icon icon={getStatusIcon(order.payment_status)} className="text-xl" />
                    <Text className="text-sm font-semibold capitalize">
                      {t(`orders.status.${order.payment_status}`)}
                    </Text>
                  </div>
                </div>

                {/* Credits Info */}
                <Box className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-3 mb-3 border border-purple-500/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span role="img" aria-label="credit emoji" className="text-xl">
                        💖
                      </span>
                      <Text className="text-lg font-bold text-purple-400">
                        {order.credits} {t("shop.credits")}
                      </Text>
                    </div>
                    {order.products && order.products.bonus_credits > 0 && (
                      <Text className="text-sm text-green-400 font-semibold">
                        + {order.products.bonus_credits} {t("shop.bonus")}
                      </Text>
                    )}
                  </div>
                </Box>

                {/* Order Details */}
                <div className="space-y-2 pt-2 border-t border-gray-700">
                  <div className="flex justify-between items-center">
                    <Text className="text-sm text-gray-400">{t("orders.amount")}</Text>
                    <Text className="text-base font-semibold text-white">
                      {formatPrice(order.amount, order.currency)}
                    </Text>
                  </div>
                  <div className="flex justify-between items-center">
                    <Text className="text-sm text-gray-400">{t("orders.date")}</Text>
                    <Text className="text-sm text-gray-300">
                      {formatDate(order.created_at)}
                    </Text>
                  </div>
                  {order.reference && (
                    <div className="flex justify-between items-center">
                      <Text className="text-sm text-gray-400">{t("orders.reference")}</Text>
                      <Text className="text-xs text-gray-500 font-mono">
                        {order.reference}
                      </Text>
                    </div>
                  )}
                  {order.checkout_url && order.payment_status === "pending" && (
                    <div className="pt-2">
                      <a
                        href={order.checkout_url}
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-all shadow-lg hover:shadow-purple-500/50"
                      >
                        {t("orders.payNow")}
                      </a>
                    </div>
                  )}
                </div>
              </Box>
            ))}
          </div>
        )}
      </Box>

      <NavBar activeKey="shop" />
    </Page>
  );
};

export default MyOrdersPage;
