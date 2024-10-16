import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getNewAccessTokenThunk } from '../redux/api';

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(getNewAccessTokenThunk());
    }
  }, [isAuthenticated, dispatch]);

  console.log('authenticated :', isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/" />;
}
