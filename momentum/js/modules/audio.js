let trackID = 0;
let playList = {};
let isMusicPlaying = false;
const API_URL = './playlist.json';
const audio = new Audio();

audio.addEventListener('ended', () => playNextTrack());

export function playMusic() {
    document.querySelector('.play').classList.toggle('pause');

    if (isMusicPlaying) {
        audio.pause();
        isMusicPlaying = false;
    } else {
        playTrack();
        isMusicPlaying = true;
    }
}

function playTrack() {
    audio.src = playList[trackID].src;
    audio.currentTime = 0;
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
    audio.pause();
    isMusicPlaying = false;
    trackID = currentTrack;
    document.querySelector('.play').classList.remove('pause');
    playMusic();
}