export function invoicePaymentEmail(
    invoiceNumber: string,
    amount: string,
    payLink: string,
    dueDate: string
): string {
    return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Invoice Payment</title>
      <style>
        /* Basic responsive styling */
        body, table, td, a {
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 1rem;
        }
        .header {
          text-align: center;
          background-color: #f2f2f2;
          padding: 1rem;
        }
        .content {
          background: #ffffff;
          padding: 1rem;
        }
        .button {
          display: inline-block;
          padding: 0.75rem 1.25rem;
          background-color: #0070f3;
          color: #fff;
          text-decoration: none;
          margin-top: 1rem;
          border-radius: 4px;
        }
        .footer {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.85rem;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Invoice Payment</h2>
        </div>
        <div class="content">
          <p>Invoice #: <strong>${invoiceNumber}</strong></p>
          <p>Due Date: <strong>${dueDate}</strong></p>
          <p>Amount Due: <strong>${amount}</strong></p>
          <p>Please click the link below to pay your invoice.</p>
          <a href="${payLink}" class="button" target="_blank">Pay Invoice</a>
        </div>
        <div class="footer">
          <p>If you have any questions, please contact our support.</p>
        </div>
      </div>
    </body>
  </html>
    `;
}

export function invoicePartialPaymentEmail(
    invoiceNumber: string,
    amount: string,
    totalAmount: string,
    remainingAmount: string,
    datePaid: string
): string {
    return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Partial Payment Received</title>
      <style>
        body, table, td, a {
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 1rem;
        }
        .header {
          text-align: center;
          background-color: #f2f2f2;
          padding: 1rem;
        }
        .content {
          background: #ffffff;
          padding: 1rem;
        }
        .footer {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.85rem;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Partial Payment Received</h2>
        </div>
        <div class="content">
          <p>Thank you for your partial payment.</p>
          <p>Invoice #: <strong>${invoiceNumber}</strong></p>
          <p>Date Paid: <strong>${datePaid}</strong></p>
          <p>Amount Paid: <strong>${amount}</strong></p>
          <p>Total Amount Due: <strong>${totalAmount}</strong></p>
          <p>Remaining Balance: <strong>${remainingAmount}</strong></p>
          <p>Your invoice is now marked as partially paid.</p>
        </div>
        <div class="footer">
          <p>If you have any questions, please contact our support.</p>
        </div>
      </div>
    </body>
  </html>
    `;
}

export function invoicePaymentConfirmationEmail(
    invoiceNumber: string,
    amount: string,
    datePaid: string,
    isOwner: boolean = false
): string {
    return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>${isOwner ? 'New Payment Received' : 'Payment Confirmation'}</title>
      <style>
        body, table, td, a {
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 1rem;
        }
        .header {
          text-align: center;
          background-color: #f2f2f2;
          padding: 1rem;
        }
        .content {
          background: #ffffff;
          padding: 1rem;
        }
        .footer {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.85rem;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>${isOwner ? 'New Payment Received' : 'Payment Confirmation'}</h2>
        </div>
        <div class="content">
          ${isOwner ? 
            `<p>A new payment has been received for your invoice.</p>
             <p>Invoice #: <strong>${invoiceNumber}</strong></p>
             <p>Date Paid: <strong>${datePaid}</strong></p>
             <p>Amount Received: <strong>${amount}</strong></p>
             <p>The payment has been processed and transferred to your wallet.</p>` :
            `<p>Thank you for your payment.</p>
             <p>Invoice #: <strong>${invoiceNumber}</strong></p>
             <p>Date Paid: <strong>${datePaid}</strong></p>
             <p>Amount Paid: <strong>${amount}</strong></p>
             <p>Your payment has been received successfully.</p>`
          }
        </div>
        <div class="footer">
          <p>If you have any questions, please contact our support.</p>
        </div>
      </div>
    </body>
  </html>
    `;
}
