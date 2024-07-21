const addSongBtn = document.getElementById("add-song-button")
const songModal = document.getElementById("song-modal")
const songURL = document.getElementById("song-url")
const addSong = document.getElementById("add-song")
const frameDisplay = document.getElementById("song-centerer")

const allSongPlay = document.getElementById("all-songs-album")

const songAlbum = document.getElementById("song-album") 




const exitBtn = document.getElementById("exit-page-button")
const exitBtnTwo = document.getElementById("exit-page-button-two")

let correspondingURL = ""

window.onload = function initDB() {

    albumToLoad = Object.keys(localStorage)

    for (let i = 0; i < localStorage.length; i++) {

        appendToAlbumList(albumToLoad[i])
        appendToSelectionOptions(albumToLoad[i])

       
    }
}

addSongBtn.onclick = ()=> {
    songModal.style.display = "flex"
}

window.onclick = (event)=> {
    if(event.target == songModal) {
        songModal.style.display = "none"
    } 
}


//adding song
addSong.onclick = ()=> {
    const songTitle = document.getElementById("song-title")
    title = songTitle.value
    songTitle.value = ""
    let url = songURL.value.trim()
    songURL.value = ""
    
    
    if(url == ""){
        alert("No item added")
        return
    }
    
    let videoID = youtubeParser(url) //extract the video url accounting for different types of link

    const albumNameToAdd = document.getElementById("song-album")
    let dictionary = JSON.parse(localStorage.getItem(albumNameToAdd.value))
    
    dictionary[title] = videoID
    localStorage.setItem(albumNameToAdd.value, JSON.stringify(dictionary))
    

//use JSON.stringify to convert array into string to be stored in local storage
//use JSON.parse to convert it back


    


}

function youtubeParser(url){
	var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
	var match = url.match(regExp);
	if (match&&match[7].length==11){
	    var b=match[7];
        return b
	}else{
	    alert("Url incorrect");
	}
}


//creating new album
const createAlbumBtn = document.getElementById("create-album-button")
const newAlbumName = document.getElementById("new-album-name")

createAlbumBtn.onclick = ()=> {
    
    let name = newAlbumName.value.trim()
    newAlbumName.value = ""

    if(name == ""){
        alert("No item added")
        return
    }

    //creating the album in local storage
    //local storage only support strings!!!
    localStorage.setItem(name, JSON.stringify({}))

    appendToSelectionOptions(name)
    
    //creating a list element 
    appendToAlbumList(name)
}

function appendToSelectionOptions(name) {
    let option = document.createElement("option")   
    option.text = name

    songAlbum.add(option, songAlbum.options[0])
    songAlbum.value = name //helps automatically select the inputted item

    
 
}

function appendToAlbumList(name) {

    const albumList = document.getElementById("album-list")
    let iconEl = document.createElement("i")
    iconEl.className = "fa-solid fa-podcast fa-shake"
    let buttonEl = document.createElement("button")
    buttonEl.className = "list-button"
    buttonEl.innerHTML = iconEl.outerHTML
    let spanEl = document.createElement("span")
    spanEl.textContent = " " + name


    let listEl = document.createElement("li")
    listEl.addEventListener("click", ()=> {
        const dictionary = JSON.parse(localStorage.getItem(name))
        loadingSongList(dictionary, name)
    })

    listEl.addEventListener("long-press", ()=> {

        localStorage.removeItem(listEl.textContent.trim())
        listEl.remove()
        for (let option of songAlbum) {
            if (option.text == listEl.textContent.trim()) {
                option.remove()
            }
        }

        


    }
    )

    listEl.innerHTML = buttonEl.outerHTML + spanEl.outerHTML
    albumList.append(listEl)


}

function loadingSongList(dictionary, name) {

    const songListCenterer = document.getElementById("song-list-centerer")
    songListCenterer.style.display = "flex"

    songToLoad = Object.keys(dictionary)

    for (i = 0; i < songToLoad.length; i++) {
        const songList = document.getElementById("song-list")
        let iconEl = document.createElement("i")
        iconEl.className = "fa-solid fa-headphones fa-shake"
        let buttonEl = document.createElement("button")
        buttonEl.className = "list-button"
        buttonEl.innerHTML = iconEl.outerHTML
        let spanEl = document.createElement("span")

        spanEl.textContent = " " + songToLoad[i]

        let listEl = document.createElement("li")
        listEl.addEventListener("click", ()=> {
            correspondingURL = dictionary[listEl.textContent.trim()]
            
            frameDisplay.style.display = "flex"
            onPlayerReady(correspondingURL)
        })

        listEl.addEventListener("long-press", ()=> {
            delete dictionary[listEl.textContent.trim()]
            localStorage.setItem(name, JSON.stringify(dictionary))
            listEl.remove()
        }
        )
            

        listEl.innerHTML = buttonEl.outerHTML + spanEl.outerHTML
        songList.append(listEl)


        


    }

    


}



