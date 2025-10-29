// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Login = () => {
//   const [currentState, setCurrentState] = useState("Login");
//   const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [contact, setContact] = useState("");

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();

//     try {
//       let response;

//       if (currentState === "Sign Up") {
//         // 🔹 Register new user
//         response = await axios.post(`${backendUrl}/api/user/register`, {
//           name,
//           email,
//           password,
//           contact,
//         });
//       } else {
//         // 🔹 Login existing user
//         response = await axios.post(`${backendUrl}/api/user/login`, {
//           email,
//           password,
//         });
//       }

//       if (response.data.success) {
//         const jwtToken = response.data.token;
//         setToken(jwtToken);
//         localStorage.setItem("token", jwtToken); // ✅ Save token

//         toast.success(
//           currentState === "Sign Up"
//             ? "Account created successfully!"
//             : "Logged in successfully!"
//         );

//         navigate("/"); // ✅ Redirect to profile page
//       } else {
//         toast.error(response.data.message || "Authentication failed!");
//       }
//     } catch (error) {
//       console.error("Auth error:", error);
//       const message = error.response?.data?.message || "Something went wrong!";
//       toast.error(message);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       navigate("/"); // If already logged in, go to home
//     }
//   }, [token, navigate]);

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
//     >
//       {/* Header */}
//       <div className="inline-flex items-center gap-2 mt-10 mb-2">
//         <p className="text-3xl prata-regular">{currentState}</p>
//         <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
//       </div>

//       {/* Name Field (only for signup) */}
//       {currentState === "Sign Up" && (
//         <input
//           onChange={(e) => setName(e.target.value)}
//           value={name}
//           type="text"
//           className="w-full px-3 py-2 border border-gray-800"
//           placeholder="Name"
//           required
//         />
//       )}

//       {/* Email */}
//       <input
//         onChange={(e) => setEmail(e.target.value)}
//         value={email}
//         type="email"
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="Email"
//         required
//       />

//       {/* Password */}
//       <input
//         onChange={(e) => setPassword(e.target.value)}
//         value={password}
//         type="password"
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="Password"
//         required
//       />
//       {currentState === "Sign Up" && (
//         <>
//           {/* Contact Field (only for signup) */}
//           <input
//             onChange={(e) => setContact(e.target.value)}
//             value={contact}
//             type="text"
//             className="w-full px-3 py-2 border border-gray-800"
//             placeholder="Contact"
//             required
//           />
//         </>
//       )}
//       {/* Links */}
//       <div className="flex justify-between w-full text-sm mt-[-8px]">
//         <p className="cursor-pointer">Forgot your password?</p>
//         {currentState === "Login" ? (
//           <p
//             onClick={() => setCurrentState("Sign Up")}
//             className="cursor-pointer"
//           >
//             Create a new account
//           </p>
//         ) : (
//           <p
//             onClick={() => setCurrentState("Login")}
//             className="cursor-pointer"
//           >
//             Login here
//           </p>
//         )}
//       </div>

//       {/* Submit Button */}
//       <button className="px-8 py-2 mt-4 font-light text-white bg-black">
//         {currentState === "Login" ? "Sign In" : "Sign Up"}
//       </button>
//     </form>
//   );
// };

// export default Login;
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [showBlockedModal, setShowBlockedModal] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let response;

      if (currentState === "Sign Up") {
        // 🔹 Register new user
        response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
          contact,
        });
      } else {
        // 🔹 Login existing user
        response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
      }

      if (response.data.success) {
        const jwtToken = response.data.token;
        setToken(jwtToken);
        localStorage.setItem("token", jwtToken); // ✅ Save token

        toast.success(
          currentState === "Sign Up"
            ? "Account created successfully!"
            : "Logged in successfully!"
        );

        navigate("/"); // ✅ Redirect to home page
      } else if (
        response.response?.status === 403 ||
        response.data.message?.includes("blocked")
      ) {
        // 🔹 Show modal if account is blocked
        setShowBlockedModal(true);
      } else {
        toast.error(response.data.message || "Authentication failed!");
      }
    } catch (error) {
      console.error("Auth error:", error);
      const message = error.response?.data?.message || "Something went wrong!";
      if (message.includes("blocked")) setShowBlockedModal(true);
      else toast.error(message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/"); // If already logged in, go to home
    }
  }, [token, navigate]);

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
      >
        {/* Header */}
        <div className="inline-flex items-center gap-2 mt-10 mb-2">
          <p className="text-3xl prata-regular">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        {/* Name Field (only for signup) */}
        {currentState === "Sign Up" && (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name"
            required
          />
        )}

        {/* Email */}
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Email"
          required
        />

        {/* Password */}
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Password"
          required
        />

        {currentState === "Sign Up" && (
          <input
            onChange={(e) => setContact(e.target.value)}
            value={contact}
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Contact"
            required
          />
        )}

        {/* Links */}
        <div className="flex justify-between w-full text-sm mt-[-8px]">
          <p className="cursor-pointer">Forgot your password?</p>
          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer"
            >
              Create a new account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer"
            >
              Login here
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button className="px-8 py-2 mt-4 font-light text-white bg-black">
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>

      {/* Blocked Modal */}
      {showBlockedModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 text-center">
            <h2 className="text-xl font-bold mb-4">Account Blocked</h2>
            <p className="mb-4">
              Your account has been blocked by the admin. Please contact
              support.
            </p>
            <button
              onClick={() => setShowBlockedModal(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default Login;
