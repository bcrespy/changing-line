export class Color
{

  constructor( red, green, blue )
  {
    this.r = red;
    this.g = green;
    this.b = blue;
  }

  toString()
  {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }


  /**
   * @returns {number} la distance euclidéene entre les couleurs
   * @param {Color} color la couleur à comparer
   */
  distance( color )
  {
    return Math.sqrt( (color.r-this.r) * (color.r-this.r) + (color.g-this.g) * (color.g-this.g) + (color.b-this.b) * (color.b-this.b) );
  }


  /**
   * @returns {number} la distance euclidéene entre les couleurs
   */
  distanceRGB( r, g, b )
  {
    return Math.sqrt( (r-this.r) * (r-this.r) + (g-this.g) * (g-this.g) + (b-this.b) * (b-this.b) );
  }

};