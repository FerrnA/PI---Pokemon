import React from 'react';
import { connect } from 'react-redux';
import { getPokemonDetail } from '../../actions/index';

class PokemonData extends React.Component {

    componentDidMount() {
        this.props.getPokemonDetail(this.props.pokemonid)
    }

    render() {
        return (
            <div className="pokemon-detail">
              Detalles
              <ul>  
                <li>Nº: {this.props.pokemon.id}</li> 
                <li>Nombre: {this.props.pokemon.name}</li>   
                <li>Altura: {this.props.pokemon.altura}</li>
                <li>Peso: {this.props.pokemon.peso}</li>
                <li>Velocidad: {this.props.pokemon.velocidad}</li>
                <li>Vida: {this.props.pokemon.vida}</li>
                <li>Fuerza: {this.props.pokemon.fuerza}</li>
                <li>Defensa: {this.props.pokemon.defensa}</li>
                <li>Tipo/s: 
                    <ul>
                        {this.props.pokemon.tipos.forEach(p => <li>{p}</li>)}
                    </ul>
                </li>
                <img src={this.props.pokemon.imgurl} alt='' />
              </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      pokemon: state.pokemon
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      getPokemonDetail: pokemonid => dispatch(getPokemonDetail(pokemonid))
    };
  }
  
  export default connect( mapStateToProps, mapDispatchToProps)(PokemonData);