const backBtn = document.getElementById("back-button")
const playpauseBtn = document.getElementById("play-pause-button")




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
    player.loadVideoById(correspondingURL)
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
    frameDisplay.style.display = "none"
}











exitBtn.onclick = ()=> {
    document.location = "index.html"
}

exitBtnTwo.onclick = ()=> {
    document.location = "song.html"
}

/*!
 * long-press-event - v2.4.6
 * Pure JavaScript long-press-event
 * https://github.com/john-doherty/long-press-event
 * @author John Doherty <www.johndoherty.info>
 * @license MIT
 */

!function(e,t){"use strict";var n=null,a="PointerEvent"in e||e.navigator&&"msPointerEnabled"in e.navigator,i="ontouchstart"in e||navigator.MaxTouchPoints>0||navigator.msMaxTouchPoints>0,o=a?"pointerdown":i?"touchstart":"mousedown",r=a?"pointerup":i?"touchend":"mouseup",m=a?"pointermove":i?"touchmove":"mousemove",u=a?"pointerleave":i?"touchleave":"mouseleave",s=0,c=0,l=10,v=10;function f(e){p(),e=function(e){if(void 0!==e.changedTouches)return e.changedTouches[0];return e}(e),this.dispatchEvent(new CustomEvent("long-press",{bubbles:!0,cancelable:!0,detail:{clientX:e.clientX,clientY:e.clientY,offsetX:e.offsetX,offsetY:e.offsetY,pageX:e.pageX,pageY:e.pageY},clientX:e.clientX,clientY:e.clientY,offsetX:e.offsetX,offsetY:e.offsetY,pageX:e.pageX,pageY:e.pageY,screenX:e.screenX,screenY:e.screenY}))||t.addEventListener("click",function e(n){t.removeEventListener("click",e,!0),function(e){e.stopImmediatePropagation(),e.preventDefault(),e.stopPropagation()}(n)},!0)}function d(a){p(a);var i=a.target,o=parseInt(function(e,n,a){for(;e&&e!==t.documentElement;){var i=e.getAttribute(n);if(i)return i;e=e.parentNode}return a}(i,"data-long-press-delay","500"),10);n=function(t,n){if(!(e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame&&e.mozCancelRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame))return e.setTimeout(t,n);var a=(new Date).getTime(),i={},o=function(){(new Date).getTime()-a>=n?t.call():i.value=requestAnimFrame(o)};return i.value=requestAnimFrame(o),i}(f.bind(i,a),o)}function p(t){var a;(a=n)&&(e.cancelAnimationFrame?e.cancelAnimationFrame(a.value):e.webkitCancelAnimationFrame?e.webkitCancelAnimationFrame(a.value):e.webkitCancelRequestAnimationFrame?e.webkitCancelRequestAnimationFrame(a.value):e.mozCancelRequestAnimationFrame?e.mozCancelRequestAnimationFrame(a.value):e.oCancelRequestAnimationFrame?e.oCancelRequestAnimationFrame(a.value):e.msCancelRequestAnimationFrame?e.msCancelRequestAnimationFrame(a.value):clearTimeout(a)),n=null}"function"!=typeof e.CustomEvent&&(e.CustomEvent=function(e,n){n=n||{bubbles:!1,cancelable:!1,detail:void 0};var a=t.createEvent("CustomEvent");return a.initCustomEvent(e,n.bubbles,n.cancelable,n.detail),a},e.CustomEvent.prototype=e.Event.prototype),e.requestAnimFrame=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(t){e.setTimeout(t,1e3/60)},t.addEventListener(r,p,!0),t.addEventListener(u,p,!0),t.addEventListener(m,function(e){var t=Math.abs(s-e.clientX),n=Math.abs(c-e.clientY);(t>=l||n>=v)&&p()},!0),t.addEventListener("wheel",p,!0),t.addEventListener("scroll",p,!0),t.addEventListener(o,function(e){s=e.clientX,c=e.clientY,d(e)},!0)}(window,document);











