var JSprite = function jsp (init,img) {
  function proto (obj,name,val) {
    obj.prototype[name] = val;
  }
  function prop () {
    Object.defineProperty.apply(this,arguments);
  }
  var id = ref => document.getElementById(ref);
  var out = function self () { //constructor function for sprite object
    this.rawx = 0;
    this.rawy = 0;
    this.rawangle = 90;
    this.img = img || 'tinyplatypus';
    self.img = this.img;
    this.raw = new fabric.Image(id(this.img));
    self.init.apply(this, arguments);
    self.clones.push(this);
    jsp.canvas.add(this.raw);
  };
  prop(out.prototype,'x',{
    get:() => this.rawx,
    set:function (val) {
      this.rawx = val;
      if(this.raw) this.raw.set('left',jsp.canvas.width/2 + (val - jsp.math.sin(this.angle) * this.raw.width/2));
      jsp.render;
    }
  });
  prop(out.prototype,'y',{
    get:() => this.rawy,
    set:function (val) {
      this.rawy = val;
      if(this.raw) this.raw.set('top',jsp.canvas.height/2 - (val + this.raw.height * 0.5));
      jsp.render;
    }
  });
  prop(out.prototype,'angle',{
    get:()=> this.rawangle,
    set: function (val) {
      this.rawangle = val;
      this.raw.set('angle',val);
      jsp.render;
    }
  });
  out.init   = init;
  out.img    = img;
  out.clones = [];
  proto(out,'goto',function (a,b) {
    var x,y;
    if(a.x !== undefined){
      x = a.x, y = a.y;
    } else {
      x = a, y = b;
    }
    this.x = x;
    this.y = y;
  });
  proto(out,'add',function () {
    jsp.canvas.add(this.raw);
  })
  return out;
}
Object.defineProperty(JSprite,'frame',{
  set:v => JSprite.canvas = new fabric.Canvas(v)
});
Object.defineProperty(JSprite,'render',{
  get:() => Sprite.canvas.renderAll()
});
JSprite.math = {
  sin: angle => Math.sin(angle * Math.PI/180)
};
