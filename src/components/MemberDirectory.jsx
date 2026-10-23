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
import HeroProp from "./HeroProp";

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
      image:
        "https://ik.imagekit.io/4j8cdjgsk/1.jpeg",
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
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777554338/WhatsApp_Image_2026-04-30_at_7.03.55_PM_1_k4jj6y.jpg",
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
      image:
        "https://ik.imagekit.io/4j8cdjgsk/Muh-%20Anyath%20ullah(%20Bablu)%20%20Founding%20Member%20%20Member%20No--%209.jpeg",
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
      image:
        "https://ik.imagekit.io/4j8cdjgsk/ariful.jpeg",
      social: { linkedin: "#", facebook: "#" },
    },
    {
      id: 5,
      name: "Gias Uddin",
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
      image:
        "https://ik.imagekit.io/4j8cdjgsk/Member%20no%2015%20Gias%20Uddin.jpeg",
      social: { linkedin: "#", facebook: "#" },
    },
    {
      id: 6,
      name: "Zahidul Islam Jahid",
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
      image:
        "https://ik.imagekit.io/4j8cdjgsk/Md.Zahidul%20Islam%20Jahid,%20.jpeg",
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
      image:
        "https://ik.imagekit.io/4j8cdjgsk/Monoj%20Roy.jpeg",
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
      image: "https://ik.imagekit.io/4j8cdjgsk/20.jpeg",
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
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777554797/WhatsApp_Image_2026-04-30_at_7.12.38_PM_l7ypn7.jpg",
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
      image:
        "https://ik.imagekit.io/4j8cdjgsk/Founder%20member%20no-29.jpeg",
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
        "https://ik.imagekit.io/4j8cdjgsk/WhatsApp%20Image%202026-10-22%20at%2023.51.51.jpeg",
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
        "https://ik.imagekit.io/4j8cdjgsk/WhatsApp%20Image%202026-10-22%20at%2023.51.47.jpeg",
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
        "https://ik.imagekit.io/4j8cdjgsk/1.jpeg",
      bio: "Founding member and tech entrepreneur passionate about community building.",
    },
    {
      id: 102,
      name: "Tahmina Akter",
      memberType: "Founding Member",
      memberId: "RPM-FND-002",
      email: "TahminaAkter@raipurian.com",
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
      name: "Md Zahidul Islam Jahid",
      memberType: "Founding Member",
      memberId: "RPM-FND-003",
      email: "grameenbta@gmail.com",
      phone: "+88 01712323082",
      location: "Raipur",
      profession: "Business",
      joinedDate: "2026",
      image:
        "https://ik.imagekit.io/4j8cdjgsk/Md.Zahidul%20Islam%20Jahid,%20.jpeg",
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
        "https://ik.imagekit.io/4j8cdjgsk/ariful.jpeg",
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
        "https://ik.imagekit.io/4j8cdjgsk/05.jpeg",
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
        "https://ik.imagekit.io/4j8cdjgsk/Kamrul%20Al%20Mamun%20%E0%A6%95%E0%A6%BE%E0%A6%AE%E0%A6%B0%E0%A7%81%E0%A6%B2%20%E0%A6%86%E0%A6%B2%20%E0%A6%AE%E0%A6%BE%E0%A6%AE%E0%A7%81%E0%A6%A8.jpeg",
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
        "https://ik.imagekit.io/4j8cdjgsk/07.jpeg",
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
        "https://ik.imagekit.io/4j8cdjgsk/Abdul%20Kaiyum%20%E0%A6%86%E0%A6%AC%E0%A6%A6%E0%A7%81%E0%A6%B2%20%E0%A6%95%E0%A6%BE%E0%A6%87%E0%A6%AF%E0%A6%BC%E0%A7%81%E0%A6%AE.jpeg",
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
        "https://ik.imagekit.io/4j8cdjgsk/Muh-%20Anyath%20ullah(%20Bablu)%20%20Founding%20Member%20%20Member%20No--%209.jpeg",
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
        "https://ik.imagekit.io/4j8cdjgsk/Monoj%20Roy.jpeg",
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
      image:
        "https://ik.imagekit.io/4j8cdjgsk/Uzzal%20Majumder%20%20Founding%20Member-%2011%20.jpeg",
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
        "https://ik.imagekit.io/4j8cdjgsk/12.jpeg",
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
        "https://ik.imagekit.io/4j8cdjgsk/Rashedun%20nabi%20Hasan.jpeg",
      bio: "Founding member and medical professional serving the community.",
    },
    {
      id: 114,
      name: "Md Ibrahim Khalil.",
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
        "https://ik.imagekit.io/4j8cdjgsk/Member%20no%2015%20Gias%20Uddin.jpeg",
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
        "https://ik.imagekit.io/4j8cdjgsk/Iqbal%20hossain%20(shohag).jpeg",
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
        "https://ik.imagekit.io/4j8cdjgsk/17.Md.%20Sharif%20Hossen.jpeg",
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
        "https://ik.imagekit.io/4j8cdjgsk/Md%20Jahangir%20Hossain%20%2018.jpeg",
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
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
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
        "https://ik.imagekit.io/4j8cdjgsk/20.jpeg",
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
        "https://ik.imagekit.io/4j8cdjgsk/Dr%20Mithun%20Chandra%20Banik%20Founding%20Member%20Membership%20No%2021.jpeg",
      bio: "Founding member and medical professional.",
    },
    {
      id: 122,
      name: "Md.Sarawar Amin (Sony)",
      memberType: "Founding Member",
      memberId: "RPM-FND-022",
      email: "sarawar@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://ik.imagekit.io/4j8cdjgsk/Founding%20Member%20-22.jpeg",
      bio: "Founding member dedicated to community development.",
    },
    {
      id: 123,
      name: "Md.Fathme Ali Xebin",
      memberType: "Founding Member",
      memberId: "RPM-FND-023",
      email: "fathme@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://ik.imagekit.io/4j8cdjgsk/Md%20.%20Fathme%20Ali%20Xebin.jpeg",
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
        "https://ik.imagekit.io/4j8cdjgsk/WhatsApp%20Image%202026-10-22%20at%2023.51.53%20(1).jpeg",
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
        "https://ik.imagekit.io/4j8cdjgsk/washim%20kobir.jpeg",
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
        "https://ik.imagekit.io/4j8cdjgsk/Md.%20Mohiuddin%20Repon.jpeg",
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
        "https://res.cloudinary.com/lb6go8ca/image/upload/v1785833090/WhatsApp_Image_2026-08-03_at_9.29.08_PM_vfmxju.jpg",
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
        "https://ik.imagekit.io/4j8cdjgsk/Founder%20member%20no-29.jpeg",
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
        "https://ik.imagekit.io/4j8cdjgsk/afzal31.jpeg",
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
      name: "Ayesha Begum",
      memberType: "Founding Member",
      memberId: "RPM-FND-034",
      email: "jafor@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image: "",
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
      image: "https://ik.imagekit.io/4j8cdjgsk/Md.%20Nesar%20Uddin%20%20Founder%20Member%20-%2035.jpeg",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 136,
      name: "Daraz Mahmud",
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
        "https://ik.imagekit.io/4j8cdjgsk/037.jpeg",
      bio: "Founding member committed to community development.",
    },
    {
      id: 138,
      name: "Mitu Akter",
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
        "https://ik.imagekit.io/4j8cdjgsk/WhatsApp%20Image%202026-10-22%20at%2023.49.16.jpeg",
      bio: "Founding member serving in Bangladesh Navy.",
    },
    {
      id: 140,
      name: "Md Shohel Hossen",
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
        "https://ik.imagekit.io/4j8cdjgsk/Md.Kawchar%20Alam%20Tawhid%20Founder%20member%20no%20-%2041%20.jpeg",
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
        "https://ik.imagekit.io/4j8cdjgsk/Members%20no-44.jpeg",
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
      name: "Nazmul Alam Moon",
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
        "https://ik.imagekit.io/4j8cdjgsk/Md%20Jahir%20Uddin%20bhuiyan%20%20Membership%20no%20-%2047.jpeg",
      bio: "Founding member actively involved in community initiatives.",
    },
    {
      id: 148,
      name: "Sayfa Sultana Isha",
      memberType: "Founding Member",
      memberId: "RPM-FND-048",
      email: "sayfa@raipurian.com",
      phone: "+88 01712323082",
      location: "Raipur",
      profession: "House Wife",
      joinedDate: "2026",
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
        "https://ik.imagekit.io/4j8cdjgsk/WhatsApp%20Image%202026-10-22%20at%2023.51.52.jpeg",
      bio: "Founding member dedicated to community welfare.",
    },
    {
      id: 151,
      name: "Anjuman Ara Begum",
      memberType: "Founding Member",
      memberId: "RPM-FND-051",
      email: "santa@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://ik.imagekit.io/4j8cdjgsk/ANZUMAN%20ARA%20BEGUM%20Founder%20member%20no%20-%2051%20.jpeg",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 152,
      name: "Iqbal Hossain",
      memberType: "Founding Member",
      memberId: "RPM-FND-052",
      email: "iqbal.bank@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Banker",
      joinedDate: "2020",
      image:
        "https://ik.imagekit.io/4j8cdjgsk/Founder%20Membership%20No%20-%2052%20.jpeg",
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
        "https://ik.imagekit.io/4j8cdjgsk/Ibrahim%20khan%20%20Founding%20member%2053.jpeg",
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
        "https://ik.imagekit.io/4j8cdjgsk/FM%2054%20Rumman.jpeg",
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
        "https://ik.imagekit.io/4j8cdjgsk/55.jpeg",
      bio: "Founding member dedicated to community service.",
    },
    {
      id: 156,
      name: "GM Morshed (Ploash)",
      memberType: "Founding Member",
      memberId: "RPM-FND-056",
      email: "morshed@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "United Kingdom",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://ik.imagekit.io/4j8cdjgsk/56.jpeg",
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
        "https://ik.imagekit.io/4j8cdjgsk/md%20zakir.jpeg",
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
        "https://ik.imagekit.io/4j8cdjgsk/Name%20-%20Shahadat%20Hossain%20Choyon%20Founder%20member%20-%2058%20.jpeg",
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
        "https://ik.imagekit.io/4j8cdjgsk/Founder%20member%20no%20-%2060%20.jpeg",
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
        "",   
      bio: "Founding member passionate about community service.",
    },
    {
      id: 162,
      name: "Md Murad Hossain",
      memberType: "Founding Member",
      memberId: "RPM-FND-062",
      email: "Murad@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "",
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
      name: "Mazharul Islam",
      memberType: "Founding Member",
      memberId: "RPM-FND-064",
      email: "bhuiyan@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://ik.imagekit.io/4j8cdjgsk/WhatsApp%20Image%202026-10-22%20at%2023.49.14.jpeg",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 165,
      name: "Altaf Hossain Bhuiyan",
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
        "https://ik.imagekit.io/4j8cdjgsk/FM+66.jpeg",
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
      image: "https://ik.imagekit.io/4j8cdjgsk/WhatsApp%20Image%202026-10-22%20at%2023.49.21.jpeg",
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
      image: "",
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
      image: "",
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
      image: "",
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
      image: "https://ik.imagekit.io/4j8cdjgsk/Founder%20Membership%20no-71%20.jpeg",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 172,
      name: "Md Rasel Raihan",
      memberType: "Founding Member",
      memberId: "RPM-FND-072",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image: "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 173,
      name: "Md.Faruq Pathan",
      memberType: "Founding Member",
      memberId: "RPM-FND-073",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image: "https://ik.imagekit.io/4j8cdjgsk/73.jpeg",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 174,
      name: "Aznad Hossain (Moon)",
      memberType: "Founding Member",
      memberId: "RPM-FND-074",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image: "https://res.cloudinary.com/lb6go8ca/image/upload/v1787755765/ui1ac9ainx7ju2m79ehh.jpg",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 175,
      name: "MD.Sha Alam",
      memberType: "Founding Member",
      memberId: "RPM-FND-075",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image: "https://res.cloudinary.com/lb6go8ca/image/upload/v1787927890/WhatsApp_Image_2026-08-27_at_01.23.02_i6yrk4.jpg",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 176,
      name: "Md Kamal Uddin",
      memberType: "Founding Member",
      memberId: "RPM-FND-076",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image: "",
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
      image: "",
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
      image: "",
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
      image: "https://ik.imagekit.io/4j8cdjgsk/79.jpeg",
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
      image: "https://ik.imagekit.io/4j8cdjgsk/WhatsApp%20Image%202026-08-26%20at%2021.08.52.jpeg",
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
      image: "https://res.cloudinary.com/lb6go8ca/image/upload/v1787928009/WhatsApp_Image_2026-08-26_at_21.06.47_vdzolh.jpg",
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
      image: "https://ik.imagekit.io/4j8cdjgsk/Nishan%20Bhuiyan.%20Founder%20membership%20no%2082.jpeg",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 183,
      name: "MD NAZMUL ISLAM SUMON",
      memberType: "Founding Member",
      memberId: "RPM-FND-083",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://ik.imagekit.io/4j8cdjgsk/MD%20NAZMUL%20ISLAM%20SUMON%20::%20Founding%20member%20_%2083.jpeg",
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
      image: "https://ik.imagekit.io/4j8cdjgsk/Founder%20Membership%20No%20-%2084%20.jpeg",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 185,
      name: "Monir Hossain Sumon",
      memberType: "Founding Member",
      memberId: "RPM-FND-085",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image: "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 186,
      name: "S. H. Tipu",
      memberType: "Founding Member",
      memberId: "RPM-FND-086",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image: "https://res.cloudinary.com/lb6go8ca/image/upload/v1787928008/WhatsApp_Image_2026-08-26_at_21.06.36_lpe3gu.jpg",
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
      image: "",
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
      image: "",
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
      image: "https://ik.imagekit.io/4j8cdjgsk/Hasanul%20Sanjid%20Founder%20member%20-%2089%20.jpeg",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 190,
      name: "Tanzil Hossain",
      memberType: "Founding Member",
      memberId: "RPM-FND-090",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image: "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 191,
      name: "Zia Ullah Mamun",
      memberType: "Founding Member",
      memberId: "RPM-FND-091",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image: "https://ik.imagekit.io/4j8cdjgsk/Founder%20member%20-%2091%20.jpeg",
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
      image: "https://ik.imagekit.io/4j8cdjgsk/Altaf%20Hossain%20Bhuiyan%20%20Batch--92%20.jpeg",
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
      image: "",
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
      image: "https://ik.imagekit.io/4j8cdjgsk/Abdul%20Kader,%20Member%20No.%2094.jpeg",
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
      image: "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 196,
      name: "Billal Hossain Rabbi",
      memberType: "Founding Member",
      memberId: "RPM-FND-096",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image: "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 197,
      name: "Md Mohaiman",
      memberType: "Founding Member",
      memberId: "RPM-FND-097",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image: "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 198,
      name: "Md Robiul Ahsan",
      memberType: "Founding Member",
      memberId: "RPM-FND-098",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image: "",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 199,
      name: "Md Kamruzzaman",
      memberType: "Founding Member",
      memberId: "RPM-FND-099",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/lb6go8ca/image/upload/v1785833090/WhatsApp_Image_2026-08-03_at_9.04.43_PM_emg2ei.jpg",
      bio: "Founding member passionate about community service.",
    },
    {
      id: 100,
      name: "Md Jafor Ahammad",
      memberType: "Founding Member",
      memberId: "RPM-FND-100",
      email: "example@raipurian.com",
      phone: "+88 017XXXXXXXX",
      location: "Raipur",
      profession: "Professional",
      joinedDate: "2020",
      image:
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777554797/WhatsApp_Image_2026-04-30_at_7.12.38_PM_l7ypn7.jpg",
      bio: "Founding member passionate about community service.",
    },
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
    <section className="relative min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float-reverse"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section - Full Width */}
        <HeroProp
          title="Our Community"
          heading1="Member"
          heading2="Directory"
          content="Meet the incredible individuals shaping our community's future"
          Icon={Users}
        />

        {/* Content Container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                    Donor Members
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

          {/* Member Sections */}
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