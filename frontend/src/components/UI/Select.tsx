import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import styled from 'styled-components';

// Styled components
const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const StyledSelect = styled.select`
  display: flex;
  height: 2.5rem;
  width: 100%;
  align-items: center;
  appearance: none;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) =>
    `${theme.spaces.sm} 2.5rem ${theme.spaces.sm} ${theme.spaces.md}`};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.dark};
  cursor: pointer;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray500};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;

const ChevronIcon = styled(ChevronDown)`
  position: absolute;
  right: ${({ theme }) => theme.spaces.md};
  top: 50%;
  transform: translateY(-50%);
  height: 1rem;
  width: 1rem;
  opacity: 0.5;
  pointer-events: none;
`;

const StyledOption = styled.option`
  padding: ${({ theme }) => theme.spaces.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.dark};
  background-color: ${({ theme }) => theme.colors.white};

  &:disabled {
    color: ${({ theme }) => theme.colors.gray400};
  }
`;

const StyledOptGroup = styled.optgroup`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.gray700};
`;

// Component interfaces
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

interface SelectOptionProps
  extends React.OptionHTMLAttributes<HTMLOptionElement> {
  children: React.ReactNode;
}

interface SelectGroupProps
  extends React.OptgroupHTMLAttributes<HTMLOptGroupElement> {
  children: React.ReactNode;
}

// Components
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, ...props }, ref) => (
    <SelectWrapper>
      <StyledSelect ref={ref} {...props}>
        {children}
      </StyledSelect>
      <ChevronIcon />
    </SelectWrapper>
  )
);
Select.displayName = 'Select';

const SelectOption = React.forwardRef<HTMLOptionElement, SelectOptionProps>(
  ({ children, ...props }, ref) => (
    <StyledOption ref={ref} {...props}>
      {children}
    </StyledOption>
  )
);
SelectOption.displayName = 'SelectOption';

const SelectGroup = React.forwardRef<HTMLOptGroupElement, SelectGroupProps>(
  ({ children, ...props }, ref) => (
    <StyledOptGroup ref={ref} {...props}>
      {children}
    </StyledOptGroup>
  )
);
SelectGroup.displayName = 'SelectGroup';

// For backward compatibility, create aliases that match common naming patterns
const SelectTrigger = Select;
const SelectContent = React.Fragment;
const SelectValue = React.Fragment;
const SelectItem = SelectOption;
const SelectLabel = SelectGroup;

export {
  Select,
  SelectOption,
  SelectGroup,
  // Backward compatibility exports
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
  SelectLabel,
};
