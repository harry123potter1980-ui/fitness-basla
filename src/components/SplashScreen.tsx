import { useEffect, useState } from "react";
import appIcon from "/app-icon.png";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 1700);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-300 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className={`flex flex-col items-center gap-4 transition-all duration-500 ${
        isExiting ? "scale-110 opacity-0" : "scale-100 opacity-100 animate-pulse-glow"
      }`}>
        <img 
          src={appIcon} 
          alt="VoltFit Logo" 
          className="w-32 h-32 object-contain drop-shadow-[0_0_30px_rgba(0,230,0,0.5)]"
        />
        <h1 className="text-3xl font-bold text-primary tracking-wider">VoltFit</h1>
        <p className="text-muted-foreground text-sm">Train Hard. Track Smart.</p>
      </div>
    </div>
  );
};

export default SplashScreen;
