 
import { useGlobalStore } from "@/global/store";

 
import { useAuthStore } from "./store";
import UserInfoModal from "./component/user-info-modal";

const Auth = () => {
  const {
    data,
    setData,
    clearData,

    login,

    getProfile,
    openInfo,
    infoMsg
   
  } = useAuthStore();
  const { setToasterData } = useGlobalStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await login();

    console.log(res)
    setToasterData({
      open: true,
      message: res?.message,
      severity: res?.severity,
    });
    if (res?.severity === "success") {
      clearData();
    }
    console.log(res?.message);

    //accordin to message show big modal info user popup in auth page
    // if (res?.message?.startsWith("Your Subscription is Inactive")) {
    //   console.log("iam");
    //   setOpenInfo(true);
    // }
  };

  const handleProfile = async () => {
    const res = await getProfile();
    setToasterData({
      open: true,
      message: res?.message,
      severity: res?.severity,
    });
  };

 

  /*
so instead of saving the app user data in local storage we used global store for security reasons
and we used zustand for state management 
and store token in cookies for security reasons cannot accesed by javascript
*/

  // useEffect(() => {
  //   getQr();
  // }, [getQr]);

  // console.log(qr?.qrCode?.data?.qr_code);
  return (
    <div className="min-h-screen w-full p-2 flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-black">
      <div className="bg-gray-900 text-gray-300 p-8 md:p-12 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
          Please Login to Proceed
        </h1>
        <button
          className="text-center text-gray-400 mb-8"
          onClick={handleProfile}
        >
          Login to access your dashboard
        </button>

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email || ""}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password || ""}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition mb-6"
          >
            Login
          </button>
        </form>

       
      </div>

      {openInfo && infoMsg && <UserInfoModal />}
    </div>
  );
};

export default Auth;
