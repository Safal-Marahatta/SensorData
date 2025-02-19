// import React, { useState } from 'react';
// import { Lock, User, Eye, EyeOff } from 'lucide-react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Prepare data as URL-encoded form data (required by OAuth2PasswordRequestForm)
//     const formData = new URLSearchParams();
//     formData.append('username', username);
//     formData.append('password', password);

//     try {
//       const response = await fetch('http://localhost:8000/token', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: formData.toString(),
//       });
      
//       if (!response.ok) {
//         // You can handle error messages from the backend here.
//         const errorData = await response.json();
//         setError(errorData.detail || 'Login failed');
//         return;
//       }
      
//       const data = await response.json();
//       console.log('Login successful:', data);
      
//       // Store the token in localStorage (or any other state management solution)
//       localStorage.setItem('accessToken', data.access_token);
      
//       // Optionally, redirect the user to a protected route or update your UI
//       // For example, if using react-router:
//       // history.push('/dashboard');
      
//       setError(null);
//       navigate('/');
//     } catch (err) {
//       console.error('Error during login:', err);
//       setError('An unexpected error occurred');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-600 to-gray-800 flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
//             Data Acquisition and
//           </h1>
//           <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
//             Management Software
//           </h1>
//           <span className="inline-block px-4 py-1 rounded-full bg-gray-500 text-white text-xl font-semibold">
//             DAMS
//           </span>
//         </div>
        
//         <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {error && (
//               <div className="text-red-600 text-sm">
//                 {error}
//               </div>
//             )}
//             <div className="space-y-2">
//               <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//                 Username
//               </label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <User className="h-5 w-5 text-gray-600" />
//                 </div>
//                 <input
//                   id="username"
//                   type="text"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="block w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl 
//                     focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent
//                     transition-all duration-200 ease-in-out
//                     group-hover:border-gray-400"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-gray-600" />
//                 </div>
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="block w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl
//                     focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent
//                     transition-all duration-200 ease-in-out
//                     group-hover:border-gray-400"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5" />
//                   ) : (
//                     <Eye className="h-5 w-5" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl
//                 text-sm font-semibold text-white bg-gradient-to-r from-gray-600 to-gray-700
//                 hover:from-gray-700 hover:to-gray-800
//                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
//                 transform transition-all duration-200 ease-in-out
//                 hover:scale-[1.02] active:scale-[0.98]
//                 shadow-lg hover:shadow-xl"
//             >
//               Sign in
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


// Login.tsx
import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare data as URL-encoded form data (required by OAuth2PasswordRequestForm)
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await fetch('http://localhost:8000/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });
      console.log(formData.toString())
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail || 'Login failed');
        return;
      }
      
      const data = await response.json();
      console.log('Login successful:', data);
      
      // Store the token in localStorage (or any other state management solution)
      localStorage.setItem('accessToken', data.access_token);
      
      // Assume the API returns a role; if not, default to 'user'
      const role = data.role ? data.role : 'user';
      console.log(role)
      // Update the authentication context with the logged-in user info
      setUser({ username, role });

      setError(null);
      navigate('/');
    } catch (err) {
      console.error('Error during login:', err);
      setError('An unexpected error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-600 to-gray-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Data Acquisition and
          </h1>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Management Software
          </h1>
          <span className="inline-block px-4 py-1 rounded-full bg-gray-500 text-white text-xl font-semibold">
            DAMS
          </span>
        </div>
        
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="text-red-600 text-sm">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl 
                    focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent
                    transition-all duration-200 ease-in-out
                    group-hover:border-gray-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-600" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent
                    transition-all duration-200 ease-in-out
                    group-hover:border-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl
                text-sm font-semibold text-white bg-gradient-to-r from-gray-600 to-gray-700
                hover:from-gray-700 hover:to-gray-800
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                transform transition-all duration-200 ease-in-out
                hover:scale-[1.02] active:scale-[0.98]
                shadow-lg hover:shadow-xl"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
