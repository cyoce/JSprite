var JSprite = function jsp (init,img) {
  function proto (obj,name,val) {
    obj.prototype[name] = val;
  }
  function prop () {
    Object.defineProperty.apply(this,arguments);
  }
  function id (ref) {
    return document.getElementById(ref);
  }
  var out = function self () { //constructor function for sprite object
    this.rawx = 0;
    this.rawy = 0;
    this.img = img || 'tinyplatypus';
    self.img = this.img;
    this.raw = new fabric.Image(id(this.img));
    self.init.apply(this, arguments);
    self.clones.push(this);
    jsp.canvas.add(this.raw);
  };
  prop(out.prototype,'x',{
    get:function () {
      return this.rawx
    },
    set:function (val) {
      this.rawx = val;
      if(this.raw) this.raw.set('left',jsp.canvas.width/2 + (val - this.raw.width * 0.5));
      jsp.canvas.renderAll();
    }
  });
  prop(out.prototype,'y',{
    get:function () {
      return this.rawy
    },
    set:function (val) {
      this.rawy = val;
      if(this.raw) this.raw.set('top',jsp.canvas.height/2 - (val + this.raw.height * 0.5));
      jsp.canvas.renderAll();
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
  set:function (v) {
    JSprite.canvas = new fabric.Canvas(v);
  }
});
Object.defineProperty(JSprite,'render',{
  get:function () {
    return JSprite.canvas.renderAll();
  }
});
