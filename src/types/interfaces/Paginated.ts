interface Paginated<T> {
    meta: {
        count: number
    },
    data: T[]
}