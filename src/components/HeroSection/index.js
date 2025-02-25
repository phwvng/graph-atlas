import React from 'react';
import { HeroContainer, HeroBg, VideoBg, HeroContent, HeroH1, HeroP, HeroBtnWrapper, ArrowForward, ArrowRight } from './HeroElements';
import Video from '../../videos/video3.mp4';
import { Button } from '../ButtonElement';

const HeroSection = () => {
    const [hover, setHover] = React.useState(false);

    const onHover = () => {
        setHover(!hover);
    }

  return (
    <HeroContainer id="home">
      <HeroBg>
        <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
      </HeroBg>
      <HeroContent>
        <HeroH1>Knowledge Graph Exploration Made Easy</HeroH1>
        <HeroP>Sign up for a new account today to start exploring Knowledge Graphs</HeroP>
        <HeroBtnWrapper>
          <Button to="signup" onMouseEnter={onHover} onMouseLeave={onHover} primary="true" dark="true">Get started {hover ? <ArrowForward /> : <ArrowRight />}</Button>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  )
}

export default HeroSection
