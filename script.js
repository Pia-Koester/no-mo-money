const GEHÄLTER = {
  1: {
    1: 8284.82,
    2: 9051.79,
    3: 9818.76,
    4: 10585.73,
    5: 11352.7,
    6: 12119.67,
  },
  2: {
    1: 6377.3,
    2: 6966.7,
    3: 7556.11,
    4: 8145.51,
    5: 8734.91,
    6: 9324.31,
  },
  3: {
    1: 5553.69,
    2: 6095.63,
    3: 6637.58,
    4: 7179.53,
    5: 7721.47,
    6: 8263.42,
  },
  4: {
    1: 4776.7,
    2: 5160.88,
    3: 5545.06,
    4: 5929.24,
    5: 6313.42,
    6: 6697.6,
    7: 7081.77,
    8: 7465.95,
  },
  5: {
    1: 4347.87,
    2: 4687.5,
    3: 5027.15,
    4: 5366.78,
    5: 5706.42,
    6: 6046.06,
    7: 6385.7,
    8: 6725.34,
  },
  6: {
    1: 4009.41,
    2: 4338.3,
    3: 4667.19,
    4: 4996.09,
    5: 5324.98,
    6: 5653.87,
    7: 5982.76,
    8: 6311.65,
  },
  7: {
    1: 3725.67,
    2: 4000.75,
    3: 4275.84,
    4: 4550.93,
    5: 4826.01,
    6: 5101.1,
    7: 5376.18,
    8: 5651.27,
  },
  8: {
    1: 3512.57,
    2: 3763.12,
    3: 4013.66,
    4: 4264.21,
    5: 4514.76,
    6: 4765.31,
    7: 5015.85,
    8: 5266.4,
  },
  9: {
    1: 3349.44,
    2: 3569.19,
    3: 3788.95,
    4: 4008.7,
    5: 4228.46,
    6: 4448.21,
    7: 4667.97,
    8: 4887.72,
  },
  10: {
    1: 3211.26,
    2: 3421.8,
    3: 3632.35,
    4: 3842.89,
    5: 4053.44,
    6: 4263.98,
    7: 4474.52,
    8: 4685.07,
  },
  11: {
    1: 3096.64,
    2: 3291.85,
    3: 3487.06,
    4: 3682.26,
    5: 3877.47,
    6: 4072.67,
    7: 4267.88,
    8: 4463.09,
  },
  12: {
    1: 3005.53,
    2: 3176.08,
    3: 3346.63,
    4: 3517.18,
    5: 3687.73,
    6: 3858.28,
    7: 4028.83,
    8: 4199.38,
  },
  13: {
    1: 2912.88,
    2: 3065.05,
    3: 3217.22,
    4: 3369.39,
    5: 3521.56,
    6: 3673.73,
    7: 3825.9,
    8: 3978.07,
  },
};

const STUFEN_LABELS = {
  1: 6,
  2: 6,
  3: 6,
  4: 8,
  5: 8,
  6: 8,
  7: 8,
  8: 8,
  9: 8,
  10: 8,
  11: 8,
  12: 8,
  13: 8,
};

