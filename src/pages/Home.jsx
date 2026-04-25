import { motion } from "framer-motion";
import { useState } from "react";
import Faaah from '../assets/sounds/faaah.mp3'
import Babu from '../assets/gif/bubu.gif'

const Home = () => {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(true);

    const audio = new Audio(Faaah);
    audio.play();
  };

  return (
    <div className="flex items-center justify-center text-black py-15">
      <div className="text-center space-y-6">
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold"
        >
          🚧 Coming Soon 🚧
        </motion.h1>

        <img
          src={Babu}
          alt="funny loading"
          className="mx-auto w-64"
          transition={{ repeat: Infinity, duration: 2 }}
        />

        <p className="text-xl font-pop">
          We're cooking something awesome 🍳... please don't press the button 😅
        </p>
        <button
          onClick={handleClick}
          className="px-6 py-3 bg-primary text-white font-pop text-sm rounded-md font-semibold shadow-md hover:scale-105 transition"
        >
          Don't Click Me 👀
        </button>

        {clicked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl mt-1"
          >
            😑 Bro... I said DON'T click.
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Home
