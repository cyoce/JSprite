JSprite.frame = 'viewer';
var Platypus = JSprite({
  init:function (name,x,y) {
    this.goto(x || 0, y || 0)
    this.name = name;
    this.keydown[' '] = function () {
      if(this.id === 0) this.update = this.move;
    };
    this.keyup  [' '] = function () {
      if(this.id === 0) this.update = this.turn;
    }
  },
  image: '#platypus'
});
var platy = new Platypus('Patty',0,0);
var cyoce = new Platypus('Ryan',100,-50);
cyoce.image = '#tinyplatypus';
cyoce.angle += 20;
