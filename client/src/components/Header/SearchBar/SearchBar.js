import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPokemonName } from "../../../redux/actions/index";
import { useDispatch } from "react-redux";

export default function SearchBar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState({ search: "" });
  function handleChange(e) {
    setStatus({ search: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (status.search.length > 0) {
      dispatch(getPokemonName(status.search));
      setStatus({ search: "" });
      if (location.pathname !== "/home") navigate("/home", { state: { onsearch: true } });
    }
  }

  return (
    <div>
      <input
        type="text"
        name="search"
        value={status.search}
        placeholder="Pokemon name.."
        style={{
          borderRadius: "0.4rem 0 0 0.4rem",
          border: "none",
          height: "1.8rem",
          width: "27ch",
        }}
        onChange={(e) => handleChange(e)}
        onKeyDown={(event) => event.key === "Enter" && handleSubmit(event)}
      />
      <button
        type="button"
        style={{
          borderRadius: "0 0.3rem 0.3rem 0",
          border: "none",
          height: "1.8rem",
        }}
        onClick={(e) => handleSubmit(e)}
      >
        🔎 Search
      </button>
    </div>
  );
}
