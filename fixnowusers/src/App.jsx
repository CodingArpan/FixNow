import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router";
import UserDashboard from "./pages/UserDashboard.jsx";
import ServicemanProfile from "./pages/ServiceManProfile.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import UserOrders from "./pages/UserOrders.jsx";
import UserTransactions from "./pages/UserTransactions.jsx";
// import LoginPage from "./components/auth/LoginPage";
// import OTPPage from "./components/auth/OtpPage";
// import RegisterPage from "./components/auth/RegisterPage";
// import DashboardPage from "./components/Dashboard";
// import { Phone, ArrowRight, User, Mail, Home, Shield } from "lucide-react";
// const App = () => {
//   const [currentPage, setCurrentPage] = useState("login");
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [address, setAddress] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [fromRegister, setFromRegister] = useState(false);

//   // Simulate API call to check if mobile exists
//   const checkMobileExists = async (mobile) => {
//     setLoading(true);
//     setError("");
//     if (fromRegister){ 
//       setCurrentPage("otp");
//     }else{
//       setCurrentPage("register"); 
//     }
//     setInterval(() => {
//       setLoading(false);
//     }, 1000);
//   };

//   // Simulate OTP verification
//   const verifyOTP = async () => {
//     setLoading(true);
//     setError("");

//     const otpValue = otp.join("");

//     setInterval(() => {
//       setLoading(false);
//       if (otpValue === "123456") {
//         if (fromRegister) {
//           setCurrentPage("dashboard");
//         } else {
//           const isRegistered = false; // Simulated check
//           if (isRegistered) {
//             setCurrentPage("dashboard");
//           } else {
//             setCurrentPage("register");
//           }
//         }
//       } else {
//         setError("Invalid OTP. Please try again.");
//       }
//     }, 2000);
//   };

//   // Handle registration
//   const handleRegister = () => {
//     if (!name || !email || !address) {
//       setError("Please fill all fields");
//       return;
//     }
//     setFromRegister(true);
//     setCurrentPage("otp");
//   };

//   // Handle OTP input
//   const handleOtpChange = (index, value) => {
//     if (value.length > 1) value = value[0];
//     if (!/^\d*$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 5) {
//       document.getElementById(`otp-${index + 1}`)?.focus();
//     }
//   };

//   const handleOtpKeyDown = (index, e) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       document.getElementById(`otp-${index - 1}`)?.focus();
//     }
//   };

//   return (
//     <>
//       {currentPage === "login" && (
//         <LoginPage
//           error={error}
//           mobileNumber={mobileNumber}
//           setMobileNumber={setMobileNumber}
//           loading={loading}
//           checkMobileExists={checkMobileExists}
//         />
//       )}
//       {currentPage === "otp" && (
//         <OTPPage
//           error={error}
//           mobileNumber={mobileNumber}
//           otp={otp}
//           setOtp={setOtp}
//           loading={loading}
//           verifyOTP={verifyOTP}
//           handleOtpChange={handleOtpChange}
//           handleOtpKeyDown={handleOtpKeyDown} 
//         />
//       )}
//       {currentPage === "register" && (
//         <RegisterPage
//           error={error}
//           name={name}
//           setName={setName}
//           email={email}
//           setEmail={setEmail}
//           address={address}
//           setAddress={setAddress}
//           handleRegister={handleRegister}
//         />
//       )}
//       {currentPage === "dashboard" && <DashboardPage
//         mobileNumber={mobileNumber}
//         name={name}
//         email={email}
//         address={address}
//         setCurrentPage={setCurrentPage}
//         setMobileNumber={setMobileNumber}
//         setOtp={setOtp}
//         setName={setName}
//         setEmail={setEmail}
//         setAddress={setAddress}
//         setError={setError}
//         setFromRegister={setFromRegister}
//         fromRegister={fromRegister}
//       />}
//     </>
//   );
// };

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UserDashboard />} />
      <Route
        path="/serviceman-profile/:man_id"
        element={<ServicemanProfile />}
      />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/user-orders" element={<UserOrders />} />
      <Route path="/user-transactions" element={<UserTransactions />} />

      {/* <Route path="/login" element={<LoginPage />} /> */}
      {/* <Route path="/otp" element={<OTPPage />} /> */}
      {/* <Route path="/register" element={<RegisterPage />} /> */}
    </Routes>
  );
}

export default App;
