import { useCartStore } from "@/store/useCartStore"
import { useMemo } from "react"
import firestore from '@react-native-firebase/firestore';
import useCollectionData from "./useCollectionData"
import { Product } from "@/types/models"


export default function useCartCount() {
    const { items } = useCartStore()

    const count = useMemo(() => {
        return Object.entries(items).reduce((acc, [key, value]) => {
            return acc + value
        }, 0)
    }, [items])
    const { data } = useCollectionData<Product>({
        collection: 'products',
        enabled: !!count && count > 0,
        customQuery: ref => {
            return ref.where(
                firestore.FieldPath.documentId(),
                'in',
                Object.keys(items),
            ) as any;
        },
    });
    const totalPrice = useMemo(() => {
        return Object.entries(items).reduce((acc, [key, value]) => {
            const count = useCartStore.getState().items[key]
            const product = data?.find(p => p.uuid === key)
            if (!!product) {
                acc += product.price * value
            }
            return acc
        }, 0)
    }, [items, data])
    return { count, totalPrice }
}