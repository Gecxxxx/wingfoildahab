(() => {
  const mount = document.getElementById('vf-process-root');
  if (!mount) return;

  mount.innerHTML = `
    <section class="edu-section" id="learning">
      <div class="edu-container">
        <div class="edu-fade-up"><span class="edu-subtitle">Вингфойлинг станция</span><h2 class="edu-title">Процесс <span class="edu-orange">обучения</span></h2></div>
        <div class="main-video-wrapper edu-fade-up edu-delay-2"><iframe src="https://www.youtube.com/embed/TaQIUHefI24?rel=0&amp;modestbranding=1" title="Основной процесс обучения" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
        <div class="shorts-grid edu-fade-up edu-delay-3">
          <div class="short-video-item"><iframe src="https://www.youtube.com/embed/3s9Vj2Il4J0?rel=0" title="Вингфойл Видео 1" allowfullscreen></iframe></div>
          <div class="short-video-item"><iframe src="https://www.youtube.com/embed/xS7vfhts_go?rel=0" title="Вингфойл Видео 2" allowfullscreen></iframe></div>
          <div class="short-video-item"><iframe src="https://www.youtube.com/embed/KnIRNmP_Q7s?rel=0" title="Вингфойл Видео 3" allowfullscreen></iframe></div>
        </div>
        <p class="edu-footer-text edu-fade-up edu-delay-3">Мы можем организовать профессиональную фото или видео съемку во время вашего урока</p>
      </div>
    </section>
  `;
})();
