import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Thumbnail from "./components/Thumbnail";
import Pagination from 'react-bootstrap/Pagination';

function App() {
	const [allPokemons, setAllPokemons] = useState([]);
	const [previousPoke, setPreviousPoke] = useState(
		"https://pokeapi.co/api/v2/pokemon?limit=25&offset=0"
	);
	const [nextPoke, setNextPoke] = useState(
		"https://pokeapi.co/api/v2/pokemon?limit=25&offset=0"
	);
	const [pageLimit, setPageLimit] = useState(10);
  	const [currentPage, setCurrentPage] = useState(1);
	const [uniqueIds, setUniqueIds] = useState([]);

	// Load the next 25 pokemon, confirm no duplicates and sort by id. Set next API endpoints for either direction for pagination
	const getNextPokemons = async () => {
		const res = await fetch(nextPoke);
		const data = await res.json();
		setNextPoke(data.next);
		setPreviousPoke(data.previous);
		setPageLimit(pageLimit => Math.ceil(data.count / 25));

		function createPokemonObject(result) {
			result.forEach(async (pokemon) => {
				const res = await fetch(
				`${pokemon.url}`
				);
				const data = await res.json();
				if (!uniqueIds.includes(data.id)) {
					setAllPokemons((currentList) => [...currentList, data]);
					uniqueIds.push(data.id);
				}
			});
		}
		createPokemonObject(data.results);
		allPokemons.sort((a, b) => a.id - b.id);
	};

	// Load the previous 25 pokemon, confirm no duplicates and sort by id. Set next API endpoints for either direction for pagination
	const getPreviousPokemons = async () => {
		const res = await fetch(previousPoke);
		const data = await res.json();
		setPageLimit(pageLimit => Math.ceil(data.count / 25));
		setNextPoke(data.next);
		setPreviousPoke(data.previous);

		function createPokemonObject(result) {
			result.forEach(async (pokemon) => {
				const res = await fetch(
				`${pokemon.url}`
				);
				const data = await res.json();
				if (!uniqueIds.includes(data.id)) {
					setAllPokemons((currentList) => [...currentList, data]);
					uniqueIds.push(data.id);
				}
			});
		}
		createPokemonObject(data.results);
		allPokemons.sort((a, b) => a.id - b.id);
	};

	// Clear pokemon array, call function to load pokemon, update current page, and clear unique ids array
	const prevClick = () => {
		setAllPokemons(allPokemons => []);
		getPreviousPokemons();
		setCurrentPage(currentPage => currentPage - 1);
		setUniqueIds(uniqueIds => []);
	}

	// Clear pokemon array, call function to load pokemon, update current page, and clear unique ids array
	const nextClick = () => {
		setAllPokemons(allPokemons => []);
		getNextPokemons();
		setCurrentPage(currentPage => currentPage + 1);
		setUniqueIds(uniqueIds => []);
	}

	useEffect(() => {
		setAllPokemons(allPokemons => []);
		getNextPokemons();
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
		<Pagination>
			<Pagination.Prev disabled={currentPage === 1} onClick={prevClick}/>
			<Pagination.Item active>{currentPage}</Pagination.Item>
			<Pagination.Next disabled={currentPage === pageLimit} onClick={nextClick}/>
		</Pagination>
	</div>
);
}

export default App;

