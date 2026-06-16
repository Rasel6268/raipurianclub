// components/MemberDirectory.js
"use client";
import { useState, useEffect } from "react";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Crown,
  Filter,
  Search,
  SearchXIcon,
  Star,
  Trophy,
  Users,
  Award,
  Sparkles,
  Heart,
  Gift,
  HandHeart,
} from "lucide-react";
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

  // Managing Members Data (Leadership Team)
  const managingMembers = [
    {
      id: 1,
      name: "Md Zabed Hossain",
      position: "Convener",
      memberType: "Managing Member",
      memberId: "RPM-M-001",
      email: "zabed@raipurian.com",
      phone: "+8801XXXXXXXXX",
      location: "Raipur, Lakshmipur",
      company: "Raipurian Club",
      profession: "Tech Entrepreneur",
      joinedDate: "2024",
      interests: ["Leadership", "Tech", "Community"],
      contributions: ["Core Leadership", "Strategy Planning"],
      achievements: ["Managing Committee Lead"],
      bio: "Convener of the managing committee, leading strategic direction and operations.",
      image: "https://res.cloudinary.com/doumlnejx/image/upload/v1777464001/WhatsApp_Image_2026-04-29_at_5.44.28_PM_cvmbsf.jpg",
      social: { linkedin: "#", facebook: "#" },
    },
    {
      id: 2,
      name: "Miraj Muktadir",
      position: "Chief Coordinator",
      memberType: "Managing Member",
      memberId: "RPM-M-002",
      email: "miraj@raipurian.com",
      phone: "+8801XXXXXXXXX",
      location: "Raipur, Lakshmipur",
      company: "Raipurian Club",
      profession: "Coordinator",
      joinedDate: "2024",
      interests: ["Management", "Events"],
      contributions: ["Event Management", "Operations"],
      achievements: ["Outstanding Coordinator"],
      bio: "Handles coordination of events and internal operations.",
      image: "https://res.cloudinary.com/doumlnejx/image/upload/v1777554338/WhatsApp_Image_2026-04-30_at_7.03.55_PM_1_k4jj6y.jpg",
      social: { linkedin: "#", facebook: "#" },
    },
    {
      id: 3,
      name: "Emayetullah Bablu",
      position: "Assistant Chief Coordinator",
      memberType: "Managing Member",
      memberId: "RPM-M-003",
      email: "bablu@raipurian.com",
      phone: "+8801XXXXXXXXX",
      location: "Raipur, Lakshmipur",
      company: "Raipurian Club",
      profession: "Assistant Coordinator",
      joinedDate: "2024",
      interests: ["Teamwork", "Planning"],
      contributions: ["Support Operations"],
      achievements: ["Active Committee Member"],
      bio: "Supports coordination and ensures smooth execution of activities.",
      image: "https://res.cloudinary.com/doumlnejx/image/upload/v1777616787/WhatsApp_Image_2026-05-01_at_12.04.06_PM_vhdkwc.jpg",
      social: { linkedin: "#", facebook: "#" },
    },
    {
      id: 4,
      name: "Ariful Alam",
      position: "Member",
      memberType: "Managing Member",
      memberId: "RPM-M-004",
      email: "ariful@raipurian.com",
      phone: "+8801XXXXXXXXX",
      location: "Raipur, Lakshmipur",
      company: "Raipurian Club",
      profession: "Member",
      joinedDate: "2024",
      interests: ["Community Service"],
      contributions: ["Committee Support"],
      achievements: ["Managing Member Recognition"],
      bio: "Active member of the managing committee contributing to initiatives.",
      image: "https://res.cloudinary.com/doumlnejx/image/upload/v1777554336/WhatsApp_Image_2026-04-30_at_7.04.24_PM_ixr5wy.jpg",
      social: { linkedin: "#", facebook: "#" },
    },
    {
      id: 5,
      name: "Gias Miaji",
      position: "Member",
      memberType: "Managing Member",
      memberId: "RPM-M-005",
      email: "gias@raipurian.com",
      phone: "+8801XXXXXXXXX",
      location: "Raipur, Lakshmipur",
      company: "Raipurian Club",
      profession: "Member",
      joinedDate: "2024",
      interests: ["Social Work"],
      contributions: ["Community Activities"],
      achievements: ["Active Member"],
      bio: "Supports community-focused programs and initiatives.",
      image: "https://res.cloudinary.com/doumlnejx/image/upload/v1777616958/WhatsApp_Image_2026-05-01_at_12.09.49_PM_p9ajox.jpg",
      social: { linkedin: "#", facebook: "#" },
    },
    {
      id: 6,
      name: "Jahidul Islam Zahid",
      position: "Member",
      memberType: "Managing Member",
      memberId: "RPM-M-006",
      email: "zahid@raipurian.com",
      phone: "+8801XXXXXXXXX",
      location: "Raipur, Lakshmipur",
      company: "Raipurian Club",
      profession: "Member",
      joinedDate: "2024",
      interests: ["Networking"],
      contributions: ["Team Collaboration"],
      achievements: ["Dedicated Member"],
      bio: "Contributes to team collaboration and club development.",
      image: "https://via.placeholder.com/300",
      social: { linkedin: "#", facebook: "#" },
    },
    {
      id: 7,
      name: "Monoj Roy",
      position: "Member",
      memberType: "Managing Member",
      memberId: "RPM-M-007",
      email: "monoj@raipurian.com",
      phone: "+8801XXXXXXXXX",
      location: "Raipur, Lakshmipur",
      company: "Raipurian Club",
      profession: "Member",
      joinedDate: "2024",
      interests: ["Culture", "Events"],
      contributions: ["Event Participation"],
      achievements: ["Committee Member"],
      bio: "Actively participates in organizing cultural and social events.",
      image: "https://res.cloudinary.com/doumlnejx/image/upload/v1777615406/10_oasrak.jpg",
      social: { linkedin: "#", facebook: "#" },
    },
    {
      id: 8,
      name: "Rabiul Islam Rubel",
      position: "Member",
      memberType: "Managing Member",
      memberId: "RPM-M-008",
      email: "rubel@raipurian.com",
      phone: "+8801XXXXXXXXX",
      location: "Raipur, Lakshmipur",
      company: "Raipurian Club",
      profession: "Member",
      joinedDate: "2024",
      interests: ["Community Work"],
      contributions: ["Support Team"],
      achievements: ["Active Contributor"],
      bio: "Supports various managing committee operations.",
      image: "https://via.placeholder.com/300",
      social: { linkedin: "#", facebook: "#" },
    },
    {
      id: 9,
      name: "Jafor Ahammad",
      position: "Member",
      memberType: "Managing Member",
      memberId: "RPM-M-009",
      email: "jafor@raipurian.com",
      phone: "+8801XXXXXXXXX",
      location: "Raipur, Lakshmipur",
      company: "Raipurian Club",
      profession: "Member",
      joinedDate: "2024",
      interests: ["Volunteer Work"],
      contributions: ["Community Engagement"],
      achievements: ["Team Player"],
      bio: "Engaged in community development and volunteer activities.",
      image: "https://res.cloudinary.com/doumlnejx/image/upload/v1777554797/WhatsApp_Image_2026-04-30_at_7.12.38_PM_l7ypn7.jpg",
      social: { linkedin: "#", facebook: "#" },
    },
    {
      id: 10,
      name: "Azharul Islam",
      position: "Member",
      memberType: "Managing Member",
      memberId: "RPM-M-010",
      email: "azharul@raipurian.com",
      phone: "+8801XXXXXXXXX",
      location: "Raipur, Lakshmipur",
      company: "Raipurian Club",
      profession: "Member",
      joinedDate: "2024",
      interests: ["Social Impact"],
      contributions: ["Committee Support"],
      achievements: ["Active Member"],
      bio: "Contributes to club success through active involvement.",
      image: "https://res.cloudinary.com/doumlnejx/image/upload/v1777625882/WhatsApp_Image_2026-05-01_at_12.42.58_PM_qzx8fd.jpg",
      social: { linkedin: "#", facebook: "#" },
    },
  ];

  // Patron Members (Honorary/Advisory Members)
  const patronMembers = [
    {
      id: 301,
      name: "Lion Md Zahirul Islam",
      title: "Chief Patron",
      memberType: "Patron Member",
      memberId: "RPM-PAT-001",
      email: "zahirul@raipurian.com",
      phone: "+8801XXXXXXXXX",
      location: "Raipur, Lakshmipur",
      company: "Raipurian Club",
      profession: "Philanthropist & Social Leader",
      joinedDate: "2024",
      interests: ["Education", "Community Development", "Social Welfare"],
      contributions: ["Chief Patron", "Major Donor", "Advisory Support"],
      achievements: [
        "Lifetime Contribution Award",
        "Community Leadership Recognition",
      ],
      bio: "Respected community leader and chief patron of Raipurian Club, supporting social development and youth initiatives.",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777624345/WhatsApp_Image_2026-05-01_at_12.51.33_PM_feykab.jpg",
      social: { linkedin: "#", facebook: "#", website: "#" },
    },
  ];

  // Donor Members (Financial Contributors)
  const donorMembers = [
    {
      id: 1,
      name: "Md Billal Hossain",
      memberType: "Donor Member",
      donorLevel: "Platinum Donor",
      memberId: "RPM-DON-001",
      email: "example@gmail.com",
      phone: "+88 01822999001",
      location: "Telibandha, Raipur",
      company: "Khandelwal Industries",
      profession: "Industrialist",
      joinedDate: "2021",
      totalDonation: "",
      interests: ["Infrastructure", "Education", "Healthcare"],
      contributions: ["School Building Donor", "Medical Camp Sponsor"],
      achievements: [
        "Platinum Donor Recognition 2024",
        "Community Champion Award",
      ],
      bio: "Industrialist committed to community development through strategic donations.",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777613449/WhatsApp_Image_2026-05-01_at_11.11.25_AM_elv7ef.jpg",
      social: { linkedin: "#", website: "#" },
    },
  ];

  // Founding Members Data
  const foundingMembers = [
    {
      id: 101,
      name: "Md Zabed Hossain",
      memberType: "Founding Member",
      memberId: "RPM-FND-001",
      email: "zabed@raipurian.com",
      phone: "+88 01760208702",
      location: "Raipur",
      profession: "Tech Entrepreneur",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777464001/WhatsApp_Image_2026-04-29_at_5.44.28_PM_cvmbsf.jpg",
      bio: "Founding member and tech entrepreneur passionate about community building.",
    },
    {
      id: 102,
      name: "Miraz Moqetader",
      memberType: "Founding Member",
      memberId: "RPM-FND-002",
      email: "miraz@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Creative Designer",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777554338/WhatsApp_Image_2026-04-30_at_7.03.55_PM_1_k4jj6y.jpg",
      bio: "Founding member and creative designer behind Raipurian's brand identity.",
    },
    {
      id: 103,
      name: "Zahidul Islam Jahid",
      memberType: "Founding Member",
      memberId: "RPM-FND-003",
      email: "jahid@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Healthcare Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777554337/WhatsApp_Image_2026-04-30_at_7.04.15_PM_ojkb8c.jpg",
      bio: "Founding member dedicated to community healthcare initiatives.",
    },
    {
      id: 104,
      name: "Ariful Alam",
      memberType: "Founding Member",
      memberId: "RPM-FND-004",
      email: "ariful@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Businessman",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777554336/WhatsApp_Image_2026-04-30_at_7.04.24_PM_ixr5wy.jpg",
      bio: "Founding member and business leader contributing to community development.",
    },
    {
      id: 105,
      name: "Md. Ehsanul Hoque",
      memberType: "Founding Member",
      memberId: "RPM-FND-005",
      email: "ehsanul@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member committed to community welfare.",
    },
    {
      id: 106,
      name: "Kamrul Al Mamun",
      memberType: "Founding Member",
      memberId: "RPM-FND-006",
      email: "kamrul@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Entrepreneur",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777554336/WhatsApp_Image_2026-04-30_at_7.05.07_PM_lb346o.jpg",
      bio: "Founding member and entrepreneur driving innovation.",
    },
    {
      id: 107,
      name: "Saiful Islam Patowary",
      memberType: "Founding Member",
      memberId: "RPM-FND-007",
      email: "murad@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777806947/WhatsApp_Image_2026-05-02_at_9.28.22_PM_an9gku.jpg",
      bio: "Founding member actively involved in community activities.",
    },
    {
      id: 108,
      name: "Abdul Kaiyum (Tushar)",
      memberType: "Founding Member",
      memberId: "RPM-FND-008",
      email: "tushar@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777617164/WhatsApp_Image_2026-05-01_at_12.11.57_PM_qaqunh.jpg",
      bio: "Founding member dedicated to community service.",
    },
    {
      id: 109,
      name: "Enayet Ullah Bablu",
      memberType: "Founding Member",
      memberId: "RPM-FND-009",
      email: "bablu@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777616787/WhatsApp_Image_2026-05-01_at_12.04.06_PM_vhdkwc.jpg",
      bio: "Founding member contributing to community growth.",
    },
    {
      id: 110,
      name: "Monoj Roy",
      memberType: "Founding Member",
      memberId: "RPM-FND-010",
      email: "monoj@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777615406/10_oasrak.jpg",
      bio: "Founding member passionate about community building.",
    },
    {
      id: 111,
      name: "Uzzal Majumder",
      memberType: "Founding Member",
      memberId: "RPM-FND-011",
      email: "uzzal@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member actively involved in community initiatives.",
    },
    {
      id: 112,
      name: "Harun or Rashid",
      memberType: "Founding Member",
      memberId: "RPM-FND-012",
      email: "hero@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777616855/WhatsApp_Image_2026-05-01_at_12.08.57_PM_y1ksor.jpg",
      bio: "Founding member with SSC 91 batch.",
    },
    {
      id: 113,
      name: "Dr Rashedun Nabi Hasan",
      memberType: "Founding Member",
      memberId: "RPM-FND-013",
      email: "dr.rashedun@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Medical Doctor",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777615406/13_w5xzpz.jpg",
      bio: "Founding member and medical professional serving the community.",
    },
    {
      id: 114,
      name: "Md. Ibrahim",
      memberType: "Founding Member",
      memberId: "RPM-FND-014",
      email: "ibrahim@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777615406/14_k0cwdc.jpg",
      bio: "Founding member from SSC 91 batch.",
    },
    {
      id: 115,
      name: "Gias Uddin",
      memberType: "Founding Member",
      memberId: "RPM-FND-015",
      email: "gias@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777616958/WhatsApp_Image_2026-05-01_at_12.09.49_PM_p9ajox.jpg",
      bio: "Founding member committed to community development.",
    },
    {
      id: 116,
      name: "Iqbal Hossain (Shohag Gazi)",
      memberType: "Founding Member",
      memberId: "RPM-FND-016",
      email: "iqbal.shohag@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777615406/16_vvkyem.jpg",
      bio: "Founding member actively involved in community activities.",
    },
    {
      id: 117,
      name: "Sharif Hossen",
      memberType: "Founding Member",
      memberId: "RPM-FND-017",
      email: "sharif@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777615407/17_xjikya.jpg",
      bio: "Founding member dedicated to community welfare.",
    },
    {
      id: 118,
      name: "Jahangir",
      memberType: "Founding Member",
      memberId: "RPM-FND-018",
      email: "jahangir@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Police Inspector",
      joinedDate: "2020",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member serving in law enforcement.",
    },
    {
      id: 119,
      name: "Md Billal Hossain (Mintu)",
      memberType: "Founding Member",
      memberId: "RPM-FND-019",
      email: "billal@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member contributing to community initiatives.",
    },
    {
      id: 120,
      name: "Rabiul Islam (Rubel)",
      memberType: "Founding Member",
      memberId: "RPM-FND-020",
      email: "rabiul@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 121,
      name: "Dr Mithun Banik",
      memberType: "Founding Member",
      memberId: "RPM-FND-021",
      email: "dr.mithun@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Medical Doctor",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1780516770/WhatsApp_Image_2026-05-11_at_9.17.09_AM_gl3z4o.jpg",
      bio: "Founding member and medical professional.",
    },
    {
      id: 122,
      name: "Md. Sarawar Amin (Sony)",
      memberType: "Founding Member",
      memberId: "RPM-FND-022",
      email: "sarawar@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member dedicated to community development.",
    },
    {
      id: 123,
      name: "Md Fathme Ali (Xebeen)",
      memberType: "Founding Member",
      memberId: "RPM-FND-023",
      email: "fathme@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member actively involved in community activities.",
    },
    {
      id: 124,
      name: "Md Mehedi Hasan (Zion)",
      memberType: "Founding Member",
      memberId: "RPM-FND-024",
      email: "mehedi@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member contributing to community growth.",
    },
    {
      id: 125,
      name: "Wshim Kabir Sumon",
      memberType: "Founding Member",
      memberId: "RPM-FND-025",
      email: "washim@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777615406/25_kimlsb.jpg",
      bio: "Founding member committed to community service.",
    },
    {
      id: 126,
      name: "Md. Mohiuddin Repon",
      memberType: "Founding Member",
      memberId: "RPM-FND-026",
      email: "repon@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member dedicated to community welfare.",
    },
    {
      id: 127,
      name: "Tanzir Hossen Hemal",
      memberType: "Founding Member",
      memberId: "RPM-FND-027",
      email: "hemal@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777615406/27_gvnfcm.jpg",
      bio: "Founding member passionate about community building.",
    },
    {
      id: 128,
      name: "Md Forhad Hossain",
      memberType: "Founding Member",
      memberId: "RPM-FND-028",
      email: "forhad@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777616720/WhatsApp_Image_2026-05-01_at_12.03.07_PM_p0s0rq.jpg",
      bio: "Founding member actively involved in community initiatives.",
    },
    {
      id: 129,
      name: "Azharul Islam",
      memberType: "Founding Member",
      memberId: "RPM-FND-029",
      email: "azharul@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777625882/WhatsApp_Image_2026-05-01_at_12.42.58_PM_qzx8fd.jpg",
      bio: "Founding member contributing to community development.",
    },
    {
      id: 130,
      name: "Md Tarek Hossain",
      memberType: "Founding Member",
      memberId: "RPM-FND-030",
      email: "tarek@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member dedicated to community service.",
    },
    {
      id: 131,
      name: "Afzal khan Mohsin",
      memberType: "Founding Member",
      memberId: "RPM-FND-031",
      email: "afzal@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member committed to community growth.",
    },
    {
      id: 132,
      name: "Dr Shojol",
      memberType: "Founding Member",
      memberId: "RPM-FND-032",
      email: "dr.shojol@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Medical Doctor",
      joinedDate: "2020",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member and medical professional.",
    },
    {
      id: 133,
      name: "Syed Nazrul Islam Polen",
      memberType: "Founding Member",
      memberId: "RPM-FND-033",
      email: "polen@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777617075/WhatsApp_Image_2026-05-01_at_12.10.47_PM_tsk0gj.jpg",
      bio: "Founding member actively involved in community activities.",
    },
    {
      id: 134,
      name: "Md Jafor Ahammad",
      memberType: "Founding Member",
      memberId: "RPM-FND-034",
      email: "jafor@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777554797/WhatsApp_Image_2026-04-30_at_7.12.38_PM_l7ypn7.jpg",
      bio: "Founding member dedicated to community welfare.",
    },
    {
      id: 135,
      name: "Md Nesar Uddin",
      memberType: "Founding Member",
      memberId: "RPM-FND-035",
      email: "nesar@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 136,
      name: "Babor",
      memberType: "Founding Member",
      memberId: "RPM-FND-036",
      email: "babor@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member contributing to community initiatives.",
    },
    {
      id: 137,
      name: "Humayun Kabir Liton",
      memberType: "Founding Member",
      memberId: "RPM-FND-037",
      email: "liton@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member committed to community development.",
    },
    {
      id: 138,
      name: "Masud (Milestone)",
      memberType: "Founding Member",
      memberId: "RPM-FND-038",
      email: "masud@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member dedicated to community service.",
    },
    {
      id: 139,
      name: "Lt Commander Farhana (Eline)",
      memberType: "Founding Member",
      memberId: "RPM-FND-039",
      email: "farhana@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Navy Officer",
      joinedDate: "2020",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member serving in Bangladesh Navy.",
    },
    {
      id: 140,
      name: "Md Shohel Hossen (Portugal)",
      memberType: "Founding Member",
      memberId: "RPM-FND-040",
      email: "shohel@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Portugal",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member based in Portugal.",
    },
    {
      id: 141,
      name: "Kawsar Alam Tawhid",
      memberType: "Founding Member",
      memberId: "RPM-FND-041",
      email: "tawhid@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777617370/WhatsApp_Image_2026-05-01_at_12.18.19_PM_afze6x.jpg",
      bio: "Founding member actively involved in community activities.",
    },
    {
      id: 142,
      name: "Barrister Toriqul Islam Sachal",
      memberType: "Founding Member",
      memberId: "RPM-FND-042",
      email: "sachal@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Barrister",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777615407/42_dkfhvc.jpg",
      bio: "Founding member and legal professional.",
    },
    {
      id: 143,
      name: "Tanvir Kamal",
      memberType: "Founding Member",
      memberId: "RPM-FND-043",
      email: "tanvir@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777617321/WhatsApp_Image_2026-05-01_at_12.16.13_PM_p9zevw.jpg",
      bio: "Founding member dedicated to community welfare.",
    },
    {
      id: 144,
      name: "Jamiul Uddin Choyon",
      memberType: "Founding Member",
      memberId: "RPM-FND-044",
      email: "choyon@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Marine Engineer",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777625809/WhatsApp_Image_2026-05-01_at_2.12.47_PM_eu4g0l.jpg",
      bio: "Founding member and marine engineer.",
    },
    {
      id: 145,
      name: "Anwar Hossain Ringku (DS)",
      memberType: "Founding Member",
      memberId: "RPM-FND-045",
      email: "ringku@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member contributing to community growth.",
    },
    {
      id: 146,
      name: "Md Nure Alam Tareq (DS)",
      memberType: "Founding Member",
      memberId: "RPM-FND-046",
      email: "tareq@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member dedicated to community service.",
    },
    {
      id: 147,
      name: "Jahir Bhuiyan (Poran)",
      memberType: "Founding Member",
      memberId: "RPM-FND-047",
      email: "jahir@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777643241/WhatsApp_Image_2026-05-01_at_7.45.43_PM_giesa5.jpg",
      bio: "Founding member actively involved in community initiatives.",
    },
    {
      id: 148,
      name: "Sayfa Isha (Jahid)",
      memberType: "Founding Member",
      memberId: "RPM-FND-048",
      email: "sayfa@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member committed to community development.",
    },
    {
      id: 149,
      name: "Dr Mamunur Rashid",
      memberType: "Founding Member",
      memberId: "RPM-FND-049",
      email: "dr.mamun@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Medical Doctor",
      joinedDate: "2020",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member and medical professional.",
    },
    {
      id: 150,
      name: "Sulaiman Rubel",
      memberType: "Founding Member",
      memberId: "RPM-FND-050",
      email: "sulaiman@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member dedicated to community welfare.",
    },
    {
      id: 151,
      name: "Santa Hossain",
      memberType: "Founding Member",
      memberId: "RPM-FND-051",
      email: "santa@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 152,
      name: "Iqbal Hossain (Marcentile Bank)",
      memberType: "Founding Member",
      memberId: "RPM-FND-052",
      email: "iqbal.bank@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Banker",
      joinedDate: "2020",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member working in banking sector.",
    },
    {
      id: 153,
      name: "Ibrahim khan",
      memberType: "Founding Member",
      memberId: "RPM-FND-053",
      email: "ibrahim.khan@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member contributing to community initiatives.",
    },
    {
      id: 154,
      name: "Rumman",
      memberType: "Founding Member",
      memberId: "RPM-FND-054",
      email: "rumman@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member actively involved in community activities.",
    },
    {
      id: 155,
      name: "Siam Bin Zahirul",
      memberType: "Founding Member",
      memberId: "RPM-FND-055",
      email: "siam@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777627023/WhatsApp_Image_2026-05-01_at_12.52.59_PM_j4gaqx.jpg",
      bio: "Founding member dedicated to community service.",
    },
    {
      id: 156,
      name: "GM Morshed (Ploash Gazi-UK)",
      memberType: "Founding Member",
      memberId: "RPM-FND-056",
      email: "morshed@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "United Kingdom",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777615408/56_bmxbfw.jpg",
      bio: "Founding member based in United Kingdom.",
    },
    {
      id: 157,
      name: "Md Zakir Hossain",
      memberType: "Founding Member",
      memberId: "RPM-FND-057",
      email: "zakir@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Banker",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777617229/WhatsApp_Image_2026-05-01_at_12.13.46_PM_nwc7br.jpg",
      bio: "Founding member from SSC 91 batch working in banking.",
    },
    {
      id: 158,
      name: "Shahadat Hossain Choyon",
      memberType: "Founding Member",
      memberId: "RPM-FND-058",
      email: "shahadat@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member committed to community development.",
    },
    {
      id: 159,
      name: "Rubel",
      memberType: "Founding Member",
      memberId: "RPM-FND-059",
      email: "rubel@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2070&auto=format&fit=crop",
      bio: "Founding member dedicated to community welfare.",
    },
    {
      id: 160,
      name: "Md Russel Bepary",
      memberType: "Founding Member",
      memberId: "RPM-FND-060",
      email: "russel@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777625940/WhatsApp_Image_2026-05-01_at_2.13.08_PM_cqdhfh.jpg",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 161,
      name: "Sumona",
      memberType: "Founding Member",
      memberId: "RPM-FND-061",
      email: "Sumona@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1781343551/WhatsApp_Image_2026-05-04_at_11.33.23_AM_nqsixw.jpg",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 163,
      name: "Abdullah Al Mamun Chow.(HEERA)",
      memberType: "Founding Member",
      memberId: "RPM-FND-063",
      email: "abdullah@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777653678/WhatsApp_Image_2026-05-01_at_9.11.57_PM_lusp4a.jpg",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 164,
      name: "A B M Abu Yousuf Bhuiyan (Rubel)",
      memberType: "Founding Member",
      memberId: "RPM-FND-064",
      email: "bhuiyan@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777709637/WhatsApp_Image_2026-05-02_at_11.13.15_AM_vqyqc2.jpg",
      bio: "Founding member passionate about community service.",
    },
     {
      id: 165,
      name: "Daraz Mahmud",
      memberType: "Founding Member",
      memberId: "RPM-FND-065",
      email: "mahmud@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777709636/WhatsApp_Image_2026-05-02_at_11.30.24_AM_1_hjun0f.jpg",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 166,
      name: "Md Mahbub Alam Liton",
      memberType: "Founding Member",
      memberId: "RPM-FND-066",
      email: "liton@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1781354028/WhatsApp_Image_2026-06-13_at_6.32.09_PM_ualf0j.jpg",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 167,
      name: "Abul Kashem",
      memberType: "Founding Member",
      memberId: "RPM-FND-067",
      email: "kashem@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
      {
      id: 168,
      name: "Zahirul Islam",
      memberType: "Founding Member",
      memberId: "RPM-FND-068",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 169,
      name: "Sultan Mahmud",
      memberType: "Founding Member",
      memberId: "RPM-FND-069",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 170,
      name: "Jahid Hossain Jony",
      memberType: "Founding Member",
      memberId: "RPM-FND-070",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 171,
      name: "Motiul Islam Nahid",
      memberType: "Founding Member",
      memberId: "RPM-FND-071",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 172,
      name: "Rasel Raihan",
      memberType: "Founding Member",
      memberId: "RPM-FND-072",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 173,
      name: "Faruk Pathan",
      memberType: "Founding Member",
      memberId: "RPM-FND-073",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 174,
      name: "Mamun",
      memberType: "Founding Member",
      memberId: "RPM-FND-074",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 175,
      name: "Habibur Rahman Babul",
      memberType: "Founding Member",
      memberId: "RPM-FND-075",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 176,
      name: "Kamal Uddin",
      memberType: "Founding Member",
      memberId: "RPM-FND-076",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 177,
      name: "Kamrul Alam",
      memberType: "Founding Member",
      memberId: "RPM-FND-077",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 178,
      name: "Asiful Alam Jony",
      memberType: "Founding Member",
      memberId: "RPM-FND-078",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 179,
      name: "Mohammad Majharul Islam Jewel",
      memberType: "Founding Member",
      memberId: "RPM-FND-089",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 180,
      name: "Shah Ahmed Ripon",
      memberType: "Founding Member",
      memberId: "RPM-FND-080",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 181,
      name: "Md Mosleh Uddin Munna",
      memberType: "Founding Member",
      memberId: "RPM-FND-081",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 182,
      name: "Nishan Bhuiyan",
      memberType: "Founding Member",
      memberId: "RPM-FND-082",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 183,
      name: "Sumon",
      memberType: "Founding Member",
      memberId: "RPM-FND-083",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 184,
      name: "Md Zakaria  Nishan",
      memberType: "Founding Member",
      memberId: "RPM-FND-084",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 185,
      name: "Md Nur Ismail (Babu)",
      memberType: "Founding Member",
      memberId: "RPM-FND-085",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 186,
      name: "Akram Billah",
      memberType: "Founding Member",
      memberId: "RPM-FND-086",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 187,
      name: "Md Rubel",
      memberType: "Founding Member",
      memberId: "RPM-FND-087",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 188,
      name: "Hossain Md Mahmud Chy",
      memberType: "Founding Member",
      memberId: "RPM-FND-088",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 189,
      name: "Hasanul Sanjid",
      memberType: "Founding Member",
      memberId: "RPM-FND-089",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 190,
      name: "Noman Siddique Monju",
      memberType: "Founding Member",
      memberId: "RPM-FND-090",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 191,
      name: "Golam Mortuza Razu",
      memberType: "Founding Member",
      memberId: "RPM-FND-091",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 192,
      name: "Jahangir Alam",
      memberType: "Founding Member",
      memberId: "RPM-FND-092",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 193,
      name: "Bokul",
      memberType: "Founding Member",
      memberId: "RPM-FND-093",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 194,
      name: "Abdul Kader",
      memberType: "Founding Member",
      memberId: "RPM-FND-094",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 195,
      name: "Kausar Alam",
      memberType: "Founding Member",
      memberId: "RPM-FND-095",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 196,
      name: "Palash Chandra Paul",
      memberType: "Founding Member",
      memberId: "RPM-FND-096",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 197,
      name: "Md Zakaria  Nishan",
      memberType: "Founding Member",
      memberId: "RPM-FND-097",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 198,
      name: "Md Zakaria  Nishan",
      memberType: "Founding Member",
      memberId: "RPM-FND-098",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 199,
      name: "Md Zakaria  Nishan",
      memberType: "Founding Member",
      memberId: "RPM-FND-099",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:"",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 100,
      name: "Md Zakaria  Nishan",
      memberType: "Founding Member",
      memberId: "RPM-FND-069",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
      bio: "Founding member passionate about community service.",
    }

    //
  ];

  // General Members Data
  const generalMembers = [
    {
      id: 201,
      name: "Member Name",
      memberType: "General Member",
      memberId: "RPM-GEN-01",
      email: "Member Email",
      phone: "+88 018XXXXXXXX ",
      location: "Raipur",
      company: "XXXXXXX",
      profession: "XXXXXX",
      joinedDate: "2024",
      interests: ["Law", "Women Empowerment", "Debate"],
      contributions: ["Legal Aid Volunteer", "Youth Mentor"],
      bio: "Legal professional committed to providing free legal aid to underprivileged.",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2070&auto=format&fit=crop",
      social: { linkedin: "#", twitter: "#" },
    }
    
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

  const filteredManagingMembers = filterMembers(managingMembers);
  const filteredPatronMembers = filterMembers(patronMembers);
  const filteredDonorMembers = filterMembers(donorMembers);
  const filteredFoundingMembers = filterMembers(foundingMembers);
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
              <span className="relative z-10 bg-linear-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
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
              {showFilters ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
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
                  onClick={() => setSelectedCategory("patron")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === "patron"
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  Patron Members
                </button>
                <button
                  onClick={() => setSelectedCategory("donor")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === "donor"
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  Donner Members
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
                  onClick={() => setSelectedCategory("managing")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === "managing"
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  Managing Members
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

        <div className="mb-16">
          {/* Patron & Donor Members - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Patron Members Section */}
            {(selectedCategory === "all" || selectedCategory === "patron") &&
              filteredPatronMembers.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-linear-to-br from-amber-600 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
                      <Crown className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                        Patron Members
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Esteemed patrons & advisors
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {filteredPatronMembers.map((member) => (
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

            {/* Donor Members Section */}
            {(selectedCategory === "all" || selectedCategory === "donor") &&
              filteredDonorMembers.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                        Donor Members
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Generous contributors
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {filteredDonorMembers.map((member) => (
                      <FundingMemberCard
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
          </div>
        </div>

        {/* Founding Members Section */}
        {(selectedCategory === "all" || selectedCategory === "founding") &&
          filteredFoundingMembers.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    Founding Members
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    The visionaries who started it all
                  </p>
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

        {/* Managing Members Section */}
        {(selectedCategory === "all" || selectedCategory === "managing") &&
          filteredManagingMembers.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    Managing Members
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Leadership that drives our vision forward
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredManagingMembers.map((member) => (
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

        {/* General Members Section */}
        {(selectedCategory === "all" || selectedCategory === "general") &&
          filteredGeneralMembers.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
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
        {filteredPatronMembers.length === 0 &&
          filteredDonorMembers.length === 0 &&
          filteredManagingMembers.length === 0 &&
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
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        @keyframes float-reverse {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(20px) translateX(-10px);
          }
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
