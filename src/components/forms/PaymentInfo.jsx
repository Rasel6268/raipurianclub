// components/forms/PaymentInfo.jsx
"use client";
import { useState } from "react";
import {
  CreditCard,
  Building,
  Shield,
  Sparkles,
  Check,
  Crown,
  Users,
  Diamond,
  Infinity,
  Award,
  Clock,
  Heart,
} from "lucide-react";

export default function PaymentInfo({
  register,
  errors,
  watch,
  setValue,
  selectedMembership,
  setSelectedMembership,
  MEMBERSHIP_TYPES,
}) {
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [showCardDetails, setShowCardDetails] = useState(true);

  const selectedMembershipData = MEMBERSHIP_TYPES[selectedMembership.toUpperCase()];
  const price = selectedMembershipData?.price || 0;

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "credit_card":
        return <CreditCard className="w-5 h-5" />;
      case "paypal":
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.806.806 0 00-.794.68l-.04.24-.63 3.998-.032.17a.806.806 0 01-.794.68h-2.46a.484.484 0 01-.478-.557l.008-.045.71-4.5a.562.562 0 01.554-.476h.35c2.68 0 4.584-.98 5.18-3.804.2-1.2.008-2.194-.54-2.833-.468-.544-1.202-.815-2.016-.815h-.524c-.24 0-.456.166-.502.4l-.324 2.072c-.076.482-.49.84-.977.84H6.456a.486.486 0 01-.478-.613l1.5-9.452c.07-.44.45-.768.896-.768h5.922c3.208 0 5.76 1.422 5.76 5.06 0 .94-.2 1.788-.588 2.492z" />
          </svg>
        );
      case "bank_transfer":
        return <Building className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  const formatPrice = (price) => {
    if (price === 0) return "Free";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-linear-to-r from-amber-100 to-orange-100 px-4 py-2 rounded-full mb-3">
          <Infinity className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-semibold text-amber-700">LIFETIME MEMBERSHIP</span>
        </div>
        <h2 className="text-2xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Choose Your Lifetime Plan
        </h2>
        <p className="text-gray-600 mt-2">
          One-time payment • Lifetime access • Never expires
        </p>
      </div>

      {/* Lifetime Membership Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {Object.values(MEMBERSHIP_TYPES).map((plan) => {
          const Icon = plan.icon;
          const isSelected = selectedMembership === plan.id;
          
          return (
            <div
              key={plan.id}
              onClick={() => {
                setSelectedMembership(plan.id);
                setValue("membership.type", plan.id);
              }}
              className={`relative cursor-pointer rounded-xl transition-all duration-300 ${
                isSelected
                  ? "ring-2 ring-emerald-500 shadow-lg transform scale-102"
                  : "hover:shadow-lg hover:scale-102 border-2 border-transparent"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-linear-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className={`bg-linear-to-br ${plan.color} p-5 rounded-xl text-white relative overflow-hidden`}>
                {/* Lifetime badge */}
                <div className="absolute top-2 right-2">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-1">
                    <Infinity className="w-3 h-3" />
                  </div>
                </div>
                
                <Icon className="w-10 h-10 mb-3 opacity-90" />
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-xs opacity-90 mb-3">{plan.description}</p>
                <div className="mb-3">
                  {plan.price === 0 ? (
                    <span className="text-2xl font-bold">Free</span>
                  ) : (
                    <>
                      <span className="text-3xl font-bold">
                        {formatPrice(plan.price)}
                      </span>
                      <span className="text-sm opacity-90 ml-1">one-time</span>
                      <div className="text-xs opacity-80 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Lifetime access
                      </div>
                    </>
                  )}
                </div>
                <ul className="space-y-2 text-sm">
                  {plan.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3 h-3 flex-shrink-0" />
                      <span className="text-xs">{feature}</span>
                    </li>
                  ))}
                  {plan.features.length > 4 && (
                    <li className="text-xs opacity-80">
                      +{plan.features.length - 4} more features
                    </li>
                  )}
                </ul>
              </div>
              
              {isSelected && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="bg-emerald-500 rounded-full p-1 shadow-lg">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Payment Methods - Only show for paid plans */}
      {selectedMembershipData?.price > 0 && (
        <div className="border-t pt-6">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Payment Method
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {["credit_card", "paypal", "bank_transfer"].map((method) => (
              <label
                key={method}
                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                  paymentMethod === method
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                    setValue("membership.paymentMethod", e.target.value);
                    setShowCardDetails(method === "credit_card");
                  }}
                  className="text-emerald-600"
                />
                {getPaymentMethodIcon(method)}
                <span className="text-sm capitalize">
                  {method.replace("_", " ")}
                </span>
              </label>
            ))}
          </div>

          {/* Credit Card Details */}
          {paymentMethod === "credit_card" && showCardDetails && (
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  {...register("membership.cardDetails.cardNumber")}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    {...register("membership.cardDetails.expiryDate")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="password"
                    placeholder="123"
                    maxLength="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    {...register("membership.cardDetails.cvv")}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="Name on card"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  {...register("membership.cardDetails.cardholderName")}
                />
              </div>
            </div>
          )}

          {/* PayPal Info */}
          {paymentMethod === "paypal" && (
            <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.806.806 0 00-.794.68l-.04.24-.63 3.998-.032.17a.806.806 0 01-.794.68h-2.46a.484.484 0 01-.478-.557l.008-.045.71-4.5a.562.562 0 01.554-.476h.35c2.68 0 4.584-.98 5.18-3.804.2-1.2.008-2.194-.54-2.833-.468-.544-1.202-.815-2.016-.815h-.524c-.24 0-.456.166-.502.4l-.324 2.072c-.076.482-.49.84-.977.84H6.456a.486.486 0 01-.478-.613l1.5-9.452c.07-.44.45-.768.896-.768h5.922c3.208 0 5.76 1.422 5.76 5.06 0 .94-.2 1.788-.588 2.492z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-700">
                  You will be redirected to PayPal to complete your <strong>lifetime membership</strong> payment
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Secure payment processing by PayPal
                </p>
              </div>
            </div>
          )}

          {/* Bank Transfer Info */}
          {paymentMethod === "bank_transfer" && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="text-sm font-medium text-gray-700">
                Bank Transfer Details for Lifetime Membership:
              </p>
              <div className="text-xs text-gray-600 space-y-1">
                <p>Bank: Community Bank</p>
                <p>Account Name: Community Hub</p>
                <p>Account Number: 1234567890</p>
                <p>Routing Number: 987654321</p>
                <p className="text-amber-600 mt-2">
                  ⚠️ Please use your email as reference when making the transfer
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Terms and Conditions */}
      <div className="border-t pt-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("membership.agreeToTerms")}
            className="mt-1 text-emerald-600 focus:ring-emerald-500"
          />
          <div className="text-sm text-gray-700">
            I agree to the{" "}
            <button type="button" className="text-emerald-600 hover:underline">
              Terms of Service
            </button>{" "}
            and{" "}
            <button type="button" className="text-emerald-600 hover:underline">
              Privacy Policy
            </button>
            . I understand that this is a <strong className="text-amber-600">lifetime membership</strong> with a one-time payment.
          </div>
        </label>
        {errors.membership?.agreeToTerms && (
          <p className="text-red-500 text-xs mt-1">{errors.membership.agreeToTerms.message}</p>
        )}
      </div>

      {/* Summary */}
      {selectedMembershipData?.price > 0 && (
        <div className="bg-linear-to-r from-emerald-50 to-teal-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Infinity className="w-4 h-4 text-emerald-600" />
                <p className="text-sm font-semibold text-emerald-700">LIFETIME MEMBERSHIP</p>
              </div>
              <p className="text-2xl font-bold text-emerald-600">
                {formatPrice(price)}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                One-time payment • Never expires
              </p>
            </div>
            <div className="text-right">
              <div className="bg-emerald-600/10 rounded-lg p-2">
                <Heart className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-emerald-200">
            <p className="text-xs text-gray-600 flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Secure payment guaranteed • 30-day money-back guarantee
            </p>
          </div>
        </div>
      )}

      {/* Free Membership Note */}
      {selectedMembershipData?.price === 0 && (
        <div className="bg-linear-to-r from-green-50 to-emerald-50 p-4 rounded-lg text-center border border-green-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-green-600" />
            <p className="text-green-700 font-semibold">
              You've selected the Free Basic plan!
            </p>
          </div>
          <p className="text-sm text-green-600">
            No payment required. You can upgrade to a lifetime premium plan anytime.
          </p>
        </div>
      )}

      {/* Lifetime Guarantee Badge */}
      {selectedMembershipData?.price > 0 && (
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs">
            <Award className="w-3 h-3" />
            Lifetime access guarantee
            <Infinity className="w-3 h-3" />
          </div>
        </div>
      )}
    </div>
  );
}