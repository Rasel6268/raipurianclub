import {
  Building2,
  Calendar,
  ChevronDown,
  ChevronUp,
  Globe,
  Mail,
  MapPin,
  Phone,
  Star,
  Trophy,
} from "lucide-react";
import { LiaLinkedin } from "react-icons/lia";

const MemberCard = ({ member, isManaging, expanded, onToggle }) => {
  return (
    <div
      className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border ${
        isManaging
          ? "border-amber-300 dark:border-amber-700"
          : "border-gray-100 dark:border-gray-700"
      }`}
    >
      {/* Top accent bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 ${
          isManaging
            ? "bg-gradient-to-r from-amber-400 to-yellow-500"
            : "bg-gradient-to-r from-emerald-500 to-teal-400"
        }`}
      />

      {/* Main horizontal row: LEFT image | RIGHT info */}
      <div className="flex flex-row items-stretch">
        {/* LEFT: Member Image */}
        <div className="relative shrink-0 w-32 sm:w-40">
          <img
            src={member.image}
            alt={member.name}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>

        {/* RIGHT: Member Information */}
        <div className="flex-1 p-5 pt-6 flex flex-col justify-between min-w-0">
          {/* Name, position, ID */}
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight truncate">
                {member.name}
              </h3>
              {isManaging && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-semibold rounded-full shrink-0">
                  <Star className="w-3 h-3" />
                  Managing
                </span>
              )}
            </div>

            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 truncate mb-1">
              {member.position || member.memberType}
            </p>

            {member.memberId && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
                ID: {member.memberId}
              </p>
            )}

            {/* Contact info */}
            <div className="space-y-1.5">
              {member.email && (
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Mail className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                  <span className="truncate">{member.email}</span>
                </div>
              )}
              {member.phone && (
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Phone className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                  <span>{member.phone}</span>
                </div>
              )}
              {member.location && (
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                  <span className="truncate">{member.location}</span>
                </div>
              )}
              {member.company && (
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Building2 className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                  <span className="truncate">{member.company}</span>
                </div>
              )}
            </div>
          </div>

          {/* Expand/Collapse Button */}
          <button
            onClick={onToggle}
            className="mt-4 self-start flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 rounded-full transition-all duration-200"
          >
            {expanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
            {expanded ? "Show less" : "View details"}
          </button>
        </div>

      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="px-5 pb-5 pt-4 border-t border-gray-100 dark:border-gray-700 space-y-3 animate-slide-down">
          {member.bio && (
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              {member.bio}
            </p>
          )}

          {member.joinedDate && (
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Calendar className="w-3.5 h-3.5 text-emerald-500" />
              <span>Member since {member.joinedDate}</span>
            </div>
          )}

          {member.interests && member.interests.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5">
                Interests
              </p>
              <div className="flex flex-wrap gap-1.5">
                {member.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs rounded-full font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {member.contributions && member.contributions.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5">
                Contributions
              </p>
              <div className="flex flex-wrap gap-1.5">
                {member.contributions.map((contribution, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs rounded-full font-medium"
                  >
                    {contribution}
                  </span>
                ))}
              </div>
            </div>
          )}

          {member.achievements && member.achievements.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5">
                Achievements
              </p>
              <div className="flex flex-wrap gap-1.5">
                {member.achievements.map((achievement, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full font-medium flex items-center gap-1"
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
            <div className="flex gap-3 pt-1">
              {member.social.linkedin && (
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <LiaLinkedin className="w-5 h-5" />
                </a>
              )}
              {member.social.twitter && (
                <a
                  href={member.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}
              {member.social.website && (
                <a
                  href={member.social.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MemberCard;
