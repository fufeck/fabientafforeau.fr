import { useEffect, useRef, useState, useCallback } from 'react'
import './BrickName.css'

// 5x7 pixel font - each letter is a 5-wide, 7-tall bitmap
const PIXEL_FONT = {
  A: [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
  ],
  B: [
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,0],
  ],
  C: [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,1],
    [0,1,1,1,0],
  ],
  D: [
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,0],
  ],
  E: [
    [1,1,1,1,1],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,1],
  ],
  F: [
    [1,1,1,1,1],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
  ],
  I: [
    [1,1,1,1,1],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [1,1,1,1,1],
  ],
  J: [
    [0,0,1,1,1],
    [0,0,0,1,0],
    [0,0,0,1,0],
    [0,0,0,1,0],
    [1,0,0,1,0],
    [1,0,0,1,0],
    [0,1,1,0,0],
  ],
  K: [
    [1,0,0,0,1],
    [1,0,0,1,0],
    [1,0,1,0,0],
    [1,1,0,0,0],
    [1,0,1,0,0],
    [1,0,0,1,0],
    [1,0,0,0,1],
  ],
  L: [
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,1],
  ],
  N: [
    [1,0,0,0,1],
    [1,1,0,0,1],
    [1,0,1,0,1],
    [1,0,1,0,1],
    [1,0,0,1,1],
    [1,0,0,1,1],
    [1,0,0,0,1],
  ],
  O: [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
  ],
  P: [
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
  ],
  R: [
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,0],
    [1,0,1,0,0],
    [1,0,0,1,0],
    [1,0,0,0,1],
  ],
  S: [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,0],
    [0,1,1,1,0],
    [0,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
  ],
  T: [
    [1,1,1,1,1],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
  ],
  U: [
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
  ],
  V: [
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,0,1,0],
    [0,1,0,1,0],
    [0,0,1,0,0],
  ],
  ',': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,1,0,0],
    [0,1,0,0,0],
  ],
  ' ': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
  ],
}

const LETTER_W = 5
const LETTER_H = 7
const LETTER_SPACING = 1
const LINE_SPACING = 2

const BRICK_COLOR = '#fec788'
const STATIC_COLOR = '#ffffff'
const SHIP_COLOR = '#ffffff'
const BULLET_SPEED = 7
const SHIP_SPEED = 6
const FIRE_COOLDOWN = 140
const PARTICLE_COUNT = 5
const PARTICLE_LIFE = 25

function getLineCols(line) {
  return line.length * LETTER_W + (line.length - 1) * LETTER_SPACING
}

const NAME_SCALE = 1.6 // name bricks are bigger than static text

