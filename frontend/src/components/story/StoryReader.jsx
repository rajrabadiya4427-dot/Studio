import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { BookOpen, Bookmark, BookmarkCheck } from 'lucide-react';

const Page = React.forwardRef((props, ref) => {
    return (
        <div className="demo-page bg-[#f4e4bc] text-gray-900 p-4 md:p-8 shadow-inner relative overflow-hidden" ref={ref}>
            <div className="page-content h-full flex flex-col justify-between border-2 border-dashed border-[#d4b48c] p-4 md:p-6 rounded-sm">
                <div className="page-text flex-grow flex items-start justify-start pt-2 md:pt-4">
                    <p className="text-base md:text-lg leading-relaxed font-serif text-left text-[#4a3b32] whitespace-pre-wrap">
                        {props.text}
                    </p>
                </div>
                <div className="page-footer text-center mt-4 text-sm text-[#8b6b55] border-t border-[#d4b48c] pt-2 md:pt-4">
                    Page {props.number}
                </div>
            </div>
            {/* Book spine shading */}
            <div className={`absolute top-0 bottom-0 ${props.number % 2 === 0 ? 'right-0' : 'left-0'} w-8 bg-gradient-to-${props.number % 2 === 0 ? 'l' : 'r'} from-black/20 to-transparent pointer-events-none`}></div>
        </div>
    );
});

const StoryReader = ({ storyText, title, makerName }) => {
    const bookRef = useRef(null);
    const [bookmarkedPage, setBookmarkedPage] = useState(() => {
        const saved = localStorage.getItem(`storyBookmark_${title}`);
        return saved ? parseInt(saved, 10) : 0;
    });
    const [showBookmarkMsg, setShowBookmarkMsg] = useState(false);

    const handleBookmark = () => {
        if (bookRef.current) {
            const pageIndex = bookRef.current.pageFlip().getCurrentPageIndex();
            localStorage.setItem(`storyBookmark_${title}`, pageIndex.toString());
            setBookmarkedPage(pageIndex);
            setShowBookmarkMsg(true);
            setTimeout(() => setShowBookmarkMsg(false), 2000);
        }
    };

    const [pages, setPages] = useState([]);
    const [dimensions, setDimensions] = useState({
        width: 400,
        height: 550,
        isMobile: false
    });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                // Full screen for mobile (we take window width, but split it in two if needed, 
                // HTMLFlipBook shows one page in mobile portrait if size="stretch" but it calculates based on container.
                // Actually, HTMLFlipBook switches to single page mode automatically on small screens if configured, but let's just make it fill the screen)
                setDimensions({
                    width: width,
                    height: window.innerHeight - 150, // leave some room for headers/margins
                    isMobile: true
                });
            } else {
                setDimensions({
                    width: 400,
                    height: 550,
                    isMobile: false
                });
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!storyText) return;
        
        // Chunking algorithm
        // We use roughly 400 chars for mobile, 600 for desktop
        const charsPerPage = dimensions.isMobile ? 400 : 700;
        const words = storyText.split(' ');
        const newPages = [];
        let currentPageText = '';

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            if ((currentPageText + word).length > charsPerPage) {
                newPages.push(currentPageText.trim());
                currentPageText = word + ' ';
            } else {
                currentPageText += word + ' ';
            }
        }
        
        if (currentPageText.trim().length > 0) {
            newPages.push(currentPageText.trim());
        }
        
        // Add a blank page if total pages is odd to make the back cover right-sided
        if (newPages.length % 2 !== 0) {
            newPages.push("");
        }

        setPages(newPages);
    }, [storyText, dimensions.isMobile]);

    if (!storyText || pages.length === 0) return null;

    return (
        <div className="flex flex-col items-center justify-center w-full py-8 md:py-10 bg-black relative">
            <div className="mb-6 z-20">
                <button 
                    onClick={handleBookmark}
                    className="flex items-center gap-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-yellow-500 px-5 py-2.5 rounded-full transition-all duration-300 border border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.15)] hover:shadow-[0_0_25px_rgba(234,179,8,0.3)] hover:-translate-y-1 text-sm font-medium"
                >
                    {showBookmarkMsg ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                    {showBookmarkMsg ? "Page Bookmarked!" : "Bookmark Current Page"}
                </button>
            </div>
            <div className={`book-container shadow-[0_0_50px_rgba(234,179,8,0.15)] rounded-lg ${dimensions.isMobile ? 'p-0 w-full flex justify-center' : 'p-2'} bg-[#1a1a1a] relative z-10`}>
                <HTMLFlipBook 
                    ref={bookRef}
                    width={dimensions.width} 
                    height={dimensions.height} 
                    size={dimensions.isMobile ? "fixed" : "stretch"}
                    minWidth={315}
                    maxWidth={dimensions.isMobile ? window.innerWidth : 500}
                    minHeight={420}
                    maxHeight={dimensions.isMobile ? window.innerHeight : 700}
                    maxShadowOpacity={0.5}
                    showCover={true}
                    mobileScrollSupport={true}
                    useMouseEvents={true}
                    disableFlipByClick={true}
                    startPage={bookmarkedPage}
                    className="demo-book"
                >
                    {/* Cover Page */}
                    <div className="demo-page-cover bg-gradient-to-br from-[#4a2e1b] to-[#1f1209] text-white p-8 flex flex-col items-center justify-center rounded-r-md shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] pointer-events-none"></div>
                        <div className="border-4 border-yellow-600/60 p-4 md:p-8 h-full w-full flex flex-col items-center justify-center rounded-sm relative z-10">
                            <BookOpen size={dimensions.isMobile ? 48 : 72} className="text-yellow-500 mb-4 md:mb-8" />
                            <h1 className="text-3xl md:text-5xl font-bold font-serif text-center text-yellow-500 mb-4 md:mb-6 drop-shadow-lg">{title}</h1>
                            <h2 className="text-xl md:text-2xl font-serif text-center text-gray-300 italic">by {makerName}</h2>
                        </div>
                    </div>

                    {/* Content Pages */}
                    {pages.map((text, index) => (
                        <Page 
                            key={index} 
                            number={index + 1} 
                            text={text} 
                        />
                    ))}

                    {/* Back Cover */}
                    <div className="demo-page-cover bg-gradient-to-bl from-[#4a2e1b] to-[#1f1209] text-white p-8 flex flex-col items-center justify-center rounded-l-md shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] pointer-events-none"></div>
                        <div className="border-4 border-yellow-600/60 p-4 md:p-8 h-full w-full flex flex-col items-center justify-center rounded-sm relative z-10">
                            <div className="text-center">
                                <BookOpen size={48} className="text-yellow-700 mb-6 mx-auto" />
                                <h2 className="text-2xl md:text-3xl font-serif text-yellow-600 mb-4">The End</h2>
                            </div>
                        </div>
                    </div>
                </HTMLFlipBook>
            </div>
            
            <div className="mt-8 text-xs md:text-sm text-yellow-500/70 uppercase tracking-widest font-semibold animate-pulse flex items-center gap-2">
                <span>&#8592;</span> Swipe or drag corners to turn pages <span>&#8594;</span>
            </div>
        </div>
    );
};

export default StoryReader;
