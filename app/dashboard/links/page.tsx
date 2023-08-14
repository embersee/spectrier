import CreateLink from "@/components/create-link-button";
import CreateLinkModal from "@/components/create-link-modal";
import { DataTable } from "@/components/table/data-table";
import { linkColumns } from "@/components/table/links-column";

import { db } from "@/lib/db";

export default async function LinksPage() {
  const links = await db.query.link.findMany();

  return (
    <>
      <div className="flex space-x-4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Ссылки
        </h1>
        <CreateLink />
      </div>
      <DataTable data={links} columns={linkColumns} />
      <CreateLinkModal />
    </>
  );
}
