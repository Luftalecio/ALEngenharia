# Alecio Luft Engenharia Civil — Site Institucional

## Como usar o site

### Estrutura de pastas

```
alecio-site/
│
├── index.html              ← Página principal (não altere)
├── css/
│   └── estilo.css          ← Estilos visuais (não precisa alterar)
├── js/
│   └── projetos.js         ← ARQUIVO QUE VOCÊ VAI EDITAR para adicionar projetos
│
└── imagens/
    ├── regularizacao/                      ← Fotos de projetos de regularização
    ├── projetos-civil-eletrico-hidraulico/ ← Fotos de projetos civil/elétrico/hidráulico
    ├── estruturas-metalicas/               ← Fotos de estruturas metálicas
    └── gestao-obras/                       ← Fotos de gestão de obras
```

---

## Como adicionar um projeto com fotos

### Passo 1 — Coloque as fotos na pasta correta
Crie uma subpasta dentro da categoria e coloque as imagens lá.

**Exemplo:**
```
imagens/estruturas-metalicas/galp-industria-2024/
    foto1.jpg
    foto2.jpg
    foto3.jpg
```

### Passo 2 — Edite o arquivo `js/projetos.js`
Abra o arquivo no Bloco de Notas ou qualquer editor de texto.

Encontre a seção da categoria desejada e adicione um novo bloco:

```javascript
{
  titulo: "Nome do Projeto",
  descricao: "Descrição breve do que foi feito.",
  imagens: [
    "imagens/estruturas-metalicas/galp-industria-2024/foto1.jpg",
    "imagens/estruturas-metalicas/galp-industria-2024/foto2.jpg",
    "imagens/estruturas-metalicas/galp-industria-2024/foto3.jpg",
  ],
  video: "",   // deixe vazio se não tiver vídeo
  ano: "2024",
  destaque: true
},
```

**Atenção:** Mantenha as vírgulas no lugar certo. 
Não apague as aspas ou chaves. Se tiver dúvida, não altere o que não precisa.

---

## Como adicionar um vídeo do YouTube

1. Abra o vídeo no YouTube
2. Copie a URL do vídeo (ex: `https://www.youtube.com/watch?v=ABC123`)
3. Cole no campo `video:` do projeto:

```javascript
video: "https://www.youtube.com/watch?v=ABC123",
```

---

## Como atualizar as informações de contato

No arquivo `js/projetos.js`, localize a seção `CONTATO` e preencha:

```javascript
const CONTATO = {
  whatsapp: "5541999999999",    // DDD + número, só números, sem espaços
  telefone: "(41) 99999-9999",  // Exibido na tela
  email: "contato@seudominio.com.br",
  cidade: "Curitiba - PR"
};
```

---

## Como publicar o site gratuitamente no GitHub Pages

1. Crie uma conta em https://github.com (gratuito)
2. Crie um repositório com o nome: `alecioluft` (ou o nome que quiser)
3. Faça upload de todos os arquivos da pasta `alecio-site/`
4. Acesse as configurações do repositório → "Pages"
5. Selecione a branch `main` e clique em "Save"
6. Seu site ficará disponível em: `https://seu-usuario.github.io/alecioluft`

**Custo: R$ 0,00 por mês.**

Se quiser um domínio próprio (ex: `alecioluftengenharia.com.br`), 
o domínio .com.br custa em média R$ 40/ano no Registro.br.

---

## Dicas de fotos

- Prefira fotos horizontais (paisagem), elas ficam melhores na galeria
- Tamanho ideal: largura entre 1200px e 1920px
- Formato JPG ou PNG
- Evite fotos muito pesadas (acima de 3MB por foto pode deixar o site lento)
- Renomeie as fotos com nomes sem espaços ou acentos (use `-` ao invés de espaço)
  - ✅ `fachada-frente.jpg`
  - ❌ `fachada frente.jpg`
  - ❌ `fachada_frente_final_versão2.jpg`
