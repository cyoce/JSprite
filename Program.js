JSprite.frame = 'viewer';
var Platypus = JSprite({
  init:function (name,x,y) {
    this.goto(x || 0, y || 0)
    this.name = name;
    this .onmousedown = function (pos) {
      console.log([pos.x,pos.y]);
    }
  },
  image: '#platypus'
});
var platy = new Platypus('Patty',0,0);
var cyoce = new Platypus('Ryan',100,-50);
cyoce.image = '#tinyplatypus';
cyoce.angle += 20;
