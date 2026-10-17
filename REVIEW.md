# Revisão das prévias — 18/10/2026

## Fontes

- Drive: índice `BeeverForge_Entrega_Final.md` e Brand Guidelines v1 (PDF e texto) lidos. O manual confirma as decisões aprovadas em 17/10/2026. Os SVGs já presentes no checkout foram conferidos contra os mestres extraídos no espaço de trabalho; a assinatura usada corresponde ao arquivo oficial.
- Community: README e `docs/STATUS.md` do checkout local `openfactory-core` em `da345623` (13/10/2026); STATUS declara fotografia de 26/08/2026. O site antigo foi consultado. As alegações de Enterprise derivam do briefing do proprietário e são rotuladas por estado.
- CastelloSoft: referência visual consultada pelo navegador em 18/10/2026. Foi usada como referência de clareza e acabamento, sem reproduzir sua identidade.
- O painel Hostinger mostrou domínio e SSL ativos, mas não comprovou hospedagem contratada. O repositório local contém um workflow GitHub Pages para `main`.
- A imagem anexada do fluxo Enterprise não estava presente nesta conversa nem em `sources/`; o diagrama segue a sequência textual detalhada no briefing.

## Verificação local

Com `python -m http.server 8765`, a navegação direta por `/v1/`, `/v2/` e `/v3/` retornou HTTP 200 em Chromium local, em 1440 × 900 e 390 × 844. Os seis cenários tiveram um `h1`, sem rolagem horizontal, erros JavaScript, imagens quebradas ou âncoras internas ausentes. O menu móvel abriu e fechou por botão e Escape; o explorador da V2 mudou de etapa. Capturas completas estão em `review/`.

Tempos de `load` coletados pelo navegador local, sem limitação de CPU ou rede: V1 91 ms desktop / 13 ms celular; V2 30 / 10 ms; V3 10 / 10 ms. Transferência reportada para recursos adicionais: 35.281 B na V1 e V3, 25.916 B na V2. Esses valores são de laboratório em loopback, com cache e hardware local; não são notas Lighthouse nem dados reais de usuários.

SEO técnico das prévias: HTML principal renderizado, títulos e descrições específicos, `lang=pt-BR`, um `h1`, imagens com dimensões e `alt`, `noindex,follow`, canonical por rota, Open Graph por rota e ausência das variantes no sitemap. `robots.txt` permite a leitura do `noindex`. Os dados estruturados contêm apenas a organização e a URL da marca. A raiz pública permanece como estava.

O endereço comercial `contact@beeverforge.com` recebeu um teste em 17/10/2026; as prévias direcionam por `mailto:`. O formulário antigo não foi retestado.

Pendências: confirmação de disponibilidade de SSO, RBAC e suporte; validação de integração dos módulos Enterprise; decisão de hospedagem e versão vencedora; auditoria Lighthouse após implantação em ambiente representativo; redirecionamentos do domínio anterior. A entrega não altera DNS nem publica as prévias.
