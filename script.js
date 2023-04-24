"use strict";
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('playBtn');
let progressBar = document.getElementById('myProgressBar');
let songItems = Array.from(document.getElementsByClassName('songItems'));
let currentSong = document.getElementById('currentSongName');
let songs = [
    {songName: "Let Me Love You", filePath: "songs/1.mp3", coverPath:"cover/1.jpg"},
    {songName: "Random-2", filePath: "songs/2.mp3", coverPath:"cover/2.jpg"},
    {songName: "Random-3", filePath: "songs/3.mp3", coverPath:"cover/3.jpg"},
    {songName: "Random-4", filePath: "songs/4.mp3", coverPath:"cover/4.jpg"},
    {songName: "Random-5", filePath: "songs/5.mp3", coverPath:"cover/5.jpg"},
    {songName: "Random-6", filePath: "songs/6.mp3", coverPath:"cover/6.jpg"}
];
songItems.forEach((element,i)=>{

    element.getElementsByTagName("img")[0].src = songs[i].coverPath;

    element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
});

audioElement.addEventListener('timeupdate', ()=>{ 
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
   progressBar.value = progress; 
});
// Play / Pause
masterPlay.addEventListener('click', ()=>{
   if(audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
   }else{
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
   }
})
// EventListeners
progressBar.addEventListener('change',()=>{
    audioElement.currentTime = progressBar.value * audioElement.duration/100;
});
const makeAllPlays = ()=>{
    
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
   element.classList.add('fa-play-circle');
   element.classList.remove('fa-pause-circle')
});
};
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
element.addEventListener('click', (e)=>{
 songIndex = parseInt(e.target.id);
 e.target.classList.remove('fa-circle-play');
 e.target.classList.add('fa-pause-circle');
 audioElement.src = `songs/${songIndex+1}.mp3`;
 currentSong.innerText = songs[songIndex].songName;
 audioElement.currentTime = 0;
 audioElement.play();
 masterPlay.classList.remove('fa-circle-play');
 masterPlay.classList.add('fa-pause-circle');
});
});
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>9){
        songIndex = 0;
    }else{
        songIndex += 1;
    }
    
 audioElement.src = `songs/${songIndex+1}.mp3`;
 currentSong.innerText = songs[songIndex].songName;
 audioElement.currentTime = 0;
 audioElement.play();
 masterPlay.classList.add('fa-pause-circle');
 masterPlay.classList.remove('fa-circle-play');
});
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0;
    }else{
        songIndex -= 1;
    }
    
 audioElement.src = `songs/${songIndex+1}.mp3`;
 currentSong.innerText = songs[songIndex].songName;
 audioElement.currentTime = 0;
 audioElement.play();
 masterPlay.classList.add('fa-pause-circle');
 masterPlay.classList.remove('fa-circle-play');
});
