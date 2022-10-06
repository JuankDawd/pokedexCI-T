import React, { Fragment, useState } from 'react'
import { PokedexToolbar } from '../../Components/PokedexToolbar'

import { PokemonInterface } from '../../Utils/interfaces/pokemon.interface'

import { useSelector } from 'react-redux'
import { getPokemons } from '../../Utils/services/pokemonSlice'
import { PokemonDetails } from '../../Components/PokemonDetails'
import { PokemonFiltered } from '../../Components/PokemonFiltered'

const Pokemon: React.FC = () => {
    const [pokemonsFiltered, setPokemonsFiltered] = useState<PokemonInterface[]>([])
    const [search, setSearch] = useState('')

    const pokemonList = useSelector(getPokemons)

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

    return (
        <Fragment>
            {/* PokedexToolbar  */}
            <PokedexToolbar onChange={handleChangeSearch} />

            {/* Content */}
            {search === '' ? <PokemonDetails /> : <PokemonFiltered pokemons={pokemonsFiltered} />}
        </Fragment>
    )
}

export default Pokemon
