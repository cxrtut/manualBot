import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { FaBars, FaPlus, FaComment, FaQuestionCircle, FaHistory, FaCog, FaGlobe } from 'react-icons/fa';
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

    const loadPrompt = async (prompt) => {
        await onSent(prompt);
        setRecentPrompt(prompt);
    };

    return (
        <div className='sidebar'>
            <div className="top">
                {/* Menu Icon */}
                <FaBars className="menu" onClick={() => setExtended(prev => !prev)} size={24} />
                <div onClick={() => newChat()} className="new-chat">
                    {/* Plus Icon */}
                    <FaPlus size={24} />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended
                    ? <div className="recent">
                        <p className='recent-title'>Recent</p>
                        {prevPrompts.map((item, index) => (
                            <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                                {/* Message Icon */}
                                <FaComment size={18} />
                                <p>{item.slice(0, 18)}{"..."}</p>
                            </div>
                        ))}
                    </div>
                    : null}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    {/* Settings Icon */}
                    <FaCog size={18} />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