function createAllBricks(cssW, cssH) {
  const allLines = ['BONJOUR, JE SUIS', 'FABIEN', 'TAFFOREAU', 'DEVELOPPEUR FULLSTACK']

  // Base size from the widest line (static text, which has more chars)
  const staticLines = [allLines[0], allLines[3]]
  const nameLines = [allLines[1], allLines[2]]
  const maxStaticCols = Math.max(...staticLines.map(getLineCols))
  const maxNameCols = Math.max(...nameLines.map(getLineCols))

  // Compute base brick size from canvas constraints
  const maxFromStaticW = (cssW * 0.75) / maxStaticCols
  const maxFromNameW = (cssW * 0.75) / (maxNameCols * NAME_SCALE)
  const baseMaxW = Math.min(maxFromStaticW, maxFromNameW)

  // Total height: 2 static lines + 2 name lines (scaled) + 3 gaps
  const staticRowH = LETTER_H
  const nameRowH = LETTER_H * NAME_SCALE
  const totalH = 2 * staticRowH + 2 * nameRowH + 3 * LINE_SPACING
  const baseMaxH = (cssH * 0.55) / totalH

  const baseSize = Math.floor(Math.min(baseMaxW, baseMaxH))
  const nameSize = Math.floor(baseSize * NAME_SCALE)

  const baseGap = Math.max(1, Math.floor(baseSize * 0.15))
  const nameGap = Math.max(1, Math.floor(nameSize * 0.15))

  const baseCellW = baseSize + baseGap
  const baseCellH = baseSize + baseGap
  const nameCellW = nameSize + nameGap
  const nameCellH = nameSize + nameGap

  // Compute total height for vertical centering
  const totalPixelH =
    (LETTER_H * baseCellH) +                    // line 0
    LINE_SPACING * baseCellH +                   // gap
    (LETTER_H * nameCellH) +                     // line 1
    LINE_SPACING * nameCellH +                   // gap
    (LETTER_H * nameCellH) +                     // line 2
    LINE_SPACING * baseCellH +                   // gap
    (LETTER_H * baseCellH)                       // line 3

  let cursorY = (cssH * 0.5) - totalPixelH / 2

  const destructible = []
  const indestructible = []

  allLines.forEach((line, lineIdx) => {
    const isName = lineIdx === 1 || lineIdx === 2
    const size = isName ? nameSize : baseSize
    const cellW = isName ? nameCellW : baseCellW
    const cellH = isName ? nameCellH : baseCellH

    const lineCols = getLineCols(line)
    const linePixelW = lineCols * cellW
    const offsetX = cssW - linePixelW - 10

    for (let charIdx = 0; charIdx < line.length; charIdx++) {
      const ch = line[charIdx]
      const glyph = PIXEL_FONT[ch]
      if (!glyph) continue

      const charOffsetX = charIdx * (LETTER_W + LETTER_SPACING)

      for (let row = 0; row < LETTER_H; row++) {
        for (let col = 0; col < LETTER_W; col++) {
          if (glyph[row][col]) {
            const x = offsetX + (charOffsetX + col) * cellW
            const y = cursorY + row * cellH
            const brick = { x, y, w: size, h: size, alive: true }
            if (isName) {
              destructible.push(brick)
            } else {
              indestructible.push(brick)
            }
          }
        }
      }
    }

    cursorY += LETTER_H * cellH + LINE_SPACING * cellH
  })

  return { destructible, indestructible }
}

function drawShip(ctx, x, y) {
  const s = 3
  // Pixel-art spaceship (symmetric, drawn row by row from top)
  const rows = [
    //        shape definition: [offsetX, width]
    [[0, 1]],                                      // cannon tip
    [[-1, 3]],                                     // cannon
    [[-1, 3]],                                     // cannon base
    [[-5, 3], [-1, 3], [3, 3]],                    // upper hull + wings start
    [[-7, 15]],                                    // full wing span
    [[-7, 15]],                                    // body
    [[-6, 2], [-3, 7], [5, 2]],                    // lower hull with notches
    [[-7, 3], [-2, 5], [5, 3]],                    // engines row
    [[-7, 2], [-1, 3], [6, 2]],                    // thruster nozzles
  ]

  const startY = y - rows.length * s

  rows.forEach((row, rowIdx) => {
    row.forEach(([offX, w]) => {
      // Main body in white
      ctx.fillStyle = SHIP_COLOR
      ctx.fillRect(x + offX * s, startY + rowIdx * s, w * s, s)
    })
  })

  // Accent details (cockpit window + thruster glow)
  ctx.fillStyle = '#fec788'
  // Cockpit
  ctx.fillRect(x - 1 * s, startY + 4 * s, 3 * s, s)
  // Thruster flames
  ctx.fillStyle = '#ff6b3d'
  ctx.fillRect(x - 6 * s, startY + 8 * s, 1 * s, s)
  ctx.fillRect(x + 0 * s, startY + 8 * s, 1 * s, s)
  ctx.fillRect(x + 6 * s, startY + 8 * s, 1 * s, s)
}

