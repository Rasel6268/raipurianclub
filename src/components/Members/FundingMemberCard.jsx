import React from 'react';

const FundingMemberCard = ({member, isManaging, expanded, onToggle}) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="md:flex h-full">
                {/* Image Section */}
                <div className="md:w-2/5">
                    <img
                        src={member.image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2070&auto=format&fit=crop"}
                        alt={member.name}
                        className="w-full h-64 md:h-full object-cover"
                    />
                </div>
                
                {/* Content Section */}
                <div className="md:w-3/5 p-6 md:p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-indigo-600 font-semibold mb-2">{member.position}</p>
                    {member.role && (
                        <p className="text-gray-500 text-sm mb-4">{member.role}</p>
                    )}
                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                        {member.bio || `${member.profession} at ${member.company} with ${member.joinedDate} joining.`}
                    </p>
                    
                    {/* Contact Information */}
                    <div className="space-y-2">
                        {member.email && (
                            <div className="flex items-center text-gray-700 text-sm">
                                <svg className="w-4 h-4 mr-3 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>{member.email}</span>
                            </div>
                        )}
                        
                        {member.phone && (
                            <div className="flex items-center text-gray-700 text-sm">
                                <svg className="w-4 h-4 mr-3 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>{member.phone}</span>
                            </div>
                        )}
                        
                        {member.location && (
                            <div className="flex items-center text-gray-700 text-sm">
                                <svg className="w-4 h-4 mr-3 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{member.location}</span>
                            </div>
                        )}
                    </div>

                    {/* Achievements (show only if expanded) */}
                    {expanded && member.achievements && member.achievements.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-gray-100">
                            <p className="text-sm font-semibold text-gray-900 mb-2">Achievements</p>
                            <div className="flex flex-wrap gap-2">
                                {member.achievements.map((achievement, idx) => (
                                    <span key={idx} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full">
                                        {achievement}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Social Links (show only if expanded) */}
                    {expanded && member.social && (
                        <div className="mt-4 flex gap-3">
                            {member.social.linkedin && (
                                <a href={member.social.linkedin} className="text-gray-400 hover:text-indigo-600 transition">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                    </svg>
                                </a>
                            )}
                            {member.social.twitter && (
                                <a href={member.social.twitter} className="text-gray-400 hover:text-indigo-600 transition">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.5-11.926c0-.209-.009-.417-.026-.625a9.937 9.937 0 002.416-2.496z"/>
                                    </svg>
                                </a>
                            )}
                            {member.social.website && (
                                <a href={member.social.website} className="text-gray-400 hover:text-indigo-600 transition">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.66 0 3-4 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4-3-9s1.34-9 3-9"/>
                                    </svg>
                                </a>
                            )}
                        </div>
                    )}

                    {/* Toggle Button (if onToggle provided) */}
                    {onToggle && (
                        <button 
                            onClick={onToggle}
                            className="mt-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1 transition"
                        >
                            {expanded ? 'Show Less ↑' : 'Show More ↓'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FundingMemberCard;