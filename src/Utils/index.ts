const getPokemonId = (url: string): number => +url.split('/')[6]

const getPokemonImage = (url: string) => {
    const id = getPokemonId(url)
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

export { getPokemonImage }
