import React, { useEffect } from 'react';
import { getTypes } from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import CardTypes from './CardTypes.js';

export default function Tipos(){
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);
    
    useEffect(()=> {
        dispatch(getTypes());
    },[dispatch])

    return (
        <div>
            {types && types.map((t)=> <CardTypes number={t.id} name={t.name}/>)}
        </div>
    )
}