song1="";
song2="";

leftwristx=0;
leftwristy=0;

rightwristx=0;
rightwristy=0;

leftwristscore=0;
rightwristscore=0;

function setup() {
canvas=createCanvas(300, 300);
canvas.position(530, 300);
video=createCapture(VIDEO);
video.hide();
posenet=ml5.poseNet(video, modelLoaded);
posenet.on('pose' ,gotPoses);
}

function draw() {
image(video, 0, 0, 300, 300);
fill("red");
stroke("black");

    if(leftwristscore>=0.2) {
    circle(leftwristx, leftwristy, 20);
    song2.stop();
    if(song1.isPlaying()==false) {
      song1.play();
      document.getElementById("current_song_playing").innerHTML="Currently playing- Harry Potter EDM remix";
    }

    if(rightwristscore>=0.2) {
        circle(rightwristx, rightwristy, 20);
        song1.stop();
        if(song2.isPlaying()==false) {
          song2.play();
          document.getElementById("current_song_playing").innerHTML="Currently playing- Rick Astley- Never Gonna Give You Up";
        }
}
}
}

function preload() {
song1=loadSound("music.mp3");
song2=loadSound("music2.mp3")
}

function modelLoaded() {
    console.log("POSENET MODEL IS LOADED");
}

function gotPoses(result) {
    if(result.length > 0) {
    console.log(result);

       leftwristx= result[0].pose.leftWrist.x;
       leftwristy= result[0].pose.leftWrist.y;
       console.log("left wrist x is" + leftwristx + "and left wrist y is" + leftwristy);

       rightwristx= result[0].pose.rightWrist.x;
       rightwristy= result[0].pose.rightWrist.y;
       console.log("right wrist x is " + rightwristx + "and right wrist y is" + rightwristy);

    leftwristscore= result[0].pose.keypoints[9].score;
    rightwristscore= result[0].pose.keypoints[10].score;
    }
}