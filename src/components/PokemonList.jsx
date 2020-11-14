import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchPokemon, removePokemon, setSelectedPokemon } from "../store/actions/actions";
import Pokemon from "./Pokemon";
import DropBar from "./DropBar";
import { StyledCards } from "../StyledComponents/StyledCards";
import { StyledBar } from "../StyledComponents/StyledBar";


const PokemonList = props => {
    const { pokemonData, loading, error, currIndex, fetchPokemon, removePokemon, setSelectedPokemon } = props;

    const dragOver = event => event.preventDefault();

    const drop = event => {
        removePokemon(currIndex);
        setSelectedPokemon({});
    }

    useEffect(() => {
        fetchPokemon()
    }, [fetchPokemon])

    return(
        <>
            <section className="drop-bar">
                <StyledBar>
                    <DropBar />
                </StyledBar>
            </section>
            <section className="pokemon-cards" onDragOver={dragOver} onDrop={drop}>
            {loading ? <h3>Loading...</h3> : null}
            {error ? <h3>{error}</h3> : null}
            <StyledCards>
                {pokemonData.map(pokemon => {
                    return (
                        <Pokemon 
                        key={pokemon.id}
                        id={pokemon.id}
                        name={pokemon.name}
                        number={pokemon.number}
                        type1={pokemon.type1}
                        type2={pokemon.type2}
                        imgURL={pokemon.imgURL}
                        height={pokemon.height}
                        weight={pokemon.weight}
                        entry={pokemon.entry}
                        habitat={pokemon.habitat}
                        legendary={pokemon.legendary}
                        mythical={pokemon.mythical}
                        ancient={pokemon.ancient}
                        />
                    )
                })}
            </StyledCards>
            </section>
        </>
    )
}

const mapStateToProps = state => {
    return {
        pokemonData: state.pokemonData,
        error: state.error, 
        currIndex: state.currIndex
    }
}


export default connect(mapStateToProps, { fetchPokemon, removePokemon, setSelectedPokemon })(PokemonList);