import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  redirectTo: string = "",
  requiredAdmin: boolean = false,
  prohibitAdmin: boolean = false
): React.FC<P> => {
  return function ProtectedRoute(props: P) {
    const navigate = useNavigate();
    // TODO: ask ChatGPT: move this to useEffect
    const isUserLoggedIn = localStorage.getItem("userLogin") || null;
    const isUserAdmin = localStorage.getItem("isAdmin") === "true";

    useEffect(() => {
      // const isUserLoggedIn = localStorage.getItem("userLogin") || null;
      // const isUserAdmin = localStorage.getItem("isAdmin") === "true";
      if (
        !isUserLoggedIn ||
        (requiredAdmin && !isUserAdmin) ||
        (prohibitAdmin && isUserAdmin)
      ) {
        navigate(redirectTo);
      }
    }, [isUserLoggedIn, isUserAdmin, navigate]);

    // const isUserLoggedIn = localStorage.getItem("userLogin") || null;
    return isUserLoggedIn ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
