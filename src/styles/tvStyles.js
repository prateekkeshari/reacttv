export const tvStyles = `
  .tv-container {
    position: relative;
    background: linear-gradient(to bottom, #d4d4d4, #bbb);
    padding: 40px;
    border-radius: 24px;
    box-shadow: 
      inset 0 2px 5px rgba(255,255,255,0.5),
      inset 0 -2px 5px rgba(0,0,0,0.3),
      0 5px 15px rgba(0,0,0,0.1);
    transform-style: preserve-3d;
    perspective: 1000px;
  }

  .tv-screen-outer {
    background: #111;
    padding: 20px;
    border-radius: 20px;
    box-shadow: inset 0 0 20px rgba(0,0,0,0.8);
  }

  .tv-screen {
    position: relative;
    overflow: hidden;
    border-radius: 100px;
    background: #000;
    box-shadow: 
      inset 0 0 50px rgba(0,0,0,1),
      0 0 0 2px #000,
      0 0 0 4px #333;
  }

  .crt-effect {
    position: absolute;
    inset: 0;
    background: 
      linear-gradient(
        rgba(255,255,255,0.1) 0%,
        rgba(255,255,255,0.05) 50%,
        rgba(0,0,0,0.05) 50%,
        rgba(0,0,0,0.1) 100%
      );
    background-size: 100% 4px;
    animation: scanline 8s linear infinite;
    pointer-events: none;
  }

  .crt-lines {
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(
      0deg,
      rgba(0,0,0,0) 0px,
      rgba(0,0,0,0.1) 1px,
      rgba(0,0,0,0) 2px
    );
    animation: lines 60s linear infinite;
    pointer-events: none;
  }

  .tv-video {
    filter: brightness(1.2) contrast(1.3) saturate(1.2) blur(0.4px);
    mix-blend-mode: screen;
  }

  .tv-static {
    position: absolute;
    inset: 0;
    opacity: 0.05;
    mix-blend-mode: overlay;
    pointer-events: none;
    animation: staticNoise 0.2s steps(4) infinite;
  }

  .tv-turn-off {
    animation: turnOff 0.4s ease-out forwards;
  }

  .tv-turn-on {
    animation: turnOn 0.4s ease-out forwards;
  }

  @keyframes turnOff {
    0% { transform: scale(1, 1); filter: brightness(1); }
    60% { transform: scale(1, 0.001); filter: brightness(0.8); }
    100% { transform: scale(0, 0); filter: brightness(0); }
  }

  @keyframes turnOn {
    0% { transform: scale(0, 0.001); filter: brightness(0); }
    60% { transform: scale(1, 0.001); filter: brightness(0.8) }
    100% { transform: scale(1, 1); filter: brightness(1); }
  }

  @keyframes staticNoise {
    0% { background-position: 0 0; }
    100% { background-position: 100% 100%; }
  }

  .tv-dial {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(45deg, #888, #eee);
    border: 4px solid #999;
    box-shadow: 
      inset 0 0 15px rgba(0,0,0,0.5),
      0 2px 4px rgba(0,0,0,0.2);
    position: relative;
    cursor: pointer;
    transform-origin: center center;
    transition: transform 0.3s cubic-bezier(0.4, 2, 0.7, 0.8);
    will-change: transform;
  }

  .tv-dial::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 16px;
    height: 16px;
    background: #666;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: inset 0 0 5px rgba(0,0,0,0.5);
  }

  .tv-dial::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 4px;
    height: 50%;
    background: #666;
    transform-origin: bottom center;
    transform: translate(-50%, -100%);
  }

  .tv-dial:active {
    transition: transform 0.1s cubic-bezier(0.4, 2, 0.7, 0.8);
  }

  .channel-text {
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(255,255,255,0.3);
    font-family: monospace;
    font-size: 12px;
    text-shadow: 0 0 2px rgba(255,255,255,0.5);
    pointer-events: none;
  }

  .power-button {
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .power-button:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(239,68,68,0.8);
  }

  .volume-indicator {
    position: absolute;
    top: 40px;
    right: 40px;
    display: flex;
    align-items: center;
    gap: 8px;
    z-index: 100;
    font-family: "Courier New", monospace;
    mix-blend-mode: screen;
    animation: fadeIn 0.2s ease-out;
  }

  .volume-bar {
    display: flex;
    gap: 2px;
  }

  .volume-level {
    width: 8px;
    height: 24px;
    background: #fff;
    box-shadow: 0 0 2px #fff;
    position: relative;
  }

  .volume-text {
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    text-shadow: 
      2px 2px 0 #000,
      -2px -2px 0 #000,
      2px -2px 0 #000,
      -2px 2px 0 #000;
    letter-spacing: 2px;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`; 