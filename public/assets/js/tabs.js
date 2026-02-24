/**
 * jQuery Easing v1.4.1 - Minimal subset (easeInOutQuad only)
 * Replaces the full jQuery UI 1.11.2 (469KB) that was loaded just for easing.
 */
jQuery.easing.easeInOutQuad = function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
};
