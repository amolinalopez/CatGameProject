//Player creation : properties
class Player {
    constructor() {
        this.pos = {
            x: 0,
            y: 400
        }
        //pour le deplacement 
        this.velocity = {
            x: 0,
            y: 0
        }

        this.width = 90
        this.height = 50
        this.frames = 0
        
    }

    // draw the player
    draw() {
        const playerImage = new Image();
        playerImage.src = './img/catSprites/please.png';
        ctx.drawImage(
            playerImage, 

            156 * this.frames,
            0,
            157,
            72,


            this.pos.x, 
            this.pos.y, 
            this.width, 
            this.height)

        
        
    }

    //update les properties du player - ne pas oublier de la call pour work
    update() {
        this.frames++
        if (this.frames > 29){
            this.frames = 0
        }
        this.draw()
        this.pos.x += this.velocity.x
        this.pos.y += this.velocity.y
        

        //le player ne doit pas tomber hors du canvas (-60 a height si background haut)
        if (this.pos.y + this.height + this.velocity.y <= canvas.height-45) {
        this.velocity.y += gravity //gonna accelerate over time
        } else {
            this.velocity.y = 0
        }
    }
}


//Platerform creation : properties
class Platform {
    constructor({x, y}){
        this.pos = {
            x: x, // or just x
            y: y // or just y
        }
        this.width = 150
        this.height = 10
     }

     draw() {
        ctx.fillStyle = '#1C1D2A'
        // '#1C1D2A'
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)

     }
}


//Collect items : Heart creation : properties
class Heart {
    constructor({x, y}){
        this.pos = {
            x: x, // or just x
            y: y

        }
        this.width = 35
        this.height = 32
     }

     draw() {
       
        const heartImage = new Image();
        heartImage.src = './img/heart.png';
        ctx.drawImage(heartImage, this.pos.x, this.pos.y, this.width, this.height)
     }

}

//Enemy Ghost creation : properties
class Ghost {
    constructor({x, y}) {
        this.pos = {
            x: x,
            y: y
        }
        //pour le deplacement 
        this.velocity = {
            x: -.8,
            y: 0
        }

        this.width = 40
        this.height = 40
    }

    // draw the player
    draw() {
        // ctx.fillStyle = '#1C1D2A'
        // ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)

        const ghostImage = new Image();
        ghostImage.src = './img/sopGhost.png';
        ctx.drawImage(ghostImage, this.pos.x, this.pos.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.pos.x += this.velocity.x
        this.pos.y += this.velocity.y
        

    }
}


class Layer {
    constructor(src, velocity) {
      this.x = 0
      this.y = 0
      this.velocity = velocity
      
      const imgLayer = document.createElement('img')
      imgLayer.onload = () => this.imgLayer = imgLayer
      imgLayer.src = src
    }
    update() {
      this.x -= this.velocity * player.velocity.x  //* instead
      this.x %= canvas.width
    }
    draw() {
      if (!this.imgLayer) return
      
      ctx.drawImage(this.imgLayer, this.x, 0)
      ctx.drawImage(this.imgLayer, this.x + canvas.width, 0)
      ctx.drawImage(this.imgLayer, this.x - canvas.width, 0)
    }
  }
