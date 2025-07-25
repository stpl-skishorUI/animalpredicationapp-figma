import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
/* Removed import of Checkbox as the file does not exist */
import { Checkbox } from './ui/checkbox';
import { FormData } from '../App';
import { Loader2, Send, Brain, Cpu } from 'lucide-react';

interface PredictionFormProps {
    formData: FormData;
    setFormData: (data: FormData) => void;
    onSubmit: (data: FormData) => void;
    isAnalyzing: boolean;
}

export function PredictionForm({ formData, setFormData, onSubmit, isAnalyzing }: PredictionFormProps) {
    const handleSingleSelect = (field: keyof FormData, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleMultiSelect = (field: 'visibleSymptoms' | 'vaccinationStatus', value: string) => {
        const currentValues = formData[field] as string[];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];
        setFormData({ ...formData, [field]: newValues });
    };

    const isFormValid = () => {
        return formData.season &&
            formData.climateType &&
            formData.animalStage &&
            formData.behavior &&
            formData.vaccinationStatus.length > 0;
    };

    const handleSubmit = () => {
        if (isFormValid()) {
            onSubmit(formData);
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-blue-600" />
                    <span className="text-black">Animal Assessment</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Season */}
                <div className="space-y-3">
                    <Label className="text-base font-medium">Season</Label>
                    <div className="grid grid-cols-3 gap-2">
                        {['Summer', 'Rainy', 'Winter'].map((season) => (
                            <Button
                                key={season}
                                variant={formData.season === season ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => handleSingleSelect('season', season)}
                                className="h-10 text-black outline text-[14px]"
                                disabled={isAnalyzing}
                            >
                                {season}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Climate Type */}
                <div className="space-y-3">
                    <Label className="text-base font-medium">Climate Type</Label>
                    <div className="grid grid-cols-1 gap-2">
                        {['Hot-Dry', 'Humid', 'Cold-Wet'].map((climate) => (
                            <Button
                                key={climate}
                                variant={formData.climateType === climate ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => handleSingleSelect('climateType', climate)}
                                className="h-10 text-black outline text-[14px]"
                                disabled={isAnalyzing}
                            >
                                {climate}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Animal Stage */}
                <div className="space-y-3">
                    <Label className="text-base font-medium">Animal Stage</Label>
                    <div className="grid grid-cols-2 gap-2">
                        {['Calf', 'Heifer', 'Lactating', 'Pregnant', 'Adult'].map((stage) => (
                            <Button
                                key={stage}
                                variant={formData.animalStage === stage ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => handleSingleSelect('animalStage', stage)}
                                className="h-10 text-black outline text-[14px]"
                                disabled={isAnalyzing}
                            >
                                {stage}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Behavior */}
                <div className="space-y-3">
                    <Label className="text-base font-medium">Behavior</Label>
                    <div className="grid grid-cols-2 gap-2">
                        {['Normal', 'Aggressive', 'Isolated', 'Lethargic', 'Restless'].map((behavior) => (
                            <Button
                                key={behavior}
                                variant={formData.behavior === behavior ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => handleSingleSelect('behavior', behavior)}
                                className="h-10 text-black outline text-[14px]"
                                disabled={isAnalyzing}
                            >
                                {behavior}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Visible Symptoms */}
                <div className="space-y-3">
                    <Label className="text-base font-medium">Visible Symptoms (Select all that apply)</Label>
                    <div className="space-y-3">
                        {['Nasal Discharge', 'Diarrhea', 'Limping', 'Swollen Udder', 'Coughing'].map((symptom) => (
                            <div key={symptom} className="flex items-center space-x-2">
                                <Checkbox
                                    id={symptom}
                                    checked={formData.visibleSymptoms.includes(symptom)}
                                    onCheckedChange={() => handleMultiSelect('visibleSymptoms', symptom)}
                                    disabled={isAnalyzing} className='text-white'
                                />
                                <Label htmlFor={symptom} className="text-sm font-normal">
                                    {symptom}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Vaccination Status */}
                <div className="space-y-3">
                    <Label className="text-base font-medium">Vaccination Status (Select all that apply)</Label>
                    <div className="space-y-3">
                        {['Up-to-date', 'Partial', 'Not done'].map((status) => (
                            <div key={status} className="flex items-center space-x-2">
                                <Checkbox
                                    id={status}
                                    checked={formData.vaccinationStatus.includes(status)}
                                    onCheckedChange={() => handleMultiSelect('vaccinationStatus', status)}
                                    disabled={isAnalyzing}
                                />
                                <Label htmlFor={status} className="text-sm font-normal">
                                    {status}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <Button
                    onClick={handleSubmit}
                    disabled={!isFormValid() || isAnalyzing}
                    className="w-full h-12"
                    size="lg"
                >
                    {isAnalyzing ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            AI Analyzing...
                        </>
                    ) : (
                        <>
                            <Cpu className="w-4 h-4 mr-2" />
                            Analyze with AI
                        </>
                    )}
                </Button>

                {/* Analysis Status */}
                {isAnalyzing && (
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                            🧠 AI is analyzing your animal's health data...
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                            Processing symptoms, behavior, and environmental factors
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}