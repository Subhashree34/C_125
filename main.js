noseX = 0;
noseY = 0;
rightWristX = 0;
leftWristX = 0;
difference = 0;
function setup(){
    canvas = createCanvas(550,480);
    canvas.position(560,150);
    video = createCapture(VIDEO);
    video.size(550,500);
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);

        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX = " + noseX + "noseY = " + noseY);
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);
        console.log("leftWrtistX = " + leftWristX + "rightWristX = " + rightWristX + "Differences = " + difference);
    }
}

function modelLoaded(){
    console.log("PoseNet is Initialized");
}

function draw(){
    background("#CD9AE5");
    fill("#65f798");
    stroke("#070808");
    square(noseX, noseY, difference);
    document.getElementById("square_side").innerHTML = "width and height of the square will be - "+difference;
}