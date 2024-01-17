import { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  interface FormEvent extends React.FormEvent<HTMLFormElement> {
    target: HTMLFormElement & {
      email: {
        value: string;
      };
      password: {
        value: string;
      };
    };
  }
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    // FIXME: this s null need to be fixed
    const password = formData.get("password");
    console.log(`Email:${email} password:${password}`);
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div>
          <img src="./logo.png" alt="" />
          <h1 className="text-3xl font-bold">LOGIN</h1>
          <p className="text-[#525252]">
            How to get started lorem ipsum dolor at?
          </p>
          <form onSubmit={handleLogin}>
            <div className="relative mb-4">
              <FaUser className="absolute left-3 top-[14px] text-[#1C1C1C] text-lg" />
              <input
                className="bg-[#F0EDFFCC] pl-10 pr-12 py-4 rounded-2xl text-xs text-[#1C1C1C] w-64"
                type="text"
                placeholder="Username"
                name="email"
              />
            </div>
            <div className="relative mb-4">
              <FaLock className="absolute left-3 top-[14px] text-[#1C1C1C] text-lg" />
              <input
                className="bg-[#F0EDFFCC] pl-10 pr-12 py-4 rounded-2xl text-xs text-[#1C1C1C] w-64"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                name="password"
                className="absolute right-3 top-2">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-full">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
