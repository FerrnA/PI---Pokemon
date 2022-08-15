import React from "react";

export default function Paginate({ numberOfPokemons, setCurrentPage, currentPage }) {
  // This will create an array of sekunted numbers starting from 1 to render the pages numbers necesary to show the total of pokemons for the current filter/search/initialHomePage taking into account 12 pokemons per page(9 for the first as is the 3 evolutions of the 3 main pokemons of Pókemon)
  let numberOfPages = [];
  if (numberOfPokemons !== 0) {
    for (let i = 0; i < Math.ceil((numberOfPokemons + 3) / 12); i++) {
      numberOfPages.push(i + 1);
    }
  }

  return (
    <div>
      {numberOfPages &&
        numberOfPages.map((n, i) => (
          <button
            key={i + "paginate"}
            type="button"
            style={currentPage === n ? { fontSize: "12px" } : { fontWeight: "300" }}
            onClick={() => setCurrentPage(n)}
          >
            {n}
          </button>
        ))}
    </div>
  );
}
