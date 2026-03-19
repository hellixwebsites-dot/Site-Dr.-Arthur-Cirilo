import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Antes",
  afterLabel = "Depois"
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderPos = useMotionValue(50); // percentage
  const springPos = useSpring(sliderPos, { stiffness: 300, damping: 30 });
  const clipPath = useTransform(springPos, (pos) => `inset(0 ${100 - pos}% 0 0)`);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    sliderPos.set(percent);
  };

  const onMouseDown = () => setIsResizing(true);
  const onMouseUp = () => setIsResizing(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isResizing) handleMove(e.clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isResizing) handleMove(e.touches[0].clientX);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [isResizing]);

  if (hasError) {
    return (
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 flex flex-col items-center justify-center p-6 text-center border border-dashed border-slate-300">
        <p className="text-slate-500 font-medium mb-2">Ops! Não conseguimos carregar as imagens.</p>
        <p className="text-xs text-slate-400">Certifique-se de que as imagens no Google Drive estão configuradas como "Qualquer pessoa com o link pode visualizar".</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-silver/20 select-none cursor-ew-resize"
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}
    >
      {/* After Image (Background) */}
      <img 
        src={afterImage} 
        alt="Depois" 
        className="absolute inset-0 w-full h-full object-cover"
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
      />
      
      {/* Before Image (Clipped) */}
      <motion.div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath }}
      >
        <img 
          src={beforeImage} 
          alt="Antes" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
        />
      </motion.div>

      {/* Slider Handle */}
      <motion.div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-xl z-20"
        style={{ left: useTransform(springPos, (pos) => `${pos}%`) }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center text-deep-blue">
          <div className="flex gap-0.5">
            <ChevronLeft size={16} />
            <ChevronRight size={16} />
          </div>
        </div>
      </motion.div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-10 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 z-10 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider">
        {afterLabel}
      </div>
    </div>
  );
};
