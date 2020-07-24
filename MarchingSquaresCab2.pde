float [][] field;
int rez =30; // distance bewteen dots
int cols,rows;
float zoff = 0; // for noise



void setup() {
  //size(600, 400);
  fullScreen();
  //getDots(1);// just to do simple random binary

}

void draw() {
  background(0);
  float inc = map(mouseX, 0,width,0.007,0.03);
  rez = floor(map(mouseY,0,height,10,50));
  zoff+= inc;  // adjust zoff and z in the function to get different effects
  getDots(zoff);
  showDots();
  getLines();
  
}


void getDots(float z) {     // send in a zoff for each field
  cols = 1 + floor(width/rez);  // adding extra colum and row
  rows = 1 + floor(height/rez);
  field = new float[cols][rows];
  for (int i =0; i<cols;i++){
   for (int j =0; j<rows;j++){
     z+=0.7;                  // increment the zoff in the field
     field[i][j] = (noise(z));
    // field[i][j] = floor(random(2));
 
     
   }
  }
  
  
}


void showDots() {
  for (int i =0; i<cols;i++){
   for (int j =0; j<rows;j++){
     stroke(100,field[i][j]*255,0);
     strokeWeight(rez*0.4);
     point(i*rez,j*rez);
     
   }
  }
}

void getLines(){
  
  for (int i =0; i<cols-1;i++){ // so it is not off the edge
   for (int j =0; j<rows-1;j++){
     float x = i *rez;
     float y = j * rez;
     PVector a = new PVector(x+rez*0.5,y);
     PVector b = new PVector(x+rez,y+rez*0.5);
     PVector c = new PVector(x+rez*0.5,y+rez);
     PVector d = new PVector(x,y+rez*0.5);
     int state = getState(floor(field[i][j]+0.5), floor(field[i+1][j]+0.5), floor(field[i+1][j+1]+0.5), floor(field[i][j+1]+0.5));
     stroke(0,255,0);
     strokeWeight(2);
     switch (state) {
      case 1:  
        line(c, d);
        break;
      case 2:  
        line(b, c);
        break;
      case 3:  
        line(b, d);
        break;
      case 4:  
        line(a, b);
        break;
      case 5:  
        line(a, d);
        line(b, c);
        break;
      case 6:  
        line(a, c);
        break;
      case 7:  
        line(a, d);
        break;
      case 8:  
        line(a, d);
        break;
      case 9:  
        line(a, c);
        break;
      case 10: 
        line(a, b);
        line(c, d);
        break;
      case 11: 
        line(a, b);
        break;
      case 12: 
        line(b, d);
        break;
      case 13: 
        line(b, c);
        break;
      case 14: 
        line(c, d);
        break;
      }
      
     
   }
  }
  
}

int getState(int a, int b, int c, int d){  //for a1,b1,c1,d1 =15
  
  return (a * 8) + (b * 4) + (c * 2) + (d * 1);
}


void line(PVector v1, PVector v2) {   // rewriting the ine function
  line(v1.x, v1.y, v2.x, v2.y);
}
