import { useCartStore } from "@/store/useCartStore"
import { useMemo } from "react"
import { Product } from "@/types/models"
import { useQuery } from "react-query";
import { fetchWithAuth } from "@/lib/api/app-fetch";


export default function useCartCount() {
    const { items } = useCartStore()

    const { data: products, isLoading } = useQuery({
        queryKey: ['products', Object.keys(items)],
        queryFn: async () => {
            try {
                const response = await fetchWithAuth(
                    `/products/find/${Object.keys(items).join(',')}`,
                );
                const data = await response.json();
                if (response.ok) {
                    return data as Product[];
                }
                return Promise.reject(data);
            } catch (error) {
                return Promise.reject(error);
            }
        },
    });

    const count = useMemo(() => {
        return Object.entries(items).reduce((acc, [key, value]) => {
            return acc + value
        }, 0)
    }, [items])

    const totalPrice = useMemo(() => {
        return Object.entries(items).reduce((acc, [key, value]) => {
            const product = products?.find(p => p.id === +key)
            if (!!product) {
                acc += product.price * value
            }
            return acc
        }, 0)
    }, [items, products])
    return { count, totalPrice }
}