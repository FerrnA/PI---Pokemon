import React from 'react';


export default function CardTypes({ number, name }){


    return (
        <div>
            <p>{number}</p>
            <h2>{name}</h2>
        </div>
    )
}