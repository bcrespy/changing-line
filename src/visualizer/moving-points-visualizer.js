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
import { PointsSystem } from './points-system';
import config from '../config/visualizer.config';
import { Vector2 } from 'three';



export class MovingPointsVisualizer 
{
  constructor()
  {
    // le canvas
    this.canvas = document.querySelector("#fight-arena");
    this.context = this.canvas.getContext("2d");

    // on donne les dimensions au canvas
    this.canvas.width = config.area.width;
    this.canvas.height = config.area.height;

    /**
     * Les systèmes de points
     * @type {Array.<PointsSystem>}
     */
    this.systems = [
      new PointsSystem( this.context, config.colors[0] ),
      new PointsSystem( this.context, config.colors[1] ),
      new PointsSystem( this.context, config.colors[0] ),
      new PointsSystem( this.context, config.colors[1] ),
      new PointsSystem( this.context, config.colors[0] ),
      new PointsSystem( this.context, config.colors[1] ),
    ];

    // le canvas pour le score
    this.bottomCanvas = document.querySelector("#scoreboard");
    this.btmCtx = this.bottomCanvas.getContext("2d");

    this.words = [
      "yeaaaah",
      "this is some text",
      "go purple !!!!",
      "purple will always be the worst",
      "pooouuuurpoule",
      "i wish green wasn't so good",
      "it's like it was coded so that green wins...",
      "i am not a joke",
      "will it be entirely covered ?",
      "i am reading text",
      "i am alive",
      "i will only be seen by 1 human",
      "is my creator even real?",
    ];

    this.text = "null";

    this.frames = 0;

    this.mousedown = false;
  }


  /**
   * @return {Promise} qui résoud lorsque tout est correctement chargé
   */
  init()
  {
    return new Promise( (resolve, reject) => {

      document.addEventListener( 'mousedown', event => {
        this.mousedown = true;
      });

      document.addEventListener( 'mouseup', event => {
        this.mousedown = false;
      });

      this.canvas.addEventListener( 'mousemove', event => {
        if( this.mousedown )
          this.drawCircle( event.offsetX, event.offsetY );
      });

      this.bottomCanvas.width = 300;
      this.bottomCanvas.height = 50;

      this.context.fillStyle = "#5461ff";

      // crée le tracé du point 
      for( let i = 45; i < config.area.width-45; i+= 15 )
      {
        this.context.fillRect(i, 30, 1, config.area.height-75);
        this.context.fillRect(30, i, config.area.width-75, 1);
      }

      this.systems.forEach( system => {
        system.init();
      });

      
      this.translation = new Vector2(
        (config.area.width-config.drawingArea.width)/2, 
        (config.area.height-config.drawingArea.height)/2
      );
      this.context.translate( this.translation.x, this.translation.y );

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
    // surtout pas de clear du canvas, notre dessin repose là dessus 

    this.systems.forEach( system => {
      system.draw( audioData, dTime );
    });

    let cvsData = this.context.getImageData(0, 0, config.area.width, config.area.height);
    let arraySize = config.area.width * config.area.height;

    let green = 0,
        purple = 0;

    for( let i = 0; i < 3000; i++ )
    {
      let idx = Math.floor(Math.random() * arraySize)*4;
      let r = cvsData.data[idx],
          g = cvsData.data[idx+1], 
          b = cvsData.data[idx+2];
      
      let dGreen = config.colors[0].distanceRGB(r,g,b);
      if( dGreen <= config.colorDistanceMax )
        green++;
      else
      {
        let dPurple = config.colors[1].distanceRGB(r,g,b);
        if( dPurple <= config.colorDistanceMax ) purple++;
      }
    }

    let pGreen = green/(green+purple);
    let pPurple = purple/(green+purple);

    // le scoreboard
    this.btmCtx.fillStyle = "#1427ff";
    this.btmCtx.fillRect(0,0,500,500);

    this.btmCtx.fillStyle = "#00ff00";
    this.btmCtx.fillRect(0,0, pGreen*300, 15);

    this.btmCtx.fillStyle = "#ff00ff";
    this.btmCtx.fillRect(pGreen*300 ,0, pPurple*300, 15);


    if( this.frames%450 == 0 )
    {
      this.text = this.words[Math.floor(Math.random()*this.words.length)];
    }

    
    this.btmCtx.textAlign = "center";
    this.btmCtx.fillStyle = "#ffffff";
    this.btmCtx.font = "12px Courier";
    this.btmCtx.fillText( this.text, 150, 35 );

    this.frames++;
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
