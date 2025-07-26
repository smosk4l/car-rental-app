# Component Architecture Guide

## 📁 Component Structure

All components in this project follow a consistent folder-based structure where each component has its own directory containing:

```
ComponentName/
├── ComponentName.tsx    # Main component logic and UI
├── styles.ts           # Styled components
└── index.ts            # Export file for clean imports
```

### Benefits of This Structure:

1. **Separation of Concerns**: Logic and styling are separated
2. **Maintainability**: Easy to find and modify styles
3. **Reusability**: Styles can be imported separately if needed
4. **Clean Imports**: Index files allow clean component imports
5. **Scalability**: Easy to add new files (tests, stories, etc.)

## 🔧 Component Examples

### Input Component
```
Input/
├── Input.tsx           # Input logic and UI
├── styles.ts          # InputContainer, Label, StyledInput, ErrorMessage
└── index.ts           # export { default } from './Input'
```

**Usage:**
```tsx
import Input from '@/components/Input';

// In styles.ts
export const InputContainer = styled.div`...`;
export const Label = styled.label`...`;

// In Input.tsx
import { InputContainer, Label } from './styles';
```

### Button Component
```
Button/
├── Button.tsx         # Button logic and UI
├── styles.ts         # StyledButton with variants
└── index.ts          # export { Button } from './Button'
```

### LoginForm Component
```
LoginForm/
├── LoginForm.tsx      # Form logic, validation, and UI
├── styles.ts         # FormContainer, Title, Form, ErrorMessage
└── index.ts          # export { default } from './LoginForm'
```

### Header Component
```
Header/
├── Header.tsx        # Navigation logic and UI
├── styles.ts        # HeaderContainer, Logo, UserInfo, etc.
└── index.ts         # export { default } from './Header'
```

## 📋 Implementation Guidelines

### 1. Creating a New Component

When creating a new component, follow these steps:

1. **Create the folder**: `mkdir src/components/ComponentName`
2. **Create styles.ts**:
   ```tsx
   import styled from 'styled-components';
   
   export const Container = styled.div`
     // styles here
   `;
   
   export const Title = styled.h1`
     // styles here
   `;
   ```

3. **Create ComponentName.tsx**:
   ```tsx
   'use client';
   
   import { Container, Title } from './styles';
   
   interface ComponentProps {
     // props here
   }
   
   const ComponentName: React.FC<ComponentProps> = ({ ...props }) => {
     return (
       <Container>
         <Title>Component Content</Title>
       </Container>
     );
   };
   
   export default ComponentName;
   ```

4. **Create index.ts**:
   ```tsx
   export { default } from './ComponentName';
   // or for named exports:
   export { ComponentName } from './ComponentName';
   ```

### 2. Styling Guidelines

**In styles.ts:**
- Export all styled components
- Use descriptive names (e.g., `HeaderContainer`, `UserInfo`)
- Group related styles together
- Include TypeScript interfaces for styled component props
- Use transient props (`$` prefix) to avoid React DOM warnings

**Example:**
```tsx
import styled from 'styled-components';

interface ButtonStyleProps {
  $variant?: 'primary' | 'secondary';
  $size?: 'sm' | 'md' | 'lg';
  $fullWidth?: boolean;
}

export const StyledButton = styled.button<ButtonStyleProps>`
  // Base styles
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'primary':
        return `background: ${theme.colors.primary};`;
      case 'secondary':
        return `background: ${theme.colors.secondary};`;
    }
  }}
  
  ${({ $fullWidth }) => $fullWidth && `width: 100%;`}
`;
```

**In Component.tsx:**
```tsx
// Pass component props as transient props to styled components
<StyledButton 
  $variant={variant}
  $size={size}
  $fullWidth={fullWidth}
  type={type}
  {...otherProps}
>
  {children}
</StyledButton>
```

### 3. Import Guidelines

**Component imports:**
```tsx
// ✅ Good - uses index.ts
import Button from '@/components/Button';
import Input from '@/components/Input';

// ❌ Avoid - direct file imports
import Button from '@/components/Button/Button';
```

**Style imports (within component):**
```tsx
// ✅ In ComponentName.tsx
import { Container, Title, Content } from './styles';
```

## 🎯 Current Component Structure

### Existing Components

1. **Input** (`/src/components/Input/`)
   - ✅ Reusable form input with validation
   - ✅ Error states and styling
   - ✅ TypeScript support

2. **Button** (`/src/components/Button/`)
   - ✅ Multiple variants (primary, secondary, danger, success)
   - ✅ Different sizes (sm, md, lg)
   - ✅ Loading and disabled states

3. **LoginForm** (`/src/components/LoginForm/`)
   - ✅ Complete authentication form
   - ✅ Validation and error handling
   - ✅ NextAuth integration

4. **Header** (`/src/components/Header/`)
   - ✅ Navigation with authentication status
   - ✅ User info display
   - ✅ Responsive design

5. **NextAuthProvider** (`/src/components/NextAuthProvider/`)
   - ✅ Session provider wrapper
   - ✅ Clean provider implementation

## 🎯 Single Responsibility Principle (SRP)

### Core Philosophy

Each file or component should focus on **one specific concern or responsibility**. This fundamental principle improves:

- **Readability**: Code is easier to understand when each file has a clear purpose
- **Maintainability**: Changes are isolated to specific areas of concern
- **Testability**: Individual responsibilities can be tested in isolation
- **Reusability**: Modular code can be reused across different contexts

### Responsibility Separation

