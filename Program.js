JSprite.frame = 'viewer';
var Platypus = JSprite(function (name,x,y) {
  this.goto(x || 0, y || 0)
  this.name = name;
});
var platy = new Platypus('Patty',0,0);
//JSprite.canvas.add(platy.raw);
