/* ===================================================================
   UXUARIA — process.js
   "Cómo funciona" on the diagnóstico UX page: an illustration drawn in
   five stages, tied to the scroll. Drawing taken as is from
   ensamble-preview.html. Spec: 15-paginas-servicio.
   =================================================================== */

(function () {
  const section = document.querySelector('[data-process]');
  if (!section) return;

  const K = '#111111', W = '#ffffff';
  const VX = 300, VY = 372, Z = 6, DZ = 1 / 6;
  const s = (z) => 1 / (1 + z);
  const P = (X, Y, z) => [VX + X * s(z), VY + Y * s(z)];
  const r1 = (n) => Math.round(n * 10) / 10;
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  // State of each stage. pieces: [X, Y, z, rotation in degrees] for the 4 pieces
  // (0 = quarter circle, 1 = triangle, 2 = half circle, 3 = square with a circle).
  const STAGES = [
    { Lz: 1,   brackets: 0, severity: 0, cube: 0, lamps: 0,
      pieces: [[-150, 40, 4.4, 40], [130, -110, 5.2, -35], [-70, 300, 3.7, 70], [150, 260, 4.8, 20]] },
    { Lz: 2,   brackets: 1, severity: 0, cube: 0, lamps: 0,
      pieces: [[-70, 150, 3.3, 35], [60, 110, 3.0, -25], [-40, 290, 3.1, 50], [70, 270, 3.4, 15]] },
    { Lz: 3.6, brackets: 0, severity: 0, cube: 0, lamps: 0,
      pieces: [[-40, 425, 3.2, 30], [40, 425, 2.5, 20], [-40, 425, 1.8, 10], [40, 425, 1.1, 5]] },
    { Lz: 4.5, brackets: 0, severity: 1, cube: 0, lamps: 0,
      pieces: [[-180, 425, 1.0, 0], [-60, 425, 1.0, 0], [60, 425, 1.0, 0], [180, 425, 1.0, 0]] },
    { Lz: 6,   brackets: 0, severity: 0, cube: 1, lamps: 1,
      pieces: [[-55, 315, 0.6, 0], [55, 315, 0.6, 0], [-55, 425, 0.6, 0], [55, 425, 0.6, 0]] },
  ];
  const SEVERITY = [2, 3, 1, 2]; // sample values, not real data

  function stateAt(p) {
    const k = Math.min(3, Math.floor(p));
    const t = easeInOutCubic(Math.min(1, Math.max(0, p - k)));
    const a = STAGES[k], b = STAGES[k + 1];
    const mix = (key) => lerp(a[key], b[key], t);
    return {
      Lz: mix('Lz'), brackets: mix('brackets'), severity: mix('severity'),
      cube: mix('cube'), lamps: mix('lamps'),
      pieces: a.pieces.map((pa, i) => pa.map((v, j) => lerp(v, b.pieces[i][j], t))),
    };
  }

  // Returns a list of paths: { d, fill, stroke, sw, op }
  function buildFrame(st) {
    const out = [];
    const add = (d, fill, stroke, sw, op = 1) => out.push({ d, fill: fill || 'none', stroke: stroke || 'none', sw: sw || 0, op });
    const poly = (pts, close) => 'M' + pts.map((q) => r1(q[0]) + ' ' + r1(q[1])).join(' L') + (close ? ' Z' : '');
    const line = (a, b) => poly([a, b], false);
    const circ = (c, r) => `M${r1(c[0] - r)} ${r1(c[1])} a${r1(r)} ${r1(r)} 0 1 0 ${r1(2 * r)} 0 a${r1(r)} ${r1(r)} 0 1 0 ${r1(-2 * r)} 0 Z`;
    const vault = (z) => {
      const pts = [];
      for (let j = 0; j <= 32; j++) {
        const a = Math.PI - Math.PI * j / 32;
        pts.push(P(240 * Math.cos(a), -60 - 240 * Math.sin(a), z));
      }
      return pts;
    };
    const profile = (z) => [P(-240, 480, z), ...vault(z), P(240, 480, z)];
    const arch = (sd, za, zb, ins) => {
      const X = sd * 240, h = (zb - za) / 2 - ins, mid = (za + zb) / 2;
      const pts = [P(X, 480, mid - h)];
      for (let j = 0; j <= 16; j++) {
        const t = Math.PI * j / 16;
        pts.push(P(X, 120 - h * 480 * Math.sin(t), mid - h * Math.cos(t)));
      }
      pts.push(P(X, 480, mid + h));
      return pts;
    };

    const Lz = Math.min(st.Lz, Z);
    const dark = (z) => Lz < Z - 0.001 && z >= Lz;
    const bays = [0, 1, 2, 3, 4, 5].map((k) => [0.25 + k, 0.85 + k]);
    const lit = st.lamps > 0.5;

    // Facade and tunnel
    add(poly([[24, 24], [576, 24], [576, 876], [24, 876]], true), W);
    add(poly(profile(0), true), W);

    // Vault and wall edges in the lit area
    for (let z = 0.5; z < Lz - 0.01; z += 0.5) add(poly(vault(z), false), null, K, 2);
    [-1, 1].forEach((sd) => {
      add(line(P(sd * 240, 480, 0), P(sd * 240, 480, Lz)), null, K, 2);
      add(line(P(sd * 240, -60, 0), P(sd * 240, -60, Lz)), null, K, 2);
    });

    // Floor: soft checkerboard ("dark" tiles = 3 thin lines). The dark silhouette covers what goes past Lz.
    for (let r = 0; r * DZ < Lz && r < 36; r++) {
      const z0 = r * DZ, z1 = (r + 1) * DZ;
      for (let c = 0; c < 6; c++) {
        const X0 = -240 + 80 * c;
        const q0 = P(X0, 480, z0), q1 = P(X0 + 80, 480, z0), q2 = P(X0 + 80, 480, z1), q3 = P(X0, 480, z1);
        add(poly([q0, q1, q2, q3], true), W, K, 1);
        if ((r + c) % 2) {
          const m = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
          [0.25, 0.5, 0.75].forEach((t) => add(line(m(q0, q3, t), m(q1, q2, t)), null, K, 0.8));
        }
      }
    }

    // Arches on the walls (lit area)
    [-1, 1].forEach((sd) => bays.forEach((b) => {
      if (b[0] >= Lz) return;
      add(poly(arch(sd, b[0], b[1], 0), false), W, K, 2.5);
      add(poly(arch(sd, b[0], b[1], 0.05), false), null, K, 1.2);
    }));

    // Darkness: black silhouette with thin white lines inside
    if (Lz < Z - 0.001) {
      add(poly(profile(Lz), true), K, K, 1);
      for (let c = 0; c <= 6; c++) add(line(P(-240 + 80 * c, 480, Lz), P(-240 + 80 * c, 480, Z)), null, W, 0.8);
      for (let z = Lz + 3 * DZ; z < Z; z += 3 * DZ) add(line(P(-240, 480, z), P(240, 480, z)), null, W, 0.8);
      for (let z = Math.ceil(Lz * 2) / 2; z < Z; z += 0.5) add(poly(vault(z), false), null, W, 0.8);
      [-1, 1].forEach((sd) => {
        add(line(P(sd * 240, -60, Lz), P(sd * 240, -60, Z)), null, W, 0.8);
        bays.forEach((b) => { if (b[0] >= Lz) add(poly(arch(sd, b[0], b[1], 0), false), null, W, 1); });
      });
      add(poly(profile(Z), true), null, W, 1);
    } else {
      add(poly(profile(Z), true), K, K, 1.5); // door at the back
    }

    // Hanging lamps (dome + bulb); lit = white bulb with rays
    [1.5, 3.5].forEach((lz) => {
      const d = dark(lz), fg = d ? W : K, bg = d ? K : W, sc = s(lz);
      add(line(P(0, -300, lz), P(0, -165, lz)), null, fg, 2);
      const c = P(0, -130, lz), rr = 46 * sc;
      add(`M${r1(c[0] - rr)} ${r1(c[1])} A${r1(rr)} ${r1(rr)} 0 0 1 ${r1(c[0] + rr)} ${r1(c[1])} Z`, fg, fg, 2);
      const b = P(0, -112, lz), br = 15 * sc;
      add(circ(b, br), lit ? bg : fg, fg, 2);
      if (lit) for (let j = 0; j < 7; j++) {
        const a = Math.PI * (j + 0.5) / 7;
        add(line([b[0] + Math.cos(a) * br * 1.8, b[1] + Math.sin(a) * br * 1.8],
                 [b[0] + Math.cos(a) * br * 3, b[1] + Math.sin(a) * br * 3]), null, fg, 2, st.lamps);
      }
    });

    // Focus brackets (stage 2)
    if (st.brackets > 0.01) {
      const bz = 3.2, col = dark(bz) ? W : K, L = 50;
      [[-170, 20, 1, 1], [170, 20, -1, 1], [-170, 400, 1, -1], [170, 400, -1, -1]].forEach((b) => {
        add(poly([P(b[0] + b[2] * L, b[1], bz), P(b[0], b[1], bz), P(b[0], b[1] + b[3] * L, bz)], false), null, col, 3, st.brackets);
      });
    }

    // Pieces
    const halo = 8 * (1 - st.cube);
    st.pieces.forEach((q, n) => {
      const z = q[2], c = P(q[0], q[1], z), u = 110 * s(z), a = q[3] * Math.PI / 180;
      const ca = Math.cos(a), sa = Math.sin(a);
      const T = (x, y) => [c[0] + (x * ca - y * sa) * u, c[1] + (x * sa + y * ca) * u];
      const pt = (x, y) => { const p = T(x, y); return r1(p[0]) + ' ' + r1(p[1]); };
      const d = dark(z), fg = d ? W : K, bg = d ? K : W;
      let path;
      if (n === 0) path = `M${pt(-0.5, 0.5)} L${pt(-0.5, -0.5)} A${r1(u)} ${r1(u)} 0 0 1 ${pt(0.5, 0.5)} Z`;
      else if (n === 1) path = `M${pt(-0.5, 0.5)} L${pt(0.5, 0.5)} L${pt(0.5, -0.5)} Z`;
      else if (n === 2) path = `M${pt(-0.5, 0.5)} A${r1(u * 0.5)} ${r1(u * 0.5)} 0 0 1 ${pt(0.5, 0.5)} Z`;
      else path = poly([T(-0.5, -0.5), T(0.5, -0.5), T(0.5, 0.5), T(-0.5, 0.5)], true);
      if (halo > 0.3) add(path, null, bg, halo); // outline that separates it from the floor
      add(path, fg, fg, 1.5);
      if (n === 3) add(circ(T(0, 0), u * 0.3), bg);
      // Severity dots (stage 4)
      if (st.severity > 0.01) {
        for (let j = 0; j < SEVERITY[n]; j++) {
          const dc = P(q[0] + (j - (SEVERITY[n] - 1) / 2) * 36, q[1] - 95, z);
          add(circ(dc, 13 * s(z)), fg, bg, 4, st.severity); // halo against the floor
        }
      }
    });

    // Cube (stage 5): lid extruded to the back + cross and border on the front face
    if (st.cube > 0.01) {
      const z0 = 0.6, z1 = 0.6 + (220 / 480) * st.cube;
      add(poly([P(-110, 260, z0), P(110, 260, z0), P(110, 260, z1), P(-110, 260, z1)], true), W, K, 3, st.cube);
      for (let j = 1; j < 8; j++) {
        const x = -110 + 220 * j / 8;
        add(line(P(x, 260, z0), P(x, 260, z1)), null, K, 1.2, st.cube);
      }
      add(line(P(0, 260, z0), P(0, 480, z0)), null, K, 2, st.cube);
      add(line(P(-110, 370, z0), P(110, 370, z0)), null, K, 2, st.cube);
      add(poly([P(-110, 260, z0), P(110, 260, z0), P(110, 480, z0), P(-110, 480, z0)], true), null, K, 4, st.cube);
    }

    // Front portal (the preview's poster frame is left out)
    add(poly(profile(0), true), null, K, 5);
    return out;
  }

  function toSVGMarkup(paths) {
    return paths.map((p) =>
      `<path d="${p.d}" fill="${p.fill}" stroke="${p.stroke}" stroke-width="${p.sw}"` +
      ` stroke-linejoin="round" stroke-linecap="round"${p.op < 1 ? ` opacity="${p.op.toFixed(3)}"` : ''}/>`
    ).join('');
  }

  // --- Scroll: same flow as the preview, measured below the fixed header ---
  const g = section.querySelector('[data-process-art]');
  const svg = g.ownerSVGElement;
  const items = [...section.querySelectorAll('.process__step')];
  const header = document.querySelector('.site-header');
  const labels = [
    'las piezas están sueltas en la oscuridad',
    'las piezas se juntan dentro de un encuadre',
    'las piezas avanzan en fila por el pasillo',
    'las piezas se alinean con su severidad',
    'las piezas forman un cubo a plena luz',
  ];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let last = -1, queued = false;

  section.classList.add('process--animated');

  function progress() {
    const cy = (el) => { const r = el.getBoundingClientRect(); return r.top + scrollY + r.height / 2; };
    const c0 = cy(items[0]), c4 = cy(items[items.length - 1]);
    const top = header ? header.offsetHeight : 0;
    const mid = scrollY + top + (innerHeight - top) / 2;
    return Math.max(0, Math.min(1, (mid - c0) / (c4 - c0))) * 4;
  }

  function draw() {
    queued = false;
    let p = progress();
    const active = Math.round(p);
    if (reduce) p = active;
    if (Math.abs(p - last) < 0.0005) return;
    last = p;
    g.innerHTML = toSVGMarkup(buildFrame(stateAt(p)));
    items.forEach((li, i) => {
      li.classList.toggle('is-active', i === active);
      if (i === active) li.setAttribute('aria-current', 'step');
      else li.removeAttribute('aria-current');
    });
    svg.setAttribute('aria-label', 'Estadio ' + (active + 1) + ' de 5: ' + labels[active]);
  }

  function req() { if (!queued) { queued = true; requestAnimationFrame(draw); } }
  addEventListener('scroll', req, { passive: true });
  addEventListener('resize', () => { last = -1; req(); });
  draw();
})();
