import { useState, useRef, useEffect } from 'react';
import { FiCamera } from 'react-icons/fi';
import { tvStyles } from './styles/tvStyles';
import TVScreen from './components/TVScreen';
import TVControls from './components/TVControls';
import TVSpeaker from './components/TVSpeaker';

function App() {
  const videoRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPowered, setIsPowered] = useState(true);
  const [channel, setChannel] = useState(1);
  const [volume, setVolume] = useState(50);
  const [showVolumeIndicator, setShowVolumeIndicator] = useState(false);
  const volumeTimerRef = useRef(null);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = tvStyles;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();
  }, []);

  useEffect(() => {
    async function setupWebcam() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: 400,
            height: 300,
            facingMode: 'user' 
          } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermission(true);
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
        setHasPermission(false);
      } finally {
        setIsLoading(false);
      }
    }

    setupWebcam();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const handlePowerToggle = () => {
    setIsPowered(prev => !prev);
    if (videoRef.current) {
      if (isPowered) {
        videoRef.current.classList.remove('tv-turn-on');
        videoRef.current.classList.add('tv-turn-off');
      } else {
        videoRef.current.classList.remove('tv-turn-off');
        videoRef.current.classList.add('tv-turn-on');
      }
    }
  };

  const handleChannelChange = () => {
    setChannel(prev => (prev % 12) + 1);
    if (videoRef.current) {
      videoRef.current.style.filter = `
        brightness(1.2) 
        contrast(1.3) 
        saturate(1.2) 
        blur(0.4px)
        hue-rotate(${Math.random() * 360}deg)
      `;
    }
  };

  const handleVolumeChange = (delta) => {
    const newVolume = Math.min(100, Math.max(0, volume + delta));
    setVolume(newVolume);
    
    setShowVolumeIndicator(true);
    
    if (volumeTimerRef.current) {
      clearTimeout(volumeTimerRef.current);
    }
    
    volumeTimerRef.current = setTimeout(() => {
      setShowVolumeIndicator(false);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (volumeTimerRef.current) {
        clearTimeout(volumeTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-violet-50 flex items-center justify-center p-8">
      <div className="tv-container">
        <div className="relative flex flex-col gap-8">
          <TVScreen
            videoRef={videoRef}
            isLoading={isLoading}
            hasPermission={hasPermission}
            isPowered={isPowered}
            channel={channel}
          />
          
          {showVolumeIndicator && isPowered && (
            <div className="volume-indicator">
              <div className="volume-bar">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="volume-level"
                    style={{
                      opacity: i < (Math.round(volume) / 10) ? 1 : 0.2
                    }}
                  />
                ))}
              </div>
              <span className="volume-text">{Math.round(volume)}</span>
            </div>
          )}

          <div className="flex items-center justify-between px-8">
            <TVControls
              onChannelChange={handleChannelChange}
              onVolumeChange={handleVolumeChange}
              volume={volume}
            />
            <TVSpeaker />
          </div>
        </div>

        <div className="absolute bottom-4 right-8">
          <span className="text-sm text-gray-600 font-mono tracking-widest">REACTTV</span>
        </div>

        <button 
          className="power-button absolute top-6 right-8 w-3 h-3 rounded-full bg-red-500 
                     shadow-[0_0_5px_rgba(239,68,68,0.5)]"
          onClick={handlePowerToggle}
          title="Power"
          aria-label="Power toggle"
        />
      </div>
    </div>
  );
}

export default App;