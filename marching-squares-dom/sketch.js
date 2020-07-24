// marching squares on a Perlin noise field
// Coding in the Cabana Challenge #5 
// Here using Perlin noise instead of Open Simplex noise

/*

communtiy contributioin on coding train morning show
https://youtu.be/6Uy1SifiBig?t=2822

I am using one dimensional Perlin noise. There is a global variable zoff that keeps track of the position in noise space.  I am incrementing that zoff variable in two places.  The first place is every time through the draw() function.  And the second place is getting a value for each square in the in the getDots(zoff) function, which creates the field of dots or squares with a smooth noise values.  I think the animation looks like it is scrolling up because of the nested loop is for each x there is a y.  So the smooth noise field is generated from top to bottom left to right. maybe. Only the noise increment value is changed by the slider, so the effect is something like an increasing the speed. Also just a note that the noise() in p5js returns values between 0.0  and 1.0. but open simplex noise returns a value from -1 to 1 so you have to tweak the code a bit to get the states. 


*/

let field = [];
let rez =30; // distance bewteen dots
let cols,rows;
let zoff = 0; // for noise
let cnv;    // for canvas
let myzoom; // for slider
let mynoise; // for slider

function setup() {
  cnv = createCanvas(400,400);
  myzoom = createSlider(10,50,30);  // sets res
  mynoise = createSlider(0.007,0.03,0.005,0.001);  //sets noise
  centerCanvas();
  
}


// some DOM stuff to center the canvas
function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  let dr = createP("Slider 1: zoom, Slider 2: noise step");
  dr.position(x,y+height+5);
  myzoom.position(x,y+height+40);

  mynoise.position(x,y+height+70);
  let title = createP("->Marching squares on a Perlin noise field")
  
  title.position(x, y-40);
}
 
 

function draw() {
  // each time time through the draw loop, 
  // get values, get dots, show dots, get and show lines
  background(0);
  
  // noise and resolution
  let inc = mynoise.value();
  rez = myzoom.value();
  zoff+= inc;  // adjust zoff and z in the function to get different effects
  getDots(zoff); // function to get values of dots 
  showDots();   // function to show dots but shows rects
  getLines();   // 
  
}


function getDots(z) {     // send in a zoff for each field
  cols = 1 + floor(width/rez);  // adding extra colum and row
  rows = 1 + floor(height/rez);
  //field = new float[cols][rows];
  for (let i =0; i<cols;i++){
    field[i] = [];
   for (let j =0; j<rows;j++){
     z+=0.7;                  // increment the zoff in the field
     field[i][j] = (noise(z));
    // field[i][j] = floor(random(2));
 
     
   }
  }
  
  
}


function showDots() {
  for (let i =0; i<cols;i++){
   for (let j =0; j<rows;j++){
     //stroke(100,field[i][j]*255,0);
     //strokeWeight(rez*0.4);
     noStroke();
     fill(100,field[i][j]*255,0,150);
     rect(i*rez,j*rez,rez,rez);
     
   }
  }
}

function getLines(){
  
  for (let i =0; i<cols-1;i++){ // so it is not off the edge
   for (let j =0; j<rows-1;j++){
     let x = i *rez;
     let y = j * rez;
     let a = createVector(x+rez*0.5,y);
     let b = createVector(x+rez,y+rez*0.5);
     let c = createVector(x+rez*0.5,y+rez);
     let d = createVector(x,y+rez*0.5);
     let state = getState(floor(field[i][j]+0.5), floor(field[i+1][j]+0.5), floor(field[i+1][j+1]+0.5), floor(field[i][j+1]+0.5));
     stroke(0,255,0);
     let sw = map(rez,10,50,2,6);
     strokeWeight(sw);
     switch (state) {
      case 1:  
        myline(c, d);
        break;
      case 2:  
        myline(b, c);
        break;
      case 3:  
        myline(b, d);
        break;
      case 4:  
        myline(a, b);
        break;
      case 5:  
        myline(a, d);
        myline(b, c);
        break;
      case 6:  
        myline(a, c);
        break;
      case 7:  
        myline(a, d);
        break;
      case 8:  
        myline(a, d);
        break;
      case 9:  
        myline(a, c);
        break;
      case 10: 
        myline(a, b);
        myline(c, d);
        break;
      case 11: 
        myline(a, b);
        break;
      case 12: 
        myline(b, d);
        break;
      case 13: 
        myline(b, c);
        break;
      case 14: 
        myline(c, d);
        break;
      }
      
     
   }
  }
  
}

function getState(a, b, c, d){  //for a1,b1,c1,d1 =15
  
  return (a * 8) + (b * 4) + (c * 2) + (d * 1);
}


function myline(v1,v2) {   // rewriting the ine function
  line(v1.x, v1.y, v2.x, v2.y);
}