import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "./ui/alert";
import {
    AlertTriangle,
    Stethoscope,
    Brain,
    Cpu,
    LogOut,
    User,
} from "lucide-react";
import { PredictionForm } from "./PredictionForm";
import { PredictionResults } from "./PredictionResults";
import { claudeAI } from "../services/claudeAI";
import { FormData, PredictionResult } from "../App";

interface VetDashboardProps {
    user: { username: string };
    onLogout: () => void;
}

export function VetDashboard({
    user,
    onLogout,
}: VetDashboardProps) {
    const [formData, setFormData] = useState<FormData>({
        season: "",
        climateType: "",
        animalStage: "",
        behavior: "",
        visibleSymptoms: [],
        vaccinationStatus: [],
    });

    const [prediction, setPrediction] =
        useState<PredictionResult | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (data: FormData) => {
        setIsAnalyzing(true);
        setError(null);

        try {
            const result = await claudeAI.getPrediction(data);
            setPrediction(result);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "An unexpected error occurred",
            );
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleReset = () => {
        setFormData({
            season: "",
            climateType: "",
            animalStage: "",
            behavior: "",
            visibleSymptoms: [],
            vaccinationStatus: [],
        });
        setPrediction(null);
        setError(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
            <div className="max-w-md mx-auto space-y-6">
                {/* Header with User Info */}
                <div className="text-center pb-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <User className="w-6 h-6 text-gray-600" />
                            <span className="text-sm text-gray-600">
                                Welcome, {user.username}
                            </span>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onLogout}
                            className="flex items-center gap-2 text-black hover:bg-gray-100 disabled:opacity-50"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </Button>
                    </div>

                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Stethoscope className="w-8 h-8 text-green-600" />
                        <h3 className="text-2xl font-bold text-gray-900">
                            VetAI Assistant
                        </h3>
                    </div>
                    <p className="text-gray-600">
                        AI-Powered Animal Health Prediction
                    </p>
                    {/* <p className="text-sm text-gray-500 mt-1">
                        Cows & Buffaloes
                    </p> */}

                    {/* AI Status Indicator */}
                    <div className="flex items-center justify-center gap-2 mt-3">
                        <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                            <Brain className="w-3 h-3" />
                            <span>AI Simulation Active</span>
                        </div>
                    </div>
                </div>

                {/* Demo Notice */}
                {/* <Alert className="border-blue-200 bg-blue-50">
          <Cpu className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">Demo Mode</AlertTitle>
          <AlertDescription className="text-blue-700">
            Using advanced AI simulation for veterinary analysis. This provides realistic predictions based on veterinary expertise and clinical patterns.
          </AlertDescription>
        </Alert> */}

                {/* Error Alert */}
                {error && (
                    <Alert className="border-red-200 bg-red-50">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <AlertTitle className="text-red-800">
                            Analysis Error
                        </AlertTitle>
                        <AlertDescription className="text-red-700">
                            {error}
                        </AlertDescription>
                    </Alert>
                )}

                {!prediction ? (
                    <PredictionForm
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleSubmit}
                        isAnalyzing={isAnalyzing}
                    />
                ) : (
                    <PredictionResults
                        prediction={prediction}
                        onReset={handleReset}
                    />
                )}

                {/* Technical Note */}
                {/* <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-600">
                        <strong>Technical Note:</strong> In production, this
                        would connect to secure backend services for real
                        Claude AI integration with proper API key management
                        and CORS handling.
                    </p>
                </div> */}

                {/* Footer */}
                {/* <div className="text-center text-xs text-gray-500 py-4">
                    <p>
                        ⚠️ AI simulation for demonstration purposes. Always
                        consult a veterinarian for professional diagnosis.
                    </p>
                    <p className="mt-1">Powered by Veterinary AI Logic</p>
                </div> */}
            </div>
        </div>
    );
}