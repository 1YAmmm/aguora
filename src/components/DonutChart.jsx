import { paymentTypeData } from '../data/mockData'

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function arcPath(cx, cy, r, startAngle, endAngle) {
  const s = polarToCartesian(cx, cy, r, endAngle)
  const e = polarToCartesian(cx, cy, r, startAngle)
  const large = endAngle - startAngle <= 180 ? 0 : 1
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 0 ${e.x} ${e.y}`
}

export default function DonutChart() {
  const data = paymentTypeData
  const total = data.reduce((a, b) => a + b.value, 0)
  const cx = 90, cy = 80, r = 60, inner = 38

  let currentAngle = 0
  const slices = data.map(d => {
    const sweep = (d.value / total) * 360
    const start = currentAngle
    const end = currentAngle + sweep
    currentAngle = end
    return { ...d, start, end, sweep }
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <svg viewBox="0 0 180 160" width="180" height="160">
        {slices.map((s, i) => {
          const outerPath = arcPath(cx, cy, r, s.start, s.end)
          const innerPath = arcPath(cx, cy, inner, s.start, s.end)
          const midAngle = s.start + s.sweep / 2
          const outerS = polarToCartesian(cx, cy, r, s.end)
          const outerE = polarToCartesian(cx, cy, r, s.start)
          const innerS = polarToCartesian(cx, cy, inner, s.start)
          const innerE = polarToCartesian(cx, cy, inner, s.end)
          const large = s.sweep > 180 ? 1 : 0
          const path = `M ${outerS.x} ${outerS.y} A ${r} ${r} 0 ${large} 0 ${outerE.x} ${outerE.y} L ${innerS.x} ${innerS.y} A ${inner} ${inner} 0 ${large} 1 ${innerE.x} ${innerE.y} Z`
          return (
            <path key={s.name} d={path} fill={s.color} opacity="0.92" />
          )
        })}
        <circle cx={cx} cy={cy} r={inner - 2} fill="white" />
      </svg>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
        {data.map(d => (
          <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#6b7280' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
            {d.name}
          </div>
        ))}
      </div>
    </div>
  )
}
