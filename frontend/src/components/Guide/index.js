// index.js
import React from 'react';
import { GuideContainer, GuideStep } from './GuideElements';

const Guide = ({ steps }) => {
  return (
    <GuideContainer>
      {steps && steps.length > 0 ? (
        steps.map((step, index) => (
          <GuideStep key={index}>
            <strong>Step {index + 1}:</strong> {step}
          </GuideStep>
        ))
      ) : (
        <GuideStep>No guide available.</GuideStep>
      )}
    </GuideContainer>
  );
};

export default Guide;
