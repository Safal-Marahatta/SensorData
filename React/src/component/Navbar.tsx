// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Settings, Activity, FileDown, LogOut } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';

// function Navbar() {
//   const location = useLocation();
//   const { logout } = useAuth();

//   const isActive = (path: string) => location.pathname === path;

//   const navItems = [
//     { path: '/live-data', icon: Activity, label: 'Live Data' },
//     { path: '/export', icon: FileDown, label: 'Export' },
//     { path: '/settings', icon: Settings, label: 'Settings' },
//   ];

//   return (
//     <nav className="bg-white shadow-lg">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <Link to="/" className="flex items-center">
//               <span className="text-xl font-bold text-blue-600">DAMS</span>
//             </Link>
//           </div>

//           <div className="flex">
//             {navItems.map(({ path, icon: Icon, label }) => (
//               <Link
//                 key={path}
//                 to={path}
//                 className={`inline-flex items-center px-4 h-16 text-sm font-medium border-b-2 transition-colors
//                   ${isActive(path)
//                     ? 'border-blue-500 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-300'
//                   }`}
//               >
//                 <Icon className="h-5 w-5 mr-2" />
//                 {label}
//               </Link>
//             ))}
//             <button
//               onClick={logout}
//               className="inline-flex items-center px-4 h-16 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
//             >
//               <LogOut className="h-5 w-5 mr-2" />
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings, Activity, FileDown, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/live-data', icon: Activity, label: 'Live Data' },
    { path: '/export', icon: FileDown, label: 'Export' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="bg-blue-900 border-b border-blue-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-300">DAMS</span>
            </Link>
          </div>

          <div className="flex items-center">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`inline-flex items-center px-4 h-16 text-sm font-medium border-b-4 transition-colors duration-200
                  ${isActive(path)
                    ? 'border-blue-400 text-white bg-blue-800'
                    : 'border-transparent text-blue-300 hover:text-white hover:bg-blue-800'
                  }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {label}
              </Link>
            ))}
            <button
              onClick={logout}
              className="ml-4 inline-flex items-center px-4 h-16 text-sm font-medium text-blue-300 hover:text-red-400 transition-colors duration-200"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;