
function RopeVector(xPos,yPos){
    this.x = xPos || 0;
    this.y = yPos || 0;
}

RopeVector.prototype.sub = function( origin, newOrigin){
    return new RopeVector( Math.abs(newOrigin.x - origin.x), Math.abs(newOrigin.y, origin.y));
}
