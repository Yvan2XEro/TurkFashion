import * as z from "zod"
import { DefaultObject } from "@/types/models";
import { City } from "./cities";


export const addressSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50),
    city: z.coerce.number({ errorMap: () => ({ message: "City is required" }) }).positive(),
    address: z.string().min(2, "Address must be at least 2 characters").max(200),
    phone: z.string().min(2, "Phone must be at least 2 characters").max(50),
    label: z.string().min(2, "Label must be at least 2 characters").max(50),
})

export type AddressPayload = z.infer<typeof addressSchema>
export type Address = Omit<AddressPayload, "city"> & DefaultObject & {
    city: City
}

