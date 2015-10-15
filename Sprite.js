var JSprite = function jsp (init,img) {
  if(!fabric) throw new ReferenceError('Fabric.js is not here');
  if(!jsp.canvas) throw new ReferenceError('No canvas selected');
  function proto (obj,name,val) {
    obj.prototype[name] = val;
  }
  function prop () {
    Object.defineProperty.apply(this,arguments);
  }
  function id (ref) {
    return document.getElementById(ref);
  }
  var out = function self () {
    this.rawx = 0;
    this.rawy = 0;
    this.img = img || 'platypus';
    self.img = this.img;
    self.init.apply(this, arguments);
    self.clones.push(this);
    this.raw = new fabric.Image(id(this.img));
    jsp.canvas.add(this.raw);
  };
  prop(out.prototype,'x',{
    get:function () {
      return this.rawx
    },
    set:function (val) {
      this.rawx = val;
      if(this.raw) this.raw.set('left', v + jsp.canvas.width/2);
    }
  });
  prop(out.prototype,'y',{
    get:function () {
      return this.rawy
    },
    set:function (val) {
      this.rawy = val;
      if(this.raw) this.raw.set('top', val + jsp.canvas.height/2);
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
  return out;
}
Object.defineProperty(JSprite,'frame',{
  set:function (v) {
    JSprite.canvas = new fabric.Canvas(v);
  }
});
Object.defineProperty(JSprite,'render',{
  get:function () {
    return JSprite.canvas.renderAll();
  }
});
