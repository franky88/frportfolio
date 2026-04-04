export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center h-64">
      <span
        className="font-display font-bold text-xl animate-pulse"
        style={{ color: "#E8A020" }}
      >
        Loading…
      </span>
    </div>
  );
}
