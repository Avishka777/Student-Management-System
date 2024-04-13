//Added MUI

import React from 'react';
import { Footer } from 'flowbite-react';
import { BsInstagram, BsLinkedin , BsDribbble } from 'react-icons/bs';
import { FaSquareFacebook } from "react-icons/fa6";
import logo from '../assets/logo.png';
import { IconButton } from '@mui/material';

export default function FooterCom() {
  return (
    <Footer container style={{ backgroundColor: '#2074d4' }}>
      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex' }}>
          
          {/* Logo And University Name */}
          <div style={{ marginLeft: '40px' }}>
            <img src={logo} alt="PHOENIX Logo" style={{ marginLeft: 'auto', marginRight: 'auto', width:"140px" }} />
            <span style={{fontSize: '1.5rem', fontWeight: '600', color: '#ffffff' }}>PHOENIX INSTITUTE</span>
          </div>

          {/* Links Section */}
          <div style={{ display: 'flex',  gap: '40px', marginLeft: 'auto', marginTop:'30px' }}>
            <div>
              <Footer.Title title='Reference' style={{ color: '#ffffff' }}/>
              <Footer.LinkGroup col style={{ color: '#ffffff' }}>
                <Footer.Link href='#'>Computing</Footer.Link>
                <Footer.Link href='#'>Engineering</Footer.Link>
                <Footer.Link href='#'>Business</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Services' style={{ color: '#ffffff' }}/>
              <Footer.LinkGroup col style={{ color: '#ffffff' }}>
                <Footer.Link href='#'>Help Desk</Footer.Link>
                <Footer.Link href='#'>Student Service</Footer.Link>
                <Footer.Link href='#'>Vehicle Service</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Legal' style={{ color: '#ffffff' }}/>
              <Footer.LinkGroup col style={{ color: '#ffffff' }}>
                <Footer.Link href='#'>Privacy Policy</Footer.Link>
                <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr style={{ borderTop: '1px solid #E5E7EB', width: '100%', marginTop: '20px' }} />

        {/* Copyright and Icons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '40px', marginTop: '20px' }}>
          {/* Copyright */}
          <Footer.Copyright
            by="Copyright Avishka Rathnakumara. All Rights Reserved."
            year={new Date().getFullYear()}
            style={{ color: '#ffffff' }}
          />

          {/* Social Icons */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton href="https://www.facebook.com/profile.php?id=100085722827700" target='_blank'>
              <FaSquareFacebook />
            </IconButton>
            <IconButton href="https://www.instagram.com/avishka__rathnakumara__/" target='_blank'>
              <BsInstagram />
            </IconButton>
            <IconButton href="https://www.linkedin.com/in/avishka-rathna/" target='_blank'>
              <BsLinkedin  />
            </IconButton>
            <IconButton href="https://avishka-rathnakumara.netlify.app/" target='_blank'>
              <BsDribbble />
            </IconButton>
          </div>
        </div>
      </div>
    </Footer>
  );
}
