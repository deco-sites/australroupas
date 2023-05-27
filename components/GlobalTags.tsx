import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

      {/* Tailwind v3 CSS file */}
      <link href={asset("/styles.css")} rel="stylesheet" />

      {/* Icons */}
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={asset("/favicon-32x32.png")}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={asset("/favicon-16x16.png")}
      />
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href={asset("/favicon-32x32.png")}
      />

    <style dangerouslySetInnerHTML={{__html: `
      @font-face {
        font-family: "icomoon";
        src: url("https://austral.vteximg.com.br/arquivos/icomoon.eot.css?v=0.0.8");
        src: url("https://austral.vteximg.com.br/arquivos/icomoon.eot.css?v=0.0.8#iefix") format("embedded-opentype"),url("https://austral.vteximg.com.br/arquivos/icomoon.ttf.css?v=0.0.8") format("truetype"),url("https://austral.vteximg.com.br/arquivos/icomoon.woff.css?v=0.0.8") format("woff"),url("https://austral.vteximg.com.br/arquivos/icomoon.svg.css?v=0.0.8#icomoon") format("svg");
        font-weight: normal;
        font-style: normal;
        font-display: block
      }
      
      [class^="icon-"],[class*=" icon-"] {
          font-family: "icomoon" !important;
          speak: never;
          font-style: normal;
          font-weight: normal;
          font-variant: normal;
          text-transform: none;
          line-height: 1;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale
      }

      .icon-menu:before {
          content: ""
      }

      .icon-plus:before {
          content: ""
      }

      .icon-minus:before {
          content: ""
      }

      .icon-arrow:before {
          content: ""
      }

      .icon-close:before {
          content: ""
      }

      .icon-delete:before {
          content: ""
      }

      .icon-search:before {
          content: ""
      }

      .icon-phone:before {
          content: ""
      }

      .icon-user:before {
          content: ""
      }

      .icon-minicart:before {
          content: ""
      }

      .icon-heart:before {
          content: ""
      }

      .icon-heart-full:before {
          content: ""
      }

      .icon-mouse:before {
          content: ""
      }

      .icon-share:before {
          content: ""
      }

      .icon-edit:before {
          content: ""
      }

      .icon-email:before {
          content: ""
      }

      .icon-check:before {
          content: ""
      }

      .icon-zoom:before {
          content: ""
      }

      .icon-warning:before {
          content: ""
      }

      .icon-hanger:before {
          content: ""
      }

      .icon-rule:before {
          content: ""
      }

      .icon-security:before {
          content: ""
      }

      .icon-arroba:before {
          content: ""
      }

      .icon-embalagem:before {
          content: ""
      }

      .icon-notification:before {
          content: ""
      }

      .icon-pin:before {
          content: ""
      }

      .icon-play:before {
          content: ""
      }

      .icon-facebook:before {
          content: ""
      }

      .icon-whatsapp:before {
          content: ""
      }

      .icon-instagram:before {
          content: ""
      }

      .icon-youtube:before {
          content: ""
      }

      .icon-pinterest:before {
          content: ""
      }
    `}} />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />
    </Head>
  );
}

export default GlobalTags;
