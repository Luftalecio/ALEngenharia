const PROJETOS = {

  regularizacao: [
    {
      titulo: "Projeto Casa Residencial",
      descricao: "Regularizacao de imovel residencial junto a prefeitura, incluindo levantamento, aprovacao e emissao de habite-se.",
      imagens: ["imagens/regularizacao/Projeto%20casa.png"],
      video: "", ano: "2024", destaque: true
    },
  ],

  civilEletricoHidraulico: [
    {
      titulo: "Projeto Fundacao",
      descricao: "Projetos civil, eletrico e hidraulico de residencia unifamiliar. Acompanhamento completo desde o lancamento ate a execucao.",
      imagens: ["imagens/projetos-civil-eletrico-hidraulico/Fundacao"],
      video: "", ano: "2024", destaque: true
    },
  ],

  estruturasMetalicas: [
    {
      titulo: "Construcao Quadra Coberta",
      descricao: "Projeto e execucao de estrutura metalica para cobertura de quadra esportiva. Trelicas, pilares e coberta em telha metalica.",
      imagens: [
        "imagens/estruturas-metalicas/Construcao%20Quadra%20Coberta-0.jpeg",
        "imagens/estruturas-metalicas/Construcao%20Quadra%20Coberta-1.jpeg",
        "imagens/estruturas-metalicas/Construcao%20Quadra%20Coberta-2.jpeg",
        "imagens/estruturas-metalicas/Construcao%20Quadra%20Coberta-3.jpeg",
        "imagens/estruturas-metalicas/Construcao%20Quadra%20Coberta-4.jpeg",
        "imagens/estruturas-metalicas/Construcao%20Quadra%20Coberta-5.jpeg",
        "imagens/estruturas-metalicas/Construcao%20Quadra%20Coberta-6.jpeg",
        "imagens/estruturas-metalicas/Construcao%20Quadra%20Coberta-7.jpeg",
        "imagens/estruturas-metalicas/Construcao%20Quadra%20Coberta-8.jpeg",
        "imagens/estruturas-metalicas/Construcao%20Quadra%20Coberta-9.jpeg",
        "imagens/estruturas-metalicas/Construcao%20Quadra%20Coberta-10.jpeg",
      ],
      video: "", ano: "2024", destaque: true
    },
  ],

  gestaoObras: [
    {
      titulo: "Reforma de Apartamento Alto Padrao",
      descricao: "Gestao completa de reforma de apartamento alto padrao. Controle de cronograma, equipes e materiais.",
      imagens: [
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20padra\u0300o-0.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padra\u0300o-1.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padra\u0300o-2.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padra\u0300o-3.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padra\u0300o-4.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padra\u0300o-5.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padra\u0300o-6.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padra\u0300o-7.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padra\u0300o-8.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padra\u0300o-9.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padra\u0300o-10.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padra\u0300o-11.jpeg",
      ],
      video: "", ano: "2024", destaque: true
    },
  ]
};

const CONTATO = {
  whatsapp: "5547991205982",
  telefone: "(47) 99120-5982",
  email: "luft502@hotmail.com",
  cidade: "Navegantes - SC"
};

// ---- Lightbox state ----
var _lbImagens = [];
var _lbIndex = 0;

function getYoutubeId(url) {
  if (!url) return null;
  var match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  return match ? match[1] : null;
}

function getInstagramEmbed(url) {
  if (!url || !url.includes('instagram.com')) return null;
  return url.replace(/\/?$/, '/embed');
}

function criarCardProjeto(projeto) {
  var youtubeId = getYoutubeId(projeto.video);
  var instagramEmbed = getInstagramEmbed(projeto.video);
  var midiaHTML = '';
  if (youtubeId) {
    midiaHTML = '<div class="midia-container"><iframe src="https://www.youtube.com/embed/' + youtubeId + '" frameborder="0" allowfullscreen loading="lazy"></iframe></div>';
  } else if (instagramEmbed) {
    midiaHTML = '<div class="midia-container midia-instagram"><iframe src="' + instagramEmbed + '" frameborder="0" scrolling="no" loading="lazy"></iframe></div>';
  } else if (projeto.imagens.length > 0) {
    var imgPrincipal = projeto.imagens[0];
    var maisImagens = projeto.imagens.length > 1 ? '<span class="badge-fotos">+' + (projeto.imagens.length - 1) + ' fotos</span>' : '';
    var dataImagens = encodeURIComponent(JSON.stringify(projeto.imagens));
    midiaHTML = '<div class="midia-container midia-foto" data-imagens="' + dataImagens + '" onclick="abrirLightbox(this, 0)"><img src="' + imgPrincipal + '" alt="' + projeto.titulo + '" loading="lazy" />' + maisImagens + '<div class="overlay-galeria">Ver fotos</div></div>';
  } else {
    midiaHTML = '<div class="midia-placeholder"><span>Em breve</span></div>';
  }
  return '<article class="card-projeto' + (projeto.destaque ? ' destaque' : '') + '">' + midiaHTML + '<div class="card-info"><span class="card-ano">' + projeto.ano + '</span><h3>' + projeto.titulo + '</h3><p>' + projeto.descricao + '</p></div></article>';
}

