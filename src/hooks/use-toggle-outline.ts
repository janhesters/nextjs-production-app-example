import { useEffect, useState } from 'react';

/**
 * @returns A boolean `hideOutline` that indicates whether to hide the outline.
 */
function useToggleOutline() {
  const [hideOutline, setHideOutline] = useState(true);

  useEffect(() => {
    const handleMousedown = () => {
      setHideOutline(true);
    };
    const handleKeydown = () => {
      setHideOutline(false);
    };

    document.addEventListener('mousedown', handleMousedown);
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('mousedown', handleMousedown);
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return hideOutline;
}

export default useToggleOutline;
