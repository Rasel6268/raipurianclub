// app/projects/page.jsx
"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Waves,
  Heart,
  GraduationCap,
  Home,
  Droplets,
  AlertTriangle,
  Users,
  School,
  Briefcase,
  TrendingUp,
  Target,
  MapPin,
  Calendar,
  ArrowRight,
  CheckCircle,
  Shield,
  Activity,
  TreePine,
  HandHeart,
  BookOpen,
  Landmark,
  Baby,
  Utensils,
  Stethoscope,
  Flower2,
  Zap,
} from "lucide-react";
import HeroProp from "@/components/HeroProp";

// Raipur Specific Project Categories
const PROJECT_CATEGORIES = {
  river_erosion: {
    id: "river_erosion",
    title: "Riverbank Erosion Relief",
    subTitle: "নদীভাঙন প্রতিরোধ ও পুনর্বাসন",
    icon: Waves,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    gradient: "from-blue-600 to-cyan-600",
    description: "Protecting communities from Meghna river erosion and rehabilitating displaced families",
    problems: [
      "Houses destroyed by river erosion",
      "Schools washed away",
      "Agricultural land loss",
      "Mass displacement and migration",
      "Loss of income sources"
    ],
    solutions: [
      "Riverbank protection with geo-bags",
      "Relocation housing for displaced families",
      "Alternative livelihood programs",
      "Mobile schools for affected children"
    ],
    impact: "500+ families protected, 2000+ people rehabilitated",
    projects: [
      {
        id: 1,
        title: "Meghna Riverbank Protection",
        location: "Raipur & Ramganj, Lakshmipur",
        description: "Installing geo-bags and concrete blocks to prevent further river erosion along critical points",
        impact: "3 km riverbank protected",
        beneficiaries: "10,000+ people",
        status: "active",
        raised: 450000,
        goal: 1000000,
        volunteers: 150,
        startDate: "2024-01-15",
        endDate: "2025-12-31",
        image: "/images/river-protection.jpg",
        updates: [
          "1.5 km riverbank stabilized with geo-bags",
          "200 families relocated to safer areas",
          "Early warning system installed in 5 villages"
        ]
      },
      {
        id: 2,
        title: "Displaced Families Rehabilitation",
        location: "Erosion-prone areas, Raipur",
        description: "Providing permanent housing and livelihood support to families who lost homes to erosion",
        impact: "300+ houses rebuilt",
        beneficiaries: "1,500+ people",
        status: "active",
        raised: 280000,
        goal: 750000,
        volunteers: 80,
        startDate: "2024-03-01",
        endDate: "2025-06-30",
        image: "/images/housing-project.jpg",
        updates: [
          "150 houses completed and handed over",
          "Vocational training started for 200 adults",
          "Community center established"
        ]
      }
    ]
  },
  flood_relief: {
    id: "flood_relief",
    title: "Flood & Waterlogging Management",
    subTitle: "বন্যা ও জলাবদ্ধতা ব্যবস্থাপনা",
    icon: Droplets,
    color: "from-teal-500 to-emerald-500",
    bgColor: "bg-teal-50",
    gradient: "from-teal-600 to-emerald-600",
    description: "Combating annual flooding and waterlogging through infrastructure and preparedness",
    problems: [
      "Areas underwater for weeks",
      "Blocked canals and illegal dams",
      "Poor drainage system",
      "Crop damage and food shortage",
      "Waterborne diseases outbreak"
    ],
    solutions: [
      "Canal dredging and restoration",
      "Rainwater harvesting systems",
      "Early warning systems",
      "Flood-resilient crops and farming"
    ],
    impact: "50,000+ people protected from floods",
    projects: [
      {
        id: 3,
        title: "Canal Restoration Project",
        location: "Raipur, Lakshmipur Sadar",
        description: "Dredging blocked canals and removing illegal dams to restore natural water flow",
        impact: "25 km canals restored",
        beneficiaries: "30,000+ people",
        status: "active",
        raised: 350000,
        goal: 800000,
        volunteers: 200,
        startDate: "2024-02-01",
        endDate: "2025-03-31",
        image: "/images/canal-restoration.jpg",
        updates: [
          "15 km canals dredged successfully",
          "10 illegal dams removed",
          "Water flow restored to 20 villages"
        ]
      },
      {
        id: 4,
        title: "Flood Early Warning System",
        location: "Flood-prone areas, Raipur",
        description: "Installing community-based flood monitoring and warning systems",
        impact: "Reduced flood casualties by 70%",
        beneficiaries: "50,000+ people",
        status: "active",
        raised: 180000,
        goal: 400000,
        volunteers: 60,
        startDate: "2024-04-15",
        endDate: "2025-04-14",
        image: "/images/warning-system.jpg",
        updates: [
          "10 warning towers installed",
          "Community volunteers trained",
          "Mobile alert system launched"
        ]
      }
    ]
  },
  livelihood_poverty: {
    id: "livelihood_poverty",
    title: "Poverty Alleviation & Livelihood",
    subTitle: "দারিদ্র্য বিমোচন ও জীবিকা উন্নয়ন",
    icon: Heart,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    gradient: "from-orange-600 to-red-600",
    description: "Creating sustainable income opportunities and breaking the cycle of poverty",
    problems: [
      "Daily wage labor dependency",
      "Low and unstable income",
      "Poor housing conditions",
      "Malnutrition and food insecurity",
      "Child labor due to poverty"
    ],
    solutions: [
      "Skill development training",
      "Micro-enterprise support",
      "Agriculture innovation",
      "Food security programs"
    ],
    impact: "10,000+ families lifted from poverty",
    projects: [
      {
        id: 5,
        title: "Women Livelihood Development",
        location: "Raipur & Ramganj, Lakshmipur",
        description: "Training women in tailoring, poultry, and small business management with seed funding",
        impact: "2,000+ women entrepreneurs",
        beneficiaries: "10,000+ family members",
        status: "active",
        raised: 320000,
        goal: 600000,
        volunteers: 100,
        startDate: "2024-01-10",
        endDate: "2025-05-30",
        image: "/images/women-livelihood.jpg",
        updates: [
          "500 women trained in tailoring",
          "300 micro-businesses started",
          "Savings groups formed in 20 villages"
        ]
      },
      {
        id: 6,
        title: "Climate-Resilient Agriculture",
        location: "Agricultural areas, Raipur",
        description: "Introducing flood-resistant crops and modern farming techniques to displaced farmers",
        impact: "500+ farmers trained",
        beneficiaries: "2,500+ family members",
        status: "completed",
        raised: 250000,
        goal: 250000,
        volunteers: 45,
        startDate: "2023-08-01",
        endDate: "2024-06-30",
        image: "/images/agriculture.jpg",
        updates: [
          "Flood-resistant rice varieties distributed",
          "200 farmers using modern techniques",
          "Crop yield increased by 40%"
        ]
      },
      {
        id: 7,
        title: "Nutrition & Food Security",
        location: "Underserved communities, Raipur",
        description: "Establishing community kitchen gardens and nutrition awareness programs",
        impact: "Reduced malnutrition by 50%",
        beneficiaries: "5,000+ families",
        status: "active",
        raised: 150000,
        goal: 350000,
        volunteers: 80,
        startDate: "2024-05-01",
        endDate: "2025-04-30",
        image: "/images/nutrition.jpg",
        updates: [
          "1000 kitchen gardens established",
          "Nutrition training for 500 mothers",
          "School feeding program launched"
        ]
      }
    ]
  },
  education_empowerment: {
    id: "education_empowerment",
    title: "Education & Women Empowerment",
    subTitle: "শিক্ষা ও নারী ক্ষমতায়ন",
    icon: GraduationCap,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    gradient: "from-purple-600 to-pink-600",
    description: "Breaking barriers to education and empowering women and girls",
    problems: [
      "High dropout rates after primary level",
      "Low girls' education due to early marriage",
      "Distance to schools after displacement",
      "Lack of facilities and teachers",
      "Gender inequality and harassment"
    ],
    solutions: [
      "Mobile schools for displaced children",
      "Girls' scholarship programs",
      "Adult literacy classes",
      "Anti-child marriage campaigns"
    ],
    impact: "15,000+ students enrolled, 5,000+ women empowered",
    projects: [
      {
        id: 8,
        title: "Girl Child Education Program",
        location: "Raipur & surrounding areas",
        description: "Scholarships and support for girls to complete secondary and higher education",
        impact: "500+ girls in school",
        beneficiaries: "2,000+ family members",
        status: "active",
        raised: 280000,
        goal: 500000,
        volunteers: 60,
        startDate: "2024-01-20",
        endDate: "2026-01-19",
        image: "/images/girls-education.jpg",
        updates: [
          "300 girls receiving scholarships",
          "School kits provided to 500 students",
          "Mentorship program established"
        ]
      },
      {
        id: 9,
        title: "Mobile Schools for Displaced Children",
        location: "Erosion-affected areas, Raipur",
        description: "Operating mobile learning centers for children whose schools were destroyed by river erosion",
        impact: "1,000+ children enrolled",
        beneficiaries: "1,000+ students",
        status: "active",
        raised: 120000,
        goal: 300000,
        volunteers: 40,
        startDate: "2024-03-10",
        endDate: "2025-08-31",
        image: "/images/mobile-school.jpg",
        updates: [
          "10 mobile schools operational",
          "200 children completed basic literacy",
          "Parent awareness sessions conducted"
        ]
      },
      {
        id: 10,
        title: "Women's Rights & Legal Aid",
        location: "Raipur, Lakshmipur",
        description: "Legal awareness camps and support for women facing harassment and rights violations",
        impact: "500+ women supported",
        beneficiaries: "2,000+ women",
        status: "active",
        raised: 90000,
        goal: 200000,
        volunteers: 35,
        startDate: "2024-04-01",
        endDate: "2025-03-31",
        image: "/images/women-rights.jpg",
        updates: [
          "Legal aid clinic established",
          "100 women received legal support",
          "Awareness campaigns in 30 villages"
        ]
      },
      {
        id: 11,
        title: "Stop Child Marriage Campaign",
        location: "High-risk areas, Raipur",
        description: "Community awareness and intervention programs to prevent early marriage",
        impact: "75+ child marriages prevented",
        beneficiaries: "10,000+ community members",
        status: "active",
        raised: 75000,
        goal: 150000,
        volunteers: 50,
        startDate: "2024-06-01",
        endDate: "2025-05-31",
        image: "/images/child-marriage.jpg",
        updates: [
          "20 youth ambassadors trained",
          "Stop child marriage helpline established",
          "10 marriages prevented this quarter"
        ]
      }
    ]
  }
};

