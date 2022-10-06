import { api } from '../../API'
import { GetAbilityDescription } from '../../interfaces/getAbilityDescription.interface'
import { GetPokemon } from '../../interfaces/getPokemon.interface'
import { GetPokemons } from '../../interfaces/getPokemons.interface'

class PokedexControllerApi {
    path = 'pokemon'
    async getPokemons(limit: number, offset: number): Promise<GetPokemons> {
        try {
            const response = await api.get(`${this.path}?limit=${limit}&offset=${offset}`)

            return response
        } catch (err) {
            return err.response
        }
    }

    async getPokemon(name: string): Promise<GetPokemon> {
        try {
            const response = await api.get(`${this.path}/${name}`)

            return response
        } catch (err) {
            return err.response
        }
    }

    async getAbilityDescription(ability: string): Promise<GetAbilityDescription> {
        try {
            const response = await api.get(`ability/${ability}`)

            return response
        } catch (err) {
            return err.response
        }
    }
}

const PokedexController = new PokedexControllerApi()

export { PokedexController }
