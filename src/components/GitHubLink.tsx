import Image from "next/image";

const GitHubLink = () => {
  return (
    <div className="fixed bottom-4 right-4 z-10 group">
      <a
        href="https://github.com/justinmcbride/project-assignments"
        target="_blank"
        rel="noopener noreferrer"
        className="relative block"
      >
        {/* Animated bubbles */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Bubble 1 */}
          <div className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full bubble-1" 
               style={{ left: '20px', top: '20px' }}></div>
          {/* Bubble 2 */}
          <div className="absolute w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full bubble-2" 
               style={{ left: '10px', top: '25px' }}></div>
          {/* Bubble 3 */}
          <div className="absolute w-1.5 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full bubble-3" 
               style={{ left: '30px', top: '15px' }}></div>
          {/* Bubble 4 */}
          <div className="absolute w-2.5 h-2.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full bubble-4" 
               style={{ left: '5px', top: '30px' }}></div>
          {/* Bubble 5 */}
          <div className="absolute w-2 h-2 bg-gradient-to-r from-red-400 to-pink-500 rounded-full bubble-5" 
               style={{ left: '25px', top: '10px' }}></div>
          {/* Bubble 6 */}
          <div className="absolute w-1 h-1 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full bubble-6" 
               style={{ left: '15px', top: '35px' }}></div>
        </div>
        
        {/* GitHub Icon */}
        <Image
          src="/github-mark.svg"
          alt="GitHub"
          width={40}
          height={40}
          priority
          className="relative z-10 transition-transform duration-200 group-hover:scale-110"
        />
      </a>
    </div>
  );
};

export { GitHubLink };
