import { axiosWithAuth } from "../../utils/axiosWithAuth";

export const ADD_POKEMON_TO_A_TEAM = "ADD_POKEMON_TO_A_TEAM";
export const addPokemonToTeam = (pokemonId, teamId) => async dispatch => {
	const { data } = await axiosWithAuth().post(`/team_member/${pokemonId}`, { teamId });
	dispatch({ type: ADD_POKEMON_TO_A_TEAM, payload: data[0] });
};

export const DELETE_POKEMON_FROM_TEAM = "DELETE_POKEMON_FROM_TEAM";
export const deletePokemonFromTeam = (pokemonId, teamId) => async dispatch => {
	const { data } = await axiosWithAuth().delete(
		`team_member/removePokemon/${teamId}/${pokemonId}`
	);
	dispatch({ type: DELETE_POKEMON_FROM_TEAM, payload: data });
};

export const MAKE_NICKNAME = "MAKE_NICKNAME";
export const makeNickname = (nickname, pokemonId) => async () => {
	await axiosWithAuth().put(`/team_member/nickname/${pokemonId}`, nickname);
};

export const GET_POKEMON_IN_SPECIFIC_TEAM = "GET_POKEMON_IN_SPECIFIC_TEAM";
export const getPokemonByTeam = teamId => async dispatch => {
	const { data } = await axiosWithAuth().get(`/team_members/getPokemon/${teamId}`);
	dispatch({ type: GET_POKEMON_IN_SPECIFIC_TEAM, payload: data });
};
