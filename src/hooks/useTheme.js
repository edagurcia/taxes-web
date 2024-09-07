import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features";

export const useTheme = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.app);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return {
    theme,
    handleToggleTheme,
  };
};
