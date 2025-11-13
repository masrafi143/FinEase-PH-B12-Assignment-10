import React, { useState, use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, signInWithGoogle, fetchDbUser } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  // Check if email exists in DB
  const checkDuplicateEmail = async (email) => {
    try {
      const res = await fetch(
        `https://finease-server-c7jy.onrender.com/users?email=${email}`
      );
      const data = await res.json();
      return data.length > 0;
    } catch (err) {
      console.error("Error checking email:", err);
      return false;
    }
  };

  // Email & Password registration
  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photo = e.target.photo.value;

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;
    if (!passwordPattern.test(password)) {
      setError(
        "❌ Password must be at least 6 characters long, include uppercase, lowercase, and special character."
      );
      return;
    }

    setError("");
    // setPhotoUrl(photo);

    const exists = await checkDuplicateEmail(email);
    if (exists) {
      setError("❌ This email is already registered!");
      return;
    }

    createUser(email, password)
      .then(() => {
        const newUser = { name, email, image: photo };
        fetch("https://finease-server-c7jy.onrender.com/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then(async (data) => {
            await fetchDbUser(email);
            toast.success("Account created successfully!");
            navigate("/");
          });
      })
      .catch((err) => setError(err.message));
  };

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    signInWithGoogle()
      .then(async (result) => {
        const googleUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };
        const exists = await checkDuplicateEmail(googleUser.email);
        if (exists) {
          toast.info("You are already registered!");
          navigate("/");
          return;
        }

        fetch("https://finease-server-c7jy.onrender.com/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(googleUser),
        }).then((res) => res.json());
        await fetchDbUser(googleUser.email);
        toast.success("Account created successfully via Google!");
        navigate("/");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="flex justify-center items-center py-10">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <div className="card-body">
          <h2 className="font-bold text-center text-2xl mb-4">
            Register Your Account
          </h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <form onSubmit={handleRegister}>
            <label className="label">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="input"
              required
            />

            <label className="label">Photo URL</label>
            <input
              name="photo"
              type="text"
              placeholder="Photo URL"
              className="input"
              required
            />

            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input"
              required
            />

            <label className="label">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input"
                required
              />
              <button
                onClick={togglePassword}
                className="btn btn-xs absolute top-2 right-4 md:right-6 z-50"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              className="btn btn-secondary text-white mt-4 w-full"
            >
              Register
            </button>
          </form>

          <button
            onClick={handleGoogleSignIn}
            className="btn mt-4 w-full bg-white text-black border border-gray-300 flex items-center justify-center gap-2"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Sign in with Google
          </button>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
