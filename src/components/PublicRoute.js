import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import authSelector from 'redux/auth-selector';

export default function PublicRoute({ children, redirectPath, restricted }) {
  const authUser = useSelector(authSelector.getIsAuthenticated);

  if (authUser && restricted) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
}
