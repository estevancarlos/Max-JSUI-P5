sketch.default2d();

var p = {
    width : 100,
    height : 100,

    rectPointx : function(w) {
        var xpos = w * 0.5;
        return xpos;
    },

    size : function(w,h) {
        this.width = w;
        this.height = h;
    },

    rectMode : function(mode) {
        if(mode === "CENTER") {
            return true;
        } else if(mode === "CORNER") {
            return false;
        }
    },

    background : function(r,g,b,a) {
        with(sketch) {
            glmatrixmode("modelview");
            r = r/255.;
            g = g/255.;
            b = b/255.;
            a = a/255.;
            glclearcolor(r, g, b, a);
            glclear();
        }
    },

    clear : function() {
        with(sketch) {
            glclear();
        }
    },

    circle : function(x,y,r) {
        with(sketch) {
            moveto(x,y);
            circle(r);
        }
    },

    circleStroke : function(x,y,r) {
        with(sketch) {
            moveto(x,y);
            framecircle(r);
        }
    },

    rect : function(x, y, w, h) {
        var _xreset = this.map(this.width - (this.width / 2), this.width - (this.width / 2), 0, -1.0, 1.0);
        var _xposadjust = this.map(x, 0.0, this.width / 2, 0.0, 1.0);

        var _yreset = this.map(this.height - (this.height / 2), this.height - (this.height / 2), 0, 1.0, -1.0);
        var _yposadjust = this.map(y, 0.0, this.height / 2, 0.0, 1.0);

        var _widthadjust = this.map(w, 0, this.width, 0.0, 1.0);
        var _heightadjust = this.map(h, 0, this.height, 0.0, 1.0);

        with(sketch) {
            //moveto(_xposadjust + _xreset, (_yposadjust * -1) + _yreset); // CENTER Mode
            moveto(_xposadjust + (_xreset + _widthadjust), ((_yposadjust + (_heightadjust/2)) * -1) + (_yreset - _heightadjust + 0.005)); // CORNER Mode
            plane(_widthadjust, _heightadjust, _widthadjust, _heightadjust);
        }
    },

    ellipse : function(x,y,r1,r2){
        var _xreset = this.map(this.width - (this.width / 2), this.width - (this.width / 2), 0, -1.0, 1.0);
        var _xposadjust = this.map(x, 0.0, this.width / 2, 0.0, 1.0);

        var _yreset = this.map(this.height - (this.height / 2), this.height - (this.height / 2), 0, 1.0, -1.0);
        var _yposadjust = this.map(y, 0.0, this.height / 2, 0.0, 1.0);

        var _widthadjust = this.map(r1, 0, this.width, 0.0, 1.0);
        var _heightadjust = this.map(r2, 0, this.height, 0.0, 1.0);

        with(sketch) {
            //moveto(x, y); 
            moveto(_xposadjust + _xreset, (_yposadjust * -1) + _yreset);
            ellipse(_widthadjust, _heightadjust);
        }
    },

    fill : function(r,g,b,a) {
        with(sketch) {
            var r = r/255.;
            var g = g/255.;
            var b = b/255.;
            var a = a/255.;
            glcolor(r, g, b, a);
        }
    },

    rotateX : function(angle) {
        with(sketch) {
            glrotate(angle, 1, 0, 0);
        }
    },

    rotateY : function(angle) {
        with(sketch) {
            glrotate(angle, 0, 1, 0);
        }
    },

    rotateZ : function(angle) {
        with(sketch) {
            glrotate(angle, 0, 0, 1);
        }

    },

    map : function(value, sourceRangeMin, sourceRangeMax, targetRangeMin, targetRangeMax) {
        var targetRange = targetRangeMax - targetRangeMin;
        var sourceRange = sourceRangeMax - sourceRangeMin;
        return (value - sourceRangeMin) * targetRange / sourceRange + targetRangeMin;
    },
    
    sin : function(x) {
        return Math.sin(x);
    },
    
    cos : function(x) {
        return Math.cos(x);
    },

    smooth : function() {
        with(sketch) {
            glenable("line_smooth");
        }
    }
}

function draw() {
    p.size(480,480);
    p.clear();
    p.smooth();
    p.fill(248, 236, 214, 255);
    p.rect(50, 200, 100, 50);
}

function bang() {
  notifyclients();
	draw();
	refresh();
}
