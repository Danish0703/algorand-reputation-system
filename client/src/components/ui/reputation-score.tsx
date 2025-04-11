import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface ReputationScoreProps {
  score: number;
  maxScore?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
  animate?: boolean;
}

const ReputationScore = ({
  score,
  maxScore = 1000,
  size = 'md',
  showValue = true,
  className,
  animate = true,
}: ReputationScoreProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const progressRef = useRef<SVGCircleElement>(null);
  
  // Size configurations
  const sizes = {
    sm: {
      width: 80,
      strokeWidth: 6,
      fontSize: 'text-xl',
      subFontSize: 'text-xs'
    },
    md: {
      width: 120,
      strokeWidth: 8,
      fontSize: 'text-3xl',
      subFontSize: 'text-sm'
    },
    lg: {
      width: 160,
      strokeWidth: 10,
      fontSize: 'text-4xl',
      subFontSize: 'text-sm'
    }
  };
  
  const currentSize = sizes[size];
  const radius = (currentSize.width / 2) - (currentSize.strokeWidth / 2);
  const circumference = 2 * Math.PI * radius;
  
  // Animation effect
  useEffect(() => {
    if (!animate) {
      setAnimatedScore(score);
      if (progressRef.current) {
        const offset = circumference - (score / maxScore) * circumference;
        progressRef.current.style.strokeDashoffset = `${offset}px`;
      }
      return;
    }
    
    let startValue = 0;
    const duration = 1000; // 1 second animation
    const startTime = Date.now();
    
    const animateValue = () => {
      const now = Date.now();
      const elapsedTime = now - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      const currentValue = Math.floor(progress * score);
      setAnimatedScore(currentValue);
      
      if (progressRef.current) {
        const offset = circumference - (currentValue / maxScore) * circumference;
        progressRef.current.style.strokeDashoffset = `${offset}px`;
      }
      
      if (progress < 1) {
        requestAnimationFrame(animateValue);
      }
    };
    
    requestAnimationFrame(animateValue);
  }, [score, maxScore, circumference, animate]);
  
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg
        width={currentSize.width}
        height={currentSize.width}
        viewBox={`0 0 ${currentSize.width} ${currentSize.width}`}
        className="transform -rotate-90"
      >
        <circle
          cx={currentSize.width / 2}
          cy={currentSize.width / 2}
          r={radius}
          className="stroke-[#E5E5E5] fill-none"
          strokeWidth={currentSize.strokeWidth}
        />
        <circle
          ref={progressRef}
          cx={currentSize.width / 2}
          cy={currentSize.width / 2}
          r={radius}
          className="stroke-[#00BF63] fill-none"
          strokeWidth={currentSize.strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference} // Initial state before animation
        />
      </svg>
      
      {showValue && (
        <div className="absolute flex flex-col items-center">
          <span className={cn("font-bold text-[#171717]", currentSize.fontSize)}>
            {animatedScore}
          </span>
          <span className={cn("text-gray-500 mt-1", currentSize.subFontSize)}>
            out of {maxScore}
          </span>
        </div>
      )}
    </div>
  );
};

export default ReputationScore;
