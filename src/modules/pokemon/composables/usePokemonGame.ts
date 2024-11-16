import { computed, onMounted, ref } from 'vue';
import { GameStatus } from '../interfaces/game-status.enum';
import { pokemonApi } from '../api/pokemonApi';
import type { PokemonListResponse } from '../interfaces/pokemon-list.response';
import type { Pokemon } from '../interfaces/pokemon-interface';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonsOptions = ref<Pokemon[]>([]);

  const isLoading = computed(() => pokemons.value.length === 0);
  const randomPokemon = computed(() => {
    const randomIndex = Math.floor(Math.random() * pokemonsOptions.value.length);
    return pokemonsOptions.value[randomIndex];
  });

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');
    console.log(response.data.results);
    const pokemonsArray = response.data.results.map(pokemon => {
      const urlParts = pokemon.url.split('/');
      const id = urlParts.at(-2) ?? 0;

      return {
        id: +id,
        name: pokemon.name,
        url: pokemon.url,
      };
    });

    return pokemonsArray.sort(() => Math.random() - 0.5);
  };

  const getNextOptions = (howMany = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonsOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);
  };

  onMounted(async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    pokemons.value = await getPokemons();
    getNextOptions();

    // console.log({ pokemons });
    console.log(pokemonsOptions.value);
  });

  return {
    gameStatus,
    isLoading,
    pokemonsOptions,
    randomPokemon,

    //methods
    getNextOptions,
  };
};
