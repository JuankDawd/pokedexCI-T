import { AppBar, Avatar, Button, Container, Grid, Toolbar, Typography } from '@mui/material'
import { Favorite, CatchingPokemon } from '@mui/icons-material'
import React from 'react'
import { Fragment } from 'react'
import './Component.scss'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../Utils/Routes'
import { Box } from '@mui/system'
import { SearchInput } from '../SearchInput'

interface PokedexToolbarProps {
    onChange: (_n) => void
}

const PokedexToolbar: React.FC<PokedexToolbarProps> = ({ onChange }) => {
    const navigate = useNavigate()

    const goHome = (): void => navigate(PATHS.HOME)
    const goFavorites = (): void => navigate(PATHS.FAVORITES)
    return (
        <Fragment>
            <AppBar color="transparent" elevation={0} position="fixed" sx={{ backgroundColor: 'background.paper' }}>
                <Toolbar disableGutters>
                    <Container>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item xs={3}>
                                <Grid
                                    container
                                    alignItems="center"
                                    sx={{
                                        cursor: 'pointer',
                                    }}
                                    onClick={goHome}
                                >
                                    <Grid item sx={{ mr: 1 }}>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                backgroundColor: '#DFDFDF',
                                                width: 40,
                                                height: 40,
                                                fontSize: '10px',
                                            }}
                                        >
                                            <CatchingPokemon sx={{ color: '#FB1B1B' }} />
                                        </Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontSize: '16px',
                                                lineHeight: '24px',
                                                fontWeight: 400,
                                                color: '#000',
                                            }}
                                        >
                                            {'Pokedex CI&T'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Box sx={{ width: '100%' }}>
                                    <SearchInput onChange={onChange} />
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    sx={{
                                        px: 0,
                                        py: 0,
                                        width: 50,
                                        height: 24,
                                    }}
                                    onClick={goFavorites}
                                    endIcon={<Favorite sx={{ fontSize: 24, color: 'red' }} />}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontSize: '16px',
                                            lineHeight: '24px',
                                            fontWeight: 400,
                                            color: '#000',
                                        }}
                                    >
                                        {'Favorites'}
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </Fragment>
    )
}

export default PokedexToolbar
