import { FC } from "react";
import { Box, Header, Page, Text, Icon } from "zmp-ui";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import NavBar from "../components/NavBar";

const PaymentCancelPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get any error or cancel reason from URL parameters
  const reason = searchParams.get("reason");
  const orderId = searchParams.get("orderId");

  const handleRetry = () => {
    navigate("/my-orders");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Page
      hideScrollbar
      className="relative w-full max-w-2xl mx-auto bg-gray-900"
    >
      <Header title={t("payment.cancel.title", "Payment Cancelled")} showBackIcon={false} />
      <Box className="flex flex-col items-center justify-center p-6 min-h-screen">
        <Box className="text-center max-w-md w-full">
          {/* Cancel Icon */}
          <Box className="mb-6 flex justify-center">
            <Box className="w-24 h-24 rounded-full bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center shadow-2xl shadow-red-500/50">
              <Icon
                icon="zi-close-circle-solid"
                className="text-white"
                size={56}
              />
            </Box>
          </Box>

          {/* Cancel Message */}
          <Text.Title className="mb-3 text-3xl font-bold text-white">
            {t("payment.cancel.heading", "Payment Cancelled")}
          </Text.Title>
          
          <Text className="mb-8 text-purple-200 text-lg">
            {t(
              "payment.cancel.message",
              "Your payment was cancelled. No charges were made to your account."
            )}
          </Text>

          {/* Reason or Order ID if available */}
          {(reason || orderId) && (
            <Box className="mb-8 p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-2 border-red-500/50 shadow-xl">
              {orderId && (
                <>
                  <Text className="text-sm text-purple-300 mb-2">
                    {t("payment.cancel.orderId", "Order ID")}
                  </Text>
                  <Text className="font-semibold text-white text-lg mb-4">
                    {orderId}
                  </Text>
                </>
              )}
              
              {reason && (
                <>
                  <Text className="text-sm text-purple-300 mb-2">
                    {t("payment.cancel.reason", "Reason")}
                  </Text>
                  <Text className="font-semibold text-white text-lg">{reason}</Text>
                </>
              )}
            </Box>
          )}

          {/* Action Buttons */}
          <Box className="space-y-4">
            <button
              onClick={handleRetry}
              className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-500 py-4 px-8 group hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-pink-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              <span className="relative text-xl font-bold text-white drop-shadow-lg">
                {t("payment.cancel.retry", "Try Again")}
              </span>
            </button>
            
            <button
              onClick={handleGoHome}
              className="w-full rounded-2xl bg-white/10 backdrop-blur-md py-4 px-8 border border-white/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 hover:bg-white/20"
            >
              <span className="text-lg font-bold text-white drop-shadow-md">
                {t("payment.cancel.goHome", "Go to Home")}
              </span>
            </button>
          </Box>

          {/* Help Text */}
          <Box className="mt-8 p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/30">
            <div className="flex gap-3 items-center justify-center">
              <Icon
                icon="zi-info-circle"
                className="text-purple-400 text-xl"
              />
              <Text className="text-sm text-purple-200">
                {t(
                  "payment.cancel.help",
                  "Need help? Please contact our support team."
                )}
              </Text>
            </div>
          </Box>
        </Box>
      </Box>
      <NavBar activeKey="shop" />
    </Page>
  );
};

export default PaymentCancelPage;
