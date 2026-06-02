import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {

	const isAuthenticated = true;
	//check if user is logged in
	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}
	return children;
}

export default ProtectedRoute;
