import React, { useRef, useEffect } from 'react';
import { Box, Button, Typography, Container, Card, CardContent, Grid, useTheme } from '@mui/material';
import Navbar from './components/Navbar';
import { motion } from 'framer-motion';

const ORDERS = [
  { id: 'XsSyZ2PN...5f5R7txe', description: 'Logitech StreamCam & HyperX Cloud II', price: '$209.98', date: '3/11/2024' },
  { id: 'CwSZ4xj4...cHMimWta', description: 'Razer Viper Mini & Keychron K2 Pro', price: '$129.98', date: '3/10/2024' },
  { id: 'uiesx5Wv...8ivp5KQn', description: 'SteelSeries Arctis 7 & WD 2TB SSD', price: '$309.98', date: '3/9/2024' },
  { id: 'JkL8z2Qw...9f8R2tXe', description: 'Apple AirPods Pro & Anker Charger', price: '$249.99', date: '3/8/2024' },
  { id: 'QwErTy12...UiOp34', description: 'Kindle Paperwhite & Case', price: '$159.99', date: '3/7/2024' },
  { id: 'ZxCvBnM1...2AsDfG3', description: 'Samsung T7 SSD & USB-C Hub', price: '$189.99', date: '3/6/2024' },
  { id: 'PlMkNjBh...VgCfXz', description: 'Logitech MX Master 3S & Desk Mat', price: '$139.98', date: '3/5/2024' },
  { id: 'RtYuIoP0...QwErTy', description: 'Sony WH-1000XM5 & Carrying Case', price: '$399.99', date: '3/4/2024' },
  { id: 'AsDfGhJk...LzXcVb', description: 'Nintendo Switch OLED & Zelda', price: '$359.99', date: '3/3/2024' },
  { id: 'QwErTyUi...OpAsDf', description: 'Fitbit Charge 6 & Extra Band', price: '$179.99', date: '3/2/2024' },
];

const PALETTE = {
  background: 'linear-gradient(135deg, #101624 0%, rgb(52, 75, 120) 100%)',
  card: '#232B3B',
  cardBorder: '#2D3952',
  accent: '#FF9900',
  accent2: '#FFC247',
  accent3: '#21D4FD',
  text: '#F3F6FA',
  textSecondary: '#AEB6C3',
  focus: '#FFD580',
};

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 60, damping: 18 } },
};

