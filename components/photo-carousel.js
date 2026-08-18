(() => {
  const mount = document.getElementById('vf-photo-carousel-root');
  if (!mount) return;

  const root = new URL('../', document.currentScript.src);
  const asset = (name) => new URL(`assets/carousel/${name}`, root).href;
  const images = [
    'slide-01.webp',
    'slide-02.webp',
    'slide-03.webp',
    'slide-04.webp',
    'slide-05.webp',
    'slide-06.webp',
  ];

  mount.innerHTML = `
    <section class="photo-carousel" aria-label="Фотографии станции">
      <div class="photo-carousel__main">
        <div class="photo-carousel__viewport">
          <div class="photo-carousel__track">
            ${images.map((image, index) => `
              <div class="photo-carousel__slide" role="group" aria-label="${index + 1} из ${images.length}">
                <div class="photo-carousel__image" style="background-image:url('${asset(image)}')"></div>
              </div>
            `).join('')}
          </div>
        </div>
        <button class="photo-carousel__arrow photo-carousel__arrow--prev" type="button" aria-label="Предыдущий слайд"></button>
        <button class="photo-carousel__arrow photo-carousel__arrow--next" type="button" aria-label="Следующий слайд"></button>
      </div>
    </section>
  `;

  const track = mount.querySelector('.photo-carousel__track');
  const viewport = mount.querySelector('.photo-carousel__viewport');
  let index = 0;
  let timer;
  let startX = null;

  const render = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  const restart = () => {
    clearInterval(timer);
    timer = setInterval(() => {
      index = (index + 1) % images.length;
      render();
    }, 5000);
  };

  const move = (direction) => {
    index = (index + direction + images.length) % images.length;
    render();
    restart();
  };

  mount.querySelector('.photo-carousel__arrow--prev').addEventListener('click', () => move(-1));
  mount.querySelector('.photo-carousel__arrow--next').addEventListener('click', () => move(1));
  viewport.addEventListener('pointerdown', (event) => { startX = event.clientX; });
  viewport.addEventListener('pointerup', (event) => {
    if (startX === null) return;
    const delta = event.clientX - startX;
    startX = null;
    if (Math.abs(delta) > 50) move(delta > 0 ? -1 : 1);
  });

  restart();
})();
