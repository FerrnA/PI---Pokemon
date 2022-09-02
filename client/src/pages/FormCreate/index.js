import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchTypeStyle } from "../../components/utils/colours/functions";
import { getTypes, createPokemon } from "../../redux/actions/index";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";

let initialStatus = {
  name: "",
  fuerza: "",
  defensa: "",
  vida: "",
  velocidad: "",
  altura: "",
  peso: "",
  tipos: [],
  imgurl: "",
};

export default function FormCreate() {
  const [status, setStatus] = useState(initialStatus);
  const dispatch = useDispatch();
  let types = useSelector((state) => state.types);

  const inputTipos = useRef();

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handleChange(e) {
    let value = e.target.value;
    const name = e.target.name;
    if (name !== "name" && name !== "tipos" && name !== "imgurl")
      value = value.replace(/[a-zA-Z]+/, "");
    if (name === "tipos") {
      if (!status.tipos.includes(value)) {
        setStatus({
          ...status,
          tipos: [...status.tipos, value],
        });
      }
    } else
      setStatus({
        ...status,
        [name]: value,
      });
  }

  function clean(objstatus) {
    let cleanobj = {};
    for (var prop in objstatus) {
      if (objstatus[prop] !== "") {
        cleanobj[prop] = objstatus[prop];
      }
    }
    return cleanobj;
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (status.name.length !== 0) {
      //let o = Object.fromEntries(Object.entries(status).filter(([_, v]) => v != ''));
      let cleaned = clean(status);
      dispatch(createPokemon(cleaned));
      setStatus(initialStatus);
      inputTipos.current.value = ""; ///limpiar input tipo/s
      alert("Pokemon creado!");
    } else alert("Es necesario un nombre!");
  }

  function handleButtonClick(el, t) {
    el.preventDefault();
    setStatus({
      ...status,
      tipos: [...status.tipos.filter((e) => e !== t)],
    });
    if (status.tipos.length === 1) inputTipos.current.value = ""; // setState es asincrono?, entonces funciona con === 1 y no con 0
  }

  return (
    <div className="formCreate">
      <form style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <div>
          <div className="input-container">
            <input
              type="text"
              required
              name="name"
              value={status.name}
              onChange={(e) => handleChange(e)}
            />
            <label>Nombre</label>
          </div>
          <div className="input-container">
            <input
              type="text"
              required
              name="fuerza"
              value={status.fuerza}
              onChange={(e) => handleChange(e)}
            />
            <label>Fuerza</label>
          </div>
          <div className="input-container">
            <input
              type="text"
              required
              name="defensa"
              value={status.defensa}
              onChange={(e) => handleChange(e)}
            />
            <label>Defensa</label>
          </div>
          <div className="input-container">
            <input
              type="text"
              required
              name="vida"
              value={status.vida}
              onChange={(e) => handleChange(e)}
            />
            <label>Vida</label>
          </div>
          <div className="input-container">
            <input
              type="text"
              required
              name="velocidad"
              value={status.velocidad}
              onChange={(e) => handleChange(e)}
            />
            <label>Velocidad</label>
          </div>
          <div className="input-container">
            <input
              type="text"
              required
              name="altura"
              value={status.altura}
              onChange={(e) => handleChange(e)}
            />
            <label>Altura</label>
          </div>
          <div className="input-container">
            <input
              type="text"
              required
              name="peso"
              value={status.peso}
              onChange={(e) => handleChange(e)}
            />
            <label>Peso</label>
          </div>
        </div>
        <div
          style={{
            maxWidth: "70%",
          }}
        >
          <div className="input-container">
            <input
              type="text"
              required
              name="imgurl"
              value={status.imgurl}
              onChange={(e) => handleChange(e)}
            />
            <label>Imagen</label>
          </div>
          <div>
            <label style={{ color: "white" }}>Tipo/s</label>
            <select
              className="custom-select"
              name="tipos"
              defaultValue=""
              ref={inputTipos}
              onChange={(e) => handleChange(e)}
            >
              <option></option>
              {types.length &&
                types.map((t) => (
                  <option key={uuidv4()} value={t.name}>
                    {t.name}
                  </option>
                ))}
            </select>
            <ul className="typesselected">
              {status.tipos.length > 0 &&
                status.tipos.map((t) => (
                  <p key={uuidv4()}>
                    <button
                      type="button"
                      className="botontipos"
                      onClick={(e) => handleButtonClick(e, t)}
                    ></button>
                    {t}
                  </p>
                ))}
            </ul>
          </div>
          <button type="submit" className="formCreate--submitBtn" onClick={(e) => handleSubmit(e)}>
            Crear
          </button>
          <div className="formCreate--pokemon">
            {status.tipos && (
              <div className="formCreate--pokemon-types">
                {status.tipos.map((p) => (
                  <span key={uuidv4()} className={switchTypeStyle(p) + " type"}>
                    {p}
                  </span>
                ))}
              </div>
            )}
            {status.imgurl && <img src={status.imgurl} alt="" width={200} />}
          </div>
        </div>
      </form>
    </div>
  );
}
