const TVSpeaker = () => {
  return (
    <div className="tv-speaker w-[180px] h-[80px]">
      <div className="grid grid-cols-8 gap-2 h-full">
        {[...Array(24)].map((_, i) => (
          <div key={i} className="bg-black rounded-full" />
        ))}
      </div>
    </div>
  );
};

export default TVSpeaker; 