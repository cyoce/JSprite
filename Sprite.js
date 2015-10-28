var JSprite = function jsp (a,b,c) {
  var init = function (x,y){
    this.goto(x,y);
  };
  var update = function (t){

  };
  var img = '';
  if (typeof a === 'object'){
    if ('init'   in a) init = a.init;
    if ('update' in a) update = a.update;
    if ('image'  in a) img = a.image;
  } else {
    init   = a || init;
    update = b || update;
    img    = c || img;
  }
  function Img (v) {
    if (v[0] === '#'){
      return new fabric.Image(id(v.substring(1,v.length)))
    }
    return new fabric.Image.fromURL(v);
  }
  var math = jsp.math;
  function proto (obj,name,val) {
    obj.prototype[name] = val;
  }
  function prop () {
    Object.defineProperty.apply(this, arguments);
  }
  var id  = ref => document.getElementById(ref);
  var out = function self () { //constructor function for sprite object
    console.log(img);
    this.image = img || '#tinyplatypus';
    self.img = this.img = img;
    this.x = this.y = this.angle = 0;
    self.init.apply(this, arguments);
    self.clones.push(this);
    jsp.frame.add(this.raw);
  };
  proto(out,'rawx',0);
  proto(out,'rawy',0);
  proto(out,'rawangle',90);
  proto(out,'updatepos',function () {
    this.goto(this.x,this.y);
    this.angle = this.angle;
  });
  prop(out.prototype,'image',{
    get:function () {
      return this.img;
    },
    set:function (val) {
      this.img = val;
      if (typeof this.raw !== 'undefined'){
        jsp.canvas.remove(this.raw);
        jsp.canvas.remove(this.raw);
      }
      this.raw = Img(val);
      this.raw.set({
        originX: 'center',
        originY: 'center',
        left:    this.raw.getLeft(),
        top:     this.raw.getTop(),
        angle:   this.raw.getAngle()
      });
      this.add();
      this.updatepos();
      jsp.render;
    }
  });
  prop(out.prototype,'x',{
    get:function () {
      return this.rawx;
    },
    set:function (val) {
      this.rawx = val;
      if(typeof this.raw !== 'undefined'){
        this.raw.set('left',jsp.frame.width/2 + val);
      }
      jsp.render;
    }
  });
  prop(out.prototype,'y',{
    get:function () {
      return this.rawy;
    },
    set:function (val) {
      this.rawy = val;
      if(typeof this.raw !== 'undefined'){
        this.raw.set('top',jsp.frame.height/2 - val);
      }
      jsp.render;
    }
  });
  prop(out.prototype,'angle',{
    get:function () {
      return this.rawangle;
    },
    set: function (val) {
      this.rawangle = math.mod(val,360);
      this.raw.set('angle',val);
      jsp.render;
    }
  });
  out.init   = init;
  out.img    = img;
  out.clones = [];
  proto(out,'goto',function (a,b) {
    var x,y;
    if(typeof a.x !== 'undefined'){
      x = a.x, y = a.y;
    } else {
      x = a, y = b;
    }
    this.x = x;
    this.y = y;
    return this;
  });
  proto(out,'point',function (a,b){
    var x,y;
    if (typeof a === 'object'){
      x = a.x;
      y = a.y;
    } else if (typeof b === 'number'){
      x = a;
      y = b;
    } else {
      this.angle = a;
      return this;
    }
    return this;
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
    JSprite.canvas.renderAll();
  }
});
JSprite.pending = false;
JSprite.requestRender = function () {
  if(JSprite.pending) clearTimeout(JSprite.pending);
  JSprite.pending = setTimeout(function () {
    JSprite.pending = false;
    JSprite.canvas.renderAll();
    console.log('render');
  },1);
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
