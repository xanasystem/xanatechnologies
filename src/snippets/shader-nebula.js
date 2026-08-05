/**
 * Reusable brand-gradient WebGL background — salvaged from the retired hero demos.
 *
 * A single fullscreen triangle + fragment shader draws a flowing gradient/nebula
 * built from the brand tokens `--c1 / --c2 / --c3` (with `--bg` as the base), so it
 * re-themes automatically when the brand manual lands. ~4 KB, no three.js / Spline.
 * Reacts to scroll (drifts up + fades) and honours prefers-reduced-motion.
 *
 * Usage: place a full-size <canvas id="fx-canvas"> as a background layer, then call
 * `initShaderNebula()` on the client (e.g. inside an Astro `<script>`), optionally
 * passing a different canvas id: `initShaderNebula('my-canvas')`.
 */
export function initShaderNebula(canvasId = 'fx-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
  if (!gl) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Pull brand colors from CSS tokens so the shader re-themes with the manual.
  const css = getComputedStyle(document.documentElement);
  const hex = (name, fallback) => {
    const v = (css.getPropertyValue(name) || fallback).trim();
    const m = v.replace('#', '');
    return [
      parseInt(m.slice(0, 2), 16) / 255,
      parseInt(m.slice(2, 4), 16) / 255,
      parseInt(m.slice(4, 6), 16) / 255,
    ];
  };
  const cViolet = hex('--c1', '#7523ed');
  const cBlue = hex('--c2', '#1f63c8');
  const cLilac = hex('--c3', '#c77bf0');
  const cBg = hex('--bg', '#05050f');

  const vert = `
    attribute vec2 p;
    void main() { gl_Position = vec4(p, 0.0, 1.0); }
  `;

  // Flowing brand gradient: the color bands themselves undulate + drift.
  // uScroll parallaxes and fades the field.
  const frag = `
    precision highp float;
    uniform vec2 uRes;
    uniform float uTime;
    uniform float uScroll;
    uniform vec3 uViolet;
    uniform vec3 uBlue;
    uniform vec3 uLilac;
    uniform vec3 uBg;

    // smooth brand-gradient ramp: bg -> blue -> violet -> lilac
    vec3 ramp(float t){
      t = clamp(t, 0.0, 1.0);
      vec3 c = mix(uBg, uBlue, smoothstep(0.0, 0.45, t));
      c = mix(c, uViolet, smoothstep(0.35, 0.72, t));
      c = mix(c, uLilac, smoothstep(0.66, 1.0, t));
      return c;
    }

    void main(){
      vec2 uv = gl_FragCoord.xy / uRes.xy;
      vec2 p = uv;
      p.x *= uRes.x / uRes.y;

      float t = uTime * 0.25;

      // parallax: the whole gradient drifts as you scroll
      p.y += uScroll * 0.5;

      // diagonal base gradient (matches the 135deg brand direction)
      float dir = p.x * 0.55 + p.y * 0.85;

      // gently warp the bands so the gradient flows instead of sitting still
      float warp =
          0.22 * sin(dir * 2.4 + t) +
          0.14 * sin(dir * 4.1 - t * 1.3 + p.y * 1.5) +
          0.08 * sin(p.x * 3.0 - t * 0.7);

      float g = smoothstep(-0.15, 1.15, dir) + warp;

      vec3 col = ramp(g);

      // soft radial lift toward the focal area
      float vig = smoothstep(1.25, 0.15, length(uv - vec2(0.35, 0.45)));
      col *= 0.7 + 0.4 * vig;

      // fade out as the hero leaves the viewport
      col = mix(col, uBg, clamp(uScroll * 0.9, 0.0, 1.0));

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  const compile = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const U = (n) => gl.getUniformLocation(prog, n);
  gl.uniform3fv(U('uViolet'), cViolet);
  gl.uniform3fv(U('uBlue'), cBlue);
  gl.uniform3fv(U('uLilac'), cLilac);
  gl.uniform3fv(U('uBg'), cBg);

  let scroll = 0;
  const onScroll = () => {
    scroll = Math.min(window.scrollY / window.innerHeight, 1.2);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(U('uRes'), canvas.width, canvas.height);
  };
  window.addEventListener('resize', resize);
  resize();

  const start = performance.now();
  const render = (now) => {
    gl.uniform1f(U('uScroll'), scroll);
    gl.uniform1f(U('uTime'), reduce ? 0 : (now - start) / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (!reduce) requestAnimationFrame(render);
  };
  render(start);
}
