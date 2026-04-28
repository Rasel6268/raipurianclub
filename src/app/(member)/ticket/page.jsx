'use client'
import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  CreditCard, 
  Ticket, 
  Crown, 
  Sparkles,
  CheckCircle,
  ArrowLeft,
  ChevronRight,
  X,
  Info,
  Wallet,
  Tag,
  AlertCircle
} from 'lucide-react';

const TicketPage = () => {
  // Demo event data (matching your reference design)
  const eventData = {
    id: 1,
    title: "Raipur Tech Summit 2026",
    description: "Join the biggest tech gathering in Central India featuring workshops from industry leaders, hackathon, and networking sessions.",
    date: "June 15-17, 2026",
    time: "9:00 AM - 6:00 PM",
    location: "Raipur Convention Center, Raipur",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    category: "Technology",
    attendees: 450,
    organizer: "Raipur Tech Community"
  };

  // Ticket types
  const ticketTypes = [
    {
      id: 'early',
      name: 'Early Bird',
      price: 499,
      originalPrice: 1299,
      benefits: ['Full event access', 'Lunch included', 'Networking pass', 'Event kit'],
      color: 'emerald',
      icon: Tag,
      available: 50
    },
    {
      id: 'regular',
      name: 'Regular Pass',
      price: 899,
      originalPrice: 1299,
      benefits: ['Full event access', 'Lunch included', 'Networking pass'],
      color: 'blue',
      icon: Ticket,
      available: 200
    },
    {
      id: 'vip',
      name: 'VIP Pass',
      price: 2499,
      originalPrice: 3999,
      benefits: ['Priority seating', 'Exclusive lounge', 'Meet & greet', 'VIP goodie bag', 'Certificate'],
      color: 'purple',
      icon: Crown,
      available: 30
    }
  ];

  // State management
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState(1); // 1: ticket selection, 2: personal details, 3: payment, 4: confirmation
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    specialRequests: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingReference, setBookingReference] = useState('');

  // Get selected ticket details
  const getSelectedTicketDetails = () => {
    return ticketTypes.find(t => t.id === selectedTicket);
  };

  // Calculate total amount
  const calculateTotal = () => {
    if (!selectedTicket) return 0;
    const ticket = getSelectedTicketDetails();
    return ticket.price * quantity;
  };

  // Handle ticket selection
  const handleTicketSelect = (ticketId) => {
    setSelectedTicket(ticketId);
    setQuantity(1);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle next step
  const nextStep = () => {
    if (step === 1 && !selectedTicket) {
      alert('Please select a ticket type');
      return;
    }
    if (step === 2) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        alert('Please fill in all required fields');
        return;
      }
      if (!formData.email.includes('@')) {
        alert('Please enter a valid email address');
        return;
      }
    }
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle previous step
  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle payment processing
  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      const ref = 'TKT-' + Math.random().toString(36).substr(2, 8).toUpperCase();
      setBookingReference(ref);
      setStep(4);
    }, 2000);
  };

  // Reset booking
  const resetBooking = () => {
    setSelectedTicket(null);
    setQuantity(1);
    setStep(1);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      specialRequests: ''
    });
    setPaymentMethod('card');
    setBookingReference('');
  };

  // Step 1: Ticket Selection
  const renderTicketSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Choose Your Ticket</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Select the pass that suits you best</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {ticketTypes.map((ticket) => {
          const Icon = ticket.icon;
          const isSelected = selectedTicket === ticket.id;
          const discountPercent = Math.round(((ticket.originalPrice - ticket.price) / ticket.originalPrice) * 100);
          
          return (
            <div
              key={ticket.id}
              onClick={() => handleTicketSelect(ticket.id)}
              className={`relative cursor-pointer rounded-2xl transition-all duration-300 transform hover:-translate-y-1 ${
                isSelected
                  ? `ring-2 ring-${ticket.color}-500 shadow-xl scale-[1.02]`
                  : 'hover:shadow-lg border border-gray-200 dark:border-gray-700'
              } bg-white dark:bg-gray-800 overflow-hidden`}
            >
              {discountPercent > 0 && (
                <div className={`absolute top-3 right-3 bg-${ticket.color}-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10`}>
                  -{discountPercent}%
                </div>
              )}
              
              <div className={`p-5 text-center border-b-2 ${
                isSelected ? `border-${ticket.color}-500` : 'border-gray-100 dark:border-gray-700'
              }`}>
                <div className={`w-14 h-14 mx-auto rounded-full bg-${ticket.color}-100 dark:bg-${ticket.color}-900/30 flex items-center justify-center mb-3`}>
                  <Icon className={`w-7 h-7 text-${ticket.color}-600 dark:text-${ticket.color}-400`} />
                </div>
                <h4 className="text-xl font-bold text-gray-800 dark:text-white">{ticket.name}</h4>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">₹{ticket.price}</span>
                  {ticket.originalPrice > ticket.price && (
                    <span className="text-sm text-gray-400 line-through ml-2">₹{ticket.originalPrice}</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">per person</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">{ticket.available} tickets left</p>
              </div>
              
              <div className="p-4 space-y-2">
                {ticket.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle className={`w-4 h-4 text-${ticket.color}-500 flex-shrink-0`} />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              
              {isSelected && (
                <div className={`absolute -bottom-1 left-0 right-0 h-1 bg-${ticket.color}-500`}></div>
              )}
            </div>
          );
        })}
      </div>

      {selectedTicket && (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 mt-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-gray-600 dark:text-gray-400">Quantity:</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 transition"
                >
                  -
                </button>
                <span className="text-lg font-semibold text-gray-800 dark:text-white w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 transition"
                >
                  +
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{calculateTotal()}</p>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={nextStep}
        disabled={!selectedTicket}
        className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
          selectedTicket
            ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white hover:from-emerald-700 hover:to-cyan-700 shadow-lg'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Continue to Details
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );

  // Step 2: Personal Details
  const renderPersonalDetails = () => {
    const ticket = getSelectedTicketDetails();
    
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Personal Details</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Tell us a bit about yourself</p>
        </div>

        {/* Selected Ticket Summary */}
        <div className={`bg-${ticket.color}-50 dark:bg-${ticket.color}-900/20 rounded-xl p-4 flex items-center justify-between flex-wrap gap-3`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-${ticket.color}-100 dark:bg-${ticket.color}-900/40 flex items-center justify-center`}>
              <Ticket className={`w-5 h-5 text-${ticket.color}-600`} />
            </div>
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">{ticket.name} Pass</p>
              <p className="text-sm text-gray-500">Quantity: {quantity}</p>
            </div>
          </div>
          <p className={`text-xl font-bold text-${ticket.color}-600`}>₹{calculateTotal()}</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 98765 43210"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Company/Organization (Optional)
            </label>
            <div className="relative">
              <Info className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Your company name"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Special Requests / Dietary Restrictions (Optional)
            </label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              rows="3"
              placeholder="Any special accommodations or requests..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition resize-none"
            ></textarea>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={prevStep}
            className="flex-1 py-3.5 rounded-xl font-semibold border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            Back
          </button>
          <button
            onClick={nextStep}
            className="flex-1 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 text-white hover:from-emerald-700 hover:to-cyan-700 transition shadow-lg flex items-center justify-center gap-2"
          >
            Continue to Payment
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  // Step 3: Payment
  const renderPayment = () => {
    const ticket = getSelectedTicketDetails();
    
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Payment Details</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Complete your booking securely</p>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5">
          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Order Summary</h4>
          <div className="space-y-2 pb-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">{ticket.name} Pass × {quantity}</span>
              <span className="text-gray-800 dark:text-white">₹{ticket.price * quantity}</span>
            </div>
          </div>
          <div className="flex justify-between pt-3">
            <span className="font-semibold text-gray-800 dark:text-white">Total</span>
            <span className="text-xl font-bold text-emerald-600">₹{calculateTotal()}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Payment Method
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
              { id: 'upi', name: 'UPI / Wallet', icon: Wallet }
            ].map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`p-3 rounded-xl border-2 transition-all flex items-center gap-3 justify-center ${
                    paymentMethod === method.id
                      ? `border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20`
                      : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${paymentMethod === method.id ? 'text-emerald-600' : 'text-gray-500'}`} />
                  <span className={`font-medium ${paymentMethod === method.id ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-700 dark:text-gray-300'}`}>
                    {method.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Demo Card Fields */}
        {paymentMethod === 'card' && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Expiry Date
                </label>
                <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  CVV
                </label>
                <input type="text" placeholder="123" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition" />
              </div>
            </div>
          </div>
        )}

        {paymentMethod === 'upi' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              UPI ID / VPA
            </label>
            <input
              type="text"
              placeholder="username@okhdfcbank"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>
        )}

        {/* Security Notice */}
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
          <Lock className="w-4 h-4" />
          <span>Your payment information is encrypted and secure. We never store your card details.</span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={prevStep}
            className="flex-1 py-3.5 rounded-xl font-semibold border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            Back
          </button>
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="flex-1 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 text-white hover:from-emerald-700 hover:to-cyan-700 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                Pay ₹{calculateTotal()}
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  // Step 4: Confirmation
  const renderConfirmation = () => {
    const ticket = getSelectedTicketDetails();
    
    return (
      <div className="text-center space-y-6">
        <div className="w-20 h-20 mx-auto bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
        </div>
        
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Booking Confirmed!</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Your ticket has been booked successfully
          </p>
        </div>

        {/* Booking Reference */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5">
          <p className="text-sm text-gray-500 mb-1">Booking Reference</p>
          <p className="text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400">{bookingReference}</p>
        </div>

        {/* Ticket Details */}
        <div className={`bg-${ticket.color}-50 dark:bg-${ticket.color}-900/20 rounded-xl p-5 text-left`}>
          <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
            <Ticket className="w-5 h-5" />
            Ticket Details
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Event:</span>
              <span className="font-medium text-gray-800 dark:text-white">{eventData.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Ticket Type:</span>
              <span className={`font-medium text-${ticket.color}-600`}>{ticket.name} Pass</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Quantity:</span>
              <span className="font-medium text-gray-800 dark:text-white">{quantity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Paid:</span>
              <span className="font-bold text-emerald-600">₹{calculateTotal()}</span>
            </div>
          </div>
        </div>

        {/* Attendee Info */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 text-left">
          <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
            <User className="w-5 h-5" />
            Attendee Information
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Name:</span>
              <span className="font-medium text-gray-800 dark:text-white">{formData.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Email:</span>
              <span className="font-medium text-gray-800 dark:text-white">{formData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Phone:</span>
              <span className="font-medium text-gray-800 dark:text-white">{formData.phone}</span>
            </div>
          </div>
        </div>

        {/* Event Reminder */}
        <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl">
          <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <p className="text-sm text-emerald-700 dark:text-emerald-300 text-left">
            A confirmation email with your e-tickets has been sent to your email address. Please check your inbox.
          </p>
        </div>

        <button
          onClick={resetBooking}
          className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 text-white hover:from-emerald-700 hover:to-cyan-700 transition shadow-lg"
        >
          Book Another Ticket
        </button>
      </div>
    );
  };

  // Lock icon component for security notice
  const Lock = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header with Event Info */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-cyan-900/90 z-10"></div>
        <img
          src={eventData.image}
          alt={eventData.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 z-20">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            <button 
              onClick={() => window.history.back()}
              className="absolute top-6 left-4 sm:left-8 text-white hover:text-emerald-200 transition flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Events
            </button>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 mb-3">
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span className="text-sm text-white">{eventData.category}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{eventData.title}</h1>
              <div className="flex flex-wrap gap-4 text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{eventData.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{eventData.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{eventData.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            {[
              { step: 1, label: 'Select Ticket', icon: Ticket },
              { step: 2, label: 'Personal Details', icon: User },
              { step: 3, label: 'Payment', icon: CreditCard },
              { step: 4, label: 'Confirmation', icon: CheckCircle }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = step >= item.step;
              const isCurrent = step === item.step;
              
              return (
                <React.Fragment key={item.step}>
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isActive 
                        ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-lg' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                    } ${isCurrent ? 'ring-4 ring-emerald-300 dark:ring-emerald-700' : ''}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-xs mt-2 font-medium ${
                      isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  {item.step < 4 && (
                    <div className={`flex-1 h-0.5 mx-2 rounded-full ${
                      step > item.step ? 'bg-gradient-to-r from-emerald-600 to-cyan-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
          {step === 1 && renderTicketSelection()}
          {step === 2 && renderPersonalDetails()}
          {step === 3 && renderPayment()}
          {step === 4 && renderConfirmation()}
        </div>
      </div>
    </div>
  );
};

export default TicketPage;