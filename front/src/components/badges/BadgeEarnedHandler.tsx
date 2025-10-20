import React, { useState, useEffect } from 'react';
import BadgeDisplay, { Badge } from './BadgeDisplay';
import BadgeToast from './BadgeToast';

interface BadgeEarnedHandlerProps {
  badge: Badge | null;
  autoShowDelay?: number;
  autoHideDelay?: number;
}

const BadgeEarnedHandler: React.FC<BadgeEarnedHandlerProps> = ({
  badge,
  autoShowDelay = 1000,
  autoHideDelay = 8000,
}) => {
  const [showToast, setShowToast] = useState(false);
  const [showBadgeSection, setShowBadgeSection] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!badge) return;

    setShowToast(true);

    const showTimer = setTimeout(() => {
      setShowBadgeSection(true);
    }, autoShowDelay);

    const hideTimer = setTimeout(() => {
      handleCloseToast();
    }, autoHideDelay);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [badge]);

  const handleCloseToast = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowToast(false);
      setIsClosing(false);
    }, 400);
  };

  if (!badge) return null;

  return (
    <>
      <BadgeToast
        badge={badge}
        isVisible={showToast}
        isClosing={isClosing}
        onClose={handleCloseToast}
      />
      <BadgeDisplay badge={badge} isVisible={showBadgeSection} />
    </>
  );
};

export default BadgeEarnedHandler;