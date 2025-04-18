import React from 'react'
import { FooterContainer, FooterWrap, FooterLinksContainer, FooterLinksWrapper, FooterLinkItems, FooterLinkTitle, FooterLink } from './FooterElements'

const Footer = () => {
  return (
    <FooterContainer>
        <FooterWrap>
            <FooterLinksContainer>
                <FooterLinksWrapper>
                <FooterLinkItems>
                    <FooterLinkTitle>About Us</FooterLinkTitle>
                    <FooterLink to='/sign-up'>How it works</FooterLink>
                    <FooterLink to='/'>Testimonials</FooterLink>
                    <FooterLink to='/'>Careers</FooterLink>
                    <FooterLink to='/'>Investors</FooterLink>
                    <FooterLink to='/'>Terms of Service</FooterLink>
                </FooterLinkItems>
                <FooterLinkItems>
                    <FooterLinkTitle>Contact Us</FooterLinkTitle>
                    <FooterLink to='/'>Contact</FooterLink>
                    <FooterLink to='/'>Support</FooterLink>
                    <FooterLink to='/'>Destinations</FooterLink>
                    <FooterLink to='/'>Sponsorships</FooterLink>
                </FooterLinkItems>
                
                <FooterLinkItems>
                    <FooterLinkTitle>Videos</FooterLinkTitle>
                    <FooterLink to='/'>Submit Video</FooterLink>
                    <FooterLink to='/'>Ambassadors</FooterLink>
                    <FooterLink to='/'>Agency</FooterLink>
                    <FooterLink to='/'>Influencer</FooterLink>
                </FooterLinkItems>
                <FooterLinkItems>
                    <FooterLinkTitle>Social Media</FooterLinkTitle>
                    <FooterLink to='/'>Instagram</FooterLink>
                    <FooterLink to='/'>Facebook</FooterLink>
                    <FooterLink to='/'>Youtube</FooterLink>
                    <FooterLink to='/'>Twitter</FooterLink>
                </FooterLinkItems>
                </FooterLinksWrapper>
            </FooterLinksContainer>
        </FooterWrap>

    </FooterContainer>
  )
}

export default Footer
