import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Thumbnail from "./components/Thumbnail";

function App() {
const [allPokemons, setAllPokemons] = useState([]);
const [loadPoke, setLoadPoke] = useState(
	"https://pokeapi.co/api/v2/pokemon?limit=25&offset=0"
);
// const [currentPage, setCurrentPage] = useState(1);

const getAllPokemons = async () => {
	const res = await fetch(loadPoke);
	const data = await res.json();
	setLoadPoke(data.next);

	function createPokemonObject(result) {
	result.forEach(async (pokemon) => {
		const res = await fetch(
		`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
		);
    console.log(pokemon.name);
		const data = await res.json();
		setAllPokemons((currentList) => [...currentList, data]);
	});
	}
	createPokemonObject(data.results);
};
useEffect(() => {
	getAllPokemons();
}, []);

return (
	<div className="pokemon-container">
		<div className="all-container">
		{allPokemons.map((pokemon) => (
			<Thumbnail
        name={pokemon.name}
        image={pokemon.sprites.other.dream_world.front_default}
        key={pokemon.index}
        types={pokemon.types}
        weight={pokemon.weight}
        stats={pokemon.stats}
			/>
		))}
		</div>
	</div>
);
}

export default App;

