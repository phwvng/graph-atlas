import styled from 'styled-components';

export const DomainContainer = styled.div`
  display: flex;
  flex-direction: ${({ view }) => (view ? "column" : "row")}; /* Column for grid, row for list */
  justify-content: flex-start;
  align-items: center;
  background: #2c2c2c;  /* Dark gray background */
  border-radius: 10px;
  height: ${({ view }) => (view ? "280px" : "120px")}; /* Taller for grid, shorter for list */
  width: ${({ view }) => (view ? "225px" : "100%")}; /* 240px width for grid, 100% for list */
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);  /* Subtle shadow to lift the item */
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
  color: #dcdcdc;
  font-weight: bold;
  text-transform: capitalize;
`;

export const DomainImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

export const DomainImg = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;
export const DomainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 10px;
`;


export const DatasetSize = styled.p`
  font-size: 0.8rem;
  margin-bottom: 6px;
  color: #dcdcdc;
`;

export const DatasetComplexity = styled.p`
  font-size: 0.8rem;
  margin-bottom: 6px;
  color: #dcdcdc;
`;

export const DatasetSource = styled.p`
  font-size: 0.8rem;
  margin-bottom: 10px;
  color: #dcdcdc;
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-start;
  width: 100%;
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