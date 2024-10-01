if (!self.define) {
  let e,
    s = {};
  const a = (a, i) => (
    (a = new URL(a + '.js', i).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, g) => {
    const b = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[b]) return;
    let t = {};
    const o = (e) => a(e, b),
      n = { module: { uri: b }, exports: t, require: o };
    s[b] = Promise.all(i.map((e) => n[e] || o(e))).then((e) => (g(...e), t));
  };
}
define(['./workbox-588899ac'], function (e) {
  'use strict';
  importScripts('fallback-P5LMaVfRC4dF-qQ21NGoE.js'),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_offline', revision: 'P5LMaVfRC4dF-qQ21NGoE' },
        {
          url: '/github-pages/_next/static/P5LMaVfRC4dF-qQ21NGoE/_buildManifest.js',
          revision: '294dcd16c442d3c89eeb338f36482110',
        },
        {
          url: '/github-pages/_next/static/P5LMaVfRC4dF-qQ21NGoE/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/github-pages/_next/static/chunks/17007de1-60d3fae30a0e996b.js',
          revision: '60d3fae30a0e996b',
        },
        {
          url: '/github-pages/_next/static/chunks/175675d1-330f4ab809b1e02c.js',
          revision: '330f4ab809b1e02c',
        },
        {
          url: '/github-pages/_next/static/chunks/182-d97f0f9b49feee39.js',
          revision: 'd97f0f9b49feee39',
        },
        {
          url: '/github-pages/_next/static/chunks/22-0dc18584d82e6e95.js',
          revision: '0dc18584d82e6e95',
        },
        {
          url: '/github-pages/_next/static/chunks/252f366e-71c0ec96e69de7df.js',
          revision: '71c0ec96e69de7df',
        },
        {
          url: '/github-pages/_next/static/chunks/268-823cfd223279f75f.js',
          revision: '823cfd223279f75f',
        },
        {
          url: '/github-pages/_next/static/chunks/331.6907644e2ffd5ece.js',
          revision: '6907644e2ffd5ece',
        },
        {
          url: '/github-pages/_next/static/chunks/503-51d040388c840987.js',
          revision: '51d040388c840987',
        },
        {
          url: '/github-pages/_next/static/chunks/651.9f20ad3921641871.js',
          revision: '9f20ad3921641871',
        },
        {
          url: '/github-pages/_next/static/chunks/844-9e5ddf0910e6460e.js',
          revision: '9e5ddf0910e6460e',
        },
        {
          url: '/github-pages/_next/static/chunks/d0447323-b2dee076d7b30925.js',
          revision: 'b2dee076d7b30925',
        },
        {
          url: '/github-pages/_next/static/chunks/framework-a8266d1a0e70069c.js',
          revision: 'a8266d1a0e70069c',
        },
        {
          url: '/github-pages/_next/static/chunks/main-b5eabe6ecfec5301.js',
          revision: 'b5eabe6ecfec5301',
        },
        {
          url: '/github-pages/_next/static/chunks/pages/_app-0c58723f1749bdcc.js',
          revision: '0c58723f1749bdcc',
        },
        {
          url: '/github-pages/_next/static/chunks/pages/_error-6c33a5ffc44001b2.js',
          revision: '6c33a5ffc44001b2',
        },
        {
          url: '/github-pages/_next/static/chunks/pages/_offline-5b61ca47378f4235.js',
          revision: '5b61ca47378f4235',
        },
        {
          url: '/github-pages/_next/static/chunks/pages/about-aa96ec32fe6b76c7.js',
          revision: 'aa96ec32fe6b76c7',
        },
        {
          url: '/github-pages/_next/static/chunks/pages/blog-e6a848704b575dae.js',
          revision: 'e6a848704b575dae',
        },
        {
          url: '/github-pages/_next/static/chunks/pages/hire-me-fcf7fe76bc76ffbf.js',
          revision: 'fcf7fe76bc76ffbf',
        },
        {
          url: '/github-pages/_next/static/chunks/pages/index-3a5a7fd3cb9a98d9.js',
          revision: '3a5a7fd3cb9a98d9',
        },
        {
          url: '/github-pages/_next/static/chunks/pages/maze-05fbcfd5e688d191.js',
          revision: '05fbcfd5e688d191',
        },
        {
          url: '/github-pages/_next/static/chunks/pages/posts/%5Bslug%5D-7ed4292d09184296.js',
          revision: '7ed4292d09184296',
        },
        {
          url: '/github-pages/_next/static/chunks/pages/projects-143fc22635bcb77f.js',
          revision: '143fc22635bcb77f',
        },
        {
          url: '/github-pages/_next/static/chunks/pages/search-16fb63ee4dab302d.js',
          revision: '16fb63ee4dab302d',
        },
        {
          url: '/github-pages/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
          revision: '837c0df77fd5009c9e46d446188ecfd0',
        },
        {
          url: '/github-pages/_next/static/chunks/webpack-15770c295cf24a08.js',
          revision: '15770c295cf24a08',
        },
        {
          url: '/github-pages/_next/static/css/1431361d4ea547bf.css',
          revision: '1431361d4ea547bf',
        },
        {
          url: '/github-pages/_next/static/css/4cd57316e66c4d89.css',
          revision: '4cd57316e66c4d89',
        },
        {
          url: '/github-pages/_next/static/css/c40135eb8d5b95ae.css',
          revision: 'c40135eb8d5b95ae',
        },
        {
          url: '/github-pages/_next/static/css/cce25905c0589ca6.css',
          revision: 'cce25905c0589ca6',
        },
        {
          url: '/github-pages/_next/static/css/f194d6b02b08002c.css',
          revision: 'f194d6b02b08002c',
        },
        {
          url: '/github-pages/_next/static/css/f6d390c4a766ad1a.css',
          revision: 'f6d390c4a766ad1a',
        },
        {
          url: '/github-pages/_next/static/css/f9fb6756d5a6a764.css',
          revision: 'f9fb6756d5a6a764',
        },
        {
          url: '/github-pages/_next/static/media/dansk-standard.fd581fee.jpeg',
          revision: 'fd581fee',
        },
        { url: '/github-pages/_next/static/media/profil.9f7148a8.webp', revision: '9f7148a8' },
        {
          url: '/github-pages/assets/1oebrq3atabxean0z7xpcpwhyf1h.jpeg',
          revision: 'f31fc7412485d7e661d43b1eb2b51c83',
        },
        { url: '/github-pages/assets/ERD.svg', revision: '9a0975a3c503a88cdb48871bf652b2dd' },
        {
          url: '/github-pages/assets/blog/5-semester/datas.png',
          revision: '8f136ca872d80f96826c5b1502291b60',
        },
        {
          url: '/github-pages/assets/blog/authors/troels.png',
          revision: '99959fd7264aba75a7644ae38feaffbf',
        },
        {
          url: '/github-pages/assets/blog/chess/board1.png',
          revision: '3151bc6fb6ab90a5a550934d1661e958',
        },
        {
          url: '/github-pages/assets/blog/compiler/array.png',
          revision: 'a3a37c59b744cffa8d7879b7eb9fb7cb',
        },
        {
          url: '/github-pages/assets/blog/compiler/basic-compiler-phases.png',
          revision: '1fc6eb361a6808ccf8c70bc73d514325',
        },
        {
          url: '/github-pages/assets/blog/distribueret-galgeleg/REST.png',
          revision: '8889a7dba0b0262dc12587096c43b2dc',
        },
        {
          url: '/github-pages/assets/blog/distribueret-galgeleg/TUI.png',
          revision: '10b90944317680ed70ee02a315a3028d',
        },
        {
          url: '/github-pages/assets/blog/distribueret-galgeleg/log.png',
          revision: '072eab0f1dc3a2ae982a90bbfed716d6',
        },
        {
          url: '/github-pages/assets/blog/distribueret-galgeleg/login.png',
          revision: 'e1762b3e870481b5238b83f7b4788cda',
        },
        {
          url: '/github-pages/assets/blog/distribueret-galgeleg/system.png',
          revision: '8aaf534f280251bba80562ad6cda236e',
        },
        {
          url: '/github-pages/assets/blog/distribueret-galgeleg/ui.png',
          revision: '91e3643c14f4ae8e278485c66ff539dd',
        },
        {
          url: '/github-pages/assets/blog/download-from-dr/dr.png',
          revision: 'af1b45f4b9f8cbf21db60e90f068b9e5',
        },
        {
          url: '/github-pages/assets/blog/drones/clustersv2.png',
          revision: '241d31d36a97cdb685fc187980ed2c1d',
        },
        {
          url: '/github-pages/assets/blog/dtupay/commenications.png',
          revision: 'b5b7364ed56bfe26cdf3b568302d2dcf',
        },
        {
          url: '/github-pages/assets/blog/dynamic-routing/cover.jpg',
          revision: '50bc698719258529c800491531a3fe21',
        },
        {
          url: '/github-pages/assets/blog/grade-dtu-pwa/detail.png',
          revision: '3af268d150fd9d392f829d61f6022ed0',
        },
        {
          url: '/github-pages/assets/blog/grade-dtu-pwa/login.png',
          revision: '843381d277f852701cbdfd70aafd8100',
        },
        {
          url: '/github-pages/assets/blog/grade-dtu-pwa/main.jpg',
          revision: '6aae1585b1880df60d01bdbbbd016331',
        },
        {
          url: '/github-pages/assets/blog/grade-dtu-pwa/select.png',
          revision: '148205e24ba1cda289f3f81ee5084e63',
        },
        {
          url: '/github-pages/assets/blog/hello-world/cover.jpg',
          revision: 'faa59500b8a23c3dade89705c3d663a8',
        },
        {
          url: '/github-pages/assets/blog/noise-filtering/consol.png',
          revision: '10703bae2cc32e91f57070225eaa9e15',
        },
        {
          url: '/github-pages/assets/blog/noise-filtering/figur.png',
          revision: 'c32c0d1d989e9f601d59629cc6699337',
        },
        {
          url: '/github-pages/assets/blog/noise-filtering/figurartifakter.png',
          revision: 'd0929f9f1cf1e0b259d8f3365ab42b9b',
        },
        {
          url: '/github-pages/assets/blog/noise-filtering/pocket_watch-processed.bmp',
          revision: '9447bb77a539e7338399b2e7f60043e1',
        },
        {
          url: '/github-pages/assets/blog/noise-filtering/pocket_watch.bmp',
          revision: 'c3bce54cb84db31b6e2b3318be719a91',
        },
        {
          url: '/github-pages/assets/blog/old/3d model.svg',
          revision: '45a15d8a9aba082f30a781c5d640b7bc',
        },
        {
          url: '/github-pages/assets/blog/old/3d2.svg',
          revision: 'd25546f83b665390762e602b7a223b7b',
        },
        {
          url: '/github-pages/assets/blog/old/Artboard 1.svg',
          revision: '770f73fe58e0d66659ac641936c1f449',
        },
        {
          url: '/github-pages/assets/blog/old/DTU(logo).png',
          revision: '467e691bc84b72c4db185d30694e736f',
        },
        {
          url: '/github-pages/assets/blog/old/DTUGrades.png',
          revision: 'da306e02fa6a9598525d4589794c2cef',
        },
        {
          url: '/github-pages/assets/blog/old/Drone status.jpg',
          revision: 'e5538d2441d1419e27780a67c7015324',
        },
        {
          url: '/github-pages/assets/blog/old/Price.jpg',
          revision: 'ca1382e439b28db2195bb7eec063a43b',
        },
        {
          url: '/github-pages/assets/blog/old/TankGame.png',
          revision: 'dd2a2acd50af3e204a35aa9f3aa91b70',
        },
        {
          url: '/github-pages/assets/blog/old/algo.JPG',
          revision: 'ad2b75a0321d3fb5c592e809503102db',
        },
        {
          url: '/github-pages/assets/blog/old/algo.ai',
          revision: '6eaf5d1ac9d4c7465117be3dd4a1b583',
        },
        {
          url: '/github-pages/assets/blog/old/amanda logov5.svg',
          revision: '3725b83b9877c87e9471d9704fcdcb3e',
        },
        {
          url: '/github-pages/assets/blog/old/animation.fla',
          revision: '972b7838024a29f91028968ded912467',
        },
        {
          url: '/github-pages/assets/blog/old/animation.html',
          revision: '7d7921f6009dd35c8cc16c6aa26d0009',
        },
        {
          url: '/github-pages/assets/blog/old/animation.js',
          revision: '427173a9f58579ccc0ef78769eb67726',
        },
        {
          url: '/github-pages/assets/blog/old/animation0001.png',
          revision: '34436dd9344d4b904bc3eb7c41cb9910',
        },
        {
          url: '/github-pages/assets/blog/old/animation0002.png',
          revision: '0658cadfd0aa745a2bf0392415f89e70',
        },
        {
          url: '/github-pages/assets/blog/old/animation0003.png',
          revision: '666d48f0865022c537658647c3b09788',
        },
        {
          url: '/github-pages/assets/blog/old/animation0004.png',
          revision: 'fa94561a858ed7b5d4ead9c587295a17',
        },
        {
          url: '/github-pages/assets/blog/old/animation0005.png',
          revision: '09914dcc3b3abfb866dc0d61f01a8acb',
        },
        {
          url: '/github-pages/assets/blog/old/animation0006.png',
          revision: '90ec955a5498f6046900bfebde6dea78',
        },
        {
          url: '/github-pages/assets/blog/old/animation0007.png',
          revision: '26ac5374fd90efaf6155fb606e8a7f6a',
        },
        {
          url: '/github-pages/assets/blog/old/animation0008.png',
          revision: '1598984d06f7d8f8007f29dbfc6ccaa9',
        },
        {
          url: '/github-pages/assets/blog/old/animation0009.png',
          revision: '784516344f1f1ac7a29881f6d1820f1b',
        },
        {
          url: '/github-pages/assets/blog/old/animation0010.png',
          revision: '310ceaee7d2dd75b256d6808802152bc',
        },
        {
          url: '/github-pages/assets/blog/old/animation0011.png',
          revision: 'c066aee97a6bf3b1f740373ab40bad9c',
        },
        {
          url: '/github-pages/assets/blog/old/animation0012.png',
          revision: '53a8575b78ead900f829eaa03e360fde',
        },
        {
          url: '/github-pages/assets/blog/old/animation0013.png',
          revision: '1a62e2db97e9790ea251cb15b6ebd484',
        },
        {
          url: '/github-pages/assets/blog/old/animation0014.png',
          revision: '08dc7973c3e4ceac6eaa1b05a70da87d',
        },
        {
          url: '/github-pages/assets/blog/old/animation0015.png',
          revision: '1ce856df2199cb87efcb2d0e17f56fcd',
        },
        {
          url: '/github-pages/assets/blog/old/animation0016.png',
          revision: '40ecc845fccb2117e6202967bbc23846',
        },
        {
          url: '/github-pages/assets/blog/old/animation0017.png',
          revision: '6633c1a1e53352285d76ffed33de02d0',
        },
        {
          url: '/github-pages/assets/blog/old/animation0018.png',
          revision: '6456485c2f182638fc07c5625aa70b5f',
        },
        {
          url: '/github-pages/assets/blog/old/animation0019.png',
          revision: '0dcd102ba305093a37b24dae447063e2',
        },
        {
          url: '/github-pages/assets/blog/old/animation0020.png',
          revision: 'de4b061325594b211af41c10f9124fb3',
        },
        {
          url: '/github-pages/assets/blog/old/animation0021.png',
          revision: 'b4d8180ce1c879a0343ab07a70add497',
        },
        {
          url: '/github-pages/assets/blog/old/animation0022.png',
          revision: '5549d55847c0d402dde7a195ba4231b6',
        },
        {
          url: '/github-pages/assets/blog/old/animation0023.png',
          revision: '8a584dbeb9ed00eee2a7219b6b5db759',
        },
        {
          url: '/github-pages/assets/blog/old/animation0024.png',
          revision: '313dc88699767721af468e40c4fc6f31',
        },
        {
          url: '/github-pages/assets/blog/old/animation0025.png',
          revision: '4d20d9dc195f3e43721c2225bce61964',
        },
        {
          url: '/github-pages/assets/blog/old/animation0026.png',
          revision: 'e8a15884f403910fd154e7a4b490446d',
        },
        {
          url: '/github-pages/assets/blog/old/animation0027.png',
          revision: '6ddfac70c3fa53feba03a8bf771db4ba',
        },
        {
          url: '/github-pages/assets/blog/old/animation0028.png',
          revision: 'd74be58eab8ee2859e88c1fb0fec464a',
        },
        {
          url: '/github-pages/assets/blog/old/animation0029.png',
          revision: '5235f285a36af5f71742526504f0d56e',
        },
        {
          url: '/github-pages/assets/blog/old/animation0030.png',
          revision: '655fc3ad7789c6e8553fe7c86b20ff4c',
        },
        {
          url: '/github-pages/assets/blog/old/animation0031.png',
          revision: '42ef1983737fb3e2fc4edcafb4ae9818',
        },
        {
          url: '/github-pages/assets/blog/old/animation0032.png',
          revision: '8259effe1348403823ce61def0c0522a',
        },
        {
          url: '/github-pages/assets/blog/old/animation0033.png',
          revision: 'c3fd4777575763bf616ab2c70cc21113',
        },
        {
          url: '/github-pages/assets/blog/old/animation0034.png',
          revision: '0805c0e2c06970eb5e785935cb34fba9',
        },
        {
          url: '/github-pages/assets/blog/old/app.png',
          revision: '9fc5bb9be45d2e3a8f9ca4ceaca0a47c',
        },
        {
          url: '/github-pages/assets/blog/old/computer.svg',
          revision: 'fd11cd0e802a45381e19537332cec1df',
        },
        {
          url: '/github-pages/assets/blog/old/dark-triangles.png',
          revision: 'e81c8129adb180a486d94cc796352ccc',
        },
        {
          url: '/github-pages/assets/blog/old/datas.png',
          revision: '8f136ca872d80f96826c5b1502291b60',
        },
        {
          url: '/github-pages/assets/blog/old/drone.svg',
          revision: 'f32692f03ee7f31f1a4f9f7efc759d61',
        },
        {
          url: '/github-pages/assets/blog/old/email.svg',
          revision: 'd887338ac4637d9dffab6d1d31b936b3',
        },
        {
          url: '/github-pages/assets/blog/old/ep_naturalblack.png',
          revision: '23e2b6cf75076c68a788053631d1f14d',
        },
        {
          url: '/github-pages/assets/blog/old/exsportv2.svg',
          revision: 'c63455c6dc10ee9db0ebefc54034acaf',
        },
        {
          url: '/github-pages/assets/blog/old/falkologo.jpeg',
          revision: '15cd971f404ac29b0964e36de8881a6f',
        },
        {
          url: '/github-pages/assets/blog/old/feedback.png',
          revision: '3a0f895423f3d8b2733a011d4d82a411',
        },
        {
          url: '/github-pages/assets/blog/old/footersvg.svg',
          revision: 'fa272fb6c2592e83837a8e4eff230b4c',
        },
        {
          url: '/github-pages/assets/blog/old/gold-textures.jpg',
          revision: 'a84bbfa4883581867de5a1252a58691f',
        },
        {
          url: '/github-pages/assets/blog/old/graphgen.gif',
          revision: 'ffe55a24f96950f6dfa0a29939898754',
        },
        {
          url: '/github-pages/assets/blog/old/handwriting.svg',
          revision: 'd4657a79f19b47a3c5968d8f0478b4b2',
        },
        {
          url: '/github-pages/assets/blog/old/iconmonstr-paper-plane-1.svg',
          revision: '58690ad7d9360a654c7a1ffbfdffa3bc',
        },
        {
          url: '/github-pages/assets/blog/old/image3.jpg',
          revision: '96595dcd6dc424e884cc941d4ee55316',
        },
        {
          url: '/github-pages/assets/blog/old/image8.jpg',
          revision: '51a547298fadeee092cc0e7b988b6dc4',
        },
        {
          url: '/github-pages/assets/blog/old/images/Bitmap1.png',
          revision: '753a2f109483d972e1bee802f4afe0d9',
        },
        {
          url: '/github-pages/assets/blog/old/ios-gradviewer.jpg',
          revision: 'de8fd275f5bf02a97a85cf0850d290c7',
        },
        {
          url: '/github-pages/assets/blog/old/itMindsLogo.png',
          revision: '73806bea1b074b2dea71a73a0cdc34e6',
        },
        {
          url: '/github-pages/assets/blog/old/loading animation.fla',
          revision: '11dd2cb34baaf160bb392f9f0751ebb4',
        },
        {
          url: '/github-pages/assets/blog/old/loading animation.html',
          revision: '7518e11772a80fb601f16b8e66bbc8d2',
        },
        {
          url: '/github-pages/assets/blog/old/loading animation.js',
          revision: 'eef94553d5388576b34ce5d9f5f81054',
        },
        {
          url: '/github-pages/assets/blog/old/loading-animation.gif',
          revision: '91355fd08dc80a079c6381b9c19dc9d3',
        },
        {
          url: '/github-pages/assets/blog/old/loadinggif.gif',
          revision: '88f370353339187e5bbb92ce772cdf9a',
        },
        {
          url: '/github-pages/assets/blog/old/meetingapp1.png',
          revision: '510a1d656b9fb4f24de20fb95ddf07a5',
        },
        {
          url: '/github-pages/assets/blog/old/meetingapp2.png',
          revision: '42b6aa34b307ba1edb5d92ff2aea11ce',
        },
        {
          url: '/github-pages/assets/blog/old/meetingapp3.png',
          revision: 'e4f4a804e71dfdcd73a9329c9955f3c0',
        },
        {
          url: '/github-pages/assets/blog/old/meetingapp4.png',
          revision: 'c077ff6b5e54a5f4b08d7a2eacb74876',
        },
        {
          url: '/github-pages/assets/blog/old/mobil.svg',
          revision: '9ba23baa3f046b219ff2f41074ed1480',
        },
        {
          url: '/github-pages/assets/blog/old/motionD.jpg',
          revision: 'f7163e841b57f5d3954b504acdeecd20',
        },
        {
          url: '/github-pages/assets/blog/old/nilsbrock.jpg',
          revision: '56fc8b59a0fed95c0e20c6cd9833163b',
        },
        {
          url: '/github-pages/assets/blog/old/openCV-QR.png',
          revision: 'e4c51b1f5628b5df789491b8a1f2b43e',
        },
        {
          url: '/github-pages/assets/blog/old/pattern (1).svg',
          revision: 'a6521c814c2204ab36acd7f8f653b3ae',
        },
        {
          url: '/github-pages/assets/blog/old/pattern (5).svg',
          revision: 'a1687205c08203fd3a838ae47b219393',
        },
        {
          url: '/github-pages/assets/blog/old/pattern (6).svg',
          revision: '0ab2c22efe12710f7cc8b26ea1646205',
        },
        {
          url: '/github-pages/assets/blog/old/pattern (9).svg',
          revision: '271a39080b9d8baab70081c808d26dd8',
        },
        {
          url: '/github-pages/assets/blog/old/pattern.svg',
          revision: '482a8667064b8cb8027458407908a4d3',
        },
        {
          url: '/github-pages/assets/blog/old/ping.png',
          revision: 'e341a0aa3fa5c856bc0fef4f4e2d4c9b',
        },
        {
          url: '/github-pages/assets/blog/old/ro.png',
          revision: 'a57d32780475b1b70294b0580262563d',
        },
        {
          url: '/github-pages/assets/blog/old/svg animation/Artboard 1.svg',
          revision: '770f73fe58e0d66659ac641936c1f449',
        },
        {
          url: '/github-pages/assets/blog/old/svg animation/Artboard 10.svg',
          revision: 'f388eae2784adb34a4c1e75f733e2ce8',
        },
        {
          url: '/github-pages/assets/blog/old/svg animation/Artboard 2.svg',
          revision: '0ac03476f2d9eaca9a8c070167777302',
        },
        {
          url: '/github-pages/assets/blog/old/svg animation/Artboard 3.svg',
          revision: 'ef3de5495e5013608c9c3c1a1d40e0a7',
        },
        {
          url: '/github-pages/assets/blog/old/svg animation/Artboard 4.svg',
          revision: '9b53d77b0969ebb43412046c4b1ab787',
        },
        {
          url: '/github-pages/assets/blog/old/svg animation/Artboard 5.svg',
          revision: '1176ebcaf4a4d701b233386ab077c62b',
        },
        {
          url: '/github-pages/assets/blog/old/svg animation/Artboard 6.svg',
          revision: 'fc9e8f8ff210c8036f6f58503a29edba',
        },
        {
          url: '/github-pages/assets/blog/old/svg animation/Artboard 7.svg',
          revision: 'ed975fdf5fce2f78c1b8927ef0c3f881',
        },
        {
          url: '/github-pages/assets/blog/old/svg animation/Artboard 8.svg',
          revision: 'd5ae19d97cf5bdb895bb48085e408733',
        },
        {
          url: '/github-pages/assets/blog/old/svg animation/Artboard 9.svg',
          revision: '4a941a9bde48ae159dc4ed24b59c563b',
        },
        {
          url: '/github-pages/assets/blog/old/svg animation/v2/animation0025.png',
          revision: '8b8db46d86daacd63acf6b0b00cab790',
        },
        {
          url: '/github-pages/assets/blog/old/svg animation/v2/animation0026.png',
          revision: '8b8db46d86daacd63acf6b0b00cab790',
        },
        {
          url: '/github-pages/assets/blog/old/svg animation/v2/animation0027.png',
          revision: '8b8db46d86daacd63acf6b0b00cab790',
        },
        {
          url: '/github-pages/assets/blog/old/svg animation/v2/animation0028.png',
          revision: '8b8db46d86daacd63acf6b0b00cab790',
        },
        {
          url: '/github-pages/assets/blog/old/svg animation/v2/animation0029.png',
          revision: '8b8db46d86daacd63acf6b0b00cab790',
        },
        {
          url: '/github-pages/assets/blog/old/svg animation/v2/animation0030.png',
          revision: '8b8db46d86daacd63acf6b0b00cab790',
        },
        {
          url: '/github-pages/assets/blog/old/svg animation/v2/animation0031.png',
          revision: '8b8db46d86daacd63acf6b0b00cab790',
        },
        {
          url: '/github-pages/assets/blog/old/svg animation/v2/animation0032.png',
          revision: '8b8db46d86daacd63acf6b0b00cab790',
        },
        {
          url: '/github-pages/assets/blog/old/thumb-1920-467160.jpg',
          revision: '051f823733d987d58f2a42d474e950b3',
        },
        {
          url: '/github-pages/assets/blog/old/tower1.png',
          revision: 'acdf359ee2879acf523b1f729026c66b',
        },
        {
          url: '/github-pages/assets/blog/old/tower2.png',
          revision: 'b3522dda204787ba39c6ce0ae7606534',
        },
        {
          url: '/github-pages/assets/blog/old/undefined',
          revision: '12c0c7f9155159429917323ec1b0822d',
        },
        {
          url: '/github-pages/assets/blog/old/undefinedimages/Bitmap_1_png.png',
          revision: '933e2e4cdf012b66cb72781c5cb528f1',
        },
        {
          url: '/github-pages/assets/blog/old/webside.png',
          revision: '53a94ff9831cbd7ffe9edd60eab5329a',
        },
        {
          url: '/github-pages/assets/blog/old/webside.psd',
          revision: '0f3f0f258c23a7a7092899ae79f91a8c',
        },
        {
          url: '/github-pages/assets/blog/personal-website/home.png',
          revision: 'e90519b04bb7265dadba78b35286f586',
        },
        {
          url: '/github-pages/assets/blog/preview/cover.jpg',
          revision: 'ea4aba2e4b93a3bb05f45b5a99cf6cc6',
        },
        {
          url: '/github-pages/assets/blog/rc-car/car.jpg',
          revision: '07571b653939d4c0c99aac2a6f6f6860',
        },
        {
          url: '/github-pages/assets/blog/risc-v/risc.webp',
          revision: '90a4aa3f6b51bd18b12ded8f698fc0c8',
        },
        { url: '/github-pages/assets/brackets.svg', revision: 'a468bb2331ceaf496640cc056bc758a7' },
        {
          url: '/github-pages/assets/dansk-standard.jpeg',
          revision: '824b46ba692dbeb4c59da5ef620d9a10',
        },
        { url: '/github-pages/assets/ds.png', revision: 'e042930b2288eff2b354057067d204ca' },
        { url: '/github-pages/assets/flags/da.svg', revision: '3d9750d50c446f0f88fc30e6fac00638' },
        { url: '/github-pages/assets/flags/en.svg', revision: '03c5a325cf69bd91e5ca24c0f9206113' },
        { url: '/github-pages/assets/legos.png', revision: '66dd21115b2532080ed8ff2bb202a8c6' },
        {
          url: '/github-pages/assets/logos/Logo-blue.png',
          revision: '5129217da303946dc9d73281c928f063',
        },
        { url: '/github-pages/assets/logos/dtu.png', revision: 'c0c63bbde3a2d09b0d724c4b28395283' },
        {
          url: '/github-pages/assets/logos/it-minds-logo.png',
          revision: '94992b0a8251e39ba664fcddd7d84bee',
        },
        {
          url: '/github-pages/assets/logos/logos.jpeg',
          revision: '63ed3f010a741f4ebc3145cbf23e32ad',
        },
        {
          url: '/github-pages/assets/logos/spinoff.gif',
          revision: '438ba5310b213b7f97c3604e54e81a10',
        },
        {
          url: '/github-pages/assets/paper-plane.svg',
          revision: '58690ad7d9360a654c7a1ffbfdffa3bc',
        },
        {
          url: '/github-pages/assets/particles.json',
          revision: '32e7546bf48ed9daf99dee9834e190a5',
        },
        {
          url: '/github-pages/assets/webservices.png',
          revision: 'b8a9750bedf56aec34d8bf71add0cf48',
        },
        {
          url: '/github-pages/assets/webservices.svg',
          revision: '269ec8c254bf6bd9c9d002e885aa2a96',
        },
        {
          url: '/github-pages/favicon/android-chrome-192x192.png',
          revision: '459dac2113348dfadd8e0a96e4f39dc9',
        },
        {
          url: '/github-pages/favicon/android-chrome-512x512.png',
          revision: '1dd09f49a871135445f7bd7946c66676',
        },
        {
          url: '/github-pages/favicon/apple-touch-icon.png',
          revision: '7d8281986da8db9c1b5413570ecc1f83',
        },
        {
          url: '/github-pages/favicon/browserconfig.xml',
          revision: '765146e15223505546b54d3db36babf3',
        },
        {
          url: '/github-pages/favicon/favicon-16x16.png',
          revision: '12b1cab2ce8a716a075f33cffcc9bc97',
        },
        {
          url: '/github-pages/favicon/favicon-32x32.png',
          revision: '096850f15c19cf78da22a61a7fc60b53',
        },
        { url: '/github-pages/favicon/favicon.ico', revision: 'aaa3368a9b5804c3f3cbd6b6f8e17dcc' },
        {
          url: '/github-pages/favicon/mstile-150x150.png',
          revision: 'fc5bd63ac943de622b000d45404f070c',
        },
        {
          url: '/github-pages/favicon/safari-pinned-tab.svg',
          revision: '40c9bc99e963fb841cd147f0374682fe',
        },
        { url: '/github-pages/manifest.json', revision: '8d55b61c6d741d176e2a44f13a877471' },
        { url: '/github-pages/profil.webp', revision: '30efd6148390ac268c6fd363c922df95' },
        {
          url: '/github-pages/splash/Default@2x~iphone~comany.png',
          revision: '11bb729c3fc243c6d2b0375215500cbc',
        },
        { url: '/github-pages/vercel.svg', revision: '4b4f1876502eb6721764637fe5c41702' },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/github-pages',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: a, state: i }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, { status: 200, statusText: 'OK', headers: s.headers })
                : s,
          },
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      'GET',
    );
});
