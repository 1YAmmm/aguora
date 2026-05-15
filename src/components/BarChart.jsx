import { categoryData } from '../data/mockData'

export default function BarChart() {
  const width = 680
  const height = 200
  const paddingLeft = 60
  const paddingRight = 20
  const paddingTop = 16
  const paddingBottom = 40

  const data = categoryData
  const maxVal = Math.max(...data.map(d => d.value))
  const chartW = width - paddingLeft - paddingRight
  const chartH = height - paddingTop - paddingBottom
  const barWidth = (chartW / data.length) * 0.55
  const barGap = chartW / data.length

  const yTicks = [30000, 40000, 50000, 60000, 70000]

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" style={{ display: 'block' }}>
      {yTicks.map(tick => {
        const y = paddingTop + chartH - (tick / maxVal) * chartH
        return (
          <g key={tick}>
            <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#e5e7eb" strokeWidth="1" />
            <text x={paddingLeft - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#9ca3af">
              {(tick / 1000).toFixed(0)}k
            </text>
          </g>
        )
      })}
      {data.map((d, i) => {
        const barH = (d.value / maxVal) * chartH
        const x = paddingLeft + i * barGap + (barGap - barWidth) / 2
        const y = paddingTop + chartH - barH
        return (
          <g key={d.name}>
            <rect x={x} y={y} width={barWidth} height={barH} fill="#2563eb" rx="3" opacity="0.85" />
            <text x={x + barWidth / 2} y={height - 6} textAnchor="middle" fontSize="9" fill="#9ca3af">
              {d.name.split(' ')[0]}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
