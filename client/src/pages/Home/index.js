import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes } from "../../redux/actions/index";
import { mergeSort } from "./functions";
import Filters from "./Filters";
import Paginate from "./Paginate";
import Cards from "../../components/Cards";
import "./styles.css";
import { useLocation } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const location = useLocation();
  let types = useSelector((state) => state.types);
  const pokemones = useSelector((state) => state.pokemons);

  const [checkedTypes, setCheckedTypes] = useState([]);

  const selectSort = useRef();
  const selectTypes = useRef();

  useEffect(() => {
    let mounted = true;
    // checking if is mounted because of search too
    if (mounted && !location.state?.onsearch) {
      dispatch(getPokemons());
      dispatch(getTypes());
    }
    return () => (mounted = false);
    //eslint-disable-next-line
  }, [dispatch]);

  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentpage] = useState(1);
  const indiceR = 12 * currentPage;
  const indiceL = indiceR - 12;
  const { pokemonsPaginated, length } = (() => {
    if (filterStatus === "") {
      if (currentPage === 1) {
        return {
          pokemonsPaginated: pokemones.slice(indiceL, indiceR - 3),
          length: pokemones.length,
        };
      }
      return {
        pokemonsPaginated: pokemones.slice(indiceL - 3, indiceR - 3),
        length: pokemones.length,
      };
    }
    if (filterStatus === "Pokemones creados") {
      if (currentPage === 1) {
        let pokemonsPaginated = pokemones.filter((p) => p.id >= 1200);
        return {
          pokemonsPaginated: pokemonsPaginated.slice(indiceL, indiceR - 3),
          length: pokemonsPaginated.length,
        };
      }
      let pokemonsPaginated = pokemones.filter((p) => p.id >= 1200);
      return {
        pokemonsPaginated: pokemonsPaginated.slice(indiceL - 3, indiceR - 3),
        length: pokemonsPaginated.length,
      };
    }
    if (filterStatus === "Sin pokemones creados") {
      if (currentPage === 1) {
        let pokemonsPaginated = pokemones.filter((p) => p.id < 1200);
        return {
          pokemonsPaginated: pokemonsPaginated.slice(indiceL, indiceR - 3),
          length: pokemonsPaginated.length,
        };
      }
      let pokemonsPaginated = pokemones.filter((p) => p.id < 1200);
      return {
        pokemonsPaginated: pokemonsPaginated.slice(indiceL - 3, indiceR - 3),
        length: pokemonsPaginated.length,
      };
    }
    if (filterStatus === "Filtrado por Tipos") {
      if (currentPage === 1) {
        let pokemonsPaginated = pokemones.filter(
          (p) => p.tipos && p.tipos.some((n) => checkedTypes.includes(n)) === true
        );
        return {
          pokemonsPaginated: pokemonsPaginated.slice(indiceL, indiceR - 3),
          length: pokemonsPaginated.length,
        };
      }
      let pokemonsPaginated = pokemones.filter(
        (p) => p.tipos && p.tipos.some((n) => checkedTypes.includes(n)) === true
      );
      return {
        pokemonsPaginated: pokemonsPaginated.slice(indiceL - 3, indiceR - 3),
        length: pokemonsPaginated.length,
      };
    }
    if (filterStatus === "Sort by alphabet") {
      let copiapokemones = pokemones.slice();
      let pokemonesSortedA = mergeSort(copiapokemones, "name");
      if (currentPage === 1) {
        let pokemonsPaginated = pokemonesSortedA.slice(indiceL, indiceR - 3);
        return { pokemonsPaginated, length: pokemones.length };
      }
      let pokemonsPaginated = pokemonesSortedA.slice(indiceL - 3, indiceR - 3);
      return { pokemonsPaginated, length: pokemones.length };
    }
    if (filterStatus === "Sort by alphabet reverse") {
      let copiapokemones = pokemones.slice();
      let pokemonesSortedA = mergeSort(copiapokemones, "name").reverse();
      if (currentPage === 1) {
        let pokemonsPaginated = pokemonesSortedA.slice(indiceL, indiceR - 3);
        return { pokemonsPaginated, length: pokemonesSortedA.length };
      }
      let pokemonsPaginated = pokemonesSortedA.slice(indiceL - 3, indiceR - 3);
      return { pokemonsPaginated, length: pokemonesSortedA.length };
    }
    if (filterStatus === "Sort by strength") {
      let copiapokemones = pokemones.slice();
      let pokemonesSortedF = mergeSort(copiapokemones, "fuerza").reverse();
      if (currentPage === 1) {
        let pokemonsPaginated = pokemonesSortedF.slice(indiceL, indiceR - 3);
        return { pokemonsPaginated, length: pokemonesSortedF.length };
      }
      let pokemonsPaginated = pokemonesSortedF.slice(indiceL - 3, indiceR - 3);
      return { pokemonsPaginated, length: pokemonesSortedF.length };
    }
    if (filterStatus === "Sort by strength desc") {
      let copiapokemones = pokemones.slice();
      let pokemonesSortedF = mergeSort(copiapokemones, "fuerza");
      if (currentPage === 1) {
        let pokemonsPaginated = pokemonesSortedF.slice(indiceL, indiceR - 3);
        return { pokemonsPaginated, length: pokemonesSortedF.length };
      }
      let pokemonsPaginated = pokemonesSortedF.slice(indiceL - 3, indiceR - 3);
      return { pokemonsPaginated, length: pokemonesSortedF.length };
    }
  })();

  // Filtering functions, that handles switch filtering status, types selection for 'by type', paginate update initial page [01] status
  // By created
  function handleFilterByCreated(e) {
    e.preventDefault();
    if (filterStatus !== "Pokemones creados" && filterStatus !== "Sin pokemones creados") {
      selectSort.current.value = ""; // TODO:  juntar con setCurrentpage(1) en una funcion  //
      selectTypes.current.value = ""; //
      setCheckedTypes([]);
      setCurrentpage(1);
    }
    if (e.target.value === "Pokemones creados") {
      setFilterStatus("Pokemones creados");
    }
    if (e.target.value === "Sin pokemones creados") {
      setFilterStatus("Sin pokemones creados");
    }
  }
  // By type
  function handleFilterByType(e) {
    if (e.target.value === "") return;
    if (filterStatus !== "Filtrado por Tipos") {
      setFilterStatus("Filtrado por Tipos");
      selectSort.current.value = ""; // clean states and focus first page
      setCurrentpage(1);
    }
    if (!checkedTypes.includes(e.target.value)) {
      setCheckedTypes([...checkedTypes, e.target.value]);
    }
  }
  // handle remove checkedType (in status filter = bytype)
  function handleCheckButton(e, t) {
    e.preventDefault();
    if (checkedTypes.length === 1 && checkedTypes[0] === t) {
      selectTypes.current.value = ""; // clean select types as there's now no type for filtering 'by type' selected
      setFilterStatus("");
    }
    setCheckedTypes([...checkedTypes.filter((el) => el !== t)]);
    setCurrentpage(1);
  }
  //

  // Sort by strenght and alphabet
  function handleFilterBySort(e, target = e.target.value) {
    e.preventDefault();
    if (!filterStatus.includes("Sort")) {
      selectTypes.current.value = ""; // clean states and focus first page
      setCheckedTypes([]);
      setCurrentpage(1);
    }
    if (target === "Sort by alphabet") {
      if (filterStatus === "Sort by alphabet") {
        setFilterStatus("Sort by alphabet reverse");
      } else if (filterStatus === "Sort by alphabet reverse") {
        setFilterStatus("Sort by alphabet");
      } else setFilterStatus("Sort by alphabet");
    }
    if (target === "Sort by strength") {
      if (filterStatus === "Sort by strength") {
        setFilterStatus("Sort by strength desc");
      } else if (filterStatus === "Sort by strength desc") {
        setFilterStatus("Sort by strength");
      } else setFilterStatus("Sort by strength");
    }
  }
  //

  return (
    <div className="home">
      <Filters
        {...{
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
        }}
      />
      <div className="home--paginateContainer">
        {Object.keys(pokemonsPaginated).length !== 0 && (
          <Paginate
            numberOfPokemons={length}
            setCurrentPage={setCurrentpage}
            currentPage={currentPage}
          />
        )}
      </div>
      <div style={{ flexGrow: "1" }}>
        <Cards
          pokemones={pokemones}
          pokemonsPaginated={pokemonsPaginated}
          filterStatus={filterStatus}
        />
      </div>
    </div>
  );
}
