import styled from 'styled-components';

export const TableWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  caption-side: bottom;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border-collapse: collapse;
`;

export const StyledTableHeader = styled.thead`
  tr {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  }
`;

export const StyledTableBody = styled.tbody`
  tr:last-child {
    border-bottom: 0;
  }
`;

export const StyledTableFooter = styled.tfoot`
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  background-color: ${({ theme }) => theme.colors.gray100};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  
  > tr:last-child {
    border-bottom: 0;
  }
`;

export const StyledTableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
  
  &[data-state="selected"] {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;

export const StyledTableHead = styled.th`
  height: 48px;
  padding: 0 ${({ theme }) => theme.spaces.md};
  text-align: left;
  vertical-align: middle;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.gray600};
  
  &:has([role="checkbox"]) {
    padding-right: 0;
  }
`;

export const StyledTableCell = styled.td`
  padding: ${({ theme }) => theme.spaces.md};
  vertical-align: middle;
  
  &:has([role="checkbox"]) {
    padding-right: 0;
  }
`;

export const StyledTableCaption = styled.caption`
  margin-top: ${({ theme }) => theme.spaces.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray600};
`;