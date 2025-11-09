import React, { use, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { signInWithGoogle, createUser, setPhotoUrl } = use(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // const name = e.target.name.value;
    const photo = e.target.photo.value;
    setPhotoUrl(photo);
    // const terms = e.target.terms.checked;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;
    if (!passwordPattern.test(password)) {
      setError(
        "❌ Password must be at least 6 characters long and include at least one uppercase, one lowercase, and one special character."
      );
      return;
    }
    // reset status: success or error
    setError("");
    setSuccess(false);
    // email-pass auth
    createUser(email, password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        // console.log(result.user);
        toast.success("Register Successfull !");
        navigate("/");
      })
      .catch((error) => {
        // console.log(error);
        setError(error.message);
        toast.error(error.message);
      });
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordShow = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center py-10 bg-base-200">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h2 className="font-bold text-center text-2xl">
            Register your account
          </h2>
          <form onSubmit={handleRegister}>
            <fieldset className="fieldset">
              {/* name */}
              <label className="label">Name</label>
              <input
                name="name"
                type="text"
                className="input text-gray-600"
                placeholder="Name"
                required
              />
              {/* photo url */}
              <label className="label">Photo URL</label>
              <input
                name="photo"
                type="text"
                className="input text-gray-600"
                placeholder="Photo URL"
                required
              />
              {/* email */}
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                className="input text-gray-600"
                placeholder="Email"
                required
              />
              {/* password */}
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
                  className="btn btn-xs absolute top-2 right-6 z-10"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {/* terms & conditions */}
              <label className="label">
                <input type="checkbox" className="checkbox my-2" />
                Accept Terms & Conditions
              </label>
              {success && (
                <p className="text-green-500">Account created successfully</p>
              )}
              {error && <p className="text-red-500">{error}</p>}
              <button className="btn btn-secondary text-white">Register</button>
              {/* Sign in with Google */}
              <button
                onClick={handleGoogleSignIn}
                className="btn bg-white text-black border-[#e5e5e5]"
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
                Login with Google
              </button>
              <p>
                Already Have An Account?{" "}
                <Link
                  to={"/login"}
                  className="text-blue-500 underline text-center"
                >
                  Login
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
