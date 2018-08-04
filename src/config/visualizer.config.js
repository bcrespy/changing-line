import { Color } from '../visualizer/color';

export default {
  area: {
    width: 600,
    height: 600
  },

  drawingArea: {
    width: 280,
    height: 280
  },

  angleVariation: 0.5,

  speed: 0.5,

  colors: [
    new Color( 0, 255, 0 ),
    new Color( 255, 0, 255 )
  ],

  backgroundColor: "#1427ff",
  circleRadius: 15,

  colorDistanceMax: 60
};