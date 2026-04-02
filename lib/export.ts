import { Payment } from "@/types";

// ── CSV ──────────────────────────────────────────────────────────────────────
export function exportToCSV(data: Payment[], filename = "export") {
  const headers = ["ID", "Name", "Email", "Amount", "Status", "Date"];
  const rows = data.map((row) => [
    row.id,
    row.name,
    row.email,
    row.amount.toFixed(2),
    row.status,
    row.date,
  ]);

  const csvContent = [headers, ...rows]
    .map((r) => r.map((v) => `"${v}"`).join(","))
    .join("\n");

  downloadBlob(new Blob([csvContent], { type: "text/csv" }), `${filename}.csv`);
}

// ── JSON ─────────────────────────────────────────────────────────────────────
export function exportToJSON(data: Payment[], filename = "export") {
  const json = JSON.stringify(data, null, 2);
  downloadBlob(
    new Blob([json], { type: "application/json" }),
    `${filename}.json`
  );
}

// ── XLSX ─────────────────────────────────────────────────────────────────────
export async function exportToXLSX(data: Payment[], filename = "export") {
  const XLSX = await import("xlsx");
  const ws = XLSX.utils.json_to_sheet(
    data.map((r) => ({
      ID: r.id,
      Name: r.name,
      Email: r.email,
      Amount: r.amount,
      Status: r.status,
      Date: r.date,
    }))
  );
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data");
  XLSX.writeFile(wb, `${filename}.xlsx`);
}

// ── PDF ──────────────────────────────────────────────────────────────────────
export async function exportToPDF(data: Payment[], filename = "export") {
  const { default: jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Payment Report", 14, 16);
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 23);

  autoTable(doc, {
    startY: 28,
    head: [["ID", "Name", "Email", "Amount", "Status", "Date"]],
    body: data.map((r) => [
      r.id,
      r.name,
      r.email,
      `$${r.amount.toFixed(2)}`,
      r.status.charAt(0).toUpperCase() + r.status.slice(1),
      r.date,
    ]),
    headStyles: { fillColor: [30, 30, 46] },
    alternateRowStyles: { fillColor: [245, 245, 250] },
    styles: { fontSize: 9 },
  });

  doc.save(`${filename}.pdf`);
}

// ── helpers ───────────────────────────────────────────────────────────────────
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
