import React from 'react';
import styles from './VideoSection.module.css';

interface VideoSectionProps {
  title: string;
  description?: string;
  imageUrl: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  title,
  description,
  imageUrl
}) => {
  return (
    <div className={styles.videoSection}>
      <h2 className={styles.sectionTitle}>Conteúdo</h2>
      
      <div className={styles.videoCard}>
        <div className={styles.imageContainer}>
          <img src={imageUrl} alt={title} className={styles.image} />
        </div>
        
        <div className={styles.videoInfo}>
          <h3 className={styles.videoTitle}>{title}</h3>
          {description && (
            <p className={styles.videoDescription}>{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoSection;