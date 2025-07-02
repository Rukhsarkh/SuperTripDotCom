import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MainScreen from "../components/MainScreen";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircle2Icon, XIcon } from "lucide-react";

// Validation Schema
const SignUpValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
});

const SignUpScreen = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const response = await axios.post(
        `${config.API_URL}/user/sign-up`,
        values,
        {
          withCredentials: true,
        }
      );

      navigate("/explore");

      toast.success(`Welcome ! ${response.data.user.username}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressStyle: { background: "#32de84" },
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

      setTimeout(() => {
        window.location.reload();
      }, 5000);

      // if (response.data.success) {
      //   setStatus("Sign up successful! Please verify your email.");
      //   navigate("/verify", { state: { email: values.email } });
      // }
    } catch (error) {
      setStatus(error.response?.data?.message || "Error signing up");
      toast.error(
        error.response?.data?.message ||
          "Listing Creation Failed. Please try again !",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progressStyle: { background: "#FF033E" },
          style: {
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            padding: "12px 20px",
            margin: "30px",
            fontSize: "0.95rem",
            color: "#FF033E",
          },
          icon: () => <XIcon color="#FF033E" size={20} />,
        }
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = `${config.API_URL}/auth/google`;
  };

  return (
    <div className="lg:h-screen lg:w-screen lg:overflow-hidden flex items-center justify-center bg-[radial-gradient(circle_at_50%_120%,rgba(239,68,68,0.1),rgba(156,163,175,0.1))] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full lg:w-1/2 max-w-md -mt-14">
          <MainScreen title="Sign Up">
            <div className="bg-white shadow-2xl px-8 py-4 mt-2 shadow-gray-500">
              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  password: "",
                }}
                validationSchema={SignUpValidationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, status }) => (
                  <Form className="space-y-6">
                    {status && (
                      <div className="mb-6 p-4 bg-green-100 text-green-700">
                        {status}
                      </div>
                    )}

                    {/* Username Field */}
                    <div>
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Username
                      </label>
                      <Field
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your name"
                        className="mt-1 block w-full border-b-2 border-gray-300 py-2 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none text-lg transition-colors duration-200"
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        placeholder="yusuf@example.com"
                        className="mt-1 block w-full border-b-2 border-gray-300 py-2 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none text-lg transition-colors duration-200"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Password Field */}
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Create a password"
                        className="mt-1 block w-full border-b-2 border-gray-300 py-2 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none text-lg transition-colors duration-200"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-essential flex items-center justify-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-white rounded-full"></div>
                      ) : (
                        "Sign Up"
                      )}
                    </button>
                  </Form>
                )}
              </Formik>
              <div className="flex flex-col gap-4">
                <button
                  type="button"
                  className="btn-essential-google flex items-center justify-center mt-1 flex-inline gap-2"
                  onClick={handleGoogleSignUp}
                >
                  <p>Sign Up With Google</p>
                  <img src="../google-logo.png" className="w-6 h-6" />
                </button>
                <p className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="text-primary hover:text-primary/80 font-medium focus:outline-none transition-colors duration-200"
                  >
                    Log in
                  </button>
                </p>
              </div>
            </div>
          </MainScreen>
        </div>

        <div className="hidden lg:block w-1/2 pl-12">
          <img
            src="../Signup.svg"
            alt="Signup Illustration"
            className="w-full lg:scale-125 max-w-lg mx-auto mt-20"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;