function BrickName() {
  const canvasRef = useRef(null)
  const gameRef = useRef(null)
  const [hintVisible, setHintVisible] = useState(true)

  const initGame = useCallback((canvas) => {
    const dpr = window.devicePixelRatio || 1
    const canvasRect = canvas.getBoundingClientRect()
    const cssW = canvasRect.width
    const cssH = canvasRect.height

    canvas.width = cssW * dpr
    canvas.height = cssH * dpr
    const ctx = canvas.getContext('2d')
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const { destructible, indestructible } = createAllBricks(cssW, cssH)

    return {
      w: cssW,
      h: cssH,
      bricks: destructible,
      staticBricks: indestructible,
      ship: { x: cssW / 2, y: cssH - 20 },
      bullets: [],
      particles: [],
      keys: {},
      lastFire: 0,
      animId: null,
      allDestroyed: false
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let game = initGame(canvas)
    gameRef.current = game
    const ctx = canvas.getContext('2d')

    const onKeyDown = (e) => {
      if (['ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault()
        game.keys[e.key] = true
        setHintVisible(false)
      }
    }
    const onKeyUp = (e) => {
      game.keys[e.key] = false
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    function update(time) {
      if (game.allDestroyed) return

      if (game.keys['ArrowLeft']) {
        game.ship.x = Math.max(25, game.ship.x - SHIP_SPEED)
      }
      if (game.keys['ArrowRight']) {
        game.ship.x = Math.min(game.w - 25, game.ship.x + SHIP_SPEED)
      }

      if (game.keys[' '] && time - game.lastFire > FIRE_COOLDOWN) {
        game.bullets.push({ x: game.ship.x, y: game.ship.y - 18, vy: -BULLET_SPEED })
        game.lastFire = time
      }

      game.bullets.forEach(b => { b.y += b.vy })
      game.bullets = game.bullets.filter(b => b.y > -10)

      game.bullets = game.bullets.filter(bullet => {
        for (const brick of game.bricks) {
          if (!brick.alive) continue
          if (
            bullet.x >= brick.x &&
            bullet.x <= brick.x + brick.w &&
            bullet.y >= brick.y &&
            bullet.y <= brick.y + brick.h
          ) {
            brick.alive = false
            for (let i = 0; i < PARTICLE_COUNT; i++) {
              game.particles.push({
                x: brick.x + brick.w / 2,
                y: brick.y + brick.h / 2,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: PARTICLE_LIFE
              })
            }
            return false
          }
        }
        return true
      })

      game.particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.life--
      })
      game.particles = game.particles.filter(p => p.life > 0)

      if (game.bricks.every(b => !b.alive) && game.particles.length === 0) {
        game.allDestroyed = true
      }
    }

    function draw() {
      ctx.clearRect(0, 0, game.w, game.h)

      // Draw static (indestructible) bricks in white
      ctx.fillStyle = STATIC_COLOR
      for (const brick of game.staticBricks) {
        ctx.fillRect(brick.x, brick.y, brick.w, brick.h)
      }

      // Draw destructible bricks in gold
      ctx.fillStyle = BRICK_COLOR
      for (const brick of game.bricks) {
        if (brick.alive) {
          ctx.fillRect(brick.x, brick.y, brick.w, brick.h)
        }
      }

      // Draw particles
      for (const p of game.particles) {
        const alpha = p.life / PARTICLE_LIFE
        ctx.fillStyle = `rgba(254, 199, 136, ${alpha})`
        ctx.fillRect(p.x - 2, p.y - 2, 4, 4)
      }

      if (!game.allDestroyed) {
        ctx.fillStyle = '#ffffff'
        for (const b of game.bullets) {
          ctx.fillRect(b.x - 2, b.y - 4, 4, 8)
        }
        drawShip(ctx, game.ship.x, game.ship.y)
      }
    }

    function loop(time) {
      update(time)
      draw()
      if (!game.allDestroyed) {
        game.animId = requestAnimationFrame(loop)
      }
    }

    game.animId = requestAnimationFrame(loop)

    const handleResize = () => {
      const wasDestroyed = game.allDestroyed
      if (game.animId) cancelAnimationFrame(game.animId)

      game = initGame(canvas)
      game.allDestroyed = wasDestroyed
      if (wasDestroyed) {
        game.bricks.forEach(b => { b.alive = false })
        draw()
      } else {
        gameRef.current = game
        game.animId = requestAnimationFrame(loop)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (game.animId) cancelAnimationFrame(game.animId)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('resize', handleResize)
    }
  }, [initGame])

  return (
    <div className="brick-name">
      <canvas
        ref={canvasRef}
        className="brick-name__canvas"
        style={{ height: '450px' }}
      />
      <p className={`brick-name__hint${hintVisible ? '' : ' brick-name__hint--hidden'}`}>
        &larr; &rarr; pour d&eacute;placer &bull; espace pour tirer
      </p>
    </div>
  )
}

export default BrickName
