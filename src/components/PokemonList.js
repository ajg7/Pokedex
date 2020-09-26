import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchPokemonList } from "../store/actions"
import Pokemon from "./Pokemon";
import "../css/styles.css";


const PokemonList = props => {
    const { pokemon, fetchPokemonList } = props;
    const [currentList, setCurrentList] = useState("https://pokeapi.co/api/v2/pokemon/?limit=151");
    
    useEffect(() => {
        fetchPokemonList(currentList);
    }, [currentList, fetchPokemonList])


    return(
        <>
            {pokemon.map(individualPokemon => {
                return <Pokemon name={individualPokemon.name} url={individualPokemon.url} />
            })} 
        </>
    )
}

const mapStateToProps = state => {
    return {
        pokemon: state.pokemon,
    }
}




export default connect(mapStateToProps, { fetchPokemonList })(PokemonList);