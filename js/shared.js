/* ═══════════════════════════════════════
   Shared JS — Normal distribution math & UI utils
   ═══════════════════════════════════════ */

// ── Normal distribution functions ──
function normalPDF(z) {
  return Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
}

function normalCDF(z) {
  const a1=0.254829592, a2=-0.284496736, a3=1.421413741, a4=-1.453152027, a5=1.061405429, p=0.3275911;
  const s = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.sqrt(2);
  const t = 1 / (1 + p * x);
  const y = 1 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t * Math.exp(-x*x);
  return 0.5 * (1 + s * y);
}

function normalInvCDF(p) {
  if (p <= 0) return -Infinity;
  if (p >= 1) return Infinity;
  if (p < 0.5) return -normalInvCDF(1 - p);
  const a = [-3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02,
             1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00];
  const b = [-5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02,
             6.680131188771972e+01, -1.328068155288572e+01];
  const c = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00,
             -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00];
  const d = [7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00, 3.754408661907416e+00];
  const pL = 0.02425, pH = 1 - pL;
  let q, r;
  if (p < pL) {
    q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) / ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);
  } else if (p <= pH) {
    q = p - 0.5; r = q * q;
    return (((((a[0]*r+a[1])*r+a[2])*r+a[3])*r+a[4])*r+a[5])*q / (((((b[0]*r+b[1])*r+b[2])*r+b[3])*r+b[4])*r+1);
  } else {
    q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) / ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);
  }
}

// ── Round to n decimals ──
function R(val, n = 4) {
  return Math.round(val * Math.pow(10, n)) / Math.pow(10, n);
}
function R2(val) { return R(val, 2); }

// ── Navigation component ──
function renderNav(activePage) {
  const pages = [
    { id: 'index', label: 'Accueil', href: 'index.html' },
    { id: 'cours', label: 'Fiches', href: 'cours.html' },
    { id: 'exercices-table', label: 'Exos table', href: 'exercices-table.html' },
    { id: 'exercices-contexte', label: 'Exos contexte', href: 'exercices-contexte.html' },
    { id: 'exercices-zscore', label: 'Exos z-scores', href: 'exercices-zscore.html' },
    { id: 'outil', label: 'Outil courbe', href: 'outil.html' },
  ];

  const nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.innerHTML = `
    <div class="nav-inner">
      <a href="index.html" class="nav-brand">Loi Normale L1</a>
      <ul class="nav-links">
        ${pages.map(p => `<li><a href="${p.href}" class="${p.id === activePage ? 'active' : ''}">${p.label}</a></li>`).join('')}
      </ul>
    </div>
  `;
  document.body.prepend(nav);
}

// ── Solution toggle ──
function toggleSolution(btn, solutionId) {
  const sol = document.getElementById(solutionId);
  if (sol.classList.contains('visible')) {
    sol.classList.remove('visible');
    btn.textContent = 'Voir le corrigé';
  } else {
    sol.classList.add('visible');
    btn.textContent = 'Masquer le corrigé';
  }
}

