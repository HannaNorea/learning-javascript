/*  Animation of leaves with Scrollmagic library
    Course: Software for Media designers 2017 @ Aalto university 
    Hanna Thenor Årström 
    INSTRUCTION: Scroll slower to see more leaves!
*/

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");



// Function that generates and returns the leaf image
function generateImage(){
    var img = document.createElement("img");
    img.setAttribute("src", "http://pngimg.com/uploads/autumn_leaves/autumn_leaves_PNG3571.png");
    img.setAttribute("width", "50");
    img.setAttribute("height", "40");
      
    return img;
}

// Declaring variables for creation of the leaf animation
var max = 1200; //Max and min value for y coordinates 
var min = 200;
var radius = 200; //The radius of the circle that contains the leaves

var leaves =[]; //Array to store leaves

var xSave = []; //Arrays for the x & y coordinates that goes inside the circle
var ySave = [];

var width = canvas.width;
var height = canvas.height;

//Function that calculates the distance from the origin to a coordinate
function distance(x1,y1,x2,y2) {
            
    var a = Math.pow(x2 - x1,2);
    var b = Math.pow(y2 - y1,2);

    var dist = Math.sqrt(a + b);
    return dist;   
}

// Creating an array with leaves that goes within the circle
for(var i=0;i<1000;i++){
    //Random x and y value
    var x = Math.random()*width;
    var y = Math.floor(Math.random()*(max-min+1)+min);
   
    // Saving leaves and their coordinates if they are within the circle  
    if(distance(width/2, height/2,x, y)<radius) {
        leaves.push(generateImage());
        xSave.push(Math.round(x));
        ySave.push(Math.round(y));
    }
}
  
//(Checking how many leaves that were saved in console)
//console.log("xSave",xSave.length,"ySave",ySave.length,"leaves",leaves.length);

//Initialize Scrollmagic controller
var controller = new ScrollMagic.Controller();

// TweenMax can tween any property of any object. We use this object to cycle through the array
var obj = {index: 0};

// Create tween 
var tween = TweenMax.to(obj, 10,
		{   index: leaves.length -1,
            roundProps: "index",
			ease: Linear.easeNone,
            repeat: 1,
            onUpdate: function(){
                // Tweenmax iterates through the array of leaves and draws them on the canvas at the given coordinates
                ctx.drawImage(leaves[obj.index], xSave[obj.index],ySave[obj.index], 50, 40);
            }
		}
);            

// Create the scene
var springScene = new ScrollMagic.Scene({triggerElement: '#trigger', duration: 1200})
        .setTween(tween)
        .setPin("#imagesequence")
        .offset(400)
        .reverse(false) //set to True to unfreez the tween
        //.addIndicators()
        .addTo(controller);