'use client';

import * as React from 'react';
import styled from 'styled-components';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

type AvatarImageProps = React.ImgHTMLAttributes<HTMLImageElement>;
type AvatarFallbackProps = React.HTMLAttributes<HTMLDivElement>;

// Context to manage image load state
const AvatarContext = React.createContext<{
  imageLoaded: boolean;
  setImageLoaded: (loaded: boolean) => void;
}>({
  imageLoaded: false,
  setImageLoaded: () => {},
});

// Styled Avatar Root Component
const StyledAvatarRoot = styled.div<{ $size?: string }>`
  position: relative;
  display: flex;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.full};
  align-items: center;
  justify-content: center;

  ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return `
          height: 2rem; /* 32px */
          width: 2rem;
        `;
      case 'lg':
        return `
          height: 3rem; /* 48px */
          width: 3rem;
        `;
      case 'xl':
        return `
          height: 4rem; /* 64px */
          width: 4rem;
        `;
      default:
        return `
          height: 2.5rem; /* 40px */
          width: 2.5rem;
        `;
    }
  }}
`;

// Styled Avatar Image Component
const StyledAvatarImage = styled.img<{ $isVisible?: boolean }>`
  aspect-ratio: 1 / 1;
  height: 100%;
  width: 100%;
  object-fit: cover;
  display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
`;

// Styled Avatar Fallback Component
const StyledAvatarFallback = styled.div<{ $isVisible?: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ theme }) => theme.colors.gray200};
  color: ${({ theme }) => theme.colors.gray600};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ size = 'md', children, ...props }, ref) => {
    const [imageLoaded, setImageLoaded] = React.useState(false);

    return (
      <AvatarContext.Provider value={{ imageLoaded, setImageLoaded }}>
        <StyledAvatarRoot ref={ref} $size={size} {...props}>
          {children}
        </StyledAvatarRoot>
      </AvatarContext.Provider>
    );
  }
);
Avatar.displayName = 'Avatar';

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ onError, onLoad, ...props }, ref) => {
    const { imageLoaded, setImageLoaded } = React.useContext(AvatarContext);

    const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setImageLoaded(true);
      onLoad?.(e);
    };

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setImageLoaded(false);
      onError?.(e);
    };

    return (
      <StyledAvatarImage
        ref={ref}
        $isVisible={imageLoaded}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    );
  }
);
AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ children, ...props }, ref) => {
    const { imageLoaded } = React.useContext(AvatarContext);

    return (
      <StyledAvatarFallback ref={ref} $isVisible={!imageLoaded} {...props}>
        {children}
      </StyledAvatarFallback>
    );
  }
);
AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarImage, AvatarFallback };
