import { FunctionComponent } from 'react'
import { Favorites } from '../Pages/Favorites'
import { Home } from '../Pages/Home'
import { Pokemon } from '../Pages/Pokemon'

export const PATHS = {
    HOME: '/',
    DETAILED: 'pokemon/:name',
    FAVORITES: '/favorites',
}

interface RouteType {
    title: string
    path: string
    component: FunctionComponent
}

export const ROUTES: RouteType[] = [
    {
        title: 'Home',
        path: PATHS.HOME,
        component: Home,
    },
    {
        title: 'Detailed Pokemon',
        path: PATHS.DETAILED,
        component: Pokemon,
    },
    {
        title: 'Favorites',
        path: PATHS.FAVORITES,
        component: Favorites,
    },
]
