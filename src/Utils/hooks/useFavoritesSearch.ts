import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getFavorites } from '../../Utils/services/favoriteSlice'

export default function useFavoriteSearch({ offset }) {
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)
    const [pokemons, setPokemons] = React.useState([])
    const [hasMore, setHasMore] = React.useState(false)

    const favorites = useSelector(getFavorites)

    useEffect(() => {
        const loadPokemons = async () => {
            if (favorites.length > offset) {
                const newfavorites: [] = favorites.slice(offset, offset + 10)

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
