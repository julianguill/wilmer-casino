
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, TrendingUp, Target, Crown, Facebook, Instagram, Youtube } from 'lucide-react';
import { toast } from 'sonner';

interface PredictionResult {
  numbers: number[];
  confidence: number;
  algorithm: string;
}

const LotteryPredictor = () => {
  const [inputNumber, setInputNumber] = useState('');
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);

  // Función para generar predicciones inteligentes
  const generatePrediction = (baseNumber: number): PredictionResult => {
    const algorithms = [
      'Análisis de Patrones Fibonacci',
      'Algoritmo de Tendencias Históricas',
      'Predicción Neuronal Avanzada',
      'Sistema de Frecuencias Óptimas'
    ];

    // Algoritmo sofisticado para generar números relacionados
    const numbers = [];
    const usedNumbers = new Set();
    
    // Agregar el número base
    numbers.push(baseNumber);
    usedNumbers.add(baseNumber);
    
    // Generar números relacionados usando diferentes estrategias
    while (numbers.length < 3) {
      let newNumber;
      
      if (numbers.length === 1) {
        // Segundo número: basado en secuencia matemática
        newNumber = (baseNumber * 1.618) % 37; // Proporción áurea
      } else {
        // Tercer número: combinación de los anteriores
        const sum = numbers.reduce((a, b) => a + b, 0);
        newNumber = (sum * 0.786) % 37; // Proporción inversa
      }
      
      newNumber = Math.round(newNumber);
      if (newNumber === 0) newNumber = 1;
      if (newNumber > 36) newNumber = newNumber % 36 + 1;
      
      if (!usedNumbers.has(newNumber)) {
        numbers.push(newNumber);
        usedNumbers.add(newNumber);
      }
    }

    return {
      numbers: numbers.sort((a, b) => a - b),
      confidence: 75 + Math.random() * 20, // 75-95% confidence
      algorithm: algorithms[Math.floor(Math.random() * algorithms.length)]
    };
  };

  const handlePredict = async () => {
    const num = parseInt(inputNumber);
    
    if (isNaN(num) || num < 0 || num > 36) {
      toast.error('Por favor ingresa un número válido entre 0 y 36');
      return;
    }

    setIsGenerating(true);
    // Reset animation state
    setAnimateCards(false);
    
    // Simular procesamiento con delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = generatePrediction(num);
    setPrediction(result);
    setIsGenerating(false);
    setAnimateCards(true);
    
    toast.success(`¡Predicción generada con ${result.confidence.toFixed(1)}% de confianza!`);
  };

  const NumberCard = ({ number, index }: { number: number; index: number }) => (
    <div 
      className={`number-card p-6 text-center ${animateCards ? 'animate-number-reveal' : ''}`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="text-3xl font-bold text-casino-gold mb-2">{number}</div>
      <div className="text-sm text-slate-300">
        {index === 0 ? 'Principal' : index === 1 ? 'Segundo' : 'Tercero'}
      </div>
    </div>
  );

  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="floating-particles"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${4 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingParticles />
      
      {/* Header */}
      <div className="relative z-10 text-center py-8 animate-fade-in-up">
        <div className="flex items-center justify-center mb-4">
          <Crown className="w-12 h-12 text-casino-gold mr-4 animate-glow-pulse" />
          <h1 className="text-5xl font-bold text-shimmer">
            Tendencias de Draculitto
          </h1>
          <Crown className="w-12 h-12 text-casino-gold ml-4 animate-glow-pulse" />
        </div>
        <p className="text-xl text-slate-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          ¡Coloque su numero de la suerte!
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Input Section */}
          <Card className="casino-card mb-8 animate-fade-in-scale" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="text-center text-casino-gold flex items-center justify-center">
                <Target className="w-6 h-6 mr-2" />
                Ingrese un número (0-36)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <Input
                  type="number"
                  min="0"
                  max="36"
                  value={inputNumber}
                  onChange={(e) => setInputNumber(e.target.value)}
                  placeholder="Ingresa tu número"
                  className="text-center text-xl font-bold bg-slate-800 border-casino-gold/30 text-white max-w-xs"
                />
                <Button
                  onClick={handlePredict}
                  disabled={isGenerating}
                  className="casino-button relative overflow-hidden"
                >
                  {isGenerating ? (
                    <div className="flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                      Procesando...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-red-600" />
                      ¡Pronosticar numero!
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Prediction Results */}
          {prediction && (
            <Card className="casino-card animate-fade-in-scale">
              <CardHeader>
                <CardTitle className="text-center text-casino-gold text-2xl">
                  Pronóstico para el número {inputNumber}
                </CardTitle>
                <div className="text-center">
                  <div className="text-sm text-slate-400 mb-2">
                    {prediction.algorithm}
                  </div>
                  <div className="text-casino-gold font-bold">
                    Confianza: {prediction.confidence.toFixed(1)}%
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {prediction.numbers.map((number, index) => (
                    <NumberCard key={index} number={number} index={index} />
                  ))}
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div className="text-casino-gold font-bold text-lg">
                      {prediction.numbers.reduce((a, b) => a + b, 0)}
                    </div>
                    <div className="text-xs text-slate-400">Suma Total</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div className="text-casino-emerald font-bold text-lg">
                      {(prediction.numbers.reduce((a, b) => a + b, 0) / 3).toFixed(1)}
                    </div>
                    <div className="text-xs text-slate-400">Promedio</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div className="text-casino-gold font-bold text-lg">
                      {Math.max(...prediction.numbers) - Math.min(...prediction.numbers)}
                    </div>
                    <div className="text-xs text-slate-400">Rango</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div className="text-casino-emerald font-bold text-lg">
                      {prediction.confidence.toFixed(0)}%
                    </div>
                    <div className="text-xs text-slate-400">Precisión</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Social Media and Brand */}
          <div className="mt-8 text-center">
            <div className="text-center text-casino-gold text-3xl font-bold mb-4">DRACULOTTO</div>
            <div className="flex justify-center space-x-6 mt-4">
              <a href="#" className="text-white hover:text-casino-gold transition-colors">
                <Facebook className="w-8 h-8" />
              </a>
              <a href="#" className="text-white hover:text-casino-gold transition-colors">
                <Instagram className="w-8 h-8" />
              </a>
              <a href="#" className="text-white hover:text-casino-gold transition-colors">
                <Youtube className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-slate-400 text-sm">
        © 2025 Pronosticador Numérico - Todos los derechos reservados
      </footer>
    </div>
  );
};

export default LotteryPredictor;
