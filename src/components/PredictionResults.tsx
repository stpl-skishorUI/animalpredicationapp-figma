import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Separator } from './ui/separator';
import { PredictionResult } from '../App';
import {
    AlertTriangle,
    Stethoscope,
    Eye,
    Calendar,
    ArrowLeft,
    CheckCircle,
    XCircle,
    AlertCircle,
    Clock,
    Brain,
    Sparkles,
    Cpu
} from 'lucide-react';

interface PredictionResultsProps {
    prediction: PredictionResult;
    onReset: () => void;
}

export function PredictionResults({ prediction, onReset }: PredictionResultsProps) {
    const getRiskColor = (risk: string) => {
        switch (risk) {
            case 'low': return 'bg-green-100 text-green-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'high': return 'bg-orange-100 text-orange-800';
            case 'critical': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getRiskIcon = (risk: string) => {
        switch (risk) {
            case 'low': return <CheckCircle className="w-4 h-4" />;
            case 'medium': return <Clock className="w-4 h-4" />;
            case 'high': return <AlertCircle className="w-4 h-4" />;
            case 'critical': return <XCircle className="w-4 h-4" />;
            default: return <AlertCircle className="w-4 h-4" />;
        }
    };

    const getConsultationUrgency = (consultation: string) => {
        switch (consultation) {
            case 'immediate': return { text: 'Immediate', color: 'bg-red-500', icon: <XCircle className="w-4 h-4" /> };
            case 'scheduled': return { text: 'Within 24-48 Hours', color: 'bg-orange-500', icon: <Clock className="w-4 h-4" /> };
            case 'routine': return { text: 'Routine Check-up', color: 'bg-green-500', icon: <CheckCircle className="w-4 h-4" /> };
            default: return { text: 'Consult Vet', color: 'bg-gray-500', icon: <Stethoscope className="w-4 h-4" /> };
        }
    };

    const consultationInfo = getConsultationUrgency(prediction.veterinaryConsultation);

    return (
        <div className="space-y-4">
            {/* Back Button */}
            <Button
                variant="outline"
                onClick={onReset}
                size="sm"
                className="mb-4 text-black outline text-xs outline-gray-400"
            >
                <ArrowLeft className="w-4 h-4 mr-2 text-green-500" />
                New Assessment
            </Button>

            {/* AI Analysis Badge */}
            <div className="flex justify-center">
                <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200">
                    <Cpu className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">AI Simulation Analysis</span>
                    <Sparkles className="w-4 h-4 text-purple-600" />
                </div>
            </div>

            {/* Main Prediction Card */}
            <Card>
                <CardHeader className='p-2'>
                    <CardTitle className="flex items-center justify-between p-2">
                        <span className="flex items-center gap-2 text-black">
                            <Stethoscope className="w-5 h-5 text-green-700" />
                            Health Assessment
                        </span>
                        <Badge className={getRiskColor(prediction.riskLevel)}>
                            {getRiskIcon(prediction.riskLevel)}
                            <span className="ml-1 capitalize">{prediction.riskLevel} Risk</span>
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Health Condition */}
                    <div>
                        <h3 className="font-medium mb-2 text-black">AI Predicted Condition</h3>
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="font-medium text-blue-900">{prediction.healthCondition}</p>
                            <p className="text-sm text-blue-700 mt-1">
                                AI Confidence: {prediction.confidence}%
                            </p>
                        </div>
                    </div>

                    {/* Veterinary Consultation */}
                    <div>
                        <h3 className="font-medium mb-2 text-black">Veterinary Consultation</h3>
                        <div className={`p-3 rounded-lg text-white ${consultationInfo.color}`}>
                            <div className="flex items-center gap-2">
                                {consultationInfo.icon}
                                <span className="font-medium">{consultationInfo.text}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Monitoring Advice */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-black">
                        <Eye className="w-5 h-5 text-green-700" />
                        AI Monitoring Recommendations
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {prediction.monitoringAdvice.map((advice, index) => (
                            <li key={index} className="flex items-start gap-2  text-black">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-sm">{advice}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            {/* Seasonal Warning */}
            {prediction.seasonalWarning && (
                <Alert className="d-flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <AlertTitle>Seasonal Alert</AlertTitle>
                    <AlertDescription className='text-sm text-gray-700 font-normal'>
                        {prediction.seasonalWarning}
                    </AlertDescription>
                </Alert>
            )}

            {/* Climate Risk */}
            {prediction.climateRisk && (
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Climate Considerations</AlertTitle>
                    <AlertDescription className='text-sm text-gray-700 font-normal'>
                        {prediction.climateRisk}
                    </AlertDescription>
                </Alert>
            )}

            {/* Action Items */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base text-black">Next Steps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm  text-green-600">Follow AI monitoring recommendations</span>
                        </div>

                        {prediction.veterinaryConsultation === 'immediate' && (
                            <div className="flex items-center gap-2 p-2 bg-red-50 rounded">
                                <XCircle className="w-4 h-4 text-red-600" />
                                <span className="text-sm text-red-600">Contact veterinarian immediately</span>
                            </div>
                        )}

                        {prediction.veterinaryConsultation === 'scheduled' && (
                            <div className="flex items-center gap-2 p-2 bg-orange-50 rounded">
                                <Clock className="w-4 h-4 text-orange-600" />
                                <span className="text-sm text-orange-600">Schedule veterinary appointment</span>
                            </div>
                        )}

                        <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                            <Eye className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-blue-600">Record observations daily</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Disclaimer */}
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-xs text-yellow-800">
                    <strong>Disclaimer:</strong> This is an AI simulation based on veterinary expertise.
                    Always consult with a qualified veterinarian for professional diagnosis and treatment.
                </p>
            </div>
        </div>
    );
}