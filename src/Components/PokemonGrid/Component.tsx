import { Avatar, Button, Container, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import './Component.scss'
import { Favorite } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { Pokemon } from '../../Utils/interfaces/pokemon.interface'
import { addFavorite, getFavorites, removeFavorite } from '../../Utils/services/favoriteSlice'
import { useSelector, useDispatch } from 'react-redux'
import { getPokemonImage } from '../../Utils'
interface PokemonGridProps {
    pokemons: Pokemon[]
    favoritePage: boolean
    lastPokemonElementRef: (_node) => void
}

const PokemonGrid: React.FC<PokemonGridProps> = ({ pokemons, favoritePage, lastPokemonElementRef }) => {
    const navigate = useNavigate()
    const favorites = useSelector(getFavorites)
    const dispatch = useDispatch()
    const handleFavoriteChange = (pokemon: Pokemon): void => {
        if (pokemon) {
            if (!favorites.includes(pokemon)) {
                console.log({
                    pokemon,
                    msg: 'Added to favorites',
                })
                dispatch(addFavorite(pokemon))
            } else {
                console.log({
                    pokemon,
                    msg: 'Remove from favorites',
                })
                dispatch(removeFavorite(pokemon))
            }
        }
    }

    const isFavorite = (pokemon: Pokemon): boolean => {
        return favorites.includes(pokemon)
    }

    const goToPokemon = (pokemon: Pokemon): void => navigate(`/pokemon/${pokemon.name}`)

    return (
        <Container
            maxWidth="md"
            sx={{
                width: '100vw',
                backgroundColor: '#F5F5F5',
                borderRadius: '8px',
            }}
        >
            <Grid container>
                <Grid
                    item
                    xs={12}
                    sx={{
                        width: '100%',
                        backgroundColor: '#F5F5F5',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '16px',
                            lineHeight: '24px',
                            width: '100%',

                            color: '#000000',
                            fontWeight: 'bold',
                            padding: '16px 0px 16px 16px',

                            backgroundColor: '#F5F5F5',

                            borderRadius: '8px 8px 0px 0px',

                            borderBottom: '1px solid #E0E0E0',
                        }}
                    >
                        {!favoritePage ? 'Pokemons List' : 'Favorites'}
                    </Typography>
                </Grid>

                {pokemons.map((pokemon, index) => (
                    <Grid
                        ref={index + 1 === pokemons.length ? lastPokemonElementRef : null}
                        item
                        key={index}
                        xs={12}
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
                                color: isFavorite(pokemon) ? '#FF0000' : '#000000',
                            }}
                            onClick={(): void => handleFavoriteChange(pokemon)}
                        >
                            <Favorite />
                        </IconButton>
                        <Avatar
                            variant="rounded"
                            src={getPokemonImage(pokemon.url)}
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
                            onClick={(): void => goToPokemon(pokemon)}
                        >
                            Details
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default PokemonGrid
