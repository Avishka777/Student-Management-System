import React from 'react';
import { BsInstagram, BsLinkedin, BsDribbble } from 'react-icons/bs';
import { FaFacebookSquare } from "react-icons/fa";
import logo from '../assets/logo.png';
import { IconButton, Grid, Typography, Link, Divider } from '@mui/material';

export default function Footer() {
  return (
    <Grid container style={{ backgroundColor: '#2074d4', padding: '20px 0' }}>
      <Grid item xs={12} container justifyContent="space-between" alignItems="center">
        {/* Logo And University Name */}
        <Grid item>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="PHOENIX Logo" style={{ width: '140px', marginRight: '10px',marginLeft: '30px' }} />
            <Typography variant="h3" style={{ fontWeight: '700', color: '#ffffff' }}>PHOENIX INSTITUTE</Typography>
          </div>
        </Grid>

        {/* Links Section */}
        <Grid item>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" style={{ color: '#ffffff' }}>Reference</Typography>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Link href='#' style={{ color: '#ffffff' }}>Computing</Link>
                <Link href='#' style={{ color: '#ffffff' }}>Engineering</Link>
                <Link href='#' style={{ color: '#ffffff' }}>Business</Link>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" style={{ color: '#ffffff' }}>Services</Typography>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Link href='#' style={{ color: '#ffffff' }}>Help Desk</Link>
                <Link href='#' style={{ color: '#ffffff' }}>Student Service</Link>
                <Link href='#' style={{ color: '#ffffff' }}>Vehicle Service</Link>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" style={{ color: '#ffffff' }}>Legal</Typography>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Link href='#' style={{ color: '#ffffff' }}>Privacy Policy</Link>
                <Link href='#' style={{ color: '#ffffff' }}>Terms &amp; Conditions</Link>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Divider */}
      <Grid item xs={12} style={{ marginTop: '20px' }}>
        <Divider style={{ borderTop: '1px solid #E5E7EB' }} />
      </Grid>

      {/* Copyright and Icons */}
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', padding: '0 20px' }}>
        {/* Copyright */}
        <Typography variant="body2" style={{ color: '#ffffff' }}>
          Copyright Avishka Rathnakumara. All Rights Reserved.
        </Typography>

        {/* Social Icons */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
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
      </Grid>
    </Grid>
  );
}
