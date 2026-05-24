export const SpotlightCard = ({ children, className = "" }) => (
  <div
    className={`group relative overflow-hidden rounded-2xl bg-emerald-950 ${className}`}
  >
    <div className="pointer-events-none absolute -inset-20 opacity-0 transition duration-500 group-hover:opacity-100">
      <div className="absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-yellow-300/20 blur-3xl" />
    </div>
    <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
      <div className="h-full w-full bg-[radial-gradient(circle_at_50%_0%,rgba(250,204,21,0.22),transparent_45%)]" />
    </div>
    <div className="relative z-10">{children}</div>
  </div>
);
