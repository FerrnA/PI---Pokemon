import React from "react";
import { useDispatch } from "react-redux";
import { switchTypeStyle } from "../../../components/utils/colours/functions";
import { getPokemons } from "../../../redux/actions";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";

function Filters({
  types,
  handleFilterByCreated,
  handleFilterByType,
  handleFilterBySort,
  handleCheckButton,
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
        <span>
          <button
            type="radio"
            value="Pokemones creados"
            className="filters--created-optionBtn"
            onClick={(e) => handleFilterByCreated(e)}
          >
            Pokemones creados
          </button>
          <button
            type="radio"
            value="Sin pokemones creados"
            className="filters--created-optionBtn"
            onClick={(e) => handleFilterByCreated(e)}
          >
            Sin pokemones creados
          </button>
        </span>
      </div>
      <div className="filters--types">
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <label style={{ display: "inline" }}>&emsp;Search by Pokemon types&ensp;</label>
          <select
            name="selectDetipos"
            ref={selectTypes}
            defaultValue=""
            onChange={(e) => handleFilterByType(e)}
          >
            Tipos de pokemon
            <option></option>
            {types.length &&
              types.map((t) => (
                <option key={uuidv4()} value={t.name}>
                  {t.name}
                </option>
              ))}
          </select>
        </div>
        <ul className="filters--types-selected">
          {checkedTypes.length > 0 &&
            checkedTypes.map((t) => (
              <p key={uuidv4()} className={switchTypeStyle(t)}>
                <button
                  type="button"
                  className="filters--types-selected-checkBtn"
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
          className="filters--refresh"
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
