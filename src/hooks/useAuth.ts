import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../lib/store';
import { setCredentials, logout } from '../features/auth/authSlice';
import { api } from '../lib/api';

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.login(email, password);
      dispatch(setCredentials(response));
      navigate('/');
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      };
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return {
    isAuthenticated,
    user,
    login,
    logout: handleLogout
  };
}