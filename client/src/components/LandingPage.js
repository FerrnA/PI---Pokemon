import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';

const imageEA = {
    borderColor: 'green',
    borderRadius: '5px',
    height: '40rem',
    alignSelf: 'center',
    justifySelf: 'center',
    position: 'relative',
    left: '180px'
};
const ad = {
    backgroundColor: 'rgb(102, 99, 99)',
    height: '100%',
    justifyItems: 'center',
    top: '0'
}
const bt = {
    position: 'absolute',
    bottom: '25px',
    right: '500px'
}
const btt = {
    position: 'absolute',
    bottom: '100px',
    right: '450px'
}
const bt2 = {
    fontWeigth: '300',
    fontSize: '42px'
}
const btt2 = {
    fontWeigth: '200',
    fontSize: '30px'
}

export default function LandingPage() {
    const [estado, setEstado] = useState({hidden: true});

    function handleOnclick(){
        setEstado({
            hidden: !estado.hidden
        })
    }
    return (
        <div style={ad}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHkPDRteDlTxF2jDQIDasp0npf9MxuW-agVg&usqp=CAU' alt="" 
            style={imageEA}/>
            <div style={bt}>
                <button style={bt2} type='button' onClick={()=> handleOnclick()}>FIGHT</button>
            </div>
            <div style={btt}>
                <button style={btt2} type='button' hidden={estado.hidden}><NavLink to="/home" >DESTELLO mt-70</NavLink></button>
            </div>
        </div>
    )
}