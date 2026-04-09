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
          borderColor: "#3366cc",
          backgroundColor: "transparent",
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: "#3366cc",
          tension: 0,
        },
        {
          label: "Tarifabschluss",
          data: [
            { x: "2022-01-01", y: 0 },
            { x: "2022-12-01", y: 2.8 },
            { x: "2024-10-01", y: 7.51 },
            { x: "2026-01-31", y: 8.74 },
          ],
          borderColor: "#c0301c",
          backgroundColor: "transparent",
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: "#c0301c",
          tension: 0,
        },
        {
          label: "ver.di Forderung (12 Monate)",
          data: [
            { x: "2026-01-31", y: 8.74 },
            { x: "2026-02-01", y: 15.74 },
            { x: "2027-01-31", y: 15.74 },
          ],
          borderColor: "#1a8a4a",
          backgroundColor: "transparent",
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: "#1a8a4a",
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
          borderColor: "#8833bb",
          backgroundColor: "transparent",
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: "#8833bb",
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
            color: "#1a1714",
            font: { family: "DM Mono", size: 10 },
            boxWidth: 16,
            padding: 12,
          },
        },
        tooltip: {
          backgroundColor: "#1a1714",
          borderColor: "#e0dbd4",
          borderWidth: 1,
          titleColor: "#fafaf8",
          bodyColor: "#aaa",
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
            color: "#555",
            font: { family: "DM Mono", size: 10 },
            maxRotation: 0,
          },
          grid: { color: "#e0dbd4" },
          border: { color: "#e0dbd4" },
        },
        y: {
          ticks: {
            color: "#555",
            font: { family: "DM Mono", size: 10 },
            callback: (v) => "+" + v.toFixed(0) + " %",
          },
          grid: { color: "#e0dbd4" },
          border: { color: "#e0dbd4" },
        },
      },
    },
  });
})();
