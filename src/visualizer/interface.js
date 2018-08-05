import config from '../config/visualizer.config';


export class Interface 
{
  /**
   * 
   * @param {CanvasRenderingContext2D} context 
   */
  constructor( context )
  {
    this.context = context;

    this.texts = [
      "Run",
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
      "me be robot",
      "wow music looks like something",
      "boom ts boom ts boom ts",
      "b t k tt k t b k",
      "b t b t b t b t       b t k t b t k",
    ]
    this.frames = 0;
    this.text = Math.floor( Math.random() * this.texts.length );
  }


  draw()
  {
    this.context.save();

    this.context.translate(-0.5,-0.5);

    this.context.fillStyle = "#ffffff";
    this.context.fillRect( 1, 1, config.area.width-2, 1 );
    this.context.fillRect( 1, 1, 1, config.area.height-2 );

    this.context.fillStyle = "#bdbdbd";
    this.context.fillRect( 0, 0, config.area.width, 1 );
    this.context.fillRect( 0, 0, 1, config.area.height );

    this.context.fillStyle = "#7b7b7b";
    this.context.fillRect( 1, config.area.height-1, config.area.width-1, 1 );
    this.context.fillRect( config.area.width-1, 1, 1, config.area.height-1 );

    this.context.fillStyle = "#00007b";
    this.context.fillRect( 3, 3, config.area.width-5, 18 );

    this.context.font = "12px pixel";
    this.context.fillStyle = "#ffffff";
    this.context.fillText( this.texts[this.text], 6, 16 );

    this.context.restore();

    if( this.frames%30 == 0 )
      this.text = Math.floor( Math.random() * this.texts.length );

    this.frames++;
  }
}