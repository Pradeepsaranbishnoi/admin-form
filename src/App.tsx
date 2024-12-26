import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './lib/store';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import MultiStepForm from './pages/MultiStepForm';

export default function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <MultiStepForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}