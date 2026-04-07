export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="flex flex-col items-center gap-4">
        <span
          className="font-display font-bold text-3xl animate-pulse"
          style={{ color: "#7C3AED" }}
        >
          FR
        </span>
        <div
          className="w-1 h-1 rounded-full animate-ping"
          style={{ backgroundColor: "#7C3AED" }}
        />
      </div>
    </div>
  );
}
