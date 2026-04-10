const PROJETOS = {

  regularizacao: [
    {
      titulo: "Projeto Casa Residencial",
      descricao: "Regularizacao de imovel residencial junto a prefeitura, incluindo levantamento, aprovacao e emissao de habite-se.",
      imagens: [
        "imagens/regularizacao/Projeto%20casa.png",
      ],
      video: "",
      ano: "2024",
      destaque: true
    },
  ],

  civilEletricoHidraulico: [
    {
      titulo: "Projeto Fundacao",
      descricao: "Projetos civil, eletrico e hidraulico de residencia unifamiliar. Acompanhamento completo desde o lancamento ate a execucao.",
      imagens: [
        "imagens/projetos-civil-eletrico-hidraulico/Fundacao",
      ],
      video: "",
      ano: "2024",
      destaque: true
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
      video: "",
      ano: "2024",
      destaque: true
    },
  ],

  gestaoObras: [
    {
      titulo: "Reforma de Apartamento Alto Padrao",
      descricao: "Gestao completa de reforma de apartamento alto padrao. Controle de cronograma, equipes e materiais.",
      imagens: [
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padrào-1.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padrào-2.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padrào-3.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padrào-4.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padrào-5.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padrào-6.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padrào-7.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padrào-8.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padrào-9.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padrào-10.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padrào-11.jpeg",
      ],
      video: "",
      ano: "2024",
      destaque: true
    },
  ]
};

const CONTATO = {
  whatsapp: "5547991205982",
  telefone: "(47) 99120-5982",
  email: "luft502@hotmail.com",
  cidade: "Navegantes - SC"
};

function getYoutubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  return match ? match[1] : null;
}

function getInstagramEmbed(url) {
  if (!url || !url.includes('instagram.com')) return null;
  return url.replace(/\/?$/, '/embed');
}

function criarCardProjeto(projeto) {
  const youtubeId = getYoutubeId(projeto.video);
  const instagramEmbed = getInstagramEmbed(projeto.video);
  let midiaHTML = '';
  if (youtubeId) {
    midiaHTML = '<div class="midia-container"><iframe src="https://www.youtube.com/embed/' + youtubeId + '" frameborder="0" allowfullscreen loading="lazy"></iframe></div>';
  } else if (instagramEmbed) {
    midiaHTML = '<div class="midia-container midia-instagram"><iframe src="' + instagramEmbed + '" frameborder="0" scrolling="no" loading="lazy"></iframe></div>';
  } else if (projeto.imagens.length > 0) {
    const imgPrincipal = projeto.imagens[0];
    const maisImagens = projeto.imagens.length > 1 ? '<span class="badge-fotos">+' + (projeto.imagens.length - 1) + ' fotos</span>' : '';
    const dataImagens = encodeURIComponent(JSON.stringify(projeto.imagens));
    midiaHTML = '<div class="midia-container midia-foto" data-imagens="' + dataImagens + '" onclick="abrirGaleria(this)"><img src="' + imgPrincipal + '" alt="' + projeto.titulo + '" loading="lazy" />' + maisImagens + '<div class="overlay-galeria">Ver galeria</div></div>';
  } else {
    midiaHTML = '<div class="midia-placeholder"><span>Em breve</span></div>';
  }
  return '<article class="card-projeto' + (projeto.destaque ? ' destaque' : '') + '">' + midiaHTML + '<div class="card-info"><span class="card-ano">' + projeto.ano + '</span><h3>' + projeto.titulo + '</h3><p>' + projeto.descricao + '</p></div></article>';
}

function renderizarSecao(containerId, projetos) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = projetos.length === 0 ? '<p class="sem-projetos">Projetos em breve.</p>' : projetos.map(criarCardProjeto).join('');
}

function abrirGaleria(el) {
  const imagens = JSON.parse(decodeURIComponent(el.dataset.imagens));
  const modal = document.getElementById('modal-galeria');
  const conteudo = document.getElementById('galeria-conteudo');
  conteudo.innerHTML = imagens.map(function(src) { return '<img src="' + src + '" alt="Foto do projeto" />'; }).join('');
  modal.classList.add('ativo');
  document.body.style.overflow = 'hidden';
}

function fecharGaleria() {
  document.getElementById('modal-galeria').classList.remove('ativo');
  document.body.style.overflow = '';
}

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

  var fecharBtn = document.getElementById('modal-fechar');
  if (fecharBtn) fecharBtn.addEventListener('click', fecharGaleria);
  var modalEl = document.getElementById('modal-galeria');
  if (modalEl) modalEl.addEventListener('click', function(e) { if (e.target.id === 'modal-galeria') fecharGaleria(); });

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
