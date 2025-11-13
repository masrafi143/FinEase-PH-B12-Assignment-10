import React, { useRef, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { signInWithGoogle, signInUser, forgotPassword } = useContext(AuthContext);
  const emailRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordShow = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  // ✅ Check if email already exists in DB
  const checkDuplicateEmail = async (email) => {
    try {
      const res = await fetch(`https://finease-api-server.vercel.app/users?email=${email}`);
      const data = await res.json();
      return data.length > 0; // true if exists
    } catch (err) {
      console.error("Error checking email:", err);
      return false;
    }
  };

  // ✅ Email/Password Login
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;
    if (!passwordPattern.test(password)) {
      setError(
        "❌ Password must include uppercase, lowercase, special character, and be 6+ characters."
      );
      return;
    }

    setError("");
    setSuccess(false);
    signInUser(email, password)
      .then(() => {
        toast.success("✅ Login successful!");
        setSuccess(true);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message);
        toast.error("❌ Invalid email or password!");
      });
  };

  // ✅ Forgot Password
  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    forgotPassword(email)
      .then(() => {
        alert("📩 Please check your email to reset password.");
      })
      .catch((error) => setError(error.message));
  };

  // ✅ Google Sign-In (with DB save)
  const handleGoogleSignIn = async () => {
    signInWithGoogle()
      .then(async (result) => {
        const googleUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };

        // Check if user already exists in DB
        const exists = await checkDuplicateEmail(googleUser.email);

        if (!exists) {
          // Save to DB only if new user
          await fetch("https://finease-api-server.vercel.app/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(googleUser),
          });
          toast.success("✅ New user added to DB via Google!");
        } else {
          toast.info("⚠️ Welcome back!");
        }

        setSuccess(true);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        toast.error("❌ Google Sign-in failed!");
      });
  };

  return (
    <div className="flex justify-center items-center py-10 bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <div className="card-body">
          <h2 className="font-bold text-center text-2xl mb-4">
            Login Your Account
          </h2>

          <form onSubmit={handleLogin}>
            <label className="label">Email</label>
            <input
              name="email"
              ref={emailRef}
              type="email"
              className="input text-gray-600"
              placeholder="Email"
              required
            />

            <label className="label">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="input text-gray-600"
                placeholder="Password"
                required
              />
              <button
                onClick={handleTogglePasswordShow}
                className="btn btn-xs absolute top-2 right-4 md:right-6"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div>
              <a onClick={handleForgetPassword} className="link link-hover">
                Forgot password?
              </a>
            </div>

            {success && <p className="text-green-500">✅ Login successful!</p>}
            {error && <p className="text-red-500">{error}</p>}

            <button className="btn btn-secondary text-white mt-4 w-full">
              Login
            </button>
          </form>

          {/* Google Sign-In Button */}
          <button
            onClick={handleGoogleSignIn}
            className="btn bg-white text-black border border-gray-300 w-full mt-4 flex items-center justify-center gap-2"
          >
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Login with Google
          </button>

          <p className="mt-4 text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500 underline">
              Register
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;