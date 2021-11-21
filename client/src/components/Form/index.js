import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getTypes, createPokemon } from '../../actions/index';
import f from './index.module.css';

let statuscero = {
    name: '',
    fuerza: '',
    defensa: '',
    vida: '',
    velocidad: '',
    altura: '',
    peso: '',
    tipos: [],
    imgurl: ''
};

export default function Form(){
  const [status, setStatus] = useState(statuscero);
  const dispatch = useDispatch();
  let types = useSelector((state) => state.types);

  useEffect(()=> {
    dispatch(getTypes());
  },[dispatch])

  function handleChange(e) {
    let value = e.target.value;
    const named = e.target.name;
    if(named !== 'name' && named !== 'tipos') value = value.replace(/[a-zA-Z]+/,'');
    if(named === 'tipos'){
      if(!status.tipos.includes(value)){
        setStatus({
          ...status,
          tipos: [...status.tipos, value]
        })
      }
    }
    else setStatus({
      ...status,
      [named]: value
    });
  }
  
  function clean(objstatus) {
    let cleanobj = {};
    for (var prop in objstatus) {
      if (objstatus[prop] !== '') {
        cleanobj[prop] = objstatus[prop];
      }
    }
    return cleanobj
  }
  function handleSubmit(e) {
      e.preventDefault();
      if(status.name.length !== 0){
        //let o = Object.fromEntries(Object.entries(status).filter(([_, v]) => v != ''));
        let cleaned = clean(status);
        dispatch(createPokemon(cleaned));
        setStatus(statuscero);
        alert('Pokemon creado!');
      }
      else alert('Es necesario un nombre!')
  }
  
  function handleButtonClick(el, t) {
    el.preventDefault();
    setStatus({
      ...status,
      tipos: [...(status.tipos.filter(e => e !== t))]
    });
  }
  
  return (
    <div className={f.divform}>
      <form style={{display: 'flex', flexDirection: 'column', width: '200px'}}>
        <div>
          <label>&emsp;Nombre</label>
          <input type='text' name='name' value={status.name} onChange={(e) => handleChange(e)}/>
        </div>
        <div>
          <label>&emsp;Fuerza</label>
          <input type='text' name='fuerza' value={status.fuerza} onChange={(e) => handleChange(e)}/>
        </div>
        <div>
          <label>&emsp;Defensa</label>
          <input type='text' name='defensa' value={status.defensa} onChange={(e) => handleChange(e)}/>
        </div>
        <div>
          <label>&emsp;Vida</label>
          <input type='text' name='vida' value={status.vida} onChange={(e) => handleChange(e)}/>
        </div>
        <div>
          <label>&emsp;Velocidad</label>
          <input type='text' name='velocidad' value={status.velocidad} onChange={(e) => handleChange(e)}/>
        </div>
        <div>
          <label>&emsp;Altura</label>
          <input type='text' name='altura' value={status.altura} onChange={(e) => handleChange(e)}/>
        </div>
        <div>
          <label>&emsp;Peso</label>
          <input type='text' name='peso' value={status.peso} onChange={(e) => handleChange(e)}/>
        </div>
        <div>
          <label>&emsp;Imagen</label>
          <input type='text' name='imgurl' value={status.imgurl} onChange={(e) => handleChange(e)}/>
        </div>

        <label>&emsp;Tipo/s</label>
        <select name='tipos' defaultValue="" onChange={(e) => handleChange(e)}>{/* 
        <option value="default" selected disabled hidden></option> */}
        <option></option>
       { types.length && types.map( t => <option value={t.name}>{t.name}</option> ) }
        </select>
        <ul className={f.typesselected}>
       { status.tipos.length > 0 && status.tipos.map(t => 
          <p key={t}><button type='button' className={f.botontipos} onClick={(e)=> handleButtonClick(e, t)}></button>{t}</p>
       )}
        </ul>

        <button type='submit' onClick={(e) => handleSubmit(e)} >Submit</button>
      </form>
    </div>
    )
}