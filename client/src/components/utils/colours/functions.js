import c from "./Colours.module.css";

export const switchTypeStyle = (p) => {
  switch (p) {
    case "normal":
      return c.normal;
    case "fighting":
      return c.fighting;
    case "flying":
      return c.flying;
    case "poison":
      return c.poison;
    case "ground":
      return c.ground;
    case "rock":
      return c.rock;
    case "bug":
      return c.bug;
    case "ghost":
      return c.ghost;
    case "steel":
      return c.steel;
    case "fire":
      return c.fire;
    case "water":
      return c.water;
    case "grass":
      return c.grass;
    case "electric":
      return c.electric;
    case "psychic":
      return c.psychic;
    case "ice":
      return c.ice;
    case "dragon":
      return c.dragon;
    case "dark":
      return c.dark;
    case "fairy":
      return c.fairy;
    case "unknown":
      return c.unknown;
    case "shadow":
      return c.shadow;
    default:
      return c.grey;
  }
};
export const switchBgStyle = (p) => {
  switch (p) {
    case "normal":
      return c.bGnormal;
    case "fighting":
      return c.bGfighting;
    case "flying":
      return c.bGflying;
    case "poison":
      return c.bGpoison;
    case "ground":
      return c.bGground;
    case "rock":
      return c.bGrock;
    case "bug":
      return c.bGbug;
    case "ghost":
      return c.bGghost;
    case "steel":
      return c.bGsteel;
    case "fire":
      return c.bGfire;
    case "water":
      return c.bGwater;
    case "grass":
      return c.bGgrass;
    case "electric":
      return c.bGelectric;
    case "psychic":
      return c.bGpsychic;
    case "ice":
      return c.bGice;
    case "dragon":
      return c.bGdragon;
    case "dark":
      return c.bGdark;
    case "fairy":
      return c.bGfairy;
    case "unknown":
      return c.bGunknown;
    case "shadow":
      return c.bGshadow;
    default:
      return c.bGgrey;
  }
};

export const pad = (num) => {
  //function for Id leading zeros #005
  num = num.toString();
  while (num.length < 3) num = "0" + num;
  return num;
};
