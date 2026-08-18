(() => {
  const mount = document.getElementById('vf-en-tripadvisor-root');
  if (!mount) return;

  mount.innerHTML = `
    <div class="tripadvisor-ticker">
      <a class="tripadvisor-ticker__link"
        href="https://www.tripadvisor.com/Attraction_Review-g297547-d9806047-Reviews-Vetratoria_Windsurfing_SUP-Dahab_South_Sinai_Red_Sea_and_Sinai.html"
        target="_blank" rel="noopener"
        aria-label="Read 144 reviews of Vetratoria Windsurfing and SUP on Tripadvisor">
        <span class="tripadvisor-ticker__text">★★★★★ &quot;The best wingfoil station in Dahab.&quot; September 17, 2024 — Tripadvisor Traveler — Read 144 reviews of Vetratoria Windsurfing &amp; SUP ★★★★★</span>
      </a>
    </div>`;
})();
