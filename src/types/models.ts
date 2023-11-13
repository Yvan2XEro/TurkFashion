
export type Product = {
    uuid: string,
    name: string,
    price: number,
    photoUrl: string
    description?: string
    categoryUuid: string
    subCategoryUuid: string
}

export type Category = {
    uuid: string,
    name: string
    photoUrl: string
}

export type SubCategory = {
    uuid: string,
    name: string
    photoUrl: string
    categoryUuid: string
    filters: string[]
}

export type Filter = {
    label: string
    values: string[]
    uuid: string
}