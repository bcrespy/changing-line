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
import { EnergyCurve } from './energy-curve';
import { Color } from './color';
import { Particle } from './particle';
import { Interface } from './interface';
import { ImagesLoader } from './images-loader';


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

    this.curves = [
      new EnergyCurve( this.context, new Color(255,0,255) ),
      new EnergyCurve( this.context, new Color(0,0,255) ),
      new EnergyCurve( this.context, new Color(255,0,0) ),
      new EnergyCurve( this.context, new Color(255,255,0) )
    ];

    /**
     * @type {Array.<Particle>}
     */
    this.particles = new Array();

    this.interface = new Interface( this.context );
    this.imgLoader = new ImagesLoader();
  }


  /**
   * @return {Promise} qui résoud lorsque tout est correctement chargé
   */
  init()
  {
    return new Promise( (resolve, reject) => {

      this.imgLoader.loadImages().then( resolve );

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

    this.curves.forEach( (curve, index) => {
      if( curve.draw( audioData.multibandEnergy[index] / (audioData.multibandEnergyAverage[index]*0.5) ) )
      {
        // on spawn une particule 
        this.particles.push(
          new Particle( 
            new Vector2(config.area.width/2, config.area.height/2),
            Math.PI + Math.random() * Math.PI,
            config.particleSpeed + Math.random() * config.particleSpeedVariation,
            this.context,
            this.imgLoader.getRandomImage()
          )
        );
      }
    });

    // on affiche les particles 
    this.particles.forEach( (particle, index) => {
      if( !particle.draw() )
        this.particles.splice(index, 1);
    });

    // dessin de l'interface 
    this.interface.draw();
  }
};
