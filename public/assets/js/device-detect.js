/**
 * SRFV Device Detector
 * Detects the device type (desktop/tablet/mobile) via User-Agent + screen size
 * and adds the appropriate class to <body>:
 *   - device-desktop  (PC/laptop >= 1024px)
 *   - device-tablet   (tablet 768-1023px or tablet UA)
 *   - device-mobile   (phone < 768px or phone UA)
 *
 * Runs immediately (before DOMContentLoaded) to prevent FOUC.
 * Also listens for resize to handle orientation changes on tablets.
 */
(function () {
    'use strict';

    var DEVICE_CLASSES = ['device-desktop', 'device-tablet', 'device-mobile'];

    /**
     * Detect device type using UA string + screen dimensions.
     * Returns 'desktop', 'tablet', or 'mobile'.
     */
    function detectDevice() {
        var ua = navigator.userAgent || '';
        var width = window.innerWidth || document.documentElement.clientWidth || screen.width;

        // Tablet UA patterns (iPad, Android tablet without "Mobile", Surface, etc.)
        var isTabletUA = /iPad|Android(?!.*Mobile)|Tablet|PlayBook|Silk|Kindle|SM-T|Tab/i.test(ua);

        // Mobile UA patterns (iPhone, Android phone, etc.)
        var isMobileUA = /iPhone|iPod|Android.*Mobile|webOS|BlackBerry|Opera Mini|IEMobile|Windows Phone/i.test(ua);

        // iPad in desktop mode (iOS 13+) — detect via touch + MacIntel
        var isIPadDesktopMode = (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

        // Decision logic:
        // 1. Explicit tablet UA or iPad in desktop mode
        if (isTabletUA || isIPadDesktopMode) {
            return 'tablet';
        }
        // 2. Explicit mobile UA
        if (isMobileUA) {
            return 'mobile';
        }
        // 3. Fallback on screen width when UA is ambiguous
        if (width < 768) {
            return 'mobile';
        }
        if (width < 1024) {
            return 'tablet';
        }
        return 'desktop';
    }

    /**
     * Apply the device class to <body> and store in data attribute.
     */
    function applyDevice() {
        var device = detectDevice();
        var body = document.body || document.documentElement;

        // Remove previous device classes
        for (var i = 0; i < DEVICE_CLASSES.length; i++) {
            body.classList.remove(DEVICE_CLASSES[i]);
        }

        // Add current device class
        body.classList.add('device-' + device);
        body.setAttribute('data-srfv-device', device);

        return device;
    }

    // Apply immediately
    applyDevice();

    // Re-check on DOM ready (body is definitely available)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyDevice);
    }

    // Re-check on resize (orientation change, window resize)
    var resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(applyDevice, 150);
    });

    // Expose globally for debugging: SRFV.device
    window.SRFV = window.SRFV || {};
    window.SRFV.device = detectDevice;
})();
