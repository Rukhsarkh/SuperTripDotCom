import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircle2Icon, XIcon } from "lucide-react";

const VerificationScreen = () => {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 5) {
      const nextInput = document.querySelector(
        `input[name="code-${index + 1}"]`
      );
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.querySelector(
        `input[name="code-${index - 1}"]`
      );
      if (prevInput) {
        prevInput.focus();
        const newCode = [...verificationCode];
        newCode[index - 1] = "";
        setVerificationCode(newCode);
      }
    }
  };

  const handleResendCode = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${config.API_URL}/user/resend-code`,
        {
          email,
        },
        {
          withCredentials: true,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error resending code");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Email not found. Please try signing up again.");
      return;
    }

    const code = verificationCode.join("");
    if (code.length !== 6) {
      setMessage("Please enter the complete verification code");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${config.API_URL}/user/verify-email`,
        {
          email,
          verificationCode: code,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setMessage(response.data.message);

        toast.success("Welcome to TripGo. You are aheading towards Home page", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progressStyle: {
            background: "#32de84",
          },
          style: {
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            padding: "12px 20px",
            margin: "30px",
            fontSize: "0.95rem",
            color: "#32de84",
          },
          icon: () => <CheckCircle2Icon color="#32de84" size={20} />,
        });
      }

      setTimeout(() => {
        navigate("/explore");
        window.location.reload();
      }, 4000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error verifying code");
      toast.error("Login failed! Try again", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressStyle: {
          background: "#FF033E",
        },
        style: {
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          padding: "12px 20px",
          margin: "30px",
          fontSize: "0.95rem",
          color: "#FF033E",
        },
        icon: () => <XIcon color="#FF033E" size={20} />,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Invalid Access</h2>
          <p className="mb-4">Please sign up first to verify your email.</p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-primary text-white px-4 py-2"
          >
            Go to Sign Up
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 bg-[radial-gradient(circle_at_50%_120%,rgba(239,68,68,0.1),rgba(156,163,175,0.1))]">
      <div className="max-w-md w-full mx-4 space-y-8 p-2 py-4 sm:p-8 bg-white shadow-2xl mt-48 xl:m-20 shadow-gray-400">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Verify Your Email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a verification code to {email}
          </p>
        </div>

        {message && (
          <div
            className={`p-4 ${
              message.includes("Error")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="flex justify-center space-x-2">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                type="text"
                name={`code-${index}`}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl font-semibold border-2 focus:border-primary focus:outline-none"
                maxLength={1}
                pattern="[0-9]"
                inputMode="numeric"
                autoComplete="off"
                required
              />
            ))}
          </div>

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>

            <button
              type="button"
              onClick={handleResendCode}
              disabled={loading}
              className="text-sm text-primary hover:text-primary/80 focus:outline-none"
            >
              Resend Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerificationScreen;
