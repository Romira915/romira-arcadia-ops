(function () {
  "use strict";
  // Pages tab: lists what hermes-pages has published. Read-only by design; publishing, visibility
  // changes and removal go through Hermes so the publish-html skill's personal-information check runs.
  const SDK = window.__HERMES_PLUGIN_SDK__;
  if (!SDK || !window.__HERMES_PLUGINS__) return;

  const React = SDK.React;
  const h = React.createElement;
  const { useState, useEffect, useCallback } = SDK.hooks;

  const VISIBILITY_LABELS = { private: "tailnet 内", public: "公開" };
  const DATE_FORMAT = new Intl.DateTimeFormat("ja-JP", { dateStyle: "medium", timeStyle: "short" });

  function formatTime(iso) {
    return iso ? DATE_FORMAT.format(new Date(iso)) : "—";
  }

  // ISO-8601 UTC strings sort chronologically as text; pages without metadata go last.
  function byNewestUpdate(a, b) {
    return (b.updated_at || "").localeCompare(a.updated_at || "");
  }

  function PageRow(props) {
    const page = props.page;
    return h("tr", null,
      h("td", null,
        h("a", { className: "hp-title", href: page.url, target: "_blank", rel: "noopener noreferrer" },
          page.title || page.slug),
        h("div", { className: "hp-description" }, page.description || "説明なし"),
        h("div", { className: "hp-url" }, page.url)),
      h("td", null,
        h("span", { className: "hp-visibility hp-visibility-" + page.visibility },
          VISIBILITY_LABELS[page.visibility] || page.visibility)),
      h("td", { className: "hp-time" }, formatTime(page.updated_at)),
      h("td", { className: "hp-time" }, formatTime(page.created_at)));
  }

  function PagesTable(props) {
    if (props.pages.length === 0) {
      return h("p", { className: "hp-message" }, "公開中のページはありません。");
    }
    return h("div", { className: "hp-scroll" },
      h("table", { className: "hp-table" },
        h("thead", null,
          h("tr", null,
            h("th", null, "ページ"),
            h("th", null, "公開範囲"),
            h("th", null, "更新"),
            h("th", null, "作成"))),
        h("tbody", null,
          props.pages.map(function (page) { return h(PageRow, { key: page.slug, page: page }); }))));
  }

  function PagesPage() {
    const [state, setState] = useState({ status: "loading" });

    const load = useCallback(function () {
      setState({ status: "loading" });
      SDK.fetchJSON("/api/plugins/html-pages/pages").then(
        function (data) { setState({ status: "ready", pages: data.pages.slice().sort(byNewestUpdate) }); },
        function (error) { setState({ status: "error", message: String((error && error.message) || error) }); });
    }, []);

    useEffect(function () { load(); }, [load]);

    let body;
    if (state.status === "loading") {
      body = h("p", { className: "hp-message" }, "読み込み中…");
    } else if (state.status === "error") {
      body = h("p", { className: "hp-message hp-error" }, "一覧を取得できませんでした: " + state.message);
    } else {
      body = h(PagesTable, { pages: state.pages });
    }

    return h("div", { className: "hp-root" },
      h("div", { className: "hp-header" },
        h("h1", null, "Pages"),
        h("button", { type: "button", className: "hp-reload", onClick: load, disabled: state.status === "loading" },
          "再読み込み")),
      h("p", { className: "hp-note" },
        "Hermes が hermes-pages で公開したページです。公開範囲の変更や削除は Hermes に依頼してください。"),
      body);
  }

  window.__HERMES_PLUGINS__.register("html-pages", PagesPage);
})();
