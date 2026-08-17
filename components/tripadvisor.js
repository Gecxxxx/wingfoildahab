(() => {
  const mount = document.getElementById('vf-tripadvisor-root');
  if (!mount) return;

  mount.innerHTML = `
    <div class="tripadvisor-ticker">
      <a
        class="tripadvisor-ticker__link"
        href="https://www.tripadvisor.ru/Attraction_Review-g297547-d9806047-Reviews-Vetratoria_Windsurfing_SUP-Dahab_South_Sinai_Red_Sea_and_Sinai.html"
        target="_blank"
        rel="noopener"
        aria-label="Прочитать 144 отзыва о Vetratoria Windsurfing & SUP на Tripadvisor"
      >
        <span class="tripadvisor-ticker__text">★★★★★ &quot;Лучшая станция вингфойла в Дахаб.&quot; 17 сентября 2024 - Путешественник Tripadvisor Прочитать 144 отзывов о Vetratoria Windsurfing &amp; SUP ★★★★★</span>
      </a>
    </div>
  `;
})();
