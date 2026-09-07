'use client';
import { useEffect, useRef, useCallback } from 'react'

const VERT = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const FRAG = `
precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_hover;
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_c3;
uniform vec3 u_c4;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = u_resolution.x / u_resolution.y;

  vec2 st = (uv - 0.5) * vec2(aspect, 1.0);
  vec2 mouse = (u_mouse - 0.5) * vec2(aspect, 1.0);

  float t = u_time * 0.25;

  // --- Interactive circle that follows mouse ---
  vec2 p = st - mouse;
  float d = length(p) - 0.22;
  float n = noise(st * 4.0 + t) * 0.04;
  d += n;

  float field = 1.0 - smoothstep(-0.12, 0.06, d);
  float edge = exp(-d * d * 16.0);

  // --- Ambient drifting blobs (always visible) ---
  vec2 b1 = vec2(sin(t * 0.7) * 0.3, cos(t * 0.5) * 0.2);
  vec2 b2 = vec2(cos(t * 0.6) * 0.4, sin(t * 0.8) * 0.25);
  vec2 b3 = vec2(sin(t * 0.4 + 2.0) * 0.35, cos(t * 0.3 + 1.0) * 0.3);
  float blob1 = exp(-dot(st - b1, st - b1) * 3.0);
  float blob2 = exp(-dot(st - b2, st - b2) * 4.0);
  float blob3 = exp(-dot(st - b3, st - b3) * 2.5);

  // Color mixing
  vec3 col = mix(u_c1, u_c2, uv.x + sin(t * 0.8) * 0.12);
  col = mix(col, u_c3, uv.y + cos(t * 0.6) * 0.12);

  vec3 hoverCol = col;
  hoverCol = mix(hoverCol, u_c4, field * 0.5);
  hoverCol += edge * 0.4 * u_c4;

  vec3 ambientCol = u_c1 * blob1 + u_c2 * blob2 + u_c3 * blob3;

  // Ambient alpha (always visible)
  float ambientAlpha = (blob1 + blob2 + blob3) * 0.18;

  // Hover alpha (appears on mouse enter)
  float hoverAlpha = (1.0 - field) * 0.35 + edge * 0.3;
  hoverAlpha *= u_hover;

  // Combine
  vec3 finalCol = mix(ambientCol, hoverCol, u_hover);
  float finalAlpha = ambientAlpha + hoverAlpha;
  finalAlpha = clamp(finalAlpha, 0.0, 0.55);

  gl_FragColor = vec4(finalCol, finalAlpha);
}
`

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function createProgram(gl: WebGLRenderingContext, vert: string, frag: string): WebGLProgram | null {
  const vs = createShader(gl, gl.VERTEX_SHADER, vert)
  const fs = createShader(gl, gl.FRAGMENT_SHADER, frag)
  if (!vs || !fs) return null
  const program = gl.createProgram()
  if (!program) return null
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
    return null
  }
  return program
}

export interface ShaderLensBlurProps {
  className?: string
  colors?: [string, string, string, string]
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255
  ]
}

const LIGHT_COLORS: [string, string, string, string] = ['#D5F981', '#A1BBE7', '#F2BAE2', '#68E8FA']
const DARK_COLORS: [string, string, string, string] = ['#3B6D1E', '#2A4A8C', '#7C2D6E', '#1A6B7A']

export { LIGHT_COLORS, DARK_COLORS }

export default function ShaderLensBlur({ className, colors }: ShaderLensBlurProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 })
  const hoverRef = useRef(0)
  const targetHoverRef = useRef(0)
  const colorsRef = useRef(colors ?? LIGHT_COLORS)

  useEffect(() => {
    colorsRef.current = colors ?? LIGHT_COLORS
  }, [colors])

  const handlePointerMove = useCallback((e: PointerEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    targetHoverRef.current = 1
    targetMouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    }
  }, [])

  const handlePointerEnter = useCallback(() => {
    targetHoverRef.current = 1
  }, [])

  const handlePointerLeave = useCallback(() => {
    targetHoverRef.current = 0
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false })
    if (!gl) return

    const program = createProgram(gl, VERT, FRAG)
    if (!program) return

    const posLoc = gl.getAttribLocation(program, 'a_position')
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    const uRes = gl.getUniformLocation(program, 'u_resolution')
    const uMouse = gl.getUniformLocation(program, 'u_mouse')
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uHover = gl.getUniformLocation(program, 'u_hover')
    const uC1 = gl.getUniformLocation(program, 'u_c1')
    const uC2 = gl.getUniformLocation(program, 'u_c2')
    const uC3 = gl.getUniformLocation(program, 'u_c3')
    const uC4 = gl.getUniformLocation(program, 'u_c4')

    // One full-screen layer writes straight alpha; blending here would attenuate it twice.
    gl.disable(gl.BLEND)

    const startTime = performance.now()
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = true
    const surface = canvas.closest('section') ?? canvas
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    observer.observe(surface)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr
        canvas.height = h * dpr
      }
    }

    const render = () => {
      if (!visible || document.hidden) { rafRef.current = requestAnimationFrame(render); return }
      resize()
      const w = canvas.width
      const h = canvas.height
      gl.viewport(0, 0, w, h)

      const lerp = reduced.matches ? 1 : 0.08
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * lerp
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * lerp
      hoverRef.current += (targetHoverRef.current - hoverRef.current) * 0.05

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.useProgram(program)
      gl.enableVertexAttribArray(posLoc)
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

      gl.uniform2f(uRes, w, h)
      gl.uniform2f(uMouse, mouseRef.current.x, 1.0 - mouseRef.current.y)
      gl.uniform1f(uTime, reduced.matches ? 0 : (performance.now() - startTime) / 1000)
      gl.uniform1f(uHover, reduced.matches ? 0 : hoverRef.current)

      const c = colorsRef.current
      const [r1, g1, b1] = hexToRgb(c[0])
      const [r2, g2, b2] = hexToRgb(c[1])
      const [r3, g3, b3] = hexToRgb(c[2])
      const [r4, g4, b4] = hexToRgb(c[3])
      gl.uniform3f(uC1, r1, g1, b1)
      gl.uniform3f(uC2, r2, g2, b2)
      gl.uniform3f(uC3, r3, g3, b3)
      gl.uniform3f(uC4, r4, g4, b4)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafRef.current = requestAnimationFrame(render)
    }

    surface.addEventListener('pointermove', handlePointerMove as EventListener)
    surface.addEventListener('pointerenter', handlePointerEnter as EventListener)
    surface.addEventListener('pointerleave', handlePointerLeave as EventListener)

    rafRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafRef.current)
      surface.removeEventListener('pointermove', handlePointerMove as EventListener)
      surface.removeEventListener('pointerenter', handlePointerEnter as EventListener)
      surface.removeEventListener('pointerleave', handlePointerLeave as EventListener)
      observer.disconnect()
      gl.deleteProgram(program)
      gl.deleteBuffer(buf)
    }
  }, [handlePointerMove, handlePointerEnter, handlePointerLeave])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" style={{ pointerEvents: 'none' }} />
}
