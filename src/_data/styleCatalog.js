// The canonical style universe — the "tags" people click to find their guy.
// Every entry becomes an indexable /style/<slug>/ landing page, even before an
// artist is tagged to it, so the style angle is covered from day one. When a
// review's `styles:` entry matches one of these by slug, the artist shows up on
// that page automatically. Authors can also invent new style tags freely — those
// spin up their own pages too (see the styleHubs collection in .eleventy.js).
//
// Keep `tagline` to one line. `blurb` is 2–4 sentences of evergreen copy that
// anchors the hub page so it is never a thin, empty listing.
module.exports = [
  {
    name: "Traditional",
    slug: "traditional",
    tagline: "Bold lines, classic flash, built to last a lifetime.",
    blurb:
      "American Traditional is the bedrock of the craft — thick black outlines, a tight palette of red, green, gold and blue, and iconography that never goes out of style: eagles, roses, daggers, swallows, hearts. It reads clean across a room and ages better than almost anything else on skin. When people picture a tattoo that still looks sharp forty years later, this is the style they're picturing.",
  },
  {
    name: "Neo-Traditional",
    slug: "neo-traditional",
    tagline: "Traditional's backbone with a richer, deeper palette.",
    blurb:
      "Neo-Traditional keeps the bold, confident linework of the old school but opens up the color range, adds dimension and detail, and leans into illustrative flourish. Think animals with personality, ornate framing, jewel tones and dramatic shading. It's the style for people who want the durability of traditional with a more painterly, modern finish.",
  },
  {
    name: "Blackwork",
    slug: "blackwork",
    tagline: "All black, all the time — graphic, bold, unmissable.",
    blurb:
      "Blackwork is exactly what it sounds like: tattoos built entirely from solid black and negative space. It spans everything from heavy blackout sleeves to ornamental patterns, bold graphic illustration and stark geometric work. Done right, the contrast is brutal in the best way — these pieces command attention and hold their edges for decades.",
  },
  {
    name: "Fine-Line",
    slug: "fine-line",
    tagline: "Delicate, precise single-needle detail.",
    blurb:
      "Fine-line work is the surgeon's end of the craft — thin, deliberate lines laid down with a single needle or tight grouping, often without heavy shading. It's the home of micro-script, delicate botanicals, minimalist symbols and photoreal portraiture in miniature. It demands a steady hand and a real understanding of how thin lines heal, which is exactly why the artists who master it stand out.",
  },
  {
    name: "Realism",
    slug: "realism",
    tagline: "Photoreal portraits and scenes that look pulled from a lens.",
    blurb:
      "Realism turns skin into a photograph — portraits you'd swear were printed, animals with every hair rendered, scenes with real depth and light. Black-and-grey realism leans on smooth gradients and contrast; color realism adds the full spectrum. It is some of the most technically demanding work in the industry, and the artists who nail it are genuinely rare.",
  },
  {
    name: "Black & Grey",
    slug: "black-and-grey",
    tagline: "Smooth gradients, deep shadow, zero color.",
    blurb:
      "Black-and-grey is the art of doing everything with one ink and a lot of skill — diluting black into a full range of greys to build shadow, depth and softness. Rooted in Chicano and fine-line traditions, it covers everything from religious imagery to portraits to smoky abstract work. It's timeless, versatile, and unforgiving of a weak hand.",
  },
  {
    name: "Japanese / Irezumi",
    slug: "japanese-irezumi",
    tagline: "Dragons, koi, waves — the grand traditional storytelling style.",
    blurb:
      "Irezumi is centuries of tradition rendered at scale — dragons, koi, tigers, snakes, peonies and Hannya masks woven together with wind, water and cloud backgrounds into full bodysuits and sleeves. Every element carries meaning, and the best practitioners honor compositional rules that go back generations. It's some of the most cohesive large-scale work in tattooing.",
  },
  {
    name: "Psychedelic",
    slug: "psychedelic",
    tagline: "Melting color, sacred geometry, trippy dreamscapes.",
    blurb:
      "Psychedelic tattooing throws the rulebook out — saturated, melting color, fractal and sacred-geometry patterns, surreal dreamscapes and visuals that seem to move while you stare. It pulls from blacklight-reactive ink, 60s poster art and visionary painting. If you want a piece that looks like a vision rather than a picture, this is the lane.",
  },
  {
    name: "Patriotic",
    slug: "patriotic",
    tagline: "Flags, eagles, service tributes — ink that flies the colors.",
    blurb:
      "Patriotic tattoos carry the flag, the eagle, the service branch crest, the memorial dog tags and the dates that matter. They range from photoreal flag-draped portraits to bold traditional eagles, and they mean something specific to the person wearing them. The artists who do them well understand that this is tribute work first and decoration second.",
  },
  {
    name: "Watercolor",
    slug: "watercolor",
    tagline: "Paint-splash color with soft, brushed edges.",
    blurb:
      "Watercolor tattoos mimic paint on paper — washes of color, splatter, drips and soft bleeding edges, often with little or no black outline. The look is loose, bright and artistic. It takes a strong technician to keep watercolor reading well as it heals, which is exactly why the artists who specialize in it are worth seeking out.",
  },
  {
    name: "Geometric",
    slug: "geometric",
    tagline: "Sacred geometry, dotwork and razor-clean symmetry.",
    blurb:
      "Geometric work is built on precision — mandalas, sacred geometry, linework and dotwork arranged into perfectly balanced, symmetrical compositions. It often plays with the body's natural lines and can blend into ornamental and blackwork territory. There's nowhere to hide a shaky line here, so the steady hands rise straight to the top.",
  },
  {
    name: "Illustrative",
    slug: "illustrative",
    tagline: "Storybook and ink-drawing style brought to skin.",
    blurb:
      "Illustrative tattoos look like they walked off the page of a sketchbook or a graphic novel — linework-driven, expressive, and free of the strict rules of traditional. It's a broad, artist-driven style where personal voice matters as much as technique. If you want something that feels drawn rather than stenciled, this is where to look.",
  },
  {
    name: "Tribal",
    slug: "tribal",
    tagline: "Bold black patterns rooted in heritage.",
    blurb:
      "Tribal spans the Polynesian, Maori, Samoan and Filipino traditions and their modern descendants — bold black patterns that flow with the body and carry deep cultural meaning. Authentic tribal work is built around the wearer's story and lineage. The artists who practice it with respect for its roots produce some of the most powerful black-on-skin work there is.",
  },
  {
    name: "Lettering & Script",
    slug: "lettering-script",
    tagline: "Calligraphy, names, dates and quotes done right.",
    blurb:
      "Lettering is its own discipline — calligraphy, script, gothic blackletter, single-line cursive and graffiti-rooted styles, all spaced and weighted so they read perfectly and age cleanly. A name, a date or a quote sounds simple until you've seen one done badly. The specialists treat letterforms as seriously as any portrait artist treats a face.",
  },
  {
    name: "Botanical",
    slug: "botanical",
    tagline: "Flowers, leaves and growing things, rendered with care.",
    blurb:
      "Botanical tattooing is florals and foliage done with a naturalist's eye — roses, wildflowers, ferns, branches and full growing compositions that wrap the body. It crosses freely into fine-line, blackwork and color realism. It's one of the most requested and most rewarding styles, and the artists who specialize in it know exactly how a stem should curve around a forearm.",
  },
  {
    name: "Surrealism",
    slug: "surrealism",
    tagline: "Dreamlike, impossible imagery with real craft behind it.",
    blurb:
      "Surrealist tattoos bend reality — melting clocks, morphing forms, impossible scenes and dream logic rendered with serious technical chops. It overlaps with realism and psychedelic work but lives in its own imaginative space. These are the pieces that make people stop and ask what they're even looking at.",
  },
  {
    name: "Anime & Manga",
    slug: "anime-manga",
    tagline: "Your favorite characters, paneled and inked.",
    blurb:
      "Anime and manga tattooing brings beloved characters, panels and key art to skin — clean cel-style color, manga linework, and full scenes for the truly devoted. It's a fast-growing lane with a passionate audience, and the artists who specialize in it understand how to keep a character on-model while making it work as a tattoo.",
  },
  {
    name: "Ignorant / Naïve",
    slug: "ignorant-naive",
    tagline: "Raw, hand-styled, deliberately rough-around-the-edges.",
    blurb:
      "Ignorant style (also called naïve) is the punk end of the spectrum — intentionally crude linework, hand-poke energy, simple icons and a doodled, of-the-moment feel. It rejects polish on purpose, and there's real intention behind the looseness. It's become one of the most fashionable underground styles, and the right artist makes it look effortless.",
  },
];
