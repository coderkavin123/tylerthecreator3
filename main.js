
song = "";
objects = [];
status = "";

function preload()
{
	song = loadSound("chrissy_wake_up.mp3");
}

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 380, 380);
      if(status != "")
      {
        r =  random(255);
        g =  random(255);
        b =  random(255);      
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
 
          fill(r,g,b);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(r,g,b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
         
          if(objects[i].label == "person")
          {
            document.getElementById("number_of_objects").innerHTML = "Baby Found";
            console.log("stop");
            song.stop();
          }
          else
          {
            document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
            console.log("play"); 
            song.play();
          }
         }

        if(objects.length == 0)
        {
          document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
          console.log("play"); 
          song.play();
        }
      }
}
// JavaScript to play two songs with abrupt switching

// Load audio files
const song1 = new Audio('Yonkers - Tyler The Creator.mp3'); // Replace with the actual file path
const deathcamp = new Audio('Deathcamp - Tyler The Creator.mp3'); // Replace with the actual file path

let playing = false;

// Function to handle button click
function toggleMusic() {
    if (!playing) {
        playing = true;

        // Play first song
        song1.play();

        // Stop the first song and play DEATHCAMP after 5 seconds
        setTimeout(() => {
            song1.pause();
            song1.currentTime = 0;
            deathcamp.play();
        }, 5000); // 5 seconds delay
    } else {
        // Stop everything if the function is called again
        song1.pause();
        song1.currentTime = 0;
        deathcamp.pause();
        deathcamp.currentTime = 0;
        playing = false;
    }
}

// Attach the toggleMusic function to any existing button with ID 'playButton'
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('playButton');
    if (button) {
        button.addEventListener('click', toggleMusic);
    } else {
        console.error("Button with ID 'playButton' not found!");
    }
});