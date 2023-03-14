const soundVolume = document.querySelector('.sound-volume');
const muteButton = document.querySelector('.mute-button');
const currentTime = document.querySelector('.current-time');
const progressBar = document.querySelector('.progress');
const API_URL = './assets/api/playlist.json';
const audio = new Audio();
let trackID = 0;
let playList = {};
let isMusicPlaying = false;


audio.addEventListener('ended', () => playNextTrack());
progressBar.addEventListener('input', setTrackProgress);
soundVolume.addEventListener('input', setVolume);
muteButton.addEventListener('click', mute);


export function playMusic() {
    document.querySelector('.play').classList.toggle('pause');
    let timerID = 0;

    if (isMusicPlaying) {
        audio.pause();
        isMusicPlaying = false;
        clearInterval(timerID);
        document.querySelector('.play-item.active').classList.add('paused');
    } else {
        playTrack();
        isMusicPlaying = true;
        timerID = setInterval(updateTrackTime, 1000);
        document.querySelector('.current-audio').textContent = playList[trackID].title;
        document.querySelector('.play-item.active').classList.remove('paused');
    }
    setTrackProgress()
}

function playTrack() {
    console.log(playList);
    audio.src = playList[trackID].src;
    audio.play();
    markCurrentTrack(trackID);
}

export function playNextTrack() {
    if (isMusicPlaying) {
        const playListLength = playList.length - 1;
        trackID = (trackID < playListLength) ? trackID + 1 : 0;
        playTrack();
    }
}

export function playPrevTrack() {
    if (isMusicPlaying) {
        const playListLength = playList.length - 1;
        trackID = (trackID === 0) ? playListLength : trackID - 1;
        playTrack();
    }
}

export async function renderPlayList() {
    const tracklist = document.querySelector('.play-list');
    const response = await fetch(API_URL);
    playList = await response.json();

    for (let id = 0; id < playList.length; ++id) {
        const track = document.createElement('li');
        track.classList.add('play-item');
        track.dataset.trackId = id;
        track.textContent = playList[id].title;
        track.onclick = (e) => setCurrentTrack(+e.target.dataset.trackId);
        tracklist.append(track);
    }
}

function markCurrentTrack(id) {
    const playList = document.querySelectorAll('.play-item');
    playList.forEach(track => {
        const isCurrentTrack = track.dataset.trackId == id;
        if (isCurrentTrack) {
            track.classList.add('active');
        } else {
            track.classList.remove('active')
        }
    })
}

function setCurrentTrack(currentTrack) {
    if (trackID != currentTrack) {
        audio.pause();
        isMusicPlaying = false;
        audio.currentTime = 0;
        progressBar.value = 0;
        trackID = currentTrack;
        updateTrackTime();
        document.querySelector('.play').classList.remove('pause');
        playMusic();
    } else if (isMusicPlaying) {
        audio.pause();
        isMusicPlaying = false;
        document.querySelector('.play').classList.remove('pause');
        document.querySelector('.play-item.active').classList.add('paused');
    } else {
        playMusic();
    }


}

function setVolume() {
    const value = soundVolume.value;

    if(value == 0) {
        audio.muted = true;
        muteButton.classList.add('mute');
    } else {
        audio.muted = false;
        muteButton.classList.remove('mute');
    }
    
    audio.volume = value / 100;
    soundVolume.style.background = `linear-gradient(to right, #3ee433 0%, #3ee433 ${value}%, white ${value}%, white 100%)`;
}

function mute() {
    audio.muted = !audio.muted;
    muteButton.classList.toggle('mute');
}

function getTrackTime(second) {
    let min = Math.floor((second / 60));
    let sec = Math.floor(second - (min * 60));

    sec = (sec < 10) ? sec = `0${sec}` : sec;
    min = (min < 10) ? min = `0${min}` : min;

    return `${min}:${sec}`;
}

function updateTrackTime() {
    progressBar.max = audio.duration;
    progressBar.value = audio.currentTime;
    currentTime.textContent = getTrackTime(Math.floor(audio.currentTime));

    if (!audio.paused) {
        document.querySelector('.song-duration').textContent = (getTrackTime(Math.floor(audio.duration)));;
    }

    progressBar.style.background = `linear-gradient(to right, #3ee433 0%, #3ee433 ${progressBar.value * 100 / progressBar.max}%, white ${progressBar.value * 100 / progressBar.max}%, white 100%)`;
}

function setTrackProgress() {
    audio.currentTime = progressBar.value;
}

