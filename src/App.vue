
<template>
  <h1>Pokedex - Updated</h1>
  <p>Filter Text : {{ filterText }}</p>
  <input type="text" v-model="filterText" />
  <ul>
    <PokedexCard
      v-for="(pokemon, index) in pokemonStore.filteredList"
      :key="`poke-${index}`"
      :number="pokemon.id"
      :name="pokemon.name"
    />
  </ul>
  <button v-if="paginationStore.start" @click="turnPrevPage">Previous Page</button>
  <button @click="turnNextPage">Next Page</button>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue';
import PokedexCard from './components/PokedexCard.vue';

const filterText = ref('');

const paginationStore = reactive({
  start: 0,
  end: computed(() => paginationStore.start + 10),
})

const turnNextPage = () => {
  paginationStore.start += 10;
  getPokedexEntries();
}

const turnPrevPage = () => {
  paginationStore.start -= 10;
  getPokedexEntries();
}

const pokemonStore = reactive({
  list: [],
  filteredList: computed(() =>
    pokemonStore.list.filter(pokemon =>
      pokemon.name.includes(filterText.value)))
  })

const getPokedexEntries = async () => {
  const pokeData = await fetch('/.netlify/functions/pokedex', {
    method: 'POST',
    body: JSON.stringify({
      start: paginationStore.start,
      end: paginationStore.end
    })
  }).then(response => response.json());

  pokemonStore.list = pokeData;
}

onMounted(() => {
  getPokedexEntries();
})
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
