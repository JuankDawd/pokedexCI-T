import { Box, Chip, Container, Link, List, ListItem, Modal, Snackbar, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'
import { handleTypeColor } from '../../Utils'
import { Scrollbar, A11y, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { PokedexController } from '../../Utils/API/Controllers/Pokedex.controller'
import { PokemonDetailed, PokemonDetailedEmpty } from '../../Utils/interfaces/getPokemon.interface'
import { useLocation } from 'react-router-dom'
import { AbilityDetails } from '../../Utils/interfaces/pokemon.interface'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

const PokemonDetails: React.FC = () => {
    const style = {
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50vw',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderRadius: '8px',
        boxShadow: 24,
        p: 4,
    }
    const location = useLocation()
    const [pokemon, setPokemon] = useState<PokemonDetailed>(PokemonDetailedEmpty)
    const [open, setOpen] = useState(false)
    const [error, setError] = useState('')
    const [ability, setAbility] = useState<AbilityDetails>({ effect: '', short_effect: '', generationName: '', name: '' })
    const handleClose = (): void => setOpen(false)

    useEffect(() => {
        const getPokemon = async (): Promise<void> => {
            const resp = await PokedexController.getPokemon(pokemonName)

            if (resp.status === 200) {
                const data = resp.data

                setPokemon(data)
            } else {
                setError('Error obtining the pokemon')
            }
        }

        const pokemonName = location.pathname.split('/')[2]
        getPokemon()
    }, [location])

    const handleOpen = async (ability): Promise<void> => {
        const abilityId = ability.ability.url.split('/')[6]

        const resp = await PokedexController.getAbilityDescription(abilityId)

        if (resp.status === 200) {
            const data = resp.data

            handleAbilityInfo(data)

            setOpen(true)
        } else {
            setError('Error obtining the pokemon ability')
        }
    }

    const handleSprites = (pokemonList: PokemonDetailed): string[] => {
        const keys = Object.keys(pokemonList)

        if (pokemonList === undefined || pokemonList === null || keys.length === 0) return []

        const sprites = pokemonList.sprites

        const spritesArray = Object.keys(sprites).map((key) => sprites[key])
        const filteredSprites = spritesArray.filter((sprite) => sprite !== null && sprite !== undefined && sprite !== '')

        const removeLastSprite = filteredSprites.slice(0, filteredSprites.length - 2)

        return removeLastSprite
    }

    const handleAbilityInfo = ({ effect_entries, generation, name }): void => {
        const [{ effect, short_effect }] = effect_entries.filter(({ language: { name } }) => name === 'en')
        const { name: generationName } = generation

        setAbility({ effect, short_effect, generationName, name })
    }

    const handleGeneration = (generation): string => {
        generation = generation.replace('-', ' ')
        generation = generation.replace('generation', 'Gen')
        generation = generation.replaceAll('i', 'I')
        return generation
    }
    return (
        <Container
            maxWidth="md"
            sx={{
                backgroundColor: '#F5F5F5',
                padding: 4,
                borderRadius: 2,
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontSize: '40px',
                    lineHeight: '24px',
                    width: '100%',
                    textAlign: 'center',
                    textTransform: 'capitalize',
                    marginBottom: 4,
                }}
            >
                {pokemon?.name}
            </Typography>
            {pokemon && (
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={10}
                    slidesPerView={3}
                    pagination={{ clickable: true }}
                    loop={true}
                >
                    {handleSprites(pokemon).map((sprite, index) => (
                        <SwiperSlide key={index}>
                            <img src={sprite} alt={pokemon.name} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            <Typography
                variant="h6"
                sx={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    width: '100%',
                    textAlign: 'center',
                    textTransform: 'capitalize',
                    mb: 1,
                    mt: 3,
                }}
            >
                Types
            </Typography>
            {pokemon?.types?.map((type, index) => (
                <Chip
                    key={index}
                    label={type.type.name}
                    sx={{
                        m: 1,
                        mt: 0,
                        fontSize: '16px',
                        lineHeight: '24px',
                        textTransform: 'capitalize',
                        fontWeight: 500,
                        backgroundColor: handleTypeColor(type.type.name),
                    }}
                />
            ))}

            <Typography
                variant="h6"
                sx={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    width: '100%',
                    textAlign: 'center',
                    textTransform: 'capitalize',
                    marginBottom: 2,
                }}
            >
                Abilities
            </Typography>
            <List>
                <ListItem
                    sx={{
                        border: '1px solid #000',
                    }}
                    onClick={(): Promise<void> => handleOpen(ability)}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            width: '34%',
                            fontSize: '16px',
                            lineHeight: '24px',
                            textAlign: 'center',
                            textTransform: 'capitalize',
                        }}
                    >
                        {'Name'}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{ width: '33%', fontSize: '16px', lineHeight: '24px', textAlign: 'center', textTransform: 'capitalize' }}
                    >
                        {'Hidden'}
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{ width: '33%', fontSize: '16px', lineHeight: '24px', textAlign: 'center', textTransform: 'capitalize' }}
                    >
                        {'Description?'}
                    </Typography>
                </ListItem>
                {pokemon?.abilities?.map((ability, index) => (
                    <ListItem key={index} button>
                        <Typography
                            variant="h6"
                            sx={{
                                width: '34%',
                                fontSize: '16px',
                                lineHeight: '24px',
                                textAlign: 'center',
                                textTransform: 'capitalize',
                            }}
                        >
                            {ability.ability.name}
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{ width: '33%', fontSize: '16px', lineHeight: '24px', textAlign: 'center', textTransform: 'capitalize' }}
                        >
                            {ability.is_hidden ? 'Hidden' : 'Not Hidden'}
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{ fontSize: '16px', lineHeight: '24px', textAlign: 'center', textTransform: 'capitalize', width: '33%' }}
                        >
                            <Link variant="h6" onClick={(): Promise<void> => handleOpen(ability)} sx={{ width: '100%' }}>
                                See More
                            </Link>
                        </Typography>
                    </ListItem>
                ))}
            </List>

            <Modal
                open={open}
                onClose={handleClose}
                sx={{
                    borderRadius: 2,
                }}
            >
                <Box sx={style}>
                    {ability && (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'Start',
                                marginBottom: 2,
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: '20px',
                                    lineHeight: '24px',
                                    textTransform: 'capitalize',
                                    fontWeight: 500,
                                }}
                            >
                                Name
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: '16px',
                                    lineHeight: '24px',
                                    textTransform: 'capitalize',
                                    marginBottom: 2,
                                }}
                            >
                                {ability.name}
                            </Typography>

                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: '20px',
                                    lineHeight: '24px',
                                    textTransform: 'capitalize',
                                    fontWeight: 500,
                                }}
                            >
                                Description
                            </Typography>

                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: '16px',
                                    lineHeight: '24px',
                                    textTransform: 'capitalize',
                                    marginBottom: 2,
                                }}
                            >
                                {ability.short_effect}
                            </Typography>

                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: '20px',
                                    lineHeight: '24px',
                                    textTransform: 'capitalize',
                                    fontWeight: 500,
                                }}
                            >
                                Effect
                            </Typography>

                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: '16px',
                                    lineHeight: '24px',
                                    textTransform: 'capitalize',
                                    marginBottom: 2,
                                }}
                            >
                                {ability.effect}
                            </Typography>

                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: '20px',
                                    lineHeight: '24px',
                                    textTransform: 'capitalize',
                                    fontWeight: 500,
                                }}
                            >
                                Generation
                            </Typography>

                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: '16px',
                                    lineHeight: '24px',

                                    marginBottom: 2,
                                }}
                            >
                                {handleGeneration(ability.generationName)}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Modal>

            <Snackbar
                open={error !== ''}
                autoHideDuration={6000}
                onClose={(): void => setError('')}
                message={error}
                sx={{
                    width: '100%',
                    '& .MuiSnackbarContent-root': {
                        backgroundColor: '#f44336',
                        color: '#fff',
                        fontSize: '16px',
                        lineHeight: '24px',
                        textAlign: 'center',
                        textTransform: 'capitalize',
                    },
                }}
            />
        </Container>
    )
}

export default PokemonDetails
