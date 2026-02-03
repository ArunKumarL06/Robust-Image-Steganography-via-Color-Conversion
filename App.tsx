import React, { useState, useCallback, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Sender from "./pages/Sender";
import Receiver from "./pages/Receiver";
import Layout from "./components/Layout";
import Admin from "./pages/Admin";
import Project from "./pages/Project";
import Hospital from "./pages/Hospital";
import Military from "./pages/Military";
import Mfa from "./pages/Mfa";
import { User, DomainType } from "./types";
import { db } from "./services/database";

export type Page =
  | "welcome"
  | "login"
  | "register"
  | "home"
  | "sender"
  | "receiver"
  | "admin"
  | "project"
  | "hospital"
  | "military"
  | "mfa";

const AUTH_STORAGE_KEY = "steganographyApp_isLoggedIn";
const ADMIN_STORAGE_KEY = "steganographyApp_isAdmin";
const CURRENT_USER_KEY = "steganographyApp_currentUser";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem(ADMIN_STORAGE_KEY) === "true";
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const [currentPage, setCurrentPage] = useState<Page>(() => {
    const isAuth = localStorage.getItem(AUTH_STORAGE_KEY) === "true";
    const isAdm = localStorage.getItem(ADMIN_STORAGE_KEY) === "true";
    if (!isAuth) return "welcome";
    return isAdm ? "admin" : "home";
  });

  // New state for MFA flow
  const [userAwaitingMfa, setUserAwaitingMfa] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(AUTH_STORAGE_KEY, String(isAuthenticated));
    localStorage.setItem(ADMIN_STORAGE_KEY, String(isAdmin));
    if (currentUser) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [isAuthenticated, isAdmin, currentUser]);

  // Renamed from handleLoginSuccess to initiate MFA flow
  const handleCredentialsVerified = useCallback((email: string) => {
    setUserAwaitingMfa(email);
    setCurrentPage("mfa");
  }, []);

  const handleMfaSuccess = useCallback(async (email: string) => {
    try {
      // Retrieve full user details from Database
      const user = await db.users.findByEmail(email);

      if (user) {
        const isAdminUser =
          email.toLowerCase() === "admin@example.com" || user.role === "admin";
        setIsAuthenticated(true);
        setIsAdmin(isAdminUser);
        setCurrentUser(user);
        setUserAwaitingMfa(null);

        // Redirect Admins directly to Admin Panel, others to Home
        if (isAdminUser) {
          setCurrentPage("admin");
        } else {
          setCurrentPage("home");
        }
      } else {
        alert("Authentication Error: User profile not found.");
        setCurrentPage("login");
      }
    } catch (e) {
      console.error("MFA Error", e);
      alert("System error during login.");
      setCurrentPage("login");
    }
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setCurrentUser(null);
    setUserAwaitingMfa(null); // Clear MFA state on logout
    setCurrentPage("login");
  }, []);

  const navigate = useCallback(
    (page: Page) => {
      if (page === "login" || page === "register") {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setCurrentUser(null);
        setUserAwaitingMfa(null);
      }

      // RBAC Checks (Bypass for Admins)
      if (currentUser && !isAdmin) {
        if (
          page === "hospital" &&
          !currentUser.domainAccess.includes("medical")
        ) {
          alert(
            "ACCESS DENIED: You do not have Medical clearance for this workflow."
          );
          return;
        }
        if (
          page === "military" &&
          !currentUser.domainAccess.includes("military")
        ) {
          alert(
            "ACCESS DENIED: Top Secret clearance required for Military workflow."
          );
          return;
        }
      }

      setCurrentPage(page);
    },
    [currentUser, isAdmin]
  );

  const renderPage = () => {
    if (userAwaitingMfa) {
      return (
        <Mfa
          email={userAwaitingMfa}
          onMfaSuccess={handleMfaSuccess}
          onNavigate={navigate}
        />
      );
    }

    if (!isAuthenticated) {
      switch (currentPage) {
        case "welcome":
          return <Welcome onNavigate={navigate} />;
        case "register":
          return <Register onNavigate={navigate} />;
        case "login":
        default:
          return (
            <Login
              onCredentialsVerified={handleCredentialsVerified}
              onNavigate={navigate}
            />
          );
      }
    }

    return (
      <Layout
        onLogout={handleLogout}
        onNavigate={navigate}
        isAdmin={isAdmin}
        currentUser={currentUser}
      >
        {currentPage === "home" && (
          <Home
            onNavigate={navigate}
            isAdmin={isAdmin}
            currentUser={currentUser}
          />
        )}
        {currentPage === "sender" && <Sender />}
        {currentPage === "receiver" && <Receiver currentUser={currentUser} />}
        {currentPage === "hospital" && <Hospital />}
        {currentPage === "military" && <Military />}
        {currentPage === "admin" && isAdmin && <Admin />}
        {currentPage === "project" && <Project />}
      </Layout>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {renderPage()}
    </div>
  );
};

export default App;
