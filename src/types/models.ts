export type DefaultObject = {
    id: number
    createdAt: string
    updatedAt: string
}


export type Product = {
    id: number,
    name: string,
    price: number,
    photoUrl: string
    description?: string
    categoryid: number
    subCategoryid: number
    filters: Record<string, string>
    tags: string[]
}

export type Category = {
    id: number,
    name: string
    photoUrl: string
}

export type SubCategory = {
    id: number,
    name: string
    photoUrl: string
    categoryid: number
    filters: string[]
}

export type Filter = {
    label: string
    values: string[]
    id: number
}

export type TagObj = {
    label: string
}