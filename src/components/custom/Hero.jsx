import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Hero() {
  return (
    <div
      className="relative h-screen bg-cover bg-center flex flex-col items-center justify-center text-center px-4"
      style={{ backgroundImage: "url('/pexels-eclipse-chasers-716719984-26726469.jpg')" }}
    >
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <motion.h1
        className="font-extrabold text-4xl md:text-6xl text-white z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <span className="text-[#229bf1]">Discover, Plan and Travel Smart —</span><br />
        All with <span className="text-white font-black">One Click</span>
      </motion.h1>

      <motion.p
        className="text-gray-300 text-lg mt-4 mb-6 max-w-[600px] z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Your ultimate travel companion for seamless trip planning and unforgettable adventures.
      </motion.p>

      <motion.div
        className="z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Link to="/create-trip">
          <Button className="bg-white text-black px-6 py-3 rounded-full hover:bg-[#229bf1] hover:text-white transition">
            Get Started — It’s Free
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

export default Hero;
