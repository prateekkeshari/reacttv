import { FiCamera } from 'react-icons/fi';
import PropTypes from 'prop-types';

const TVScreen = ({ videoRef, isLoading, hasPermission, isPowered, channel }) => {
  return (
    <div className="tv-screen-outer">
      <div className="tv-screen w-full aspect-[4/3] relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-4 border-gray-600 border-t-gray-400"></div>
          </div>
        )}

        {!hasPermission && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-white/60 flex flex-col items-center gap-2">
              <FiCamera className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-[10px] sm:text-xs font-mono">NO SIGNAL</span>
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`tv-video w-full h-full object-cover ${!isPowered ? 'tv-turn-off' : ''}`}
        />

        <div className="crt-effect" />
        <div className="crt-lines" />
        <div 
          className="tv-static" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.99' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
        
        <div className="channel-text text-xs sm:text-sm">CH {channel}</div>
      </div>
    </div>
  );
};

TVScreen.propTypes = {
  videoRef: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasPermission: PropTypes.bool.isRequired,
  isPowered: PropTypes.bool.isRequired,
  channel: PropTypes.number.isRequired,
};

export default TVScreen; 