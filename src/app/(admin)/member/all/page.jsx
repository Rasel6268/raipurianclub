'use client';
import { Award, Briefcase, Calendar, CheckCircle, ChevronRight, Clock, Filter, Globe, Heart, Mail, MapPin, MessageCircle, Phone, Search, Share2, Star, UserPlus, Users } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';


const MembersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [filterRole, setFilterRole] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Members data
  const membersData = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Event Coordinator",
      email: "sarah.johnson@eventshub.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      joinDate: "January 2024",
      bio: "Passionate event planner with 8+ years of experience creating memorable experiences. Loves bringing people together and fostering community connections.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      coverImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=300&fit=crop",
      skills: ["Event Planning", "Project Management", "Public Speaking", "Budgeting"],
      interests: ["Music Festivals", "Food & Wine", "Travel"],
      achievements: ["Organized 50+ Events", "Community Leader Award 2024", "Best Event Planner Nominee"],
      socialLinks: {
        twitter: "https://twitter.com/sarahjohnson",
        linkedin: "https://linkedin.com/in/sarahjohnson",
        github: "https://github.com/sarahjohnson"
      },
      status: "active",
      badges: ["Top Contributor", "Event Master", "Community Star"],
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Tech Lead",
      email: "michael.chen@eventshub.com",
      phone: "+1 (555) 234-5678",
      location: "San Francisco, CA",
      joinDate: "March 2024",
      bio: "Full-stack developer and tech enthusiast. Leads our digital innovation initiatives and builds amazing experiences through technology.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      coverImage: "https://images.unsplash.com/photo-1517438476316-10d79c077509?w=800&h=300&fit=crop",
      skills: ["React", "Node.js", "Cloud Architecture", "UI/UX Design"],
      interests: ["AI Technology", "Open Source", "Gaming"],
      achievements: ["Tech Innovation Award", "Hackathon Winner 2024", "Mentor of the Year"],
      socialLinks: {
        twitter: "https://twitter.com/michaelchen",
        linkedin: "https://linkedin.com/in/michaelchen",
        github: "https://github.com/michaelchen"
      },
      status: "active",
      badges: ["Tech Guru", "Innovation Leader", "Mentor"],
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Creative Director",
      email: "emily.rodriguez@eventshub.com",
      phone: "+1 (555) 345-6789",
      location: "Los Angeles, CA",
      joinDate: "February 2024",
      bio: "Creative visionary specializing in brand experiences and visual storytelling. Transforms ordinary events into extraordinary moments.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      coverImage: "https://images.unsplash.com/photo-1519742866993-66d3cfef4bbd?w=800&h=300&fit=crop",
      skills: ["Graphic Design", "Brand Strategy", "Social Media", "Content Creation"],
      interests: ["Art", "Photography", "Fashion"],
      achievements: ["Design Excellence Award", "Campaign of the Year", "Creative Visionary"],
      socialLinks: {
        twitter: "https://twitter.com/emilyrodriguez",
        linkedin: "https://linkedin.com/in/emilyrodriguez",
        instagram: "https://instagram.com/emilyrodriguez"
      },
      status: "active",
      badges: ["Creative Genius", "Brand Builder", "Visual Storyteller"],
    },
    {
      id: 4,
      name: "David Kim",
      role: "Marketing Specialist",
      email: "david.kim@eventshub.com",
      phone: "+1 (555) 456-7890",
      location: "Chicago, IL",
      joinDate: "April 2024",
      bio: "Digital marketing expert focused on growth strategies and community engagement. Drives brand awareness and member acquisition.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=300&fit=crop",
      skills: ["SEO/SEM", "Content Marketing", "Analytics", "Email Marketing"],
      interests: ["Digital Trends", "Podcasting", "Startups"],
      achievements: ["Marketing Campaign Award", "Growth Champion", "Top Performer"],
      socialLinks: {
        twitter: "https://twitter.com/davidkim",
        linkedin: "https://linkedin.com/in/davidkim",
        github: "https://github.com/davidkim"
      },
      status: "active",
      badges: ["Growth Hacker", "Marketing Pro", "Data Driven"],
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Community Manager",
      email: "lisa.thompson@eventshub.com",
      phone: "+1 (555) 567-8901",
      location: "Austin, TX",
      joinDate: "May 2024",
      bio: "Community builder and engagement specialist. Creates inclusive spaces where everyone feels welcome and valued.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
      coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=300&fit=crop",
      skills: ["Community Building", "Conflict Resolution", "Social Media", "Event Planning"],
      interests: ["Wellness", "Book Clubs", "Volunteering"],
      achievements: ["Community Builder Award", "Member's Choice 2024", "Outstanding Service"],
      socialLinks: {
        twitter: "https://twitter.com/lisathompson",
        linkedin: "https://linkedin.com/in/lisathompson",
      },
      status: "active",
      badges: ["Community Heart", "Bridge Builder", "Member Favorite"],
    },
    {
      id: 6,
      name: "Alex Turner",
      role: "Product Manager",
      email: "alex.turner@eventshub.com",
      phone: "+1 (555) 678-9012",
      location: "Seattle, WA",
      joinDate: "June 2024",
      bio: "Product strategist passionate about building solutions that solve real problems. Leads product development and innovation.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      coverImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=300&fit=crop",
      skills: ["Product Strategy", "Agile Methodology", "User Research", "Data Analysis"],
      interests: ["Tech Products", "Startup Culture", "Design Thinking"],
      achievements: ["Product Launch Success", "Innovation Award", "Team MVP"],
      socialLinks: {
        linkedin: "https://linkedin.com/in/alexturner",
        github: "https://github.com/alexturner"
      },
      status: "active",
      badges: ["Product Visionary", "Strategic Thinker", "Problem Solver"],
    },
  ];

  // Get unique roles for filter
  const roles = ['all', ...new Set(membersData.map(member => member.role))];

  // Filter members based on search and role
  const filteredMembers = membersData.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    return matchesSearch && matchesRole;
  });

  // Member Card Component
  const MemberCard = ({ member, onClick }) => {
    const cardRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in-up');
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      if (cardRef.current) {
        cardRef.current.style.opacity = '0';
        cardRef.current.style.transform = 'translateY(30px)';
        cardRef.current.style.transition = 'all 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
        observer.observe(cardRef.current);
      }

      return () => {
        if (cardRef.current) observer.unobserve(cardRef.current);
      };
    }, []);

    // Get role-specific gradient
    const getRoleGradient = (role) => {
      const gradients = {
        "Event Coordinator": "from-rose-500 to-pink-500",
        "Tech Lead": "from-blue-500 to-cyan-500",
        "Creative Director": "from-purple-500 to-violet-500",
        "Marketing Specialist": "from-emerald-500 to-teal-500",
        "Community Manager": "from-indigo-500 to-purple-500",
        "Product Manager": "from-amber-500 to-orange-500",
      };
      return gradients[role] || "from-gray-500 to-gray-600";
    };

    return (
      <div
        ref={cardRef}
        onClick={() => onClick(member)}
        className="group relative bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
      >
        {/* Background gradient overlay */}
        <div className={`absolute inset-0 bg-linear-to-br ${getRoleGradient(member.role)} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-1.5 bg-emerald-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg">
            <CheckCircle className="w-3 h-3" />
            <span>Active</span>
          </div>
        </div>

        {/* Avatar and Basic Info */}
        <div className="relative px-6 pt-8 pb-4 text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-linear-to-r from-emerald-400 to-cyan-400 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img
              src={member.avatar}
              alt={member.name}
              className="relative w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg mx-auto"
            />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-4">{member.name}</h3>
          <p className={`text-sm font-medium bg-linear-to-r ${getRoleGradient(member.role)} bg-clip-text text-transparent mt-1`}>
            {member.role}
          </p>
          <div className="flex items-center justify-center gap-1 text-gray-400 text-xs mt-2">
            <MapPin className="w-3 h-3" />
            <span>{member.location}</span>
          </div>
        </div>

        {/* Badges */}
        <div className="px-6 py-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex flex-wrap gap-1.5 justify-center">
            {member.badges.slice(0, 3).map((badge, idx) => (
              <span key={idx} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* View Profile Button */}
        <div className="px-6 pb-6">
          <button className={`w-full bg-linear-to-r ${getRoleGradient(member.role)} text-white font-semibold py-2 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] text-sm flex items-center justify-center gap-2 group/btn`}>
            View Profile
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    );
  };

  // Member Detail Modal
  const MemberModal = ({ member, onClose }) => {
    if (!member) return null;

    useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, []);

    const getRoleGradient = (role) => {
      const gradients = {
        "Event Coordinator": "from-rose-500 to-pink-500",
        "Tech Lead": "from-blue-500 to-cyan-500",
        "Creative Director": "from-purple-500 to-violet-500",
        "Marketing Specialist": "from-emerald-500 to-teal-500",
        "Community Manager": "from-indigo-500 to-purple-500",
        "Product Manager": "from-amber-500 to-orange-500",
      };
      return gradients[role] || "from-gray-500 to-gray-600";
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-white/90 dark:bg-gray-700/90 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow-lg"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Cover Image */}
          <div className="relative h-48 overflow-hidden rounded-t-2xl">
            <img
              src={member.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          {/* Profile Content */}
          <div className="relative px-8 pb-8">
            {/* Avatar */}
            <div className="absolute -top-12 left-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full blur-md"></div>
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="relative w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                />
              </div>
            </div>

            {/* Header Info */}
            <div className="ml-32 pt-4">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{member.name}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getRoleGradient(member.role)} text-white`}>
                  {member.role}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-gray-500 dark:text-gray-400 text-sm flex-wrap">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{member.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {member.joinDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Member since 2024</span>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500" />
                About Me
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {member.bio}
              </p>
            </div>

            {/* Skills & Interests Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-500" />
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {member.interests.map((interest, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-lg text-sm font-medium">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-500" />
                Achievements
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {member.achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact & Social */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">{member.email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">{member.phone}</span>
                </div>
              </div>
              
              {/* Social Links */}
              {Object.keys(member.socialLinks).length > 0 && (
                <div className="flex gap-3 mt-4">
                  {member.socialLinks.twitter && (
                    <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <Twitter className="w-5 h-5 text-blue-400" />
                    </a>
                  )}
                  {member.socialLinks.linkedin && (
                    <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <Linkedin className="w-5 h-5 text-blue-600" />
                    </a>
                  )}
                  {member.socialLinks.github && (
                    <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      {/* <Github className="w-5 h-5 text-gray-800 dark:text-gray-300" /> */}
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4">
              <button className="flex-1 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Send Message
              </button>
              <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-float-slow"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse-slow"></div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-linear-to-r from-emerald-700 via-teal-700 to-cyan-800 text-white py-16 px-4">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">Our Community</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 animate-fade-in-up">
            Meet Our{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Members</span>
              <svg
                className="absolute -bottom-3 left-0 w-full h-4 text-white/30"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
              >
                <path d="M0 4 L100 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Connect with talented professionals who make our community extraordinary
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 -mt-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, role, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
              />
            </div>
            
            {/* Filter Dropdown */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="pl-12 pr-10 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-white appearance-none cursor-pointer"
              >
                {roles.map((role, idx) => (
                  <option key={idx} value={role}>
                    {role === 'all' ? 'All Roles' : role}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-md">
            <Users className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800 dark:text-white">{membersData.length}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Members</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-md">
            <UserPlus className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800 dark:text-white">12</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Joined This Month</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-md">
            <Award className="w-6 h-6 text-amber-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800 dark:text-white">24+</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Achievements</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-md">
            <Globe className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800 dark:text-white">8+</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Cities</div>
          </div>
        </div>
      </div>

      {/* Members Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredMembers.map((member) => (
            <MemberCard key={member.id} member={member} onClick={setSelectedMember} />
          ))}
        </div>

        {/* No Results Message */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No members found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search or filter</p>
          </div>
        )}
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <MemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-gray-400 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-6">
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Members</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
          <p>&copy; 2025 Events Hub. All rights reserved.</p>
          <p className="text-sm mt-2">Building a stronger community together</p>
        </div>
      </footer>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(20px) translateX(-10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.05; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(1.05); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 10s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards !important;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default MembersPage;