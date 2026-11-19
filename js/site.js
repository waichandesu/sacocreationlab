// ページを開いたときは常に先頭から表示する（#付きのリンクを除く）
(function () {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (!location.hash) {
    window.scrollTo(0, 0);
    // プレビューなど、ページが枠の中に埋め込まれている場合も先頭に戻す
    window.addEventListener('load', function () {
      try { document.body.scrollIntoView({ block: 'start' }); } catch (e) {}
    });
  }
})();

// スマホ用メニューの開閉
(function () {
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('gnav');
  if (!btn || !nav) return;
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'ページ一覧を閉じる' : 'ページ一覧を開く');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'ページ一覧を開く');
    }
  });
})();
