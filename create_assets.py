import os

os.makedirs('assets/images', exist_ok=True)
os.makedirs('assets/music', exist_ok=True)
os.makedirs('assets/fonts', exist_ok=True)

images = [
    'aziel_1.svg', 'aziel_2.svg',
    'aziel_story1.svg', 'aziel_story2.svg', 'aziel_story3.svg', 'aziel_story4.svg',
    'aziel_polaroid1.svg', 'aziel_polaroid2.svg', 'aziel_polaroid3.svg', 
    'aziel_polaroid4.svg', 'aziel_polaroid5.svg', 'aziel_polaroid6.svg',
    'aziel_final.svg'
]

def make_svg(title, subtitle):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#180e1b" />
      <stop offset="50%" stop-color="#2e1526" />
      <stop offset="100%" stop-color="#0a080d" />
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.4" r="0.5">
      <stop offset="0%" stop-color="#f3efe6" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#f3efe6" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#bg)" />
  <circle cx="400" cy="400" r="300" fill="url(#glow)" />
  <g transform="translate(400, 420) scale(1.2)" fill="none" stroke="#f3efe6" stroke-width="1.5" opacity="0.65">
    <path d="M0,120 Q-15,40 0,-80 Q15,40 0,120 Z" fill="#fcf9f5" fill-opacity="0.15" />
    <path d="M0,20 Q-70,-30 -110,-10 Q-60,40 0,20 Z" fill="#fcf9f5" fill-opacity="0.12" />
    <path d="M0,20 Q70,-30 110,-10 Q60,40 0,20 Z" fill="#fcf9f5" fill-opacity="0.12" />
    <path d="M0,60 Q-80,80 -120,40 Q-50,110 0,60 Z" fill="#fcf9f5" fill-opacity="0.1" />
    <path d="M0,60 Q80,80 120,40 Q50,110 0,60 Z" fill="#fcf9f5" fill-opacity="0.1" />
    <path d="M0,120 Q0,200 0,250" stroke="#8a9a86" stroke-width="3" />
    <path d="M0,20 Q-15,-20 -25,-40" stroke="#e5c179" stroke-width="1.5" />
    <circle cx="-25" cy="-40" r="3" fill="#dfb86c" />
    <path d="M0,20 Q0,-30 0,-50" stroke="#e5c179" stroke-width="1.5" />
    <circle cx="0" cy="-50" r="3" fill="#dfb86c" />
    <path d="M0,20 Q15,-20 25,-40" stroke="#e5c179" stroke-width="1.5" />
    <circle cx="25" cy="-40" r="3" fill="#dfb86c" />
  </g>
  <text x="400" y="750" text-anchor="middle" fill="#fcf9f5" font-family="Georgia, serif" font-size="36" font-weight="500" letter-spacing="1">{title}</text>
  <text x="400" y="800" text-anchor="middle" fill="#d9a5b3" font-family="sans-serif" font-size="22" font-weight="300" letter-spacing="2">{subtitle}</text>
  <text x="400" y="850" text-anchor="middle" fill="#8a7b8c" font-family="sans-serif" font-size="16" font-weight="300">(Replace with Aziel's photo in assets/images/)</text>
</svg>'''

for name in images:
    title = name.replace('aziel_', '').replace('.svg', '').replace('_', ' ').upper()
    with open(f'assets/images/{name}', 'w', encoding='utf-8') as f:
        f.write(make_svg(f'AZIEL ♡ {title}', 'A Beautiful Memory'))

print("All asset placeholder SVGs regenerated!")
