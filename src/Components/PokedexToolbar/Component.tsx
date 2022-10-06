import { AppBar, Avatar, Button, Container, Grid, IconButton, SwipeableDrawer, Toolbar, Typography } from '@mui/material'
import { Favorite, CatchingPokemon } from '@mui/icons-material'
import React from 'react'
import { Fragment } from 'react'
import './Component.scss'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../Utils/Routes'

const PokedexToolbar: React.FC = () => {
    const navigate = useNavigate()

    const goHome = () => navigate(PATHS.HOME)
    const goFavorites = () => navigate(PATHS.FAVORITES)
    return (
        <Fragment>
            <AppBar color="transparent" elevation={0} position="fixed" sx={{ backgroundColor: 'background.paper' }}>
                <Toolbar disableGutters>
                    <Container>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item>
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
                            <Grid item>
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
