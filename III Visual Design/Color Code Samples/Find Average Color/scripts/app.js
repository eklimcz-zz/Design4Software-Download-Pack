var canvas1 = document.getElementById('can1');
var ctx1 = canvas1.getContext('2d');

var canvas2 = document.getElementById('can2');
var ctx2 = canvas2.getContext('2d');

var canvas3 = document.getElementById('can3');
var ctx3 = canvas3.getContext('2d');

var canvas4 = document.getElementById('can4');
var ctx4 = canvas4.getContext('2d');


var loader =  new PxLoader(),
img1 = loader.addImage('img/1.jpeg'),
img2 = loader.addImage('img/2.jpeg'),
img3 = loader.addImage('img/3.jpeg'),
img4 = loader.addImage('img/4.jpeg');

loader.start();

loader.addCompletionListener(function () {
	
	 ctx1.drawImage(img1, 0, 0);
	 ctx2.drawImage(img2, 0, 0);
	 ctx3.drawImage(img3, 0, 0);
	 ctx4.drawImage(img4, 0, 0);	 
	 
	init();
});

function init(){

	var colors, avg, bright, hue;

	
 	colors = getColorFromCanvas(canvas1);	
 	
	avg = document.getElementById('avg1');
	avg.style.backgroundColor = 'rgb('+ colors.r + ',' + colors.g + ',' + colors.b + ')';


	//image 2
 	colors = getColorFromCanvas(canvas2);	

	avg = document.getElementById('avg2');
	avg.style.backgroundColor = 'rgb('+ colors.r + ',' + colors.g + ',' + colors.b + ')';


	//image 3
	colors = getColorFromCanvas(canvas3);	

	avg = document.getElementById('avg3');
	avg.style.backgroundColor = 'rgb('+ colors.r + ',' + colors.g + ',' + colors.b + ')';
	
	//image 4
	colors = getColorFromCanvas(canvas4);	
 	
	avg = document.getElementById('avg4');
	avg.style.backgroundColor = 'rgb('+ colors.r + ',' + colors.g + ',' + colors.b + ')';


};

function getColorFromCanvas(canvas){
	
	var ctx = canvas.getContext('2d');
	var w = canvas.width;
	var h = canvas.height;
	
	var idata = ctx.getImageData(0,0,w,h);
    var data = idata.data;

    var tr = 0;
    var tg = 0;
    var tb = 0;
	var dict = new Array();
	var maxB = 0;
	var maxL = 0;
	
	var avgColor;
	var brightestColor;
	var strongestHue;
	
  	for(var i = 0; i < data.length; i+=4) {     
    
	    var r = data[i];
	    var g = data[i+1];
	    var b = data[i+2];
		
		//avgColor			    
		tr += r;
		tg += g;
		tb += b;
				
 	}
	
    var avgR = Math.floor((tr / ( w * h)));
    var avgG = Math.floor((tg / (w * h)));
    var avgB = Math.floor((tb / (w * h)));
	
	avgColor = {
		'r': avgR,
		'g': avgG,
		'b': avgB
	};
	
	return avgColor;
};



function rgbToHsv(r, g, b){
    var initR = r,
    initG = g,
    initB = b;
    
    r = r/255, g = g/255, b = b/255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max == 0 ? 0 : d / max;

    if(max == min){
        h = 0; // achromatic
    }else{
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
	var map = {
		'r' : initR,
		'g' : initG,
		'b' : initB,
		'h' : h,
		's' : s,
		'v' : v
		
	};
    return map;
}

function rgbToHsl(r, g, b){
    var initR = r,
    initG = g,
    initB = b;

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    var map = {
		'r' : initR,
		'g' : initG,
		'b' : initB,
		'h' : h,
		's' : s,
		'l' : l
		
	};
    return map;

}


