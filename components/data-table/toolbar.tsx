"use client";

import { Search, X } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExportButton } from "./export-button";
import { Payment } from "@/types";

interface ToolbarProps {
  table: Table<Payment>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  filteredData: Payment[];
}

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "inactive", label: "Inactive" },
  { value: "cancelled", label: "Cancelled" },
];

export function DataTableToolbar({
  table,
  globalFilter,
  setGlobalFilter,
  filteredData,
}: ToolbarProps) {
  const statusFilter =
    (table.getColumn("status")?.getFilterValue() as string) ?? "all";

  const hasFilters = globalFilter !== "" || (statusFilter && statusFilter !== "all");

  const resetFilters = () => {
    setGlobalFilter("");
    table.getColumn("status")?.setFilterValue("all");
  };

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      {/* ── Left: search + filter ── */}
      <div className="flex flex-1 items-center gap-2">
        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search name, email, ID…"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-8 h-9"
          />
        </div>

        {/* Status filter */}
        <Select
          value={statusFilter || "all"}
          onValueChange={(val) =>
            table.getColumn("status")?.setFilterValue(val)
          }
        >
          <SelectTrigger className="w-[160px] h-9">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear filters */}
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="h-9 gap-1 text-muted-foreground"
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </Button>
        )}
      </div>

      {/* ── Right: export ── */}
      <ExportButton data={filteredData} />
    </div>
  );
}
