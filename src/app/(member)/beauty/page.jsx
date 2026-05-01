"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MapPin,
  Calendar,
  Users,
  Star,
  Heart,
  Camera,
  Sun,
  Cloud,
  Mountain,
  Trees,
  Flower2,
  Church,
  Landmark,
  Utensils,
  ShoppingBag,
  Train,
  Bus,
  Car,
  Bike,
  Wifi,
  Coffee,
  Home,
  Compass,
  Navigation,
  Award,
  Trophy,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  Share2,
  Bookmark,
  ThumbsUp,
  MessageCircle,
  Globe,
  Clock,
  Info,
  Play,
  Pause,
  Fish,
  Leaf,
  Sprout,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const RaipurTravelPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageIndices, setImageIndices] = useState({});
  const sectionsRef = useRef([]);

  // Raipur travel destinations data with multiple images
  const destinations = [
    {
      id: 1,
      name: "Altaf Master Ghat",
      location: "Raipur, Lakshmipur, Bangladesh",
      shortDesc: "Breathtaking river views and serene sunsets",
      fullDesc:
        " is one of the most picturesque locations in . Situated along the mighty , this serene spot offers stunning views, especially during sunrise and sunset. Local fishermen can be seen casting their nets, creating a perfect blend of natural beauty and rural life. The ghat also serves as an important transportation hub, where traditional boats ferry people across the river. During winter, migratory birds gather here, making it a paradise for bird watchers and nature photographers.",
      whyFamous: [
        "Breathtaking sunrise and sunset views over the Meghna River",
        "Traditional wooden boat rides and fishing activities",
        "Migratory bird watching during the winter season",
        "Peaceful atmosphere away from city noise",
        "Nearby local fresh fish market",
        "A perfect spot for nature and photography lovers",
      ],
      bestTime: "October to March (Winter season)",
      howToReach:
        "Approximately 30 minutes by road from Raipur town center. Local buses, CNGs, and rickshaws are available.",
      nearbyAttractions: ["Raipur Bazar", "Local temples", "Fish market"],
      images: [
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777538547/thumbnail_photo__u6nvp1.jpg",
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777540089/altaf_master_ghat_cfz6xq.jpg",
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777540089/alat_xvaneu.jpg",
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777540090/075725579be7438790c7bd1ec49d43d8_wzoajx.jpg",
      ],
      rating: 4.8,
      reviews: 234,
      category: "River View",
      icon: Sun,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      name: "Dalal Bazar Zamindar Bari",
      location: "Lakshmipur, Bangladesh",
      shortDesc: "Historic zamindar house with colonial architecture",
      fullDesc:
        " is a historic landmark that reflects the legacy of the zamindari system during the British colonial period. Located in the Dalal Bazar area of , this heritage site features beautiful Indo-European architecture, large pillars, and spacious courtyards. The structure stands as a symbol of the region’s cultural and historical richness. Visitors are attracted by its vintage aesthetic, making it a great place for history lovers and photographers.",
      whyFamous: [
        "Historic zamindari heritage from the British era",
        "Unique Indo-European architectural design",
        "Large pillars and traditional courtyard layout",
        "Popular photography and heritage spot",
        "Represents local culture and history",
        "Peaceful and less crowded environment",
      ],
      bestTime: "November to February (Winter season)",
      howToReach:
        "Approximately 15–20 minutes by road from Lakshmipur town. Rickshaws, CNGs, and local transport are available.",
      nearbyAttractions: [
        "Dalal Bazar",
        "Local temples",
        "Lakshmipur town market",
      ],
      images: [
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777538567/dalalbazar_zomider_bari_lakshmipur_7_gau9lw.png",
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777540525/%E0%A6%A6%E0%A6%BE%E0%A6%B2%E0%A6%BE%E0%A6%B2%E0%A6%AC%E0%A6%BE%E0%A6%9C%E0%A6%BE%E0%A6%B0_%E0%A6%9C%E0%A6%AE%E0%A6%BF%E0%A6%A6%E0%A6%BE%E0%A6%B0_%E0%A6%AC%E0%A6%BE%E0%A6%A1%E0%A6%BC%E0%A6%BF%E0%A6%B0_%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A6%A7%E0%A6%BE%E0%A6%A8_%E0%A6%85%E0%A6%82%E0%A6%B6_esru7p.jpg",
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777540523/dalal_bazar_zamindar_bari_jlgsup.jpg",
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777540523/received161996455664627-20210315141137_hh1xdt.jpg",
      ],
      rating: 4.6,
      reviews: 142,
      category: "Heritage",
      icon: Landmark,
      color: "from-amber-500 to-orange-500",
    },
    {
      id: 3,
      name: "Jiner Mosjid",
      location: "Denaetpur, Raipur, Lakshmipur, Bangladesh",
      shortDesc: "Mysterious historic mosque with unique architecture",
      fullDesc:
        " is a historic and mysterious mosque located in Denaetpur under . Built in 1888 on about 57 decimals of land, the mosque is inspired by the design of Delhi’s Jama Masjid. It features three large domes and impressive architectural details. One of its most fascinating aspects is a hidden underground prayer room about 25 feet below the surface, which later turned into a water-filled well. According to local legend, the mosque was built overnight by jinn and mysterious sounds of prayer were once heard at night, which is why it is popularly known as 'Jiner Mosjid'.",
      whyFamous: [
        "Mysterious legend of being built by jinn overnight",
        "Historic mosque dating back to 1888",
        "Inspired by Mughal-style architecture (similar to Jama Masjid)",
        "Three large domes and artistic design",
        "Hidden underground prayer chamber",
        "Peaceful spiritual environment",
      ],
      bestTime: "November to February (Winter season)",
      howToReach:
        "From Lakshmipur town (about 21 km), travel via local transport (CNG, auto-rickshaw, or bus) through Raipur to reach the mosque.",
      nearbyAttractions: [
        "Raipur Bazar",
        "Altaf Master Ghat",
        "Local ponds and rural landscape",
      ],
      images: [
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777541076/Jiner-Mosjid-770x420_bd4np1.jpg",
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777541075/jiner-masjid-700x431_ejepsk.jpg",
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777541076/mosque-pic-67e3d297a966d_er5atc.jpg",
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777541076/240_WhatsApp_Image_2024-09-09_at_21.39.40_1_rmdu6b.jpg",
      ],
      rating: 4.7,
      reviews: 210,
      category: "Religious & Historical",
      icon: Landmark,
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: 4,
      name: "Raipur Boro Mosque",
      location: "Raipur, Lakshmipur, Bangladesh",
      shortDesc: "A prominent central mosque with 23 domes and large capacity",
      fullDesc:
        " is one of the largest and most important mosques in . It features an impressive architectural design with 23 domes, making it visually unique in the region. The mosque has a spacious prayer hall where around a thousand মানুষ (people) can pray together at the same time. Located on the north side of Raipur Bazar and on the west side of the Raipur–Faridganj road, it serves as a central place of worship and community gathering. The mosque becomes especially vibrant during Friday prayers and major Islamic occasions.",
      whyFamous: [
        "Unique structure with 23 domes",
        "Capacity for around 1000 worshippers at once",
        "Located near Raipur Bazar (central area)",
        "Important hub for Jumu’ah (Friday) prayers",
        "Key gathering place during Eid prayers",
        "Beautiful and peaceful Islamic environment",
      ],
      bestTime: "Year-round (especially during Friday prayers and Eid)",
      howToReach:
        "Located on the north side of Raipur Bazar, beside the Raipur–Faridganj road. Easily accessible by rickshaw, CNG, or local transport.",
      nearbyAttractions: [
        "Raipur Bazar",
        "Altaf Master Ghat",
        "Local shops and eateries",
      ],
      images: [
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777541517/1707248527-img_20240207_014131_wgsy1x.webp",
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777541517/raipur_boro_mosjid_lakshmipur_2_2_jut928.webp",
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777541517/ELUbmBsUcAIph00_lhk3ad.jpg",
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777541517/p120674_aommn3.jpg",
      ],
      rating: 4.8,
      reviews: 250,
      category: "Religious",
      icon: Landmark,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: 7,
      name: "Raipur Fish Hatchery and Training Centre",
      location: "Raipur, Lakshmipur",
      shortDesc:
        "One of the largest government fish hatcheries and training centers in Bangladesh",
      fullDesc:
        "Raipur Fish Hatchery and Training Centre is one of the six major fish hatcheries in Bangladesh and a key facility under the Department of Fisheries. Established during the Noakhali Rural Development Project (1978–1992) with support from DANIDA, it played a significant role in boosting fish production in the region. The center is not only responsible for breeding high-quality fish fry but also provides professional training to fisheries officers, farmers, and entrepreneurs. It operates under the supervision of a Principal Scientific Officer (PSO) and is directly governed by the Director General of the Department of Fisheries. The hatchery contributes significantly to local aquaculture development and sustainable fish farming practices.",
      whyFamous: [
        "One of the six major fish hatcheries in Bangladesh",
        "Largest hatchery in the region during DANIDA project",
        "Government-operated training center for fisheries",
        "Produces high-quality fish fry for aquaculture",
        "Supports local fish farmers and entrepreneurs",
        "Plays a key role in sustainable fish farming",
      ],
      bestTime: "Year-round, especially during breeding and training seasons",
      howToReach:
        "Located in Raipur Upazila, easily accessible by local transport",
      nearbyAttractions: "Raipur Bazar, Local Fish Farms, Meghna River Area",
      images: [
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777639332/observerbd.com_1624637873_de5le3.jpg",
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777639332/%E0%A6%8F%E0%A6%9F%E0%A6%BE_%E0%A6%AB%E0%A6%BF%E0%A6%B8_%E0%A6%B9%E0%A7%87%E0%A6%9A%E0%A6%BE%E0%A6%B0%E0%A6%BF%E0%A6%B0_%E0%A6%B8%E0%A6%AE%E0%A7%8D%E0%A6%AE%E0%A7%81%E0%A6%96_%E0%A6%AD%E0%A6%BE%E0%A6%97%E0%A7%87%E0%A6%B0_%E0%A6%9B%E0%A6%AC%E0%A6%BF_2014-02-19_21-04_vdaqyq.jpg",
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777639331/r-k-biofloc-fish-farm-g-e-road-rajnandgaon-fish-farming-thk3ou3skx_uw8yus.avif",
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777639435/raipur-fish-hatchery-and-training-centre-lakshmipur_1_jros5f.jpg",
      ],
      rating: 4.6,
      reviews: 198,
      category: "Educational",
      icon: Fish,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 8,
      name: "Betel Nut Cultivation",
      location: "Raipur, Lakshmipur",
      shortDesc:
        "Raipur is well-known for its high-quality betel nut production",
      fullDesc:
        "Betel nut, locally known as 'Supari', is one of the most important agricultural products of Raipur. The region's favorable soil and climate support the cultivation of high-quality betel nuts, which are widely used across Bangladesh. Many local farmers depend on betel nut farming as a primary source of income, making it a vital part of the local economy.",
      whyFamous: [
        "High-quality betel nut production",
        "Favorable climate and soil conditions",
        "Widely used across Bangladesh",
        "Important source of local income",
      ],
      bestTime: "Harvest season varies, generally year-round availability",
      howToReach: "Available across rural areas of Raipur",
      nearbyAttractions: "Local farms, village markets",
      images: [
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777538546/Betel-Nut-5187_gqeftz.jpg",
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777538544/betel-nut-tree-with-sky_51524-20544_jiktvh.jpg",
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777538545/Betel-NutSupari-Plant-01_ovq6gq.png",
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777538546/Betel-nut-trees-garden_0_1200.jpg_ik5epb.png"
      ],
      rating: 4.5,
      reviews: 120,
      category: "Agriculture",
      icon: Leaf,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 9,
      name: "Soybean Farming",
      location: "Raipur, Lakshmipur",
      shortDesc: "A major crop contributing to local agriculture and economy",
      fullDesc:
        "Soybean is one of the significant crops cultivated in Raipur. The fertile land supports large-scale soybean farming, which contributes to both local consumption and the national market. It plays an important role in the agricultural economy and provides livelihood opportunities for many farmers.",
      whyFamous: [
        "Large-scale cultivation",
        "Contributes to national food supply",
        "Supports local farmers' income",
        "Fertile land suitable for soybean farming",
      ],
      bestTime: "Winter season (November to February)",
      howToReach: "Accessible throughout farming areas in Raipur",
      nearbyAttractions: "Crop fields, rural landscapes",
      images: [
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777538545/soybean-hero_wlazm5.jpg",
        "https://res.cloudinary.com/doumlnejx/image/upload/v1777538546/Field-soybeans-farm-Oklahoma_ci6xcl.png",

      ],
      rating: 4.4,
      reviews: 95,
      category: "Agriculture",
      icon: Sprout,
      color: "from-yellow-500 to-green-500",
    },
  ];

  // Why Raipur is famous - Key highlights
  const highlights = [
    {
      title: "Natural Beauty",
      description:
        "Lush green tea gardens, serene rivers, and picturesque hills",
      icon: Trees,
    },
    {
      title: "Cultural Heritage",
      description: "Rich Bengali traditions, folk arts, and warm hospitality",
      icon: Landmark,
    },
    {
      title: "Peaceful Environment",
      description: "Escape from city chaos, enjoy tranquility and fresh air",
      icon: Sun,
    },
    {
      title: "Local Cuisine",
      description: "Authentic Bengali dishes made with fresh local ingredients",
      icon: Utensils,
    },
    {
      title: "Adventure Activities",
      description: "Trekking, boating, bird watching, and nature walks",
      icon: Compass,
    },
    {
      title: "Photography Paradise",
      description: "Endless opportunities for nature and wildlife photography",
      icon: Camera,
    },
  ];

  // Initialize GSAP animations
  useEffect(() => {
    sectionsRef.current.forEach((section, index) => {
      if (section) {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    });

    gsap.to(".highlight-card", {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.1,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handlePrevImage = (destId, e) => {
    e.stopPropagation();
    setImageIndices((prev) => ({
      ...prev,
      [destId]:
        ((prev[destId] || 0) -
          1 +
          destinations.find((d) => d.id === destId).images.length) %
        destinations.find((d) => d.id === destId).images.length,
    }));
  };

  const handleNextImage = (destId, e) => {
    e.stopPropagation();
    setImageIndices((prev) => ({
      ...prev,
      [destId]:
        ((prev[destId] || 0) + 1) %
        destinations.find((d) => d.id === destId).images.length,
    }));
  };

  const ImageSlider = ({ destination, onClick }) => {
    const currentIndex = imageIndices[destination.id] || 0;
    const currentImage = destination.images[currentIndex];
    const IconComponent = destination.icon;
    const isEven = (destination.id - 1) % 2 === 0;

    return (
      <div
        ref={(el) => (sectionsRef.current[destination.id - 1] = el)}
        className="mb-20 scroll-trigger"
      >
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${!isEven ? "lg:flex-row-reverse" : ""}`}
        >
          {/* Image Slider Section */}
          <div
            className={`relative group ${!isEven ? "lg:order-2" : "lg:order-1"}`}
          >
            <div className="relative rounded-2xl shadow-xl overflow-hidden">
              <div className="relative h-96">
                <img
                  src={currentImage}
                  alt={`${destination.name} - Image ${currentIndex + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Navigation Arrows */}
                {destination.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => handlePrevImage(destination.id, e)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all duration-300 hover:scale-110"
                    >
                      <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <button
                      onClick={(e) => handleNextImage(destination.id, e)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all duration-300 hover:scale-110"
                    >
                      <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {destination.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full">
                    <span className="text-white text-xs">
                      {currentIndex + 1} / {destination.images.length}
                    </span>
                  </div>
                )}

                {/* Category Badge */}
                <div
                  className={`absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-gradient-to-r ${destination.color} text-white text-sm font-semibold flex items-center gap-1`}
                >
                  <IconComponent className="w-4 h-4" />
                  {destination.category}
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-white text-xs">
                    {destination.rating}
                  </span>
                  <span className="text-white/70 text-xs">
                    ({destination.reviews})
                  </span>
                </div>

                {/* Zoom Button */}
                <button
                  onClick={() => {
                    setSelectedImage(destination.images);
                    setShowImageModal(true);
                  }}
                  className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all duration-300 hover:scale-110"
                >
                  <ZoomIn className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {destination.images.length > 1 && (
              <div className="flex justify-center gap-2 mt-3">
                {destination.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageIndices((prev) => ({
                        ...prev,
                        [destination.id]: idx,
                      }));
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentIndex === idx
                        ? `w-8 bg-gradient-to-r ${destination.color}`
                        : "w-4 bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className={`space-y-5 ${!isEven ? "lg:order-1" : "lg:order-2"}`}>
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-full px-3 py-1 mb-3">
                <MapPin className="w-3 h-3 text-emerald-600" />
                <span className="text-xs font-medium text-emerald-700">
                  {destination.location}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                {destination.name}
              </h3>
              <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                {destination.shortDesc}
              </p>
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {destination.fullDesc}
            </p>

            {/* Why Famous Section */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                Why This Place is Famous
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {destination.whyFamous.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-emerald-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Best Time to Visit</p>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {destination.bestTime}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Navigation className="w-4 h-4 text-emerald-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">How to Reach</p>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 line-clamp-2">
                    {destination.howToReach}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button className="group inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
              Explore More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CheckCircle = ({ className }) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );

  const ImageModal = ({ images, onClose }) => {
    const [modalIndex, setModalIndex] = useState(0);

    if (!images) return null;

    const handleModalPrev = () => {
      setModalIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    };

    const handleModalNext = () => {
      setModalIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {images.length > 1 && (
          <>
            <button
              onClick={handleModalPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={handleModalNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </>
        )}

        <img
          src={images[modalIndex]}
          alt="Full size"
          className="max-w-full max-h-[90vh] object-contain rounded-lg"
        />

        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 rounded-full">
            <span className="text-white text-sm">
              {modalIndex + 1} / {images.length}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-float-slow"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-float-reverse"></div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 text-white py-24 px-4">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 animate-bounce-in">
            <Compass className="w-4 h-4" />
            <span className="text-sm font-medium">Explore Raipur</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4">
            Discover{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Raipur's Beauty</span>
              <svg
                className="absolute -bottom-3 left-0 w-full h-4 text-white/30"
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
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Explore the hidden gems of Raipur, Lakshmipur - where nature meets
            culture and tranquility awaits
          </p>
        </div>
      </div>

      {/* Why Raipur is Favorite Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-full px-4 py-1.5 mb-4">
            <Heart className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">
              Why Raipur?
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Why Raipur is Everyone's{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Favorite Destination
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover what makes Raipur a beloved destination for travelers from
            around the world
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((highlight, idx) => {
            const IconComponent = highlight.icon;
            return (
              <div
                key={idx}
                className="highlight-card bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {highlight.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Destinations Section with Image Sliders */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-full px-4 py-1.5 mb-4">
            <Camera className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">
              Must Visit Places
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Explore Raipur's{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Natural Beauty
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            From serene rivers to lush tea gardens, discover the most beautiful
            places in Raipur
          </p>
        </div>

        {destinations.map((destination) => (
          <ImageSlider key={destination.id} destination={destination} />
        ))}
      </div>

      {/* Travel Tips Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Travel Tips for Raipur</h3>
            <p className="text-white/80">
              Make the most of your visit to this beautiful destination
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Best Time to Visit</h4>
                <p className="text-sm text-white/80">
                  October to March for pleasant weather and clear views
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Getting Around</h4>
                <p className="text-sm text-white/80">
                  Local buses, rickshaws, and rental cars available
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Local Cuisine</h4>
                <p className="text-sm text-white/80">
                  Try fresh fish, traditional Bengali sweets, and local tea
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && selectedImage && (
        <ImageModal
          images={selectedImage}
          onClose={() => setShowImageModal(false)}
        />
      )}

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
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 10s ease-in-out infinite;
        }
        .animate-bounce-in {
          animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)
            forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default RaipurTravelPage;
