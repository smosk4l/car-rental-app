import React, { useState, useRef, useEffect } from 'react';
import {
  DropdownContainer,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
} from './styles';

interface DropdownMenuProps {
  children: React.ReactNode;
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  align?: 'left' | 'right';
  sideOffset?: number;
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'danger';
}

interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const DropdownContext = React.createContext<DropdownContextType | undefined>(undefined);

const useDropdownContext = () => {
  const context = React.useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown components must be used within a DropdownMenu');
  }
  return context;
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <DropdownContainer>
        {children}
      </DropdownContainer>
    </DropdownContext.Provider>
  );
};

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({ 
  children, 
  asChild = false 
}) => {
  const { isOpen, setIsOpen } = useDropdownContext();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
      onClick: handleClick,
    });
  }

  return (
    <DropdownTrigger onClick={handleClick}>
      {children}
    </DropdownTrigger>
  );
};

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({ 
  children, 
  align = 'left' 
}) => {
  const { isOpen, setIsOpen } = useDropdownContext();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        const container = contentRef.current.parentElement;
        if (container && !container.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, setIsOpen]);

  return (
    <DropdownContent ref={contentRef} isOpen={isOpen} align={align}>
      {children}
    </DropdownContent>
  );
};

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ 
  children, 
  onSelect, 
  disabled = false,
  variant = 'default'
}) => {
  const { setIsOpen } = useDropdownContext();

  const handleClick = () => {
    if (!disabled && onSelect) {
      onSelect();
      setIsOpen(false);
    }
  };

  return (
    <DropdownItem 
      onClick={handleClick} 
      disabled={disabled}
      variant={variant}
    >
      {children}
    </DropdownItem>
  );
};

export { DropdownSeparator as DropdownMenuSeparator };
export { DropdownLabel as DropdownMenuLabel };

// Additional exports for compatibility
export const DropdownMenuGroup = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const DropdownMenuPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const DropdownMenuSub = DropdownMenu;
export const DropdownMenuSubContent = DropdownMenuContent;
export const DropdownMenuSubTrigger = DropdownMenuItem;
export const DropdownMenuRadioGroup = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const DropdownMenuCheckboxItem = DropdownMenuItem;
export const DropdownMenuRadioItem = DropdownMenuItem;
export const DropdownMenuShortcut = ({ children }: { children: React.ReactNode }) => (
  <span style={{ marginLeft: 'auto', fontSize: '12px', opacity: 0.6 }}>{children}</span>
);