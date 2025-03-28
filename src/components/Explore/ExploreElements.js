import styled from 'styled-components';


export const ExploreContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0 30px;
  height: 800px;
  position: relative;
  z-index: 1;
`;

export const DomainBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr; 
    grid-gap: 16px; /* Adds space between items */
    justify-content: center;
    align-items: center;
    z-index: 3;
    max-width: 100%;
    max-height: 100%;
    padding: 8px 24px;
    border-radius: 10px;
    border: 1px solid #01bf71;
    margin: 0 auto;
  `;

  export const FormContainer = styled.form`
  
  display: flex;
  flex-direction: row; /* Arrange the items horizontally */
  justify-content: center;
  align-items: center;
  z-index: 3;
  max-width: 1200px;
  position: relative;
  margin: 0 auto;
  margin-bottom: 32px;
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