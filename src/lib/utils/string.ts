

export function substr(str: string, n: number) {
    if (str.length > n) {
        return str.substring(0, n - 1) + '...'
    }
    return str
}