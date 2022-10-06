import { Avatar, Button, Container, Grid, IconButton, Typography } from '@mui/material'
import React, { useCallback, useRef } from 'react'
import { Fragment } from 'react'
import './Component.scss'
import usePokemonSearch from '../../Utils/hooks/usePokemonSearch'
import { Favorite } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
const PokemonGrid: React.FC = () => {
    const navigate = useNavigate()
    const [offset, setOffset] = React.useState(10)
    const { pokemons, loading, hasMore } = usePokemonSearch({
        offset,
    })

    const observer = useRef<IntersectionObserver>()
    const lastPokemonElementRef = useCallback(
        (node) => {
            if (loading) return
            if (observer.current) observer.current.disconnect()

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setOffset((prevOffset) => prevOffset + 20)
                }
            })
            if (node) observer.current.observe(node)
        },
        [loading, hasMore]
    )

    const getPokemonImage = (index) => {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
    }

    const goToPokemon = (pokemon) => navigate(`/pokemon/${pokemon.name}`)

    return (
        <Fragment>
            <Container
                maxWidth="md"
                sx={{
                    backgroundColor: '#F5F5F5',
                }}
            >
                <Grid container spacing={2} id="scrollableDiv">
                    <Grid item xs={12}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: '16px',
                                lineHeight: '24px',
                                width: '100%',
                            }}
                        >
                            Pokemons List
                        </Typography>
                    </Grid>

                    {pokemons.map((pokemon, index) => (
                        <Grid
                            ref={index + 1 === pokemons.length ? null : lastPokemonElementRef}
                            item
                            key={index}
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',

                                '&:hover': {
                                    backgroundColor: '#E5E5E5',
                                },
                            }}
                        >
                            <IconButton
                                sx={{
                                    width: '5%',
                                    fontSize: '16px',
                                    lineHeight: '24px',
                                    textAlign: 'center',
                                    textTransform: 'capitalize',
                                }}
                                children={<Favorite />}
                            />
                            <Avatar
                                variant="rounded"
                                src={getPokemonImage(index)}
                                alt={pokemon['name']}
                                sx={{
                                    width: '25%',
                                    height: 'auto',
                                }}
                            />

                            <Typography
                                sx={{
                                    width: '75%',
                                    fontSize: '16px',
                                    lineHeight: '24px',
                                    textAlign: 'center',
                                    textTransform: 'capitalize',
                                }}
                            >
                                {pokemon['name']}
                            </Typography>
                            <Button
                                sx={{
                                    width: '10%',
                                    fontSize: '16px',
                                    lineHeight: '24px',
                                    textAlign: 'center',
                                    textTransform: 'capitalize',
                                }}
                                onClick={() => goToPokemon(pokemon)}
                            >
                                Details
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Fragment>
    )
}

export default PokemonGrid
