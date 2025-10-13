import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TrailCard.module.css';

type TrailCardProps = {
  link: string;
  imageSrc: string;
  title: string;
  description?: string; 
}

const TrailCard = ({ link, imageSrc, title, description }: TrailCardProps) => {
  return (
    <Link to={link} className={styles.trailCardLink}>
      <div className={styles.trailCard}>
        <img src={imageSrc} alt={title} className={styles.trailImage} />
        <h4 className={styles.trailTitle}>{title}</h4>
        {description && <p className={styles.trailDescription}>{description}</p>}

      </div>
    </Link>
  );
};

export default TrailCard;