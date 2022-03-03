import { RGBType } from 'helper';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Progress } from 'uiw';
import { useColors } from 'useColors';

import { Button } from './Button';
import styles from './styles/App.module.scss';

const { Line } = Progress;

const CANVAS_WIDTH = 256;
const CANVAS_HEIGHT = 128;

export const AppContent = () => {
  const { colors, sortedColors } = useColors();
  const [showStyle, setShowStyle] = useState(1);
  const [count, setCount] = useState(1);
  const canvasRef = useRef(null);

  const handleMinusOne = useCallback(() => {
    count > 1 && setCount((prev) => prev - 1);
  }, [count]);

  const handleAddOne = useCallback(() => {
    count < 8 && setCount((prev) => prev + 1);
  }, [count]);

  const rows = useMemo(() => Math.pow(2, (count - 1) % 8), [count]);
  const columns = useMemo(() => rows * 2, [rows]);
  const length = useMemo(
    () => Math.sqrt((CANVAS_WIDTH * CANVAS_HEIGHT) / (rows * columns)),
    [columns, rows],
  );

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const currentStyle = showStyle === 1 ? [...colors] : [...sortedColors];
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        for (let height = 0; height < length; height++) {
          for (let width = 0; width < length; width++) {
            if (ctx && currentStyle.length > 0) {
              ctx.beginPath();
              const { r, g, b } = currentStyle.pop() as RGBType;
              ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
              ctx.fillRect(column * length + height, row * length + width, 1, 1);
            }
          }
        }
      }
    }
  }, [colors, columns, length, rows, showStyle, sortedColors]);

  return (
    <div className={styles.AppContent}>
      <div className={styles.ButtonGroup}>
        <Button icon="star-on" onClick={() => setShowStyle(1)}>
          Style One
        </Button>
        <Button icon="heart-on" onClick={() => setShowStyle(2)}>
          Style Two
        </Button>
      </div>
      <div className={styles.ButtonGroup}>
        <Button icon="left-square" onClick={handleMinusOne} />
        <Line
          style={{ width: '100px' }}
          percent={(count * 100) / 8}
          status="active"
          showText={false}
        />
        <Button icon="right-square" onClick={handleAddOne} />
      </div>
      <canvas
        width={`${CANVAS_WIDTH}px`}
        height={`${CANVAS_HEIGHT}px`}
        className={styles.Canvas}
        ref={canvasRef}
      />
    </div>
  );
};
