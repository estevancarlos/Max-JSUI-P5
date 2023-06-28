outlets = 2;
sketch.default2d();

function map(value, sourceRangeMin, sourceRangeMax, targetRangeMin, targetRangeMax) {
    var targetRange = targetRangeMax - targetRangeMin;
    var sourceRange = sourceRangeMax - sourceRangeMin;
    return (value - sourceRangeMin) * targetRange / sourceRange + targetRangeMin;
}

// INIT BROKEN
function init(){
    with(sketch) {
        var width = 700;
        var height = 400;

        if( width > height) {
            var remainder = width - height;
            var formula1 = remainderHalf / (height/2);
        } else if(width < height) {
            var remainder = height - width;
            var formula1 = remainderHalf / (width/2);
        } else {
            var remainder = 0;
        }
        
        var remainderHalf = remainder/2;
        //var formula1 = remainderHalf / (height/2);
        
        post("form: " + ((formula1 + 1) * -1));
    
        gltranslate(((formula1 + 1) * -1),1,0);
        notifyclients(); 
    }
}



var p = {
    width : 100,
    height : 100,
    minXVal : 0,

    rectPointx : function(w) {
        var xpos = w * 0.5;
        return xpos;
    },

    size : function(w,h) {
        this.width = w;
        this.height = h;
        var sizeArr = [w,h];
        outlet(1,sizeArr);
    },

    init : function() {
        with(sketch) {
            var width = this.width;
            var height = this.height;
            var remainder = width - height;
            var remainderHalf = remainder/2;
            var formula1 = remainderHalf / (height/2);
            //post("form: " + ((formula1 + 1) * -1));
        
            this.minXVal = ((formula1 + 1) * -1);

            gltranslate(((formula1 + 1) * -1),1,0);
            notifyclients(); 
        }
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

    rectTest : function(x, y, w, h) {
        var _xreset = this.map(this.width - (this.width / 2), this.width - (this.width / 2), 0, -1.0, 1.0);
        var _xposadjust = this.map(x, 0.0, this.width / 2, 0.0, 1.0);

        var _yreset = this.map(this.height - (this.height / 2), this.height - (this.height / 2), 0, 1.0, -1.0);
        var _yposadjust = this.map(y, 0.0, this.height / 2, 0.0, 1.0);

        var _widthadjust = this.map(w, 0, this.width, 0.0, 1.0);
        var _heightadjust = this.map(h, 0, this.height, 0.0, 1.0);


        with(sketch) {
              
            var targetXMax = (p.width/100) / 2;
            var newX = map(x, 0, p.width, 0, targetXMax);


            var targetYMax = ((p.height/2) / 100) * -1;
            var newY = map(y, 0, p.height, 0, targetYMax);
            post(targetYMax);

            moveto(newX, newY);
            //moveto(_xposadjust + (_xreset + _widthadjust), ((_yposadjust + (_heightadjust/2)) * -1) + (_yreset - _heightadjust + 0.005)); // CORNER Mode
            //plane(_widthadjust, _heightadjust, _widthadjust, _heightadjust);
            plane(w, h, w, h);
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

    translate : function(x,y,z) {
        with(sketch) {
            gltranslate(x,y,z);
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

//init();
p.size(800,400);
p.init();

function draw() {
    //p.rectMode("CORNER");
    
    p.smooth();
    p.fill(40, 75, 255, 255);

    //p.translate(-1,0,0);
    p.rectTest(200, 200, 0.1, 0.1);
    refresh();

    /*
    with(sketch) {
        var targetMax = (p.width/100) / 2;

        var newX = map(800, 0, p.width, 0, targetMax);
        post(newX);

        moveto(newX, 0);
        plane(0.1, 0.1, 0.1, 0.1);
        refresh();
    }
    */
}

function bang() {
    refresh();
    p.clear();
    notifyclients(); 
    draw(); 
	
}
