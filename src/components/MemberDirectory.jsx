// components/MemberDirectory.js
"use client";
import { useState, useEffect } from "react";
import { Calendar, ChevronDown, ChevronUp, Crown, Filter, Search, SearchXIcon, Star, Trophy, Users, Award, Sparkles } from "lucide-react";
import MemberCard from "./Members/MemberCard";
import FundingMemberCard from "./Members/FundingMemberCard";

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
      bio: "Dynamic business leader passionate about bringing positive change to the community.",
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
      bio: "Dedicated professional with expertise in legal affairs and community organization.",
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
      bio: "Financial expert ensuring transparent and efficient management of community funds.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
      social: { linkedin: "#", twitter: "#", website: "#" },
    },
  ];

  // Founding Members Data
  const foundingMembers = [
    {
      id: 101,
      name: "Md Zabed Hossain",
      memberId: "RPM-2024-001",
      email: "zabed@raipurian.com",
      phone: "+88 016XXXXXXXX",
      location: "Raipur",
      company: "Raipur Club Ltd",
      profession: "Tech Entrepreneur",
      joinedDate: "2020",
      interests: ["Tech", "Sports", "Volunteering"],
      contributions: ["Event Organizer", "Tech Committee Lead", "Founding Member"],
      achievements: ["Community Builder Award 2023", "Innovation Excellence 2024"],
      bio: "Passionate technologist who loves building community tech solutions. One of the founding members who helped establish Raipurian.",
      image: "https://res.cloudinary.com/doumlnejx/image/upload/v1777464001/WhatsApp_Image_2026-04-29_at_5.44.28_PM_cvmbsf.jpg",
      social: { linkedin: "#", github: "#" },
    },
    {
      id: 102,
      name: "Neha Gupta",
      memberId: "RPM-2024-002",
      email: "neha.gupta@raipurian.com",
      phone: "+91 9876543210",
      location: "Telibandha, Raipur",
      company: "Creative Designs Studio",
      profession: "Graphic Designer",
      joinedDate: "2020",
      interests: ["Art", "Design", "Photography"],
      contributions: ["Creative Team", "Social Media Manager", "Founding Member"],
      achievements: ["Design Excellence Award 2023"],
      bio: "Creative designer bringing visual stories to life. Founding member responsible for Raipurian's brand identity.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2070&auto=format&fit=crop",
      social: { linkedin: "#", instagram: "#" },
    },
    {
      id: 103,
      name: "Dr. Rajesh Tiwari",
      memberId: "RPM-2023-045",
      email: "rajesh.tiwari@raipurian.com",
      phone: "+91 7766554433",
      location: "Civil Lines, Raipur",
      company: "Tiwari Medical Center",
      profession: "Physician",
      joinedDate: "2020",
      interests: ["Healthcare", "Education", "Social Work"],
      contributions: ["Health Committee Lead", "Free Medical Camp Organizer", "Founding Member"],
      achievements: ["Community Health Hero 2023", "Lifetime Service Award"],
      bio: "Dedicated doctor serving the community with free health camps. One of the key founding members.",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
      social: { linkedin: "#", website: "#" },
    },
  ];

  // General Members Data
  const generalMembers = [
    {
      id: 201,
      name: "Sneha Dubey",
      memberId: "RPM-2024-015",
      email: "sneha.dubey@raipurian.com",
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
      id: 202,
      name: "Manoj Yadav",
      memberId: "RPM-2023-089",
      email: "manoj.yadav@raipurian.com",
      phone: "+91 9988223344",
      location: "Pachpedi Naka, Raipur",
      company: "Yadav Enterprises",
      profession: "Entrepreneur",
      joinedDate: "2023",
      interests: ["Business", "Networking", "Travel"],
      contributions: ["Sponsorship Coordinator", "Event Management"],
      bio: "Serial entrepreneur helping local startups grow.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2070&auto=format&fit=crop",
      social: { linkedin: "#", instagram: "#" },
    },
    {
      id: 203,
      name: "Kavita Soni",
      memberId: "RPM-2024-023",
      email: "kavita.soni@raipurian.com",
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
      id: 204,
      name: "Rohan Das",
      memberId: "RPM-2023-112",
      email: "rohan.das@raipurian.com",
      phone: "+91 9900112233",
      location: "Katora Talab, Raipur",
      company: "Das Constructions",
      profession: "Civil Engineer",
      joinedDate: "2023",
      interests: ["Infrastructure", "Environment", "Sports"],
      contributions: ["Infrastructure Advisor", "Sports Coordinator"],
      bio: "Civil engineer contributing to community infrastructure projects.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2070&auto=format&fit=crop",
      social: { linkedin: "#", website: "#" },
    },
    {
      id: 205,
      name: "Pooja Chandrakar",
      memberId: "RPM-2024-031",
      email: "pooja.chandrakar@raipurian.com",
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
    {
      id: 206,
      name: "Amit Patel",
      memberId: "RPM-2024-056",
      email: "amit.patel@raipurian.com",
      phone: "+91 9988776655",
      location: "Shankar Nagar, Raipur",
      company: "Patel Tech Solutions",
      profession: "Software Engineer",
      joinedDate: "2024",
      interests: ["Coding", "Open Source", "Teaching"],
      contributions: ["Tech Support Volunteer", "Workshop Facilitator"],
      bio: "Software engineer passionate about teaching coding to underprivileged students.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop",
      social: { linkedin: "#", github: "#" },
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
  const filteredFoundingMembers = filterMembers(foundingMembers);
  const filteredGeneralMembers = filterMembers(generalMembers);

  const toggleMemberExpand = (id) => {
    setExpandedMember(expandedMember === id ? null : id);
  };

  if (!mounted) return null;

  return (
    <section className="relative py-16 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
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
                  onClick={() => setSelectedCategory("founding")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === "founding"
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  Founding Members
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
                <FundingMemberCard
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

        {/* Founding Members Section */}
        {(selectedCategory === "all" || selectedCategory === "founding") && filteredFoundingMembers.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Founding Members
                </h2>
                <p className="text-gray-500 dark:text-gray-400">The visionaries who started it all</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFoundingMembers.map((member) => (
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

        {/* General Members Section */}
        {(selectedCategory === "all" || selectedCategory === "general") && filteredGeneralMembers.length > 0 && (
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
        )}

        {/* No Results */}
        {filteredManagingBody.length === 0 && 
         filteredFoundingMembers.length === 0 && 
         filteredGeneralMembers.length === 0 && (
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

export default MemberDirectory;