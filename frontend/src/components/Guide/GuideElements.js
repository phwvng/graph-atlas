import styled from 'styled-components';
import { motion } from 'framer-motion';

export const GuideContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

export const StepCard = styled(motion.div)`
  background-color: #282c34;
  border-radius: 8px;
  margin-bottom: 12px;
  padding: 12px 20px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
  user-select: none;

  &:hover {
    background-color: #3a3f58;
  }
`;

export const StepHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const StepTitle = styled.h3`
  font-weight: 600;
  color: white;
  margin: 0;
`;

export const StepContent = styled.div`
  margin-top: 10px;
  color: #ddd;
  font-size: 15px;
`;

export const StepDescription = styled.p`
  margin: 0 0 10px 0;
`;

export const StepLink = styled.a`
  color: #61dafb;
  text-decoration: underline;
  font-weight: 600;

  &:hover {
    color: #21a1f1;
  }
`;

export const StepImage = styled.img`
  width: 100%;
  max-height: 250px;
  object-fit: contain;
  border-radius: 6px;
  margin-top: 10px;
`;

export const EmptyGuideMessage = styled.div`
  text-align: center;
  padding: 40px 0;
  font-size: 18px;
  color: #999;
`;

export const PlayButton = styled.button`
  background: #28a745;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
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
    left: 12px;
    top: 8px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 9px 0 9px 15px;
    border-color: transparent transparent transparent white;
  }
`;

export const ModalArrowButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  user-select: none;
  transition: color 0.3s ease;
  padding: 0 8px;

  &:hover {
    color: #bbb;
  }

  &:disabled {
    opacity: 0.4;
    pointer-events: none;
  }
`;

export const GuideHeader = styled.h2`
  color: #61dafb;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 16px;
  text-align: center;
  letter-spacing: 1px;
  user-select: none;
`;

export const StepNumber = styled.div`
  background-color: #61dafb;
  color: #282c34;
  font-weight: bold;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  box-shadow: 0 0 8px rgba(97, 218, 251, 0.7);
  user-select: none;
`;
