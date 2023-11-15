import { Filter, Product } from "@/types/models";


export function filtersObjects(p: Product, filters: Filter[]) {
    let filtersObjects: { label: string, value: string, uuid: string }[] = []
    Object.keys(p.filters).forEach(key => {
        const filter = filters.find(f => f.uuid === key)
        if (filter) {
            filtersObjects.push({ label: filter.label, value: p.filters[key], uuid: filter.uuid })
        }
    })
    return filtersObjects
}