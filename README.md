# BeeverForge website

Three complete directions for the BeeverForge marketing website:

- `/v1/` — premium, product-led introduction
- `/v2/` — delivery-system narrative
- `/v3/` — portfolio and leadership narrative

This is a dependency-free static website. Preview it from the repository root with any static HTTP server, then open the desired path.

## Prévias em pt-BR (branch `feat/three-ptbr-concepts`)

As três propostas novas são geradas por `node scripts/build-previews.mjs` em `v1/index.html`, `v2/index.html` e `v3/index.html`. O gerador compartilha conteúdo, matriz, fluxo, metadados e navegação. `assets/previews.css` dá a cada versão uma composição própria; `assets/previews.js` cuida do menu e do explorador de etapas da V2. Para testar, execute `python -m http.server 8765` na raiz e abra `http://localhost:8765/v1/`, `/v2/` e `/v3/`.

Estas rotas são prévias: cada página tem `noindex,follow`, canonical próprio e está fora de `sitemap.xml`. A página pública da raiz e o workflow de publicação existente foram preservados. O workflow atual copia apenas a raiz e os ativos para GitHub Pages; portanto, estas três prévias ainda **não** são publicadas por um push desta branch. A instalação do domínio no painel Hostinger não implica uma hospedagem Hostinger ativa. O estado de domínio lido no hPanel em 18/10/2026 mostra domínio ativo, SSL ativo e nameservers `horizon.dns-parking.com` e `orbit.dns-parking.com`; isso não prova qual serviço entrega o site.

O endereço `contact@beeverforge.com` foi confirmado por um teste recebido no Gmail e registro de entrega no Resend em 17/10/2026. As prévias usam um link `mailto:` e não têm formulário ativo. O Worker da página anterior não foi retestado nestas versões.

### Depois da escolha

1. Confirmar a versão vencedora, o canal comercial, a disponibilidade real de cada módulo Enterprise e a infraestrutura de hospedagem.
2. Trazer a composição escolhida para `/`, ajustar canonical e Open Graph para a raiz e incluir somente a raiz no sitemap. Decidir se `/v1`, `/v2` e `/v3` serão removidas ou mantidas como prévias `noindex`; se removidas, criar redirecionamentos permanentes para `/`.
3. Configurar e testar o destino do contato antes de ativar qualquer formulário. Verificar DNS, HTTPS e resposta da raiz antes de liberar indexação.
4. Planejar redirecionamentos de URLs equivalentes de `openfactory.digital` para `beeverforge.com` em uma etapa separada, com inventário de URLs e aprovação para alterar o domínio anterior.

Ver [PRODUCT_MATRIX.md](PRODUCT_MATRIX.md) para fontes e pendências e [REVIEW.md](REVIEW.md) para os testes locais.

## Brand assets

Approved BeeverForge master assets are kept in `assets/`. The wordmark is supplied as the approved vector artwork and must not be recreated as text.

## Deployment

The site is ready for GitHub Pages or any static hosting provider. Publish the repository root as the web root and point `beeverforge.com` to the hosting provider. HTTPS must be enabled before the canonical, Open Graph and sitemap URLs are indexed.
