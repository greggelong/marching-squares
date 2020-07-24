# marching-squares
Marching Squares in a Perlin noise field in Processing and P5js

[See it discussed as a communtiy contributioin on coding train morning show](https://youtu.be/6Uy1SifiBig?t=2822)

I am using one dimensional Perlin noise. There is a global variable zoff that keeps track of the position in noise space.  I am incrementing that zoff variable in two places.  The first place is every time through the draw() function.  And the second place is getting a value for each square in the in the getDots(zoff) function, which creates the field of dots or squares with a smooth noise values.  I think the animation looks like it is scrolling up because of the nested loop is for each x there is a y.  So the smooth noise field is generated from top to bottom left to right. maybe. Only the noise increment value is changed by the slider, so the effect is something like an increasing the speed. Also just a note that the noise() in p5js returns values between 0.0  and 1.0. but open simplex noise returns a value from -1 to 1 so you have to tweak the code a bit to get the states. 
