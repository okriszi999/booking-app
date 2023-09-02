"use client";

import { Checkbox } from "@/components/ui/checkbox";

import { ColumnDef } from "@tanstack/react-table";

export type Contractor = {
  id: string;
  name: string;
  email: string;
  onHoliday: boolean;
  currentBookings: number;
};

export const columns: ColumnDef<Contractor>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Select all rows"
        className="w-5 h-5 border-primary-foreground"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="w-5 h-5 border-primary-foreground"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "onHoliday",
    header: "On Holiday",
    cell: ({ getValue }) => {
      const isOnHoliday = getValue();
      return (
        <div
          className={`w-full h-2 rounded-full ${
            isOnHoliday ? "bg-green-500" : "bg-red-500"
          }`}
        ></div>
      );
    },
  },
  {
    accessorKey: "currentBookings",
    header: "Current Bookings",
  },
];
