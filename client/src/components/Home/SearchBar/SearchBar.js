import React, { useState } from "react";
import { getPokemonName } from "../../../redux/actions/index";
import { useDispatch } from "react-redux";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [status, setStatus] = useState({ search: "" });
  function handleChange(e) {
    setStatus({ search: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getPokemonName(status.search));
    setStatus({ search: "" });
  }
  return (
    <div>
      <input
        type="text"
        name="search"
        value={status.search}
        onChange={(e) => handleChange(e)}
        placeholder="Pokemon name.."
      ></input>
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        BUSCAR
      </button>
    </div>
  );
}
