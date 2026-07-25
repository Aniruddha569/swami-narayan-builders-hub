import { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext(undefined);

// Auth service - API integration
const authService = {
  signInWithPassword: async (email, password) => {
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      return response.json();
    } catch (error) {
      return { error };
    }
  },
  signUp: async (email, password) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      return response.json();
    } catch (error) {
      return { error };
    }
  },
  signOut: async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST" });
    } catch (error) {
      console.error("Sign out error:", error);
    }
  },
  getSession: async () => {
    try {
      const response = await fetch("/api/auth/session");
      return response.json();
    } catch (error) {
      return { user: null, session: null };
    }
  },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    authService.getSession().then((data) => {
      if (data.user) {
        setUser(data.user);
        setSession(data.session);
        checkAdminRole(data.user.id);
      }
      setLoading(false);
    });
  }, []);

  const checkAdminRole = async (userId) => {
    try {
      const response = await fetch(`/api/admin/check-role/${userId}`);
      const data = await response.json();
      setIsAdmin(data.isAdmin || false);
    } catch (error) {
      setIsAdmin(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      const data = await authService.signInWithPassword(email, password);
      if (data.user) {
        setUser(data.user);
        setSession(data.session);
        checkAdminRole(data.user.id);
        return { error: null };
      }
      return { error: data.error };
    } catch (error) {
      return { error };
    }
  };

  const signUp = async (email, password) => {
    try {
      const data = await authService.signUp(email, password);
      if (data.user) {
        setUser(data.user);
        return { error: null };
      }
      return { error: data.error };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};