// ── Mini curve drawing ──
function drawMiniCurve(canvasId, options = {}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const rect = canvas.parentElement.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const w = rect.width;
  const h = options.height || 180;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const mu = options.mu || 0;
  const sigma = options.sigma || 1;
  const zRange = 4;
  const pad = { top: 20, right: 20, bottom: 40, left: 20 };
  const xMin = mu - zRange * sigma;
  const xMax = mu + zRange * sigma;
  const yMax = normalPDF(0) * 1.15;
  const plotBottom = h - pad.bottom;

  function xToPx(xVal) { return pad.left + ((xVal - xMin) / (xMax - xMin)) * (w - pad.left - pad.right); }
  function yToPx(yVal) { return pad.top + (1 - yVal / yMax) * (h - pad.top - pad.bottom); }

  ctx.clearRect(0, 0, w, h);

  // Fill area if specified
  if (options.fillFrom !== undefined && options.fillTo !== undefined) {
    const lo = Math.max(options.fillFrom, xMin);
    const hi = Math.min(options.fillTo, xMax);
    ctx.save();
    ctx.beginPath();
    const steps = 150;
    for (let i = 0; i <= steps; i++) {
      const xv = lo + (hi - lo) * i / steps;
      const z = (xv - mu) / sigma;
      if (i === 0) ctx.moveTo(xToPx(xv), plotBottom);
      ctx.lineTo(xToPx(xv), yToPx(normalPDF(z)));
    }
    ctx.lineTo(xToPx(hi), plotBottom);
    ctx.closePath();
    ctx.fillStyle = options.fillColor || 'rgba(61, 82, 160, 0.18)';
    ctx.fill();
    ctx.restore();
  }

  // Curve
  ctx.save();
  ctx.beginPath();
  for (let i = 0; i <= 300; i++) {
    const xv = xMin + (xMax - xMin) * i / 300;
    const z = (xv - mu) / sigma;
    const px = xToPx(xv), py = yToPx(normalPDF(z));
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.strokeStyle = '#3D52A0';
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.restore();

  // Axis
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(pad.left, plotBottom);
  ctx.lineTo(w - pad.right, plotBottom);
  ctx.strokeStyle = '#1A1A18';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Ticks
  ctx.font = "500 11px 'DM Mono', monospace";
  ctx.textAlign = 'center';
  ctx.fillStyle = '#3D52A0';
  for (let z = -zRange; z <= zRange; z++) {
    const xv = mu + z * sigma;
    const px = xToPx(xv);
    ctx.beginPath(); ctx.moveTo(px, plotBottom); ctx.lineTo(px, plotBottom + 5);
    ctx.strokeStyle = '#6B6960'; ctx.lineWidth = 1; ctx.stroke();
    if (options.showX) {
      const label = Number.isInteger(xv) ? xv.toString() : xv.toFixed(1);
      ctx.fillStyle = '#1A1A18';
      ctx.fillText(label, px, plotBottom + 18);
      ctx.fillStyle = '#3D52A0';
      ctx.fillText(`z=${z}`, px, plotBottom + 30);
    } else {
      ctx.fillText(`${z}`, px, plotBottom + 18);
    }
  }
  ctx.restore();

  // Probability label if specified
  if (options.probLabel) {
    const midX = ((options.fillFrom || 0) + (options.fillTo || 0)) / 2;
    const px = xToPx(midX);
    const py = yToPx(normalPDF((midX - mu) / sigma)) - 10;
    ctx.save();
    ctx.font = "600 13px 'DM Mono', monospace";
    ctx.textAlign = 'center';
    ctx.fillStyle = '#3D52A0';
    ctx.fillText(options.probLabel, px, Math.max(py, pad.top + 15));
    ctx.restore();
  }
}

// ── Check numeric answer ──
function checkAnswer(inputId, expected, tolerance) {
  const input = document.getElementById(inputId);
  const val = parseFloat(input.value.replace(',', '.'));
  const tol = tolerance || 0.02;
  if (isNaN(val)) return null;
  return Math.abs(val - expected) <= tol;
}

// ── Score tracker ──
const ScoreTracker = {
  total: 0,
  correct: 0,
  answered: new Set(),

  init(totalQuestions) {
    this.total = totalQuestions;
    this.correct = 0;
    this.answered = new Set();
  },

  record(questionId, isCorrect) {
    if (this.answered.has(questionId)) return;
    this.answered.add(questionId);
    if (isCorrect) this.correct++;
    this.update();
  },

  update() {
    const valEl = document.getElementById('score-value');
    const barEl = document.getElementById('score-bar-fill');
    if (valEl) valEl.textContent = `${this.correct} / ${this.total}`;
    if (barEl) barEl.style.width = `${(this.answered.size / this.total) * 100}%`;
  },

  renderWidget() {
    return `<div class="score-tracker">
      <span class="score-label">Score</span>
      <span class="score-value" id="score-value">0 / ${this.total}</span>
      <div class="score-bar"><div class="score-bar-fill" id="score-bar-fill" style="width:0%"></div></div>
      <span style="font-size:0.78rem;color:var(--text-hint);">${this.total} questions</span>
    </div>`;
  }
};

// ── Validate answer with visual feedback + score ──
function validateAnswer(inputId, expected, questionId, tolerance) {
  const input = document.getElementById(inputId);
  const val = parseFloat(input.value.replace(',', '.'));
  const tol = tolerance || 0.025;
  if (isNaN(val)) { input.style.borderColor = 'var(--warning)'; return; }
  const correct = Math.abs(val - expected) <= tol;
  input.classList.remove('correct', 'incorrect');
  input.classList.add(correct ? 'correct' : 'incorrect');
  input.style.borderColor = correct ? 'var(--teal)' : 'var(--danger)';
  ScoreTracker.record(questionId, correct);
  return correct;
}
