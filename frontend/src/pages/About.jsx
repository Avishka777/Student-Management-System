import { Typography, Box, Grid, Paper, Divider } from '@mui/material';
import logo from '../assets/logo.png';
import mission from '../assets/mission.jpg';
import obj from '../assets/objective.jpg';

export default function About() {
  return (
    <div>
      {/* Top Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '10rem', marginBottom: '40px', paddingLeft: '10rem', paddingRight: '10rem', margin: 'auto' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', margin: 'auto' }}>
          <img src={logo} alt="Stark Logo" style={{ height: '100px', width: '100px', borderRadius: '8px'}} />
          <Typography variant="h2" sx={{ color: '#2D3B48', textTransform: 'uppercase', margin: 'auto', fontFamily: 'serif' }}>The Future...</Typography>
        </Box>
        <Divider />
        <Typography variant="body1" sx={{ color: '#6B7280' , marginY:'1rem'}}>
          The PHONENIX INSTITUTE was founded in 1999 and is a University Grants Commission (UGC) recognized Institute that stands today as a symbol of excellence in private 
          tertiary education. Welcome to Phoenix Institute, a leading institution dedicated to fostering excellence in education and innovation. At Phoenix, we believe in 
          empowering students with knowledge and skills that prepare them for the challenges of the modern world. With a dynamic curriculum designed to meet the evolving 
          needs of industries and society, we offer a diverse range of programs across various disciplines, including technology, business, arts, and sciences. Our experienced 
          faculty members are committed to providing personalized guidance and support to help students realize their full potential. Through state-of-the-art facilities and 
          interactive learning experiences, we strive to create a vibrant learning community where creativity thrives and ideas flourish. Join us at Phoenix Institute and embark 
          on a journey of discovery, growth, and success.
        </Typography>
      </Box>

      {/* Mission Section */}
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem', marginBottom: '1rem', paddingLeft: '10rem', paddingRight: '10rem', margin: 'auto' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3}>
              <img src={mission} alt="Our Mission" style={{ width: '100%', borderRadius: '8px' }} />
              <Box sx={{ padding: '20px' }}>
                <Typography variant="h5" sx={{ color: '#2D3B48', textTransform: 'uppercase', marginY: '20px' }}>Our Mission...</Typography>
                <Typography variant="body1" sx={{ color: '#6B7280' }}>To foster academic excellence, inspire innovation, and cultivate lifelong learning within a diverse and inclusive community.</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Objective Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3}>
              <img src={obj} alt="Our Objectives" style={{ width: '100%', borderRadius: '8px' }} />
              <Box sx={{ padding: '20px' }}>
                <Typography variant="h5" sx={{ color: '#2D3B48', textTransform: 'uppercase', marginY: '20px' }}>Our Objectives...</Typography>
                <Typography variant="body1" sx={{ color: '#6B7280' }}>To provide quality education, promote research and scholarship, and empower students to thrive in a global society.</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </div>

    </div>
  );
}
