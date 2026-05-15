import { dailySalesData } from '../data/mockData'

export default function LineChart() {
  const width = 680
  const height = 200
  const paddingLeft = 60
  const paddingRight = 20
  const paddingTop = 20
  const paddingBottom = 36

  const data = dailySalesData
  const minVal = Math.min(...data)
  const maxVal = Math.max(...data)

  const chartW = width - paddingLeft - paddingRight
  const chartH = height - paddingTop - paddingBottom

  const xStep = chartW / (data.length - 1)
  const yScale = val => paddingTop + chartH - ((val - minVal) / (maxVal - minVal)) * chartH

  const points = data.map((v, i) => `${paddingLeft + i * xStep},${yScale(v)}`).join(' ')
  const fillPoints = `${paddingLeft},${paddingTop + chartH} ` + points + ` ${paddingLeft + (data.length - 1) * xStep},${paddingTop + chartH}`

  const yTicks = [20000, 30000, 40000, 50000, 60000, 70000, 80000]
  const xTicks = [1, 5, 10, 15, 20, 25, 31]

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.01" />
        </linearGradient>
      </defs>
      {yTicks.map(tick => {
        const y = yScale(tick)
        if (y < paddingTop || y > paddingTop + chartH) return null
        return (
          <g key={tick}>
            <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#e5e7eb" strokeWidth="1" />
            <text x={paddingLeft - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#9ca3af">
              {(tick / 1000).toFixed(0)}k
            </text>
          </g>
        )
      })}
      {xTicks.map(tick => {
        const x = paddingLeft + (tick - 1) * xStep
        return (
          <text key={tick} x={x} y={height - 6} textAnchor="middle" fontSize="10" fill="#9ca3af">{tick}</text>
        )
      })}
      <polygon points={fillPoints} fill="url(#lineGrad)" />
      <polyline points={points} fill="none" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}
