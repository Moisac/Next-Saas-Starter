import { stripe } from "@/lib/stripe";
import { Invoice } from "@/types/subscription";
import { format } from 'date-fns'
  
export async function getUserInvoices(stripeCustomerId: string): Promise<Invoice[] | null> {
    try {

        if (!stripeCustomerId){
            return null
        }
        const invoices = await stripe.invoices.list({
            customer: stripeCustomerId,
        });

        // Extract relevant information from invoices
        const userInvoices = invoices.data.map((invoice) => ({
            id: invoice.id,
            amount_due: new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: invoice.currency,
            }).format(invoice.amount_due / 100),
            amount_paid: new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: invoice.currency,
            }).format(invoice.amount_paid / 100),
            status: invoice.status,
            collection_method: invoice.collection_method,
            customer_email: invoice.customer_email,
            customer_name: invoice.customer_name,
            invoice_url: invoice.hosted_invoice_url,
            invoice_pdf: invoice.invoice_pdf,
            created: format(new Date(invoice.created * 1000), 'yyyy-MM-dd HH:mm:ss'),
            paid_at: format(new Date(invoice.status_transitions.paid_at * 1000), 'yyyy-MM-dd HH:mm:ss')
        }));

        return userInvoices as unknown as Invoice[];
    } catch (error) {
        throw new Error(error as string);
    }
}