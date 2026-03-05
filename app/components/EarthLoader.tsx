import React from "react";

interface PlanetLoaderProps {
  message?: string;
}

function PlanetLoader({ message = "Loading" }: PlanetLoaderProps) {
  const [dots, setDots] = React.useState("");
  const [increasing, setIncreasing] = React.useState(true);

  React.useEffect(() => {
    // Animate dots: "" -> "." -> ".." -> "..." -> ".." -> "." -> "" (cycle)
    const interval = setInterval(() => {
      setDots((prev) => {
        if (increasing) {
          if (prev === "") return ".";
          if (prev === ".") return "..";
          if (prev === "..") {
            setIncreasing(false);
            return "...";
          }
        } else {
          if (prev === "...") return "..";
          if (prev === "..") return ".";
          if (prev === ".") {
            setIncreasing(true);
            return "";
          }
        }
        return prev;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [increasing]);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden z-50" style={{
      background: "radial-gradient(ellipse at center, hsl(220 30% 8%) 0%, hsl(220 30% 2%) 100%)"
    }}>
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Rocket */}
        <div className="relative mb-8">
          {/* Flame effect */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-8 h-20 opacity-0 animate-rocket-flame">
            <div className="w-full h-full bg-gradient-to-b from-orange-400 via-red-500 to-transparent blur-md rounded-full" />
          </div>
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-5 h-14 opacity-0 animate-rocket-flame-inner" style={{ animationDelay: '0.1s' }}>
            <div className="w-full h-full bg-gradient-to-b from-yellow-300 via-orange-400 to-transparent blur-md rounded-full" />
          </div>

          {/* Rocket body */}
          <div className="relative">
            {/* Nose cone */}
            <div className="w-12 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-t-3xl mx-auto shadow-lg shadow-red-500/50 relative z-10" />

            {/* Main body */}
            <div className="w-12 h-20 bg-gradient-to-b from-slate-300 via-slate-200 to-slate-300 mx-auto border-2 border-slate-400 flex flex-col items-center justify-center gap-2">
              <div className="w-8 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-400/50" />
              <div className="w-8 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-400/50" />
              <div className="w-8 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-400/50" />
            </div>

            {/* Left fin */}
            <div className="absolute -left-6 bottom-2 w-6 h-8 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-tr-2xl shadow-lg shadow-cyan-500/40 transform -skew-x-12" />

            {/* Right fin */}
            <div className="absolute -right-6 bottom-2 w-6 h-8 bg-gradient-to-bl from-cyan-500 to-cyan-600 rounded-tl-2xl shadow-lg shadow-cyan-500/40 transform skew-x-12" />

            {/* Bottom thruster */}
            <div className="w-10 h-4 bg-gradient-to-b from-gray-400 to-gray-600 mx-auto rounded-b-lg border border-gray-500" />
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center mt-8">
          <div className="text-gray-200 text-2xl font-medium" style={{
            fontFamily: "'Orbitron', monospace",
            letterSpacing: "0.1em",
            minHeight: "2rem"
          }}>
            {message}{dots}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanetLoader;
