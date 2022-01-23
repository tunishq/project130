song1 = "";
song2 = "";

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist

leftWristX = 0;
leftWristY = 0;

scoreLeftWrist = 0;
song1playing = "";
song2playing = "";

function preload() {
    song1 = loadSound("music.mp3")
    song2 = loadSound("music2.mp3")
}
function setup () {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 600, 500);

        song1playing = song1.isPlaying()

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist>0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song2.stop();

        if(song1playing == "false")
        {
            song1.play();
            document.getElementById("song").innerHTML = "first song"
        }
    }
    
    if(scoreRightWrist>0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song1.stop();

        if(song2playing == "false")
        {
            song2.play();
            document.getElementById("song").innerHTML = "second song"
        }
    }
    

  

}

function modelLoaded()
{
    console.log('posenet initialised');

}

function gotPoses(results)
{

    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("leftwristscore = "+scoreLeftWrist);
        
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("rightwristscore = "+scoreRightWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log('right wrist x = ' + rightWristX + ' right wrist y = ' + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log('left wrist x = ' + leftWristX + ' left wrist y = ' + leftWristY);
    }
}

