const BASE_URL = "https://pokebuildapi.fr/api/v1";

// Utility function for fetching and shuffling data
const fetchAndShuffle = async (url, limit = null) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Erreur lors du fetch de ${url}`);
    }
    const data = await response.json();
    if (limit) {
        const shuffled = data.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, limit);
    }
    return data;
};

export const fetchPokemons = (limit = null) => {
    return fetchAndShuffle(`${BASE_URL}/pokemon`, limit);
};

export const fetchTypes = (limit = null) => {
    return fetchAndShuffle(`${BASE_URL}/types`, limit);
};

export const fetchPokemonDetails = async (param) => {
    let response;
    if (isNaN(param)) {
        response = await fetch(`${BASE_URL}/pokemon/${param}`);
    } else {
        response = await fetch(`${BASE_URL}/pokemon/${param}`);
    }

    if (!response.ok) {
        throw new Error("Erreur lors du fetch du Pokémon.");
    }
    return response.json();
};

export const fetchPokemonsByGeneration = async (generation) => {
    const response = await fetch(`${BASE_URL}/pokemon/generation/${generation}`);
    if (!response.ok) {
        throw new Error("Erreur lors du fetch des Pokémon de cette génération.");
    }
    return response.json();
};

export const fetchPokemonsByType = async (type) => {
    const response = await fetch(`${BASE_URL}/pokemon/type/${type}`);
    if (!response.ok) {
        throw new Error("Erreur lors du fetch des Pokémon de ce type.");
    }
    return response.json();
};
