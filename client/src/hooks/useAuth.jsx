import { AuthContext } from '@/providers/AuthProvider';
import { use } from 'react';

const useAuth = () => {
    const authInfo = use(AuthContext);
    return authInfo
};

export default useAuth;