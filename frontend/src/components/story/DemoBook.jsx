import React from 'react';
import HTMLFlipBook from 'react-pageflip';
import { BookOpen } from 'lucide-react';

const storyContent = [
    { title: "The Hidden Studio", text: "In a world where imagination takes physical form, there was a hidden place known only as RStudio. It wasn't just a place to build software; it was a forge for dreams." },
    { title: "The Discovery", text: "A young developer named Raj stumbled upon a glowing repository. It wasn't hosted on any ordinary server. It pulsed with a strange, warm energy, beckoning him closer." },
    { title: "The First Commit", text: "With trembling hands, Raj pushed his first commit. The air shimmered. Lines of code lifted from the screen, swirling around him like digital fireflies." },
    { title: "The Architecture", text: "He realized the architecture of RStudio was alive. The frontend wasn't just HTML and CSS; it was woven from threads of pure light and shadow." },
    { title: "The Database", text: "Deep within the backend, the database hummed. It stored not just user data, but memories, emotions, and the untold stories of a thousand creators." },
    { title: "The Glitch", text: "But every system has its flaws. A dark anomaly, known only as 'The Glitch', began to corrupt the beautiful landscapes of RStudio. Colors faded, and paths broke." },
    { title: "The Quest", text: "Raj knew he had to debug the world. Armed with his keyboard and an unyielding spirit, he ventured into the deepest layers of the codebase." },
    { title: "The Forest of Nodes", text: "He navigated the treacherous Forest of Nodes, where dependencies tangled like thick vines. One wrong step, and the entire system could crash." },
    { title: "The Logic Gate", text: "At the center of the forest stood the Great Logic Gate. It demanded a riddle of asynchronous promises to be resolved before it would open." },
    { title: "The Breakthrough", text: "With a clever async/await spell, Raj bypassed the gate. The path ahead was clear, but the air grew colder. The Glitch was near." },
    { title: "The Confrontation", text: "In the valley of infinite loops, Raj finally faced The Glitch. It was a chaotic amalgamation of syntax errors and unhandled exceptions." },
    { title: "The Refactoring", text: "Raj didn't fight with weapons; he fought with logic. He began refactoring the chaotic code of The Glitch, turning chaos into order." },
    { title: "The Restoration", text: "Line by line, function by function, the dark anomaly began to dissolve. The colors of RStudio slowly returned, brighter than before." },
    { title: "The New Era", text: "With the system stabilized, a new era dawned in RStudio. The code was clean, the architecture robust, and the world was safe once again." },
    { title: "The Legacy", text: "Raj became a legend among developers. His story was encoded into the very foundation of RStudio, a testament to the power of clean code." },
    { title: "The Invitation", text: "And now, RStudio opens its doors to you. A world of infinite possibilities awaits. What story will you write?" },
    { title: "The Canvas", text: "Your canvas is blank, your tools are sharp. The only limit is your imagination. Let the code flow." },
    { title: "The Journey", text: "Remember, every great application starts with a single line of code. Embrace the errors, for they are the stepping stones to mastery." },
    { title: "The Community", text: "You are not alone. A vibrant community of creators stands with you, ready to help, ready to inspire." },
    { title: "The End... Or Beginning?", text: "This is the end of our demo story, but just the beginning of yours. Welcome to RStudio. Build something beautiful." }
];

