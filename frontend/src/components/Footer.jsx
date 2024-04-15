import React from 'react';
import { IconButton } from '@mui/material';
import { BsInstagram, BsLinkedin, BsDribbble } from 'react-icons/bs';
import { FaFacebookSquare } from 'react-icons/fa';
import logo from '../assets/logo.png';

export default function FooterCom() {
  return (
    <footer style={{ backgroundColor: '#2074d4', padding: '20px' }}>
      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex' }}>
          
          {/* Logo And University Name */}
          <div style={{ marginLeft: '40px', display: 'flex', flexDirection: 'column' }}>
            <img src={logo} alt="PHOENIX logo" style={{ width: '140px',marginLeft: '20px' }} />
            <span style={{ fontSize: '1.5rem', fontWeight: '600'}}>PHOENIX INSTITUTE</span>
          </div>

          {/* Links Section */}
          <div style={{ display: 'flex', gap: '60px', marginLeft: 'auto', marginTop:'30px' , color: '#ffffff' }}>
            <div>
              <h4>REFERENCES</h4>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li>Computing</li>
                <li style={{ marginTop: '0.5rem'}}>Engineering</li>
                <li style={{ marginTop: '0.5rem'}}>Business</li>
              </ul>
            </div>
            <div>
              <h4>SERVICES</h4>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li>Help Desk</li>
                <li style={{ marginTop: '0.5rem'}}>Student Service</li>
                <li style={{ marginTop: '0.5rem'}}>Vehicle Service</li>
              </ul>
            </div>
            <div>
              <h4>LEGAL</h4>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li>Privacy Policy</li>
                <li style={{ marginTop: '0.5rem'}}>Terms & Conditions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr style={{ borderTop: '1px solid #E5E7EB', width: '100%', marginTop: '20px' }} />

        {/* Copyright and Icons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '40px', marginTop: '20px' }}>
          {/* Copyright */}
          <p style={{ color: '#ffffff', margin: 0 }}>Designed and Developed By Avishka Rathnakumara. All Rights Reserved. &copy; {new Date().getFullYear()}</p>

          {/* Social Icons */}
          <div>
            <IconButton href="https://www.facebook.com/profile.php?id=100085722827700" target='_blank'>
              <FaFacebookSquare style={{ color: '#ffffff' }} />
            </IconButton>
            <IconButton href="https://www.instagram.com/avishka__rathnakumara__/" target='_blank'>
              <BsInstagram style={{ color: '#ffffff' }} />
            </IconButton>
            <IconButton href="https://www.linkedin.com/in/avishka-rathna/" target='_blank'>
              <BsLinkedin style={{ color: '#ffffff' }} />
            </IconButton>
            <IconButton href="https://avishka-rathnakumara.netlify.app/" target='_blank'>
              <BsDribbble style={{ color: '#ffffff' }} />
            </IconButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
