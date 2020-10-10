import axios from "axios";

export const FETCH_POKEMON_LIST = "FETCH_POKEMON_LIST";
export const FETCH_POKEMON_LIST_SUCCESS = "FETCH_POKEMON_SUCCESS_LIST";
export const FETCH_POKEMON_LIST_ERROR = "FETCH_POKEMON_ERROR_LIST";
export const MAKE_POKEMON_TEAM = "MAKE_POKEMON_TEAM";

export const fetchPokemonList = url => {
    return dispatch => {
        dispatch({ type: FETCH_POKEMON_LIST }) 
        axios.get(url)
            .then(response => {
                const data = response.data;
                dispatch({ type: FETCH_POKEMON_LIST_SUCCESS, payload: data })
            })
            .catch(error => {
                dispatch({ type: FETCH_POKEMON_LIST_ERROR, payload: { message: "You blacked out!" }})
            })
    }
}

export const pokemonTeamMaker = (pokemon, pokemonDataObject) => {
    return dispatch => {
        dispatch({ type: MAKE_POKEMON_TEAM, payload: {name: pokemon, data: pokemonDataObject }})
        // axios.get("")
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }
}
