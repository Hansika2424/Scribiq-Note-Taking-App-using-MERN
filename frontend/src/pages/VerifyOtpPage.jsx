import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem("pendingEmail");

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otp.trim()) return toast.error("Enter the OTP");
    setLoading(true);
    try {
      const res = await api.post("/auth/verify-otp", { email, otp });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.removeItem("pendingEmail");
      toast.success("Account verified! Welcome 🎉");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.error || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card bg-base-100 w-full max-w-md shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold font-mono text-primary text-center mb-2">ThinkBoard</h1>
          <h2 className="text-xl font-bold mb-1">Verify your email</h2>
          <p className="text-base-content/50 text-sm mb-4">
            We sent a 6-digit OTP to <span className="text-primary">{email}</span>
          </p>
          <form onSubmit={handleVerify} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter OTP"
              className="input input-bordered tracking-widest text-center text-xl"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;