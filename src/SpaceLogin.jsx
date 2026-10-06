import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Pointer } from 'lucide-react';
import './SpaceLogin.css'; 

const SpaceLogin = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);


  const stars = useMemo(() => {

    const colors = ['#60A5FA', '#A855F7', '#EC4899', '#FDE047', '#FFFFFF'];
    
    return Array.from({ length: 200 }).map((_, i) => {
      const radius = Math.random() * 140; 
      const angle = Math.random() * Math.PI * 2;
      const spiralOffset = radius * 0.05; 
      const finalAngle = angle + spiralOffset;

      return {
        id: i,
        x: Math.cos(finalAngle) * radius,
        y: Math.sin(finalAngle) * radius,
        size: Math.random() * 2.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.7 + 0.3,
      };
    });
  }, []);

  return (
    <div className="space-container">
      
      <div className="header-text">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <h2>Pendaftaran Penjelajah</h2>
              <p>Sentuh rasi bintang untuk pendaftaran...</p>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2>Selamat Datang, Penjelajah!</h2>
              <p>Masuk sekarang.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="galaxy-wrapper">
        

        <motion.div
          animate={{
            x: isUnlocked ? -160 : 0,
            scale: isUnlocked ? 0.85 : 1, 
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          style={{ position: 'absolute', zIndex: 10 }}
          onClick={() => setIsUnlocked(true)}
        >
          <div className="galaxy-core">
            

            <div className="glow-center glow-purple"></div>
            <div className="glow-center glow-white"></div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              style={{ width: '100%', height: '100%', position: 'relative' }}
            >
              {stars.map((star) => (
                <motion.div
                  key={star.id}
                  className="star"
                  style={{
                    width: star.size,
                    height: star.size,
                    backgroundColor: star.color,
                    boxShadow: `0 0 8px ${star.color}`,
                    left: `calc(50% + ${star.x}px)`,
                    top: `calc(50% + ${star.y}px)`,
                    opacity: star.opacity,
                  }}
                  animate={{
                    opacity: [star.opacity, star.opacity * 0.3, star.opacity],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: Math.random() * 3 + 2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </div>

          <AnimatePresence>
            {!isUnlocked && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ position: 'absolute', bottom: '-40px', left: '50%', transform: 'translateX(-50%)' }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Pointer color="#a0aec0" size={32} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Formulir Login (Muncul setelah klik) */}
        <AnimatePresence>
          {isUnlocked && (
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 140, scale: 1 }} // Posisi form di sebelah kanan
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 60, damping: 20 }}
              className="login-form-box"
            >
              <form onSubmit={(e) => e.preventDefault()}>
                
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Nama Pengguna"
                    className="space-input"
                    required
                  />
                  <User className="input-icon" />
                </div>

                <div className="input-group">
                  <input
                    type="password"
                    placeholder="Kata Sandi"
                    className="space-input"
                    required
                  />
                  <Lock className="input-icon" />
                </div>

                <button type="submit" className="submit-btn">
                  MASUK
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default SpaceLogin;