const MatrixCell = ({
  title,
  description,
  accent = false,
}: { title: string; description: string; accent?: boolean }) => (
  <div
    className={`p-4 rounded-xl border text-center shadow-sm ${
      accent ? "bg-accent-blue-bg border-accent-blue-border" : "bg-white border-gray-100"
    }`}
  >
    <h4 className="font-bold text-sm text-text-primary mb-2">{title}</h4>
    <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
  </div>
)

export function ImpactMatrix() {
  return (
    <div className="relative w-full max-w-sm p-4">
      {/* Axis Labels */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-500 uppercase tracking-wider">
        Impact
      </div>
      <div className="absolute -left-14 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs font-bold text-gray-500 uppercase tracking-wider">
        Effort
      </div>

      {/* Matrix Grid */}
      <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-64">
        <MatrixCell title="Quick Wins" description="Variable costs, contractors" accent />
        <MatrixCell title="Major Projects" description="Fixed infrastructure" />
        <MatrixCell title="Fill-ins" description="Minor optimizations" />
        <MatrixCell title="Thankless Tasks" description="Avoid these" />
      </div>

      {/* Axis indicators */}
      <div className="absolute -left-4 top-2 text-xs text-gray-400 font-medium">High</div>
      <div className="absolute -left-4 bottom-2 text-xs text-gray-400 font-medium">Low</div>
      <div className="absolute left-2 -bottom-6 text-xs text-gray-400 font-medium">Low</div>
      <div className="absolute right-2 -bottom-6 text-xs text-gray-400 font-medium">High</div>
    </div>
  )
}
