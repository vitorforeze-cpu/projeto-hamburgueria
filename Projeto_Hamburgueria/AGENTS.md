# Padrão Técnico (vale para todos os sites)

Cole este bloco no Codex **antes** do prompt do cliente.

---

## Regras de código

- HTML5 semântico + CSS puro. Sem framework (nada de Bootstrap, Tailwind ou React).
- JavaScript só quando for necessário (menu mobile, rolagem suave, FAQ). Vanilla JS, sem biblioteca.
- Arquivos separados: `index.html`, `css/style.css`, `js/script.js`.
- Código simples e comentado em português, no nível de quem está aprendendo.
  Nada de truque de CSS avançado ou nome de classe abreviado.

## Layout

- **Mobile first obrigatório**: escreva primeiro o CSS do celular e depois use
  `@media (min-width: 768px)` e `@media (min-width: 1024px)` para telas maiores.
- **Flexbox** para navegação, alinhamento de seções e footer.
- **CSS Grid** para coleções de cards (produtos, serviços, depoimentos, galeria).
- Largura máxima do conteúdo: 1200px, centralizado.

## CSS

- Definir as cores e fontes em `:root` com variáveis CSS (`--cor-primaria`, etc.).
- Usar `rem` para fontes e espaçamentos.
- Imagens sempre com `max-width: 100%` e `display: block`.
- Efeitos discretos de `hover` e `transition` em botões e cards.

## Acessibilidade e qualidade

- `<html lang="pt-BR">`, `alt` descritivo em toda imagem, contraste de texto legível.
- Títulos em ordem: um único `<h1>`, depois `<h2>` por seção.
- `<title>` e `<meta name="description">` preenchidos com o nome e a cidade do negócio.
- Links de WhatsApp no formato: `https://wa.me/55DDDNUMERO?text=mensagem%20pronta`.
- Nada de link quebrado ou `href="#"` sem função.

## O que NÃO fazer

- Não inventar seção que não foi pedida.
- Não deixar texto "Lorem ipsum".
- Não usar imagem com link externo aleatório que pode sair do ar.
