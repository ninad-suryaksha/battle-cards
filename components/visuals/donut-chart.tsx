export function DonutChart() {
  const data = [
    { percentage: 65, color: "#0066CC", label: "Organic Growth" },
    { percentage: 25, color: "#9CA3AF", label: "Acquired Users" },
    { percentage: 10, color: "#E5E7EB", label: "Inactive" },
  ]

  const radius = 50
  const strokeWidth = 14
  const circumference = 2 * Math.PI * radius
  let cumulativePercentage = 0

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="relative">
        <svg width="140" height="140" className="transform -rotate-90 drop-shadow-sm">
          {data.map((item, index) => {
            const strokeDasharray = circumference
            const strokeDashoffset = circumference * (1 - item.percentage / 100)
            const rotation = (cumulativePercentage / 100) * 360
            cumulativePercentage += item.percentage

            return (
              <circle
                key={index}
                cx="70"
                cy="70"
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                style={{
                  transformOrigin: "70px 70px",
                  transform: `rotate(${rotation}deg)`,
                }}
              />
            )
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-text-primary">65%</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full bg-white rounded-xl p-4 shadow-sm">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
            <span className="text-sm text-gray-700">{item.label}</span>
            <span className="text-sm text-gray-500 ml-auto font-medium">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