const Page = React.forwardRef((props, ref) => {
    return (
        <div className="demo-page bg-[#f4e4bc] text-gray-900 p-8 shadow-inner relative overflow-hidden" ref={ref}>
            <div className="page-content h-full flex flex-col justify-between border-2 border-dashed border-[#d4b48c] p-6 rounded-sm">
                <div className="page-header text-center mb-6 border-b border-[#d4b48c] pb-4">
                    <h2 className="text-xl font-bold font-serif text-[#5c4033]">{props.title}</h2>
                </div>
                <div className="page-text flex-grow flex items-center justify-center">
                    <p className="text-lg leading-relaxed font-serif text-center italic text-[#4a3b32]">
                        {props.text}
                    </p>
                </div>
                <div className="page-footer text-center mt-6 text-sm text-[#8b6b55] border-t border-[#d4b48c] pt-4">
                    Page {props.number}
                </div>
            </div>
            {/* Book spine shading - darker on left for right pages, and right for left pages, but HTMLFlipBook handles shadows mostly. We can add a subtle gradient */}
            <div className={`absolute top-0 bottom-0 ${props.number % 2 === 0 ? 'right-0' : 'left-0'} w-8 bg-gradient-to-${props.number % 2 === 0 ? 'l' : 'r'} from-black/20 to-transparent pointer-events-none`}></div>
        </div>
    );
});

const DemoBook = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full py-20 bg-black border-b border-gray-800">
            <div className="mb-12 text-center z-10 relative">
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4 flex items-center justify-center gap-3">
                    <BookOpen size={36} className="text-yellow-500"/>
                    Interactive Demo Story
                </h2>
                <p className="text-gray-400 max-w-lg mx-auto text-lg">Experience our realistic reading engine. Flip the pages to read the legend of RStudio.</p>
            </div>
            
            <div className="book-container shadow-[0_0_50px_rgba(234,179,8,0.15)] rounded-lg p-2 bg-[#1a1a1a] relative z-10">
                <HTMLFlipBook 
                    width={400} 
                    height={550} 
                    size="stretch"
                    minWidth={315}
                    maxWidth={450}
                    minHeight={420}
                    maxHeight={600}
                    maxShadowOpacity={0.5}
                    showCover={true}
                    mobileScrollSupport={true}
                    className="demo-book"
                >
                    {/* Cover Page */}
                    <div className="demo-page-cover bg-gradient-to-br from-[#4a2e1b] to-[#1f1209] text-white p-8 flex flex-col items-center justify-center rounded-r-md shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] pointer-events-none"></div>
                        <div className="border-4 border-yellow-600/60 p-8 h-full w-full flex flex-col items-center justify-center rounded-sm relative z-10">
                            <BookOpen size={72} className="text-yellow-500 mb-8" />
                            <h1 className="text-5xl font-bold font-serif text-center text-yellow-500 mb-6 drop-shadow-lg">RStudio</h1>
                            <h2 className="text-2xl font-serif text-center text-gray-300 italic">The Awakening</h2>
                            <div className="mt-16 text-sm text-yellow-600 font-bold uppercase tracking-[0.3em]">
                                Interactive Demo
                            </div>
                        </div>
                    </div>

                    {/* Content Pages */}
                    {storyContent.map((page, index) => (
                        <Page 
                            key={index} 
                            number={index + 1} 
                            title={page.title} 
                            text={page.text} 
                        />
                    ))}

                    {/* Back Cover */}
                    <div className="demo-page-cover bg-gradient-to-bl from-[#4a2e1b] to-[#1f1209] text-white p-8 flex flex-col items-center justify-center rounded-l-md shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] pointer-events-none"></div>
                        <div className="border-4 border-yellow-600/60 p-8 h-full w-full flex flex-col items-center justify-center rounded-sm relative z-10">
                            <div className="text-center">
                                <BookOpen size={48} className="text-yellow-700 mb-6 mx-auto" />
                                <h2 className="text-3xl font-serif text-yellow-600 mb-4">The End</h2>
                                <p className="text-gray-500 italic text-lg">Thank you for reading</p>
                            </div>
                        </div>
                    </div>
                </HTMLFlipBook>
            </div>
            
            <div className="mt-12 text-sm text-yellow-500/70 uppercase tracking-widest font-semibold animate-pulse flex items-center gap-2">
                <span>&#8592;</span> Click or drag the corners to turn pages <span>&#8594;</span>
            </div>
        </div>
    );
};

export default DemoBook;
