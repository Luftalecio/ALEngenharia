/**
 * ALECIO LUFT ENGENHARIA CIVIL
 * Arquivo de configuração dos projetos
 *
 * DICA: Use nomes de arquivo SEM acentos, SEM espaços, SEM parênteses
 *   Correto:  quadra-coberta-01.jpeg
 *   Errado:   Quadra Coberta (1).jpeg
 */

const PROJETOS = {

  regularizacao: [
    {
      titulo: "Projeto Casa Residencial",
      descricao: "Regularização de imóvel residencial junto à prefeitura, incluindo levantamento, aprovação e emissão de habite-se.",
      imagens: [
        "imagens/regularizacao/Projeto casa.png",
      ],
      video: "",
      ano: "2024",
      destaque: true
    },
  ],

  civilEletricoHidraulico: [
    {
      titulo: "Projeto Fundação",
      descricao: "Projetos civil, elétrico e hidráulico de residência unifamiliar. Acompanhamento completo desde o lançamento até a execução.",
      imagens: [
        "imagens/projetos-civil-eletrico-hidraulico/Fundacao",
        "imagens/projetos-civil-eletrico-hidraulico/Projeto%20Funda%C3%A7%C3%A3o",
      ],
      video: "",
      ano: "2024",
      destaque: true
    },
  ],

  estruturasMetalicas: [
    {
      titulo: "Construção Quadra Coberta",
      descricao: "Projeto e execução de estrutura metálica para cobertura de quadra esportiva. Treliças, pilares e coberta em telha metálica.",
      imagens: [
        "imagens/estruturas-metalicas/Construcao Quadra Coberta-0.jpeg",
        "imagens/estruturas-metalicas/Construcao Quadra Coberta-1.jpeg",
        "imagens/estruturas-metalicas/Construcao Quadra Coberta-2.jpeg",
        "imagens/estruturas-metalicas/Construcao Quadra Coberta-3.jpeg",
        "imagens/estruturas-metalicas/Construcao Quadra Coberta-4.jpeg",
        "imagens/estruturas-metalicas/Construcao Quadra Coberta-5.jpeg",
        "imagens/estruturas-metalicas/Construcao Quadra Coberta-6.jpeg",
        "imagens/estruturas-metalicas/Construcao Quadra Coberta-7.jpeg",
        "imagens/estruturas-metalicas/Construcao Quadra Coberta-8.jpeg",
        "imagens/estruturas-metalicas/Construcao Quadra Coberta-9.jpeg",
        "imagens/estruturas-metalicas/Construcao Quadra Coberta-10.jpeg",
      ],
      video: "",
      ano: "2024",
      destaque: true
    },
  ],

  gestaoObras: [
    {
      titulo: "Reforma de Apartamento Alto Padrão",
      descricao: "Gestão completa de reforma de apartamento alto padrão. Controle de cronograma, equipes e materiais.",
      imagens: [
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padr%C3%A3o.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padr%C3%A3o-1.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padr%C3%A3o-2.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padr%C3%A3o-3.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padr%C3%A3o-4.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padr%C3%A3o-5.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padr%C3%A3o-6.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padr%C3%A3o-7.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padr%C3%A3o-8.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padr%C3%A3o-9.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padr%C3%A3o-10.jpeg",
        "imagens/gestao-obras/Reforma%20Apartamento%20Alto%20Padr%C3%A3o-11.jpeg",
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
    midiaHTML = `<div class="midia-container"><iframe src="https://www.youtube.com/embed/${youtubeId}" frameborder="0" allowfullscreen loading="lazy" title="${projeto.titulo}"></iframe></div>`;
  } else if (instagramEmbed) {
    midiaHTML = `<div class="midia-container midia-instagram"><iframe src="${instagramEmbed}" frameborder="0" scrolling="no" allowtransparency="true" loading="lazy"></iframe></div>`;
  } else if (projeto.imagens.length > 0) {
    const imgPrincipal = projeto.imagens[0];
    const maisImagens = projeto.imagens.length > 1 ? `<span class="badge-fotos">+${projeto.imagens.length - 1} fotos</span>` : '';
    const dataImagens = encodeURIComponent(JSON.stringify(projeto.imagens));
    midiaHTML = `<div class="midia-container midia-foto" data-imagens="${dataImagens}" onclick="abrirGaleria(this)"><img src="${imgPrincipal}" alt="${projeto.titulo}" loading="lazy" />${maisImagens}<div class="overlay-galeria">Ver galeria</div></div>`;
  } else {
    midiaHTML = `<div class="midia-placeholder"><span>Em breve</span></div>`;
  }

  return `<article class="card-projeto${projeto.destaque ? ' destaque' : ''}">${midiaHTML}<div class="card-info"><span class="card-ano">${projeto.ano}</span><h3>${projeto.titulo}</h3><p>${projeto.descricao}</p></div></article>`;
}

function renderizarSecao(containerId, projetos) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = projetos.length === 0
    ? '<p class="sem-projetos">Projetos em breve.</p>'
    : projetos.map(criarCardProjeto).join('');
}

function abrirGaleria(el) {
  const imagens = JSON.parse(decodeURIComponent(el.dataset.imagens));
  const modal = document.getElementById('modal-galeria');
  const conteudo = document.getElementById('galeria-conteudo');
  conteudo.innerHTML = imagens.map(src => `<img src="${src}" alt="Foto do projeto" />`).join('');
  modal.classList.add('ativo');
  document.body.style.overflow = 'hidden';
}

function fecharGaleria() {
  document.getElementById('modal-galeria').classList.remove('ativo');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  renderizarSecao('grid-regularizacao', PROJETOS.regularizacao);
  renderizarSecao('grid-civil', PROJETOS.civilEletricoHidraulico);
  renderizarSecao('grid-metalicas', PROJETOS.estruturasMetalicas);
  renderizarSecao('grid-obras', PROJETOS.gestaoObras);

  const waLink = document.getElementById('whatsapp-link');
  if (waLink) waLink.href = `https://wa.me/${CONTATO.whatsapp}`;
  const telEl = document.getElementById('tel-display');
  if (telEl) telEl.textContent = CONTATO.telefone;
  const emailEl = document.getElementById('email-display');
  if (emailEl) emailEl.textContent = CONTATO.email;

  document.getElementById('modal-fechar')?.addEventListener('click', fecharGaleria);
  document.getElementById('modal-galeria')?.addEventListener('click', (e) => {
    if (e.target.id === 'modal-galeria') fecharGaleria();
  });

  const menuBtn = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  menuBtn?.addEventListener('click', () => navLinks.classList.toggle('aberto'));

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navLinks?.classList.remove('aberto');
      const target = document.querySelector(link.getAttribute('href'));
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});
