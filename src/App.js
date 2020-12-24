import React from "react";
import { Route } from "react-router-dom";
import "./styles/css/reset.css";
import "./styles/css/global.css";
import { LandingPage, Signup, Login, PokemonList, OnDeck, BattlePage, MainMenu } from "./components/pages";


const App = () => {

  return (
    <>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/main_menu" component={MainMenu} />
      {/*Pokemon List is a private route, fix later*/}
      <Route exact path="/pokemon_list" component={PokemonList} />
      <Route exact path="/on_deck" component={OnDeck} />
      <Route exact path="/battle" component={BattlePage} />
    </>
  );
}

export default App;
