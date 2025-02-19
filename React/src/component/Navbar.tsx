// // import React from 'react';
// // import { Link, useLocation } from 'react-router-dom';
// // import { Settings, Activity, FileDown, LogOut } from 'lucide-react';
// // import { useAuth } from '../context/AuthContext';

// // function Navbar() {
// //   const location = useLocation();
// //   const { logout } = useAuth();

// //   const isActive = (path: string) => location.pathname === path;

// //   const navItems = [
// //     { path: '/live-data', icon: Activity, label: 'Live Data' },
// //     { path: '/export', icon: FileDown, label: 'Export' },
// //     { path: '/settings', icon: Settings, label: 'Settings' },
// //   ];

// //   return (
// //     <nav className="bg-blue-900 border-b border-blue-800">
// //       <div className="max-w-7xl mx-auto px-2">
// //         <div className="flex justify-between h-16">
// //           <div className="flex items-center">
// //             <Link to="/" className="flex items-center">
// //               <span className="text-xl font-bold text-blue-300">DAMS</span>
// //             </Link>
// //           </div>

// //           <div className="flex items-center">
// //             {navItems.map(({ path, icon: Icon, label }) => (
// //               <Link
// //                 key={path}
// //                 to={path}
// //                 className={`inline-flex items-center px-4 h-16 text-sm font-medium border-b-4 transition-colors duration-200
// //                   ${isActive(path)
// //                     ? 'border-blue-400 text-white bg-blue-800'
// //                     : 'border-transparent text-blue-300 hover:text-white hover:bg-blue-800'
// //                   }`}
// //               >
// //                 <Icon className="h-5 w-5 mr-2" />
// //                 {label}
// //               </Link>
// //             ))}
// //             <button
// //               onClick={logout}
// //               className="ml-4 inline-flex items-center px-4 h-16 text-sm font-medium text-blue-300 hover:text-red-400 transition-colors duration-200"
// //             >
// //               <LogOut className="h-5 w-5 mr-2" />
// //               Logout
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // }

// // export default Navbar;

// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Settings, Activity, FileDown, LogOut } from 'lucide-react';

// function Navbar() {
//   const location = useLocation();


//   const isActive = (path: string) => location.pathname === path;

//   const navItems = [
//     { path: '/live-data', icon: Activity, label: 'Live Data' },
//     { path: '/export', icon: FileDown, label: 'Export' },
//     { path: 'http://127.0.0.1:8000/admin/login', icon: Settings, label: 'Settings' },
//   ];

//   return (
//     <nav className="bg-black border-black">
//       <div className="w-full mx-auto px-4">
//         <div className="flex justify-between h-12">
//           <div className="flex items-center">
//             <div className="flex items-center">
//               <span className="text-lg font-bold text-blue-300">
//                 DATA ACQUISITION AND MANAGEMENT SOFTWARE -DAMS
//               </span>
//             </div>
//           </div>
//           <span className="px-8 text-yellow-500 text-sm">Runtime: 2 days 10 hrs 20 mins</span>
//           <div className="flex items-center">
//             {navItems.map(({ path, icon: Icon, label }) => (
//               <Link
//                 key={path}
//                 to={path}
//                 className={`inline-flex items-center px-3 h-12 text-sm font-medium border-b-4 transition-colors duration-200
//                   ${isActive(path)
//                     ? 'border-blue-400 text-white bg-blue-800'
//                     : 'border-transparent text-blue-300 hover:text-white hover:bg-blue-800'
//                   }`}
//               >
//                 <Icon className="h-4 w-4 mr-1" />
//                 {label}
//               </Link>
//             ))}
//             <button
//               className="ml-3 inline-flex items-center px-3 h-12 text-sm font-medium text-blue-300 hover:text-red-400 transition-colors duration-200"
//             >
//               <LogOut className="h-4 w-4 mr-1" />
//               Logout
//             </button>
//             {/* Copyright message */}
//             <span className="ml-3 text-sm text-white">© IES, 2025</span>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;



// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Settings, Activity, FileDown, LogOut, Info } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';

