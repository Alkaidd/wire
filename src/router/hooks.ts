import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "./routes";

export const useRouter = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentRoute = routes.find((route) => route.path === location.pathname);

  return {
    location,
    navigate,
    currentRoute,
    routes,
  };
};
