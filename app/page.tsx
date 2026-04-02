import { DataTable } from "@/components/data-table/data-table";
import { payments } from "@/lib/data";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground mt-1">
            Manage and export your payment records.
          </p>
        </div>

        {/* Table */}
        <DataTable data={payments} />
      </div>
    </main>
  );
}