function fmt(n) {
  return (
    n.toLocaleString("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " €"
  );
}

function update() {
  const gruppeEl = document.getElementById("gruppe");
  const stufeEl = document.getElementById("stufe");
  const gruppe = gruppeEl.value;

  // Populate stufe dropdown
  if (gruppe) {
    const maxStufe = STUFEN_LABELS[gruppe];
    const currentStufe = stufeEl.value;
    stufeEl.innerHTML = "";
    stufeEl.disabled = false;
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "– bitte wählen –";
    stufeEl.appendChild(placeholder);
    for (let s = 1; s <= maxStufe; s++) {
      const opt = document.createElement("option");
      opt.value = s;
      opt.textContent = `Stufe ${s}`;
      stufeEl.appendChild(opt);
    }
    if (currentStufe && parseInt(currentStufe) <= maxStufe)
      stufeEl.value = currentStufe;
  } else {
    stufeEl.disabled = true;
    stufeEl.innerHTML = '<option value="">– erst VG wählen –</option>';
  }

  const stufe = stufeEl.value;
  if (!gruppe || !stufe) {
    document.getElementById("scenarios-card").style.display = "none";
    document.getElementById("diff-card").classList.remove("visible");
    document.getElementById("timeline-card").classList.remove("visible");
    document.getElementById("current-display").style.display = "none";
    return;
  }

  const base = GEHÄLTER[gruppe][parseInt(stufe)];

  // Show current salary
  document.getElementById("current-display").style.display = "block";
  document.getElementById("current-value").textContent = fmt(base);

  // NDR: +1.23% ab Jul 2026, dann +1.43% ab Jun 2027 (mit Beitrag), dann +1.43% ab Apr 2028
  const ndr_jul26 = base * 1.0123;
  const ndr_jun27 = ndr_jul26 * 1.0143;
  const ndr_apr28 = ndr_jun27 * 1.0143;

  // NDR ohne Beitragserhöhung
  const ndr_noerh_27 = ndr_jul26 * 1.01;
  const ndr_noerh_28 = ndr_noerh_27 * 1.01;

  // Gewerkschaft: +7% sofort, mindestens +300 € (ab Feb 2026)
  const gew_pct = base * 1.07;
  const gew_min = base + 300;
  const usesMinimum = gew_min > gew_pct;
  const gew = usesMinimum ? gew_min : gew_pct;
  const effectivePct = (((gew - base) / base) * 100).toFixed(1);

  document.getElementById("scenarios-card").style.display = "block";
  document.getElementById("ndr-amount").textContent = fmt(ndr_jul26);
  document.getElementById("gew-amount").textContent = fmt(gew);

  const noteEl = document.getElementById("gew-mindest-note");
  const titleEl = document.getElementById("gew-title");
  if (usesMinimum) {
    titleEl.innerHTML = "+300 € Mindestbetrag,<br />Laufzeit 12 Monate";
    noteEl.style.display = "block";
    noteEl.textContent = `Das entspricht +${effectivePct} % für deine VG – die Mindesterhöhung von 300 € liegt über den 7 %.`;
  } else {
    titleEl.innerHTML = "+7 % sofort,<br />Laufzeit 12 Monate";
    noteEl.style.display = "none";
  }

  // Diff
  const diffMonthly = gew - ndr_jul26;
  // Monate: Feb-Jun 2026 (5 Monate NDR hat noch base), Jul-Mai 2027 (11 Monate ndr_jul26)
  // Laufzeit bis Ende 2028 = 35 Monate
  // Differenz kumuliert (vereinfacht: monatlich)
  let totalDiff = 0;
  // Feb-Jun 2026: 5 Monate, NDR=base, Gew=gew
  totalDiff += 5 * (gew - base);
  // Jul 2026–Mai 2027: 11 Monate
  totalDiff += 11 * (gew - ndr_jul26);
  // Jun 2027–Mär 2028: 10 Monate (mit Beitrag)
  totalDiff += 10 * (gew - ndr_jun27);
  // Apr 2028–Dez 2028: 9 Monate
  totalDiff += 9 * (gew - ndr_apr28);

  document.getElementById("diff-card").classList.add("visible");
  document.getElementById("diff-monthly-text").textContent = fmt(diffMonthly);
  document.getElementById("diff-total-text").textContent = fmt(totalDiff);
  document.getElementById("diff-number").textContent = fmt(diffMonthly);

  // Timeline
  document.getElementById("timeline-card").classList.add("visible");
  const phases = [
    {
      label: "Feb–Jun 2026",
      note: "(5 Monate, Leermonate NDR)",
      ndr: base,
      gew: gew,
    },
    {
      label: "Jul 2026–Mai 2027",
      note: "(+1,23 % NDR)",
      ndr: ndr_jul26,
      gew: gew,
    },
    {
      label: "Jun 2027–Mär 2028",
      note: "(+1,43 % NDR, mit Beitrag)",
      ndr: ndr_jun27,
      gew: gew,
    },
    {
      label: "Apr–Dez 2028",
      note: "(+1,43 % NDR, mit Beitrag)",
      ndr: ndr_apr28,
      gew: gew,
    },
  ];

  const tbody = document.getElementById("tl-rows");
  tbody.innerHTML = "";
  phases.forEach((p) => {
    const diff = p.gew - p.ndr;
    const row = document.createElement("div");
    row.className = "tl-row";
    row.innerHTML = `
      <div>
        <div class="tl-date">${p.label}</div>
        <div class="tl-label">${p.note}</div>
      </div>
      <div class="tl-ndr">${fmt(p.ndr)}</div>
      <div class="tl-gew">${fmt(p.gew)}</div>
      <div class="tl-diff">+${fmt(diff)}</div>
    `;
    tbody.appendChild(row);
  });
}
