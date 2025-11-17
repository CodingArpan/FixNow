import { useState } from "react";
import {
  ArrowLeft,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  User,
  Download,
  Eye,
  X,
  CreditCard,
  Receipt,
  Filter,
  Search,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router";

const UserTransactions = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [dateFilter, setDateFilter] = useState("all");

  // Sample Transactions Data
  const transactions = [
    {
      id: "TXN001",
      orderId: "ORD001",
      status: "pending",
      amount: 500,
      serviceName: "AC Repair",
      servicemanName: "Rajesh Kumar",
      servicemanPhone: "+91 98765 43210",
      date: "2024-11-20",
      time: "10:00 AM",
      billGeneratedDate: "2024-11-20",
      dueDate: "2024-11-27",
      services: [
        { name: "AC Repair", price: 350 },
        { name: "AC Cleaning", price: 150 },
      ],
      tax: 50,
      discount: 0,
      address: "123, Shanti Nagar, Ahmedabad, Ahmedabad - 395009",
    },
    {
      id: "TXN002",
      orderId: "ORD003",
      status: "paid",
      amount: 350,
      serviceName: "Room Cleaning",
      servicemanName: "Priya Shah",
      servicemanPhone: "+91 98765 43212",
      date: "2024-11-15",
      time: "09:00 AM",
      billGeneratedDate: "2024-11-15",
      paidDate: "2024-11-15",
      paidTime: "12:30 PM",
      paymentMethod: "UPI",
      transactionId: "UPI2024111512301234",
      services: [
        { name: "Room Cleaning", price: 150 },
        { name: "Kitchen Cleaning", price: 100 },
        { name: "Bathroom Cleaning", price: 100 },
      ],
      tax: 35,
      discount: 35,
      address: "789, Green Valley, Ahmedabad, Ahmedabad - 395010",
    },
    {
      id: "TXN003",
      orderId: "ORD002",
      status: "processing",
      amount: 450,
      serviceName: "Plumbing",
      servicemanName: "Amit Patel",
      servicemanPhone: "+91 98765 43211",
      date: "2024-11-22",
      time: "02:00 PM",
      billGeneratedDate: "2024-11-22",
      processingDate: "2024-11-22",
      paymentMethod: "Credit Card",
      services: [
        { name: "Pipe Repair", price: 300 },
        { name: "Leak Fixing", price: 150 },
      ],
      tax: 45,
      discount: 45,
      address: "456, Business Park, Ahmedabad, Ahmedabad - 395007",
    },
    {
      id: "TXN004",
      orderId: "ORD004",
      status: "failed",
      amount: 550,
      serviceName: "Electrician",
      servicemanName: "Vikram Singh",
      servicemanPhone: "+91 98765 43215",
      date: "2024-11-10",
      time: "11:00 AM",
      billGeneratedDate: "2024-11-10",
      failedDate: "2024-11-10",
      failedTime: "01:45 PM",
      failureReason: "Insufficient balance",
      paymentMethod: "Debit Card",
      services: [
        { name: "Wiring", price: 350 },
        { name: "Switch Replacement", price: 200 },
      ],
      tax: 55,
      discount: 55,
      address: "321, Tech Park, Ahmedabad, Ahmedabad - 395007",
    },
    {
      id: "TXN005",
      orderId: "ORD005",
      status: "paid",
      amount: 800,
      serviceName: "Deep Cleaning",
      servicemanName: "Neha Desai",
      servicemanPhone: "+91 98765 43214",
      date: "2024-11-08",
      time: "08:00 AM",
      billGeneratedDate: "2024-11-08",
      paidDate: "2024-11-08",
      paidTime: "02:00 PM",
      paymentMethod: "Cash",
      transactionId: "CASH2024110814001234",
      services: [
        { name: "Full House Cleaning", price: 600 },
        { name: "Carpet Cleaning", price: 200 },
      ],
      tax: 80,
      discount: 80,
      address: "555, Royal Apartments, Ahmedabad, Ahmedabad - 395001",
    },
  ];

  const getFilteredTransactions = () => {
    let filtered = transactions;

    // Status filter
    if (activeFilter !== "all") {
      filtered = filtered.filter((txn) => txn.status === activeFilter);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (txn) =>
          txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          txn.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          txn.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          txn.servicemanName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date();
      filtered = filtered.filter((txn) => {
        const txnDate = new Date(txn.date);
        const diffTime = Math.abs(now - txnDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (dateFilter === "week") return diffDays <= 7;
        if (dateFilter === "month") return diffDays <= 30;
        if (dateFilter === "3months") return diffDays <= 90;
        return true;
      });
    }

    return filtered;
  };

  const filteredTransactions = getFilteredTransactions();

  const statusCounts = {
    all: transactions.length,
    pending: transactions.filter((t) => t.status === "pending").length,
    paid: transactions.filter((t) => t.status === "paid").length,
    processing: transactions.filter((t) => t.status === "processing").length,
    failed: transactions.filter((t) => t.status === "failed").length,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "paid":
        return "bg-green-100 text-green-700 border-green-300";
      case "processing":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "failed":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock size={18} />;
      case "paid":
        return <CheckCircle size={18} />;
      case "processing":
        return <RefreshCw size={18} className="animate-spin" />;
      case "failed":
        return <XCircle size={18} />;
      default:
        return <AlertCircle size={18} />;
    }
  };

  const handlePayNow = (transaction) => {
    setSelectedTransaction(transaction);
    setShowPaymentModal(true);
  };

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailsModal(true);
  };

  const handleDownloadInvoice = (transaction) => {
    // Download invoice logic
    alert(`Downloading invoice for ${transaction.id}`);
  };

  const handleRetryPayment = (transaction) => {
    setSelectedTransaction(transaction);
    setShowPaymentModal(true);
  };

  const processPayment = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch("YOUR_BACKEND_URL/api/transactions/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transactionId: selectedTransaction.id,
          paymentMethod: selectedPaymentMethod,
        }),
      });

      if (response.ok) {
        setShowPaymentModal(false);
        alert("Payment successful!");
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const TransactionCard = ({ transaction }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h3 className="text-lg font-bold text-gray-800">
                {transaction.serviceName}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border ${getStatusColor(
                  transaction.status
                )}`}
              >
                {getStatusIcon(transaction.status)}
                {transaction.status.charAt(0).toUpperCase() +
                  transaction.status.slice(1)}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Transaction ID: {transaction.id}
            </p>
            <p className="text-sm text-gray-500">
              Order ID: {transaction.orderId}
            </p>
          </div>
          <div className="text-right ml-4">
            <div className="text-2xl font-bold text-blue-600">
              ₹{transaction.amount}
            </div>
            <div className="text-xs text-gray-500 mt-1">{transaction.date}</div>
          </div>
        </div>

        {/* Serviceman Info */}
        <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
            <User size={20} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-800 text-sm truncate">
              {transaction.servicemanName}
            </p>
            <p className="text-xs text-gray-600">
              {transaction.servicemanPhone}
            </p>
          </div>
        </div>

        {/* Status-specific Info */}
        {transaction.status === "pending" && transaction.dueDate && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-yellow-700 font-medium">
              Due Date: {transaction.dueDate}
            </p>
          </div>
        )}

        {transaction.status === "paid" && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-green-700 font-medium">
              Paid on {transaction.paidDate} at {transaction.paidTime}
            </p>
            <p className="text-xs text-green-600 mt-1">
              Method: {transaction.paymentMethod}
            </p>
          </div>
        )}

        {transaction.status === "processing" && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-700 font-medium">
              Payment is being processed...
            </p>
            <p className="text-xs text-blue-600 mt-1">
              This may take a few minutes
            </p>
          </div>
        )}

        {transaction.status === "failed" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-red-700 font-medium">
              Payment failed on {transaction.failedDate}
            </p>
            <p className="text-xs text-red-600 mt-1">
              Reason: {transaction.failureReason}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-gray-100">
          <button
            onClick={() => handleViewDetails(transaction)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <Eye size={16} />
            Details
          </button>

          {transaction.status === "paid" && (
            <button
              onClick={() => handleDownloadInvoice(transaction)}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Download size={16} />
              Invoice
            </button>
          )}

          {transaction.status === "pending" && (
            <button
              onClick={() => handlePayNow(transaction)}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <CreditCard size={16} />
              Pay Now
            </button>
          )}

          {transaction.status === "failed" && (
            <button
              onClick={() => handleRetryPayment(transaction)}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <RefreshCw size={16} />
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link to="/">
            <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-4">
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Dashboard</span>
            </button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Transactions
          </h1>
          <p className="text-gray-600">
            Manage all your service payments and invoices
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Pending</p>
                <p className="text-2xl font-bold text-gray-800">
                  {statusCounts.pending}
                </p>
              </div>
              <Clock size={32} className="text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Paid</p>
                <p className="text-2xl font-bold text-gray-800">
                  {statusCounts.paid}
                </p>
              </div>
              <CheckCircle size={32} className="text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Processing</p>
                <p className="text-2xl font-bold text-gray-800">
                  {statusCounts.processing}
                </p>
              </div>
              <RefreshCw size={32} className="text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Failed</p>
                <p className="text-2xl font-bold text-gray-800">
                  {statusCounts.failed}
                </p>
              </div>
              <XCircle size={32} className="text-red-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by ID, service, or serviceman..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Date Filter */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Time</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="3months">Last 3 Months</option>
            </select>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {["all", "pending", "paid", "processing", "failed"].map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                    activeFilter === filter
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)} (
                  {statusCounts[filter]})
                </button>
              )
            )}
          </div>
        </div>

        {/* Transactions List */}
        {filteredTransactions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTransactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Receipt size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Transactions Found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or search criteria
            </p>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Complete Payment
              </h2>
              <p className="text-gray-500 mt-2">
                Transaction ID: {selectedTransaction.id}
              </p>
            </div>

            {/* Amount Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Subtotal:</span>
                <span className="font-semibold text-gray-800">
                  ₹
                  {selectedTransaction.amount -
                    selectedTransaction.tax +
                    selectedTransaction.discount}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Tax:</span>
                <span className="font-semibold text-gray-800">
                  ₹{selectedTransaction.tax}
                </span>
              </div>
              {selectedTransaction.discount > 0 && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-green-600">Discount:</span>
                  <span className="font-semibold text-green-600">
                    -₹{selectedTransaction.discount}
                  </span>
                </div>
              )}
              <div className="border-t border-blue-300 pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">
                    Total Amount:
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    ₹{selectedTransaction.amount}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Payment Method
              </label>
              <div className="space-y-2">
                {["upi", "card", "netbanking", "wallet", "cash"].map(
                  (method) => (
                    <label
                      key={method}
                      className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedPaymentMethod === method
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={selectedPaymentMethod === method}
                        onChange={(e) =>
                          setSelectedPaymentMethod(e.target.value)
                        }
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-3 font-medium text-gray-800 capitalize">
                        {method === "upi"
                          ? "UPI (Google Pay, PhonePe, Paytm)"
                          : method === "card"
                          ? "Credit/Debit Card"
                          : method === "netbanking"
                          ? "Net Banking"
                          : method === "wallet"
                          ? "Wallet (Paytm, PhonePe)"
                          : "Cash on Service"}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>

            <button
              onClick={processPayment}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing
                ? "Processing Payment..."
                : `Pay ₹${selectedTransaction.amount}`}
            </button>
          </div>
        </div>
      )}

      {/* Transaction Details Modal */}
      {showDetailsModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8 relative max-h-screen overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-t-2xl z-10">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-200"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-2">Transaction Details</h2>
              <p className="text-blue-100">
                Transaction ID: {selectedTransaction.id}
              </p>
            </div>

            <div className="p-6 space-y-6">
              {/* Status and Amount */}
              <div className="flex items-center justify-between">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 border ${getStatusColor(
                    selectedTransaction.status
                  )}`}
                >
                  {getStatusIcon(selectedTransaction.status)}
                  {selectedTransaction.status.charAt(0).toUpperCase() +
                    selectedTransaction.status.slice(1)}
                </span>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Total Amount</div>
                  <div className="text-3xl font-bold text-blue-600">
                    ₹{selectedTransaction.amount}
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div className="border border-gray-200 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Receipt size={20} className="text-blue-600" />
                  Service Details
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-semibold text-gray-800">
                      {selectedTransaction.orderId}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-semibold text-gray-800">
                      {selectedTransaction.serviceName}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-semibold text-gray-800">
                      {selectedTransaction.date} at {selectedTransaction.time}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Serviceman:</span>
                    <span className="font-semibold text-gray-800">
                      {selectedTransaction.servicemanName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bill Breakdown */}
              <div className="border border-gray-200 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <DollarSign size={20} className="text-blue-600" />
                  Bill Breakdown
                </h3>
                <div className="space-y-2">
                  {selectedTransaction.services.map((service, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-700">{service.name}</span>
                      <span className="font-semibold text-gray-800">
                        ₹{service.price}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-semibold text-gray-800">
                        ₹
                        {selectedTransaction.amount -
                          selectedTransaction.tax +
                          selectedTransaction.discount}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Tax (GST):</span>
                      <span className="font-semibold text-gray-800">
                        ₹{selectedTransaction.tax}
                      </span>
                    </div>
                    {selectedTransaction.discount > 0 && (
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-green-600">Discount:</span>
                        <span className="font-semibold text-green-600">
                          -₹{selectedTransaction.discount}
                        </span>
                      </div>
                    )}
                    <div className="border-t border-gray-300 pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold text-gray-800">
                          Total Amount:
                        </span>
                        <span className="text-xl font-bold text-blue-600">
                          ₹{selectedTransaction.amount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              {selectedTransaction.status === "paid" && (
                <div className="border border-gray-200 rounded-xl p-4 bg-green-50">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <CheckCircle size={20} className="text-green-600" />
                    Payment Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-semibold text-gray-800">
                        {selectedTransaction.paymentMethod}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Paid On:</span>
                      <span className="font-semibold text-gray-800">
                        {selectedTransaction.paidDate} at{" "}
                        {selectedTransaction.paidTime}
                      </span>
                    </div>
                    {selectedTransaction.transactionId && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Transaction ID:</span>
                        <span className="font-semibold text-gray-800 text-xs break-all">
                          {selectedTransaction.transactionId}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedTransaction.status === "pending" && (
                <div className="border border-gray-200 rounded-xl p-4 bg-yellow-50">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Clock size={20} className="text-yellow-600" />
                    Payment Pending
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Bill Generated:</span>
                      <span className="font-semibold text-gray-800">
                        {selectedTransaction.billGeneratedDate}
                      </span>
                    </div>
                    {selectedTransaction.dueDate && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Due Date:</span>
                        <span className="font-semibold text-orange-600">
                          {selectedTransaction.dueDate}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedTransaction.status === "failed" && (
                <div className="border border-gray-200 rounded-xl p-4 bg-red-50">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <XCircle size={20} className="text-red-600" />
                    Payment Failed
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Failed On:</span>
                      <span className="font-semibold text-gray-800">
                        {selectedTransaction.failedDate} at{" "}
                        {selectedTransaction.failedTime}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Reason:</span>
                      <span className="font-semibold text-red-600">
                        {selectedTransaction.failureReason}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {selectedTransaction.status === "processing" && (
                <div className="border border-gray-200 rounded-xl p-4 bg-blue-50">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <RefreshCw size={20} className="text-blue-600" />
                    Payment Processing
                  </h3>
                  <p className="text-sm text-blue-700">
                    Your payment is being processed. This usually takes 2-5
                    minutes. You will be notified once the payment is confirmed.
                  </p>
                </div>
              )}

              {/* Address */}
              <div className="border border-gray-200 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Calendar size={20} className="text-blue-600" />
                  Service Address
                </h3>
                <p className="text-sm text-gray-700">
                  {selectedTransaction.address}
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 p-6 bg-gray-50 rounded-b-2xl flex gap-2">
              {selectedTransaction.status === "paid" && (
                <button
                  onClick={() => handleDownloadInvoice(selectedTransaction)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Download size={20} />
                  Download Invoice
                </button>
              )}
              {selectedTransaction.status === "pending" && (
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handlePayNow(selectedTransaction);
                  }}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard size={20} />
                  Pay Now
                </button>
              )}
              {selectedTransaction.status === "failed" && (
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleRetryPayment(selectedTransaction);
                  }}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw size={20} />
                  Retry Payment
                </button>
              )}
              <button
                onClick={() => setShowDetailsModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTransactions;