function renderizarSecao(containerId, projetos) {
  var container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = projetos.length === 0 ? '<p class="sem-projetos">Projetos em breve.</p>' : projetos.map(criarCardProjeto).join('');
}

function abrirLightbox(el, startIndex) {
  _lbImagens = JSON.parse(decodeURIComponent(el.dataset.imagens));
  _lbIndex = startIndex || 0;
  renderLightbox();
  var lb = document.getElementById('lightbox');
  lb.classList.add('ativo');
  document.body.style.overflow = 'hidden';
}

function renderLightbox() {
  var img = document.getElementById('lb-img');
  var counter = document.getElementById('lb-counter');
  img.src = _lbImagens[_lbIndex];
  counter.textContent = (_lbIndex + 1) + ' / ' + _lbImagens.length;
  document.getElementById('lb-prev').style.display = _lbImagens.length > 1 ? 'flex' : 'none';
  document.getElementById('lb-next').style.display = _lbImagens.length > 1 ? 'flex' : 'none';
}

function lbAnterior() {
  _lbIndex = (_lbIndex - 1 + _lbImagens.length) % _lbImagens.length;
  renderLightbox();
}

function lbProximo() {
  _lbIndex = (_lbIndex + 1) % _lbImagens.length;
  renderLightbox();
}

function fecharLightbox() {
  document.getElementById('lightbox').classList.remove('ativo');
  document.body.style.overflow = '';
}

// Manter compatibilidade com código antigo
function abrirGaleria(el) { abrirLightbox(el, 0); }
function fecharGaleria() { fecharLightbox(); }

document.addEventListener('DOMContentLoaded', function() {
  renderizarSecao('grid-regularizacao', PROJETOS.regularizacao);
  renderizarSecao('grid-civil', PROJETOS.civilEletricoHidraulico);
  renderizarSecao('grid-metalicas', PROJETOS.estruturasMetalicas);
  renderizarSecao('grid-obras', PROJETOS.gestaoObras);

  var waLink = document.getElementById('whatsapp-link');
  if (waLink) waLink.href = 'https://wa.me/' + CONTATO.whatsapp;
  var telEl = document.getElementById('tel-display');
  if (telEl) telEl.textContent = CONTATO.telefone;
  var emailEl = document.getElementById('email-display');
  if (emailEl) emailEl.textContent = CONTATO.email;

  // Lightbox eventos
  document.getElementById('lb-fechar').addEventListener('click', fecharLightbox);
  document.getElementById('lb-prev').addEventListener('click', function(e) { e.stopPropagation(); lbAnterior(); });
  document.getElementById('lb-next').addEventListener('click', function(e) { e.stopPropagation(); lbProximo(); });
  document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this || e.target.id === 'lb-img-wrap') fecharLightbox();
  });

  // Teclado
  document.addEventListener('keydown', function(e) {
    if (!document.getElementById('lightbox').classList.contains('ativo')) return;
    if (e.key === 'ArrowLeft') lbAnterior();
    else if (e.key === 'ArrowRight') lbProximo();
    else if (e.key === 'Escape') fecharLightbox();
  });

  // Swipe mobile
  var touchStartX = 0;
  document.getElementById('lightbox').addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
  }, {passive: true});
  document.getElementById('lightbox').addEventListener('touchend', function(e) {
    var diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { if (diff > 0) lbProximo(); else lbAnterior(); }
  }, {passive: true});

  // Menu mobile
  var menuBtn = document.getElementById('menu-toggle');
  var navLinks = document.getElementById('nav-links');
  if (menuBtn) menuBtn.addEventListener('click', function() { navLinks.classList.toggle('aberto'); });

  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      if (navLinks) navLinks.classList.remove('aberto');
      var target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});
