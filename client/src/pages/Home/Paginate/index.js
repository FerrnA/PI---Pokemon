import React from "react";
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import "./styles.css";

export default function Paginate({ numberOfPokemons, setCurrentPage, currentPage }) {
  // This will create an array of sekunted numbers starting from 1 to render the pages numbers necesary to show the total of pokemons for the current filter/search/initialHomePage taking into account 12 pokemons per page(9 for the first as is the 3 evolutions of the 3 main pokemons of Pókemon)
  let numberOfPages = [];
  if (numberOfPokemons !== 0) {
    for (let i = 0; i < Math.ceil((numberOfPokemons + 3) / 12); i++) {
      numberOfPages.push(i + 1);
    }
  }

  return (
    <div className="paginate">
      <span className="paginate--text">
        {numberOfPokemons <= 9
          ? `1-${numberOfPokemons}`
          : currentPage === 1
          ? `1-9`
          : `${(currentPage - 1) * 12 - 3}-${
              currentPage * 12 - 3 > numberOfPokemons ? numberOfPokemons : `${currentPage * 12 - 3}`
            }`}
        {` of ${numberOfPokemons}`}
      </span>
      <button
        type="button"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1 ? true : false}
        className="paginate--buttons"
      >
        <MdOutlineArrowBackIosNew />
      </button>
      <button
        type="button"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === numberOfPages.at(-1) ? true : false}
        className="paginate--buttons"
      >
        <MdOutlineArrowForwardIos />
      </button>
    </div>
  );
}
