song="";
leftWristx=0;
leftWristy=0;
rightWristx=0;
rightWristy=0;
score_leftWrist=0;
score_rightWrist=0;
function preload(){
  song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(400,400);
    canvas.postion(450,350);
    webcam=createCapture(VIDEO);
    webcam.hide();
    posenet=ml5.poseNet(webcam,modelLoaded);
    posenet.on('pose',gotPoses);
}
function draw(){
    image(webcam,0,0,400,400);
    if(score_leftWrist>0.2){
        fill("red");
        circle(leftWristx,leftWristy,20);
         number_leftWrist_y=Number(leftWristy);
         whole_leftWrist_y=floor(number_leftWrist_y);
         volume=whole_leftWrist_y/400;
         song.setVolume(volume);
         document.getElementById("volume").innerHTML="volume= "+volume;
    }
    if(score_rightWrist>0.2){
        fill("yellow");
        circle(rightWristx,rightWristy);
    if(rightWristy>0 && rightWristy<100){
        song.rate(0.5);
        document.getElementById("speed").innerHTML="speed=0.5x";
    }
    if(rightWristy>100 && rightWristy<200){
        song.rate(1);
        document.getElementById("speed").innerHTML="speed=1x";
    }
    if(rightWristy>0 && rightWristy<100){
        song.rate(1.5);
        document.getElementById("speed").innerHTML="speed=1.5x";
    }
    if(rightWristy>0 && rightWristy<100){
        song.rate(2);
        document.getElementById("speed").innerHTML="speed=2x";
    }
}
}
function playsong(){
    song.play();
    song.rate(1);
}

function stopsong(){
    song.stop();
}

function modelLoaded(){
    console.log("Model Is Loaded");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        score_leftWrist=results[0].pose.keypoints[9].score;
        score_rightWrist=results[0].pose.keypoints[10].score;
        leftWristx=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;
        console.log("leftwristx= "+leftWristx+" leftwristy= "+leftWristy);
        console.log("rightwristx= "+rightWristx+" rightwristy= "+rightWristy);

    }
}