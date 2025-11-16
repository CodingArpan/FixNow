import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Save,
  X,
  Check,
  Smartphone,
  ArrowLeft,
  Home,
} from "lucide-react";
import { Link } from "react-router";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifyingPhone, setIsVerifyingPhone] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // User data states
  const [userData, setUserData] = useState({
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "9876543210",
    profileImage: null,
    addresses: [
      {
        id: 1,
        type: "Home",
        street: "123, Shanti Nagar",
        area: "Adajan",
        city: "Surat",
        state: "Gujarat",
        pincode: "395009",
        isDefault: true,
      },
      {
        id: 2,
        type: "Work",
        street: "456, Business Park",
        area: "Vesu",
        city: "Surat",
        state: "Gujarat",
        pincode: "395007",
        isDefault: false,
      },
    ],
  });

  // Edit form states
  const [editData, setEditData] = useState({ ...userData });
  const [newPhone, setNewPhone] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: "Home",
    street: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...userData });
    setError("");
    setSuccess("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...userData });
    setNewPhone("");
    setError("");
    setSuccess("");
  };

  const handlePhoneChange = () => {
    if (!/^[6-9]\d{9}$/.test(newPhone)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    setShowPhoneVerification(true);
    setError("");
    // Send OTP to new phone number
    sendOtpToPhone(newPhone);
  };

  const sendOtpToPhone = async (phone) => {
    try {
      const response = await fetch("YOUR_BACKEND_URL/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: phone }),
      });
      // Handle response
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleVerifyPhone = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter complete 6-digit OTP");
      return;
    }

    setIsVerifyingPhone(true);
    setError("");

    try {
      const response = await fetch("YOUR_BACKEND_URL/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: newPhone, otp: otpString }),
      });

      if (response.ok) {
        setEditData({ ...editData, phone: newPhone });
        setShowPhoneVerification(false);
        setOtp(["", "", "", "", "", ""]);
        setNewPhone("");
        setSuccess("Phone number verified successfully!");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsVerifyingPhone(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError("");

    try {
      const response = await fetch("YOUR_BACKEND_URL/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        setUserData({ ...editData });
        setIsEditing(false);
        setSuccess("Profile updated successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddAddress = () => {
    if (!newAddress.street || !newAddress.city || !newAddress.pincode) {
      setError("Please fill all required address fields");
      return;
    }

    const addressToAdd = {
      ...newAddress,
      id: Date.now(),
    };

    setEditData({
      ...editData,
      addresses: [...editData.addresses, addressToAdd],
    });

    setNewAddress({
      type: "Home",
      street: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
      isDefault: false,
    });
    setShowAddressForm(false);
    setError("");
  };

  const handleRemoveAddress = (id) => {
    setEditData({
      ...editData,
      addresses: editData.addresses.filter((addr) => addr.id !== id),
    });
  };

  const handleSetDefaultAddress = (id) => {
    setEditData({
      ...editData,
      addresses: editData.addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link to="/" className="cursor-pointer" >
          <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-4">
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Dashboard</span>
          </button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Profile Management
          </h1>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-4 flex items-center gap-2">
            <Check size={20} />
            <span>{success}</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-32"></div>

          <div className="px-6 pb-6">
            {/* Profile Image and Actions */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end sm:justify-between gap-4 -mt-16">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
                <div className="w-32 h-32 rounded-full bg-white p-2 shadow-xl">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center overflow-hidden">
                    {userData.profileImage ? (
                      <img
                        src={userData.profileImage}
                        alt={userData.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={64} className="text-white" />
                    )}
                  </div>
                </div>

                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {userData.name}
                  </h2>
                  <p className="text-gray-500">{userData.email}</p>
                </div>
              </div>

              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <Edit2 size={18} />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2 px-6 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2 disabled:opacity-50"
                  >
                    <Save size={18} />
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                </div>
              )}
            </div>

            {/* Personal Information */}
            <div className="mt-8 space-y-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Personal Information
              </h3>

              {/* Name */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User size={24} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{userData.name}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={24} className="text-indigo-600" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">
                      {userData.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={24} className="text-purple-600" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 flex-1">
                          <span className="px-3 py-2 bg-gray-50 text-gray-700 font-medium">
                            +91
                          </span>
                          <input
                            type="tel"
                            value={editData.phone}
                            readOnly
                            className="flex-1 px-3 py-2 outline-none bg-gray-50 cursor-not-allowed"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="tel"
                          value={newPhone}
                          onChange={(e) => setNewPhone(e.target.value)}
                          placeholder="Enter new phone number"
                          maxLength="10"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                        <button
                          onClick={handlePhoneChange}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          Verify
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-800 font-medium">
                      +91 {userData.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Addresses Section */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Saved Addresses
                </h3>
                {isEditing && (
                  <button
                    onClick={() => setShowAddressForm(!showAddressForm)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <Home size={18} />
                    Add Address
                  </button>
                )}
              </div>

              {/* Add Address Form */}
              {showAddressForm && isEditing && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    New Address
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <select
                      value={newAddress.type}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, type: e.target.value })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Other">Other</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Street Address *"
                      value={newAddress.street}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, street: e.target.value })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Area/Locality"
                      value={newAddress.area}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, area: e.target.value })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="City *"
                      value={newAddress.city}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, city: e.target.value })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={newAddress.state}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, state: e.target.value })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Pincode *"
                      value={newAddress.pincode}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          pincode: e.target.value,
                        })
                      }
                      maxLength="6"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <input
                      type="checkbox"
                      id="defaultAddress"
                      checked={newAddress.isDefault}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          isDefault: e.target.checked,
                        })
                      }
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                    <label
                      htmlFor="defaultAddress"
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      Set as default address
                    </label>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={handleAddAddress}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Add Address
                    </button>
                    <button
                      onClick={() => setShowAddressForm(false)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Address List */}
              <div className="space-y-3">
                {(isEditing ? editData.addresses : userData.addresses).map(
                  (address) => (
                    <div
                      key={address.id}
                      className={`border-2 rounded-xl p-4 transition-all ${
                        address.isDefault
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin size={20} className="text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-gray-800">
                                {address.type}
                              </span>
                              {address.isDefault && (
                                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-gray-700 text-sm">
                              {address.street}
                              {address.area && `, ${address.area}`}
                            </p>
                            <p className="text-gray-700 text-sm">
                              {address.city}
                              {address.state && `, ${address.state}`} -{" "}
                              {address.pincode}
                            </p>
                          </div>
                        </div>
                        {isEditing && (
                          <div className="flex gap-2">
                            {!address.isDefault && (
                              <button
                                onClick={() =>
                                  handleSetDefaultAddress(address.id)
                                }
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                              >
                                Set Default
                              </button>
                            )}
                            <button
                              onClick={() => handleRemoveAddress(address.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phone Verification Modal */}
      {showPhoneVerification && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => {
                setShowPhoneVerification(false);
                setOtp(["", "", "", "", "", ""]);
                setError("");
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Verify Phone Number
              </h2>
              <p className="text-gray-500 mt-2">
                Enter the 6-digit code sent to
              </p>
              <p className="text-blue-600 font-semibold">+91 {newPhone}</p>
            </div>

            <div className="space-y-4">
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

              <button
                onClick={handleVerifyPhone}
                disabled={isVerifyingPhone}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {isVerifyingPhone ? "Verifying..." : "Verify & Update"}
              </button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-4">
              Didn't receive OTP?{" "}
              <button
                onClick={() => sendOtpToPhone(newPhone)}
                className="text-blue-600 font-semibold hover:underline"
              >
                Resend
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
