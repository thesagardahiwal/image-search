import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Github, Facebook, Mail } from 'lucide-react';

export const Login: React.FC = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const OAuthButton = ({ 
    provider, 
    icon: Icon, 
    color, 
    bgColor, 
    hoverBgColor 
  }: { 
    provider: string;
    icon: React.ElementType;
    color: string;
    bgColor: string;
    hoverBgColor: string;
  }) => (
    <Button
      onClick={() => login(provider.toLowerCase())}
      className={`w-full flex items-center justify-center space-x-3 py-4 text-white font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl ${bgColor} ${hoverBgColor}`}
    >
      <Icon className="w-5 h-5" />
      <span>Continue with {provider}</span>
    </Button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-primary-600">🔍</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Welcome Back
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Sign in to access your image search dashboard
            </p>
          </CardHeader>

          <CardContent className="p-6">
            {/* OAuth Buttons */}
            <div className="space-y-4">
              <OAuthButton
                provider="Google"
                icon={Mail}
                color="text-white"
                bgColor="bg-red-500"
                hoverBgColor="hover:bg-red-600"
              />
              <OAuthButton
                provider="Facebook"
                icon={Facebook}
                color="text-white"
                bgColor="bg-blue-600"
                hoverBgColor="hover:bg-blue-700"
              />
              <OAuthButton
                provider="GitHub"
                icon={Github}
                color="text-white"
                bgColor="bg-gray-800"
                hoverBgColor="hover:bg-gray-900"
              />
            </div>

            {/* Features */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 text-center">
                What you'll get:
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <span className="text-green-500">✓</span>
                  <span>Image Search</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <span className="text-green-500">✓</span>
                  <span>Search History</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <span className="text-green-500">✓</span>
                  <span>Multi-select</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <span className="text-green-500">✓</span>
                  <span>Top Searches</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <span className="text-green-500">✓</span>
                  <span>Save Favorites</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <span className="text-green-500">✓</span>
                  <span>Fast Search</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};