// Problem Statistics Component
const ProblemStats = ({ problems, category }) => {
  const categoryData = PROJECT_CATEGORIES[category];
  
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-6 h-6 text-red-600" />
        <h3 className="text-lg font-bold text-red-800">Major Challenges in Raipur</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {problems.map((problem, idx) => (
          <div key={idx} className="flex items-start gap-2 text-sm">
            <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{problem}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Solution Component
const Solutions = ({ solutions, category }) => {
  const categoryData = PROJECT_CATEGORIES[category];
  
  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle className="w-6 h-6 text-emerald-600" />
        <h3 className="text-lg font-bold text-emerald-800">Our Solutions</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {solutions.map((solution, idx) => (
          <div key={idx} className="flex items-start gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{solution}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("river_erosion");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const currentCategory = PROJECT_CATEGORIES[activeCategory];
  const CategoryIcon = currentCategory.icon;

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    return status === "active" 
      ? "bg-green-100 text-green-700" 
      : "bg-blue-100 text-blue-700";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section with Raipur Context */}
      <HeroProp
        title="Raipur Development Initiative"
        heading1=" Transforming"
        heading2="Raipur, Lakshmipur"
        content="Addressing river erosion, flooding, poverty, and education challenges through community-driven solutions. Together, we can rebuild and empower our community."
        Icon={TrendingUp}
      />

      {/* Problem Overview Banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-semibold">Crisis Alert:</span>
              <span className="text-sm">Raipur faces severe river erosion, flooding, poverty, and education challenges</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span>🌊 10,000+ displaced</span>
              <span>💧 50,000+ flood-affected</span>
              <span>📚 40% dropout rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-2 scrollbar-hide">
            {Object.entries(PROJECT_CATEGORIES).map(([key, category]) => {
              const Icon = category.icon;
              const isActive = activeCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`flex flex-col items-center gap-1 px-6 py-3 rounded-xl transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg transform scale-105`
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{category.title}</span>
                  <span className="text-xs opacity-80 hidden md:block">{category.subTitle}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category Header with Problems and Solutions */}
      <div className={`${currentCategory.bgColor} py-12`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-4 shadow-sm">
                <CategoryIcon className="w-5 h-5" style={{ color: currentCategory.color.split(" ")[1] }} />
                <span className="text-sm font-semibold">Raipur Initiative</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                {currentCategory.title}
              </h2>
              <p className="text-lg text-gray-700">{currentCategory.subTitle}</p>
              <p className="text-gray-600 mt-2">{currentCategory.description}</p>
            </div>

            {/* Problems and Solutions for this category */}
            <ProblemStats problems={currentCategory.problems} category={activeCategory} />
            <Solutions solutions={currentCategory.solutions} category={activeCategory} />
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Ongoing & Completed Projects</h3>
          <p className="text-gray-600">Making a real difference in Raipur communities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {currentCategory.projects.map((project) => {
            const progress = (project.raised / project.goal) * 100;
            
            return (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project)}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
              >
                <div className={`h-3 bg-gradient-to-r ${currentCategory.color}`} />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                      {project.status === "active" ? "🟢 Active" : "✅ Completed"}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {project.location}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {project.description}
                  </p>

                  {/* Beneficiaries & Impact */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 p-2 rounded-lg text-center">
                      <Users className="w-4 h-4 mx-auto text-emerald-600 mb-1" />
                      <p className="text-xs text-gray-600">Beneficiaries</p>
                      <p className="text-sm font-semibold">{project.beneficiaries}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg text-center">
                      <Target className="w-4 h-4 mx-auto text-emerald-600 mb-1" />
                      <p className="text-xs text-gray-600">Impact</p>
                      <p className="text-sm font-semibold">{project.impact}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {project.goal > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Funding Progress</span>
                        <span className="font-semibold">৳{project.raised.toLocaleString()} / ৳{project.goal.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r ${currentCategory.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <button className="mt-2 text-emerald-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Impact Counter Section */}
        <div className="mt-16 bg-gradient-to-r from-emerald-700 to-teal-700 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">15,000+</div>
              <div className="text-sm opacity-90">Lives Impacted</div>
            </div>
            <div>
              <div className="text-3xl font-bold">25+</div>
              <div className="text-sm opacity-90">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm opacity-90">Active Volunteers</div>
            </div>
            <div>
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm opacity-90">Villages Reached</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-2">Join the Movement to Rebuild Raipur</h3>
            <p className="mb-6 opacity-95">
              Your support can help us address erosion, flooding, poverty, and education challenges
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                <HandHeart className="w-5 h-5" />
                Donate Now
              </button>
              <button className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                Become a Volunteer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {showModal && selectedProject && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-2 bg-gradient-to-r ${currentCategory.color}`} />
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold mb-2">Project Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>📍 Location:</strong> {selectedProject.location}</p>
                    <p><strong>📅 Start Date:</strong> {formatDate(selectedProject.startDate)}</p>
                    <p><strong>📅 End Date:</strong> {formatDate(selectedProject.endDate)}</p>
                    <p><strong>🤝 Volunteers:</strong> {selectedProject.volunteers}</p>
                    <p><strong>📊 Status:</strong> <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(selectedProject.status)}`}>{selectedProject.status}</span></p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Impact Metrics</h3>
                  <div className="bg-emerald-50 p-4 rounded-lg space-y-2">
                    <p><strong>🎯 Impact:</strong> {selectedProject.impact}</p>
                    <p><strong>👥 Beneficiaries:</strong> {selectedProject.beneficiaries}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">About the Project</h3>
                <p className="text-gray-700">{selectedProject.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Recent Updates</h3>
                <ul className="space-y-2">
                  {selectedProject.updates.map((update, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>{update}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedProject.goal > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Funding Progress</span>
                    <span className="font-semibold">৳{selectedProject.raised.toLocaleString()} / ৳{selectedProject.goal.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`bg-gradient-to-r ${currentCategory.color} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${(selectedProject.raised / selectedProject.goal) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                Support This Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}