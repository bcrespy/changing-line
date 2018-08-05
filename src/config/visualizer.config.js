import { Color } from '../visualizer/color';

export default {

  // taille de la zone de dessin 
  area: {
    width: 600,
    height: 600
  },

  // marge autour de la zone de dessin 
  margin: 20,

  // coulour de fond du canvas 
  backgroundColor: "#bdbdbd",

  // infos sur la grille du bas 
  gridsize: 15,
  gridcolor: new Color( 0, 0, 0 ),

  // vitesse de défilement (px/s)
  scrollSpeed: 120,

  // taille d'un smiley
  particleSize: 30,
  particleSpeed: 4,
  particleSpeedVariation: 3,
};