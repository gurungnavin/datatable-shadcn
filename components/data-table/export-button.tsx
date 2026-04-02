"use client";

import { useState } from "react";
import { Download, FileText, FileSpreadsheet, FileJson, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exportToCSV, exportToJSON, exportToXLSX, exportToPDF } from "@/lib/export";
import { Payment } from "@/types";

interface ExportButtonProps {
  data: Payment[];
}

export function ExportButton({ data }: ExportButtonProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handle = async (type: string, fn: () => Promise<void> | void) => {
    setLoading(type);
    try {
      await fn();
    } finally {
      setLoading(null);
    }
  };

  const filename = `payments-${new Date().toISOString().slice(0, 10)}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          Export
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Export {data.length} rows
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled={!!loading}
          onClick={() => handle("csv", () => exportToCSV(data, filename))}
          className="gap-2 cursor-pointer"
        >
          <FileText className="h-4 w-4 text-green-600" />
          CSV
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={!!loading}
          onClick={() => handle("xlsx", () => exportToXLSX(data, filename))}
          className="gap-2 cursor-pointer"
        >
          <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
          Excel (.xlsx)
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={!!loading}
          onClick={() => handle("json", () => exportToJSON(data, filename))}
          className="gap-2 cursor-pointer"
        >
          <FileJson className="h-4 w-4 text-blue-600" />
          JSON
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled={!!loading}
          onClick={() => handle("pdf", () => exportToPDF(data, filename))}
          className="gap-2 cursor-pointer"
        >
          <FileText className="h-4 w-4 text-red-500" />
          PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
