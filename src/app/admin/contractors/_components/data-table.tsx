"use client";

import { deleteContractorById } from "@/api/contractor";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  const [loadingToastId, setToastId] = useState("");

  const client = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["deleteContractor"],
    mutationFn: deleteContractorById,
    onSuccess: async (res) => {
      await client.refetchQueries(["contractors"]);
      toast.success(`Deleted `, {
        id: loadingToastId,
      });
    },
    onMutate: async ({ id }) => {
      setToastId(toast.loading("Deleting..."));
    },
  });

  return (
    <div className="p-2 rounded-lg bg-gradient">
      <Table className="bg-background rounded-lg">
        <TableHeader className="bg-background/10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="text-foreground font-bold"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell, i) => (
                  <ContextMenu key={cell.id}>
                    <ContextMenuTrigger asChild>
                      <TableCell className="py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="bg-gradient p-0.5">
                      <div className="bg-background p-1.5">
                        <Link
                          href={`/${
                            //   @ts-ignore
                            row.getAllCells()[i].row.getAllCells()[0].row
                              .original["id"]
                          }`}
                        >
                          <ContextMenuItem>View</ContextMenuItem>
                        </Link>
                        <ContextMenuItem>Modify</ContextMenuItem>
                        <ContextMenuItem
                          className="focus:bg-red-500/20"
                          onClick={async () =>
                            await mutation.mutateAsync({
                              //   @ts-ignore
                              id: row.getAllCells()[i].row.getAllCells()[0].row
                                .original["id"],
                            })
                          }
                        >
                          Delete
                        </ContextMenuItem>
                      </div>
                    </ContextMenuContent>
                  </ContextMenu>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No data.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
