import React from 'react';
import styles from './VideoSection.module.css';

type VideoSectionProps = {
  videoUrl: string;
};

const VideoSection = ({ videoUrl }: VideoSectionProps) => {
  return (
    <div className={styles.videoContainer}>
      <video className={styles.videoPlayer} controls>
        <source src={videoUrl} type="video/mp4" />
        Seu navegador não suporta a tag de vídeo.
      </video>
    </div>
  );
};

export default VideoSection;