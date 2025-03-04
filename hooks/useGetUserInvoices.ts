import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { getUserInvoices } from "../lib/api";

export const useGetUserInvoices = (invoiceId?: string | null, limit?: number, page?: number) => {
    const { getToken, isLoaded, isSignedIn } = useAuth();

    return useQuery({
        queryKey: [`${invoiceId ? `getUserInvoice_${invoiceId}` : "getUserInvoices"}`, invoiceId],
        queryFn: async () => {
            const token = (await getToken()) as string;
            return getUserInvoices(invoiceId ? undefined : token, invoiceId || undefined, limit, page);
        },
        refetchOnWindowFocus: false,
        refetchInterval: invoiceId ? 20 * 1000 : undefined,
        enabled: !!isLoaded && !!isSignedIn
    });
};
