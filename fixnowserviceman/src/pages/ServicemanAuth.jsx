import { useState } from "react";
import {
  Phone,
  ArrowRight,
  User,
  Mail,
  MapPin,
  Camera,
  FileText,
  Check,
  X,
  ArrowLeft,
  Shield,
} from "lucide-react";

const ServicemanAuth = () => {
  const [currentStep, setCurrentStep] = useState("login");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpPurpose, setOtpPurpose] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");

  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    profession: "",
    experience: "",
    selfiePhoto: null,
    govIdPhoto: null,
  });

  const existingServicemen = ["+919876543210", "+919876543211"];

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    const fullNumber = `+91${mobileNumber}`;

    if (existingServicemen.includes(fullNumber)) {
      alert(`OTP sent to ${fullNumber}`);
      setOtpPurpose("login");
      setCurrentStep("otp-verify");
    } else {
      setRegistrationData({ ...registrationData, mobile: fullNumber });
      setCurrentStep("register");
    }
  };

  const handlePhotoUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRegistrationData({ ...registrationData, [field]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (
      !registrationData.name ||
      !registrationData.email ||
      !registrationData.address ||
      !registrationData.profession ||
      !registrationData.selfiePhoto ||
      !registrationData.govIdPhoto
    ) {
      setError("Please fill all required fields and upload photos");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registrationData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    alert(
      `OTP sent to ${registrationData.mobile} and ${registrationData.email}`
    );
    setOtpPurpose("registration");
    setCurrentStep("otp-verify");
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

  const handleVerifyOtp = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter complete 6-digit OTP");
      return;
    }

    setIsVerifying(true);
    setError("");

    setTimeout(() => {
      if (otpPurpose === "registration") {
        alert("Registration successful! Welcome to Serviceman Portal");
      } else {
        alert("Login successful!");
      }
      setCurrentStep("dashboard");
      setIsVerifying(false);
    }, 1000);
  };

  const handleResendOtp = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    const number =
      otpPurpose === "login" ? `+91${mobileNumber}` : registrationData.mobile;
    alert(`OTP resent to ${number}`);
  };

  const renderLogin = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            Serviceman Portal
          </h1>
          <p className="text-gray-600 mt-2">Login to access your dashboard</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mobile Number
            </label>
            <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
              <span className="px-4 py-3 bg-gray-50 text-gray-700 font-medium border-r-2 border-gray-300">
                +91
              </span>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="9876543210"
                maxLength="10"
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
            onClick={handleLoginSubmit}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            Verify Mobile Number
            <ArrowRight size={20} />
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );

  const renderRegistration = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => {
            setCurrentStep("login");
            setMobileNumber("");
            setError("");
          }}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Login</span>
        </button>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
            <p className="text-gray-600 mt-2">Register as a serviceman</p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Personal Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={registrationData.name}
                    onChange={(e) =>
                      setRegistrationData({
                        ...registrationData,
                        name: e.target.value,
                      })
                    }
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={registrationData.email}
                    onChange={(e) =>
                      setRegistrationData({
                        ...registrationData,
                        email: e.target.value,
                      })
                    }
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={registrationData.mobile}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Profession *
                  </label>
                  <input
                    type="text"
                    value={registrationData.profession}
                    onChange={(e) =>
                      setRegistrationData({
                        ...registrationData,
                        profession: e.target.value,
                      })
                    }
                    placeholder="e.g., Electrician, Plumber, AC Technician"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Experience
                  </label>
                  <input
                    type="text"
                    value={registrationData.experience}
                    onChange={(e) =>
                      setRegistrationData({
                        ...registrationData,
                        experience: e.target.value,
                      })
                    }
                    placeholder="e.g., 5 years"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    value={registrationData.address}
                    onChange={(e) =>
                      setRegistrationData({
                        ...registrationData,
                        address: e.target.value,
                      })
                    }
                    placeholder="Enter your complete address"
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Document Upload
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Selfie Photo *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {registrationData.selfiePhoto ? (
                      <div className="relative">
                        <img
                          src={registrationData.selfiePhoto}
                          alt="Selfie"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setRegistrationData({
                              ...registrationData,
                              selfiePhoto: null,
                            })
                          }
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <Camera
                          size={48}
                          className="mx-auto text-gray-400 mb-2"
                        />
                        <p className="text-sm text-gray-600 mb-2">
                          Click to upload selfie
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handlePhotoUpload(e, "selfiePhoto")}
                          className="hidden"
                        />
                        <span className="text-xs text-gray-500">
                          JPG, PNG (Max 5MB)
                        </span>
                      </label>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Government ID *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {registrationData.govIdPhoto ? (
                      <div className="relative">
                        <img
                          src={registrationData.govIdPhoto}
                          alt="Government ID"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setRegistrationData({
                              ...registrationData,
                              govIdPhoto: null,
                            })
                          }
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <FileText
                          size={48}
                          className="mx-auto text-gray-400 mb-2"
                        />
                        <p className="text-sm text-gray-600 mb-2">
                          Click to upload ID
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handlePhotoUpload(e, "govIdPhoto")}
                          className="hidden"
                        />
                        <span className="text-xs text-gray-500">
                          Aadhaar, PAN, Driving License
                        </span>
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleRegistrationSubmit}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Create Account
              <Check size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOtpVerification = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <button
          onClick={() => {
            setCurrentStep(otpPurpose === "login" ? "login" : "register");
            setOtp(["", "", "", "", "", ""]);
            setError("");
          }}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back</span>
        </button>

        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Verify OTP</h1>
          <p className="text-gray-600 mt-2">Enter the 6-digit code sent to</p>
          <p className="text-blue-600 font-semibold">
            {otpPurpose === "login"
              ? `+91${mobileNumber}`
              : registrationData.mobile}
          </p>
          {otpPurpose === "registration" && (
            <p className="text-blue-600 font-semibold">
              and {registrationData.email}
            </p>
          )}
        </div>

        <div className="space-y-6">
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
            onClick={handleVerifyOtp}
            disabled={isVerifying}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isVerifying ? "Verifying..." : "Verify & Continue"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Didn't receive OTP?{" "}
            <button
              onClick={handleResendOtp}
              className="text-blue-600 font-semibold hover:underline"
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={48} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {otpPurpose === "registration"
            ? "Registration Successful!"
            : "Login Successful!"}
        </h1>
        <p className="text-gray-600 mb-8">
          Welcome to Serviceman Portal. You can now access your dashboard.
        </p>
        <button
          onClick={() => alert("Redirecting to dashboard...")}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );

  switch (currentStep) {
    case "login":
      return renderLogin();
    case "register":
      return renderRegistration();
    case "otp-verify":
      return renderOtpVerification();
    case "dashboard":
      return renderDashboard();
    default:
      return renderLogin();
  }
};

export default ServicemanAuth;
