import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa6";
import { useAuth } from "../../hooks/useAuth";

export const GoogleButton = () => {
  const navigate = useNavigate();
  const { isLoading, user, startSessionWithGoogle } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, [user]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <button
        type="button"
        className="w-[150px] h-30 flex items-center justify-center gap-2 mb-5 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-primary duration-200"
        disabled={isLoading}
        onClick={startSessionWithGoogle}
      >
        <FaGoogle fontSize={35} /> <span className="font-light">Google</span>
      </button>

      <p className="w-full flex items-center gap-2 text-gray-400">
        <span className="w-full h-1 bg-gray-200" />Ó
        <span className="w-full h-1 bg-gray-200" />
      </p>
    </div>
  );
};
