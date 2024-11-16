<template>
    <section v-if="isLoading || randomPokemon.id === null" class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="text-3xl">Espere por favor</h1>
        <h3 class="animate-pulse">Cargando Pokemones</h3>
    </section>
    <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="text-3xl m-4">¿Quién es este Pokémon?</h1>
        <h2>{{ randomPokemon }}</h2>
        <!-- Pokemon Reference Image -->
        <PokemonPicture :pokemon-id="randomPokemon.id" />
        <!-- Pokemon Options -->
        <PokemonOptions />
    </section>

</template>

<script setup lang="ts">
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';

const { isLoading, randomPokemon } = usePokemonGame();

</script>
