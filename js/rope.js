
function Rope(origin, position, ropeLength){
    
    // Origin the pivot position of the pendelum
    this.origin = origin || 0;
    this.position = position || 0;
    this.ropeLength = ropeLength || 0;
    
    this.angle = Math.PI/4;  
    this.ropeVelocity = 0.0;
    this.ropeAcceleration = 0.0;
    this.damping = 0.995;
        
    this.ropeGraphics = null;
}

Rope.prototype.move = function(stage){
    this.update();
    this.moveAndDisplay(stage);
    
}

Rope.prototype.update = function(){
    
   var gravity = 0.4;
   
   this.ropeAcceleration = (-1 * gravity / this.ropeLength) * Math.sin(this.angle);
   
   this.ropeVelocity += this.ropeAcceleration;
    
   //this.ropeVelocity *= this.damping;
   
   this.angle += this.ropeVelocity;
}

Rope.prototype.display = function(stage){
   this.removeGraphics(stage);
   
   var line = new PIXI.Graphics();
   var purpleColor = 0x9b59b6;
   line.lineStyle(1,purpleColor);
   
   line.moveTo(this.origin.x, this.origin.y);
   line.lineTo(this.position.x, this.position.y);
   line.endFill();
  
   this.ropeGraphics = line; 
   stage.addChild(this.ropeGraphics);
}

Rope.prototype.moveAndDisplay = function(stage){
    this.calculateRopePosition();
    this.display(stage);
}

Rope.prototype.handleMove = function(mx, my){
   
    var diff = new RopeVector(mx,my);
    this.angle = Math.atan2(-1*diff.y,diff.x) - Math.PI/2;
}

Rope.prototype.removeGraphics = function(stage){
    stage.removeChild(this.ropeGraphics);
    this.ropeGraphics = null;
}

Rope.prototype.calculateRopePosition = function(){
   
   //  Calculates the Cartesian Coordinates
    this.position = new RopeVector(
        this.ropeLength * Math.sin(this.angle),
        this.ropeLength * Math.cos(this.angle)
    );
}

