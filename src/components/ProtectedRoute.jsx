import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector(state => state.auth)
  console.log('authenticated :', isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/" />;
}