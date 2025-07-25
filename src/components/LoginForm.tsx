import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Stethoscope, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';

interface LoginFormProps {
    onLogin: (credentials: { username: string; password: string }) => void;
    isLoading: boolean;
    error: string | null;
}

export function LoginForm({ onLogin, isLoading, error }: LoginFormProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim() && password.trim()) {
            onLogin({ username: username.trim(), password });
        }
    };

    const isFormValid = username.trim().length > 0 && password.length > 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 flex items-center justify-center">
            <div className="w-full max-w-md space-y-6">
                {/* Header */}
                <div className="text-center py-6">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Stethoscope className="w-12 h-12 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">VetAI Assistant</h3>
                    <p className="text-gray-600 mt-2">AI-Powered Animal Health Prediction</p>
                    <p className="text-sm text-gray-500 mt-1">Secure Veterinary Access</p>
                </div>

                {/* Login Card */}
                <Card className="w-full shadow-lg">
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2 justify-center">
                            <Lock className="w-5 h-5 text-blue-600" />
                            <span className='text-blue-600'>Veterinary Login</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Error Alert */}
                            {error && (
                                <Alert className="border-red-200 bg-red-50">
                                    <AlertTitle className="text-red-800">Login Failed</AlertTitle>
                                    <AlertDescription className="text-red-700">
                                        {error}
                                    </AlertDescription>
                                </Alert>
                            )}

                            {/* Username Field */}
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="pl-10 h-12 text-black"
                                        disabled={isLoading}
                                        autoComplete="username"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 pr-10 h-12 text-black"
                                        disabled={isLoading}
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute w-[36px] text-center right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        disabled={isLoading}
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Login Button */}
                            <Button
                                type="submit"
                                className="w-full h-12 mt-6"
                                disabled={!isFormValid || isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Authenticating...
                                    </>
                                ) : (
                                    'Login to VetAI'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Demo Credentials */}
                <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="pt-4">
                        <h3 className="font-medium text-blue-900 mb-2">Demo Credentials</h3>
                        <div className="space-y-1 text-sm text-blue-800">
                            <p><strong>Username:</strong> vet@demo.com</p>
                            <p><strong>Password:</strong> demo123</p>
                        </div>
                        <p className="text-xs text-blue-600 mt-2">
                            Use these credentials to access the demo application
                        </p>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center text-xs text-gray-500 py-4">
                    <p>🔒 Secure access for veterinary professionals</p>
                    <p className="mt-1">Demo version - For testing purposes only</p>
                </div>
            </div>
        </div>
    );
}