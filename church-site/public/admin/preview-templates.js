/**
 * Custom preview templates for Decap CMS.
 *
 * Without this file, Decap falls back to dumping every field as a plain
 * "Label: value" list — readable, but nothing like the real site, which
 * makes it hard for a non-technical editor to tell whether a change looks
 * right before saving. This gives the preview pane on the right an actual
 * visual layout (fonts, colors, hero banners, cards) roughly matching the
 * live site, using only the field values already in the form on the left.
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

  function toPlain(entry) {
    var data = entry.get("data");
    return data && data.toJS ? data.toJS() : {};
  }

  function assetUrl(getAsset, value) {
    if (!value) return null;
    try {
      var asset = getAsset(value);
      return asset ? asset.toString() : null;
    } catch (e) {
      return null;
    }
  }

  function labelize(key) {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, function (s) { return s.toUpperCase(); })
      .trim();
  }

  // ---- shared pieces ----

  function Kicker(text, color) {
    if (!text) return null;
    return h(
      "div",
      {
        style: {
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

  function CardWrap(children) {
    return h(
      "div",
      {
        style: {
          maxWidth: 720,
          margin: "24px auto",
          background: "#FDFCFB",
          borderRadius: 16,
          padding: "24px 28px",
          boxShadow: "0 1px 12px rgba(60,40,20,0.08)",
        },
      },
      children
    );
  }

  // ---- Pages collection (Homepage, About, Sermons page, Events page, Gallery page, Contact page, Give page) ----

  var PagePreview = createClass({
    render: function () {
      var data = toPlain(this.props.entry);
      var getAsset = this.props.getAsset;
      var heroSrc = assetUrl(getAsset, data.heroImage);

      var title =
        data.heroTitle ||
        [data.heroTitleLine1, data.heroTitleLine2].filter(Boolean).join(" ") ||
        [data.openingLine1, data.openingLine2].filter(Boolean).join(" ");

      var heroBlock = heroSrc
        ? h(
            "div",
            {
              style: {
                position: "relative",
                minHeight: 280,
                display: "flex",
                alignItems: "flex-end",
                overflow: "hidden",
                background: COLORS.charcoal,
              },
            },
            h("img", {
              src: heroSrc,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" },
            }),
            h("div", {
              style: {
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, rgba(20,16,12,0.15) 0%, rgba(20,16,12,0.85) 100%)",
              },
            }),
            h(
              "div",
              { style: { position: "relative", padding: "40px 32px", color: "#fff", maxWidth: 640 } },
              Kicker(data.heroKicker, "rgba(255,255,255,0.65)"),
              title
                ? h(
                    "h1",
                    { style: { fontFamily: serif, fontSize: "2.2rem", fontWeight: 900, margin: "0 0 12px", lineHeight: 1.1 } },
                    title
                  )
                : null,
              data.heroSubtext
                ? h("p", { style: { fontSize: "15px", color: "rgba(255,255,255,0.8)", margin: 0, maxWidth: 480 } }, data.heroSubtext)
                : null
            )
          )
        : null;

      var skip = [
        "heroImage", "heroKicker", "heroTitle", "heroTitleLine1", "heroTitleLine2", "heroSubtext",
        "openingLine1", "openingLine2",
      ];
      var rest = Object.keys(data).filter(function (k) { return skip.indexOf(k) === -1; });

      var fields = rest.map(function (key) {
        var value = data[key];
        if (value === null || value === undefined || value === "") return null;

        if (Array.isArray(value)) {
          return h(
            "div",
            { key: key, style: { marginBottom: "20px" } },
            h("div", { style: { fontSize: "11px", fontWeight: 700, color: COLORS.warmGray, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" } }, labelize(key)),
            h(
              "ul",
              { style: { margin: 0, paddingLeft: 18 } },
              value.map(function (item, i) {
                var text;
                if (item && typeof item === "object") {
                  text = (item.title ? item.title + ": " : "") + (item.description || item.paragraph || item.department || "");
                } else {
                  text = String(item);
                }
                return h("li", { key: i, style: { fontSize: "14px", marginBottom: "4px" } }, text);
              })
            )
          );
        }

        return h(
          "div",
          { key: key, style: { marginBottom: "16px" } },
          h("div", { style: { fontSize: "11px", fontWeight: 700, color: COLORS.warmGray, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" } }, labelize(key)),
          h("div", { style: { fontSize: "14px", lineHeight: 1.6 } }, String(value))
        );
      });

      return h(
        "div",
        {},
        heroBlock,
        h("div", { style: { maxWidth: 640, margin: "0 auto", padding: "28px 24px" } }, fields)
      );
    },
  });

  // ---- Sermons ----

  var SermonPreview = createClass({
    render: function () {
      var data = toPlain(this.props.entry);
      return CardWrap([
        Kicker(data.scripture),
        h("h2", { key: "t", style: { fontFamily: serif, fontSize: "1.6rem", fontWeight: 900, margin: "0 0 4px" } }, data.title || "Untitled sermon"),
        h("div", { key: "m", style: { fontSize: "13px", color: COLORS.warmGray, marginBottom: "14px" } }, [data.speaker, data.date].filter(Boolean).join(" · ")),
        data.description ? h("p", { key: "d", style: { fontSize: "14px", lineHeight: 1.7 } }, data.description) : null,
        data.mediaUrl ? h("div", { key: "v", style: { marginTop: "14px", fontSize: "13px", fontWeight: 700, color: COLORS.blue } }, "▶ " + data.mediaUrl) : null,
      ]);
    },
  });

  // ---- Events ----

  var EventPreview = createClass({
    render: function () {
      var data = toPlain(this.props.entry);
      return CardWrap([
        h("h2", { key: "t", style: { fontFamily: serif, fontSize: "1.6rem", fontWeight: 900, margin: "0 0 4px" } }, data.title || "Untitled event"),
        h("div", { key: "m", style: { fontSize: "13px", color: COLORS.warmGray, marginBottom: "14px" } }, [data.date, data.time, data.location].filter(Boolean).join(" · ")),
        data.description ? h("p", { key: "d", style: { fontSize: "14px", lineHeight: 1.7 } }, data.description) : null,
      ]);
    },
  });

  // ---- Announcements ----

  var AnnouncementPreview = createClass({
    render: function () {
      var data = toPlain(this.props.entry);
      return CardWrap([
        Kicker(data.date, COLORS.gold),
        h("h2", { key: "t", style: { fontFamily: serif, fontSize: "1.4rem", fontWeight: 900, margin: "0 0 10px" } }, data.title || "Untitled announcement"),
        data.body ? h("p", { key: "b", style: { fontSize: "14px", lineHeight: 1.7 } }, data.body) : null,
        h(
          "div",
          { key: "a", style: { marginTop: "14px", fontSize: "12px", fontWeight: 700, color: data.active === false ? "#A6332B" : COLORS.forest } },
          data.active === false ? "Hidden — not shown on homepage" : "Shown on homepage"
        ),
      ]);
    },
  });

  // ---- Photo Gallery ----

  var GalleryPreview = createClass({
    render: function () {
      var data = toPlain(this.props.entry);
      var getAsset = this.props.getAsset;
      var src = assetUrl(getAsset, data.image);
      return h(
        "div",
        { style: { maxWidth: 420, margin: "24px auto", borderRadius: 16, overflow: "hidden", background: "#FDFCFB", boxShadow: "0 1px 12px rgba(60,40,20,0.08)" } },
        src
          ? h("div", { style: { position: "relative", aspectRatio: "1 / 1", background: COLORS.creamDark } },
              h("img", { src: src, style: { width: "100%", height: "100%", objectFit: "cover" } }))
          : h("div", { style: { aspectRatio: "1 / 1", background: COLORS.creamDark, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.warmGray, fontSize: 13 } }, "No photo yet"),
        h(
          "div",
          { style: { padding: "16px" } },
          Kicker(data.category, COLORS.gold),
          data.caption ? h("div", { style: { fontFamily: serif, fontWeight: 900, fontSize: "1.05rem" } }, data.caption) : null,
          data.video ? h("div", { style: { marginTop: 8, fontSize: 13, fontWeight: 700, color: COLORS.blue } }, "▶ Video entry") : null
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
