import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { pokemon, teams } from "../../store/actions";
import types from "../../utils/types";
import { Arena } from "../common";

const BattlePage = props => {
	const params = useParams();
	const { currentTeam, fetchCurrentTeam, challengerTeam, makeChallengerTeam, teamName } = props;
	const [selectedPokemon, setSelectedPokemon] = useState({});
	const [challengerPokemon, setChallengerPokemon] = useState({});
	const [outcome, setOutcome] = useState("");
	const [disabled, setDisabled] = useState(false);
	const [active, setActive] = useState(true);

	const battle = async event => {
		const type1 = event.target.getAttribute("type1");
		const type2 = event.target.getAttribute("type2");
		const img = event.target.getAttribute("img");
		const name = event.target.getAttribute("name");

		const playerType1 = types.get(type1) === undefined ? [] : types.get(type1);
		const playerType2 = types.get(type2) === undefined ? [] : types.get(type2);

		const challenger = challengerTeam[Math.round(Math.random() * (challengerTeam.length - 1))];
		const challengerType1 =
			types.get(challenger.type1) === undefined ? [] : types.get(challenger.type1);
		const challengerType2 =
			types.get(challenger.type2) === undefined ? [] : types.get(challenger.type2);

		setSelectedPokemon({ playerType1, playerType2, img, name });
		setChallengerPokemon({ name: challenger.name, img: challenger.imgURL });

		const eval1 = playerType1.filter(
			type => type === challenger.type1 || type === challenger.type2
		);
		const eval2 = playerType2.filter(
			type => type === challenger.type1 || type === challenger.type2
		);
		const eval3 = challengerType1.filter(type => type === type1 || type === type2);
		const eval4 = challengerType2.filter(type => type === type1 || type === type2);

		const totalPlayerPoints = eval1.length + eval2.length;
		const totalChallengerPoints = eval3.length + eval4.length;

		if (totalChallengerPoints > totalPlayerPoints) {
			setOutcome("Challenger Wins!");
			const result = currentTeam.filter(pokemon => pokemon.name === name);
			const index = currentTeam.indexOf(result[0]);
			if (index > -1) currentTeam.splice(index, 1);
		}
		if (totalPlayerPoints > totalChallengerPoints) {
			setOutcome("Player Wins!");
			const result = challengerTeam.filter(
				pokemon => pokemon.name === challengerPokemon.name
			);
			const index = challengerTeam.indexOf(result[0]);
			if (index > -1) challengerTeam.splice(index, 1);
		}
		if (totalPlayerPoints === totalChallengerPoints) {
			let coinFlip = Math.round(Math.random() * 25) % 2;
			if (coinFlip === 1) {
				setOutcome("Player Wins by Coin Flip!");
				const result = challengerTeam.filter(
					pokemon => pokemon.name === challengerPokemon.name
				);
				const index = challengerTeam.indexOf(result[0]);
				if (index > -1) challengerTeam.splice(index, 1);
			} else {
				setOutcome("Challenger Wins by Coin Flip!");
				const result = currentTeam.filter(pokemon => pokemon.name === name);
				const index = currentTeam.indexOf(result[0]);
				if (index > -1) currentTeam.splice(index, 1);
			}
		}

		if (outcome === "Player Wins!" || outcome === "Player Wins by Coin Flip!") {
			const result = challengerTeam.filter(
				pokemon => pokemon.name === challengerPokemon.name
			);
			const index = challengerTeam.indexOf(result[0]);
			if (index > -1) challengerTeam.splice(index, 1);
		}
		if (outcome === "Challenger Wins!" || outcome === "Challenger Wins by Coin Flip!") {
			const result = currentTeam.filter(pokemon => pokemon.name === name);
			const index = currentTeam.indexOf(result[0]);
			if (index > -1) currentTeam.splice(index, 1);
		}

		if (challengerTeam < 1) {
			setDisabled(true);
			setOutcome("Player Has Won Battle!");
			setActive(false);
		} else if (currentTeam < 1) {
			setOutcome("Challenger Has Won Battle!");
			setActive(false);
		}
	};

	const battleReset = () => {
		makeChallengerTeam();
		fetchCurrentTeam(params.teamId);
		setDisabled(false);
		setSelectedPokemon({});
		setChallengerPokemon({});
		setOutcome("");
	};

	useEffect(() => {
		fetchCurrentTeam(params.teamId);
	}, [fetchCurrentTeam]);

	return (
		<div>
			<header>
				<h3>{teamName}</h3>
				{currentTeam.map(pokemon => [
					<div key={pokemon.pokemon_Id}>
						<h3>{pokemon.nickname ? pokemon.nickname : pokemon.name}</h3>
						<img src={pokemon.imgURL} alt={pokemon.name} />
						<button
							onClick={battle}
							type1={pokemon.type1}
							type2={pokemon.type2}
							img={pokemon.imgURL}
							name={pokemon.name}
							disabled={disabled}
						>{`I Choose You, ${
							pokemon.nickname ? pokemon.nickname : pokemon.name
						}!`}</button>
					</div>,
				])}
			</header>
			<section>
				<Arena
					selectedPokemon={selectedPokemon}
					challengerPokemon={challengerPokemon}
					outcome={outcome}
				/>
			</section>
			<footer>
				<h3>Challengers</h3>
				{challengerTeam.map(pokemon => {
					return (
						<div key={pokemon.pokemon_Id}>
							<h3>{pokemon.name}</h3>
							<img src={pokemon.imgURL} alt={pokemon.name} />
						</div>
					);
				})}
				<button onClick={battleReset} disabled={active}>
					Battle Again?
				</button>
			</footer>
		</div>
	);
};

BattlePage.propTypes = {
	currentTeam: PropTypes.array,
	challengerTeam: PropTypes.array,
	fetchCurrentTeam: PropTypes.func,
	makeChallengerTeam: PropTypes.func,
	teamName: PropTypes.string,
};

export default connect(
	state => ({
		currentTeam: state.teams.currentTeam,
		challengerTeam: state.pokemon.challengerTeam,
		teamName: state.teams.teamName,
	}),
	{
		fetchCurrentTeam: teams.fetchCurrentTeam,
		makeChallengerTeam: pokemon.makeChallengerTeam,
	}
)(BattlePage);
