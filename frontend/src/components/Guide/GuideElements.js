// GuideElements.js
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const GuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 48%;
  max-height: 320px;
  overflow-y: auto;
  background: #222;
  padding: 20px 22px;
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

export const StepCard = styled(motion.div)`
  background-color: #282c34;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 10px 16px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
  user-select: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3a3f58;
  }

  color: #a0cfc1;
  font-size: 16px;
  line-height: 1.4;
  font-weight: 500;

  strong {
    color: #03c988;
    display: block;
    margin-bottom: 4px;
    font-size: 17px;
  }
`;

export const StepHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StepTitle = styled.h3`
  font-weight: 600;
  color: white;
  margin: 0;
  font-size: 17px;
`;

export const StepContent = styled.div`
  margin-top: 8px;
  color: #ddd;
  font-size: 14px;
`;

export const StepDescription = styled.p`
  margin: 0 0 8px 0;
`;

export const StepLink = styled.a`
  color: #61dafb;
  text-decoration: underline;
  font-weight: 600;
  font-size: 14px;

  &:hover {
    color: #21a1f1;
  }
`;

export const StepImage = styled.img`
  width: 100%;
  max-height: 220px;
  object-fit: contain;
  border-radius: 6px;
  margin-top: 8px;
`;

export const EmptyGuideMessage = styled.div`
  text-align: center;
  padding: 30px 0;
  font-size: 16px;
  color: #999;
`;

export const PlayButton = styled.button`
  background: #28a745;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  position: relative;
  padding: 0;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }

  &:before {
    content: '';
    position: absolute;
    left: 11px;
    top: 7px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 0 8px 13px;
    border-color: transparent transparent transparent white;
  }
`;

export const ModalArrowButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 1.7rem;
  cursor: pointer;
  user-select: none;
  transition: color 0.3s ease;
  padding: 0 6px;

  &:hover {
    color: #bbb;
  }
`;

export const GuideHeader = styled.h2`
  color: #61dafb;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 12px;
  text-align: center;
  letter-spacing: 1px;
  user-select: none;
`;

export const StepNumber = styled.span`
  background-color: #61dafb;
  color: #282c34;
  font-weight: bold;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  box-shadow: 0 0 8px rgba(97, 218, 251, 0.7);
  user-select: none;
`;
