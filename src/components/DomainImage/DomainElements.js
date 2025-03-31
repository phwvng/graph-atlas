import styled from 'styled-components';

// Reusable Card Component
const Card = styled.div`
  background-color: #3e3e3e;
  padding: 6px 10px;
  border-radius: 6px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${({ view }) => (view ? 'column' : 'row')};
`;

export const DomainContainer = styled.div`
  display: flex;
  flex-direction: ${({ view }) => (view ? 'column' : 'row')};
  justify-content: flex-start;
  align-items: stretch;
  background: #2c2c2c;
  border-radius: 8px;
  height: ${({ view }) => (view ? '250px' : '100px')};
  width: ${({ view }) => (view ? '200px' : '100%')};
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease-in-out;
  color: #fff;
  overflow: hidden;
  margin: 6px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    padding: 8px;
  }

  &:hover {
    transform: scale(1.02);
    cursor: pointer;
  }
`;

export const DomainHeader = styled.h1`
  font-size: 0.85rem;
  margin-bottom: 8px;
  color: #fff;
  font-weight: bold;
  text-transform: capitalize;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

export const DomainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  width: 100%;
  height: ${({ view }) => (view ? '100%' : 'calc(100% - 35px)')};
  box-sizing: border-box;
`;

export const DomainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-top: 6px;
`;

export const DatasetStatsContainer = styled.div`
  display: flex;
  flex-wrap: ${({ view }) => (view ? 'wrap' : 'nowrap')};
  justify-content: ${({ view }) => (view ? 'space-between' : 'flex-start')};
  width: 100%;
  margin-bottom: 4px;
`;

export const DatasetStatCard = styled(Card)`
  width: ${({ view }) => (view ? '48%' : 'auto')};
  min-width: 80px;
  margin-bottom: ${({ view }) => (view ? '6px' : '0')};
`;

export const StatLabel = styled.p`
  font-size: 0.7rem;
  color: #dcdcdc;
  text-align: center;
`;

export const StatValue = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
  color: #fff;
`;

export const ComplexityContainer = styled.div`
  display: flex;
  flex-wrap: ${({ view }) => (view ? 'wrap' : 'nowrap')};
  justify-content: ${({ view }) => (view ? 'space-between' : 'flex-start')};
  width: 100%;
  margin-bottom: 4px;
`;

export const ComplexityCard = styled(Card)`
  width: ${({ view }) => (view ? '48%' : 'auto')};
  min-width: 80px;
`;

export const SourceContainer = styled.div`
  margin-top: 4px;
`;

export const SourceCard = styled(Card)`
  width: 100%;
`;

export const TagWrapper = styled.div`
  min-height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4px;
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: ${({ view }) => (view ? 'center' : 'flex-start')};
  width: 100%;
`;

export const DomainTag = styled.div`
  background-color: ${({ color }) => color};
  color: white;
  padding: 3px 5px;
  border-radius: 4px;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 0.7rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: auto;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    opacity: 0.8;
  }
`;
