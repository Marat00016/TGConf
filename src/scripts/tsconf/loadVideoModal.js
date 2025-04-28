export default function loadVideoModal() {
  let videoTag = null

  const onDone = (_, slide) => {
    if (!slide?.triggerEl || !slide.contentEl) return;

    const videoSrc = slide.triggerEl.dataset?.video;
    if (!videoSrc) return;
    
    videoTag = slide.contentEl.querySelector('video');
    videoTag.innerHTML = '';
    
    const sourceTag = document.createElement('source');
    sourceTag.src = ''
    sourceTag.src = videoSrc;
    sourceTag.type = 'video/mp4';
    
    videoTag.appendChild(sourceTag);
    
    videoTag.load();
    
    videoTag.play()
  };

  const onClose = () => {
    if (videoTag) {
      videoTag.pause();
      videoTag.currentTime = 0;
      videoTag.innerHTML = '' 
      videoTag.remove();
    }
  };

  window.fancybox.bind("[data-fancybox]", {
    on: {
      done: onDone,
      close: onClose,
    },
  });
}
