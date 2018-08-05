/**
 * Gère le dessing du background du canvas 
 */


import config from '../config/visualizer.config';
import { Vector2 } from 'three';
import { AudioAnalysedDataForVisualization } from '../audioanalysis/audio-analysed-data';



export class Background 
{
  /**
   * 
   * @param {CanvasRenderingContext2D} context 
   */
  constructor( context )
  {
    this.context = context;
    this.timer = 0;
  }


  /**
   * Dessine les éléments de fond
   * @param {AudioAnalysedDataForVisualization} audioData 
   * @param {number} dTime 
   */
  draw( audioData, dTime )
  {
    /*let alpha = ""+(1-audioData.peak.value);
    alpha = alpha.substring(0,3);
    this.context.fillStyle = "rgba(0, 255, 237, "+alpha+")";
    this.context.fillRect(0,0,config.area.width, config.area.height);*/
    
    this.context.clearRect( 0, 0, config.area.width, config.area.height );

    // le dessin de la grille qui avance vers la gauche 
    this.drawgrid( audioData, dTime );

    this.timer+= config.scrollSpeed * dTime / 1000;
  }


  /**
   * Dessin de la grille 
   * @param {AudioAnalysedDataForVisualization} audioData 
   * @param {Number} dTime 
   */
  drawgrid( audioData, dTime )
  {
    this.context.fillStyle = config.gridcolor.toString();

    let topLeft = new Vector2( config.margin, config.area.height/2 ),
        bottomRight = new Vector2( config.area.width - config.margin, config.area.height - config.margin );
    
    let lineSize = new Vector2( bottomRight.x - topLeft.x, bottomRight.y - topLeft.y );
    
    let xOffset = -1* this.timer % config.gridsize,
        yOffset = 0;

    // on dessine les traits verticaux 
    let x = topLeft.x + xOffset + config.gridsize; // on ajoute config.gridsize car xOffset € [-gridsize;0]

    while( x < bottomRight.x )
    {
      this.context.fillRect( x, topLeft.y, 1, lineSize.y );
      x+= config.gridsize;
    }

    // on dessine les traits horizontaux 
    let y = topLeft.y + yOffset;

    while( y < bottomRight.y )
    {
      this.context.fillRect( topLeft.x, y, lineSize.x, 1 );
      y+= config.gridsize;
    }

    // le cadre qui entoure la grille 
    this.context.strokeStyle = config.gridcolor.toString();
    this.context.strokeRect( topLeft.x, topLeft.y, lineSize.x, lineSize.y );
  }
};



function roundUpToAny( n, x )
{
  return Math.round( (n+x/2)/x ) * x;
}

function roundDownToAny( n, x )
{
  return Math.round( (n-x/2)/x ) * x;
}