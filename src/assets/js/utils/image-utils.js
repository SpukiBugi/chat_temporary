export function imageSetSrcset(
    source,
    webp = false,
    quality = 80,
    preview = false,
    w = { m: 343, t: 768, d: 1920 },
    h = { m: 343, t: 408, d: 1088 },
) {
    if (preview) {
        return this.$image.gen(source, {
            w: w.t,
            h: h.t,
            q: quality,
            bl: 40,
            ex: webp ? 'webp' : 'png',
        });
    }

    const mobileOpt = { w: w.m, h: h.m, q: quality };
    const tabletOpt = { w: w.t, h: h.t, q: quality };
    const desktopOpt = { w: w.d, h: h.d, q: quality };

    if (webp) {
        mobileOpt.ex = 'webp';
        tabletOpt.ex = 'webp';
        desktopOpt.ex = 'webp';
    }

    const mobile = this.$image.gen(source, mobileOpt);
    const tablet = this.$image.gen(source, tabletOpt);
    const desktop = this.$image.gen(source, desktopOpt);
    return `${mobile} 767w, ${tablet} 1279w, ${desktop} 1439w`;
}
