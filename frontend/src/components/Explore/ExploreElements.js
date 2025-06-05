import styled, { keyframes } from 'styled-components';
import { MdOutlineGridView, MdFormatListBulleted } from 'react-icons/md';

// --- Spinner Animation ---
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const ExploreContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 30px;
  height: auto;
  position: relative;
  z-index: 1;
  margin-top: 100px;
  margin-bottom: 0px;
`;

export const DomainBox = styled.div`
  display: ${({ isGrid }) => (isGrid ? 'grid' : 'flex')};
  grid-template-columns: ${({ isGrid }) => (isGrid ? 'repeat(auto-fill, minmax(200px, 1fr))' : 'none')};
  flex-direction: ${({ isGrid }) => (isGrid ? 'row' : 'column')};
  grid-gap: 24px;
  justify-content: ${({ isGrid }) => (isGrid ? 'flex-start' : 'flex-start')};
  align-items: ${({ isGrid }) => (isGrid ? 'start' : 'flex-start')};
  z-index: 3;
  max-width: 100%;
  max-height: 100%;
  padding: 8px 24px;
  margin-top: 0;
  margin-bottom: 0;
`;

// --- Spinner Styled Component ---
export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh; /* Center vertically */
`;

export const SpinnerCircle = styled.div`
  width: 50px;
  height: 50px;
  border: 6px solid rgba(0, 0, 0, 0.1);
  border-top: 6px solid #01bf71; /* Green color from your theme */
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

// --- Other Components ---
export const FormContainer = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  z-index: 3;
  max-width: 1200px;
  position: relative;
  margin: 0 auto;
  margin-top: -48px;
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


export const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: #01BF71;
  margin: 16px 0;
`;

export const GridView = styled(MdOutlineGridView)`
  color: ${({ isGrid }) => (isGrid ? '#fff' : '#01bf71')};
  background-color: ${({ isGrid }) => (isGrid ? '#01bf71' : 'transparent')};
  border-radius: 25%;
  font-size: 24px;
  cursor: pointer;
  margin-left: auto;
  &:hover {
    color: #fff;
  }
`;

export const ChangeViewContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const ListView = styled(MdFormatListBulleted)`
  color: ${({ isGrid }) => (isGrid ? '#01bf71' : '#fff')};
  background-color: ${({ isGrid }) => (isGrid ? 'transparent' : '#01bf71')};
  border-radius: 25%;
  font-size: 24px;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    color: #fff;
  }
`;

export const SortWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const SortText = styled.p`
  color: #fff;
  font-size: 14px;
  margin-right: 16px;
  margin-top: 12px;
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

export const NotLoadedText = styled.p`
  color: #fff;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;

`;