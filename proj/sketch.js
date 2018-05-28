var value;
var button1,button2,button3;
var fr=12;
var slider;
var f1c=255,f2c=0,f3c=0;
var r=[255,0,0];
var g=[0,255,0];
var b=[0,0,255];
var offset;
var flag,erase,pencil;
var img1,img2;
var mvalue;
var sidebar=100;
var upbar=80;
var bucket;

function setup() {
	value=290;
  flag=0;
  erase=0
  pencil=0
  bucket=0
  mvalue=0

  createCanvas(windowWidth, windowHeight);

  img1='assets/khush.png'

  img2='assets/pencil.png'

	button1 = createButton('Erase ALL');
	button1.position(10,10+upbar)
	button1.mousePressed(changeBack);


  button2 = createButton('Erasor')
  button2.position(10,40+upbar)
  button2.mousePressed(function(){setFlag('e')})
	

  button3 = createButton('Pencil')
  button3.position(10,70+upbar)
  button3.mousePressed(function(){setFlag('p')})

  button4 = createButton('Bucket')
  button4.position(10,110+upbar)
  button4.mousePressed(bucketCall)


	cursor(CROSS);


  slider=createSlider(5,50,5);
  slider.position(5,150+upbar);

  buttonr=createButton('Red');
  buttonb=createButton('Blue');
  buttong=createButton('Green');

  buttonr.position(120+upbar,30);
  buttong.position(200+upbar,30);
  buttonb.position(280+upbar,30);

  buttonr.mouseClicked(function(){changeColor(r)})
  buttong.mouseClicked(function(){changeColor(g)})
  buttonb.mouseClicked(function(){changeColor(b)})
  
  offset=20;
  sideMargin()

  
}

function sideMargin(){

  noStroke()
  fill(100,149,237)
  rect(0,0,sidebar,windowHeight)
  stroke(2)
  strokeWeight(1)
  fill(148,0,211)
  rect(0,0,windowWidth,upbar)
}

function changeBack(){
  erase=0
  background(255,255,255)
  sideMargin()
}

function setFlag(fval){
      flag=0
      print(fval)
  if (fval==='e'){
      cursor(img1,6,10)
      erase=1
  }
  if(fval==='p'){
      erase=0
      cursor(img2,8,8);
      pencil=1
  }
}


function clearVars(){
  flag=0
  erase=0
  pencil=0
  bucket=0
}

function bucketCall(){
  clearVars()

  cursor(img1,8,8)
  bucket=1
}

function draw() {
    
	flag=0;
    if (flag==0)
    {
       noStroke(value);
    }
    


}


function changeColor(c){
  clearVars()
  cursor(CROSS)
	f1c=c[0]
	f2c=c[1]
	f3c=c[2]
}

function fillColor(x, y, pcolr, ncolr){
  var pos = (x+y*windowWidth)*4
  loadPixels()
  print(pixels[pos])
  if (pixels[pos] == ncolr || pixels[pos] != pcolr){
    return
  }

  pixels[pos]=ncolr

  updatePixels();
  fillColor(x+1,y,pcolr,ncolr)
  fillColor(x-1,y,pcolr,ncolr)
  fillColor(x,y+1,pcolr,ncolr)
  fillColor(x,y-1,pcolr,ncolr)

  //return
}


function doubleClicked(){
  if (bucket==1){
    var pos = (mouseX+mouseY*windowWidth)*4
    loadPixels()
    var pcolr=pixels[pos]
    fillColor(mouseX,mouseY,pcolr,3)
  }
}


function mouseDragged()
{

  if(mouseX >sidebar && mouseY>upbar){
    flag=1
     
    if(flag==1 && erase==1&&bucket==0)
    {
    	stroke(255);
      strokeWeight(10)
    	fill(255);
    	//ellipse(mouseX-offset/2,mouseY+offset/2,offset,offset);
      line(mouseX,mouseY,pmouseX,pmouseY)
    	

    }
    else if (flag==1 && erase==0 && pencil==0&&bucket==0){
    	 
         var i=2*slider.value()+20;
         while(i>0){
           strokeWeight(1)
           var ch_mx=random(0,20);
           var ch_my=random(0,20);
           var x=random(mouseX-ch_mx,mouseX+ch_mx);
           var y=random(mouseY-ch_my,mouseY+ch_my);

           var x1=random(pmouseX-ch_mx,pmouseX+ch_mx);
           var x2=random(pmouseY-ch_my,pmouseY+ch_my);
           i-=1;
           stroke(f1c,f2c,f3c)
  	       fill(f1c,f2c,f3c)
           ellipse(x1,x2,1,1)
           ellipse(x,y,1,1)
       }
    }else if(flag==1 && erase==0 && pencil==1&&bucket==0){
      stroke(0)
      strokeWeight(1)
      fill(0)
      line(mouseX, mouseY, pmouseX, pmouseY)
    }

  }
  sideMargin()
    
}






