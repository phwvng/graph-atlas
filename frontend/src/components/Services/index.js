import React from 'react';
import Icon1 from '../../images/svg-1.svg';
import Icon2 from '../../images/img-3.jpg';
import Icon3 from '../../images/img-2.jpg';
import { ServicesContainer, ServicesH1, ServicesWrapper, ServicesCard, ServicesIcon, ServicesH2, ServicesP } from './ServicesElements';

const Services = () => {
  return (
    <ServicesContainer id="features">
        <ServicesH1>Our features</ServicesH1>
        <ServicesWrapper>
            <ServicesCard>
            <ServicesIcon src={Icon1} />
            <ServicesH2>What you get</ServicesH2>
            <ServicesP>We help reduce your fees and increase your overall revenue.</ServicesP>
            </ServicesCard>
            <ServicesCard>
            <ServicesIcon src={Icon2} />
            <ServicesH2>Key Features</ServicesH2>
            <ServicesP>You can access our platform online anywhere in the world.</ServicesP>
            </ServicesCard>
            <ServicesCard>
            <ServicesIcon src={Icon3} />
            <ServicesH2>Why GraphAtlas?</ServicesH2>
            <ServicesP>Unlock our special membership card that returns 5% cash back.</ServicesP>
            </ServicesCard>
        </ServicesWrapper>
      
    </ServicesContainer>
  )
}

export default Services
