import { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import bgm from './assets/hbd-bgm.mp3';

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const nextSectionRef = useRef(null);
  const makeWishRef = useRef(null);
  const topSectionRef = useRef(null); // Reference to top section

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(error => console.log("Autoplay blocked:", error));
      }
    };

    document.addEventListener("click", playAudio, { once: true });
    return () => document.removeEventListener("click", playAudio);
  }, []);

  const handleScroll = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app-container">
      {/* Background Music */}
      <audio ref={audioRef} loop>
        <source src={bgm} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Go to Top Button */}
      <button className="go-to-top" onClick={() => handleScroll(topSectionRef)}>
        🔝 Go to Top
      </button>

      {/* Birthday Message Section (Top Section) */}
      <div ref={topSectionRef} className="section content">
        <div className="message-box mb-4">
          <h3>🎉 Happy Birthday Sakshi 🎉</h3>
        </div>

        {!isPlaying && (
          <p className="instruction">🎶 Click anywhere to play the song! 🎤</p>
        )}

        <button className="btn btn-primary" onClick={() => handleScroll(nextSectionRef)}>
          Let's Continue ⬇️
        </button>
      </div>

      {/* Surprise Section */}
      <div ref={nextSectionRef} className="section next-section">
        <div className="surprise-box mb-4">
          <h2>🎁 Surprise Awaits!</h2>
          <p>Wishing you a fantastic birthday filled with love, laughter, and endless joy! 🎉🎂 May this special day bring you happiness, success, and beautiful memories to cherish forever. 🥳✨</p>
        </div>

        <button className="btn btn-success" onClick={() => handleScroll(makeWishRef)}>
          Click for Next 🌠
        </button>
      </div>

      {/* Make a Wish Section */}
      <div ref={makeWishRef} className="section make-wish-section">
        <div className="wish-box mb-4">
          <h2>🌠 Make a Wish!</h2>
          <p>Close your eyes, make a wish, and let the magic begin! ✨🎂</p>
        </div>
      </div>
    </div>
  );
}

export default App;
