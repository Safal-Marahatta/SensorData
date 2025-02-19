
// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
//   Dispatch,
//   SetStateAction,
// } from "react";

// interface User {
//   username: string;
//   role: "user" | "admin";
// }

// interface AuthContextType {
//   user: User | null;
//   setUser: Dispatch<SetStateAction<User | null>>;
//   logout: () => void;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// // A helper function to decode a JWT token (Note: This does not verify the signature)
// function parseJwt(token: string): any {
//   try {
//     const base64Url = token.split(".")[1];
//     const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//     const jsonPayload = decodeURIComponent(
//       atob(base64)
//         .split("")
//         .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
//         .join("")
//     );
//     return JSON.parse(jsonPayload);
//   } catch (error) {
//     console.error("Failed to parse JWT:", error);
//     return null;
//   }
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     console.log("Token from localStorage:", token);

//     if (token) {
//       try {
//         const decoded: any = parseJwt(token);
//         console.log("Decoded token:", decoded);

//         // Check if token exists and if it's not expired (exp is in seconds)
//         if (!decoded || decoded.exp * 1000 < Date.now()) {
//           console.warn("Token expired or invalid.");
//           localStorage.removeItem("accessToken");
//           setUser(null);
//         } else {
//           setUser({ username: decoded.sub, role: decoded.role });
//         }
//       } catch (error) {
//         console.error("Failed to decode token:", error);
//         setUser(null);
//       }
//     }
//     setLoading(false);
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("accessToken");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };


// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface User {
  username: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// A helper function to decode a JWT token (this does not verify the signature)
function parseJwt(token: string): any {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to parse JWT:", error);
    return null;
  }
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("Token from localStorage:", token);

    if (token) {
      try {
        const decoded: any = parseJwt(token);
        console.log("Decoded token:", decoded);

        // Check if token exists and is not expired (exp is in seconds)
        if (!decoded || decoded.exp * 1000 < Date.now()) {
          console.warn("Token expired or invalid.");
          localStorage.removeItem("accessToken");
          setUser(null);
        } else {
          setUser({ username: decoded.sub, role: decoded.role });
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        setUser(null);
      }
    }
    setLoading(false); // Token check complete
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

