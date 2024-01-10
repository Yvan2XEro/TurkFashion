import { AddressPayload } from "@/lib/api/address"
import { universalCreate, universalUpdate } from "@/lib/api/universalfetch"
import { useMutation, useQueryClient } from "react-query"

type TProps = {
    id?: number
    onSuccess?: () => void

}
export default function useEditAddressForm({ id, onSuccess }: TProps) {

    const client = useQueryClient()
    const mutation = useMutation({
        mutationFn: (payload: AddressPayload) => !!id ? universalUpdate<AddressPayload>({
            path: `/addresses`,
            id,
            payload
        }) : universalCreate<AddressPayload>({
            path: "/addresses",
            payload
        }),
        onSuccess: () => {
            onSuccess?.()
            client.invalidateQueries(["addresses"])
        },
        onError: () => {
        }
    })
    async function onSubmit(address: AddressPayload) {
        if (mutation.isLoading) return
        await mutation.mutateAsync(address)
    }
    return ({
        onSubmit,
        mutation
    }
    )
}