const playpauseBtn = document.getElementById("play-pause-button")
const previousBtn = document.getElementById("previous-button")
const nextBtn = document.getElementById("next-button")
const exitBtn = document.getElementById("exit-page-button")
const lofiArray = ['jfKfPfyJRdk','4xDzrJKXOOY','_uMuuHk_KkQ','Na0w3Mz46GA', 'S_MOd40zlYU']
const maxIndex = lofiArray.length
let index = 0


// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player) after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    playerVars: {
      'playsinline': 1,
      'controls': 0,
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {

    player.loadVideoById(lofiArray[index])
    pauseVideo()
}

// 5. The API calls this function when the player's state changes.

var playing;
function onPlayerStateChange(event) {
    playing = event.data == YT.PlayerState.PLAYING ? true : false;
}

function pauseVideo() {
    player.pauseVideo()
}

function playVideo() {
    player.seekTo(player.getDuration())
    player.playVideo();
}


playpauseBtn.onclick = ()=> {
    if(playing) {
        pauseVideo()
    }
    else {
        playVideo()
    }
    
}

previousBtn.onclick = ()=> {
    console.log("haha")
    if (index == 0){
        index = maxIndex
    }
    else {
        index -= 1
    }

    player.loadVideoById(lofiArray[index])
}

nextBtn.onclick = ()=> {
    
    if (index == maxIndex) {
        index = 0
    }
    else{
        index += 1 
    }

    player.loadVideoById(lofiArray[index])
}

exitBtn.onclick = ()=> {
    document.location = "main.html"
}

