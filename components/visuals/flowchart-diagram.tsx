const FlowNode = ({ text, accent = false }: { text: string; accent?: boolean }) => (
  <div
    className={`rounded-xl px-4 py-3 text-center text-sm font-medium min-h-[48px] flex items-center justify-center shadow-sm ${
      accent
        ? "bg-accent-blue-bg border-accent-blue-border text-blue-800 border"
        : "bg-white border-gray-100 text-text-primary border"
    }`}
  >
    {text}
  </div>
)

const Arrow = () => (
  <div className="flex items-center justify-center h-8">
    <div className="h-8 w-0.5 bg-gray-300"></div>
  </div>
)

export function FlowchartDiagram() {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
      <FlowNode text="New Growth Idea" />
      <Arrow />
      <FlowNode text="Does it align with core strategy?" accent />

      <div className="flex w-full justify-between items-start gap-6">
        <div className="flex flex-col items-center gap-3 flex-1">
          <div className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full shadow-sm">YES</div>
          <Arrow />
          <FlowNode text="Proceed" />
          <Arrow />
          <FlowNode text="Approve Budget" />
        </div>

        <div className="flex flex-col items-center gap-3 flex-1">
          <div className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-full shadow-sm">NO</div>
          <Arrow />
          <FlowNode text="Reject" />
          <Arrow />
          <FlowNode text="Find Better Fit" />
        </div>
      </div>
    </div>
  )
}
