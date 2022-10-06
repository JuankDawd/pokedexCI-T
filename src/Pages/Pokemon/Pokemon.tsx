import React, { Fragment, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { PokedexToolbar } from '../../Components/PokedexToolbar'
import { PokedexController } from '../../Utils/API/Controllers/Pokedex.controller'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Box, Chip, Container, Link, Modal, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const Pokemon: React.FC = () => {
    const location = useLocation()
    const [pokemon, setPokemon] = React.useState<any>({})
    const [open, setOpen] = React.useState(false)
    const [ability, setAbility] = useState({ effect: '', short_effect: '', generationName: '', name: '' })

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    useEffect(() => {
        const getPokemon = async () => {
            const resp = await PokedexController.getPokemon(pokemonName)
            if (resp.status === 200) {
                const data = resp.data
                setPokemon(data)
            } else {
                console.log('error')
            }
        }

        const pokemonName = location.pathname.split('/')[2]
        getPokemon()
    }, [location])

    const handleSprites = (pokemonList) => {
        const keys = Object.keys(pokemonList)

        if (pokemonList === undefined || pokemonList === null || keys.length === 0) return []

        const sprites = pokemonList.sprites

        const spritesArray = Object.keys(sprites).map((key) => sprites[key])
        const filteredSprites = spritesArray.filter((sprite) => sprite !== null && sprite !== undefined && sprite !== '')

        const removeLastSprite = filteredSprites.slice(0, filteredSprites.length - 2)

        return removeLastSprite
    }

    const handleAbilityInfo = ({ effect_entries, generation, name }) => {
        const [{ effect, short_effect }] = effect_entries.filter(({ language: { name } }) => name === 'en')
        const { name: generationName } = generation

        setAbility({ effect, short_effect, generationName, name })
    }

    const handleGeneration = (generation) => {
        generation = generation.replace('-', ' ')
        generation = generation.replace('generation', 'Gen')
        generation = generation.replaceAll('i', 'I')
        return generation
    }

    const handleOpen = async (ability) => {
        const abilityId = ability.ability.url.split('/')[6]

        const resp = await PokedexController.getAbilityDescription(abilityId)

        if (resp.status === 200) {
            const data = resp.data
            handleAbilityInfo(data)
            setOpen(true)
        } else {
            console.log('error')
        }
    }
    const handleClose = () => setOpen(false)

    return (
        <Fragment>
            <PokedexToolbar />

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
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={10}
                    slidesPerView={3}
                    pagination={{ clickable: true }}
                    loop={true}
                >
                    {handleSprites(pokemon).map((type, index) => (
                        <SwiperSlide key={index}>
                            <img src={type} alt={type} />
                        </SwiperSlide>
                    ))}
                </Swiper>

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
                        marginBottom: 4,
                    }}
                >
                    Abilities
                </Typography>

                <Table>
                    <TableHead></TableHead>
                    <TableBody>
                        {pokemon?.abilities?.map((ability, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Typography
                                        key={index}
                                        variant="h6"
                                        sx={{
                                            fontSize: '16px',
                                            lineHeight: '24px',
                                            textAlign: 'center',
                                            textTransform: 'capitalize',
                                        }}
                                    >
                                        {ability.ability.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        key={index}
                                        variant="h6"
                                        sx={{
                                            fontSize: '16px',
                                            lineHeight: '24px',
                                            textAlign: 'center',
                                            textTransform: 'capitalize',
                                        }}
                                    >
                                        {ability.is_hidden ? 'Hidden' : 'Not Hidden'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Link
                                        key={index}
                                        variant="h6"
                                        sx={{
                                            fontSize: '16px',
                                            lineHeight: '24px',
                                            textAlign: 'center',
                                            textTransform: 'capitalize',
                                        }}
                                        onClick={() => handleOpen(ability)}
                                    >
                                        {'See More'}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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
                                        fontSize: '16px',
                                        lineHeight: '24px',
                                        textTransform: 'capitalize',
                                        marginBottom: 2,
                                    }}
                                >
                                    Name: {ability['name']}
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
                                    {ability['short_effect']}
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
                                    {ability['effect']}
                                </Typography>

                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: '16px',
                                        lineHeight: '24px',

                                        marginBottom: 2,
                                    }}
                                >
                                    {handleGeneration(ability['generationName'])}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Modal>
            </Container>
        </Fragment>
    )
}

export default Pokemon
