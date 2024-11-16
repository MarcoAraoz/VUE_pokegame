<template>
    <section>
        <img 
        :src="pokemonImage"
        class="brightness-0 h-[200px]"
        alt="DreamWorld"
         >
    </section>
</template>

<script setup lang="ts">

interface props {
    pokemonId: number;
}

const { pokemonId } = defineProps<props>();

const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;


</script>

<style scoped>
    /* props para no permitir la visualización de la img */
    img {
        user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-drag: none;
        -webkit-user-select: none;
    } 
</style>