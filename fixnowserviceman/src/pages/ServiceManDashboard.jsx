import { useState, useRef } from "react";
import {
  Briefcase,
  Calendar,
  Receipt,
  DollarSign,
  History,
  User,
  MapPin,
  Clock,
  Check,
  X,
  Plus,
  Trash2,
  Send,
  Filter,
  Phone,
} from "lucide-react";

const ServicemanDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("requests");
  const [serviceRequests, setServiceRequests] = useState([
    {
      id: "REQ001",
      serviceType: "AC Repair",
      userName: "Rajesh Kumar",
      userPhone: "+91 98765 43210",
      location: "123, Shanti Nagar, Adajan, Surat",
      preferredDate: "2024-11-25",
      preferredTime: "10:00 AM",
      status: "pending",
    },
    {
      id: "REQ002",
      serviceType: "Plumbing",
      userName: "Amit Patel",
      userPhone: "+91 98765 43211",
      location: "456, Business Park, Vesu, Surat",
      preferredDate: "2024-11-26",
      preferredTime: "02:00 PM",
      status: "pending",
    },
  ]);

  const [routineFilter, setRoutineFilter] = useState("today");
  const [customDays, setCustomDays] = useState(7);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const getDateRange = (days) => {
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + days);
    return {
      start: today.toISOString().split("T")[0],
      end: endDate.toISOString().split("T")[0],
    };
  };

  const idCounter = useRef(1);

  const [myRoutine, setMyRoutine] = useState([
    {
      id: "TASK001",
      serviceType: "Room Cleaning",
      userName: "Priya Shah",
      userPhone: "+91 98765 43212",
      location: "789, Green Valley, Piplod, Surat",
      date: getTodayDate(),
      time: "09:00 AM",
      status: "completed",
      basePrice: 350,
    },
    {
      id: "TASK002",
      serviceType: "Electrician",
      userName: "Vikram Singh",
      userPhone: "+91 98765 43215",
      location: "321, Tech Park, Vesu, Surat",
      date: getTodayDate(),
      time: "11:00 AM",
      status: "in-progress",
      basePrice: 550,
    },
    {
      id: "TASK003",
      serviceType: "AC Repair",
      userName: "Amit Patel",
      userPhone: "+91 98765 43216",
      location: "456, Business Park, Vesu, Surat",
      date: getTodayDate(),
      time: "02:00 PM",
      status: "upcoming",
      basePrice: 500,
    },
    {
      id: "TASK004",
      serviceType: "Plumbing",
      userName: "Rajesh Kumar",
      userPhone: "+91 98765 43217",
      location: "123, Shanti Nagar, Adajan, Surat",
      date: getTomorrowDate(),
      time: "10:00 AM",
      status: "upcoming",
      basePrice: 450,
    },
    {
      id: "TASK005",
      serviceType: "Carpenter",
      userName: "Suresh Mehta",
      userPhone: "+91 98765 43218",
      location: "555, Royal Apartments, Athwa, Surat",
      date: "2024-11-25",
      time: "03:00 PM",
      status: "upcoming",
      basePrice: 600,
    },
  ]);

  const [billingTask, setBillingTask] = useState(null);
  const [extraProducts, setExtraProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
//   const [generatedBills, setGeneratedBills] = useState([]);
//   const [billSendingStates, setBillSendingStates] = useState({});

  const [todayEarnings] = useState([
    {
      service: "Room Cleaning",
      user: "Priya Shah",
      amount: 350,
      time: "12:00 PM",
    },
    {
      service: "AC Repair",
      user: "Manish Kumar",
      amount: 500,
      time: "03:30 PM",
    },
  ]);

  const [earningsHistory] = useState([
    { date: "2024-11-19", service: "Plumbing", amount: 450, extraCost: 100 },
    { date: "2024-11-18", service: "Electrician", amount: 550, extraCost: 200 },
    { date: "2024-11-17", service: "Carpenter", amount: 600, extraCost: 150 },
  ]);

  const [dateFilter, setDateFilter] = useState({ start: "", end: "" });

  const menuItems = [
    { id: "requests", label: "Service Requests", icon: Briefcase },
    { id: "routine", label: "My Routine", icon: Calendar },
    { id: "billing", label: "Billing", icon: Receipt },
    { id: "earnings", label: "Earnings Summary", icon: DollarSign },
    { id: "history", label: "Earnings History", icon: History },
    { id: "profile", label: "Profile", icon: User },
  ];

  const handleAcceptRequest = (requestId) => {
    const request = serviceRequests.find((r) => r.id === requestId);
    if (!request) return;

    const newTask = {
      id: `TASK${idCounter.current++}`,
      serviceType: request.serviceType,
      userName: request.userName,
      userPhone: request.userPhone,
      location: request.location,
      date: request.preferredDate,
      time: request.preferredTime,
      status: "upcoming",
      basePrice: 500,
    };

    setMyRoutine((prev) => [...prev, newTask]);
    setServiceRequests((prev) => prev.filter((r) => r.id !== requestId));
  };
 

  const handleRejectRequest = (requestId) => {
    setServiceRequests(serviceRequests.filter((r) => r.id !== requestId));
  };

  const handleMarkCompleted = (taskId) => {
    setMyRoutine(
      myRoutine.map((task) =>
        task.id === taskId ? { ...task, status: "completed" } : task
      )
    );
  };

  const handleStartBilling = (task) => {
    setBillingTask(task);
    setExtraProducts([]);
    setActiveMenu("billing");
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      setExtraProducts([...extraProducts, { ...newProduct, id: Date.now() }]);
      setNewProduct({ name: "", price: "" });
    }
  };

  const handleRemoveProduct = (productId) => {
    setExtraProducts(extraProducts.filter((p) => p.id !== productId));
  };

  const calculateTotal = () => {
    const basePrice = billingTask?.basePrice || 0;
    const extraCost = extraProducts.reduce(
      (sum, p) => sum + parseFloat(p.price || 0),
      0
    );
    return basePrice + extraCost;
  };

  const handleSendBill = () => {
    alert(
      `Bill sent to ${billingTask.userName}\nTotal Amount: ₹${calculateTotal()}`
    );
    setBillingTask(null);
    setExtraProducts([]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "in-progress":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "completed":
        return "bg-green-100 text-green-700 border-green-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const handleStartService = (taskId) => {
    setMyRoutine(
      myRoutine.map((task) =>
        task.id === taskId ? { ...task, status: "in-progress" } : task
      )
    );
  };

  const getFilteredRoutine = () => {
    const today = getTodayDate();
    const tomorrow = getTomorrowDate();

    switch (routineFilter) {
      case "today":
        return myRoutine.filter((task) => task.date === today);

      case "tomorrow":
        return myRoutine.filter((task) => task.date === tomorrow);

      case "week": {
        const weekRange = getDateRange(7);
        return myRoutine.filter(
          (task) => task.date >= weekRange.start && task.date <= weekRange.end
        );
      }

      case "month": {
        const monthRange = getDateRange(30);
        return myRoutine.filter(
          (task) => task.date >= monthRange.start && task.date <= monthRange.end
        );
      }

      case "custom": {
        const customRange = getDateRange(customDays);
        return myRoutine.filter(
          (task) =>
            task.date >= customRange.start && task.date <= customRange.end
        );
      }

      default:
        return myRoutine;
    }
  };

  const isToday = (date) => {
    return date === getTodayDate();
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "requests":
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Service Requests
            </h2>
            {serviceRequests.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center py-12">
                  <Briefcase size={64} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No pending service requests</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {serviceRequests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {request.serviceType}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Request ID: {request.id}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                        Pending
                      </span>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <User size={16} className="text-gray-400" />
                        <span className="text-gray-700">
                          {request.userName}
                        </span>
                        <span className="text-gray-500">
                          • {request.userPhone}
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin size={16} className="text-gray-400 mt-0.5" />
                        <span className="text-gray-700">
                          {request.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock size={16} className="text-gray-400" />
                        <span className="text-gray-700">
                          {request.preferredDate} at {request.preferredTime}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAcceptRequest(request.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <Check size={18} />
                        Accept
                      </button>
                      <button
                        onClick={() => handleRejectRequest(request.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <X size={18} />
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "routine":
        { const filteredTasks = getFilteredRoutine();
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              My Routine
            </h2>

            {/* Filter Buttons */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setRoutineFilter("today")}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    routineFilter === "today"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Today's Tasks
                </button>
                <button
                  onClick={() => setRoutineFilter("tomorrow")}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    routineFilter === "tomorrow"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Tomorrow
                </button>
                <button
                  onClick={() => setRoutineFilter("week")}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    routineFilter === "week"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  This Week
                </button>
                <button
                  onClick={() => setRoutineFilter("month")}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    routineFilter === "month"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  This Month
                </button>
                <button
                  onClick={() => setRoutineFilter("custom")}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    routineFilter === "custom"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Custom
                </button>
              </div>

              {/* Custom Days Input */}
              {routineFilter === "custom" && (
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Show next
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="365"
                    value={customDays}
                    onChange={(e) =>
                      setCustomDays(parseInt(e.target.value) || 1)
                    }
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <label className="text-sm font-semibold text-gray-700">
                    days
                  </label>
                </div>
              )}
            </div>

            {/* Task List */}
            {filteredTasks.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center py-12">
                  <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No Tasks Scheduled
                  </h3>
                  <p className="text-gray-500">
                    {routineFilter === "today" &&
                      "You don't have any tasks scheduled for today"}
                    {routineFilter === "tomorrow" &&
                      "You don't have any tasks scheduled for tomorrow"}
                    {routineFilter === "week" &&
                      "You don't have any tasks scheduled for this week"}
                    {routineFilter === "month" &&
                      "You don't have any tasks scheduled for this month"}
                    {routineFilter === "custom" &&
                      `You don't have any tasks scheduled for the next ${customDays} days`}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTasks.map((task) => {
                  const taskIsToday = isToday(task.date);
                  return (
                    <div
                      key={task.id}
                      className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">
                            {task.serviceType}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Task ID: {task.id}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                            task.status
                          )}`}
                        >
                          {task.status === "upcoming" && "Upcoming"}
                          {task.status === "in-progress" && "In Progress"}
                          {task.status === "completed" && "Completed"}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar size={16} className="text-gray-400" />
                          <span className="text-gray-700 font-semibold">
                            {task.date}
                            {taskIsToday && (
                              <span className="text-blue-600 ml-2">
                                (Today)
                              </span>
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock size={16} className="text-gray-400" />
                          <span className="text-gray-700">{task.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <User size={16} className="text-gray-400" />
                          <span className="text-gray-700">{task.userName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone size={16} className="text-gray-400" />
                          <span className="text-gray-600">
                            {task.userPhone}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-sm mb-4 bg-gray-50 p-3 rounded-lg">
                        <MapPin size={16} className="text-gray-400 mt-0.5" />
                        <span className="text-gray-700">{task.location}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm mb-4 pb-4 border-b border-gray-200">
                        <DollarSign size={16} className="text-gray-400" />
                        <span className="font-semibold text-gray-800">
                          Base Price: ₹{task.basePrice}
                        </span>
                      </div>

                      {/* Action Buttons - Only for Today's Tasks */}
                      {taskIsToday ? (
                        <div className="space-y-2">
                          {task.status === "upcoming" && (
                            <button
                              onClick={() => handleStartService(task.id)}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                            >
                              <Clock size={18} />
                              Start Service
                            </button>
                          )}
                          {task.status === "in-progress" && (
                            <button
                              onClick={() => handleMarkCompleted(task.id)}
                              className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                            >
                              <Check size={18} />
                              Mark as Completed
                            </button>
                          )}
                          {task.status === "completed" && (
                            <button
                              onClick={() => handleStartBilling(task)}
                              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                            >
                              <Receipt size={18} />
                              Generate Bill
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="bg-gray-100 border border-gray-300 rounded-lg p-3 text-center">
                          <p className="text-sm text-gray-600 font-medium">
                            <Clock size={16} className="inline mr-2" />
                            This task is scheduled for {task.date}. Actions will
                            be available on the service date.
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ); }

      case "billing":
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Generate Bill
            </h2>
            {!billingTask ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center py-12">
                  <Receipt size={64} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">
                    Select a completed task from My Routine to generate a bill
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Service Details
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-semibold text-gray-800">
                        {billingTask.serviceType}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Customer:</span>
                      <span className="font-semibold text-gray-800">
                        {billingTask.userName}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Base Price:</span>
                      <span className="font-semibold text-gray-800">
                        ₹{billingTask.basePrice}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Add Extra Products
                  </h3>
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      placeholder="Product name (e.g., Switch)"
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, price: e.target.value })
                      }
                      className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <button
                      onClick={handleAddProduct}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                    >
                      <Plus size={18} />
                      Add
                    </button>
                  </div>

                  {extraProducts.length > 0 && (
                    <div className="space-y-2">
                      {extraProducts.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                        >
                          <div>
                            <span className="font-semibold text-gray-800">
                              {product.name}
                            </span>
                            <span className="text-gray-600 ml-2">
                              ₹{product.price}
                            </span>
                          </div>
                          <button
                            onClick={() => handleRemoveProduct(product.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Bill Summary
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Base Service Price:</span>
                      <span className="font-semibold text-gray-800">
                        ₹{billingTask.basePrice}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Extra Products Cost:
                      </span>
                      <span className="font-semibold text-gray-800">
                        ₹
                        {extraProducts.reduce(
                          (sum, p) => sum + parseFloat(p.price || 0),
                          0
                        )}
                      </span>
                    </div>
                    <div className="border-t border-gray-300 pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold text-gray-800">
                          Total Amount:
                        </span>
                        <span className="text-xl font-bold text-blue-600">
                          ₹{calculateTotal()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleSendBill}
                    className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    Send Bill to User
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case "earnings":
        { const todayTotal = todayEarnings.reduce((sum, e) => sum + e.amount, 0);
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Today's Earnings
            </h2>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="text-center">
                <p className="text-gray-600 mb-2">Total Earnings Today</p>
                <p className="text-4xl font-bold text-green-600">
                  ₹{todayTotal}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Earnings Breakdown
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-semibold text-gray-700">
                        Service
                      </th>
                      <th className="text-left py-3 text-sm font-semibold text-gray-700">
                        User
                      </th>
                      <th className="text-left py-3 text-sm font-semibold text-gray-700">
                        Time
                      </th>
                      <th className="text-right py-3 text-sm font-semibold text-gray-700">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayEarnings.map((earning, idx) => (
                      <tr key={idx} className="border-b border-gray-100">
                        <td className="py-3 text-sm text-gray-800">
                          {earning.service}
                        </td>
                        <td className="py-3 text-sm text-gray-800">
                          {earning.user}
                        </td>
                        <td className="py-3 text-sm text-gray-600">
                          {earning.time}
                        </td>
                        <td className="py-3 text-sm font-semibold text-gray-800 text-right">
                          ₹{earning.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ); }

      case "history":
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Earnings History
            </h2>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Filter size={18} className="text-gray-600" />
                <h3 className="font-semibold text-gray-800">Filter by Date</h3>
              </div>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={dateFilter.start}
                  onChange={(e) =>
                    setDateFilter({ ...dateFilter, start: e.target.value })
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <input
                  type="date"
                  value={dateFilter.end}
                  onChange={(e) =>
                    setDateFilter({ ...dateFilter, end: e.target.value })
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                  Apply
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-semibold text-gray-700">
                        Date
                      </th>
                      <th className="text-left py-3 text-sm font-semibold text-gray-700">
                        Service
                      </th>
                      <th className="text-right py-3 text-sm font-semibold text-gray-700">
                        Base Amount
                      </th>
                      <th className="text-right py-3 text-sm font-semibold text-gray-700">
                        Extra Cost
                      </th>
                      <th className="text-right py-3 text-sm font-semibold text-gray-700">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {earningsHistory.map((earning, idx) => (
                      <tr key={idx} className="border-b border-gray-100">
                        <td className="py-3 text-sm text-gray-800">
                          {earning.date}
                        </td>
                        <td className="py-3 text-sm text-gray-800">
                          {earning.service}
                        </td>
                        <td className="py-3 text-sm text-gray-800 text-right">
                          ₹{earning.amount - earning.extraCost}
                        </td>
                        <td className="py-3 text-sm text-gray-600 text-right">
                          ₹{earning.extraCost}
                        </td>
                        <td className="py-3 text-sm font-semibold text-gray-800 text-right">
                          ₹{earning.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "profile":
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                  <User size={40} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Rajesh Kumar
                  </h3>
                  <p className="text-gray-600">Electrician & AC Technician</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Phone
                  </label>
                  <p className="text-gray-800">+91 98765 43210</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Email
                  </label>
                  <p className="text-gray-800">rajesh.kumar@example.com</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Experience
                  </label>
                  <p className="text-gray-800">8 years</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Rating
                  </label>
                  <p className="text-gray-800">4.8 ⭐ (127 reviews)</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg h-screen sticky top-0">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Serviceman Portal</h1>
        </div>
        <nav className="p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  activeMenu === item.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">{renderContent()}</div>
      </div>
    </div>
  );
};

export default ServicemanDashboard;