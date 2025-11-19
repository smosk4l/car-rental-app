import { keyframes } from "styled-components";

/**
 * Animation factories to avoid repeating similar keyframes
 */

// === FACTORIES ===

export const createFade = (from = 0, to = 1) => keyframes`
  from { opacity: ${from}; }
  to { opacity: ${to}; }
`;

export const createSlideY = (distance: string) => keyframes`
  from { transform: translateY(${distance}); }
  to { transform: translateY(0); }
`;

export const createSlideX = (distance: string) => keyframes`
  from { transform: translateX(${distance}); }
  to { transform: translateX(0); }
`;

export const createScale = (from = 0.95, to = 1) => keyframes`
  from { transform: scale(${from}); }
  to { transform: scale(${to}); }
`;

export const createFadeSlideScale = ({
  fadeFrom = 0,
  fadeTo = 1,
  x = "0",
  y = "0",
  scaleFrom = 1,
  scaleTo = 1,
}: {
  fadeFrom?: number;
  fadeTo?: number;
  x?: string;
  y?: string;
  scaleFrom?: number;
  scaleTo?: number;
}) => keyframes`
  from {
    opacity: ${fadeFrom};
    transform: translate(${x}, ${y}) scale(${scaleFrom});
  }
  to {
    opacity: ${fadeTo};
    transform: translate(0, 0) scale(${scaleTo});
  }
`;

// === RE-EXPORTED ORIGINAL ANIMATIONS USING FACTORIES ===

// FADE
export const fadeIn = createFade(0, 1);
export const fadeOut = createFade(1, 0);

// FADE + SLIDE
export const fadeInUp = createFadeSlideScale({ y: "20px" });
export const fadeInDown = createFadeSlideScale({ y: "-20px" });

// SCALE
export const scaleIn = createFadeSlideScale({ scaleFrom: 0.95, scaleTo: 1 });
export const scaleOut = createFadeSlideScale({ fadeFrom: 1, fadeTo: 0, scaleFrom: 1, scaleTo: 0.95 });

// ZOOM
export const zoomIn = createScale(0.95, 1);
export const zoomOut = createScale(1, 0.95);

// SLIDE
export const slideInFromTop = createSlideY("-100%");
export const slideInFromBottom = createSlideY("100%");
export const slideInFromLeft = createSlideX("-0.5rem");
export const slideInFromRight = createSlideX("0.5rem");
export const slideOutToRight = createSlideX("100%");

export const slideUp = createFadeSlideScale({ y: "40px" });
export const slideUpSmall = createSlideY("0.5rem");
export const slideDownSmall = createSlideY("-0.5rem");

// DIALOG/MODAL
export const dialogSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const dialogSlideOut = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.96);
  }
`;

// ROTATION
export const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// COMBINED
export const fadeInScale = createFadeSlideScale({ scaleFrom: 0.9 });
export const fadeInSlideUp = createFadeSlideScale({ y: "30px" });

// MOBILE MENU
export const mobileMenuFadeIn = createFadeSlideScale({ y: "-10px" });
