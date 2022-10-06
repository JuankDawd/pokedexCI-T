import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getFavorites } from '../../Utils/services/favoriteSlice'
import { PokemonInterface } from '../interfaces/pokemon.interface'

interface useFavoriteSearchInterface {
    loading: boolean
    error: boolean
    favorites: PokemonInterface[]
    hasMore: boolean
}
export default function useFavoriteSearch({ offset }): useFavoriteSearchInterface {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [pokemons, setPokemons] = useState<PokemonInterface[]>([])
    const [hasMore, setHasMore] = useState(false)

    const favorites: PokemonInterface[] = useSelector(getFavorites)

    useEffect(() => {
        const loadPokemons = async (): Promise<void> => {
            if (favorites.length > offset) {
                const newfavorites: PokemonInterface[] = favorites.slice(offset, offset + 10)

                const hasMore = favorites.length > offset + 10

                setPokemons([...pokemons, ...newfavorites])
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
    return { loading, error, favorites, hasMore }
}
