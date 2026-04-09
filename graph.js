(function () {
  const ctx = document.getElementById("salary-chart");
  if (!ctx) return;

  new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Inflation / Verbraucherpreisindex",
          data: [
            { x: "2022-01-01", y: 0 },
            { x: "2023-01-01", y: 6.9 },
            { x: "2024-01-01", y: 12.8 },
            { x: "2025-01-01", y: 15 },
            { x: "2026-01-01", y: 17.2 },
            { x: "2027-01-01", y: 19.1 },
            { x: "2028-01-01", y: 21.0 },
          ],
          borderColor: "#5588ff",
          backgroundColor: "transparent",
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: "#5588ff",
          tension: 0,
        },
        {
          label: "Tarifabschluss",
          data: [
            { x: "2022-01-01", y: 0 },
            { x: "2022-12-01", y: 2.8 },
            { x: "2024-10-01", y: 7.51 },
            { x: "2026-01-01", y: 8.74 },
          ],
          borderColor: "#e8402a",
          backgroundColor: "transparent",
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: "#e8402a",
          tension: 0,
        },
        {
          label: "ver.di Forderung",
          data: [
            { x: "2025-12-31", y: 8.74 },
            { x: "2026-01-01", y: 15.74 },
            { x: "2028-01-01", y: 15.74 },
          ],
          borderColor: "#2ae87a",
          backgroundColor: "transparent",
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: "#2ae87a",
          tension: 0,
        },
        {
          label: "NDR-Angebot (2027/2028 nur bei Beitragserhöhung)",
          data: [
            { x: "2025-12-31", y: 8.74 },
            { x: "2026-07-01", y: 9.97 },
            { x: "2027-06-01", y: 11.4 },
            { x: "2028-04-01", y: 12.83 },
          ],
          borderColor: "#dd88ff",
          backgroundColor: "transparent",
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: "#dd88ff",
          tension: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "nearest",
        intersect: false,
        axis: "x",
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: "#f0ede8",
            font: { family: "DM Mono", size: 10 },
            boxWidth: 16,
            padding: 12,
          },
        },
        tooltip: {
          backgroundColor: "#1a1a1a",
          borderColor: "#2a2a2a",
          borderWidth: 1,
          titleColor: "#f0ede8",
          bodyColor: "#999",
          titleFont: { family: "DM Mono", size: 11 },
          bodyFont: { family: "DM Mono", size: 11 },
          callbacks: {
            label: (item) =>
              `${item.dataset.label}: +${item.raw.y.toFixed(1)} %`,
          },
        },
      },
      scales: {
        x: {
          type: "time",
          time: {
            unit: "year",
            displayFormats: { year: "yyyy" },
          },
          min: "2022-01-01",
          max: "2028-12-31",
          ticks: {
            color: "#666",
            font: { family: "DM Mono", size: 10 },
            maxRotation: 0,
          },
          grid: { color: "#2a2a2a" },
          border: { color: "#2a2a2a" },
        },
        y: {
          ticks: {
            color: "#666",
            font: { family: "DM Mono", size: 10 },
            callback: (v) => "+" + v.toFixed(0) + " %",
          },
          grid: { color: "#2a2a2a" },
          border: { color: "#2a2a2a" },
        },
      },
    },
  });
})();
