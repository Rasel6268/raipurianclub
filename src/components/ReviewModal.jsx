 import getStatusBadge from "../utility/utility"
 const ReviewModal = () => {
    if (!selectedApplication) return null;

    const getMembershipBadge = (membership) => {
    if (!membership) return null;
    
    const types = {
      lifetime: { color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30', label: 'Lifetime', icon: Award }
    };
    return types[membership.type] || types.regular;
  };
    
    const statusBadge = getStatusBadge(selectedApplication.status);
    const StatusIcon = statusBadge.icon;
    const membershipBadge = getMembershipBadge(selectedApplication.membership);
    const MembershipIcon = membershipBadge?.icon || Shield;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setShowReviewModal(false)}>
        <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Review Application</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Review membership application details</p>
            </div>
            <button onClick={() => setShowReviewModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Status and Member ID */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${statusBadge.color}`}>
                  <StatusIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{statusBadge.label}</span>
                </div>
                {selectedApplication.membership && (
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${membershipBadge.color}`}>
                    <MembershipIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">{membershipBadge.label}</span>
                  </div>
                )}
              </div>
              {selectedApplication.memberId && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Member ID: <span className="font-mono">{selectedApplication.memberId}</span>
                </div>
              )}
            </div>

            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-500" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedApplication.name || 'N/A'}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedApplication.email || 'N/A'}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedApplication.phone || 'N/A'}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Applied On</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formatDate(selectedApplication.createdAt)}</p>
                </div>
              </div>
            </div>

            {/* Address Information */}
            {(selectedApplication.permanentAddress || selectedApplication.presentAddress) && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Home className="w-5 h-5 text-emerald-500" />
                  Address Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedApplication.permanentAddress && (
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Permanent Address</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedApplication.permanentAddress.street}<br />
                        {selectedApplication.permanentAddress.city}, {selectedApplication.permanentAddress.state}<br />
                        {selectedApplication.permanentAddress.postalCode}<br />
                        {selectedApplication.permanentAddress.country}
                      </p>
                    </div>
                  )}
                  {selectedApplication.presentAddress && !selectedApplication.presentAddress.sameAsPermanent && (
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Present Address</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedApplication.presentAddress.street}<br />
                        {selectedApplication.presentAddress.city}, {selectedApplication.presentAddress.state}<br />
                        {selectedApplication.presentAddress.postalCode}<br />
                        {selectedApplication.presentAddress.country}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Membership Details */}
            {selectedApplication.membership && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-500" />
                  Membership Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Membership Plan</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedApplication.membership.name || 'N/A'}</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Amount Paid</p>
                    <p className="font-medium text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(selectedApplication.membership.amount, selectedApplication.membership.currency)}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Purchase Date</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formatDate(selectedApplication.membership.purchaseDate)}</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Membership Status</p>
                    <p className="font-medium text-gray-900 dark:text-white capitalize">{selectedApplication.membership.status || 'N/A'}</p>
                  </div>
                </div>
                
              </div>
            )}

            {/* Payment Information */}
            {selectedApplication.payments && selectedApplication.payments.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-500" />
                  Payment Information
                </h3>
                <div className="space-y-3">
                  {selectedApplication.payments.map((payment, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Transaction ID</p>
                          <p className="text-sm font-mono text-gray-900 dark:text-white">{payment.tranId || payment.id}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Amount</p>
                          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                            {formatCurrency(payment.amount, payment.currency)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Payment Method</p>
                          <p className="text-sm text-gray-900 dark:text-white">{payment.paymentMethod}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Payment Status</p>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                            payment.status === 'success' 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {payment.status === 'success' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            {payment.status || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Occupation */}
            {selectedApplication.occupation && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-emerald-500" />
                  Occupation
                </h3>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-gray-900 dark:text-white">{selectedApplication.occupation.type || 'Not specified'}</p>
                  {selectedApplication.occupation.companyName && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{selectedApplication.occupation.companyName}</p>
                  )}
                </div>
              </div>
            )}

            {/* Review Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Review Decision</h3>
              
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => setReviewStatus('approved')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition ${
                    reviewStatus === 'approved'
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  Approve
                </button>
                <button
                  onClick={() => setReviewStatus('rejected')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition ${
                    reviewStatus === 'rejected'
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30'
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" />
                  Reject
                </button>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReviewSubmit}
                  disabled={!reviewStatus || reviewMutation.isPending}
                  className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {reviewMutation.isPending ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };



  export default ReviewModal