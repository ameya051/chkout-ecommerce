import { useEffect, useState } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
const ScrollToTopButton = () => {
    const [showButton, setShowButton] = useState(false);
    useEffect(() => {
      const handleScroll = () => {
        if (window.pageYOffset > 100) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    const handleClick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  
    return (
      <button
        className={`fixed bottom-8 right-8 p-2 rounded-full bg-slate-800 text-white ${
          showButton ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClick}
      >
        <ChevronUpIcon className="h-5 w-5" />
      </button>
    );
  };
  
  export default ScrollToTopButton;
  