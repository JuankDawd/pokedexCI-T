import React, { useCallback, useRef } from 'react'
import { Fragment } from 'react'
import { PokedexToolbar } from '../../Components/PokedexToolbar'
import PokemonGrid from '../../Components/PokemonGrid/Component'
import usePokemonSearch from '../../Utils/hooks/usePokemonSearch'

import useFavoriteSearch from '../../Utils/hooks/useFavoritesSearch'
import { Container } from '@mui/system'
import { Box, Typography } from '@mui/material'

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

    if (favorites.length === 0) {
        return (
            <Container>
                {/* PokedexToolbar  */}
                <PokedexToolbar />

                <Box
                    minHeight="60vh"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5',
                        height: '60vh',
                        width: '60vw',
                        borderRadius: 2,
                    }}
                    maxWidth="sm"
                >
                    <Typography variant="h4" component="h4" align="center">
                        No favorites found
                    </Typography>
                </Box>
            </Container>
        )
    }

    return (
        <Container>
            {/* PokedexToolbar  */}
            <PokedexToolbar />

            {/* Pokedex  */}
            <PokemonGrid pokemons={favorites} lastPokemonElementRef={lastPokemonElementRef} />
        </Container>
    )
}

export default Favorites
