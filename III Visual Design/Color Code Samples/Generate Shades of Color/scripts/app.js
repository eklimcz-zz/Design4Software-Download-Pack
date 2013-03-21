generateShades();

function generateShades(){
		
	var holder = document.getElementById('container');
	var baseColor = '#66ff66';
	var COUNT = 8;
	
	for(var i=1; i < COUNT; i++){

		//step brightness 
		var color = adjustBrightness(baseColor, i*(100/COUNT));
		
		swatch = document.createElement('div');	    
		swatch.style.backgroundColor = color;		
		holder.appendChild(swatch);				
	}						
};


function adjustBrightness(rgb, amount) {
	
	//convert hex to rgb
    var r = parseInt(rgb.slice(1, 3), 16),
        g = parseInt(rgb.slice(3, 5), 16),
        b = parseInt(rgb.slice(5, 7), 16),
        
        HSL = rgbToHsl(r, g, b), //convert rgb to hsl
        RGB;
        
    //adjust the lightness of the hsl color
    RGB = hslToRgb(HSL[0], HSL[1], amount / 100);
    
    //convert back to rgb and return as css value
	return  'rgb(' + Math.round(RGB[0]) + ','+ Math.round(RGB[1]) + ','+ Math.round(RGB[2]) + ')';  

}





















function rgbToHsl(r, g, b){
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

    return [h, s, l];
}


function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [r * 255, g * 255, b * 255];
}



function hasClass(ele, cls) {
        return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(ele, cls) {
		
        if (!hasClass(ele, cls)){

         	ele.className += " " + cls;

         }
}

function removeClass(ele, cls) {
        if (hasClass(ele, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            ele.className = ele.className.replace(reg, ' ');
        }
}