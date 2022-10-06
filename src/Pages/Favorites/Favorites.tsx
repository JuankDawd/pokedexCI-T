import React, { useCallback, useRef } from 'react'
import { PokedexToolbar } from '../../Components/PokedexToolbar'
import PokemonGrid from '../../Components/PokemonGrid/Component'

import useFavoriteSearch from '../../Utils/hooks/useFavoritesSearch'
import { Container } from '@mui/system'
import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { PokemonInterface } from '../../Utils/interfaces/pokemon.interface'
import { getPokemons } from '../../Utils/services/pokemonSlice'
import { PokemonFiltered } from '../../Components/PokemonFiltered'

const Favorites: React.FC = () => {
    const [offset, setOffset] = React.useState(0)
    const [pokemonsFiltered, setPokemonsFiltered] = React.useState<PokemonInterface[]>([])
    const [search, setSearch] = React.useState('')
    const pokemonList = useSelector(getPokemons)

    const { favorites, loading, hasMore } = useFavoriteSearch({ offset })

    const observer = useRef<IntersectionObserver>()

    const handleChangeSearch = (search): void => {
        const filteredArr = pokemonList.filter((pokemon) => pokemon.name.includes(search))

        if (search === '') {
            setPokemonsFiltered([])
            setSearch('')
        } else {
            setPokemonsFiltered(filteredArr)
            setSearch(search)
        }
    }

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
                <PokedexToolbar onChange={handleChangeSearch} />
                {search === '' ? (
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
                ) : (
                    <PokemonFiltered pokemons={pokemonsFiltered} />
                )}
            </Container>
        )
    }

    return (
        <Container>
            {/* PokedexToolbar  */}
            <PokedexToolbar onChange={handleChangeSearch} />

            {/* Pokedex  */}
            {search === '' ? (
                <PokemonGrid pokemons={favorites} favoritePage={true} lastPokemonElementRef={lastPokemonElementRef} />
            ) : (
                <PokemonFiltered pokemons={pokemonsFiltered} />
            )}
        </Container>
    )
}

export default Favorites
