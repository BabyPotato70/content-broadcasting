import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import * as authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) throw new Error("useAuth must be used within AuthProvider");

  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      context.dispatch({ type: "LOGIN", payload: data });
      toast.success("Logged in successfully!");
      navigate(
        data.user.role === "teacher"
          ? "/teacher/dashboard"
          : "/principal/dashboard",
      );
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const logout = async () => {
    await authService.logout();
    context.dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return { ...context, login, logout };
};
