import React from "react";
import { Search, User, LogOut, Sparkles } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/Button";

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="backdrop-blur-xl bg-white/10 border-b border-white/10 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 group cursor-pointer select-none">
            <div className="w-9 h-9 bg-linear-to-br from-blue-500 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Search className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-linear-to-r from-white to-white/80 bg-clip-text text-transparent">
                PixelPulse
              </span>
              <div className="flex items-center gap-1 text-[11px] text-white/60">
                <Sparkles className="w-3 h-3" />
                <span>Visual Intelligence</span>
              </div>
            </div>
          </div>

          {/* User Controls */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Profile */}
                <div className="hidden sm:flex items-center space-x-3 bg-white/10 border border-white/10 px-3 py-1.5 rounded-2xl backdrop-blur-md hover:bg-white/20 transition-all duration-300">
                  <img
                    src={
                      user.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.name
                      )}&background=4f46e5&color=fff`
                    }
                    alt={user.name}
                    className="w-8 h-8 rounded-full border border-white/20 shadow-sm"
                  />
                  <span className="text-sm font-medium text-white truncate max-w-[100px]">
                    {user.name}
                  </span>
                </div>

                {/* Logout */}
                <Button
                  variant="ghost"
                  size="sm"
                  icon={LogOut}
                  onClick={logout}
                  className="hidden sm:flex bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="primary"
                size="sm"
                icon={User}
                onClick={() => (window.location.href = "/login")}
                className="bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-md hover:shadow-lg"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
