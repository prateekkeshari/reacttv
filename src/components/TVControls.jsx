import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';

const TVControls = ({ onChannelChange, onVolumeChange, volume }) => {
  const [isDragging, setIsDragging] = useState(false);
  const startAngleRef = useRef(0);
  const startVolumeRef = useRef(0);
  const volumeDialRef = useRef(null);
  const [channelRotation, setChannelRotation] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !volumeDialRef.current) return;

      const dial = volumeDialRef.current.getBoundingClientRect();
      const dialCenterX = dial.left + dial.width / 2;
      const dialCenterY = dial.top + dial.height / 2;

      const angle = Math.atan2(
        e.clientY - dialCenterY,
        e.clientX - dialCenterX
      ) * (180 / Math.PI);

      const angleDiff = angle - startAngleRef.current;
      const volumeDiff = (angleDiff / 270) * 100;
      const newVolume = Math.round(Math.min(100, Math.max(0, startVolumeRef.current + volumeDiff)));
      
      if (newVolume !== volume) {
        onVolumeChange(newVolume - volume);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onVolumeChange, volume]);

  const handleVolumeMouseDown = (e) => {
    e.preventDefault();
    if (!volumeDialRef.current) return;

    const dial = volumeDialRef.current.getBoundingClientRect();
    const dialCenterX = dial.left + dial.width / 2;
    const dialCenterY = dial.top + dial.height / 2;

    startAngleRef.current = Math.atan2(
      e.clientY - dialCenterY,
      e.clientX - dialCenterX
    ) * (180 / Math.PI);

    startVolumeRef.current = volume;
    setIsDragging(true);
  };

  const handleChannelClick = () => {
    setChannelRotation(prev => prev + (Math.random() * 30 - 15));
    onChannelChange();
  };

  return (
    <div className="flex gap-6 items-center">
      <button 
        className="tv-dial" 
        onClick={handleChannelClick}
        title="Channel"
        aria-label="Change channel"
        style={{
          transform: `rotate(${channelRotation}deg)`
        }}
      >
        <span className="channel-text">CH</span>
      </button>
      <button 
        ref={volumeDialRef}
        className="tv-dial"
        onMouseDown={handleVolumeMouseDown}
        title={`Volume: ${Math.round(volume)}%`}
        aria-label="Adjust volume"
        style={{
          transform: `rotate(${(volume / 100) * 270 - 135}deg)`
        }}
      >
        <span className="channel-text">VOL</span>
      </button>
    </div>
  );
};

TVControls.propTypes = {
  onChannelChange: PropTypes.func.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired,
};

export default TVControls; 