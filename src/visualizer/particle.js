/**
 * Représente une particule (smileys)
 */

import config from '../config/visualizer.config';
import { Vector2 } from 'three';



export class Particle 
{
  /**
   * 
   * @param {Vector2} position La position de départ de la particule
   * @param {numbler} angle angle, logiquement compris entre Pi et 2Pi
   * @param {number} speed vitesse, en px/s
   * @param {CanvasRenderingContext2D} context
   * @param {Image} image l'image à rendre
   */
  constructor( position, angle, speed, context, image )
  {
    this.position = new Vector2( position.x - config.particleSize/2, position.y - config.particleSize/2);
    this.direction = new Vector2( Math.cos(angle), Math.sin(angle) );
    this.speed = speed;
    this.image = image;

    this.context = context;

    this.movement = new Vector2( this.direction.x*speed, this.direction.y*speed );

    this.velocity = new Vector2( 0, 0 );
    this.acceleration = new Vector2( this.direction.x*speed, this.direction.y*speed );
    this.gravity = new Vector2( 0, 0.2 );
  }


  draw()
  {
    this.context.drawImage( this.image, this.position.x, this.position.y, config.particleSize, config.particleSize );

    this.velocity.add( this.gravity );
    this.position.add( this.velocity );

    //this.context.fillRect( this.position.x, this.position.y, 15, 15 );

    // on update
    this.position.set( this.position.x + this.movement.x, this.position.y + this.movement.y );

    if( this.position.x < -config.particleSize || this.position.x > config.area.width 
      || this.position.y > config.area.height )
      return false;
    
    return true;
  }
};