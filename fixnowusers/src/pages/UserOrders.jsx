import { useState } from "react";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  MapPin,
  User,
  Phone,
  Star,
  Package,
  AlertCircle,
  Eye,
  X,
  Briefcase,
  Mail,
} from "lucide-react";
import { Link } from "react-router";

const UserOrders = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);

  // Sample Orders Data
  const orders = [
    {
      id: "ORD001",
      status: "pending",
      serviceName: "AC Repair",
      servicemanName: "Rajesh Kumar",
      servicemanPhone: "+91 98765 43210",
      servicemanEmail: "rajesh.kumar@example.com",
      servicemanRating: 4.8,
      servicemanPhoto: null,
      servicemanExperience: "8 years",
      bookingDate: "2024-11-20",
      bookingTime: "10:00 AM",
      address: "123, Shanti Nagar, Adajan, Surat - 395009",
      price: 500,
      paymentStatus: "Paid",
      services: ["AC Repair", "AC Cleaning"],
    },
    {
      id: "ORD002",
      status: "pending",
      serviceName: "Plumbing",
      servicemanName: "Amit Patel",
      servicemanPhone: "+91 98765 43211",
      servicemanEmail: "amit.patel@example.com",
      servicemanRating: 4.9,
      servicemanPhoto: null,
      servicemanExperience: "12 years",
      bookingDate: "2024-11-22",
      bookingTime: "02:00 PM",
      address: "456, Business Park, Vesu, Surat - 395007",
      price: 450,
      paymentStatus: "Pending",
      services: ["Pipe Repair", "Leak Fixing"],
    },
    {
      id: "ORD003",
      status: "completed",
      serviceName: "Room Cleaning",
      servicemanName: "Priya Shah",
      servicemanPhone: "+91 98765 43212",
      servicemanEmail: "priya.shah@example.com",
      servicemanRating: 4.7,
      servicemanPhoto: null,
      servicemanExperience: "5 years",
      bookingDate: "2024-11-15",
      bookingTime: "09:00 AM",
      completedDate: "2024-11-15",
      completedTime: "12:00 PM",
      address: "789, Green Valley, Piplod, Surat - 395010",
      price: 350,
      paymentStatus: "Paid",
      services: ["Room Cleaning", "Kitchen Cleaning", "Bathroom Cleaning"],
      customerRating: 5,
      customerReview:
        "Excellent service! Very professional and thorough cleaning.",
    },
    {
      id: "ORD004",
      status: "completed",
      serviceName: "Electrician",
      servicemanName: "Vikram Singh",
      servicemanPhone: "+91 98765 43215",
      servicemanEmail: "vikram.singh@example.com",
      servicemanRating: 4.5,
      servicemanPhoto: null,
      servicemanExperience: "7 years",
      bookingDate: "2024-11-10",
      bookingTime: "11:00 AM",
      completedDate: "2024-11-10",
      completedTime: "01:30 PM",
      address: "321, Tech Park, Vesu, Surat - 395007",
      price: 550,
      paymentStatus: "Paid",
      services: ["Wiring", "Switch Replacement"],
      customerRating: 4,
      customerReview: "Good work, arrived on time.",
    },
    {
      id: "ORD005",
      status: "cancelled",
      serviceName: "Carpenter",
      servicemanName: "Suresh Mehta",
      servicemanPhone: "+91 98765 43213",
      servicemanEmail: "suresh.mehta@example.com",
      servicemanRating: 4.6,
      servicemanPhoto: null,
      servicemanExperience: "15 years",
      bookingDate: "2024-11-18",
      bookingTime: "03:00 PM",
      cancelledDate: "2024-11-17",
      address: "555, Royal Apartments, Athwa, Surat - 395001",
      price: 600,
      paymentStatus: "Refunded",
      services: ["Furniture Repair"],
      cancellationReason: "Changed my mind",
    },
  ];

  const pendingOrders = orders.filter((order) => order.status === "pending");
  const completedOrders = orders.filter(
    (order) => order.status === "completed"
  );
  const cancelledOrders = orders.filter(
    (order) => order.status === "cancelled"
  );

  const handleCancelOrder = (order) => {
    setSelectedOrder(order);
    setShowCancelModal(true);
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const confirmCancellation = async () => {
    if (!cancelReason.trim()) {
      alert("Please provide a reason for cancellation");
      return;
    }

    setIsCancelling(true);

    try {
      const response = await fetch(
        `YOUR_BACKEND_URL/api/orders/${selectedOrder.id}/cancel`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reason: cancelReason }),
        }
      );

      if (response.ok) {
        setShowCancelModal(false);
        setCancelReason("");
        alert("Order cancelled successfully");
      } else {
        alert("Failed to cancel order");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setIsCancelling(false);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }
      />
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock size={18} />;
      case "completed":
        return <CheckCircle size={18} />;
      case "cancelled":
        return <XCircle size={18} />;
      default:
        return <Package size={18} />;
    }
  };

  const OrderCard = ({ order }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-bold text-gray-800">
                {order.serviceName}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(
                  order.status
                )}`}
              >
                {getStatusIcon(order.status)}
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <p className="text-sm text-gray-500">Order ID: {order.id}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              ₹{order.price}
            </div>
            <div
              className={`text-xs font-medium ${
                order.paymentStatus === "Paid"
                  ? "text-green-600"
                  : "text-orange-600"
              }`}
            >
              {order.paymentStatus}
            </div>
          </div>
        </div>

        {/* Serviceman Info */}
        <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
            {order.servicemanPhoto ? (
              <img
                src={order.servicemanPhoto}
                alt={order.servicemanName}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <User size={24} className="text-white" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-800 truncate">
              {order.servicemanName}
            </p>
            <div className="flex items-center gap-1">
              {renderStars(Math.round(order.servicemanRating))}
              <span className="text-sm text-gray-600 ml-1">
                ({order.servicemanRating})
              </span>
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {order.services.map((service, idx) => (
              <span
                key={idx}
                className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Date & Address */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} className="flex-shrink-0" />
            <span>
              {order.bookingDate} at {order.bookingTime}
            </span>
          </div>
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin size={16} className="flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2">{order.address}</span>
          </div>
        </div>

        {/* Completed Date */}
        {order.status === "completed" && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-green-700 font-medium">
              Completed on {order.completedDate} at {order.completedTime}
            </p>
          </div>
        )}

        {/* Cancelled Info */}
        {order.status === "cancelled" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-red-700 font-medium">
              Cancelled on {order.cancelledDate}
            </p>
            {order.cancellationReason && (
              <p className="text-sm text-red-600 mt-1">
                Reason: {order.cancellationReason}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-gray-100">
          {order.status === "pending" && (
            <>
              <button
                onClick={() => handleViewDetails(order)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Eye size={18} />
                View Details
              </button>
              <button
                onClick={() => handleCancelOrder(order)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <XCircle size={18} />
                Cancel
              </button>
            </>
          )}
          {(order.status === "completed" || order.status === "cancelled") && (
            <button
              onClick={() => handleViewDetails(order)}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Eye size={18} />
              View Details
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
            <Link to="/"  >
          <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-4">
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Dashboard</span>
          </button>
            </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Order History
          </h1>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6 p-2 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("pending")}
            className={`flex-1 min-w-fit py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === "pending"
                ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Clock size={20} />
            <span>Pending ({pendingOrders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`flex-1 min-w-fit py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === "completed"
                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <CheckCircle size={20} />
            <span>Completed ({completedOrders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("cancelled")}
            className={`flex-1 min-w-fit py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === "cancelled"
                ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <XCircle size={20} />
            <span>Cancelled ({cancelledOrders.length})</span>
          </button>
        </div>

        {/* Orders List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeTab === "pending" &&
            (pendingOrders.length > 0 ? (
              pendingOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            ) : (
              <div className="col-span-full bg-white rounded-xl shadow-md p-12 text-center">
                <Clock size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No Pending Orders
                </h3>
                <p className="text-gray-500">
                  You don't have any pending service bookings
                </p>
              </div>
            ))}

          {activeTab === "completed" &&
            (completedOrders.length > 0 ? (
              completedOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            ) : (
              <div className="col-span-full bg-white rounded-xl shadow-md p-12 text-center">
                <CheckCircle size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No Completed Orders
                </h3>
                <p className="text-gray-500">
                  You haven't completed any service bookings yet
                </p>
              </div>
            ))}

          {activeTab === "cancelled" &&
            (cancelledOrders.length > 0 ? (
              cancelledOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            ) : (
              <div className="col-span-full bg-white rounded-xl shadow-md p-12 text-center">
                <XCircle size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No Cancelled Orders
                </h3>
                <p className="text-gray-500">
                  You haven't cancelled any service bookings
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Cancel Order Modal */}
      {showCancelModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => {
                setShowCancelModal(false);
                setCancelReason("");
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={32} className="text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Cancel Order</h2>
              <p className="text-gray-500 mt-2">Order ID: {selectedOrder.id}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Reason for Cancellation *
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Please tell us why you're cancelling..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none resize-none"
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Cancellation may be subject to charges as
                per our policy.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setCancelReason("");
                }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={confirmCancellation}
                disabled={isCancelling}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {isCancelling ? "Cancelling..." : "Confirm Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {showDetailsModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8 relative max-h-screen overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-t-2xl z-10">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-200"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-2">Order Details</h2>
              <p className="text-blue-100">Order ID: {selectedOrder.id}</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${getStatusColor(
                    selectedOrder.status
                  )}`}
                >
                  {getStatusIcon(selectedOrder.status)}
                  {selectedOrder.status.charAt(0).toUpperCase() +
                    selectedOrder.status.slice(1)}
                </span>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Total Amount</div>
                  <div className="text-3xl font-bold text-blue-600">
                    ₹{selectedOrder.price}
                  </div>
                </div>
              </div>

              {/* Serviceman Details */}
              <div className="border border-gray-200 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <User size={20} className="text-blue-600" />
                  Serviceman Details
                </h3>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
                    {selectedOrder.servicemanPhoto ? (
                      <img
                        src={selectedOrder.servicemanPhoto}
                        alt={selectedOrder.servicemanName}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <User size={32} className="text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-lg">
                      {selectedOrder.servicemanName}
                    </p>
                    <div className="flex items-center gap-1 my-1">
                      {renderStars(Math.round(selectedOrder.servicemanRating))}
                      <span className="text-sm text-gray-600 ml-1">
                        ({selectedOrder.servicemanRating})
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                      <Briefcase size={14} />
                      <span>
                        {selectedOrder.servicemanExperience} experience
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                      <Phone size={14} />
                      <span>{selectedOrder.servicemanPhone}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Mail size={14} />
                      <span>{selectedOrder.servicemanEmail}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div className="border border-gray-200 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Package size={20} className="text-blue-600" />
                  Service Details
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-500">Service Type:</span>
                    <p className="font-semibold text-gray-800">
                      {selectedOrder.serviceName}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">
                      Services Included:
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedOrder.services.map((service, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm font-medium"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="border border-gray-200 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Calendar size={20} className="text-blue-600" />
                  Booking Details
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500 w-32">Booking Date:</span>
                    <span className="font-semibold text-gray-800">
                      {selectedOrder.bookingDate} at {selectedOrder.bookingTime}
                    </span>
                  </div>
                  {selectedOrder.completedDate && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-500 w-32">Completed On:</span>
                      <span className="font-semibold text-green-700">
                        {selectedOrder.completedDate} at{" "}
                        {selectedOrder.completedTime}
                      </span>
                    </div>
                  )}
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-gray-500 w-32">Address:</span>
                    <span className="font-semibold text-gray-800">
                      {selectedOrder.address}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500 w-32">Payment Status:</span>
                    <span
                      className={`font-semibold ${
                        selectedOrder.paymentStatus === "Paid"
                          ? "text-green-600"
                          : "text-orange-600"
                      }`}
                    >
                      {selectedOrder.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Review */}
              {selectedOrder.status === "completed" &&
                selectedOrder.customerRating && (
                  <div className="border border-gray-200 rounded-xl p-4 bg-green-50">
                    <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <Star
                        size={20}
                        className="text-yellow-500 fill-yellow-500"
                      />
                      Your Review
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(selectedOrder.customerRating)}
                      <span className="text-sm text-gray-600 ml-2">
                        ({selectedOrder.customerRating}/5)
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">
                      {selectedOrder.customerReview}
                    </p>
                  </div>
                )}
            </div>

            <div className="sticky bottom-0 p-6 bg-gray-50 rounded-b-2xl">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all"
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

export default UserOrders;
