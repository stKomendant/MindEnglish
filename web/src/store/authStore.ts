import {create} from 'zustand';
import axios from 'axios';

axios.defaults.withCredentials = true;

const API_URL = 'http://localhost:3000/auth';

export interface AuthState {
    isAuthenticated: boolean;
    user: {id: string; username: string; email: string} | null;
    isCheckingAuth: boolean;
    isLoading: boolean;
    error: string | null;

    signup: (username: string, email: string, password: string) => Promise<void>;
    verifyEmail: (code: string) => Promise<void>;
    checkAuth: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, password: string) => Promise<void>;
}

const useAuthStore = create<AuthState>(
    (set: (state: Partial<AuthState>) => void) => ({
        isAuthenticated: false,
        user: null,
        isCheckingAuth: true,
        isLoading: false,
        error: null,
   
   signup: async (username: string, email: string, password: string) => {
set({isLoading: true, error: null})

try{
    const response = await axios.post(`${API_URL}/signup`, {username, email, password});
    set({isLoading: false, user: response.data.user, error: null});
}
catch (error) {
    set({isLoading: false, error: 'Failed to sign up'});
    throw error;
}
   },

verifyEmail: async(code: string) => {
set({isLoading: true, error: null})

try{
    const response = await axios.post(`${API_URL}/verify-email`, {code})

    set({isLoading: false, user: response.data.user, error: null});
}catch (error) {
    set({isLoading: false, error: 'Failed to verify email'});
    throw error;
}
},

checkAuth: async() => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate a delay
set({isCheckingAuth: true, error: null})

try{
    const response = await axios.get(`${API_URL}/check-auth`);
    set({isAuthenticated: true, user: response.data.user, isCheckingAuth: false, error: null});
}
catch{
    set({isAuthenticated: false, error: 'Failed to check authentication', isCheckingAuth: false});
}
},

login: async(email: string, password: string) => {
set({isLoading: true, error: null})

try{
    const response = await axios.post(`${API_URL}/login`, {email, password});
    set({isLoading: false, isAuthenticated: true, user: response.data.user, error: null});
}
catch{
    set({isLoading: false, error: 'Failed to login'});
}
},

logout: async() => {
set({isLoading: true, error: null})

try{
    await axios.post(`${API_URL}/logout`);
    set({isLoading: false, isAuthenticated: false, user: null, error: null});
}
catch{
    set({isLoading: false, error: 'Failed to logout'});
}
}, 

forgotPassword: async(email: string) => {
set({isLoading: true, error: null})

try{
    await axios.post(`${API_URL}/forgot-password`, {email});
    set({isLoading: false, error: null});
}
catch{
    set({isLoading: false, error: 'Failed to send reset link'});
}
},

resetPassword: async(token: string, password: string) => {
set({isLoading: true, error: null})

try{
    await axios.post(`${API_URL}/reset-password/${token}`, {password});
    set({isLoading: false, error: null});
}
catch (error){
    set({isLoading: false, error: 'Failed to reset password'});
    throw error;
}
}
    })

)

export default useAuthStore;