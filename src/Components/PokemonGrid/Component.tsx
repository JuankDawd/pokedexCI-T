import { Avatar, Button, Container, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import { Fragment } from 'react'
import './Component.scss'
import { Favorite } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { PokedexController } from '../../Utils/API/Controllers/Pokedex.controller'
import { Pokemon } from '../../Utils/interfaces/pokemon.interface'
import { addFavorite, getFavorites, removeFavorite } from '../../Utils/services/favoriteSlice'
import { useSelector, useDispatch } from 'react-redux'
interface PokemonGridProps {
    pokemons: Pokemon[]
    lastPokemonElementRef: (node: any) => void
}

const PokemonGrid: React.FC<PokemonGridProps> = ({ pokemons, lastPokemonElementRef }) => {
    const navigate = useNavigate()
    const favorites = useSelector(getFavorites)
    const dispatch = useDispatch()
    const handleFavorite = async (pokemon): Promise<void> => {
        if (pokemon) {
            if (!favorites.includes(pokemon)) {
                dispatch(addFavorite(pokemon))
            } else {
                dispatch(removeFavorite(pokemon))
            }
        }
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
                            ref={index + 1 === pokemons.length ? lastPokemonElementRef : null}
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
                                onClick={() => handleFavorite(pokemon)}
                                children={<Favorite />}
                            />
                            <Avatar
                                variant="rounded"
                                src={PokedexController.getPokemonImage(index)}
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
