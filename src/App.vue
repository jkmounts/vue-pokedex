
<template>
  <h1>Pokedex</h1>
  <p>Filter Text : {{ filterText }}</p>
  <input type="text" v-model="filterText" />
  <ul>
    <li
      v-for="(pokemon, index) in pokemonStore.filteredList"
      :key="`poke-${index}`"
    >#{{ pokemon.entry_number }} - {{ pokemon.pokemon_species.name }}</li>
  </ul>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue';

const pokemonList = ref([]);
const filterText = ref('');

const pokemonStore = reactive({
  list: [],
  filteredList: computed(() => {
  return pokemonStore.list.filter(pokemon => {
    return pokemon.pokemon_species.name.includes(filterText.value);
  })
})
})

onMounted(async () => {
  const pokeData = await fetch('https://pokeapi.co/api/v2/pokedex/2/')
    .then(response => response.json());

  pokemonStore.list = pokeData.pokemon_entries;
})


// export default {
//   data() {
//     return {
//       pokemonList: [],
//     }
//   },
//   async mounted () {
//     const pokeData = await fetch('https://pokeapi.co/api/v2/pokedex/2/')
//     .then(response => response.json());
//     console.log({ pokeData });

//     this.pokemonList = pokeData.pokemon_entries
//   },
// }
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
