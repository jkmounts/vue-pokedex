const fetch = require('node-fetch')

exports.handler = async function(event, context) {
  const pokeApiData = await fetch('https://pokeapi.co/api/v2/pokedex/2/').then(
    response => response.json()
  );

  const { start, end } = JSON.parse(event.body)

  let finalResults = [];

  const pokeData = pokeApiData.pokemon_entries ? pokeApiData.pokemon_entries.map(pokemon => {
    const displayName = pokemon.pokemon_species.name[0].toUpperCase() + pokemon.pokemon_species.name.substring(1);

    return {
      id: pokemon.entry_number,
      name: displayName,
    }
  }) : []

  finalResults = pokeData.slice(start, end);

  return {
    statusCode: 200,
    body: JSON.stringify(finalResults)
  }
}
