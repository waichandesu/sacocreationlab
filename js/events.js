// 毎月の講座の「次回の開催日」を自動で表示します。
// 年始などで日程が変わる月は、下の changes に書き足してください。
//   日付を変える月 … '2027-01': '2027-01-10'
//   お休みの月     … '2027-08': 'お休み'
// 書き方の例のとおり、年と月は「年-月（2けた）」です。
var EVENT_SCHEDULE = {
  publico: {
    rule: { week: 1, weekday: 6 }, // 第1土曜日（0=日, 6=土）
    changes: {
      // '2027-01': '2027-01-10',
    }
  },
  nakano: {
    rule: { week: 3, weekday: 0 }, // 第3日曜日
    changes: {
      // '2027-01': 'お休み',
    }
  }
};

(function () {
  var WD = ['日', '月', '火', '水', '木', '金', '土'];
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function nth(y, m, week, weekday) {
    var first = new Date(y, m, 1).getDay();
    return new Date(y, m, 1 + ((weekday - first + 7) % 7) + (week - 1) * 7);
  }
  function nextDate(ev) {
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    for (var i = 0; i < 14; i++) {
      var y = now.getFullYear(), m = now.getMonth() + i;
      var d0 = new Date(y, m, 1); y = d0.getFullYear(); m = d0.getMonth();
      var key = y + '-' + pad(m + 1);
      var c = ev.changes && ev.changes[key];
      if (c === 'お休み') continue;
      var d;
      if (c) { var p = c.split('-'); d = new Date(+p[0], +p[1] - 1, +p[2]); }
      else { d = nth(y, m, ev.rule.week, ev.rule.weekday); }
      if (d >= today) return d;
    }
    return null;
  }
  function fmt(d) {
    return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日（' + WD[d.getDay()] + '）';
  }
  document.querySelectorAll('[data-next-event]').forEach(function (el) {
    var ev = EVENT_SCHEDULE[el.getAttribute('data-next-event')];
    var d = ev && nextDate(ev);
    if (!d) return;
    el.textContent = (el.getAttribute('data-label') || '次回：') + fmt(d);
    el.hidden = false;
  });
})();
