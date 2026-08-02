import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {loginUser} from "../services/authService"

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate= useNavigate();


const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const { response, data } = await loginUser(
      email,
      password
    );

    console.log(data);

    if (!response.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem("token", data.token);

    alert("Login successful");

    setEmail("");
    setPassword("");
    localStorage.setItem(
  "user",
  JSON.stringify(data.user)
);

    navigate("/dashboard");

  } catch (error) {
    console.error("Login error:", error);
  }
};

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Logo / Heading */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-indigo-600 text-white rounded-xl flex items-center justify-center mx-auto mb-4">
            <LockKeyhole size={28} />
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            Secure Notes
          </h1>

          <p className="text-slate-500 mt-2">
            Sign in to access your notes
          </p>
        </div>


        {/* Login Form */}
        <form className="space-y-5"
        onSubmit={handleLogin}>

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
                placeholder="Enter your password"
                className="w-full border border-slate-300 rounded-lg py-3 pl-10 pr-12 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />

        

              <button
              type="button"
              onClick={()=>setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword? (<Eye size={20}/>):<EyeOff size={20}/>}
              </button>
            </div>
          </div>


          {/* Remember Me */}
          <div className="flex items-center justify-between">

            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                className="w-4 h-4 accent-indigo-600"
              />

              Remember me
            </label>

            <button
              type="button"
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              Forgot password?
            </button>

          </div>


          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </button>

        </form>


        {/* Register Link */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:text-indigo-700"
          >
            Create an account
          </Link>
        </p>

      </div>
    </div>
  );
}

