const playButton = document.getElementById('playButton');
const graduationAudio = document.getElementById('graduationAudio');

playButton.addEventListener('click', () => {
  if (graduationAudio.paused) {
    graduationAudio.play();
    playButton.textContent = 'Pausar Canción';
  } else {
    graduationAudio.pause();
    playButton.textContent = '¡Reproducir Graduation de Kanye West!';
  }
});

graduationAudio.addEventListener('ended', () => {
  playButton.textContent = '¡Reproducir Graduation de Kanye West!';
});
