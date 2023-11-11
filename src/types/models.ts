export type Product = {
    uuid: string,
    name: string,
    price: number,
    image: string
    description?: string
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
    // filters: string[]
}