// Gerado a partir das capturas aprovadas em /public/vitrine. [src, largura, altura]
const raw = {
  "fl-d-fold": [
    "/vitrine/fl-d-fold.jpg",
    1440,
    900
  ],
  "fl-d-trans": [
    "/vitrine/fl-d-trans.jpg",
    1440,
    900
  ],
  "fl-d-mar": [
    "/vitrine/fl-d-mar.jpg",
    1440,
    900
  ],
  "fl-d-meio": [
    "/vitrine/fl-d-meio.jpg",
    1440,
    900
  ],
  "fl-m-mar": [
    "/vitrine/fl-m-mar.jpg",
    390,
    844
  ],
  "fl-m-fold": [
    "/vitrine/fl-m-fold.jpg",
    390,
    844
  ],
  "fl-m-leve": [
    "/vitrine/fl-m-leve.jpg",
    390,
    844
  ],
  "ft-home-desktop-fold": [
    "/vitrine/ft-home-desktop-fold.jpg",
    1920,
    1200
  ],
  "ft-pdp-desktop-fold": [
    "/vitrine/ft-pdp-desktop-fold.jpg",
    1920,
    1200
  ],
  "ft-cart-mobile": [
    "/vitrine/ft-cart-mobile.jpg",
    780,
    1688
  ],
  "ft-shopify-car": [
    "/vitrine/ft-shopify-car.jpg",
    1700,
    731
  ],
  "ft-pdp-mobile-s01": [
    "/vitrine/ft-pdp-mobile-s01.jpg",
    780,
    1688
  ],
  "four-app-1": [
    "/vitrine/four-app-1.jpg",
    1920,
    1072
  ],
  "four-app-2": [
    "/vitrine/four-app-2.jpg",
    1920,
    1072
  ],
  "ft-home-mobile-fold": [
    "/vitrine/ft-home-mobile-fold.jpg",
    780,
    1688
  ],
  "ft-home-desktop-s02": [
    "/vitrine/ft-home-desktop-s02.jpg",
    1920,
    1200
  ],
  "ft-home-desktop-s08": [
    "/vitrine/ft-home-desktop-s08.jpg",
    1920,
    1200
  ],
  "ft-home-desktop-s06": [
    "/vitrine/ft-home-desktop-s06.jpg",
    1920,
    1200
  ],
  "ft-home-desktop-s07": [
    "/vitrine/ft-home-desktop-s07.jpg",
    1920,
    1200
  ],
  "ft-pdp-desktop-s02": [
    "/vitrine/ft-pdp-desktop-s02.jpg",
    1920,
    1200
  ],
  "ft-pdp-mobile-fold": [
    "/vitrine/ft-pdp-mobile-fold.jpg",
    780,
    1688
  ],
  "ft-cart-desktop": [
    "/vitrine/ft-cart-desktop.jpg",
    1920,
    1200
  ],
  "ft-pdp-desktop-s03": [
    "/vitrine/ft-pdp-desktop-s03.jpg",
    1920,
    1200
  ],
  "ft-home-desktop-s10": [
    "/vitrine/ft-home-desktop-s10.jpg",
    1920,
    1200
  ],
  "ft-home-desktop-s04": [
    "/vitrine/ft-home-desktop-s04.jpg",
    1920,
    1200
  ],
  "ft-home-mobile-s07": [
    "/vitrine/ft-home-mobile-s07.jpg",
    780,
    1688
  ],
  "fl-logo-sol": [
    "/vitrine/fl-logo-sol.png",
    504,
    492
  ],
  "ft-logo-header": [
    "/vitrine/ft-logo-header.png",
    600,
    173
  ],
  "four-logo": [
    "/vitrine/four-logo.png",
    800,
    298
  ],
  "logosneakers": [
    "/vitrine/logosneakers.png",
    700,
    360
  ],
  "logofl": [
    "/vitrine/logofl.png",
    600,
    199
  ],
  "logojsete": [
    "/vitrine/logojsete.png",
    600,
    325
  ]
};

export const img = Object.fromEntries(
  Object.entries(raw).map(([key, [src, width, height]]) => [key, { src, width, height }]),
);
