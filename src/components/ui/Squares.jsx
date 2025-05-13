import { useRef, useEffect } from 'react';

const Squares = ({
  direction = 'diagonal',
  speed = 0.2,
  borderColor = '#1b1b1b',
  hoverBorderColor = 'white',
  squareSize = 54,
  backgroundColor = '#0a0a0a',
  className = '',
}) => {
  const canvasRef = useRef(null);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquare = useRef(null);
  const requestGridRef = useRef(null);

  // Grid Movement Loop
  const animateGrid = () => {
    const effectiveSpeed = Math.max(speed, 0.1);
    switch (direction) {
      case 'right':
        gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
        break;
      case 'left':
        gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
        break;
      case 'up':
        gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
        break;
      case 'down':
        gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
        break;
      case 'diagonal':
        gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
        gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
        break;
      default:
        break;
    }

    drawGrid();
    requestGridRef.current = requestAnimationFrame(animateGrid);
  };

  // Draw Grid + Hover Glow
  const drawGrid = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Set and apply background color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
    const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

    for (let x = startX; x < width + squareSize; x += squareSize) {
      for (let y = startY; y < height + squareSize; y += squareSize) {
        const squareX = x - (gridOffset.current.x % squareSize);
        const squareY = y - (gridOffset.current.y % squareSize);

        // Edge fade
        const distToEdge = Math.min(
          squareX,
          width - squareX - squareSize,
          squareY,
          height - squareY - squareSize
        );
        const fadeFactor = Math.max(0, distToEdge / (width * 0.2));
        ctx.globalAlpha = fadeFactor;

        // Default stroke style
        ctx.lineWidth = 1;
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = borderColor;

        // Check if this square is hovered
        const isHovered =
          hoveredSquare.current &&
          hoveredSquare.current.x === Math.floor((x - startX) / squareSize) &&
          hoveredSquare.current.y === Math.floor((y - startY) / squareSize);

        // If hovered, apply glowing border only
        if (isHovered) {
          ctx.lineWidth = 2;
          ctx.shadowBlur = 20;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
          ctx.strokeStyle = hoverBorderColor;
        }

        ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        ctx.globalAlpha = 1;
      }
    }

    // Remove the gradient that might interfere with background color
    // const bgGradient = ctx.createRadialGradient(
    //   width / 2, height / 2, 0,
    //   width / 2, height / 2, Math.sqrt(width ** 2 + height ** 2) / 2
    // );
    // bgGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    // ctx.fillStyle = bgGradient;
    // ctx.fillRect(0, 0, width, height);
  };

  // Mouse Move Handler
  const handleMouseMove = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
    const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

    const hoveredSquareX = Math.floor((mouseX + gridOffset.current.x - startX) / squareSize);
    const hoveredSquareY = Math.floor((mouseY + gridOffset.current.y - startY) / squareSize);

    hoveredSquare.current = { x: hoveredSquareX, y: hoveredSquareY };
  };

  // Resize Handler
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    drawGrid(); // Redraw on resize to apply background
  };

  // Init
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    window.addEventListener('resize', resizeCanvas);
    requestGridRef.current = requestAnimationFrame(animateGrid);

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(requestGridRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [direction, speed, borderColor, hoverBorderColor, backgroundColor, squareSize]);

  return <canvas ref={canvasRef} className={`squares-canvas ${className}`}></canvas>;
};

export default Squares;