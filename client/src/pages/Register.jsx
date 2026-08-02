import { Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate= useNavigate();

const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const { response, data } = await registerUser(
      name,
      email,
      password
    );

    console.log(data);

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert("Registration successful");

    setName("");
    setEmail("");
    setPassword("");

    navigate("/");

  } catch (error) {
    console.error("Registration error:", error);
  }
};

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Heading */}
        <div className="text-center mb-8">

          <div className="w-14 h-14 bg-indigo-600 text-white rounded-xl flex items-center justify-center mx-auto mb-4">
            <LockKeyhole size={28} />
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            Create Account
          </h1>

          <p className="text-slate-500 mt-2">
            Create your account to start managing your notes
          </p>

        </div>


        {/* Register Form */}
        <form className="space-y-5"
        onSubmit={handleRegister}>

          {/* Name */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Full Name
            </label>

            <div className="relative">

              <User
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={name}
                onChange={(e)=>{setName(e.target.value) }}
                placeholder="Enter your name"
                className="w-full border border-slate-300 rounded-lg py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />

            </div>

          </div>


          {/* Email */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>

            <div className="relative">

              <Mail
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-slate-300 rounded-lg py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />

            </div>

          </div>


          {/* Password */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>

            <div className="relative">

              <LockKeyhole
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full border border-slate-300 rounded-lg py-3 pl-10 pr-12 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>


          {/* Confirm Password */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Confirm Password
            </label>

            <div className="relative">

              <LockKeyhole
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="w-full border border-slate-300 rounded-lg py-3 pl-10 pr-12 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>


          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Create Account
          </button>

        </form>


        {/* Login Link */}
        <p className="text-center text-sm text-slate-500 mt-6">

          Already have an account?{" "}

          <Link
            to="/"
            className="text-indigo-600 font-semibold hover:text-indigo-700"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

