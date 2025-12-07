import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'Collbrai - Scale With Smart AI Systems'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #000000, #111827)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ 
          display: 'flex',
          fontSize: 84, 
          fontWeight: 800, 
          letterSpacing: '-0.04em',
          background: 'linear-gradient(to right, #ffffff, #a4ff9f)',
          backgroundClip: 'text',
          color: 'transparent',
        }}>
          Collbrai
        </div>
        <div style={{ fontSize: 36, marginTop: 24, opacity: 0.8, fontWeight: 500 }}>
          Scale With Smart AI Systems
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
