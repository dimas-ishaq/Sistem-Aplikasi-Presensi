import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNewAccessTokenThunk } from '../redux/api';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector(state => state.auth);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      dispatch(getNewAccessTokenThunk());
    }
  }, [isAuthenticated, loading, dispatch, navigate]);


  if (loading) {
    return (
      <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
        <Spinner animation='border' />
      </div>
    );
  }

  if (isAuthenticated) {
    return children;
  }

  return null; // Jika tidak loading dan tidak authenticated, tidak menampilkan apapun.
}
