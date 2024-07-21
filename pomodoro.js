const pomodoroModal = document.getElementById("pomodoro-modal")
const oneHour = document.getElementById("one-hour")
const twoHour = document.getElementById("two-hour")
const threeHour = document.getElementById("three-hour")
const fiveHour = document.getElementById("five-hour")
const eightHour = document.getElementById("eight-hour")
const backBtn = document.getElementById("back-button")
const playpauseBtn = document.getElementById("play-pause-button")
const exitBtn = document.getElementById("exit-page-button")
var pomodoroURL = ''

oneHour.onclick = ()=> {
    pomodoroModal.style.display = "flex"
    pomodoroURL = 'SUAZsQZ6M20'
    onPlayerReady(pomodoroURL)
    //to load the song to queue to be played, cannot just assigned video ID
}

twoHour.onclick = ()=> {
    pomodoroModal.style.display = "flex"
    pomodoroURL = 'p3ynjjRbU9A'
    onPlayerReady(pomodoroURL)
    //to load the song to queue to be played, cannot just assigned video ID
}

threeHour.onclick = ()=> {
    pomodoroModal.style.display = "flex"
    pomodoroURL = 'grBFMP3HDZA'
    onPlayerReady(pomodoroURL)
    //to load the song to queue to be played, cannot just assigned video ID
}

fiveHour.onclick = ()=> {
    pomodoroModal.style.display = "flex"
    pomodoroURL = 'X5mbZVwybxs'
    onPlayerReady(pomodoroURL)
    //to load the song to queue to be played, cannot just assigned video ID
}

eightHour.onclick = ()=> {
    pomodoroModal.style.display = "flex"
    pomodoroURL = 'zdkjaEKOutE'
    onPlayerReady(pomodoroURL)
    //to load the song to queue to be played, cannot just assigned video ID
}

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
    player.loadVideoById(pomodoroURL)
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
    player.seekTo(player.getCurrentTime())
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

backBtn.onclick = ()=> {
    player.pauseVideo()
    pomodoroModal.style.display = "none"
}

exitBtn.onclick = ()=> {
    document.location = "main.html"
}
