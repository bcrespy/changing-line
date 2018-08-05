import { resolve } from "path";

export class ImagesLoader 
{
  constructor()
  {
    this.imageslist = [
      "051-angry.png",
      "051-astonished-1.png",
      "051-astonished.png",
      "051-confused.png",
      "051-cool-1.png",
      "051-cool.png",
      "051-cry-1.png",
      "051-cry.png",
      "051-devil.png",
      "051-dizzy.png",
      "051-expressionless.png",
      "051-flushed.png",
      "051-happy-1.png",
      "051-happy-2.png",
      "051-happy.png",
      "051-in-love.png",
      "051-injury.png",
      "051-joy.png",
      "051-kiss-1.png",
      "051-kiss-2.png",
      "051-kiss.png",
      "051-mask.png",
      "051-mute.png",
      "051-neutral.png",
      "051-sad-1.png",
      "051-sad.png",
      "051-scared-1.png",
      "051-scared.png",
      "051-secret.png",
      "051-shocked.png",
      "051-sick.png",
      "051-sleeping.png",
      "051-smile-1.png",
      "051-smile.png",
      "051-smiling-1.png",
      "051-smiling.png",
      "051-smirking.png",
      "051-surprised.png",
      "051-sweat.png",
      "051-thinking.png",
      "051-tired.png",
      "051-tongue-1.png",
      "051-tongue-2.png",
      "051-tongue.png",
      "051-unamused.png",
      "051-vomiting-1.png",
      "051-vomiting.png",
      "051-wink.png",
      "051-zombie.png"
    ];

    this.images = new Array();
  }

  loadImages()
  {
    return new Promise( (resolve, reject ) => {
      let completed = 0;
      this.imageslist.forEach( filename => {
        let img = new Image();
        img.onload = () => { 
          completed++; 
          this.images.push( img );
          if( completed == this.imageslist.length ) resolve(); 
        }
        img.onerror = () => { completed++; console.log("error"); if( completed == this.imageslist.length ) resolve(); };
        img.src = "./dist/img/smileys/"+filename;
      });
    });
  }


  /**
   * @returns {Image}
   */
  getRandomImage()
  {
    return this.images[Math.floor(Math.random()*this.images.length)];
  }
};