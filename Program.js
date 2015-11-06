JSprite.frame = 'viewer';
var Platypus = JSprite({
  init:function (x,y) {
    this.goto(x,y);
  },
  image: '#platypus'
});
var platy = new Platypus(0,0);
var cyoce = new Platypus(100,-50);
platy.onmousedown = function () {
  this.goto(JSprite.mouse);
  this .update = function () {
    this.point(JSprite.mouse);
  };
};
platy.onmouseup = function () {
  this.update = JSprite.path.gravity(this,this.rel(JSprite.mouse),9.8,true);
};
cyoce.image = '#tinyplatypus';
cyoce.angle += 20;
cyoce.speed = 10;
cyoce.update = function (t ) {
  if (JSprite.key.pressed('up')) this.move(t);
  if (JSprite.key.pressed('down')) this.move(-t);
  if (JSprite.key.pressed('right')) this.turn(t);
  if (JSprite.key.pressed('left')) this.turn(-t);
}
JSprite.start();
