import React from 'react';

type Props = {
  color: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration: number;
  onClose: () => void;
};

function FeedbackToast({ color, message, duration, onClose }: Props) {
  return <div>FeedbackToast</div>;
}

export default FeedbackToast;
