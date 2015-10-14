function JSprite (init) {
  var newClass = function f() {
    f.init.apply(this, arguments);
  };
  newClass.init = init;
  return newClass;
}
Object.defineProperty(JSprite,'frame',{
  set:function (v) {
    JSprite.canvas = new fabric.Canvas(v);
  }
});
