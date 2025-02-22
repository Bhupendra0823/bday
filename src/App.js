import { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import bgm from './assets/hbd-bgm.mp3';
import collage1 from './assets/1.jpeg';
import collage2 from './assets/5.jpeg';
import collage3 from './assets/3.jpeg';
import collage4 from './assets/4.jpeg';
import voucher from './assets/voucher.png';

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const nextSectionRef = useRef(null);
  const makeWishRef = useRef(null);
  const topSectionRef = useRef(null);
  const giftSectionRef = useRef(null);  // Reference for Gift section

  // const [giftRevealed, setGiftRevealed] = useState(false); // State for reveal

  const [dobInput, setDobInput] = useState(""); // State for input field
  const [giftRevealed, setGiftRevealed] = useState(false);
  const correctDOB = "2302"; // Expected DOB format
  const voucherCode = "https://www.amazon.in/g/gfsgbsbsdb54f?ref=gc_utyp"; // Your gift voucher code
  const [error, setError] = useState(""); // State for error message


  const handleRevealGift = () => {
    if (dobInput === correctDOB) {
      setGiftRevealed(true);
      setError(""); // Clear error if correct
    } else {
      setError("❌ Incorrect DOB! Try again.");
      setGiftRevealed(false);
    }
  };

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

      {/* Birthday Message Section */}
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
          <p>Wishing you a fantastic birthday filled with love, laughter, and endless joy! 🎉🎂</p>

          {/* Image Collage */}
          <div className="image-collage">
            <img src={collage1} alt="Collage 1" />
            <img src={collage2} alt="Collage 2" />
            <img src={collage3} alt="Collage 3" />
            <img src={collage4} alt="Collage 4" />
          </div>
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

        {/* Button to go to the Gift Section */}
        <button className="btn btn-warning" onClick={() => handleScroll(giftSectionRef)}>
          🎁 Go to Gift Section 🎁
        </button>
      </div>

      {/* 🎁 Gift Section */}
      <div ref={giftSectionRef} className="section gift-section">
        <div className="gift-box mb-4">
          <h2>🎁 Your Gift Awaits! 🎁</h2>
          <p>Gift is Locked with Your DOB 🎉</p>

          {/* Input Field */}
          <input
            type="number"
            className="gift-input"
            placeholder="DDMM"
            value={dobInput}
            onChange={(e) => setDobInput(e.target.value)}
          />

          {/* Reveal Button */}
          <button className="btn btn-danger mt-3" onClick={handleRevealGift}>
            🎊 Reveal Gift 🎊
          </button>

          {/* Error Message */}
          {error && <p className="error-message mt-2">{error}</p>}

          {/* Revealed Gift Message */}
          {giftRevealed && (
            <div className="gift-content">
              {/* Gift Image */}
              <img src={voucher} alt="Gift Voucher" className="voucher-image mb-3" />

              {/* Voucher Code */}
              <div className="voucher-box">
                🎉 <strong>
                  <a
                    href={voucherCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      navigator.clipboard.writeText(voucherCode);
                      alert("Voucher Code copied: " + voucherCode);
                    }}
                  >
                    {voucherCode}
                  </a>
                </strong> 🎊
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
