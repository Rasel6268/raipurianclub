import { Building2, Calendar, ChevronDown, ChevronUp, Globe, Mail, MapPin, Phone, Star, Trophy } from "lucide-react";
import { GiThumbDown } from "react-icons/gi";
import { LiaLinkedin } from "react-icons/lia";

const MemberCard = ({ member, isManaging, expanded, onToggle }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border ${
        isManaging ? "border-amber-200 dark:border-amber-800" : "border-gray-100 dark:border-gray-700"
      }`}
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="relative shrink-0">
            <img
              src={member.image}
              alt={member.name}
              className="w-20 h-20 rounded-xl object-cover"
            />
            {isManaging && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white" />
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">
              {member.name}
            </h3>
            <p className="text-emerald-600 dark:text-emerald-400 font-medium text-sm">
              {member.position || member.profession}
            </p>
            {member.memberId && (
              <p className="text-xs text-gray-400 mt-1">ID: {member.memberId}</p>
            )}
          </div>
        </div>

        {/* Contact Info - Always Visible */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Mail className="w-4 h-4 shrink-0" />
            <span className="truncate">{member.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Phone className="w-4 h-4 shrink-0" />
            <span>{member.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="truncate">{member.location}</span>
          </div>
          {member.company && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Building2 className="w-4 h-4 shrink-0" />
              <span className="truncate">{member.company}</span>
            </div>
          )}
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={onToggle}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2 text-sm text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-xl transition-all duration-300"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {expanded ? "Show less" : "View details"}
        </button>

        {/* Expanded Details */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 space-y-3 animate-slide-down">
            {member.bio && (
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {member.bio}
              </p>
            )}
            
            {member.joinedDate && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-emerald-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  Member since {member.joinedDate}
                </span>
              </div>
            )}

            {member.interests && (
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  Interests
                </p>
                <div className="flex flex-wrap gap-2">
                  {member.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {member.contributions && (
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  Contributions
                </p>
                <div className="flex flex-wrap gap-2">
                  {member.contributions.map((contribution, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs rounded-full"
                    >
                      {contribution}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {member.achievements && (
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  Achievements
                </p>
                <div className="flex flex-wrap gap-2">
                  {member.achievements.map((achievement, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full flex items-center gap-1"
                    >
                      <Trophy className="w-3 h-3" />
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            {member.social && Object.keys(member.social).length > 0 && (
              <div className="flex gap-3 pt-2">
                {member.social.linkedin && (
                  <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors">
                    <LiaLinkedin className="w-5 h-5" />
                  </a>
                )}
                {member.social.twitter && (
                  <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}
                {member.social.github && (
                  <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors">
                    <GiThumbDown className="w-5 h-5" />
                  </a>
                )}
                {member.social.website && (
                  <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors">
                    <Globe className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default MemberCard;
