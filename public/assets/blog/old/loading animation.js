(function (lib, img, cjs, ss, an) {
  var p; // shortcut to reference prototypes
  lib.webFontTxtInst = {};
  var loadedTypekitCount = 0;
  var loadedGoogleCount = 0;
  var gFontsUpdateCacheList = [];
  var tFontsUpdateCacheList = [];
  lib.ssMetadata = [];

  lib.updateListCache = function (cacheList) {
    for (var i = 0; i < cacheList.length; i++) {
      if (cacheList[i].cacheCanvas) cacheList[i].updateCache();
    }
  };

  lib.addElementsToCache = function (textInst, cacheList) {
    var cur = textInst;
    while (cur != exportRoot) {
      if (cacheList.indexOf(cur) != -1) break;
      cur = cur.parent;
    }
    if (cur != exportRoot) {
      var cur2 = textInst;
      var index = cacheList.indexOf(cur);
      while (cur2 != cur) {
        cacheList.splice(index, 0, cur2);
        cur2 = cur2.parent;
        index++;
      }
    } else {
      cur = textInst;
      while (cur != exportRoot) {
        cacheList.push(cur);
        cur = cur.parent;
      }
    }
  };

  lib.gfontAvailable = function (family, totalGoogleCount) {
    lib.properties.webfonts[family] = true;
    var txtInst = (lib.webFontTxtInst && lib.webFontTxtInst[family]) || [];
    for (var f = 0; f < txtInst.length; ++f)
      lib.addElementsToCache(txtInst[f], gFontsUpdateCacheList);

    loadedGoogleCount++;
    if (loadedGoogleCount == totalGoogleCount) {
      lib.updateListCache(gFontsUpdateCacheList);
    }
  };

  lib.tfontAvailable = function (family, totalTypekitCount) {
    lib.properties.webfonts[family] = true;
    var txtInst = (lib.webFontTxtInst && lib.webFontTxtInst[family]) || [];
    for (var f = 0; f < txtInst.length; ++f)
      lib.addElementsToCache(txtInst[f], tFontsUpdateCacheList);

    loadedTypekitCount++;
    if (loadedTypekitCount == totalTypekitCount) {
      lib.updateListCache(tFontsUpdateCacheList);
    }
  };
  // symbols:

  (lib.Tween17 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer 1
    this.shape = new cjs.Shape();
    this.shape.graphics.f('#0B5B96').s().p('Ao6hYILlhWIGQEHIrlBWg');

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-57.1, -17.5, 114.3, 35.1);

  (lib.Tween16 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer 1
    this.shape = new cjs.Shape();
    this.shape.graphics.f('#05396C').s().p('Ao6hYILlhWIGQEHIrlBWg');

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-57.1, -17.5, 114.3, 35.1);

  (lib.Tween15 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer 1
    this.shape = new cjs.Shape();
    this.shape.graphics.f('#031F4B').s().p('Ao6hYILlhWIGQEHIrlBWg');

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-57.1, -17.5, 114.3, 35.1);

  (lib.Tween14 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer 1
    this.shape = new cjs.Shape();
    this.shape.graphics.f('#031F4B').s().p('Ao6hYILlhWIGQEHIrlBWg');

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-57.1, -17.5, 114.3, 35.1);

  (lib.Tween13 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer 1
    this.shape = new cjs.Shape();
    this.shape.graphics.f('#031F4B').s().p('Ao6hYILlhWIGQEHIrlBWg');

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-57.1, -17.5, 114.3, 35.1);

  (lib.Tween12 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer 1
    this.shape = new cjs.Shape();
    this.shape.graphics.f('#05396C').s().p('Ao6hYILlhWIGQEHIrlBWg');

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-57.1, -17.5, 114.3, 35.1);

  (lib.Tween11 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer 1
    this.shape = new cjs.Shape();
    this.shape.graphics.f('#05396C').s().p('Ao6hYILlhWIGQEHIrlBWg');

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-57.1, -17.5, 114.3, 35.1);

  (lib.Tween10 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer 1
    this.shape = new cjs.Shape();
    this.shape.graphics.f('#0B5B96').s().p('Ao6hYILlhWIGQEHIrlBWg');

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-57.1, -17.5, 114.3, 35.1);

  (lib.Tween9 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer 1
    this.shape = new cjs.Shape();
    this.shape.graphics.f('#0B5B96').s().p('Ao6hYILlhWIGQEHIrlBWg');

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-57.1, -17.5, 114.3, 35.1);

  (lib.Tween8 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer 1
    this.shape = new cjs.Shape();
    this.shape.graphics.f('#6497B1').s().p('Ao6hYILlhWIGQEHIrlBWg');

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-57.1, -17.5, 114.3, 35.1);

  (lib.Tween7 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer 1
    this.shape = new cjs.Shape();
    this.shape.graphics.f('#6497B1').s().p('Ao6hYILlhWIGQEHIrlBWg');

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-57.1, -17.5, 114.3, 35.1);

  (lib.Tween2 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer 1
    this.shape = new cjs.Shape();
    this.shape.graphics.f('#B3CDE0').s().p('Ao6hYILlhWIGQEHIrlBWg');

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-57.1, -17.5, 114.3, 35.1);

  (lib.Tween1 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer 1
    this.shape = new cjs.Shape();
    this.shape.graphics.f('#B3CDE0').s().p('Ao6hYILlhWIGQEHIrlBWg');

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-57.1, -17.5, 114.3, 35.1);

  // stage content:
  (lib.loadinganimation = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // lightblue
    this.instance = new lib.Tween1('synched', 0);
    this.instance.parent = this;
    this.instance.setTransform(86.1, 124);

    this.instance_1 = new lib.Tween2('synched', 0);
    this.instance_1.parent = this;
    this.instance_1.setTransform(86.1, 28);
    this.instance_1._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance)
        .to({ _off: true, y: 28 }, 7)
        .wait(40)
        .to({ _off: false, y: 124 }, 6)
        .wait(1),
    );
    this.timeline.addTween(
      cjs.Tween.get(this.instance_1)
        .to({ _off: false }, 7)
        .wait(20)
        .to({ startPosition: 0 }, 0)
        .wait(20)
        .to({ startPosition: 0 }, 0)
        .to({ _off: true, y: 124 }, 6)
        .wait(1),
    );

    // perlblue
    this.instance_2 = new lib.Tween8('synched', 0);
    this.instance_2.parent = this;
    this.instance_2.setTransform(86.1, 136.6);

    this.instance_3 = new lib.Tween7('synched', 0);
    this.instance_3.parent = this;
    this.instance_3.setTransform(86.1, 134.5);
    this.instance_3._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_2)
        .to({ _off: true }, 5)
        .to({ _off: false, y: 38.6 }, 7)
        .wait(15)
        .to({ startPosition: 0 }, 0)
        .wait(15)
        .to({ startPosition: 0 }, 0)
        .to({ y: 136.6 }, 7)
        .wait(4)
        .to({ startPosition: 0 }, 0)
        .wait(1),
    );
    this.timeline.addTween(
      cjs.Tween.get(this.instance_3)
        .wait(5)
        .to({ _off: false }, 0)
        .to({ _off: true, y: 38.6 }, 7)
        .wait(42),
    );

    // darkblue
    this.shape = new cjs.Shape();
    this.shape.graphics.f('#0B5B96').s().p('Ao6hYILlhWIGQEHIrlBWg');
    this.shape.setTransform(86.1, 146.1);

    this.instance_4 = new lib.Tween9('synched', 0);
    this.instance_4.parent = this;
    this.instance_4.setTransform(86.1, 146.1);
    this.instance_4._off = true;

    this.instance_5 = new lib.Tween10('synched', 0);
    this.instance_5.parent = this;
    this.instance_5.setTransform(86.1, 50.1);
    this.instance_5._off = true;

    this.instance_6 = new lib.Tween17('synched', 0);
    this.instance_6.parent = this;
    this.instance_6.setTransform(86.1, 146.1);

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({ state: [{ t: this.shape }] })
        .to({ state: [{ t: this.instance_4 }] }, 10)
        .to({ state: [{ t: this.instance_5 }] }, 7)
        .to({ state: [{ t: this.instance_5 }] }, 10)
        .to({ state: [{ t: this.instance_5 }] }, 10)
        .to({ state: [{ t: this.instance_6 }] }, 7)
        .to({ state: [{ t: this.instance_6 }] }, 9)
        .wait(1),
    );
    this.timeline.addTween(
      cjs.Tween.get(this.instance_4)
        .wait(10)
        .to({ _off: false }, 0)
        .to({ _off: true, y: 50.1 }, 7)
        .wait(37),
    );
    this.timeline.addTween(
      cjs.Tween.get(this.instance_5)
        .wait(10)
        .to({ _off: false }, 7)
        .wait(10)
        .to({ startPosition: 0 }, 0)
        .wait(10)
        .to({ startPosition: 0 }, 0)
        .to({ _off: true, y: 146.1 }, 7)
        .wait(10),
    );

    // semidark
    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics.f('#05396C').s().p('Ao6hYILlhWIGQEHIrlBWg');
    this.shape_1.setTransform(86.1, 155.5);

    this.instance_7 = new lib.Tween11('synched', 0);
    this.instance_7.parent = this;
    this.instance_7.setTransform(86.1, 155.5);
    this.instance_7._off = true;

    this.instance_8 = new lib.Tween12('synched', 0);
    this.instance_8.parent = this;
    this.instance_8.setTransform(86.1, 60.5);
    this.instance_8._off = true;

    this.instance_9 = new lib.Tween16('synched', 0);
    this.instance_9.parent = this;
    this.instance_9.setTransform(86.1, 155.5);

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({ state: [{ t: this.shape_1 }] })
        .to({ state: [{ t: this.instance_7 }] }, 15)
        .to({ state: [{ t: this.instance_8 }] }, 7)
        .to({ state: [{ t: this.instance_8 }] }, 5)
        .to({ state: [{ t: this.instance_8 }] }, 5)
        .to({ state: [{ t: this.instance_9 }] }, 7)
        .to({ state: [{ t: this.instance_9 }] }, 14)
        .wait(1),
    );
    this.timeline.addTween(
      cjs.Tween.get(this.instance_7)
        .wait(15)
        .to({ _off: false }, 0)
        .to({ _off: true, y: 60.5 }, 7)
        .wait(32),
    );
    this.timeline.addTween(
      cjs.Tween.get(this.instance_8)
        .wait(15)
        .to({ _off: false }, 7)
        .wait(5)
        .to({ startPosition: 0 }, 0)
        .wait(5)
        .to({ startPosition: 0 }, 0)
        .to({ _off: true, y: 155.5 }, 7)
        .wait(15),
    );

    // dark
    this.shape_2 = new cjs.Shape();
    this.shape_2.graphics.f('#031F4B').s().p('Ao6hYILlhWIGQEHIrlBWg');
    this.shape_2.setTransform(86.1, 165);

    this.instance_10 = new lib.Tween13('synched', 0);
    this.instance_10.parent = this;
    this.instance_10.setTransform(86.1, 165);
    this.instance_10._off = true;

    this.instance_11 = new lib.Tween14('synched', 0);
    this.instance_11.parent = this;
    this.instance_11.setTransform(86.1, 72);
    this.instance_11._off = true;

    this.instance_12 = new lib.Tween15('synched', 0);
    this.instance_12.parent = this;
    this.instance_12.setTransform(86.1, 165);

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({ state: [{ t: this.shape_2 }] })
        .to({ state: [{ t: this.instance_10 }] }, 20)
        .to({ state: [{ t: this.instance_11 }] }, 7)
        .to({ state: [{ t: this.instance_12 }] }, 7)
        .to({ state: [{ t: this.instance_12 }] }, 19)
        .wait(1),
    );
    this.timeline.addTween(
      cjs.Tween.get(this.instance_10)
        .wait(20)
        .to({ _off: false }, 0)
        .to({ _off: true, y: 72 }, 7)
        .wait(27),
    );
    this.timeline.addTween(
      cjs.Tween.get(this.instance_11)
        .wait(20)
        .to({ _off: false }, 7)
        .to({ _off: true, y: 165 }, 7)
        .wait(20),
    );

    // bg
    this.shape_3 = new cjs.Shape();
    this.shape_3.graphics.f().s('#000000').ss(1, 1, 1).p('A0n18MApPAAAMAAAAr5MgpPAAAg');
    this.shape_3.setTransform(85, 100.5);

    this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(54));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(39.6, 58.1, 266, 283);
  // library properties:
  lib.properties = {
    width: 175,
    height: 198,
    fps: 24,
    color: '#FFFFFF',
    opacity: 1.0,
    webfonts: {},
    manifest: [],
    preloads: [],
  };
})(
  (lib = lib || {}),
  (images = images || {}),
  (createjs = createjs || {}),
  (ss = ss || {}),
  (AdobeAn = AdobeAn || {}),
);
var lib, images, createjs, ss, AdobeAn;
