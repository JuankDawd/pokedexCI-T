import React, { useEffect } from 'react'
import { PokedexController } from '../API/Controllers/Pokedex.controller'

export default function usePokemonSearch({ offset }) {
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)
    const [pokemons, setPokemons] = React.useState([])
    const [hasMore, setHasMore] = React.useState(false)

    useEffect(() => {
        const loadPokemons = async () => {
            const resp = await PokedexController.getPokemons(10, offset)

            if (resp.status === 200) {
                const newPokemons: [] = resp.data.results

                const hasMore = resp.data.next

                setPokemons([...pokemons, ...newPokemons])
                setHasMore(hasMore !== null)
                setLoading(false)
            } else {
                setPokemons([])
                setError(true)
            }
        }

        setLoading(true)
        setError(false)
        loadPokemons()
    }, [offset])

    return { loading, error, pokemons, hasMore }
}
