import styled from 'styled-components';

export const StyledCalendar = styled.div`
  padding: 0.75rem;

  /* Months container */
  .rdp-months {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      flex-direction: row;
      column-gap: 1rem;
      row-gap: 0;
    }
  }

  /* Individual month */
  .rdp-month {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }

  /* Caption (month/year header) */
  .rdp-caption {
    display: flex;
    justify-content: center;
    padding-top: 0.25rem;
    position: relative;
    align-items: center;
  }

  .rdp-caption_label {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  /* Navigation */
  .rdp-nav {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .rdp-nav_button {
    height: 1.75rem;
    width: 1.75rem;
    background-color: transparent;
    padding: 0;
    opacity: 0.5;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: ${({ theme }) => theme.radii.md};
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    cursor: pointer;
    transition: opacity 0.2s;
    position: absolute;
    color: ${({ theme }) => theme.colors.gray700};

    &:hover:not(:disabled) {
      opacity: 1;
      background-color: ${({ theme }) => theme.colors.gray100};
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    svg {
      height: 1rem;
      width: 1rem;
    }
  }

  .rdp-nav_button_previous {
    left: 0.25rem;
  }

  .rdp-nav_button_next {
    right: 0.25rem;
  }

  /* Table */
  .rdp-table {
    width: 100%;
    border-collapse: collapse;
  }

  .rdp-head_row {
    display: flex;
  }

  .rdp-head_cell {
    color: ${({ theme }) => theme.colors.gray600};
    border-radius: ${({ theme }) => theme.radii.md};
    width: 2.25rem;
    font-weight: ${({ theme }) => theme.fontWeights.normal};
    font-size: 0.8rem;
  }

  .rdp-tbody {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .rdp-row {
    display: flex;
    width: 100%;
    margin-top: 0.5rem;
  }

  /* Cell */
  .rdp-cell {
    height: 2.25rem;
    width: 2.25rem;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    padding: 0;
    position: relative;

    &:has([aria-selected].rdp-day_range_end) {
      border-top-right-radius: ${({ theme }) => theme.radii.md};
      border-bottom-right-radius: ${({ theme }) => theme.radii.md};
    }

    &:has([aria-selected].rdp-day_outside) {
      background-color: ${({ theme }) => theme.colors.gray200}80;
    }

    &:has([aria-selected]) {
      background-color: ${({ theme }) => theme.colors.gray200};
    }

    &:first-child:has([aria-selected]) {
      border-top-left-radius: ${({ theme }) => theme.radii.md};
      border-bottom-left-radius: ${({ theme }) => theme.radii.md};
    }

    &:last-child:has([aria-selected]) {
      border-top-right-radius: ${({ theme }) => theme.radii.md};
      border-bottom-right-radius: ${({ theme }) => theme.radii.md};
    }

    &:focus-within {
      position: relative;
      z-index: 20;
    }
  }

  /* Day button */
  .rdp-day {
    height: 2.25rem;
    width: 2.25rem;
    padding: 0;
    font-weight: ${({ theme }) => theme.fontWeights.normal};
    background-color: transparent;
    border: none;
    cursor: pointer;
    border-radius: ${({ theme }) => theme.radii.md};
    transition: background-color 0.2s, color 0.2s;
    color: ${({ theme }) => theme.colors.dark};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.gray200};
    }

    &[aria-selected="true"] {
      opacity: 1;
    }
  }

  /* Selected day */
  .rdp-day_selected {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};

    &:hover,
    &:focus {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};
    }
  }

  /* Today */
  .rdp-day_today:not(.rdp-day_selected) {
    background-color: ${({ theme }) => theme.colors.gray200};
    color: ${({ theme }) => theme.colors.dark};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }

  /* Outside month days */
  .rdp-day_outside {
    color: ${({ theme }) => theme.colors.gray600};
    opacity: 0.5;

    &[aria-selected="true"] {
      background-color: ${({ theme }) => theme.colors.gray200}80;
      color: ${({ theme }) => theme.colors.gray600};
      opacity: 0.3;
    }
  }

  /* Disabled days */
  .rdp-day:disabled,
  .rdp-day_disabled {
    color: ${({ theme }) => theme.colors.gray600};
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      background-color: transparent;
    }
  }

  /* Range middle */
  .rdp-day_range_middle[aria-selected="true"] {
    background-color: ${({ theme }) => theme.colors.gray200};
    color: ${({ theme }) => theme.colors.dark};
  }

  /* Range end */
  .rdp-day_range_end {
    /* Styles handled by parent cell */
  }

  /* Hidden */
  .rdp-day_hidden {
    visibility: hidden;
  }
`;
