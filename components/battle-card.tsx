export interface BattleCardProps {
  title: string
  titleEmoji: string
  what: {
    point: string
    emoji: string
  }
  why: {
    points: string[]
    emoji: string
  }
  how: {
    points: string[]
    emoji: string
  }
}

export function BattleCard({ title, titleEmoji, what, why, how }: BattleCardProps) {
  return (
    <div className="w-[380px] bg-gray-50 rounded-20px shadow-subtle flex flex-col border border-notion-border">
      {/* Header */}
      <div className="px-6 py-5 flex items-center gap-3">
        <span className="text-3xl">{titleEmoji}</span>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">{title}</h1>
      </div>

      {/* Content Area */}
      <div className="px-5 py-4 flex flex-col gap-4 flex-1">
        {/* The What Section */}
        <div className="bg-notion-white border border-notion-border rounded-2xl p-4">
          <div className="inline-flex items-center gap-2 bg-accent-blue-bg text-text-primary px-3 py-1 rounded-full text-xs font-bold mb-3">
            <span className="text-base">🎯</span>
            <span>The What</span>
          </div>
          <p className="text-sm text-gray-800 leading-relaxed">{what.point}</p>
        </div>

        {/* The Why Section */}
        <div className="bg-notion-white border border-notion-border rounded-2xl p-4">
          <div className="inline-flex items-center gap-2 bg-notion-block text-text-primary px-3 py-1 rounded-full text-xs font-bold mb-3">
            <span className="text-base">🔍</span>
            <span>The Why</span>
          </div>
          <ul className="space-y-2">
            {why.points.map((point, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-800 leading-relaxed">
                <span className="text-gray-400 mt-1 text-xs">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* The How Section */}
        <div className="bg-notion-white border border-notion-border rounded-2xl p-4">
          <div className="inline-flex items-center gap-2 bg-accent-green-bg text-text-primary px-3 py-1 rounded-full text-xs font-bold mb-3">
            <span className="text-base">⚡</span>
            <span>The How</span>
          </div>
          <ul className="space-y-2">
            {how.points.map((point, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-800 leading-relaxed">
                <span className="text-gray-400 mt-1 text-xs">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto px-6 py-5 border-t border-gray-100 flex justify-between items-center">
        <div className="text-xs text-gray-700 space-y-0.5">
          <p className="font-bold text-text-primary">Sai Krishna VK</p>
          <p>@5aitec</p>
          <p>5aitec.com</p>
        </div>
        <img src="/stanford-logo.png" alt="Stanford GSB Logo" className="h-12 w-12" />
      </div>
    </div>
  )
}
