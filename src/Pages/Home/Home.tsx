import React, { useCallback, useRef } from 'react'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { PokedexToolbar } from '../../Components/PokedexToolbar'
import { PokemonFiltered } from '../../Components/PokemonFiltered'
import PokemonGrid from '../../Components/PokemonGrid/Component'
import usePokemonSearch from '../../Utils/hooks/usePokemonSearch'
import { PokemonInterface } from '../../Utils/interfaces/pokemon.interface'
import { getPokemons } from '../../Utils/services/pokemonSlice'

const Home: React.FC = () => {
    const [offset, setOffset] = React.useState(0)
    const { pokemons, loading, hasMore } = usePokemonSearch({ offset })
    const [pokemonsFiltered, setPokemonsFiltered] = React.useState<PokemonInterface[]>([])
    const [search, setSearch] = React.useState('')

    const pokemonList = useSelector(getPokemons)

    const observer = useRef<IntersectionObserver>()

    const lastPokemonElementRef = useCallback(
        (node) => {
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
            {/* Pokedex  */}
            {search === '' ? (
                <PokemonGrid pokemons={pokemons} favoritePage={false} lastPokemonElementRef={lastPokemonElementRef} />
            ) : (
                <PokemonFiltered pokemons={pokemonsFiltered} />
            )}
        </Fragment>
    )
}

export default Home
