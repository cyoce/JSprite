var JSprite = function jsp (init,img) {
  var math = jsp.math;
  function proto (obj,name,val) {
    obj.prototype[name] = val;
  }
  function prop () {
    Object.defineProperty.apply(this, arguments);
  }
  var id  = ref => document.getElementById(ref);
  var out = function self () { //constructor function for sprite object
    this.rawx = 0;
    this.rawy = 0;
    this.rawangle = 90;
    this.img = img || 'tinyplatypus';
    self.img = this.img;
    this.raw = new fabric.Image(id(this.img));
    this.x = this.y = this.angle = 0;
    self.init.apply(this, arguments);
    self.clones.push(this);
    jsp.frame.add(this.raw);
  };
  prop(out.prototype,'x',{
    get:function () {
      return this.rawx;
    },
    set:function (val) {
      this.rawx = val;
      var newx = this.raw.width/2
      if(this.raw) this.raw.set('left',jsp.frame.width/2 + (val - newx));
      jsp.render;
    }
  });
  prop(out.prototype,'y',{
    get:function () {
      return this.rawy;
    },
    set:function (val) {
      this.rawy = val;
      var newy = this.raw.height / 2;
      if(this.raw) this.raw.set('top',jsp.frame.height/2 - (val + newy));
      jsp.render;
    }
  });
  prop(out.prototype,'angle',{
    get:function () {
      return this.rawangle;
    },
    set: function (val) {
      this.rawangle = mod(val,360);
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
    jsp.frame.add(this.raw);
  });
  return out;
}
Object.defineProperty(JSprite,'frame',{
  get: _ => JSprite.canvas,
  set: v => JSprite.canvas = new fabric.Canvas(v)
});
Object.defineProperty(JSprite,'render',{
  get:function () {
    JSprite.requestRender();
  }
});
JSprite.pending = false;
JSprite.requestRender = function () {
  if(JSprite.pending) clearTimeout(JSprite.pending);
  JSprite.pending = setTimeout(function () {
    JSprite.pending = false;
    JSprite.canvas.renderAll();
  },0);
};
JSprite.math = {
  deg:  radians => radians * 180 / Math.PI,
  rad:  degrees => degrees * Math.PI / 180,
  sin:  angle   => Math.sin(JSprite.math.rad(angle)),
  cos:  angle   => Math.cos(JSprite.math.rad(angle)),
  tan:  angle   => Math.tan(JSprite.math.rad(angle)),
  asin: slope   => JSprite.math.deg(Math.asin(slope)),
  acos: slope   => JSprite.math.deg(Math.acos(slope)),
  atan: slope   => JSprite.math.deg(Math.atan(slope)),
  mod:  (x,y)   => (x + y) % y
};
