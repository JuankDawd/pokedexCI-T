export interface GetPokemons {
    data: Data
    status: number
}

export interface Data {
    count: number
    next: string
    previous: null
    results: Result[]
}

export interface Result {
    name: string
    url: string
}
