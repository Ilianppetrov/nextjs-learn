import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import { notFound, redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  // create promise sleep function
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // await sleep(2000);

  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);
  if (!invoice) {
    notFound();
  }
  // if (!invoice) {
  //   return redirect("/dashboard/invoices");
  // }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      {invoice && <Form invoice={invoice} customers={customers} />}
    </main>
  );
}
