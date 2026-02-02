import React from 'react';
import type { ToastMessage } from '../../types/game';

interface ToastProps {
  toasts: ToastMessage[];
}

const Toast: React.FC<ToastProps> = ({ toasts }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="toast-item"
          style={
            {
              '--duration': `${toast.duration || 3000}ms`,
            } as React.CSSProperties
          }
        >
          <div className="toast-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className="toast-message">{toast.message}</div>
        </div>
      ))}
      <style>{`
        .toast-container {
          position: fixed;
          top: 30px;
          right: 30px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 12px;
          pointer-events: none;
        }

        .toast-item {
          background: rgba(10, 15, 30, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(100, 180, 255, 0.3);
          border-left: 5px solid #00d2ff;
          color: white;
          padding: 14px 24px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 14px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          min-width: 250px;
          
          /* Pop-in and Slide-out Unified Animation */
          animation: toast-lifecycle var(--duration) cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .toast-icon {
          width: 22px;
          height: 22px;
          color: #00d2ff;
          flex-shrink: 0;
          filter: drop-shadow(0 0 5px rgba(0, 210, 255, 0.5));
        }

        .toast-message {
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        @keyframes toast-lifecycle {
          /* Entry: 0% to 15% (Pop in with bounce) */
          0% { 
            transform: translateX(120%) scale(0.7); 
            opacity: 0; 
          }
          8% { 
            transform: translateX(-10%) scale(1.05); 
            opacity: 1; 
          }
          12% { 
            transform: translateX(0) scale(1); 
            opacity: 1; 
          }
          
          /* Stay: 12% to 88% */
          88% { 
            transform: translateX(0) scale(1); 
            opacity: 1; 
          }
          
          /* Exit: 88% to 100% (Smooth slide out) */
          100% { 
            transform: translateX(120%) scale(0.8); 
            opacity: 0; 
          }
        }
      `}</style>
    </div>
  );
};

export default Toast;
