// app/success-order/page.jsx

"use client";

import api from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import {
  Award,
  Banknote,
  CheckCircle,
  Clock,
  CreditCard,
  ReceiptIcon,
  Smartphone,
  User,
  Download,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function SuccessOrderContent() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tran_id");
  console.log(tranId);

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["paymentData", tranId],
    queryFn: async () => {
      const res = await api.get(`/payment/${tranId}`);
      return res.data;
    },
    enabled: !!tranId,
  });

  const payment = response?.payment;
  const paymentData = payment?.paymentData;
  console.log(paymentData)

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      dateStyle: "long",
      timeStyle: "medium",
    });
  };

  const formatCurrency = (amount, currency = "BDT") => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const dataStr = JSON.stringify({ payment, paymentData }, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `payment_receipt_${tranId}.json`;
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-emerald-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (isError || !payment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 to-rose-100">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Unable to Verify Payment
          </h2>
          <p className="text-gray-600 mb-4">
            We couldn't find your payment information. Please contact support if
            you believe this is an error.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const isSuccess = payment?.status === "success";
  const cardBrand = paymentData?.card_brand || paymentData?.card_type || "N/A";
  const bankName =
    paymentData?.card_issuer ||
    paymentData?.bank_tran_id?.split("_")[0] ||
    "N/A";

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mt-2">
            Your membership has been activated successfully
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Membership Banner */}
          <div className="bg-linear-to-r from-amber-500 via-orange-500 to-red-500 px-6 py-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-white" />
                <div>
                  <p className="text-amber-100 text-sm">Your Membership</p>
                  <p className="text-white font-bold text-xl">
                    {payment?.membershipName || "Premium Member"}
                  </p>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-white font-semibold">
                  {payment?.membershipType || "Lifetime"}
                </span>
              </div>
            </div>
          </div>

          {/* Transaction Summary */}
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <ReceiptIcon className="w-5 h-5 text-green-600" />
              Transaction Summary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500 text-sm">Transaction ID</p>
                <p className="font-mono text-sm font-medium text-gray-800 break-all">
                  {payment?.tranId || tranId}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500 text-sm">Amount Paid</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(payment?.amount, payment?.currency)}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500 text-sm">Payment Method</p>
                <p className="font-medium text-gray-800 flex items-center gap-2">
                  {paymentData?.card_type?.toLowerCase().includes("bkash") ? (
                    <Smartphone className="w-4 h-4 text-pink-500" />
                  ) : (
                    <CreditCard className="w-4 h-4 text-blue-500" />
                  )}
                  {payment?.paymentMethod === "sslcommerz"
                    ? "SSLCommerz"
                    : payment?.paymentMethod}
                  {cardBrand !== "N/A" && ` - ${cardBrand}`}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500 text-sm">Payment Time</p>
                <p className="font-medium text-gray-800 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {formatDate(payment?.paidAt || payment?.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Payment Information */}
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Banknote className="w-5 h-5 text-green-600" />
              Payment Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <DetailRow
                label="Bank Transaction ID"
                value={paymentData?.bank_tran_id}
              />
              <DetailRow label="Validation ID" value={paymentData?.val_id} />
              <DetailRow label="Card Issuer" value={bankName} />
              <DetailRow label="Card Brand" value={cardBrand} />
              <DetailRow
                label="Risk Level"
                value={paymentData?.risk_title || paymentData?.risk_level}
              />
              <DetailRow
                label="Currency Type"
                value={paymentData?.currency_type || payment?.currency}
              />
              <DetailRow
                label="Store Amount"
                value={
                  paymentData?.store_amount
                    ? formatCurrency(paymentData.store_amount)
                    : "N/A"
                }
              />
              <DetailRow
                label="Discount"
                value={
                  paymentData?.discount_amount
                    ? formatCurrency(paymentData.discount_amount)
                    : "None"
                }
              />
            </div>
          </div>

          {/* User Information */}
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-green-600" />
              User Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DetailRow label="User ID" value={payment?.userId} />
              <DetailRow
                label="Payment Created"
                value={formatDate(payment?.createdAt)}
              />
              <DetailRow
                label="Last Updated"
                value={formatDate(payment?.updatedAt)}
              />
              <DetailRow
                label="Payment Status"
                value={
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {payment?.status || "Success"}
                  </span>
                }
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 bg-gray-50 flex flex-wrap gap-4 justify-between items-center">
            <div className="flex gap-3">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                <Printer className="w-4 h-4" />
                Print Receipt
              </button>
              <button
                onClick={handleDownloadJSON}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                <Download className="w-4 h-4" />
                Download JSON
              </button>
            </div>
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="inline-flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>
            A confirmation email has been sent to your registered email address.
          </p>
          <p className="mt-1">
            For any assistance, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper Components
const DetailRow = ({ label, value }) => (
  <div className="flex justify-between py-1 border-b border-gray-100">
    <span className="text-gray-500">{label}:</span>
    <span className="font-medium text-gray-800 break-all text-right ml-4">
      {value || "N/A"}
    </span>
  </div>
);

// Icons that might be missing from lucide-react
const Receipt = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    />
  </svg>
);

const Printer = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
    />
  </svg>
);

const ArrowRight = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </svg>
);
