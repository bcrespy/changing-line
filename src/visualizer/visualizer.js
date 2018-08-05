/**
 * Un système de deux points sera utilisé pour dessiner
 * 
 * Le premier point se ballade à vitesse constante et change de 
 * direction de façon pseudo aléatoire
 * 
 * Le second suit le premier et bouge perpendiculairement à l'axe de
 * la direction du premier point. Plus l'amplitude du signal audio sera 
 * importante, plus le second point sera éloigné du premier 
 */


import { AudioAnalysedDataForVisualization } from '../audioanalysis/audio-analysed-data';
import config from '../config/visualizer.config';
import { Vector2 } from 'three';



export class Visualizer 
{
  constructor()
  {
    // le canvas
    this.canvas = document.querySelector("#fight-arena");
    this.context = this.canvas.getContext("2d");

    // on donne les dimensions au canvas
    this.canvas.width = config.area.width;
    this.canvas.height = config.area.height;

  }


  /**
   * @return {Promise} qui résoud lorsque tout est correctement chargé
   */
  init()
  {
    return new Promise( (resolve, reject) => {

      

      resolve();

    });
  }


  /**
   * 
   * @param {AudioAnalysedDataForVisualization} audioData 
   * @param {number} dTime delta time entre frame
   */
  draw( audioData, dTime )
  {
    
  }


  /**
   * Dessine un cercle de centre x, y et de couleur bg
   * @param {number} x 
   * @param {number} y 
   */
  drawCircle( x, y )
  {
    this.context.fillStyle = config.backgroundColor;
    this.context.beginPath();
    this.context.arc(x - this.translation.x, y - this.translation.y, config.circleRadius, 0, Math.PI*2 );
    this.context.fill();
  }
};
