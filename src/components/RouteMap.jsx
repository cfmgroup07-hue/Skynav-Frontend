import { useEffect, useRef } from 'react'
import { getAirportCoordinates } from '../utils/airportCoordinates'

function RouteMap({ segments = [] }) {
  const mapRef = useRef(null)

  useEffect(() => {
    if (!segments.length || !mapRef.current) return

    // Simple SVG fallback visualization
    const width = mapRef.current.clientWidth || 600
    const height = 300

    // Get all unique airports
    const uniqueAirports = []
    segments.forEach(seg => {
      const fromCoords = getAirportCoordinates(seg.from)
      const toCoords = getAirportCoordinates(seg.to)
      
      if (!uniqueAirports.find(a => a.code === seg.from)) {
        uniqueAirports.push({ code: seg.from, ...fromCoords })
      }
      if (!uniqueAirports.find(a => a.code === seg.to)) {
        uniqueAirports.push({ code: seg.to, ...toCoords })
      }
    })

    // Simple projection (Mercator-like)
    const minLat = Math.min(...uniqueAirports.map(a => a.lat))
    const maxLat = Math.max(...uniqueAirports.map(a => a.lat))
    const minLon = Math.min(...uniqueAirports.map(a => a.lon))
    const maxLon = Math.max(...uniqueAirports.map(a => a.lon))

    const project = (lat, lon) => {
      const x = ((lon - minLon) / (maxLon - minLon || 1)) * (width - 40) + 20
      const y = ((maxLat - lat) / (maxLat - minLat || 1)) * (height - 40) + 20
      return { x, y }
    }

    let svg = mapRef.current.querySelector('svg')
    if (!svg) {
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.setAttribute('width', width)
      svg.setAttribute('height', height)
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
      mapRef.current.appendChild(svg)
    } else {
      svg.innerHTML = ''
    }

    // Draw routes
    segments.forEach((seg, idx) => {
      const fromCoords = getAirportCoordinates(seg.from)
      const toCoords = getAirportCoordinates(seg.to)
      const fromProj = project(fromCoords.lat, fromCoords.lon)
      const toProj = project(toCoords.lat, toCoords.lon)

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('x1', fromProj.x)
      line.setAttribute('y1', fromProj.y)
      line.setAttribute('x2', toProj.x)
      line.setAttribute('y2', toProj.y)
      line.setAttribute('stroke', '#0ea5e9')
      line.setAttribute('stroke-width', '2')
      line.setAttribute('stroke-dasharray', idx > 0 ? '5,5' : '0')
      svg.appendChild(line)
    })

    // Draw airports
    uniqueAirports.forEach(airport => {
      const proj = project(airport.lat, airport.lon)
      
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', proj.x)
      circle.setAttribute('cy', proj.y)
      circle.setAttribute('r', '6')
      circle.setAttribute('fill', '#ef4444')
      svg.appendChild(circle)

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      text.setAttribute('x', proj.x)
      text.setAttribute('y', proj.y - 10)
      text.setAttribute('text-anchor', 'middle')
      text.setAttribute('font-size', '12')
      text.setAttribute('fill', '#1f2937')
      text.textContent = airport.code
      svg.appendChild(text)
    })
  }, [segments])

  if (!segments.length) {
    return (
      <div className="card">
        <p className="text-neutral-500 text-center py-8">Route map not available</p>
      </div>
    )
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Flight Route</h3>
      <div ref={mapRef} className="w-full border border-neutral-200 rounded-lg bg-white" style={{ height: '300px' }} />
    </div>
  )
}

export default RouteMap

