import { Navigate, Outlet } from 'react-router-dom';

const ProtectedAdminRoutes = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const auth = { token: false };

    if (user) {
        if (user.role === 'admin') {
            auth.token = true;
        }
    }

    return (
        auth.token ? <Outlet /> : <Navigate to='/login' />
    );
};

export default ProtectedAdminRoutes;
