export default async function DashboardPage() {
  return (
    <>
      <div className="flex space-x-4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Dashboard
        </h1>
        {/* <Link href={"/dashboard/products/create-product"}>
          <Button variant="secondary">Создать</Button>
        </Link> */}
      </div>

      {/* <DataTable columns={columns} data={products} /> */}
    </>
  );
}

export const revalidate = 0;
