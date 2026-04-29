// components/MemberDirectory.js
"use client";
import { useState, useEffect } from "react";
import { Building2, Calendar, ChevronDown, ChevronUp, Crown, Filter, Globe, Mail, MapPin, Phone, Search, SearchXIcon, Star, Trophy, Users } from "lucide-react";

const MemberDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedMember, setExpandedMember] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Managing Body Data
  const managingBody = [
    {
      id: 1,
      name: "Dr. Ananya Sharma",
      position: "President",
      role: "Chairperson",
      email: "ananya.sharma@raipurian.com",
      phone: "+91 98765 43210",
      location: "Raipur, Chhattisgarh",
      company: "Sharma Foundation",
      profession: "Social Entrepreneur",
      joinedDate: "2020",
      achievements: ["Community Excellence Award 2024", "Best Leadership Award 2023"],
      bio: "Visionary leader with over 15 years of experience in community development. Dr. Sharma has been instrumental in transforming Raipurian into a thriving community hub.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2070&auto=format&fit=crop",
      social: { linkedin: "#", twitter: "#", website: "#" },
    },
    {
      id: 2,
      name: "Vikram Singh Rathore",
      position: "Vice President",
      role: "Managing Body",
      email: "vikram.rathore@raipurian.com",
      phone: "+91 99887 66554",
      location: "Raipur, Chhattisgarh",
      company: "Rathore Group",
      profession: "Business Leader",
      joinedDate: "2021",
      achievements: ["Business Excellence Award 2024", "Community Builder of the Year"],
      bio: "Dynamic business leader passionate about bringing positive change to the community. Vikram has spearheaded multiple successful initiatives for local entrepreneurs.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2070&auto=format&fit=crop",
      social: { linkedin: "#", twitter: "#", website: "#" },
    },
    {
      id: 3,
      name: "Priya Mehta",
      position: "Secretary",
      role: "Managing Body",
      email: "priya.mehta@raipurian.com",
      phone: "+91 87654 32109",
      location: "Raipur, Chhattisgarh",
      company: "Mehta Associates",
      profession: "Corporate Lawyer",
      joinedDate: "2020",
      achievements: ["Young Achiever Award 2024", "Women in Leadership 2023"],
      bio: "Dedicated professional with expertise in legal affairs and community organization. Priya ensures smooth operations and compliance for all community activities.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2070&auto=format&fit=crop",
      social: { linkedin: "#", twitter: "#", website: "#" },
    },
    {
      id: 4,
      name: "Rahul Verma",
      position: "Treasurer",
      role: "Managing Body",
      email: "rahul.verma@raipurian.com",
      phone: "+91 76543 21098",
      location: "Raipur, Chhattisgarh",
      company: "Verma Financial Services",
      profession: "Chartered Accountant",
      joinedDate: "2021",
      achievements: ["Financial Excellence Award", "Trustee Recognition 2024"],
      bio: "Financial expert ensuring transparent and efficient management of community funds. Rahul brings strategic financial planning to all community projects.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
      social: { linkedin: "#", twitter: "#", website: "#" },
    },
  ];

  // General Members Data
  const generalMembers = [
    {
      id: 101,
      name: "Md Zabed Hossain",
      memberId: "RPM-2024-001",
      email: "example@gmail.com",
      phone: "+88 016XXXXXXXX",
      location: "Raipur",
      company: "Raipur Club Ltd",
      profession: "",
      joinedDate: "2023",
      interests: ["Tech", "Sports", "Volunteering"],
      contributions: ["Event Organizer", "Tech Committee Lead"],
      bio: "Passionate technologist who loves building community tech solutions.",
      image: "https://res.cloudinary.com/doumlnejx/image/upload/v1777464001/WhatsApp_Image_2026-04-29_at_5.44.28_PM_cvmbsf.jpg",
      social: { linkedin: "#", github: "#" },
    },
    {
      id: 102,
      name: "Neha Gupta",
      memberId: "RPM-2024-002",
      email: "neha.gupta@example.com",
      phone: "+91 9876543210",
      location: "Telibandha, Raipur",
      company: "Creative Designs Studio",
      profession: "Graphic Designer",
      joinedDate: "2023",
      interests: ["Art", "Design", "Photography"],
      contributions: ["Creative Team", "Social Media Manager"],
      bio: "Creative designer bringing visual stories to life.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2070&auto=format&fit=crop",
      social: { linkedin: "#", instagram: "#" },
    },
    {
      id: 103,
      name: "Dr. Rajesh Tiwari",
      memberId: "RPM-2023-045",
      email: "rajesh.tiwari@example.com",
      phone: "+91 7766554433",
      location: "Civil Lines, Raipur",
      company: "Tiwari Medical Center",
      profession: "Physician",
      joinedDate: "2022",
      interests: ["Healthcare", "Education", "Social Work"],
      contributions: ["Health Committee Lead", "Free Medical Camp Organizer"],
      bio: "Dedicated doctor serving the community with free health camps.",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
      social: { linkedin: "#", website: "#" },
    },
    {
      id: 104,
      name: "Sneha Dubey",
      memberId: "RPM-2024-015",
      email: "sneha.dubey@example.com",
      phone: "+91 8877665544",
      location: "Sundar Nagar, Raipur",
      company: "Dubey Law Associates",
      profession: "Advocate",
      joinedDate: "2024",
      interests: ["Law", "Women Empowerment", "Debate"],
      contributions: ["Legal Aid Volunteer", "Youth Mentor"],
      bio: "Legal professional committed to providing free legal aid to underprivileged.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2070&auto=format&fit=crop",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      id: 105,
      name: "Manoj Yadav",
      memberId: "RPM-2023-089",
      email: "manoj.yadav@example.com",
      phone: "+91 9988223344",
      location: "Pachpedi Naka, Raipur",
      company: "Yadav Enterprises",
      profession: "Entrepreneur",
      joinedDate: "2021",
      interests: ["Business", "Networking", "Travel"],
      contributions: ["Sponsorship Coordinator", "Event Management"],
      bio: "Serial entrepreneur helping local startups grow.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2070&auto=format&fit=crop",
      social: { linkedin: "#", instagram: "#" },
    },
    {
      id: 106,
      name: "Kavita Soni",
      memberId: "RPM-2024-023",
      email: "kavita.soni@example.com",
      phone: "+91 8899776655",
      location: "Ashoka Garden, Raipur",
      company: "Soni Academy",
      profession: "Educator",
      joinedDate: "2024",
      interests: ["Education", "Literature", "Music"],
      contributions: ["Education Committee", "Tutor Volunteer"],
      bio: "Passionate teacher working to improve education accessibility.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2070&auto=format&fit=crop",
      social: { linkedin: "#", facebook: "#" },
    },
    {
      id: 107,
      name: "Rohan Das",
      memberId: "RPM-2023-112",
      email: "rohan.das@example.com",
      phone: "+91 9900112233",
      location: "Katora Talab, Raipur",
      company: "Das Constructions",
      profession: "Civil Engineer",
      joinedDate: "2022",
      interests: ["Infrastructure", "Environment", "Sports"],
      contributions: ["Infrastructure Advisor", "Sports Coordinator"],
      bio: "Civil engineer contributing to community infrastructure projects.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2070&auto=format&fit=crop",
      social: { linkedin: "#", website: "#" },
    },
    {
      id: 108,
      name: "Pooja Chandrakar",
      memberId: "RPM-2024-031",
      email: "pooja.chandrakar@example.com",
      phone: "+91 7778889990",
      location: "Mowa, Raipur",
      company: "Chandrakar Arts",
      profession: "Artist",
      joinedDate: "2024",
      interests: ["Art", "Culture", "Craft"],
      contributions: ["Cultural Committee", "Art Workshop Lead"],
      bio: "Artist preserving and promoting local art forms.",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=2070&auto=format&fit=crop",
      social: { instagram: "#", facebook: "#" },
    },
  ];

  // Filter members based on search term
  const filterMembers = (members) => {
    return members.filter((member) => {
      const matchesSearch =
        searchTerm === "" ||
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.profession?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email?.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });
  };

  const filteredManagingBody = filterMembers(managingBody);
  const filteredGeneralMembers = filterMembers(generalMembers);

  const toggleMemberExpand = (id) => {
    setExpandedMember(expandedMember === id ? null : id);
  };

  if (!mounted) return null;

  return (
    <section className="relative py-16 min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float-reverse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-full px-4 py-1.5 mb-4">
            <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Our Community
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Member{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Directory
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-emerald-400/40"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 4 L100 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Meet the incredible individuals shaping our community's future
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, profession, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === "all"
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  All Members
                </button>
                <button
                  onClick={() => setSelectedCategory("managing")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === "managing"
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  Managing Body
                </button>
                <button
                  onClick={() => setSelectedCategory("general")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === "general"
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  General Members
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Managing Body Section */}
        {(selectedCategory === "all" || selectedCategory === "managing") && filteredManagingBody.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Managing Body
                </h2>
                <p className="text-gray-500 dark:text-gray-400">Leadership that drives our vision forward</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredManagingBody.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  isManaging={true}
                  expanded={expandedMember === member.id}
                  onToggle={() => toggleMemberExpand(member.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* General Members Section */}
        {(selectedCategory === "all" || selectedCategory === "general") && filteredGeneralMembers.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Founding Members
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {filteredGeneralMembers.length} active members
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGeneralMembers.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  isManaging={false}
                  expanded={expandedMember === member.id}
                  onToggle={() => toggleMemberExpand(member.id)}
                />
              ))}
            </div>
          </div>
        )}
        {/* {(selectedCategory === "all" || selectedCategory === "general") && filteredGeneralMembers.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  General Members
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {filteredGeneralMembers.length} active members
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGeneralMembers.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  isManaging={false}
                  expanded={expandedMember === member.id}
                  onToggle={() => toggleMemberExpand(member.id)}
                />
              ))}
            </div>
          </div>
        )} */}

        {/* No Results */}
        {filteredManagingBody.length === 0 && filteredGeneralMembers.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <SearchXIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No members found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(20px) translateX(-10px); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

// Member Card Component
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
            <Mail className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{member.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Phone className="w-4 h-4 flex-shrink-0" />
            <span>{member.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{member.location}</span>
          </div>
          {member.company && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Building2 className="w-4 h-4 flex-shrink-0" />
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
                    <Linkedin className="w-5 h-5" />
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
                    <Github className="w-5 h-5" />
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

export default MemberDirectory;