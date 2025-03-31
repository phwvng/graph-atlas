import styled from 'styled-components';
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";



export const FilterBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;  
    justify-content: center;
    margin-top: 100px;
    color: #fff;
    width: 100%;  /* Ensures it takes full width of Sidebar */
    position: relative;
    transition: width 0.3s ease-in-out; /* Smooth width transition */
`;

export const FilterH1 = styled.h1`
    font-size: 1rem;
    color: #fff;
    text-align: center;
    margin-bottom: 20px;
    `;

export const FilterTitle = styled.h2`
    font-size: 0.9rem;
    color: #fff;
    text-align: center;
    margin-bottom: 20px;
    `;

    export const FilterOptions = styled.form`
    display: flex;
    flex-direction: column;
    align-items: left;
    
    background: #01BF71;
    padding: 20px;
    border-radius: 10px;
    width: 90%;
  `;
  
  export const FilterItemContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%; 
  margin: 8px 0;
  cursor: pointer;
  flex-wrap: wrap;  
  justify-content: ${({ isCollapsed }) => (isCollapsed ? "center" : "space-between")};
  gap: 10px;  /* Adds space between items */
`;
  export const FilterItem = styled.input`
    appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid white;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    
    &:checked {
      background-color: white;
      border: 2px solid white;
    }
  
    &:checked::after {
      content: "✔";
      font-size: 12px;
      color: #01BF71;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `;
  
  export const Label = styled.label`
  color: white;
  font-size: ${({ isCollapsed }) => (isCollapsed ? "0.7em" : "1em")};
  cursor: pointer;
  width: 70%;
`;

    
  export const CollapseButton = styled(FaChevronCircleLeft)`
  font-size: 24px;
  color: #01BF71;
  cursor: pointer;
  position: absolute; 
  top: 0px;  /* Moves it to the top */
  right: 10px;  /* Moves it to the right */
  
  &:hover {
      color: #ccc;
  }
`;

export const ExpandButton = styled(FaChevronCircleRight)`
  font-size: 24px;
  color: #01BF71;
  cursor: pointer;
  position: absolute; 
  top: 0px;  /* Moves it to the top */
  right: 10px;  /* Moves it to the right */

  &:hover {
      color: #ccc;
  }
`;

export const AmountLabel = styled.span`
    font-size: 14px;
    color: #fff;
    margin-left: 0px;
`;

export const Divider = styled.div`
    height: 1px;
    background-color: #ccc;
    margin: 20px 0;
    width: 100%;
`;