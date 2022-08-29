import React from "react";
import { useDispatch } from "react-redux";
import { getPokemons } from "../../../redux/actions";
import "./styles.css";

function Filters({
  types,
  handleFilterByCreated,
  handleFilterByType,
  handleFilterBySort,
  handleCheckButton,
  selectCreated,
  selectTypes,
  selectSort,
  setFilterStatus,
  setCurrentpage,
  checkedTypes,
}) {
  const dispatch = useDispatch();

  return (
    <div name="filters" className="filters">
      <div className="filters--created">
        <label>&emsp;Search by Created&ensp;</label>
        <select
          name="selectDecreados"
          ref={selectCreated}
          defaultValue=""
          onChange={(e) => handleFilterByCreated(e)}
        >
          <option></option>
          <option value="Pokemones creados">Pokemones creados</option>
          <option value="Sin pokemones creados">Sin pokemones creados</option>
        </select>
      </div>
      <div className="filters--byTypes">
        <label>&emsp;Search by Pokemon types&ensp;</label>
        <select
          name="selectDetipos"
          ref={selectTypes}
          defaultValue=""
          onChange={(e) => handleFilterByType(e)}
        >
          Tipos de pokemon
          <option></option>
          {types.length &&
            types.map((t, i) => (
              <option key={i + "byTypes"} value={t.name}>
                {t.name}
              </option>
            ))}
        </select>
        <ul className="filters--byTypes_selected">
          {checkedTypes.length > 0 &&
            checkedTypes.map((t, i) => (
              <p key={i + "byTypes_selected"}>
                <button
                  type="button"
                  className="checkButton"
                  onClick={(e) => handleCheckButton(e, t)}
                ></button>
                {t}
              </p>
            ))}
        </ul>
      </div>
      <div className="filters--sort">
        <label>&emsp;Sort by&ensp;</label>
        <select
          name="selectDeSort"
          ref={selectSort}
          defaultValue=""
          onChange={(e) => handleFilterBySort(e)}
        >
          <option></option>
          <option value="Sort by strength">Fuerza</option>
          <option value="Sort by alphabet">Alfabeticamente</option>
        </select>
        <button
          id="buttonSort"
          type="button"
          onClick={(e) => handleFilterBySort(e, selectSort.current.value)}
        >
          ↑↓
        </button>
        <button
          onClick={() => {
            dispatch(getPokemons());
            setFilterStatus("");
            setCurrentpage(1);
          }}
        >
          Get pokemons
        </button>
      </div>
    </div>
  );
}

export default Filters;
