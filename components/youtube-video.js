import React from 'react';

const YouTubeVideo = ({ videoId = "XZEjp2mP1U0" }) => {
  return (
    <div className="w-full mx-auto py-6 flex justify-center">
      <div className="w-full">
        <div className="relative aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default YouTubeVideo;