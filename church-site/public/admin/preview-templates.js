/**
 * Custom preview templates for Decap CMS.
 *
 * Without this file, Decap falls back to dumping every field as a plain
 * "Label: value" list — readable, but nothing like the real site, which
 * makes it hard for a non-technical editor to tell whether a change looks
 * right before saving. This gives the preview pane on the right an actual
 * visual layout (fonts, colors, hero banners, cards) matching the live
 * site's sections, using only the field values already in the form on the
 * left.
 *
 * This runs with no build step (loaded as a plain <script> after the Decap
 * CDN bundle), so it uses the `h` (React.createElement) and `createClass`
 * globals Decap exposes for exactly this purpose, not JSX.
 */
(function () {
  var COLORS = {
    cream: "#F9F5EE",
    creamDark: "#EDE8DE",
    charcoal: "#1C1814",
    warmGray: "#8B7E74",
    blue: "#1F5C99",
    forest: "#2B5740",
    gold: "#C8943A",
  };

  var serif = "'Playfair Display', Georgia, serif";
  var sans = "'Inter', Arial, Helvetica, sans-serif";

  function assetUrl(getAsset, value) {
    if (!value) return null;
    try {
      var asset = getAsset(value);
      return asset ? asset.toString() : null;
    } catch (e) {
      return null;
    }
  }

  // ---- shared pieces ----

  function Kicker(text, color) {
    if (!text) return null;
    return h(
      "div",
      {
        style: {
          fontFamily: sans,
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: color || COLORS.blue,
          marginBottom: "8px",
        },
      },
      text
    );
  }

  function Heading(text, size) {
    if (!text) return null;
    return h(
      "h2",
      {
        style: {
          fontFamily: serif,
          fontWeight: 900,
          fontSize: size || "1.5rem",
          lineHeight: 1.15,
          color: COLORS.charcoal,
          margin: "0 0 10px",
        },
      },
      text
    );
  }

  function Body(text) {
    if (!text) return null;
    return h(
      "p",
      { style: { fontFamily: sans, fontSize: "14px", lineHeight: 1.7, color: "rgba(28,24,20,0.75)", margin: 0 } },
      text
    );
  }

  function CardGrid(items) {
    if (!items || !items.length) return null;
    return h(
      "div",
      { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "10px", marginTop: "14px" } },
      items.map(function (item, i) {
        if (item && typeof item === "object") {
          return h(
            "div",
            { key: i, style: { background: "#fff", borderLeft: "3px solid " + COLORS.blue, borderRadius: 8, padding: "12px 14px", boxShadow: "0 1px 6px rgba(60,40,20,0.06)" } },
            h("div", { style: { fontFamily: serif, fontWeight: 900, fontSize: "14px", marginBottom: "4px" } }, item.title || ""),
            h("div", { style: { fontSize: "12px", color: COLORS.warmGray, lineHeight: 1.5 } }, item.description || "")
          );
        }
        return h(
          "span",
          { key: i, style: { display: "inline-block", background: "#fff", border: "1px solid " + COLORS.creamDark, borderRadius: 6, padding: "6px 10px", fontSize: "12px", fontWeight: 600, marginRight: "6px", marginBottom: "6px" } },
          String(item)
        );
      })
    );
  }

  function Paragraphs(items) {
    if (!items || !items.length) return null;
    return h(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: "10px" } },
      items.map(function (p, i) { return h("p", { key: i, style: { fontFamily: sans, fontSize: "13px", lineHeight: 1.7, color: "rgba(28,24,20,0.75)", margin: 0 } }, String(p)); })
    );
  }

  function Section(opts, bg) {
    var textChildren = [Kicker(opts.kicker), Heading(opts.heading), Body(opts.text)];
    if (opts.paragraphs) textChildren.push(Paragraphs(opts.paragraphs));
    if (opts.cards) textChildren.push(CardGrid(opts.cards));
    var hasContent = opts.kicker || opts.heading || opts.text || opts.imageSrc || (opts.paragraphs && opts.paragraphs.length) || (opts.cards && opts.cards.length);
    if (!hasContent) return null;

    var content = opts.imageSrc
      ? h(
          "div",
          { style: { display: "flex", gap: "14px", alignItems: "flex-start" } },
          h("img", { src: opts.imageSrc, style: { width: 56, height: 56, borderRadius: 10, objectFit: "cover", flexShrink: 0, background: COLORS.creamDark } }),
          h("div", {}, textChildren)
        )
      : textChildren;

    return h(
      "div",
      { style: { padding: "22px 24px", background: bg || "transparent", borderBottom: "1px solid " + COLORS.creamDark } },
      content
    );
  }

  // ---- Pages collection (Homepage, About, Sermons page, Events page, Gallery page, Contact page, Give page) ----

  function renderPagePreview(props) {
    var data = props.entry.get("data").toJS();
    var getAsset = props.getAsset;
    var heroSrc = assetUrl(getAsset, data.heroImage);

    var title =
      data.heroTitle ||
      [data.heroTitleLine1, data.heroTitleLine2].filter(Boolean).join(" ") ||
      [data.openingLine1, data.openingLine2].filter(Boolean).join(" ");

    var heroBlock = heroSrc
      ? h(
          "div",
          { style: { position: "relative", height: 260, overflow: "hidden", background: COLORS.charcoal } },
          h("img", { src: heroSrc, style: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" } }),
          h("div", {
            style: {
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, rgba(20,16,12,0.15) 0%, rgba(20,16,12,0.88) 100%)",
            },
          }),
          h(
            "div",
            { style: { position: "absolute", left: 0, right: 0, bottom: 0, padding: "24px", color: "#fff" } },
            Kicker(data.heroKicker, "rgba(255,255,255,0.65)"),
            title ? h("div", { style: { fontFamily: serif, fontSize: "1.7rem", fontWeight: 900, marginBottom: "8px", lineHeight: 1.1 } }, title) : null,
            data.heroSubtext ? h("div", { style: { fontSize: "13px", color: "rgba(255,255,255,0.8)", maxWidth: 380 } }, data.heroSubtext) : null
          )
        )
      : null;

    // Known section groupings, in page-flow order. Anything not listed here
    // still renders via the generic fallback below, so new fields never
    // silently disappear from the preview.
    var sectionDefs = [
      { kicker: "storyKicker", paragraphs: "storyParagraphs", text: "storyParagraph" },
      { kicker: "valuesKicker", heading: "valuesHeading", cards: "values" },
      { kicker: "structureKicker", heading: "structureHeading", text: "structureText", cards: "departments" },
      { text: "missionText" },
      { kicker: "sermonsKicker", heading: "sermonsHeading" },
      { kicker: "scheduleKicker", heading: "scheduleHeading" },
      { kicker: "ministriesKicker", heading: "ministriesHeading", text: "ministriesText" },
      { kicker: "bishopWordKicker", image: "bishopImage" },
      { kicker: "teamKicker", heading: "teamHeading", text: "teamText" },
      { kicker: "announcementsKicker", heading: "announcementsHeading" },
      { kicker: "eventsKicker", heading: "eventsHeading" },
      { kicker: "verseKicker" },
      { heading: "noticeHeading", text: "noticeText" },
      { heading: "infoHeading" },
      { heading: "formHeading", text: "formSubtext" },
      { text: "introText" },
      { cards: "ways" },
      { cards: "supportAreas" },
      { heading: "ctaTitle", text: "ctaSubtext" },
      { heading: "ctaHeading", text: "ctaText" },
    ];

    var used = { heroImage: 1, heroKicker: 1, heroTitle: 1, heroTitleLine1: 1, heroTitleLine2: 1, heroSubtext: 1, openingLine1: 1, openingLine2: 1, heroScheduleLabel: 1 };
    var sections = sectionDefs.map(function (def, i) {
      var opts = {};
      ["kicker", "heading", "text", "paragraphs", "cards"].forEach(function (kind) {
        var key = def[kind];
        if (key && data[key] !== undefined) {
          opts[kind] = data[key];
          used[key] = 1;
        }
      });
      if (def.image && data[def.image]) {
        opts.imageSrc = assetUrl(getAsset, data[def.image]);
        used[def.image] = 1;
      }
      return Section(opts, i % 2 === 0 ? COLORS.cream : COLORS.creamDark);
    });

    // Anything present in the data but not covered by a known section above.
    var leftoverKeys = Object.keys(data).filter(function (k) { return !used[k] && data[k]; });
    var leftover = leftoverKeys.length
      ? h(
          "div",
          { style: { padding: "22px 24px" } },
          leftoverKeys.map(function (key) {
            var value = data[key];
            if (Array.isArray(value)) return null; // already covered by known cards/paragraphs above in practice
            return h(
              "div",
              { key: key, style: { marginBottom: "10px" } },
              h("div", { style: { fontSize: "10px", fontWeight: 700, color: COLORS.warmGray, textTransform: "uppercase" } }, key),
              h("div", { style: { fontSize: "13px" } }, String(value))
            );
          })
        )
      : null;

    return h("div", { style: { fontFamily: sans } }, heroBlock, sections, leftover);
  }

  var PagePreview = createClass({
    render: function () {
      return renderPagePreview(this.props);
    },
  });

  // ---- Sermons ----

  var SermonPreview = createClass({
    render: function () {
      var data = this.props.entry.get("data").toJS();
      return h(
        "div",
        { style: { maxWidth: 480, margin: "20px auto", background: "#FDFCFB", borderRadius: 14, borderTop: "4px solid " + COLORS.blue, padding: "20px 22px", boxShadow: "0 1px 12px rgba(60,40,20,0.08)", fontFamily: sans } },
        Kicker(data.scripture),
        Heading(data.title || "Untitled sermon", "1.4rem"),
        h("div", { style: { fontSize: "12px", color: COLORS.warmGray, marginBottom: "12px" } }, [data.speaker, data.date].filter(Boolean).join(" · ")),
        Body(data.description),
        data.mediaUrl ? h("div", { style: { marginTop: "12px", fontSize: "12px", fontWeight: 700, color: COLORS.blue } }, "▶ " + data.mediaUrl) : null
      );
    },
  });

  // ---- Events ----

  var EventPreview = createClass({
    render: function () {
      var data = this.props.entry.get("data").toJS();
      return h(
        "div",
        { style: { maxWidth: 480, margin: "20px auto", background: "#FDFCFB", borderRadius: 14, padding: "20px 22px", boxShadow: "0 1px 12px rgba(60,40,20,0.08)", fontFamily: sans } },
        Heading(data.title || "Untitled event", "1.4rem"),
        h("div", { style: { fontSize: "12px", color: COLORS.warmGray, marginBottom: "12px" } }, [data.date, data.time, data.location].filter(Boolean).join(" · ")),
        Body(data.description)
      );
    },
  });

  // ---- Announcements ----

  var AnnouncementPreview = createClass({
    render: function () {
      var data = this.props.entry.get("data").toJS();
      return h(
        "div",
        { style: { maxWidth: 420, margin: "20px auto", background: "#FDFCFB", borderRadius: 14, borderTop: "4px solid " + COLORS.gold, padding: "18px 20px", boxShadow: "0 1px 12px rgba(60,40,20,0.08)", fontFamily: sans } },
        Kicker(data.date, COLORS.gold),
        Heading(data.title || "Untitled announcement", "1.2rem"),
        Body(data.body),
        h(
          "div",
          { style: { marginTop: "12px", fontSize: "11px", fontWeight: 700, color: data.active === false ? "#A6332B" : COLORS.forest } },
          data.active === false ? "Hidden — not shown on homepage" : "Shown on homepage"
        )
      );
    },
  });

  // ---- Photo Gallery ----

  var GalleryPreview = createClass({
    render: function () {
      var data = this.props.entry.get("data").toJS();
      var getAsset = this.props.getAsset;
      var src = assetUrl(getAsset, data.image);
      return h(
        "div",
        { style: { maxWidth: 320, margin: "20px auto", borderRadius: 14, overflow: "hidden", background: "#FDFCFB", boxShadow: "0 1px 12px rgba(60,40,20,0.08)", fontFamily: sans } },
        src
          ? h("div", { style: { position: "relative", height: 320, background: COLORS.creamDark } }, h("img", { src: src, style: { width: "100%", height: "100%", objectFit: "cover" } }))
          : h("div", { style: { height: 320, background: COLORS.creamDark, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.warmGray, fontSize: 13 } }, "No photo yet"),
        h(
          "div",
          { style: { padding: "14px 16px" } },
          Kicker(data.category, COLORS.gold),
          data.caption ? h("div", { style: { fontFamily: serif, fontWeight: 900, fontSize: "15px" } }, data.caption) : null,
          data.video ? h("div", { style: { marginTop: 6, fontSize: 12, fontWeight: 700, color: COLORS.blue } }, "▶ Video entry") : null
        )
      );
    },
  });

  CMS.registerPreviewStyle("/admin/preview.css");
  CMS.registerPreviewTemplate("pages", PagePreview);
  CMS.registerPreviewTemplate("sermons", SermonPreview);
  CMS.registerPreviewTemplate("events", EventPreview);
  CMS.registerPreviewTemplate("announcements", AnnouncementPreview);
  CMS.registerPreviewTemplate("gallery", GalleryPreview);
})();
