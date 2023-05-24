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

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @font-face {
          font-family: 'Lato';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url(${asset("/fonts/Lato-Regular.woff2")}) format('woff2');
        }
        @font-face {
          font-family: 'Lato';
          font-style: bold;
          font-weight: 700;
          font-display: swap;
          src: url(${asset("/fonts/Lato-Bold.woff2")}) format('woff2');
        }
        `,
        }}
      >
      </style>

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />
    </Head>
  );
}

export default GlobalTags;
