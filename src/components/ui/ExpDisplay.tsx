import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const slideUp = keyframes`
  0% { transform: translateY(15px); opacity: 0; }
  3% { transform: translateY(0); opacity: 1; }
  90% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-15px); opacity: 0; }
`;

const Container = styled.div`
  position: absolute;
  bottom: 120px;
  right: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  pointer-events: none;
  z-index: 100;
`;

const ExpItem = styled.div`
  background: rgba(0, 0, 0, 0.7);
  border-left: 4px solid #4caf50;
  padding: 8px 16px;
  border-radius: 4px;
  color: #4caf50;
  font-family: 'Outfit', sans-serif;
  font-weight: bold;
  font-size: 1.1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  animation: ${slideUp} 2s ease-out forwards;
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    color: #fff;
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

interface ExpInfo {
  id: string;
  amount: number;
}

interface ExpDisplayProps {
  lastExpGain?: { amount: number; timestamp: number };
}

const ExpDisplay: React.FC<ExpDisplayProps> = ({ lastExpGain }) => {
  const [gains, setGains] = useState<ExpInfo[]>([]);

  // useEffect for receiving custom events
  useEffect(() => {
    const handleExpGained = (event: Event) => {
      const customEvent = event as CustomEvent<{
        amount: number;
        timestamp: number;
      }>;
      const { amount, timestamp } = customEvent.detail;
      // Enhance unique ID generation even further to avoid duplicates
      const uniqueId = `${timestamp}-${Math.random()}-${Date.now()}-${Math.random()}`;
      const newGain = {
        id: uniqueId,
        amount: amount,
      };

      setGains((prev) => {
        // Show all experience gains without duplicate filtering
        return [...prev, newGain];
      });

      // Remove after 2 seconds
      const timer = setTimeout(() => {
        setGains((prev) => prev.filter((g) => g.id !== uniqueId));
      }, 2000);

      return () => clearTimeout(timer);
    };

    window.addEventListener('exp-gained', handleExpGained);
    return () => {
      window.removeEventListener('exp-gained', handleExpGained);
    };
  }, []);

  // Maintain backward compatibility with lastExpGain prop (fallback)
  useLayoutEffect(() => {
    if (lastExpGain && lastExpGain.amount > 0) {
      const uniqueId = `${lastExpGain.timestamp}-${Math.random()}`;
      const newGain = {
        id: uniqueId,
        amount: lastExpGain.amount,
      };

      setGains((prev) => {
        const hasDuplicate = prev.some((g) =>
          g.id.startsWith(lastExpGain.timestamp.toString()),
        );
        if (hasDuplicate) return prev;

        return [...prev, newGain];
      });

      const timer = setTimeout(() => {
        setGains((prev) => prev.filter((g) => g.id !== uniqueId));
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [lastExpGain]);

  return (
    <Container>
      {gains.map((gain) => (
        <ExpItem key={gain.id}>
          +{gain.amount} <span>EXP</span>
        </ExpItem>
      ))}
    </Container>
  );
};

export default ExpDisplay;
