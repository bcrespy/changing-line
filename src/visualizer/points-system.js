/**
 * Conformément à la description faite dans ./moving-points-visualizer.js
 */



import { AudioAnalysedDataForVisualization } from '../audioanalysis/audio-analysed-data';
import config from '../config/visualizer.config';
import { Vector2 } from 'three';
import { Noise } from 'noisejs';
import { Color } from './color';



export class PointsSystem 
{
  /**
   * 
   * @param {CanvasRenderingContext2D} context 
   * @param {Color} color 
   */
  constructor( context, color )
  {
    // le point qui se déplace librement
    this.walkingPoint = new Vector2( Math.random()*config.area.width, Math.random()*config.area.height );
    this.walkingAngle = Math.random() * Math.PI * 2;

    // le points qui se déplace le long de l'autre
    this.drawingPoint = new Vector2( this.walkingPoint.x, this.walkingPoint.y );
    this.drawingPointSide = 1; //-1 s'il change de sens 

    this.context = context;
    this.color = color;

    this.pathMovedTo = new Vector2();

    this.frames = 0;

    this.noise = new Noise(Math.random());

    this.speed = 1;
  }


  /**
   * initialise le système
   */
  init()
  {
  }


  /**
   * 
   * @param {AudioAnalysedDataForVisualization} audioData 
   * @param {number} dTime delta time entre frame
   */
  draw( audioData, dTime )
  {
    /*this.context.fillStyle = "red";
    this.context.fillRect( this.walkingPoint.x, this.walkingPoint.y, 5, 5 );*/

    this.context.lineWidth = 2;
    this.context.strokeStyle = this.color.toString();
    
    // si la ligne est trop longue on ne la dessine pas 
    if( this.pathMovedTo.distanceTo( this.drawingPoint ) < 200 )
    {
      this.context.beginPath();
      this.context.moveTo( this.pathMovedTo.x, this.pathMovedTo.y );
      this.context.lineTo( this.drawingPoint.x, this.drawingPoint.y );
      this.context.stroke();
    }

    this.pathMovedTo.set( this.drawingPoint.x, this.drawingPoint.y );

    // on fait bouger le point le long de l'axe tracé par sa direction 
    let translation = new Vector2( Math.cos(this.walkingAngle) * config.speed * this.speed, Math.sin(this.walkingAngle) * config.speed * this.speed );
    this.walkingPoint.add(translation);

    // altération aléatoire de l'angle qui gère la direction 
    this.walkingAngle+= Math.random()*config.angleVariation - config.angleVariation / 2;

    // on le bound à la zone de dessin
    this.boundPointToDrawingArea( this.walkingPoint );

    if( audioData.peak.value == 1 )
    { 
      this.drawingPointSide*= -1;
      /*this.context.fillStyle = "white";
      this.context.fillRect( this.walkingPoint.x-1.5, this.walkingPoint.y-1.5, 3, 3 )*/
    }

    // on fait bouger le point de dessin 
    let perpAngle = this.drawingPointSide * Math.PI/2 + this.walkingAngle;
    let distance = audioData.energy;
    this.drawingPoint.set( this.walkingPoint.x + Math.cos(perpAngle) * distance, this.walkingPoint.y + Math.sin(perpAngle) * distance );
    //this.boundDrawingPoint();

    this.frames++;
  }


  /**
   * Empêche le point qui se déplace de sortir de la zone de dessin
   * @param {Vector2} point le point qui sera bounded
   */
  boundPointToDrawingArea( point )
  {
    if( point.x < 0 )
      point.setX( config.drawingArea.width + point.x );
    else if( point.x > config.drawingArea.width )
      point.setX( point.x - config.drawingArea.width);

    if( point.y < 0 )
      point.setY( config.drawingArea.width + point.y );
    else if( point.y > config.drawingArea.height )
      point.setY( point.y - config.drawingArea.height );
  }


  /**
   * Empêche le point qui dessine de sortir de la zone de dessin
   * + corrige le tracé le cas échéant 
   */
  boundDrawingPoint()
  {
    let point = this.drawingPoint;

    if( this.drawingPoint.x < 0 )
    {
      /*this.context.lineTo( this.drawingPoint.x, this.drawingPoint.y );
      this.context.stroke();*/

      this.drawingPoint.setX( config.area.width + this.drawingPoint.x );
      this.context.beginPath();
      this.context.moveTo( this.drawingPoint.x, this.drawingPoint.y );
    }
    else if( this.drawingPoint.x > config.area.width )
    {
      //this.context.lineTo( this.drawingPoint.x, this.drawingPoint.y );
      //this.context.stroke();

      this.drawingPoint.setX( this.drawingPoint.x - config.area.width);
      this.context.beginPath();
      this.context.moveTo( this.drawingPoint.x, this.drawingPoint.y );
    }

    if( this.drawingPoint.y < 0 )
    {
      //this.context.lineTo( this.drawingPoint.x, this.drawingPoint.y );
      //this.context.stroke();

      this.drawingPoint.setY( config.area.width + this.drawingPoint.y );
      this.context.beginPath();
      this.context.moveTo( this.drawingPoint.x, this.drawingPoint.y );
    }
    else if( this.drawingPoint.y > config.area.height )
    {
      //this.context.lineTo( this.drawingPoint.x, this.drawingPoint.y );
      //this.context.stroke();

      this.drawingPoint.setY( this.drawingPoint.y - config.area.height );
      this.context.beginPath();
      this.context.moveTo( this.drawingPoint.x, this.drawingPoint.y );
    }
  }
};