| File Type | Responsibility | Example |
|-----------|---------------|---------|
| **Component.tsx** | UI rendering and component logic | Button state, event handlers |
| **styles.ts** | Visual styling and theming | Colors, spacing, animations |
| **logic.ts** | Business logic and calculations | Form validation, data processing |
| **api.ts** | Data fetching and API calls | HTTP requests, data transformation |
| **types.ts** | Type definitions | Interfaces, enums, type unions |
| **utils.ts** | Helper functions | Pure functions, utilities |

### Example: Modular Button Component

Instead of cramming everything into one file, split responsibilities:

**Button.tsx** - UI Component
```tsx
'use client';

import { StyledButton } from './styles';
import { handleButtonClick } from './buttonLogic';

interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({ label, variant = 'primary', disabled, onClick }: ButtonProps) => {
  const handleClick = () => {
    handleButtonClick();
    onClick?.();
  };

  return (
    <StyledButton 
      $variant={variant} 
      disabled={disabled}
      onClick={handleClick}
    >
      {label}
    </StyledButton>
  );
};
```

**buttonLogic.ts** - Business Logic
```ts
export const handleButtonClick = () => {
  // Analytics tracking
  console.log('Button interaction tracked');
  
  // Additional business logic
  if (window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'engagement',
      event_label: 'button_click'
    });
  }
};

export const validateButtonAction = (userRole: string): boolean => {
  return userRole === 'admin' || userRole === 'user';
};
```

**styles.ts** - Styling
```ts
import styled from 'styled-components';

interface ButtonStyleProps {
  $variant?: 'primary' | 'secondary';
}

export const StyledButton = styled.button<ButtonStyleProps>`
  padding: ${({ theme }) => `${theme.spaces.md} ${theme.spaces.lg}`};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'secondary':
        return `
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.white};
        `;
      default:
        return `
          background-color: ${theme.colors.primary};
          color: ${theme.colors.white};
        `;
    }
  }}

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
```

### Benefits of This Approach

✅ **Clear Separation**: Each file has one clear purpose  
✅ **Easy Testing**: Logic can be tested independently  
✅ **Reusable Logic**: `buttonLogic.ts` can be used by other components  
✅ **Maintainable Styles**: Styling changes don't affect component logic  
✅ **Type Safety**: Clear interfaces between modules  

## 🔧 TypeScript Best Practices

### Component Type Definitions

**❌ Avoid React.FC**
```tsx
// Don't do this
const MyComponent: React.FC<Props> = ({ title }) => {
  return <div>{title}</div>;
};
```

**✅ Use Explicit Props Types**
```tsx
// Do this instead
interface MyComponentProps {
  title: string;
  description?: string;
  onAction: (id: string) => void;
}

const MyComponent = ({ title, description, onAction }: MyComponentProps) => {
  return (
    <div>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      <button onClick={() => onAction('example')}>Action</button>
    </div>
  );
};
```

### Why Avoid React.FC?

1. **Better Type Inference**: Explicit props types provide clearer IntelliSense
2. **No Implicit Children**: Avoids assuming components always accept children
3. **Cleaner Generics**: Easier to work with generic components
4. **Better Error Messages**: TypeScript errors are more precise

### Type Safety Guidelines

```tsx
// ✅ Define clear interfaces
interface UserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
  };
  onEdit: (userId: string) => void;
  onDelete: (userId: string) => void;
}

// ✅ Use union types for variants
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

// ✅ Make optional props explicit
interface FormFieldProps {
  label: string;
  value: string;
  error?: string; // Clearly optional
  required?: boolean; // Clearly optional
  onChange: (value: string) => void; // Required callback
}
```

## ⚠️ Quality Assurance Requirements

### Before Every Commit

**Always run these commands after any code change:**

```bash
# Check linting rules
npm run lint

# Check TypeScript compilation
npx tsc --noEmit
```

### Pre-Commit Checklist

- [ ] All linting errors resolved
- [ ] No TypeScript compilation errors
- [ ] All tests passing
- [ ] Components follow SRP
- [ ] Proper type definitions
- [ ] Clean git diff

### Automated Quality Checks

Consider adding these to your workflow:

```json
// package.json scripts
{
  "scripts": {
    "type-check": "npx tsc --noEmit",
    "lint:strict": "npm run lint && npm run type-check",
    "pre-commit": "npm run lint:strict && npm test"
  }
}
```

**🚨 No code should be committed or merged if it contains:**
- Unresolved linting errors
- TypeScript type issues
- Failed tests
- SRP violations

This ensures consistent, maintainable, and high-quality code across the entire project.

## 🚀 Best Practices

### Do's ✅
- Keep logic in ComponentName.tsx
- Keep styles in styles.ts
- Use descriptive names for styled components
- Export everything needed from styles.ts
- Create index.ts for clean imports
- Use TypeScript interfaces for props
- Follow consistent naming conventions
- Use transient props (`$` prefix) for styled component props to avoid React warnings

### Don'ts ❌
- Don't mix styles with logic in the same file
- Don't import styled-components in ComponentName.tsx
- Don't skip the index.ts file
- Don't use generic names like `Container` everywhere
- Don't forget to export styled components from styles.ts
- Don't pass component-specific props directly to DOM elements (use transient props)

## 📖 Migration from Old Structure

If migrating an existing component:

1. Create the new folder structure
2. Move styled components to styles.ts
3. Update imports in the component file
4. Create index.ts
5. Update any files importing the component
6. Remove the old component file

This structure ensures maintainable, scalable, and clean component architecture throughout the application.