function RecentOrdersCarousel() {
  const carouselRef = useRef(null);
  const orders = [...ORDERS, ...ORDERS, ...ORDERS]; // triple for smoother infinite scroll

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    let frame;
    const scrollStep = () => {
      if (!carousel) return;
      // If at (almost) end, reset to start for seamless infinite loop
      if (carousel.scrollLeft >= carousel.scrollWidth - carousel.offsetWidth - 2) {
        carousel.scrollLeft = 0;
      }
      carousel.scrollLeft += 1.1;
      frame = requestAnimationFrame(scrollStep);
    };
    frame = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <nav aria-label="Recent orders" style={{ borderBottom: `1px solid ${PALETTE.cardBorder}` }}>
      <Box
        ref={carouselRef}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 2,
          py: 1.5,
          px: { xs: 1, md: 4 },
          alignItems: 'center',
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
          width: '100%',
          maxWidth: '100vw',
          minHeight: 0,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        className="hide-scrollbar"
        tabIndex={0}
        role="list"
        aria-label="Recent orders carousel"
      >
        {orders.map((order, idx) => (
          <motion.div
            key={order.id + '-' + idx}
            variants={fadeIn}
            whileHover={{ scale: 1.04, boxShadow: `0 2px 12px 0 ${PALETTE.accent3}33`, borderColor: PALETTE.accent3 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            style={{ minWidth: 210, maxWidth: 240, flex: '0 0 auto' }}
            tabIndex={0}
            aria-label={`Order ${order.description} for ${order.price} on ${order.date}`}
          >
            <Card
              sx={{
                bgcolor: PALETTE.card,
                color: PALETTE.text,
                borderRadius: 2,
                p: 1,
                border: `1px solid ${PALETTE.cardBorder}`,
                boxShadow: '0 1px 4px 0 rgba(16,22,36,0.10)',
                minHeight: 56,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                outline: 'none',
                transition: 'box-shadow 0.2s, border-color 0.2s',
                '&:focus': {
                  borderColor: PALETTE.focus,
                  boxShadow: `0 0 0 2px ${PALETTE.focus}`,
                },
              }}
              role="listitem"
              tabIndex={-1}
              aria-label={`Order ${order.description} for ${order.price} on ${order.date}`}
            >
              <CardContent sx={{ p: '8px !important', pb: '8px !important', '&:last-child': { pb: '8px' } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <Typography variant="subtitle2" sx={{ color: PALETTE.accent, fontFamily: 'monospace', fontSize: 13, mr: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 90 }}>
                    {order.id}
                  </Typography>
                  <Typography variant="caption" sx={{ color: PALETTE.textSecondary, fontSize: 12, ml: 1 }}>{order.date}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <Typography sx={{ fontSize: 14, color: PALETTE.text, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 110 }}>
                    {order.description}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: PALETTE.accent2, fontWeight: 700, fontSize: 15, ml: 1 }}>{order.price}</Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
    </nav>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card
      sx={{
        bgcolor: PALETTE.card,
        color: PALETTE.text,
        borderRadius: 3,
        p: 3,
        boxShadow: '0 4px 24px 0 rgba(16,22,36,0.18)',
        border: `1px solid ${PALETTE.cardBorder}`,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'box-shadow 0.2s, border-color 0.2s',
        '&:hover, &:focus-within': {
          boxShadow: `0 8px 32px 0 ${PALETTE.accent3}33`,
          borderColor: PALETTE.accent3,
        },
        outline: 'none',
      }}
      tabIndex={0}
      role="region"
      aria-label={title}
    >
      <Box sx={{ fontSize: 40, mb: 2, color: PALETTE.accent3 }} aria-hidden>
        {icon}
      </Box>
      <Typography variant="h6" fontWeight={700} gutterBottom>{title}</Typography>
      <Typography sx={{ color: PALETTE.textSecondary, fontSize: 16 }}>{description}</Typography>
    </Card>
  );
}

function FooterBanner() {
  return (
    <footer
      style={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        background: 'rgba(35,43,59,0.85)',
        backdropFilter: 'blur(8px)',
        borderTop: `1px solid ${PALETTE.cardBorder}`,
        boxShadow: '0 -2px 16px 0 rgba(16,22,36,0.12)',
        padding: '14px 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 32,
        flexWrap: 'wrap',
        fontSize: 16,
        color: PALETTE.textSecondary,
        zIndex: 1200,
        transition: 'background 0.2s',
      }}
      aria-label="Footer links"
    >
      <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" style={{ color: PALETTE.accent, textDecoration: 'none', fontWeight: 600, padding: '4px 12px', borderRadius: 6, transition: 'background 0.2s', display: 'inline-block' }}>Twitter</a>
      <a href="https://pump.fun/" target="_blank" rel="noopener noreferrer" style={{ color: PALETTE.textSecondary, textDecoration: 'none', fontWeight: 500, padding: '4px 12px', borderRadius: 6, transition: 'background 0.2s', display: 'inline-block' }}>pump.fun</a>
      <a href="#dex" style={{ color: PALETTE.textSecondary, textDecoration: 'none', fontWeight: 500, padding: '4px 12px', borderRadius: 6, transition: 'background 0.2s', display: 'inline-block' }}>DEX</a>
      <a href="#how-it-works" style={{ color: PALETTE.textSecondary, textDecoration: 'none', fontWeight: 500, padding: '4px 12px', borderRadius: 6, transition: 'background 0.2s', display: 'inline-block' }}>How it Works</a>
      <a href="#donate" style={{ color: PALETTE.accent2, textDecoration: 'none', fontWeight: 600, padding: '4px 12px', borderRadius: 6, transition: 'background 0.2s', display: 'inline-block' }}>Donate</a>
      <style>{`
        footer[aria-label='Footer links'] a:hover, footer[aria-label='Footer links'] a:focus {
          background: rgba(255,255,255,0.07);
          outline: none;
        }
      `}</style>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: PALETTE.background, color: PALETTE.text, pb: 8, position: 'relative' }}>
      <Navbar />
      <Box sx={{ mt: '72px' }}>
        <RecentOrdersCarousel />
        <Container
          maxWidth="xl"
          sx={{
            mt: { xs: 6, md: 10 },
            mb: { xs: 6, md: 10 },
            textAlign: 'center',
            minHeight: '70vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.18 } } }}>
            <motion.div variants={fadeIn} transition={{ delay: 0.1 }}>
              <Typography
                variant="h6"
                sx={{
                  color: PALETTE.textSecondary,
                  letterSpacing: 1,
                  fontWeight: 400,
                  fontSize: { xs: 18, md: 22 },
                  mt: { xs: 2, md: 4 },
                  mb: 0.5,
                  fontFamily: 'Inter, Roboto, Arial, sans-serif',
                  lineHeight: 1.2,
                }}
              >
                Welcome to
              </Typography>
            </motion.div>
            <motion.div variants={fadeIn} transition={{ delay: 0.5 }}>
              <Typography
                variant="h2"
                fontWeight={900}
                gutterBottom
                sx={{
                  color: PALETTE.text,
                  letterSpacing: 1,
                  fontSize: { xs: 32, md: 48 },
                  mt: 0,
                  fontFamily: 'Inter, Roboto, Arial, sans-serif',
                  lineHeight: 1.1,
                }}
              >
                Anonymous Shopping
              </Typography>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  lineHeight: 1.5,
                  color: PALETTE.textSecondary,
                  fontWeight: 400,
                  fontSize: { xs: 16, md: 20 },
                  maxWidth: 700,
                  mx: 'auto',
                  fontFamily: 'Inter, Roboto, Arial, sans-serif',
                }}
              >
                What if you could buy anything from Amazon using only crypto — no KYC, no accounts, fully anonymous.
              </Typography>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  fontWeight: 700,
                  borderRadius: 3,
                  px: 4,
                  fontSize: 20,
                  background: `linear-gradient(90deg, ${PALETTE.accent} 0%, ${PALETTE.accent2} 100%)`,
                  color: PALETTE.card,
                  boxShadow: '0 4px 16px 0 rgba(255,153,0,0.10)',
                  mb: 6,
                  transition: 'background 0.3s, color 0.3s',
                  '&:hover, &:focus': {
                    background: `linear-gradient(90deg, ${PALETTE.accent2} 0%, ${PALETTE.accent3} 100%)`,
                    color: PALETTE.text,
                  },
                  outline: 'none',
                }}
                href="/app"
                aria-label="Launch dApp"
              >
                Launch dApp
              </Button>
            </motion.div>
            <Grid
              container
              spacing={4}
              justifyContent="center"
              alignItems="stretch"
              sx={{ mb: 6, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}
              role="list"
              aria-label="Features"
            >
              <Grid item xs={12} sm={6} md={5}>
                <motion.div variants={fadeIn}>
                  <FeatureCard
                    icon="🛡️"
                    title="Anonymous Shopping"
                    description="Your identity and purchase history always remain confidential."
                  />
                </motion.div>
              </Grid>
              <Grid item xs={12} sm={6} md={5}>
                <motion.div variants={fadeIn}>
                  <FeatureCard
                    icon="💳"
                    title="Secure Payments"
                    description="Pay securely with Solana. Fast, reliable, and private transactions."
                  />
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
      <FooterBanner />
    </Box>
  );
} 