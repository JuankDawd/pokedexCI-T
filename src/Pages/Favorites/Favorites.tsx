import React, { useCallback, useRef } from 'react'
import { Fragment } from 'react'
import { PokedexToolbar } from '../../Components/PokedexToolbar'
import PokemonGrid from '../../Components/PokemonGrid/Component'
import usePokemonSearch from '../../Utils/hooks/usePokemonSearch'

import useFavoriteSearch from '../../Utils/hooks/useFavoritesSearch'

const Favorites: React.FC = () => {
    const [offset, setOffset] = React.useState(0)

    const { favorites, loading, hasMore } = useFavoriteSearch({ offset })

    const observer = useRef<IntersectionObserver>()

    const lastPokemonElementRef = useCallback(
        (node: Element) => {
            if (loading) return

            if (observer.current) observer.current.disconnect()

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setOffset((prevOffset) => prevOffset + 10)
                }
            })

            if (node) observer.current.observe(node)
        },
        [loading, hasMore]
    )

    return (
        <Fragment>
            {/* PokedexToolbar  */}
            <PokedexToolbar />
            {/* Pokedex  */}

            <PokemonGrid pokemons={favorites} lastPokemonElementRef={lastPokemonElementRef} />
        </Fragment>
    )
}

export default Favorites