// function Navbar() {
//   const location = useLocation();
//   const { user } = useAuth();

//   const isActive = (path) => location.pathname === path;

//   // Base nav items available to everyone (or protected by route guards elsewhere)
//   const navItems = [
//     { path: '/live-data', icon: Activity, label: 'Live Data' },
//     { path: '/export', icon: FileDown, label: 'Export' },
//   ];

//   // Conditionally add either the Information or Settings link based on the user's role
//   if (user) {
//     if (user.role === 'admin') {
//       navItems.push({ path: '/admin/settings', icon: Settings, label: 'Settings' });
//     } else {
//       navItems.push({ path: '/information', icon: Info, label: 'Information' });
//     }
//   }

//   return (
//     <nav className="bg-black border-black">
//       <div className="w-full mx-auto px-4">
//         <div className="flex justify-between h-12">
//           <div className="flex items-center">
//             <div className="flex items-center">
//               <span className="text-lg font-bold text-blue-300">
//                 DATA ACQUISITION AND MANAGEMENT SOFTWARE -DAMS
//               </span>
//             </div>
//           </div>
//           <span className="px-8 text-yellow-500 text-sm">
//             Runtime: 2 days 10 hrs 20 mins
//           </span>
//           <div className="flex items-center">
//             {navItems.map(({ path, icon: Icon, label }) => (
//               <Link
//                 key={path}
//                 to={path}
//                 className={`inline-flex items-center px-3 h-12 text-sm font-medium border-b-4 transition-colors duration-200
//                   ${isActive(path)
//                     ? 'border-blue-400 text-white bg-blue-800'
//                     : 'border-transparent text-blue-300 hover:text-white hover:bg-blue-800'
//                   }`}
//               >
//                 <Icon className="h-4 w-4 mr-1" />
//                 {label}
//               </Link>
//             ))}
//             <button
//               className="ml-3 inline-flex items-center px-3 h-12 text-sm font-medium text-blue-300 hover:text-red-400 transition-colors duration-200"
//             >
//               <LogOut className="h-4 w-4 mr-1" />
//               Logout
//             </button>
//             {/* Copyright message */}
//             <span className="ml-3 text-sm text-white">© IES, 2025</span>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings, Activity, FileDown, LogOut, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavItem {
  path: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string): boolean => location.pathname === path;

  // Base nav items available to everyone (or protected by route guards elsewhere)
  const navItems: NavItem[] = [
    { path: '/live-data', icon: Activity, label: 'Live Data' },
    { path: '/export', icon: FileDown, label: 'Export' },
  ];

  // Conditionally add either the Information or Settings link based on the user's role
  if (user) {
    if (user.role === 'admin') {
      navItems.push({ path: 'http://127.0.0.1:8000/admin/login', icon: Settings, label: 'Settings' });
    } else {
      navItems.push({ path: '/information', icon: Info, label: 'Information' });
    }
  }

  return (
    <nav className="bg-black border-black">
      <div className="w-full mx-auto px-4">
        <div className="flex justify-between h-12">
          <div className="flex items-center">
            <div className="flex items-center">
              <span className="text-lg font-bold text-blue-300">
                DATA ACQUISITION AND MANAGEMENT SOFTWARE -DAMS
              </span>
            </div>
          </div>
          <span className="px-8 text-yellow-500 text-sm">
            Runtime: 2 days 10 hrs 20 mins
          </span>
          <div className="flex items-center">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`inline-flex items-center px-3 h-12 text-sm font-medium border-b-4 transition-colors duration-200 ${
                  isActive(path)
                    ? 'border-blue-400 text-white bg-blue-800'
                    : 'border-transparent text-blue-300 hover:text-white hover:bg-blue-800'
                }`}
              >
                <Icon className="h-4 w-4 mr-1" />
                {label}
              </Link>
            ))}
            <button
              className="ml-3 inline-flex items-center px-3 h-12 text-sm font-medium text-blue-300 hover:text-red-400 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </button>
            {/* Copyright message */}
            <span className="ml-3 text-sm text-white">© IES, 2025</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

