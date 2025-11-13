export default function LoaderOverlay() {
  return (
    <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-20">
      <div className="text-blue-600 font-medium animate-pulse">
        Loading...
      </div>
    </div>
  );
}
