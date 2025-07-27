'use client';

import React from 'react';
import { Check } from 'lucide-react';
import styled from 'styled-components';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const CheckboxContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const HiddenInput = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const StyledCheckbox = styled.div<{ $checked: boolean; $disabled?: boolean }>`
  height: 1rem;
  width: 1rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ $checked, theme }) =>
    $checked ? theme.colors.primary : 'transparent'};
  color: ${({ $checked, theme }) =>
    $checked ? theme.colors.white : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};

  &:hover {
    opacity: ${({ $disabled }) => ($disabled ? 0.5 : 0.8)};
  }

  ${HiddenInput}:focus + & {
    outline: none;
    box-shadow:
      0 0 0 2px ${({ theme }) => theme.colors.white},
      0 0 0 4px ${({ theme }) => theme.colors.primary};
  }
`;

const CheckIcon = styled(Check)<{ $visible: boolean }>`
  height: 0.75rem;
  width: 0.75rem;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
`;

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, disabled, onChange, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(checked || false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        setIsChecked(event.target.checked);
        onChange?.(event);
      }
    };

    React.useEffect(() => {
      setIsChecked(checked || false);
    }, [checked]);

    return (
      <CheckboxContainer className={className}>
        <HiddenInput
          ref={ref}
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
          {...props}
        />
        <StyledCheckbox $checked={isChecked} $disabled={disabled}>
          <CheckIcon $visible={isChecked} />
        </StyledCheckbox>
      </CheckboxContainer>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
