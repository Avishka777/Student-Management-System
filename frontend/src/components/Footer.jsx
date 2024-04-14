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
            <img src={logo} alt="PHOENIX Logo" style={{ width: '140px' }} />
            <span style={{ fontSize: '1.5rem', fontWeight: '600', color: '#ffffff' }}>PHOENIX INSTITUTE</span>
          </div>

          {/* Links Section */}
          <div style={{ display: 'flex', gap: '40px', marginLeft: 'auto', marginTop:'30px' }}>
            <div>
              <h4 style={{ color: '#ffffff' }}>Reference</h4>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li><a href='#' style={{ color: '#ffffff', textDecoration: 'none' }}>Computing</a></li>
                <li><a href='#' style={{ color: '#ffffff', textDecoration: 'none' }}>Engineering</a></li>
                <li><a href='#' style={{ color: '#ffffff', textDecoration: 'none' }}>Business</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: '#ffffff' }}>Services</h4>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li><a href='#' style={{ color: '#ffffff', textDecoration: 'none' }}>Help Desk</a></li>
                <li><a href='#' style={{ color: '#ffffff', textDecoration: 'none' }}>Student Service</a></li>
                <li><a href='#' style={{ color: '#ffffff', textDecoration: 'none' }}>Vehicle Service</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: '#ffffff' }}>Legal</h4>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li><a href='#' style={{ color: '#ffffff', textDecoration: 'none' }}>Privacy Policy</a></li>
                <li><a href='#' style={{ color: '#ffffff', textDecoration: 'none' }}>Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr style={{ borderTop: '1px solid #E5E7EB', width: '100%', marginTop: '20px' }} />

        {/* Copyright and Icons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '40px', marginTop: '20px' }}>
          {/* Copyright */}
          <p style={{ color: '#ffffff', margin: 0 }}>Copyright Avishka Rathnakumara. All Rights Reserved. &copy; {new Date().getFullYear()}</p>

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
