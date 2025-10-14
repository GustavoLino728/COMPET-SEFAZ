import React from 'react';
import { Badge } from '../../api';

interface BadgeCardProps {
  badge: Badge;
  isEarned?: boolean;
  onClick?: () => void;
}

const BadgeCard: React.FC<BadgeCardProps> = ({ badge, isEarned = false, onClick }) => {
  return (
    <div 
      style={{
        border: '2px solid #28a745',
        padding: '1rem',
        margin: '0.5rem',
        borderRadius: '8px',
        backgroundColor: '#f8fff9',
        textAlign: 'center',
        minHeight: '200px'
      }}
      onClick={onClick}
    >
      <h4 style={{ color: '#28a745', margin: '0 0 0.5rem 0' }}>
        🏆 {badge.name}
      </h4>
      
      <div style={{ margin: '1rem 0' }}>
        <img 
          src={badge.image_url} 
          alt={badge.name}
          style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%',
            border: '3px solid #28a745',
            display: 'block',
            margin: '0 auto'
          }}
          onLoad={() => console.log('✅ Imagem carregada:', badge.image_url)}
          onError={(e) => {
            console.log('❌ Erro ao carregar imagem:', badge.image_url);
            // Substituir por placeholder
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiNmZmQ3MDAiLz4KPHRleHQgeD0iNDAiIHk9IjQ1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSI+8J+PhjwvdGV4dD4KPC9zdmc+';
            target.style.backgroundColor = '#ffd700';
          }}
        />
      </div>
      
      <p style={{ fontSize: '0.9rem', color: '#666', margin: '0.5rem 0' }}>
        {badge.description}
      </p>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        fontSize: '0.8rem',
        color: '#007bff',
        fontWeight: 'bold'
      }}>
        <span>{badge.program}</span>
        <span>T{badge.trail_number}</span>
        <span>{badge.type}</span>
      </div>
      
      {isEarned && badge.earned_at && (
        <p style={{ 
          fontSize: '0.8rem', 
          color: '#28a745', 
          margin: '0.5rem 0 0 0',
          fontWeight: '500'
        }}>
          🎉 Conquistado em: {new Date(badge.earned_at).toLocaleDateString('pt-BR')}
        </p>
      )}
      
      {badge.score && (
        <p style={{ 
          fontSize: '0.8rem', 
          color: '#6c757d',
          margin: '0.25rem 0 0 0'
        }}>
          Score: {badge.score.toFixed(1)}%
        </p>
      )}
    </div>
  );
};

export default BadgeCard;