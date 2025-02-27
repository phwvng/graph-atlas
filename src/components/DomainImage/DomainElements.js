import styled from 'styled-components';

export const DomainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #000;
  border-radius: 10px;
  height: 240px;  /* Adjusted for better layout */
  width: 180px;
  padding: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  transition: all 0.2s ease-in-out;
  color: #fff;

  &:hover {
    transform: scale(1.02);
    cursor: pointer;
  }
`;

export const DomainHeader = styled.h1`
    font-size: 1rem; /* Reduced from 2rem */
    margin-bottom: 12px;
`;

export const DomainImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const DomainImg = styled.img`
    height: 80px;  /* Reduced from 160px */
    width: 80px;   /* Reduced from 160px */
    margin-bottom: 6px;
`;

export const DomainContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const DatasetSize = styled.h2`
    font-size: 0.7rem; /* Reduced from 0.8rem */
    margin-bottom: 6px;
`;

export const DatasetComplexity = styled.h2`
    font-size: 0.7rem; /* Reduced from 0.8rem */
    margin-bottom: 6px;
`;

export const DatasetTags = styled.h2`
    font-size: 0.7rem; /* Reduced from 0.8rem */
    margin-bottom: 6px;
`;

export const DatasetSource = styled.h2`
    font-size: 0.7rem; /* Reduced from 0.8rem */
    margin-bottom: 6px;
`;
