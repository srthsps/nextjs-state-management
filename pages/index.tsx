import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useMemo } from "react";

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

export default function Home({ pokemon }: { pokemon: Pokemon[] }) {
  const [filter, setFilter] = useState("");

  const filteredPokemon = useMemo(()=>{
    let result = pokemon.filter(item=>item.title.toLowerCase().includes(filter.toLowerCase()))
    return result
  },[pokemon,filter])

  return (
    <div className={styles.main}>
      <Head>
        <title>Pokemon</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.search}
        />
      </div>
      <div className={styles.container}>
      {filteredPokemon.slice(0, 20).map((p) => (
        <div key={p.id} className={styles.image}>
          <img
            alt={p.title}
            src={p.image}
          />
          <h2>{p.title}</h2>
        </div>
      ))}
      </div>
    </div>
  );
}
