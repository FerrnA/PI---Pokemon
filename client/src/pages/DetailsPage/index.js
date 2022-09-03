import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { upperCaseName } from "../../components/utils/functions";
import pokeball from "../../images/pokeball.png";
import "./styles.css";

function DetailsPage() {
  const { id } = useParams();
  const [details, setDetails] = useState();
  const getDetails = async () => {
    const { data } = await axios.get(`pokemons/species/${id}`);
    setDetails(data);
  };

  const mainStyle = (n) => {
    //eslint-disable-next-line
    if (n == id) {
      return "main-poke";
    }
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getDetails();
    }
    return () => (mounted = false);
    //eslint-disable-next-line
  }, [id]);

  return (
    <div className="pokemonDetail">
      <div className="pokemonDetail--container">
        {details &&
          details.data.evolutions_map_data.map((e) => (
            <Link
              key={uuidv4()}
              to={`/home/pokemons/${e.id}`}
              className={`pokemonDetail--card ${mainStyle(e.id)}`}
            >
              <img src={e.imgurl} alt={e.name} width="150" />
              <div>
                <h2>{upperCaseName(e.name)}</h2>
              </div>
            </Link>
          ))}
      </div>
      <div
        className="pokemonDetail--container text-box"
        style={{
          backgroundImage: `url(${pokeball})`,
        }}
      >
        <p>{details && details.text_description}</p>
      </div>
    </div>
  );
}

export default DetailsPage;
