/**
 * Client-side NSFW content detection using canvas pixel analysis.
 * Analyzes skin-tone pixel density to flag potentially inappropriate images.
 * This is a lightweight heuristic — not a replacement for ML-based detection.
 */

export interface NSFWCheckResult {
  safe: boolean;
  skinRatio: number;
}

/**
 * Checks if an image file is potentially NSFW by analyzing skin-tone pixel ratio.
 * Uses RGB-based skin detection that works across various skin tones.
 *
 * @param file - The image File to analyze
 * @returns Promise with safety result
 */
export async function checkImageNSFW(file: File): Promise<NSFWCheckResult> {
  return new Promise((resolve) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        URL.revokeObjectURL(url);
        resolve({ safe: true, skinRatio: 0 });
        return;
      }

      // Downscale for performance (max 200px on longest side)
      const maxDim = 200;
      const scale = Math.min(maxDim / img.width, maxDim / img.height, 1);
      canvas.width = Math.floor(img.width * scale);
      canvas.height = Math.floor(img.height * scale);

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;

      let skinPixels = 0;
      let totalPixels = 0;

      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        totalPixels++;

        // Skin-tone detection using multiple RGB rules
        // Covers a wide range of skin tones across ethnicities
        const isSkin =
          r > 95 &&
          g > 40 &&
          b > 20 &&
          r > g &&
          r > b &&
          Math.abs(r - g) > 15 &&
          r - Math.min(g, b) > 15;

        if (isSkin) skinPixels++;
      }

      const skinRatio = totalPixels > 0 ? skinPixels / totalPixels : 0;
      // Flag as NSFW if more than 60% of the image is skin-toned pixels
      const safe = skinRatio < 0.6;

      URL.revokeObjectURL(url);
      resolve({ safe, skinRatio });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      // If we can't load the image, err on the side of caution
      resolve({ safe: false, skinRatio: 1 });
    };

    img.src = url;
  });
}
