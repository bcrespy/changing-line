/**
 * Dessine la courbe du signal 
 */

import { Color } from './color';
import config from '../config/visualizer.config';


export class EnergyCurve
{
  /**
   * 
   * @param {CanvasRenderingContext2D} context 
   * @param {Color} color
   */
  constructor( context, color )
  {
    this.context = context;
    this.energyHistory = new Array();
    this.color = color;

    this.historySize = 300;
  }


  draw( energy )
  {
    this.addEnergyToHistory( energy );

    this.context.strokeStyle = this.color.toString();

    let x = config.area.width / 2,
        yStart = config.area.height - config.margin,
        pxSpeed = config.scrollSpeed / 60;

    for( let i = 0, l = this.energyHistory.length-1; i < l; i++ )
    {
      if( x < config.margin ) break;

      this.context.beginPath();
      this.context.moveTo( x, yStart - this.curveFunc(this.energyHistory[i])*35 );
      x-= pxSpeed;
      this.context.lineTo( x, yStart - this.curveFunc(this.energyHistory[i+1])*35 );
      this.context.stroke();
    }

    return (this.curveFunc(energy)*35 > config.area.height/2);
  }


  curveFunc( x )
  {
    return Math.pow(x, 2);
  }


  addEnergyToHistory( energy )
  {
    this.energyHistory.unshift( energy );
    if( this.energyHistory.length > this.historySize ) this.energyHistory.pop();
  }
}