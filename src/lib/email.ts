import { Resend } from "resend";
import type { OrderPayload } from "@/app/checkout/actions";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNewOrderNotification(
  to: string,
  payload: OrderPayload,
  orderId: string
) {
  const itemsHtml = payload.items
    .map(
      (item) =>
        `<tr>
          <td style="padding:4px 12px 4px 0;">${item.product_name}</td>
          <td style="padding:4px 12px;">x${item.quantity}</td>
          <td style="padding:4px 0;text-align:right;">$${(
            item.unit_price * item.quantity
          ).toFixed(2)}</td>
        </tr>`
    )
    .join("");

  const html = `
    <h2>New order — ${payload.customerName}</h2>
    <p><strong>Pickup date:</strong> ${payload.collectionDate}</p>
    <p><strong>Customer:</strong> ${payload.customerName}<br/>
       <strong>Email:</strong> ${payload.customerEmail}<br/>
       <strong>Phone:</strong> ${payload.customerPhone}</p>
    <table style="border-collapse:collapse;">${itemsHtml}</table>
    <p><strong>Total: $${payload.total.toFixed(2)}</strong></p>
    ${payload.notes ? `<p><strong>Notes:</strong> ${payload.notes}</p>` : ""}
    <p style="color:#888;font-size:12px;">Order ID: ${orderId}</p>
  `;

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to,
    subject: `New order from ${payload.customerName} — pickup ${payload.collectionDate}`,
    html,
  });
}
