
<template>
  <h1>Pokedex</h1>
  <p>Filter Text : {{ filterText }}</p>
  <input type="text" v-model="filterText" />
  <ul>
    <PokedexCard
      v-for="(pokemon, index) in pokemonStore.filteredList"
      :key="`poke-${index}`"
      :number="pokemon.entry_number"
      :name="pokemon.pokemon_species.name"
    />
  </ul>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue';
import PokedexCard from './components/PokedexCard.vue';

const pokemonList = ref([]);
const filterText = ref('');

const pokemonStore = reactive({
  list: [],
  filteredList: computed(() =>
    pokemonStore.list.filter(pokemon =>
      pokemon.pokemon_species.name.includes(filterText.value)))
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
