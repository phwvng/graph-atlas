// GuideElements.js
import styled from 'styled-components';

export const GuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 48%;
  max-height: 320px;
  overflow-y: auto;
  background: #222;
  padding: 24px 26px;
  border-radius: 12px;
  box-shadow: 0 0 8px rgba(3, 201, 136, 0.2);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  scrollbar-width: thin;
  scrollbar-color: #03c988 transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #03c988;
    border-radius: 5px;
  }
`;

export const GuideStep = styled.div`
  width: 100%;
  background: #2a2a2a;
  border-radius: 10px;
  padding: 16px 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: background 0.3s ease;

  color: #a0cfc1;
  font-size: 18px;
  line-height: 1.55;
  font-weight: 500;

  strong {
    color: #03c988;
    display: block;
    margin-bottom: 6px;
  }

  &:hover {
    background: #323232;
  }
`;
