import { NextRequest, NextResponse } from "next/server";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/database";
import { UserModel } from "@/models/User.model";
import { InvoiceModel } from "@/models/Invoice.model";
import { CheckoutSessionModel } from "@/models/CheckoutSession.model";
import "@/models";

export async function GET(request: NextRequest) {
    try {
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();

        const _user = await (await clerkClient()).users.getUser(userId)
        if (!_user.primaryEmailAddress?.emailAddress)
            return NextResponse.json({ error: 'User email not found' }, { status: 400 })

        const user = await UserModel.findOne({ email: _user.primaryEmailAddress.emailAddress });
        if (!user)
            return NextResponse.json({ error: 'User not found' }, { status: 404 });

        const searchParams = request.nextUrl.searchParams;
        const invoiceId = searchParams.get('invoiceId');
        if (!invoiceId) {
            return NextResponse.json({ error: 'Missing invoiceId' }, { status: 400 });
        }

        // Find invoice
        const invoice = await InvoiceModel.findById(invoiceId);
        if (!invoice) {
            return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
        }

        // If one-time, just return its payments array
        if (invoice.paymentCollection === "one-time") {
            return NextResponse.json({
                payments: invoice.payments
            }, { status: 200 });
        }

        // If multi-use, gather all checkout sessions that have a paid or partially paid status
        if (invoice.paymentCollection === "multi-use") {
            const sessions = await CheckoutSessionModel.find({
                invoiceId: invoice._id,
                status: { $in: ["paid", "partially paid"] }
            });

            const sessionPayments = sessions
                .filter(s => s.payment?.amount)
                .map(s => s.payment);

            return NextResponse.json({
                payments: sessionPayments
            }, { status: 200 });
        }
    } catch (err: any) {
        console.error("[GET /api/invoice/payments] Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
