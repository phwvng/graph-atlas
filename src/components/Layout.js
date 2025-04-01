import styled from 'styled-components';
import { FaFileUpload } from 'react-icons/fa';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: radial-gradient(circle, rgba(1, 191, 113, 0.3) 10%, #010606 80%);
  color: #ffffff;  // Use white for the primary text color
`;
export const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
`;

export const Sidebar = styled.div`
  width: ${({ isCollapsed }) => (isCollapsed ? "10%" : "25%")};
  background: #333333;  // Dark gray background for sidebar
  color: #dcdcdc;  // Light gray text in the sidebar
  position: relative;
  
`;

export const MainContent = styled.div`
  flex: 1;
  background: #1c1c1c;
`;

export const UploadButton = styled(FaFileUpload)`
  color: #ffffff;  // White icon color
  font-size: 30px;
  cursor: pointer;
  margin: 10px;
  &:hover {
    color: #017c47;  // Change to green on hover
    transform: scale(1.1);
  }

`;