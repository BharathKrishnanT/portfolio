
import { useState, useRef, useEffect, FormEvent } from 'react';
import { resumeData } from '../data/resume';
import { MessageCircle, X, Send } from 'lucide-react';

type Message = {
    text: string;
    sender: 'user' | 'bot';
};

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const toggleChat = () => {
        if (!isOpen && messages.length === 0) {
            setMessages([{ text: "Hello! How can I help you? Ask about skills, projects, or contact info.", sender: 'bot' }]);
        }
        setIsOpen(!isOpen);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const getBotResponse = (input: string) => {
        const i = input.toLowerCase();
        if (i.includes('hello') || i.includes('hi')) {
            return "Hello there! You can ask me about Bharath's skills, projects, or how to get in touch with him.";
        }
        if (i.includes('skill') || i.includes('tech') || i.includes('language')) {
            const skillsList = resumeData.about.skills.slice(0, 3).join(', ');
            const langList = resumeData.about.programmingLanguages.slice(0, 3).join(', ');
            return `Bharath's key skills include ${skillsList}. He is also proficient in languages like ${langList}.`;
        }
        if (i.includes('project') || i.includes('work')) {
            const projectTitle = resumeData.projects[0].title;
            return `He has worked on several interesting projects, like the "${projectTitle}". Check out the "Projects" section for more details!`;
        }
        if (i.includes('contact') || i.includes('email') || i.includes('phone')) {
            return `You can email Bharath at ${resumeData.personal.contact.email.replace('mailto:', '')} or call him at ${resumeData.personal.contact.phone.replace('tel:', '')}.`;
        }
        if (i.includes('resume')) {
            return `You can download Bharath's resume from the "About Me" section.`;
        }
        return "I'm a simple bot, try asking about 'skills', 'projects', or 'contact' info.";
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg: Message = { text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');

        setTimeout(() => {
            const botMsg: Message = { text: getBotResponse(userMsg.text), sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);
        }, 600);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Window */}
            <div 
                className={`absolute bottom-20 right-0 w-80 sm:w-96 bg-[#111111] border border-zinc-800 rounded-lg shadow-2xl flex flex-col transition-all duration-300 transform origin-bottom-right ${
                    isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4 pointer-events-none'
                }`}
            >
                <div className="p-4 border-b border-zinc-800">
                    <h3 className="font-semibold text-white">Chat with my Assistant</h3>
                    <p className="text-xs text-slate-400">Ask me about Bharath's work</p>
                </div>
                <div className="flex-1 p-4 space-y-4 overflow-y-auto h-80">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div 
                                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                                    msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-zinc-700 text-slate-200'
                                }`}
                                dangerouslySetInnerHTML={{ __html: msg.text }} // Allow simple HTML links
                            />
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-4 border-t border-zinc-800">
                    <form onSubmit={handleSubmit} className="flex items-center">
                        <input 
                            type="text" 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask a question..." 
                            className="flex-1 bg-zinc-800 text-white placeholder-zinc-500 px-3 py-2 text-sm rounded-l-md border-zinc-700 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        />
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md text-sm font-semibold">
                            <Send size={16} />
                        </button>
                    </form>
                </div>
            </div>

            {/* Toggle Button */}
            <button 
                onClick={toggleChat}
                className="bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center w-12 h-12"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>
        </div>
    );
}
