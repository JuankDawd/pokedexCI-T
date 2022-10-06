import { api } from '../../API'

class PokedexControllerApi {
    path = 'pokemon'
    async getPokemons(limit: number, offset: number) {
        try {
            const response = await api.get(`${this.path}?limit=${limit}&offset=${offset}`)

            return response
        } catch (err) {
            return err.response
        }
    }

    async getPokemon(name: string) {
        try {
            const response = await api.get(`${this.path}/${name}`)
            return response
        } catch (err) {
            return err.response
        }
    }

    getPokemonImage(index: number) {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
    }

    async getAbilityDescription(ability: any) {
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