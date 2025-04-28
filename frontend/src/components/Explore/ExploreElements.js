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
  display: ${({ isGrid }) => (isGrid ? 'grid' : 'flex')};  /* Conditional display: grid or flex */
  grid-template-columns: ${({ isGrid }) => (isGrid ? 'repeat(auto-fill, minmax(200px, 1fr))' : 'none')}; /* Apply grid-template-columns in grid view */
  flex-direction: ${({ isGrid }) => (isGrid ? 'row' : 'column')}; /* Use column layout for list view */
  grid-gap: 24px; /* Adds space between items in grid view */
  justify-content: ${({ isGrid }) => (isGrid ? 'flex-start' : 'flex-start')}; /* Align the items to the left */
  align-items: ${({ isGrid }) => (isGrid ? 'start' : 'flex-start')}; /* Align items at the top in both views */
  z-index: 3;
  max-width: 100%;
  max-height: 100%;
  padding: 8px 24px;
  margin-top: 0;
  margin-bottom: 0;
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
  margin-top: -48px; /* Ensure no space pushing down the form */
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
  background-color: #01BF71; 
  margin: 16px 0; /* Adds some space above and below */
`;

export const GridView = styled(MdOutlineGridView)`
  color: ${({ isGrid }) => (isGrid ? '#fff' : '#01bf71')}; 
  background-color: ${({ isGrid }) => (isGrid ? '#01bf71' : 'transparent')}; /* Change background color based on view */
  border-radius: 25%;
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
  color: ${({ isGrid }) => (isGrid ? '#01bf71' : '#fff')};
  background-color: ${({ isGrid }) => (isGrid ? 'transparent' : '#01bf71')}; /* Change background color based on view */
  border-radius: 25%;
  font-size: 24px;
  cursor: pointer;
  margin-left: 10px; /* Space between icons */
  &:hover {
    color: #fff; /* Change color on hover */
  }
`;

export const SortWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const SortText = styled.p`
  color: #fff;
  font-size: 14px;
  margin-right: 16px; /* Space between text and dropdown */
  margin-top: 12px; /* Align with the dropdown */
`;

export const SortBy = styled.select`
  width: 100px;
  padding: 12px 18px;
  border: none;
  outline: none;
  border-radius: 48px;
  background: #01bf71;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-right: auto; 
  align-items: center; 
  text-align: center;
  z-index: 3;
  &:hover {
    background: #fff;
    color: #010606;
  }
`;
export const SortByOption = styled.option`
  background: #01bf71;
  color: #fff;
  cursor: pointer;
`;

