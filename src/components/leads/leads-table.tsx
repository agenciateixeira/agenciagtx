"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { leadsTableData, type LeadRecord } from "@/lib/mock-data";
import { clsx } from "clsx";

const stageLabels: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  interested: "Interested",
  negotiating: "Negotiating",
  closed_won: "Won",
  closed_lost: "Lost",
};

export function LeadsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<LeadRecord>[]>(
    () => [
      { header: "Lead", accessorKey: "name", cell: ({ row }) => <p className="font-medium">{row.original.name}</p> },
      { header: "Empresa", accessorKey: "company" },
      { header: "Origem", accessorKey: "source" },
      {
        header: "Stage",
        accessorKey: "stage",
        cell: ({ row }) => (
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">{stageLabels[row.original.stage]}</span>
        ),
      },
      {
        header: "Score",
        accessorKey: "score",
        cell: ({ row }) => (
          <span className="font-semibold text-brand-200">{row.original.score}</span>
        ),
      },
      { header: "Owner", accessorKey: "owner" },
    ],
    [],
  );

  const table = useReactTable({
    data: leadsTableData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-3xl border border-white/5 bg-white/5">
      <table className="min-w-full text-left text-sm text-slate-200">
        <thead className="text-xs uppercase tracking-wide text-slate-500">
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
              {group.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center gap-1">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: "↑",
                      desc: "↓",
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t border-white/5 text-sm text-slate-100">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={clsx("px-4 py-4 align-middle", cell.column.id === "name" && "whitespace-nowrap")}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
