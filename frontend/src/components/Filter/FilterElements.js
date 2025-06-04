import styled from 'styled-components';
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { FiGlobe, FiBookOpen, FiTag } from "react-icons/fi"; // NEW

export const FilterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: #2b2b2b;
  border-radius: 12px;
  padding: 20px;
  margin-top: 80px;
  color: #fff;
  width: 100%;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease-in-out;

  height: 100vp;             // 👈 Add this
`;


export const FilterH1 = styled.h1`
  font-size: 1.2rem;
  color: #fafafa;
  text-align: center;
  margin-bottom: 12px;
  font-weight: 600;
`;

export const FilterTitleWrapper = styled.div`  // NEW
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px 0;
`;

export const FilterTitle = styled.h2`
  font-size: 1rem;
  color: #eee;
  font-weight: 500;
  margin: 0;
  text-align: left;
`;

export const FilterOptions = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: linear-gradient(135deg, #333, #2a2a2a);
  padding: 16px;
  border-radius: 10px;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.5);
`;

export const FilterItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ isCollapsed }) => (isCollapsed ? 'center' : 'space-between')};
  gap: 10px;
  width: 100%;
  flex-wrap: wrap;
  padding: 6px 8px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
  background: linear-gradient(135deg, #333, #2a2a2a);

  &:hover {
  background-color: #444;
}
`;

export const FilterItem = styled.input`
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #01bf71;
  border-radius: 4px;
  background-color: transparent;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: #01bf71;
    border-color: #01bf71;
  }

  &:checked::after {
    content: "✔";
    font-size: 12px;
    color: #fff;
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const Label = styled.label`
  color: #f0f0f0;
  font-size: ${({ isCollapsed }) => (isCollapsed ? '0.75rem' : '0.9rem')};
  cursor: pointer;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AmountLabel = styled.span`
  font-size: 0.85rem;
  color: #bbb;
`;

export const Divider = styled.div`
  height: 1px;
  background-color: #444;
  margin: 20px 0;
  width: 100%;
`;

export const CollapseButton = styled(FaChevronCircleLeft)`
  font-size: 22px;
  color: #01bf71;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 12px;

  &:hover {
    color: #ccc;
  }
`;

export const ExpandButton = styled(FaChevronCircleRight)`
  font-size: 22px;
  color: #01bf71;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 12px;

  &:hover {
    color: #ccc;
  }
`;


export const ShowMoreButton = styled.div`
  margin-top: 8px;
  font-size: 0.85rem;
  color: #01bf71;
  cursor: pointer;
  user-select: none;
  text-align: center;
  &:hover {
    color: #00e676;
  }
`;

// Export the icons for use in JSX
export const DomainIcon = FiGlobe;
export const SourceIcon = FiBookOpen;
export const TagIcon = FiTag;