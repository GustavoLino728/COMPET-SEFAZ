import React from 'react';
import styles from './TrackDetailHeader.module.css';

interface TrackDetailHeaderProps {
  title: string;
  description?: string;
  iconUrl?: string;
}

const TrackDetailHeader: React.FC<TrackDetailHeaderProps> = ({
  title,
  description,
  iconUrl
}) => {
  return (
    <div className={styles.headerContainer}>
      <button className={styles.backButton}>
        ←
      </button>
      
      <div className={styles.content}>
        <div className={styles.textContent}>
          <h1 className={styles.title}>{title}</h1>
          {description && (
            <p className={styles.description}>{description}</p>
          )}
        </div>
        
        {iconUrl && (
          <div className={styles.iconContainer}>
            <img src={iconUrl} alt="Track icon" className={styles.icon} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackDetailHeader;