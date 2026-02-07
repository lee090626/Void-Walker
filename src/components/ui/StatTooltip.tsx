import React, { useState, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import type { StatBreakdown } from '../../utils/statCalculator';

const TooltipContainer = styled.div`
  display: inline-block;
`;

const InfoIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(255, 215, 0, 0.2);
  border: 1px solid rgba(255, 215, 0, 0.4);
  color: #ffd700;
  font-size: 0.75rem;
  font-weight: bold;
  margin-left: 6px;
  cursor: help;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 215, 0, 0.3);
    border-color: rgba(255, 215, 0, 0.6);
    transform: scale(1.1);
  }
`;

const Tooltip = styled.div<{
  visible: boolean;
  top: number;
  left: number;
  placement: 'top' | 'bottom';
}>`
  position: fixed;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  transform: ${(props) =>
    props.placement === 'top'
      ? 'translate(-50%, -100%)'
      : 'translate(-50%, 0)'};
  background: linear-gradient(
    135deg,
    rgba(20, 20, 20, 0.98),
    rgba(30, 30, 30, 0.98)
  );
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 8px;
  padding: 12px;
  min-width: 240px;
  max-width: 320px;
  width: max-content;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.8);
  z-index: 10000;
  pointer-events: none;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  transition:
    opacity 0.2s ease,
    visibility 0.2s ease;
  white-space: normal;
  word-break: keep-all;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;

    ${(props) =>
      props.placement === 'top'
        ? `
      top: 100%;
      border-top-color: rgba(255, 215, 0, 0.3);
    `
        : `
      bottom: 100%;
      border-bottom-color: rgba(255, 215, 0, 0.3);
    `}
  }
`;

const TooltipTitle = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
  white-space: normal;
`;

const StatSection = styled.div`
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const StatRow = styled.div<{ highlight?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  font-size: 0.85rem;
  color: ${(props) => (props.highlight ? '#ffd700' : '#ddd')};
  font-weight: ${(props) => (props.highlight ? 'bold' : 'normal')};
  gap: 12px;
`;

const StatLabel = styled.span<{ color?: string; indent?: boolean }>`
  color: ${(props) => props.color || '#ddd'};
  padding-left: ${(props) => (props.indent ? '12px' : '0')};
  font-size: 0.8rem;
  flex: 1;
  min-width: 0;
`;

const StatValue = styled.span<{ color?: string }>`
  color: ${(props) => props.color || '#fff'};
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 6px 0;
`;

interface StatTooltipProps {
  statName: string;
  breakdown: StatBreakdown;
  includePercentage?: boolean;
}

const StatTooltip: React.FC<StatTooltipProps> = ({
  statName,
  breakdown,
  includePercentage = false,
}) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [placement, setPlacement] = useState<'top' | 'bottom'>('top');
  const anchorRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (visible && anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      const tooltipHeight = tooltipRef.current?.offsetHeight || 200; // Fallback height

      // Check if there is enough space at the top
      const hasSpaceAtTop = rect.top - tooltipHeight - 10 > 0;

      if (!hasSpaceAtTop) {
        setPlacement('bottom');
        setCoords({
          top: rect.bottom + 8,
          left: rect.left + rect.width / 2,
        });
      } else {
        setPlacement('top');
        setCoords({
          top: rect.top - 8,
          left: rect.left + rect.width / 2,
        });
      }
    }
  }, [visible]);

  const hasEquipment = breakdown.equipment.total > 0;
  const hasSkills = breakdown.skills.total > 0;

  const tooltipContent = (
    <Tooltip
      ref={tooltipRef}
      visible={visible}
      top={coords.top}
      left={coords.left}
      placement={placement}
    >
      <TooltipTitle>
        {statName} {'Details'}
      </TooltipTitle>

      <StatSection>
        <StatRow>
          <StatLabel color="#fff">{'Base'}</StatLabel>
          <StatValue color="#fff">{breakdown.base}</StatValue>
        </StatRow>
      </StatSection>

      {hasEquipment && (
        <>
          <Divider />
          <StatSection>
            <StatRow>
              <StatLabel color="#ffa500">
                {'Equipment'}
              </StatLabel>
              <StatValue color="#ffa500">
                +{breakdown.equipment.total}
              </StatValue>
            </StatRow>
            <StatLabel indent color="#ffa500">
              {'Weapon'}
            </StatLabel>
            <StatValue color="#ffa500">+{breakdown.equipment.weapon}</StatValue>
            {breakdown.equipment.armor > 0 && (
              <StatRow>
                <StatLabel indent color="#ffa500">
                  {'Armor'}
                </StatLabel>
                <StatValue color="#ffa500">
                  +{breakdown.equipment.armor}
                </StatValue>
              </StatRow>
            )}
            {breakdown.equipment.helmet > 0 && (
              <StatRow>
                <StatLabel indent color="#ffa500">
                  {'Helmet'}
                </StatLabel>
                <StatValue color="#ffa500">
                  +{breakdown.equipment.helmet}
                </StatValue>
              </StatRow>
            )}
          </StatSection>
        </>
      )}

      {hasSkills && (
        <>
          <Divider />
          <Divider />
          <StatSection>
            <StatRow>
              <StatLabel color="#4af">{'Skills'}</StatLabel>
              <StatValue color="#4af">+{breakdown.skills.total}</StatValue>
            </StatRow>
            {Object.entries(breakdown.skills).map(([skillName, value]) => {
              if (skillName === 'total' || value === 0) return null;
              return (
                <StatRow key={skillName}>
                  <StatLabel indent color="#4af">
                    {skillName}
                  </StatLabel>
                  <StatValue color="#4af">+{value}</StatValue>
                </StatRow>
              );
            })}
          </StatSection>
        </>
      )}

      <Divider />
      <StatRow highlight>
        <StatLabel color="#ffd700">{'Total'}</StatLabel>
        <StatValue color="#ffd700">{breakdown.total}</StatValue>
      </StatRow>

      {includePercentage && breakdown.base > 0 && (
        <StatRow>
          <StatLabel color="#888">{'Increase Rate'}</StatLabel>
          <StatValue color="#888">
            +
            {Math.round(
              ((breakdown.total - breakdown.base) / breakdown.base) * 100,
            )}
            %
          </StatValue>
        </StatRow>
      )}
    </Tooltip>
  );

  return (
    <TooltipContainer
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <InfoIcon ref={anchorRef}>ⓘ</InfoIcon>
      {createPortal(tooltipContent, document.body)}
    </TooltipContainer>
  );
};

export default StatTooltip;
