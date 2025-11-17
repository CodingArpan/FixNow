import { useState } from "react";
import {
  User,
  ChevronDown,
  X,
  Search,
  Star,
  Calendar,
  DollarSign,
  MapPin,
  Phone,
  Briefcase,
  LogOut,
  Settings,
  UserCircle,
  LogIn,
  Smartphone,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router";

const UserDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [userName, setUserName] = useState("Guest User");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState("rating");

  // Login form states
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoadingOtp, setIsLoadingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [error, setError] = useState("");

  const householdServices = [
    {
      category: "Cleaning",
      items: [
        "Room Cleaning",
        "Bathroom Cleaning",
        "Kitchen Cleaning",
        "Carpet Cleaning",
        "Window Cleaning",
        "Deep Cleaning",
        "Dusting & Vacuuming",
        "Disinfection Service",
      ],
    },
    {
      category: "Maintenance",
      items: [
        "Electrician",
        "Plumber",
        "Carpenter",
        "Painter",
        "AC Repair",
        "Appliance Repair",
      ],
    },
    {
      category: "Specialized",
      items: [
        "Laundry Service",
        "Rooftop Cleaning",
        "Garden Maintenance",
        "Pest Control",
        "Home Security",
        "Interior Design",
      ],
    },
  ];

  const servicemen = [
    {
      id: 1,
      name: "Rajesh Kumar",
      photo: null,
      rating: 4.8,
      reviews: 127,
      services: ["Electrician", "AC Repair"],
      experience: "8 years",
      price: 500,
      location: "Ahmedabad",
      phone: "+91 98765 43210",
      available: true,
    },
    {
      id: 2,
      name: "Amit Patel",
      photo: null,
      rating: 4.9,
      reviews: 203,
      services: ["Plumber", "Bathroom Cleaning"],
      experience: "12 years",
      price: 450,
      location: "Ahmedabad",
      phone: "+91 98765 43211",
      available: true,
    },
    {
      id: 3,
      name: "Priya Shah",
      photo: null,
      rating: 4.7,
      reviews: 89,
      services: ["Room Cleaning", "Kitchen Cleaning", "Deep Cleaning"],
      experience: "5 years",
      price: 350,
      location: "Ahmedabad",
      phone: "+91 98765 43212",
      available: true,
    },
    {
      id: 4,
      name: "Suresh Mehta",
      photo: null,
      rating: 4.6,
      reviews: 156,
      services: ["Carpenter", "Painter"],
      experience: "15 years",
      price: 600,
      location: "Ahmedabad",
      phone: "+91 98765 43213",
      available: false,
    },
    {
      id: 5,
      name: "Neha Desai",
      photo: null,
      rating: 4.9,
      reviews: 178,
      services: ["Laundry Service", "Window Cleaning"],
      experience: "6 years",
      price: 300,
      location: "Ahmedabad",
      phone: "+91 98765 43214",
      available: true,
    },
    {
      id: 6,
      name: "Vikram Singh",
      photo: null,
      rating: 4.5,
      reviews: 92,
      services: ["Rooftop Cleaning", "Garden Maintenance"],
      experience: "7 years",
      price: 550,
      location: "Ahmedabad",
      phone: "+91 98765 43215",
      available: true,
    },
    {
      id: 7,
      name: "Kavita Joshi",
      photo: null,
      rating: 4.8,
      reviews: 134,
      services: ["Pest Control", "Disinfection Service"],
      experience: "9 years",
      price: 700,
      location: "Ahmedabad",
      phone: "+91 98765 43216",
      available: true,
    },
    {
      id: 8,
      name: "Manish Trivedi",
      photo: null,
      rating: 4.7,
      reviews: 167,
      services: ["Appliance Repair", "AC Repair"],
      experience: "11 years",
      price: 650,
      location: "Ahmedabad",
      phone: "+91 98765 43217",
      available: true,
    },
  ];

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");

    // Validate mobile number
    if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsLoadingOtp(true);

    try {
      // Send OTP request to backend
      const response = await fetch("YOUR_BACKEND_URL/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile: mobileNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success - move to OTP verification screen
        setShowLoginModal(false);
        setShowOtpModal(true);
      } else {
        setError(data.message || "Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoadingOtp(false);

      setShowLoginModal(false); // TODO: Remove this line after backend integration
      setShowOtpModal(true); // TODO: Remove this line after backend integration
    }
  };

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter complete 6-digit OTP");
      return;
    }

    setIsVerifyingOtp(true);

    try {
      // Verify OTP with backend
      const response = await fetch("YOUR_BACKEND_URL/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: mobileNumber,
          otp: otpString,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success - login user with backend data
        setIsLoggedIn(true);
        setUserId(data.userId);
        setUserName(data.userName || data.name || mobileNumber);
        setUserEmail(data.userEmail || data.email || "");

        // Close modals and reset states
        setShowOtpModal(false);
        setMobileNumber("");
        setOtp(["", "", "", "", "", ""]);
      } else {
        setError(data.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsVerifyingOtp(false);

      // TODO: Remove this lines after backend integration
      // Success - login user with backend data
      setIsLoggedIn(true);
      setUserId("1234");
      setUserName("codingarpan");
      setUserEmail("arpandas22@gnu.ac.in");

      // Close modals and reset states
      setShowOtpModal(false);
      setMobileNumber("");
      setOtp(["", "", "", "", "", ""]);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("Guest User");
    setUserEmail("");
    setUserId(null);
    setUserImage(null);
    setIsUserMenuOpen(false);
  };

  const handleBackToLogin = () => {
    setShowOtpModal(false);
    setShowLoginModal(true);
    setOtp(["", "", "", "", "", ""]);
    setError("");
  };

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const removeService = (service) => {
    setSelectedServices((prev) => prev.filter((s) => s !== service));
  };

  const filteredServicemen = servicemen
    .filter((person) => {
      const matchesService =
        selectedServices.length === 0 ||
        selectedServices.some((service) => person.services.includes(service));
      const matchesRating = person.rating >= minRating;
      const matchesPrice = person.price <= maxPrice;
      const matchesSearch =
        searchQuery === "" ||
        person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.services.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesService && matchesRating && matchesPrice && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "reviews") return b.reviews - a.reviews;
      return 0;
    });

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col py-4 gap-4">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                FixNow Services
              </h1>

              {/* User Profile / Login */}
              <div className="relative">
                <div
                  onClick={() => {
                    if (isLoggedIn) {
                      setIsUserMenuOpen(!isUserMenuOpen);
                    } else {
                      setShowLoginModal(true);
                    }
                  }}
                  className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-md">
                    {userImage ? (
                      <img
                        src={userImage}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={24} className="text-white" />
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {userName}
                    </h2>
                    {isLoggedIn && userEmail && (
                      <p className="text-xs text-gray-500">{userEmail}</p>
                    )}
                  </div>
                  {isLoggedIn && (
                    <ChevronDown
                      size={18}
                      className={`text-gray-600 transition-transform ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>

                {/* User Dropdown Menu */}
                {isLoggedIn && isUserMenuOpen && (
                  <div className="absolute z-50 right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                      <p className="font-semibold text-gray-800">{userName}</p>
                      <p className="text-sm text-gray-500 truncate">
                        {userEmail || mobileNumber}
                      </p>
                    </div>

                    <Link to="/user-profile">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          alert("Profile page - Coming soon!");
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center gap-3 text-gray-700"
                      >
                        <UserCircle size={18} className="text-blue-600" />
                        <span>My Profile</span>
                      </button>
                    </Link>

                    <Link to="/user-orders">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          alert("Settings page - Coming soon!");
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center gap-3 text-gray-700"
                      >
                        <Settings size={18} className="text-blue-600" />
                        <span>Orders</span>
                      </button>
                    </Link>

                    <Link to="/user-transactions">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          alert("Settings page - Coming soon!");
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center gap-3 text-gray-700"
                      >
                        <Settings size={18} className="text-blue-600" />
                        <span>Transactions</span>
                      </button>
                    </Link>

                    <div className="border-t border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors flex items-center gap-3 text-red-600 font-medium"
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Service Selection Dropdown */}
            <div className="w-full relative">
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full min-h-[52px] px-4 py-2 border-2 border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition-all bg-white flex flex-wrap gap-2 items-center shadow-sm"
              >
                {selectedServices.length === 0 ? (
                  <div className="flex items-center gap-2 text-gray-400">
                    <Search size={18} />
                    <span>Select household services...</span>
                  </div>
                ) : (
                  selectedServices.map((service) => (
                    <span
                      key={service}
                      className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                    >
                      {service}
                      <X
                        size={14}
                        className="cursor-pointer hover:bg-white hover:bg-opacity-20 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeService(service);
                        }}
                      />
                    </span>
                  ))
                )}
                <ChevronDown
                  size={20}
                  className={`ml-auto text-gray-600 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl max-h-96 overflow-y-auto">
                  {householdServices.map((category) => (
                    <div
                      key={category.category}
                      className="border-b last:border-b-0"
                    >
                      <div className="px-4 py-2 bg-gray-50 font-semibold text-gray-700 text-sm">
                        {category.category}
                      </div>
                      {category.items.map((service) => (
                        <div
                          key={service}
                          onClick={() => toggleService(service)}
                          className={`px-4 py-3 cursor-pointer hover:bg-blue-50 flex items-center gap-3 transition-colors ${
                            selectedServices.includes(service)
                              ? "bg-blue-50"
                              : ""
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedServices.includes(service)}
                            onChange={() => {}}
                            className="w-4 h-4 text-blue-600 rounded cursor-pointer accent-blue-500"
                          />
                          <span className="text-gray-700">{service}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => {
                setShowLoginModal(false);
                setMobileNumber("");
                setError("");
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Login with Mobile
              </h2>
              <p className="text-gray-500 mt-2">
                Enter your mobile number to get OTP
              </p>
            </div>

            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                  <span className="px-4 py-3 bg-gray-50 text-gray-700 font-medium">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="9876543210"
                    maxLength="10"
                    required
                    className="flex-1 px-4 py-3 outline-none"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoadingOtp}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingOtp ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-6">
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={handleBackToLogin}
              className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
            >
              <ArrowLeft size={24} />
            </button>

            <button
              onClick={() => {
                setShowOtpModal(false);
                setOtp(["", "", "", "", "", ""]);
                setError("");
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-6 mt-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Verify OTP</h2>
              <p className="text-gray-500 mt-2">
                Enter the 6-digit code sent to
              </p>
              <p className="text-blue-600 font-semibold">+91 {mobileNumber}</p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                ))}
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifyingOtp}
                className="w-full bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifyingOtp ? "Verifying..." : "Verify & Login"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Didn't receive OTP?{" "}
              <button
                onClick={handleSendOtp}
                className="text-blue-600 font-semibold hover:underline"
              >
                Resend
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Search size={20} className="text-blue-600" />
                Filters
              </h3>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Name or service..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                  <Calendar size={16} />
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                  <Star size={16} />
                  Minimum Rating: {minRating.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={minRating}
                  onChange={(e) => setMinRating(parseFloat(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0.0</span>
                  <span>5.0</span>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                  <DollarSign size={16} />
                  Max Price: ₹{maxPrice}
                </label>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹100</span>
                  <span>₹1000</span>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="rating">Highest Rating</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedDate("");
                  setMinRating(0);
                  setMaxPrice(5000);
                  setSelectedServices([]);
                  setSortBy("rating");
                }}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Servicemen List */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">
                Available Servicemen ({filteredServicemen.length})
              </h3>
            </div>

            {filteredServicemen.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search size={64} className="mx-auto" />
                </div>
                <h4 className="text-xl font-semibold text-gray-700 mb-2">
                  No servicemen found
                </h4>
                <p className="text-gray-500">
                  Try adjusting your filters or selected services
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredServicemen.map((person) => (
                  <Link
                    to={`/serviceman-profile/${person.id}`}
                    key={person.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-300 cursor-pointer"
                  >
                    <div className="p-5">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-md">
                          {person.photo ? (
                            <img
                              src={person.photo}
                              alt={person.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User size={32} className="text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-bold text-gray-800 truncate">
                            {person.name}
                          </h4>
                          <div className="flex items-center gap-1 mt-1">
                            <Star
                              size={16}
                              className="text-yellow-400 fill-yellow-400"
                            />
                            <span className="font-semibold text-gray-700">
                              {person.rating}
                            </span>
                            <span className="text-gray-500 text-sm">
                              ({person.reviews})
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                            <Briefcase size={14} />
                            <span>{person.experience}</span>
                          </div>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            person.available
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {person.available ? "Available" : "Busy"}
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {person.services.map((service, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-1 text-gray-600 text-sm">
                          <MapPin size={14} />
                          <span>{person.location}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">
                            Starting at
                          </div>
                          <div className="text-xl font-bold text-blue-600">
                            ₹{person.price}
                          </div>
                        </div>
                      </div>

                      <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                        <Phone size={18} />
                        Book Now
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
