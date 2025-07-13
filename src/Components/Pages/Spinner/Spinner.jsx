import React from 'react';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <div className="flex space-x-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-8 rounded-lg shadow-lg animate-[risecolor_0.5s_ease-in-out_infinite]"
            style={{ 
              animationDelay: `${i * 0.15}s`,
              background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)'
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes risecolor {
          0%, 100% {
            transform: scaleY(0.4);
            opacity: 0.6;
            filter: hue-rotate(0deg);
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
            filter: hue-rotate(45deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Spinner;
