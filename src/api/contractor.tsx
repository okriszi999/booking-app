import { db } from "@/lib/db/db";
import { contractors as contractor } from "@/lib/db/schema";

export function getAllContractors() {
  return [];
}

export async function createContractor(props: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}) {
  console.log("props", props);
  await db.insert(contractor).values(props);

  return {
    id: "1",
  };
}

export async function deleteContractorById({ id }: { id: string }) {
  await wait(5000);
  return {};
}

async function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
