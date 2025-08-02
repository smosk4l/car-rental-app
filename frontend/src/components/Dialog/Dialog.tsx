import * as React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import {
  Overlay,
  Content,
  CloseButton,
  VisuallyHidden,
  Header,
  Footer,
  Title,
  Description,
  TriggerButton,
} from './styles';

interface DialogContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextType | undefined>(
  undefined
);

const useDialogContext = () => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog components must be used within a Dialog');
  }
  return context;
};

interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Dialog: React.FC<DialogProps> = ({
  children,
  open: controlledOpen,
  onOpenChange,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const setIsOpen = React.useCallback(
    (open: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(open);
      }
      onOpenChange?.(open);
    },
    [isControlled, onOpenChange]
  );

  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DialogContext.Provider>
  );
};

interface DialogTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const DialogTrigger: React.FC<DialogTriggerProps> = ({
  children,
  asChild = false,
}) => {
  const { setIsOpen } = useDialogContext();

  const handleClick = () => {
    setIsOpen(true);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{ onClick?: () => void }>,
      {
        onClick: handleClick,
      }
    );
  }

  return <TriggerButton onClick={handleClick}>{children}</TriggerButton>;
};

interface DialogPortalProps {
  children: React.ReactNode;
  container?: HTMLElement;
}

export const DialogPortal: React.FC<DialogPortalProps> = ({
  children,
  container,
}) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(children, container || document.body);
};

interface DialogCloseProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const DialogClose: React.FC<DialogCloseProps> = ({
  children,
  asChild = false,
}) => {
  const { setIsOpen } = useDialogContext();

  const handleClick = () => {
    setIsOpen(false);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{ onClick?: () => void }>,
      {
        onClick: handleClick,
      }
    );
  }

  return <CloseButton onClick={handleClick}>{children}</CloseButton>;
};

export const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { isOpen, setIsOpen } = useDialogContext();

  const handleClick = () => {
    setIsOpen(false);
  };

  return <Overlay ref={ref} isOpen={isOpen} onClick={handleClick} {...props} />;
});
DialogOverlay.displayName = 'DialogOverlay';

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>(({ children, ...props }, ref) => {
  const { isOpen, setIsOpen } = useDialogContext();
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, setIsOpen]);

  React.useEffect(() => {
    if (isOpen && contentRef.current) {
      const focusableElements = contentRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      firstElement?.focus();

      const handleTab = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTab);
      return () => {
        document.removeEventListener('keydown', handleTab);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <DialogPortal>
      <DialogOverlay />
      <Content
        ref={ref || contentRef}
        isOpen={isOpen}
        onClick={e => e.stopPropagation()}
        {...props}
      >
        {children}
        <DialogClose>
          <X size={16} />
          <VisuallyHidden>Close</VisuallyHidden>
        </DialogClose>
      </Content>
    </DialogPortal>
  );
});
DialogContent.displayName = 'DialogContent';

export const DialogHeader: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = props => <Header {...props} />;
DialogHeader.displayName = 'DialogHeader';

export const DialogFooter: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = props => <Footer {...props} />;
DialogFooter.displayName = 'DialogFooter';

export const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>((props, ref) => <Title ref={ref} {...props} />);
DialogTitle.displayName = 'DialogTitle';

export const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>((props, ref) => <Description ref={ref} {...props} />);
DialogDescription.displayName = 'DialogDescription';
