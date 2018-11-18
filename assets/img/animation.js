(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.webFontTxtInst = {};
var loadedTypekitCount = 0;
var loadedGoogleCount = 0;
var gFontsUpdateCacheList = [];
var tFontsUpdateCacheList = [];
lib.ssMetadata = [];



lib.updateListCache = function (cacheList) {
	for(var i = 0; i < cacheList.length; i++) {
		if(cacheList[i].cacheCanvas)
			cacheList[i].updateCache();
	}
};

lib.addElementsToCache = function (textInst, cacheList) {
	var cur = textInst;
	while(cur != exportRoot) {
		if(cacheList.indexOf(cur) != -1)
			break;
		cur = cur.parent;
	}
	if(cur != exportRoot) {
		var cur2 = textInst;
		var index = cacheList.indexOf(cur);
		while(cur2 != cur) {
			cacheList.splice(index, 0, cur2);
			cur2 = cur2.parent;
			index++;
		}
	}
	else {
		cur = textInst;
		while(cur != exportRoot) {
			cacheList.push(cur);
			cur = cur.parent;
		}
	}
};

lib.gfontAvailable = function(family, totalGoogleCount) {
	lib.properties.webfonts[family] = true;
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];
	for(var f = 0; f < txtInst.length; ++f)
		lib.addElementsToCache(txtInst[f], gFontsUpdateCacheList);

	loadedGoogleCount++;
	if(loadedGoogleCount == totalGoogleCount) {
		lib.updateListCache(gFontsUpdateCacheList);
	}
};

lib.tfontAvailable = function(family, totalTypekitCount) {
	lib.properties.webfonts[family] = true;
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];
	for(var f = 0; f < txtInst.length; ++f)
		lib.addElementsToCache(txtInst[f], tFontsUpdateCacheList);

	loadedTypekitCount++;
	if(loadedTypekitCount == totalTypekitCount) {
		lib.updateListCache(tFontsUpdateCacheList);
	}
};
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Bitmap_1_pngcopyai = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Ah3KFQgkgCg2AAIhgABIBWknICLnXICInYQAIgdANgLQAPgMAcACQAkACA2AAIBggBIg4DDQj0M/g8DUQgJAdgNAKQgNALgYAAIgGAAg");
	this.shape.setTransform(118.8,65.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AkPIvQgig4gWgpQgDgGAGgQQAFgNAIgLQBniADQj/IAZghIkelhQg5hHgCgZQgCgZAwhOIBAhpIIbKRIobKRIg9hig");
	this.shape_1.setTransform(186.1,65.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AlNAAIIcqRIB/DRIlsHAIFsHBIh/DQg");
	this.shape_2.setTransform(33.4,65.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,219.1,131.5);


(lib.Path_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AE2PzMgQDgi4IGICHMAQSAkEg");
	this.shape.setTransform(71.8,122.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Path_1, new cjs.Rectangle(0,0,143.5,244.5), null);


(lib.Path = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AG6RlMgQngkjIDQBHMAQKAjMIAABqg");
	this.shape.setTransform(62.2,121.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,124.3,243.1), null);


(lib.Path_6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AlCh7IG2heIDPGzg");
	this.shape.setTransform(32.3,21.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Path_6, new cjs.Rectangle(0,0,64.6,43.6), null);


(lib.Symbol4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.Bitmap_1_pngcopyai("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(47.1,45.1,0.456,0.429,0,0,19.8,109.7,65.6);
	this.instance.filters = [new cjs.ColorFilter(0, 0, 0, 1, 255, 255, 255, 0)];
	this.instance.cache(-2,-2,223,136);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol4, new cjs.Rectangle(0,8.4,94,73.6), null);


(lib.Symbol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#1E1E1E").s().p("AgxAAIAAgzIBjA0IAAAzg");
	this.shape.setTransform(9,126);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#181818").s().p("Ax3D6IAE6qMAjrAMfMgAEAhCg");
	this.shape_1.setTransform(155.7,145.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#3F4040").s().p("AyFmPIA0AAMAjXAMYIghAHg");
	this.shape_2.setTransform(157.5,40);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#5C5C5C").s().p("AgOwdIAggHMgAGAhDIgdAGg");
	this.shape_3.setTransform(271.5,185.4);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#6D6E6E").s().p("AhJD8IAApEICTAWIgEJ7g");
	this.shape_4.setTransform(148.8,229);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#5C5C5C").s().p("AgNk8IAfgCIgGJ2IgdAHg");
	this.shape_5.setTransform(157.6,230);

	this.instance = new lib.Path_6();
	this.instance.parent = this;
	this.instance.setTransform(112.4,252.9,1,1,0,0,0,32.3,21.8);
	this.instance.alpha = 0.059;

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#727373").s().p("AlAAxIKBiSIAAAxIqBCSg");
	this.shape_6.setTransform(198.2,285.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#8D8D8D").s().p("AngjlIAAgwIPBH7IAAAwg");
	this.shape_7.setTransform(117.9,267.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#515252").s().p("Ashi3IKOiMIO2H1IqDCTg");
	this.shape_8.setTransform(150.1,258);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#515252").s().p("Ashi3IKOiMIO2H1IqDCTg");
	this.shape_9.setTransform(150.1,262.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#232323").s().p("AnpmJIPUjUIAAPsIvTDPg");
	this.shape_10.setTransform(68.1,160.7);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2D2D2D").s().p("ApJA3IPVjSIC+BkIvUDTg");
	this.shape_11.setTransform(58.6,105.7);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#474748").s().p("AhegXIAAg0IC9BkIAAAzg");
	this.shape_12.setTransform(9.5,126.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#383838").s().p("AhdHCIgCvoIC+BlIABPog");
	this.shape_13.setTransform(9.6,166.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.instance},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(0,0,273.4,295.3), null);


(lib.screen = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.Path();
	this.instance.parent = this;
	this.instance.setTransform(158.2,154.5,1,1,0,0,0,62.1,121.5);
	this.instance.alpha = 0.219;

	this.instance_1 = new lib.Path_1();
	this.instance_1.parent = this;
	this.instance_1.setTransform(116.9,137.6,1,1,0,0,0,71.8,122.2);
	this.instance_1.alpha = 0.281;

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00ADEE").s().p("AxNDtIAE5RMAiXAL2IgEfTg");
	this.shape.setTransform(110.2,138.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.screen, new cjs.Rectangle(0,0,220.4,276.2), null);


// stage content:
(lib.animation = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 4
	this.instance = new lib.Symbol4();
	this.instance.parent = this;
	this.instance.setTransform(421.2,132.1,1,1,7.4,0,0,47.1,45.2);
	this.instance._off = true;
	this.instance.filters = [new cjs.BlurFilter(255, 255, 1)];
	this.instance.cache(-2,6,98,78);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(23).to({_off:false},0).wait(11));

	// Layer 2
	this.instance_1 = new lib.screen();
	this.instance_1.parent = this;
	this.instance_1.setTransform(127.6,236.6,1,1,0,0,0,110.2,138.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({x:430.6,y:145.6},23).wait(11));

	// Artboard 10.svg
	this.instance_2 = new lib.Symbol1();
	this.instance_2.parent = this;
	this.instance_2.setTransform(412.4,149.7,1,1,0,0,0,136.7,147.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(34));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(292.4,202,531.6,372.6);
// library properties:
lib.properties = {
	width: 550,
	height: 400,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	webfonts: {},
	manifest: [],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;
