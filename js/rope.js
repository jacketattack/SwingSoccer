
function Rope(origin, ropeLength){
    
    this.origin = origin || 0
    this.ropeLength = ropeLength || 0;
    this.position = 0;
    this.angle = Math.PI/4;
    
    this.damping = 0.995;
    this.ropeVelocity = 0;
    this.ropeAcceleration = 0;
    
    this.ropeGraphics = null;
}

Rope.prototype.move = function(){
    this.update();
    this.display();
}

Rope.prototype.update = function(){
    
   var gravity = 0.4;
   
   this.ropeAcceleration = (-1 * gravity / this.ropeLength) * Math.sin(this.angle);  
   
   this.ropeVelocity *= this.damping;  
   
   this.angle += this.ropeVelocity;
}

Rope.prototype.display = function(stage){
    
   this.calculateRopePosition();
   
  if ( this.ropeGraphics != null) {
      
      this.ropeGraphics.x = this.origin.x;
      this.ropeGraphics.y = this.origin.y;
      
  } else {
   this.ropeGraphics = new PIXI.Graphics();
   var yellowColor = 0xFFFF00;
   this.ropeGraphics.beginFill(yellowColor);
   
   var ropeRadius = 1.0;
   var ropeWidth = 5;
   
   this.ropeGraphics.drawRoundedRect(this.origin.x,0,ropeWidth,this.position.y,ropeRadius);
   stage.addChild(this.ropeGraphics);
   }
   
}

Rope.prototype.handleMove = function(mx, my){
    
   // var diff = RopeVector.sub(this.origin,new RopeVector(mx,my));
    
    var diff = new RopeVector(5,5);
    this.angle = Math.atan2(-1*diff.y,diff.x) - Math.PI/2;
}

Rope.prototype.remove = function(stage){
    stage.removeChild(this.ropeGraphics);
    this.ropeGraphics = null;
}

Rope.prototype.calculateRopePosition = function(){
    
    console.log("Calculating new position" );
    console.log( this.ropeLength * Math.sin(this.angle));
    console.log( this.ropeLength * Math.cos(this.angle));
    
    this.position = new RopeVector(
        this.ropeLength * Math.sin(this.angle),
        this.ropeLength * Math.cos(this.angle)
    );
}

