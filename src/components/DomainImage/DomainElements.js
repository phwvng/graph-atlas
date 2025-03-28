import styled from 'styled-components';

export const DomainContainer = styled.div`
  display: flex;
  flex-direction: ${({ view }) => (view ? "column" : "row")}; /* Column for grid, row for list */
  justify-content: flex-start;
  align-items: center;
  background: #000;
  border-radius: 10px;
  height: ${({ view }) => (view ? "280px" : "120px")}; /* Taller for grid, shorter for list */
  width: ${({ view }) => (view ? "240px" : "100%")}; /* 240px width for grid, 100% for list */
  padding: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
  color: #fff;
  overflow: hidden;

  &:hover {
    transform: scale(1.02);
    cursor: pointer;
  }
`;

export const DomainHeader = styled.h1`
  font-size: 1rem;
  margin-bottom: 12px;
`;

export const DomainImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DomainImg = styled.img`
  height: 80px;
  width: 80px;
  margin-bottom: 6px;
`;

export const DomainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
`;

export const DatasetSize = styled.h2`
  font-size: 0.7rem;
  margin-bottom: 6px;
`;

export const DatasetComplexity = styled.h2`
  font-size: 0.7rem;
  margin-bottom: 6px;
`;

export const DomainTag = styled.div`
  background-color: ${({ color }) => color};
  color: white;
  padding: 4px 8px;  /* Reduced padding for a tighter fit */
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  font-size: 0.8em;  /* Slightly increased font size for better readability */
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


export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 0;
  justify-content: flex-start;
  font-size: 1rem;
  width: 100%;
  overflow: hidden;
  
`;

export const DatasetSource = styled.h2`
  font-size: 0.7rem;
  margin-bottom: 6px;

`;


export const Label = styled.span`
  font-family: 'Nova Square', sans-serif;
  margin-right: 10px; /* Optional: Add some space between the label and the data */
  font-weight: bold;
`;

export const DataValue = styled.span`
  font-family: 'Nova Square', sans-serif;
  text-align: right;
  width: 100%; /* If necessary, ensure data aligns right */
  font-weight: normal;
`;