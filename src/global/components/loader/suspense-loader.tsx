const CoolSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-black/70 backdrop-blur-sm">
      {/* Enhanced classic dual-ring spinner with gradient glow */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-blue-300 opacity-50"></div>
        <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default CoolSpinner;
