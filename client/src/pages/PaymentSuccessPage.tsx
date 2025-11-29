import { FC, useEffect } from "react";
import { Box, Header, Page, Text, Icon } from "zmp-ui";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCreditsContext } from "../contexts/CreditsContext";
import NavBar from "../components/NavBar";

const PaymentSuccessPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { refreshCredits } = useCreditsContext();

  // Get payment details from URL parameters
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");

  useEffect(() => {
    // Refresh credits after successful payment
    refreshCredits();
  }, [refreshCredits]);

  const handleContinue = () => {
    navigate("/");
  };

  const handleViewOrders = () => {
    navigate("/my-orders");
  };

  return (
    <Page
      hideScrollbar
      className="relative w-full max-w-2xl mx-auto bg-gray-900"
    >
      <Header title={t("payment.success.title", "Payment Successful")} showBackIcon={false} />
      <Box className="flex flex-col items-center justify-center p-6 min-h-screen">
        <Box className="text-center max-w-md w-full">
          {/* Success Icon */}
          <Box className="mb-6 flex justify-center animate-bounce">
            <Box className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-2xl shadow-green-500/50">
              <Icon
                icon="zi-check-circle-solid"
                className="text-white"
                size={56}
              />
            </Box>
          </Box>

          {/* Success Message */}
          <Text.Title className="mb-3 text-3xl font-bold text-white">
            {t("payment.success.heading", "Payment Successful!")}
          </Text.Title>
          
          <Text className="mb-8 text-purple-200 text-lg">
            {t(
              "payment.success.message",
              "Your payment has been processed successfully. Your credits have been added to your account."
            )}
          </Text>

          {/* Order Details */}
          {orderId && (
            <Box className="mb-8 p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-2 border-purple-500/50 shadow-xl">
              <Text className="text-sm text-purple-300 mb-2">
                {t("payment.success.orderId", "Order ID")}
              </Text>
              <Text className="font-semibold text-white text-lg mb-4">{orderId}</Text>
              
              {amount && (
                <>
                  <Text className="text-sm text-purple-300 mb-2">
                    {t("payment.success.amount", "Amount")}
                  </Text>
                  <Text className="font-bold text-2xl bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    {amount} VND
                  </Text>
                </>
              )}
            </Box>
          )}

          {/* Action Buttons */}
          <Box className="space-y-4">
            <button
              onClick={handleContinue}
              className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-500 py-4 px-8 group hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-pink-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              <span className="relative text-xl font-bold text-white drop-shadow-lg">
                {t("payment.success.continue", "Continue Learning")}
              </span>
            </button>
            
            <button
              onClick={handleViewOrders}
              className="w-full rounded-2xl bg-white/10 backdrop-blur-md py-4 px-8 border border-white/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 hover:bg-white/20"
            >
              <span className="text-lg font-bold text-white drop-shadow-md">
                {t("payment.success.viewOrders", "View My Orders")}
              </span>
            </button>
          </Box>
        </Box>
      </Box>
      <NavBar activeKey="shop" />
    </Page>
  );
};

export default PaymentSuccessPage;
