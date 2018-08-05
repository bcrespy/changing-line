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

import config from '../config/visualizer.config';

import { AudioAnalysedDataForVisualization } from '../audioanalysis/audio-analysed-data';
import { Vector2 } from 'three';

import { Background } from './background';



export class Visualizer 
{
  constructor()
  {
    // le canvas
    this.canvas = document.querySelector("canvas");
    this.context = this.canvas.getContext("2d");

    // on donne les dimensions au canvas
    this.canvas.width = config.area.width;
    this.canvas.height = config.area.height;

    // le background 
    this.background = new Background( this.context );
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
    this.background.draw( audioData, dTime );
  }
};
