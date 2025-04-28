import React from 'react';
import { HeroContainer, HeroBg, VideoBg, HeroContent, HeroH1, HeroP, HeroBtnWrapper, ArrowForward, ArrowRight } from './HeroElements';
import Video from '../../videos/video3.mp4';
import { Button } from '../ButtonElement';
import { useNavigate } from "react-router-dom";


const HeroSection = () => {
    const navigate = useNavigate();

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
        <HeroP>Start exploring Knowledge Graphs today</HeroP>
        <HeroBtnWrapper>
        <Button onClick={() => navigate("/explore")} onMouseEnter={onHover} onMouseLeave={onHover} primary="true" dark="true">Get started {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  )
}

export default HeroSection
