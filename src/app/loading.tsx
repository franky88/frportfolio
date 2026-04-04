export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="flex flex-col items-center gap-4">
        <span
          className="font-display font-bold text-3xl animate-pulse"
          style={{ color: "#E8A020" }}
        >
          FR
        </span>
        <div
          className="w-1 h-1 rounded-full animate-ping"
          style={{ backgroundColor: "#E8A020" }}
        />
      </div>
    </div>
  );
}
