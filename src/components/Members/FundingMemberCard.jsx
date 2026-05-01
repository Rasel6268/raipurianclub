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
                                <svg className="w-4 h-4 mr-3 text-indigo-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                    
                </div>
            </div>
        </div>
    );
};

export default FundingMemberCard;