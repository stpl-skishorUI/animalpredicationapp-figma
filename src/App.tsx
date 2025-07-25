import React, { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { VetDashboard } from './components/VetDashboard';

export interface FormData {
    season: string;
    climateType: string;
    animalStage: string;
    behavior: string;
    visibleSymptoms: string[];
    vaccinationStatus: string[];
}

export interface PredictionResult {
    healthCondition: string;
    confidence: number;
    monitoringAdvice: string[];
    veterinaryConsultation: 'immediate' | 'scheduled' | 'routine';
    seasonalWarning?: string;
    climateRisk?: string;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

interface User {
    username: string;
    role: string;
}

function App() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);

    // Mock authentication function
    const authenticateUser = async (credentials: { username: string; password: string }): Promise<User | null> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock credentials for demo
        const validCredentials = [
            { username: 'vet@demo.com', password: 'demo123', role: 'veterinarian' },
            { username: 'admin', password: 'admin123', role: 'administrator' },
            { username: 'dr.smith', password: 'vet2024', role: 'veterinarian' },
        ];

        const validUser = validCredentials.find(
            cred => cred.username.toLowerCase() === credentials.username.toLowerCase() &&
                cred.password === credentials.password
        );

        if (validUser) {
            return { username: validUser.username, role: validUser.role };
        }

        return null;
    };

    const handleLogin = async (credentials: { username: string; password: string }) => {
        setIsLoggingIn(true);
        setLoginError(null);

        try {
            const authenticatedUser = await authenticateUser(credentials);

            if (authenticatedUser) {
                setUser(authenticatedUser);
            } else {
                setLoginError('Invalid username or password. Please check your credentials and try again.');
            }
        } catch (error) {
            setLoginError('Authentication service is temporarily unavailable. Please try again later.');
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleLogout = () => {
        setUser(null);
        setLoginError(null);
    };

    // Show login form if user is not authenticated
    if (!user) {
        return (
            <LoginForm
                onLogin={handleLogin}
                isLoading={isLoggingIn}
                error={loginError}
            />
        );
    }

    // Show dashboard if user is authenticated
    return (
        <VetDashboard
            user={user}
            onLogout={handleLogout}
        />
    );
}

export default App;
