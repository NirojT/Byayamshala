export const ScanAnimation: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
    <div className="relative w-full h-full">
      {/* Moving scan line */}
      <div className="absolute left-2 right-2 h-1 bg-blue-500 bg-opacity-80 rounded-full animate-scanline" />
      {/* Border corners */}
      <div className="absolute border-t-4 border-l-4 border-blue-500 w-8 h-8 top-0 left-0 rounded-tl-lg" />
      <div className="absolute border-t-4 border-r-4 border-blue-500 w-8 h-8 top-0 right-0 rounded-tr-lg" />
      <div className="absolute border-b-4 border-l-4 border-blue-500 w-8 h-8 bottom-0 left-0 rounded-bl-lg" />
      <div className="absolute border-b-4 border-r-4 border-blue-500 w-8 h-8 bottom-0 right-0 rounded-br-lg" />
    </div>
    <style>
      {`
        @media (prefers-reduced-motion: no-preference) {
          .animate-scanline {
            animation: scanline 2s linear infinite;
          }
        }
        @keyframes scanline {
          0% {
            top: 8%;
          }
          100% {
            top: 78%;
          }
        }
      `}
    </style>
  </div>
);