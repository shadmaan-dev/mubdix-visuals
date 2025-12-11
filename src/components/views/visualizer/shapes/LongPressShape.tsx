"use client";

import React, { useRef, useEffect } from "react";
import type Konva from "konva";

type KPEvent = Konva.KonvaEventObject<Event>;
type ShapeElement = React.ReactElement<any, string | React.JSXElementConstructor<any>>;

export type LongPressShapeProps = {
  children: ShapeElement;
  onClick?: (e: KPEvent) => void;
  onLongPress?: (e: KPEvent) => void;
  longPressDelay?: number;
  moveThreshold?: number;
};

export default function LongPressShape({
  children,
  onClick,
  onLongPress,
  longPressDelay = 600,
  moveThreshold = 8,
}: LongPressShapeProps) {
  const timerRef = useRef<number | null>(null);
  const longPressedRef = useRef(false);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const cancelTimer = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = (e: KPEvent) => {
    cancelTimer();
    longPressedRef.current = false;

    try {
      const stage = (e.target as any).getStage?.();
      const pos = stage?.getPointerPosition?.();
      startPosRef.current = pos ?? null;
    } catch {
      startPosRef.current = null;
    }

    timerRef.current = window.setTimeout(() => {
      longPressedRef.current = true;
      timerRef.current = null;
      onLongPress?.(e);
    }, longPressDelay) as unknown as number;
  };

  const onUp = (e: KPEvent) => {
    cancelTimer();
    startPosRef.current = null;
  };

  const onMove = (e: KPEvent) => {
    if (!startPosRef.current || !timerRef.current) return;
    try {
      const stage = (e.target as any).getStage?.();
      const pos = stage?.getPointerPosition?.();
      if (!pos) return;
      const dx = pos.x - (startPosRef.current.x ?? 0);
      const dy = pos.y - (startPosRef.current.y ?? 0);
      const distSq = dx * dx + dy * dy;
      if (distSq > moveThreshold * moveThreshold) cancelTimer();
    } catch { }
  };

  const handleClick = (e: KPEvent, childOnClick?: (ev: KPEvent) => void) => {
    if (longPressedRef.current) {
      longPressedRef.current = false;
      return;
    }
    onClick?.(e);
    if (childOnClick) childOnClick(e);
  };

  const handleDragStart = (e: KPEvent, childOnDragStart?: (ev: KPEvent) => void) => {
    cancelTimer();
    if (childOnDragStart) childOnDragStart(e);
  };

  if (!React.isValidElement(children)) {
    return null;
  }

  const childProps: any = children.props ?? {};

  const mergedProps = {
    onMouseDown: (e: KPEvent) => {
      startTimer(e);
      if (childProps.onMouseDown) childProps.onMouseDown(e);
    },
    onTouchStart: (e: KPEvent) => {
      startTimer(e);
      if (childProps.onTouchStart) childProps.onTouchStart(e);
    },

    onMouseUp: (e: KPEvent) => {
      onUp(e);
      if (childProps.onMouseUp) childProps.onMouseUp(e);
    },
    onTouchEnd: (e: KPEvent) => {
      onUp(e);
      if (childProps.onTouchEnd) childProps.onTouchEnd(e);
    },

    onMouseMove: (e: KPEvent) => {
      onMove(e);
      if (childProps.onMouseMove) childProps.onMouseMove(e);
    },
    onTouchMove: (e: KPEvent) => {
      onMove(e);
      if (childProps.onTouchMove) childProps.onTouchMove(e);
    },

    onDragStart: (e: KPEvent) => {
      handleDragStart(e, childProps.onDragStart);
    },

    onClick: (e: KPEvent) => {
      handleClick(e, childProps.onClick);
    },
  };

  const cloned = React.cloneElement(children, mergedProps);

  return cloned;
}
