"use client";

import { DataTable } from "./_components/data-table";
import { Contractor, columns } from "./_components/columns";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllContractors } from "@/api/contractor";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import CreateContractorModal from "../_components/modals/create-contractor.modal";

export default function Contractors() {
  const client = useQueryClient();

  const [mutationCache, setMutationCache] = useState({});

  useEffect(() => {
    setMutationCache(client.getMutationCache().getAll());
  });
  const { data, isLoading } = useQuery<Contractor[]>({
    queryKey: ["contractors"],
    queryFn: getAllContractors,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="">
      <header className=" text-foreground mb-8 flex items-center justify-between">
        <span className="prose">
          <h1 className="mb-0 text-foreground">Contractors</h1>
          <small className="text-primary">
            Here are your contractors. You can create / edit and delete.
          </small>
        </span>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-2">Add contractor</Button>
          </DialogTrigger>
          <CreateContractorModal />
        </Dialog>
      </header>

      <DataTable data={data ? data : []} columns={columns} />
    </div>
  );
}
