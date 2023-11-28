import { useCartStore } from "@/store/useCartStore"
import { useMemo } from "react"
import { Product } from "@/types/models"


export default function useCartCount() {
    const { items } = useCartStore()

    const count = useMemo(() => {
        return Object.entries(items).reduce((acc, [key, value]) => {
            return acc + value
        }, 0)
    }, [items])
    const data: Product[] = []
    const totalPrice = useMemo(() => {
        return Object.entries(items).reduce((acc, [key, value]) => {
            const product = data?.find(p => p.id === key)
            if (!!product) {
                acc += product.price * value
            }
            return acc
        }, 0)
    }, [items, data])
    return { count, totalPrice }
}