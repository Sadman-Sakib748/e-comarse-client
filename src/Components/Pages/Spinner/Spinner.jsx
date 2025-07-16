import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <div className="flex space-x-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-teal-600"
            style={{
              animation: `bounceDot 0.6s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes bounceDot {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-16px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Spinner;
