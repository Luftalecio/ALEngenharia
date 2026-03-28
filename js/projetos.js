/**
 * ALECIO LUFT ENGENHARIA CIVIL
 * Arquivo de configuração dos projetos
 * 
 * COMO ADICIONAR UM NOVO PROJETO:
 * 1. Crie uma pasta dentro de "imagens/[tipo-de-projeto]/"
 * 2. Coloque as fotos dentro dessa pasta
 * 3. Adicione um item no array correspondente abaixo seguindo o modelo
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
    // Para adicionar mais projetos, copie o bloco acima e preencha os dados
  ],

  civilEletricoHidraulico: [
    {
      titulo: "Projeto Fundação",
      descricao: "Projetos civil, elétrico e hidráulico de residência unifamiliar. Acompanhamento completo desde o lançamento até a execução.",
      imagens: [
        "imagens/projetos-civil-eletrico-hidraulico/Fundacao",
        "imagens/projetos-civil-eletrico-hidraulico/Projeto Fundação",
      ],
      video: "",
      ano: "2024",
      destaque: true
    },
  ],

  estruturasMetalicas: [
    {
      titulo: "Projeto e Execução — Ginásio",
      descricao: "Projeto e execução de estrutura metálica para ginásio. Treliças, pilares e coberta em telha metálica.",
      imagens: [
        "imagens/estruturas-metalicas/Projeto e execução ginásio.png",
      ],
      video: "",
      ano: "2024",
      destaque: true
    },
  ],

  gestaoObras: [
    {
      titulo: "Reforma de Apartamento",
      descricao: "Gestão completa de reforma de apartamento. Controle de cronograma, equipes e materiais.",
      imagens: [
        "imagens/gestao-obras/Reforma Apto.png",
      ],
      video: "",
      ano: "2024",
      destaque: false
    },
  ]
};

/**
 * CONTATO
 * Altere os dados abaixo com as informações reais
 */
const CONTATO = {
  whatsapp: "5547991205982", // DDD + número, sem espaços ou traços
  telefone: "(47) 99120-5982",
  email: "luft502@hotmail.com",
  cidade: "Navegantes - SC"
};

/**
 * Não é necessário alterar o código abaixo
 * Ele é responsável por gerar as galerias automaticamente
 */
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
  const temMidia = projeto.imagens.length > 0 || projeto.video;
  const youtubeId = getYoutubeId(projeto.video);
  const instagramEmbed = getInstagramEmbed(projeto.video);

  let midiaHTML = '';

  if (youtubeId) {
    midiaHTML = `
      <div class="midia-container">
        <iframe src="https://www.youtube.com/embed/${youtubeId}" 
          frameborder="0" allowfullscreen loading="lazy"
          title="${projeto.titulo}"></iframe>
      </div>`;
  } else if (instagramEmbed) {
    midiaHTML = `
      <div class="midia-container midia-instagram">
        <iframe src="${instagramEmbed}" frameborder="0" scrolling="no"
          allowtransparency="true" loading="lazy"></iframe>
      </div>`;
  } else if (projeto.imagens.length > 0) {
    const imgPrincipal = projeto.imagens[0];
    const maisImagens = projeto.imagens.length > 1 
      ? `<span class="badge-fotos">+${projeto.imagens.length - 1} fotos</span>` 
      : '';
    midiaHTML = `
      <div class="midia-container midia-foto" onclick="abrirGaleria(${JSON.stringify(projeto.imagens)})">
        <img src="${imgPrincipal}" alt="${projeto.titulo}" loading="lazy" />
        ${maisImagens}
        <div class="overlay-galeria">Ver galeria</div>
      </div>`;
  } else {
    midiaHTML = `
      <div class="midia-placeholder">
        <span>Em breve</span>
      </div>`;
  }

  return `
    <article class="card-projeto${projeto.destaque ? ' destaque' : ''}">
      ${midiaHTML}
      <div class="card-info">
        <span class="card-ano">${projeto.ano}</span>
        <h3>${projeto.titulo}</h3>
        <p>${projeto.descricao}</p>
      </div>
    </article>`;
}

function renderizarSecao(containerId, projetos) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (projetos.length === 0) {
    container.innerHTML = '<p class="sem-projetos">Projetos em breve.</p>';
    return;
  }
  container.innerHTML = projetos.map(criarCardProjeto).join('');
}

function abrirGaleria(imagens) {
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

  // Preenche contato
  const waLink = document.getElementById('whatsapp-link');
  if (waLink) waLink.href = `https://wa.me/${CONTATO.whatsapp}`;
  const telEl = document.getElementById('tel-display');
  if (telEl) telEl.textContent = CONTATO.telefone;
  const emailEl = document.getElementById('email-display');
  if (emailEl) emailEl.textContent = CONTATO.email;

  // Fechar modal
  document.getElementById('modal-fechar')?.addEventListener('click', fecharGaleria);
  document.getElementById('modal-galeria')?.addEventListener('click', (e) => {
    if (e.target.id === 'modal-galeria') fecharGaleria();
  });

  // Menu mobile
  const menuBtn = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  menuBtn?.addEventListener('click', () => navLinks.classList.toggle('aberto'));

  // Scroll suave para âncoras
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navLinks?.classList.remove('aberto');
      const target = document.querySelector(link.getAttribute('href'));
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});
