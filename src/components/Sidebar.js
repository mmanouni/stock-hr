import React, { useState } from 'react';

const Sidebar = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    const handleTabClick = (id) => {
        setActiveTab(id);
    };

    return (
        <div className="sidebar">
            <ul>
                {tabs.map(tab => (
                    <li
                        key={tab.id}
                        className={activeTab === tab.id ? 'active' : ''}
                        onClick={() => handleTabClick(tab.id)}
                    >
                        {tab.label}
                    </li>
                ))}
            </ul>
            <div className="tab-content">
                {tabs.map(tab => (
                    activeTab === tab.id && <div key={tab.id}>{tab.content}</div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
