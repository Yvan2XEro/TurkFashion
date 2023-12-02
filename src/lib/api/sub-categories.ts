import * as z from "zod"
import { Category } from "./categories";
import { Filter } from "./filters";
import { DefaultObject } from "@/types/models";


export const subCategorySchema = z.object({
    name: z.string().min(2).max(30),
    category: z.number(),
    filters: z.array(z.number()).default([]),
    photoUrl: z.string()
})

export type SubCategoryPayload = z.infer<typeof subCategorySchema>
export type SubCategory = Omit<Omit<SubCategoryPayload, "filters">, "category"> & DefaultObject & {
    category: Category,
    filters: Filter[]
}
