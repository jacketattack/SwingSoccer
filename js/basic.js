var GAME_WIDTH = 1000;
var GAME_HEIGHT = 600;

var renderer = PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT,{backgroundColor : 0x1099bb});
document.body.appendChild(renderer.view);

// Create Stage
var stage = new PIXI.Container();

// create a texture from an image path
var texture = PIXI.Texture.fromImage('bunny.png');

// Create Stage Dimensions
var boxWidth = renderer.width / 100;
var boxHeight = renderer.height / 100;

// Create Avatar
var bunny = new PIXI.Sprite(texture);

// Rope Holding Place
var rope = null;

// Position Avatar
bunny.position.x = 400;
bunny.position.y = 50;

// Add Avatar to Stage
stage.addChild(bunny);

addDownKeyEventListener();

animate();

function animate(){
    
    requestAnimationFrame(animate);
    
    renderer.render(stage);
  
   if ( !isRopePainted() ){
       moveAvatarDownByFactorOf(bunny,2) 
    }
    else {
        
        if (rope.ropeAcceleration != 0){
            rope.move(stage);
        }
    }
}

function addDownKeyEventListener(){
    
    document.addEventListener('keydown', onKeyDown);
}

function onKeyDown(keyBoardEvent){
   
   var key = keyBoardEvent.keyCode;
   avatarMovementKeys(key);
   ropeMovement(key);
}

function moveAvatarDownByFactorOf(avatar,factoryOf){
    avatar.position.y += boxHeight/factoryOf;
}

function ropeMovement(key){
    
    if(key === KeyCodes.SPACE_BAR){
        
        if( isRopePainted() ){
            rope.removeGraphics(stage);
            rope = null;
        }else{
            
            var ropeOrigin = calculateRopeOrigin(bunny);
            var ropeLength = calculateRopeLength(bunny);
            var ropePosition = calculateRopePosition(bunny);
            rope = new Rope(ropeOrigin, ropePosition, ropeLength);
            
            rope.display(stage);
        }
    }
}
function avatarMovementKeys(key){
   
    if( key === KeyCodes.UP_ARROW ){
        moveAvatarUp(bunny);
    }
    else if ( key === KeyCodes.DOWN_ARROW ){
       moveAvatarDown(bunny);
    }
    else if ( key === KeyCodes.LEFT_ARROW ){
        moveAvatarLeft(bunny);
    }
    else if( key === KeyCodes.RIGHT_ARROW){
        moveAvatarRight(bunny);
    }
    
}

function moveAvatarUp(avatar){
    if (avatar.position.y > boxHeight){
        avatar.position.y -= boxHeight;
    }
}

function moveAvatarDown(avatar){
    if (avatar.position.y < renderer.height - boxHeight){
        avatar.position.y += boxHeight;
    }
}

function moveAvatarLeft(avatar){
    if(avatar.position.x > 0){
        avatar.position.x -= boxWidth;
    }
    
    if( isRopePainted() ){
        rope.handleMove(-10,0);
        rope.move(stage);
   }
}

function moveAvatarRight(avatar){
    if(avatar.position.x < renderer.width - boxWidth ){
        avatar.position.x += boxWidth;
    }
    
    if( isRopePainted() ){
        rope.handleMove(10,0);
        rope.move(stage);
   }
}

function isRopePainted(){
    return rope != null;
}

function removeRope(){
    rope.remove(stage);
    rope = null;                                                                                        
}

function paintRope(sh){
    
   var ropeGraphics = new PIXI.Graphics();
   
   var yellowColor = 0xFFFF00;
   ropeGraphics.beginFill(yellowColor);
   
   var ropeWidth = 5;
   var ropeHeight = bunny.position.y;
   var ropeRadius = 5;
   ropeGraphics.drawRoundedRect(bunny.position.x,0,ropeWidth,ropeHeight,ropeRadius);
   stage.addChild(ropeGraphics);
   return ropeGraphics;
}

function calculateRopeLength(avatar){
    return avatar.position.y;
}

function calculateRopeOrigin(avatar){
    return { x : avatar.position.x, y: 0};
}

function calculateRopePosition(avatar){
    return { x: avatar.position.x, y: avatar.position.y };
}