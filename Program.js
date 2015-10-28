JSprite.frame = 'viewer';
var Platypus = JSprite({
  init:function (name,x,y) {
    this.goto(x || 0, y || 0)
    this.name = name;
  },
  image: '#platypus'
});
var platy = new Platypus('Patty',0,0);
