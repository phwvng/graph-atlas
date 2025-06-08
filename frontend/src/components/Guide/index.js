import React, { useState, useEffect, useRef } from 'react';
import {
  GuideContainer,
  StepCard,
  StepHeader,
  StepNumber,
  StepTitle,
  StepContent,
  StepDescription,
  StepLink,
  StepImage,
  EmptyGuideMessage,
  PlayButton,
  ModalArrowButton,
  GuideHeader,
} from './GuideElements';
import { motion, AnimatePresence } from 'framer-motion';

const ModalOverlay = ({ children, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(20, 20, 30, 0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '20px',
    }}
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.8 }}
      onClick={e => e.stopPropagation()}
      style={{
        background: '#1e1e2f',
        color: 'white',
        padding: 30,
        borderRadius: 10,
        maxWidth: '600px',
        maxHeight: '80vh',
        overflowY: 'auto',
        boxShadow: '0 4px 20px rgba(0,0,0,0.7)',
        position: 'relative',
        width: '100%',
      }}
    >
      {children}
    </motion.div>
  </motion.div>
);

const Guide = ({ dataset }) => {
  const [openStep, setOpenStep] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const containerRef = useRef(null);

  const guideIsEmpty =
    !dataset?.guide ||
    (Array.isArray(dataset.guide) && dataset.guide.length === 0);

  const steps = Array.isArray(dataset.guide) ? dataset.guide : [];

  useEffect(() => {
    if (openStep && containerRef.current) {
      const stepElement = document.getElementById(`step-${openStep}`);
      if (stepElement && containerRef.current.contains(stepElement)) {
        stepElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [openStep]);

  const toggleStep = (stepId) => {
    setOpenStep(prev => (prev === stepId ? null : stepId));
  };

  const openExpanded = (index) => {
    setExpandedIndex(index);
  };

  const closeExpanded = () => {
    setExpandedIndex(null);
  };

  const navigateStep = (direction) => {
    if (expandedIndex === null) return;
    let newIndex = expandedIndex + direction;
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= steps.length) newIndex = steps.length - 1;
    setExpandedIndex(newIndex);
  };

  const handlePlay = (step) => {
    alert(`Open step "${step.title}" in GraphPolaris demo.`);
  };

  if (guideIsEmpty) {
    return (
      <GuideContainer>
        <EmptyGuideMessage>No guide available.</EmptyGuideMessage>
      </GuideContainer>
    );
  }

  return (
    <GuideContainer>
      <GuideHeader>Exploration Guide</GuideHeader>
      <div style={{ maxHeight: '60vh', overflowY: 'auto' }} ref={containerRef}>
        {steps.map((step, index) => (
          <StepCard
            key={step.stepId || index}
            id={`step-${step.stepId}`}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => toggleStep(step.stepId)}
          >
            <StepHeader>
              <StepNumber>{index + 1}</StepNumber>
              <StepTitle>{step.title || `Step ${index + 1}`}</StepTitle>
            </StepHeader>

            <AnimatePresence>
              {openStep === step.stepId && (
                <StepContent
                  as={motion.div}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={e => e.stopPropagation()}
                >
                  <StepDescription>{step.description}</StepDescription>
                  {step.link && (
                    <StepLink
                      href={step.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open Guide Link
                    </StepLink>
                  )}
                  {step.image && (
                    <StepImage src={step.image} alt="Guide step" />
                  )}
                  <div style={{ marginTop: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <PlayButton aria-label="Open in GraphPolaris demo" onClick={() => handlePlay(step)} />
                    <button
                      style={{
                        cursor: 'pointer',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: '#007bff',
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                      onClick={e => {
                        e.stopPropagation();
                        openExpanded(index);
                      }}
                    >
                      View More
                    </button>
                  </div>
                </StepContent>
              )}
            </AnimatePresence>
          </StepCard>
        ))}
      </div>

      <AnimatePresence>
        {expandedIndex !== null && (
          <ModalOverlay onClose={closeExpanded}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              gap: '12px',
              userSelect: 'none',
              color: '#ccc',
              fontWeight: '600'
            }}>
              <ModalArrowButton
                aria-label="Previous Step"
                onClick={() => navigateStep(-1)}
                disabled={expandedIndex === 0}
                style={{
                  fontSize: '1.5rem',
                  opacity: expandedIndex === 0 ? 0.4 : 1,
                  cursor: expandedIndex === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                ‹
              </ModalArrowButton>

              <span>{expandedIndex + 1} / {steps.length}</span>

              <ModalArrowButton
                aria-label="Next Step"
                onClick={() => navigateStep(1)}
                disabled={expandedIndex === steps.length - 1}
                style={{
                  fontSize: '1.5rem',
                  opacity: expandedIndex === steps.length - 1 ? 0.4 : 1,
                  cursor: expandedIndex === steps.length - 1 ? 'not-allowed' : 'pointer'
                }}
              >
                ›
              </ModalArrowButton>
            </div>

            <h2 style={{ marginTop: 0 }}>{steps[expandedIndex].title}</h2>
            <p>{steps[expandedIndex].description}</p>
            {steps[expandedIndex].link && (
              <StepLink
                href={steps[expandedIndex].link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Guide Link
              </StepLink>
            )}
            {steps[expandedIndex].image && (
              <StepImage src={steps[expandedIndex].image} alt="Guide step" />
            )}

            <button
              onClick={closeExpanded}
              style={{
                marginTop: '20px',
                cursor: 'pointer',
                padding: '6px 12px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: '#dc3545',
                color: 'white',
                fontWeight: 'bold',
                display: 'block',
                marginLeft: 'auto',
              }}
            >
              Close
            </button>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </GuideContainer>
  );
};

export default Guide;
