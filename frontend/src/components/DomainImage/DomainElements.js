import styled from 'styled-components';

export const DomainContainer = styled.div`
  display: flex;
  flex-direction: ${({ view }) => (view ? 'column' : 'row')};
  justify-content: flex-start;
  align-items: stretch;
  background: #2c2c2c;
  border-radius: 10px;
  height: ${({ view }) => (view ? '250px' : 'auto')};
  width: ${({ view }) => (view ? '210px' : '100%')};
  padding: 12px 14px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  color: #fff;
  margin: 8px;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.55);
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    padding: 10px 12px;
  }
`;

export const DomainHeader = styled.h1`
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #fafafa;
  text-transform: capitalize;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  line-height: 1.2;
`;

export const DomainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  width: 100%;
  height: auto;
  box-sizing: border-box;
`;

export const DomainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 8px;
`;

export const StatCard = styled.div`
  background-color: #3e3e3e;
  padding: ${({ view }) => (view ? '4px 6px' : '6px 8px')};
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  transition: padding 0.2s ease;

  ${({ view }) =>
    view &&
    `
    max-width: 90px;
  `}
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ view }) => (view ? '1.1rem' : '1.4rem')};
  color: ${({ color }) => color || '#fff'};
  min-width: 24px;
  margin-bottom: ${({ view }) => (view ? '4px' : '6px')};
  transition: font-size 0.2s ease, margin-bottom 0.2s ease;
`;

export const LabelValueWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StatLabel = styled.span`
  font-size: 0.75rem;
  color: #bdbdbd;
  font-weight: 500;
  text-align: center;
  margin-bottom: 4px;
`;

export const StatValue = styled.span`
  font-size: ${({ view }) => (view ? '0.85rem' : 'rem')};
  font-weight: 700;
  color: ${({ color }) => color || '#fff'};
  transition: font-size 0.2s ease;
`;

export const SourceContainer = styled.div`
  margin-top: 8px;
  width: 100%;
`;

export const SourceCard = styled.div`
  background-color: #3e3e3e;
  padding: 8px 12px;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: 600;
  font-size: 0.85rem;
`;

export const TagWrapper = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
`;

export const DomainTag = styled.div`
  background-color: ${({ color }) => color};
  color: white;
  padding: 5px 10px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.75rem;
  white-space: nowrap;
  max-width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
  transition: opacity 0.25s ease;

  &:hover {
    opacity: 0.85;
  }
`;

