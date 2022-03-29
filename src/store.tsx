import { useState, useMemo, createContext, useContext } from "react";


interface Pokemon {
    id: number;
    title: string;
    image: string;
}

export async function getServerSideProps() {
    const resp = await fetch(
        "https://ghibliapi.herokuapp.com/films"
    );
    return {
        props: {
            pokemon: await resp.json(),
        },
    };
}

export const usePokemonController = (pokemon: Pokemon[]) => {
    const [filter, setFilter] = useState("");
    const filteredPokemon = useMemo(() => {
        let result = pokemon.filter(item => item.title.toLowerCase().includes(filter.toLowerCase()))
        return result
    }, [pokemon, filter])
    return {
        filter,
        setFilter, pokemon: filteredPokemon
    }
}

const pokemonContext = createContext<ReturnType<typeof usePokemonController>>({
    filter:"",
    setFilter: () => {},
    pokemon: []
})

export const PokemonProvider = ({pokemon,children}) => (
    <pokemonContext.Provider value={usePokemonController(pokemon)}>
        {children}
    </pokemonContext.Provider>
)

export const usePokemon = () => useContext(pokemonContext)