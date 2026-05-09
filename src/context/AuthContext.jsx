import { createContext, useReducer, useEffect } from 'react';
import { getCurrentUser } from '../services/auth.service';

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload.user, token: action.payload.token, isAuthenticated: true };
    case 'LOGOUT':
      return { user: null, token: null, isAuthenticated: false };
    case 'LOAD_USER':
      return { 
        user: action.payload.user, 
        token: localStorage.getItem('cbs_token'), 
        isAuthenticated: !!action.payload.user 
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null, token: null, isAuthenticated: false
  });

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      dispatch({ type: 'LOAD_USER', payload: { user } });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};