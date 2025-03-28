import styled from 'styled-components';
import { MdOutlineGridView, MdFormatListBulleted } from 'react-icons/md';

export const ExploreContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Align items to the top */
  padding: 0 30px;
  height: auto; /* Allow dynamic height */
  position: relative;
  z-index: 1;
  margin-top: 100px;  /* Ensure no space pushing down the form */
  margin-bottom: 0px;  /* Ensure no space at the bottom */
`;

export const DomainBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 16px; /* Adds space between items */
  justify-content: flex-start; /* Align the items to the left */
  align-items: start; /* Ensure items align at the top */
  z-index: 3;
  max-width: 100%;
  max-height: 100%;
  padding: 8px 24px;
  margin-top: 0;  /* Ensure there's no margin at the top */
  margin-bottom: 0;  /* Remove any bottom margin */
`;


export const FormContainer = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;  /* Align form content to the left */
  align-items: center;
  z-index: 3;
  max-width: 1200px;
  position: relative;
  margin: 0 auto;
  margin-bottom: -25px;
  gap: 10px;
  padding: 0; 
  
`;
export const SearchBar = styled.input`
  padding: 16px 24px;
  border: none;
  outline: none;
  width: 100%;
  border-radius: 50px;
  margin-right: 10px;
`;

export const SearchButton = styled.button`
  padding: 16px 24px;
  border: none;
  outline: none;
  border-radius: 50px;
  background: #01bf71;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    background: #fff;
    color: #010606;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.3); /* Lighter gray, more noticeable */
  margin: 16px 0; /* Adds some space above and below */
`;

export const GridView = styled(MdOutlineGridView)`
  color: #01bf71;
  font-size: 24px;
  cursor: pointer;
  margin-left: auto; /* Align to the right */
  &:hover {
    color: #fff; /* Change color on hover */
  }
`;

export const ChangeViewContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* Align to the right */
  align-items: center;
`;

export const ListView = styled(MdFormatListBulleted)`
  color: #01bf71;
  font-size: 24px;
  cursor: pointer;
  margin-left: 10px; /* Space between icons */
  &:hover {
    color: #fff; /* Change color on hover */
  }
`;
