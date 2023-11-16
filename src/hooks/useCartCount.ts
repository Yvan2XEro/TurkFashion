import { useCartStore } from "@/store/useCartStore"
import { useMemo } from "react"


export default function useCartCount() {
    const { items } = useCartStore()

    const count = useMemo(() => {
        return Object.entries(items).reduce((acc, [key, value]) => {
            return acc + value
        }, 0)
    }, [items])
    return count
}