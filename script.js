const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//to change the canvas size pour no deformation
canvas.width = 900
canvas.height = 590

//adds the player
const player = new Player()

//Parallax Background
const imageLayers = [
    './img/back2/Layer_0.png',
    './img/back2/Layer_1.png',
    './img/back2/Layer_2.png',
    './img/back2/Layer_3.png',
    './img/back2/Layer_4.png',
    './img/back2/Layer_5.png',
    './img/back2/Layer_6.png',
    './img/back2/Layer_7.png',
    './img/back2/Layer_8.png',
    './img/back2/Layer_9.png',
]

const layers = imageLayers.map((src, i) => new Layer(src, i / 10))
function drawLayer() {
    
    layers.forEach((layer, i) => {
      layer.update()
      layer.draw()
    })
  }


// function tryAgain() {
// }


//gravity
const gravity = 1.2;

//adds hearts - 3 win items
const hearts = [
    new Heart({x: 430, y: 417})
]

const ghosts = [
    new Ghost({x:850, y:500})
]

//adds platforms
const platforms = [
    new Platform({x: 400, y: 450}), 
    new Platform({x: 800, y: 400}), 
    new Platform({x: 1500, y: 300}), 
]


//pour les touches si elles sont pressed or not
const keys = {
    left : {
        pressed: false
    },  
    right : {
        pressed: false
    } 
}

//take the cat width to track when the ghost touches his x
function ghostCollison({ player, ghost}){
    return (
        player.pos.y + player.height <= ghost.pos.y 
        &&
        player.pos.y + player.height + player.velocity.y >= ghost.pos.y
        &&
        player.pos.x + player.width >= ghost.pos.x
        &&
        player.pos.x <= ghost.pos.x + ghost.width
    )
}


//function random pour ghosts et plateformes
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}


//MAIN
function animate(){
    ctx.clearRect(0,0, canvas.width, canvas.height) // 🧽
    requestAnimationFrame(animate) //to loop so it change the properties
    drawLayer()

    //random ghosts and plateforms
   if (platforms.at(-1).pos.x < 450) {
        platforms.push(new Platform({x: 900, y: getRandom(250, 500)}))
   }

   if (ghosts.at(-1).pos.x < 800) {
        ghosts.push(new Ghost({x: 900, y: getRandom(480, 500)}))
    }
  
   
    hearts.forEach(heart => {
    heart.draw()
    })

    platforms.forEach(platform => {
        platform.draw()
    })

    ghosts.forEach((ghost, index) => {
        ghost.update()
        
        if (ghostCollison({
            player: player,
            ghost : ghost

        })) {
            console.log('bye bye ghosty')
            player.velocity.y -= 30
            setTimeout(() => {
                ghosts.splice(index, 1)
            }, 0 )
        } else if (
            player.pos.x + player.width >= ghost.pos.x 
            && 
            player.pos.y + player.height >= ghost.pos.y 
         
             ){
                console.log('you loser')
                
        }
        
       
        // start back HERE ------------------------------------

    })


    player.update()
    //player update after everything (player devant plartform + background)


    //WINNER


    //LOSER
    // if (player.position.y < canvas.height) {
    //     tryAgain()
    // }




    //to go left or right not indefiniment + ne pas sortir du canvas posX
    if(keys.right.pressed && player.pos.x < canvas.width*0.3){
        player.velocity.x = 4
    } else if (keys.left.pressed && player.pos.x < 50) {
        player.velocity.x = -4
    } else {
        player.velocity.x = 0
    }

    //pour que plateformes bougent en meme temps
    if (keys.right.pressed && player.pos.x > canvas.width*0.3) {
        platforms.forEach((platform) => {
            platform.pos.x -= 4
        })
        
        //retour en arriere
    } else if (keys.left.pressed && player.pos.x > 80) {
        player.velocity.x = -4
    }


    //if the bottom of the player is less than the top of the platform
    // detection collision ac plateforme - x left and right sinon le player ne retombe pas !
    platforms.forEach((platform) => {
        if (player.pos.y + player.height <= platform.pos.y && player.pos.y + player.height + player.velocity.y >= platform.pos.y && player.pos.x + player.width >= platform.pos.x && player.pos.x <= platform.pos.x +platform.width ) {
            player.velocity.y = 0
        }
    })

}
animate()




// add event to interact and use keyboard 
window.addEventListener('keydown', (e) => {
    // console.log(e) //pour trouver leur KeyCode dans KeyboardEvent
    switch (e.keyCode){
        
        case 65: 
        // console.log('gauche')
        keys.left.pressed = true // selects the object and changes property
        break

        case 68: 
        // console.log('droite')
        keys.right.pressed = true
        break

        case 87: 
        // console.log('haut')
        player.velocity.y -= 13 // - car sur y il faut aller en bas
        break

        case 83: 
        // console.log('bas')
        break
    }
})


window.addEventListener('keyup', (e) => {
    switch (e.keyCode){
        
        case 65: 
       // console.log('gauche')
        keys.left.pressed = false
        break

        case 68: 
        //console.log('droite')
        keys.right.pressed = false
        break

        case 87: 
        //console.log('haut')
        player.velocity.y -= 13

        break

        case 83: 
        //console.log('bas')
        break

    }

})














