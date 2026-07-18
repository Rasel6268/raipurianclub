// app/terms/page.jsx
'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Shield,
  CheckCircle,
  AlertCircle,
  Users,
  Crown,
  Award,
  Gift,
  Star,
  Infinity,
  Medal,
  FileText,
  BookOpen,
  Scale,
  Gavel,
  Building,
  Briefcase,
  Calendar,
  Clock,
  AlertTriangle,
  Info,
  ChevronRight,
  ArrowLeft,
  Home,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  Instagram,
  ArrowUpRight,
  Download,
  Printer,
  Share2,
  Copy,
  Check,
  FileCheck,
  FileSignature,
  ShieldCheck,
  Lock,
  Key,
  UserCheck,
  Users as UsersIcon,
  Handshake,
  Heart,
  TrendingUp,
  Zap,
  Sparkles,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TermsPage = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [copied, setCopied] = useState(false);
  const headerRef = useRef(null);
  const sectionsRef = useRef({});

  // Navigation sections
  const sections = [
    { id: 'general', label: 'General Terms', icon: FileText },
    { id: 'membership-categories', label: 'Membership Categories', icon: Users },
    { id: 'fees', label: 'Membership Fees', icon: Award },
    { id: 'eligibility', label: 'Eligibility & Qualification', icon: UserCheck },
    { id: 'application', label: 'Application & Approval', icon: FileCheck },
    { id: 'rights', label: 'Member Rights & Privileges', icon: Shield },
    { id: 'responsibilities', label: 'Member Responsibilities', icon: Handshake },
    { id: 'transfer', label: 'Transfer & Cancellation', icon: Scale },
    { id: 'guest', label: 'Guest & Associate Policy', icon: UsersIcon },
    { id: 'management', label: 'Club Management', icon: Building },
    { id: 'disciplinary', label: 'Disciplinary Actions', icon: Gavel },
    { id: 'amendment', label: 'Amendment & Authority', icon: FileSignature },
  ];

  useEffect(() => {
    // Animate header
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate sections
    Object.values(sectionsRef.current).forEach((section, index) => {
      if (section) {
        gsap.fromTo(section,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.05,
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const copyToClipboard = () => {
    const text = document.querySelector('.terms-content').innerText;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Membership categories data
  const membershipCategories = [
    { name: 'Patron Member', icon: Crown, fee: '৳10,00,000', color: 'from-amber-500 to-orange-500' },
    { name: 'Donor Member', icon: Gift, fee: '৳6,00,000', color: 'from-purple-500 to-pink-500' },
    { name: 'Founder Member', icon: Star, fee: '৳2,00,000', color: 'from-blue-500 to-cyan-500' },
    { name: 'Life Member', icon: Infinity, fee: '৳4,00,000', color: 'from-emerald-500 to-teal-500' },
    { name: 'General/Permanent Member', icon: Users, fee: '৳2,00,000', color: 'from-indigo-500 to-blue-500' },
    { name: 'Associate/Use Member', icon: Users, fee: '৳50,000', color: 'from-gray-500 to-slate-500' },
    { name: 'Honorary Member', icon: Medal, fee: 'No Fee', color: 'from-rose-500 to-red-500' },
  ];

  // Executive Committee positions
  const executiveCommittee = [
    { position: 'President', eligibility: 'Founder Members' },
    { position: 'Director of Administration', eligibility: 'Founder Members' },
    { position: 'Director of Human Resource', eligibility: 'Founder Members' },
    { position: 'Director of Infrastructure & Development', eligibility: 'Founder/Life Members' },
    { position: 'Director of Finance', eligibility: 'Founder Members' },
    { position: 'Director of Branding & Promotions', eligibility: 'Life Members' },
    { position: 'Director of Program & Media', eligibility: 'Life Members' },
    { position: 'Director of Legal Affairs', eligibility: 'Life Members' },
    { position: 'Director of Entertainment', eligibility: 'Founder Members' },
    { position: 'Director of Food & Beverage', eligibility: 'Founder/Life Members' },
    { position: 'Director of Business', eligibility: 'Founder Members' },
    { position: 'Director of Project & Welfare', eligibility: 'Founder Members' },
  ];

  // Disciplinary actions
  const disciplinaryActions = [
    'Verbal warning',
    'Written warning',
    'Temporary restriction of facilities',
    'Suspension of membership',
    'Removal from a Club position',
    'Financial recovery for damage or loss',
    'Cancellation of membership',
    'Permanent expulsion from the Club',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-float-slow"></div>
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-float-reverse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-full px-4 py-1.5 mb-4">
            <FileSignature className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Terms & Conditions
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Membership{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Terms & Conditions
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            The Raipur Club Limited - Official Membership Terms & Conditions and Policy.
            Please read carefully before applying for membership.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all hover:scale-105"
            >
              <FileCheck className="w-4 h-4" />
              Apply Now
            </Link>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20">
                <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Contents
                </h3>
              </div>
              <nav className="p-2 max-h-[70vh] overflow-y-auto">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        activeSection === section.id
                          ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate text-left">{section.label}</span>
                      <ChevronRight className={`w-3 h-3 ml-auto transition-transform ${
                        activeSection === section.id ? 'rotate-90' : ''
                      }`} />
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 terms-content">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Section 1: General Terms */}
              <div
                id="general"
                ref={el => sectionsRef.current['general'] = el}
                className="p-6 border-b border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-emerald-500" />
                  1. General Terms & Conditions
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p><strong>1.1.</strong> The Raipur Club Limited shall operate as a membership-based social, cultural, professional, welfare, and community organization.</p>
                  <p><strong>1.2.</strong> Membership shall be granted only to individuals who satisfy the eligibility criteria applicable to their selected membership category.</p>
                  <p><strong>1.3.</strong> Membership approval shall remain subject to verification of the applicant's information and approval by the appropriate authority of the Club.</p>
                  <p><strong>1.4.</strong> Every member shall comply with:</p>
                  <ul className="list-disc list-inside pl-4 space-y-1">
                    <li>The Memorandum and Articles of Association of the Club, where applicable;</li>
                    <li>These Membership Terms & Conditions;</li>
                    <li>Club rules, regulations, policies, and decisions;</li>
                    <li>Decisions of the Executive Committee and other authorized committees.</li>
                  </ul>
                  <p><strong>1.5.</strong> The Club reserves the right to revise its rules, facilities, service policies, and operational procedures from time to time.</p>
                  <p><strong>1.6.</strong> Membership privileges shall depend on the member's category and shall not automatically be transferable to another person unless specifically permitted under this policy.</p>
                  <p><strong>1.7.</strong> All members shall maintain respectful conduct and shall not engage in activities that damage the reputation, safety, unity, or interests of the Club.</p>
                  <p><strong>1.8.</strong> The Club may maintain membership records, payment records, contact information, and other necessary administrative information for official Club purposes.</p>
                  <p><strong>1.9.</strong> Membership fees, subscriptions, service charges, and other applicable charges shall be payable according to the rules determined by the Club.</p>
                </div>
              </div>

              {/* Section 2: Membership Categories */}
              <div
                id="membership-categories"
                ref={el => sectionsRef.current['membership-categories'] = el}
                className="p-6 border-b border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <Users className="w-6 h-6 text-emerald-500" />
                  2. Membership Categories
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  The Raipur Club Limited shall have the following membership categories:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
                  {membershipCategories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <div key={cat.name} className={`p-3 rounded-xl bg-gradient-to-r ${cat.color} text-white text-center`}>
                        <Icon className="w-6 h-6 mx-auto mb-1" />
                        <p className="text-xs font-medium">{cat.name}</p>
                        <p className="text-xs opacity-80">{cat.fee}</p>
                      </div>
                    );
                  })}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Each category shall have separate eligibility requirements, fees, privileges, service priority, voting rights, transferability, and other benefits as defined by the Club.
                </p>
              </div>

              {/* Section 3: Membership Fees */}
              <div
                id="fees"
                ref={el => sectionsRef.current['fees'] = el}
                className="p-6 border-b border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <Award className="w-6 h-6 text-emerald-500" />
                  3. Membership Fees
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">Membership Category</th>
                        <th className="px-4 py-2 text-right text-sm font-semibold text-gray-900 dark:text-white">Membership Fee</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {membershipCategories.map((cat) => (
                        <tr key={cat.name} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{cat.name}</td>
                          <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 text-right font-medium">{cat.fee}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>3.1.</strong> Membership fees shall be paid according to the payment procedure determined by the Club.</p>
                  <p><strong>3.2.</strong> The Club may introduce monthly subscriptions, service charges, event charges, or other applicable charges.</p>
                  <p><strong>3.3.</strong> Membership fees shall generally be non-refundable unless otherwise decided by the Club's authorized authority.</p>
                  <p><strong>3.4.</strong> Any applicable subscription or additional payment must be paid within the specified period.</p>
                </div>
              </div>

              {/* Section 4: Eligibility */}
              <div
                id="eligibility"
                ref={el => sectionsRef.current['eligibility'] = el}
                className="p-6 border-b border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <UserCheck className="w-6 h-6 text-emerald-500" />
                  4. Eligibility & Qualification
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p><strong>4.1.</strong> An applicant must meet the minimum eligibility requirements for the relevant membership category.</p>
                  <p><strong>4.2.</strong> The applicant must provide accurate and complete information and supporting documents when requested.</p>
                  <p><strong>4.3.</strong> Providing false, misleading, or fraudulent information may result in rejection or cancellation of membership.</p>
                  <p><strong>4.4.</strong> Applicants must comply with the age, education, location, profession, and other qualification requirements of the selected membership category.</p>
                  <p><strong>4.5.</strong> The Club may verify an applicant's identity, professional background, location, references, and other relevant information.</p>
                  <p><strong>4.6.</strong> Meeting the minimum qualifications does not automatically guarantee membership approval.</p>
                </div>
              </div>

              {/* Section 5: Application */}
              <div
                id="application"
                ref={el => sectionsRef.current['application'] = el}
                className="p-6 border-b border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <FileCheck className="w-6 h-6 text-emerald-500" />
                  5. Membership Application & Approval
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p><strong>5.1.</strong> An applicant shall submit the official membership application form prescribed by the Club.</p>
                  <p><strong>5.2.</strong> The applicant shall provide:</p>
                  <ul className="list-disc list-inside pl-4 space-y-1">
                    <li>Full name;</li>
                    <li>Photograph;</li>
                    <li>National identification or valid identity document;</li>
                    <li>Contact information;</li>
                    <li>Address;</li>
                    <li>Educational qualifications;</li>
                    <li>Profession or occupation;</li>
                    <li>Other information required by the Club.</li>
                  </ul>
                  <p><strong>5.3.</strong> The applicant must select an appropriate membership category.</p>
                  <p><strong>5.4.</strong> The application may be reviewed by the Membership Committee or other authorized body.</p>
                  <p><strong>5.5.</strong> Final approval shall be given by the authority authorized under the Club's governing documents and policies.</p>
                  <p><strong>5.6.</strong> The Club reserves the right to:</p>
                  <ul className="list-disc list-inside pl-4 space-y-1">
                    <li>Approve an application;</li>
                    <li>Reject an application;</li>
                    <li>Request additional information;</li>
                    <li>Recommend a different membership category.</li>
                  </ul>
                  <p><strong>5.7.</strong> Membership shall become effective only after approval and completion of the required payment process.</p>
                </div>
              </div>

              {/* Section 6: Rights */}
              <div
                id="rights"
                ref={el => sectionsRef.current['rights'] = el}
                className="p-6 border-b border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-emerald-500" />
                  6. Member Rights and Privileges
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-3">Subject to the member's category, members may receive:</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                  {[
                    'Access to Club facilities and services',
                    'Discounts on eligible Club services',
                    'Food discounts where applicable',
                    'Guest access according to the applicable guest limit',
                    'Voting rights where applicable',
                    'Priority access to selected Club services',
                    'Eligibility for Executive Committee positions where applicable',
                    'Inheritance rights where applicable',
                    'Transfer rights where specifically allowed',
                    'Recognition through an Honour Board where applicable',
                  ].map((right, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{right}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-700 dark:text-gray-300"><strong>6.11.</strong> Members shall not claim privileges that are not applicable to their membership category.</p>
              </div>

              {/* Section 7: Responsibilities */}
              <div
                id="responsibilities"
                ref={el => sectionsRef.current['responsibilities'] = el}
                className="p-6 border-b border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <Handshake className="w-6 h-6 text-emerald-500" />
                  7. Member Responsibilities and Code of Conduct
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-3">Every member shall:</p>
                <ul className="space-y-2">
                  {[
                    'Respect the Club, its members, employees, management, and visitors.',
                    'Maintain appropriate behavior within Club premises and during Club activities.',
                    'Follow all Club rules, regulations, safety instructions, and administrative decisions.',
                    'Pay all applicable fees, subscriptions, bills, and charges on time.',
                    'Not misuse Club facilities, property, membership privileges, or identification.',
                    'Not engage in violence, harassment, threats, discrimination, abuse, or disruptive behavior.',
                    'Not damage Club property.',
                    'Not use the Club for unlawful activities.',
                    'Not make unauthorized commitments or representations on behalf of the Club.',
                    'Maintain confidentiality regarding sensitive internal matters of the Club.',
                    'Avoid conduct that may damage the reputation or unity of The Raipur Club Limited.',
                  ].map((responsibility, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 8: Transfer */}
              <div
                id="transfer"
                ref={el => sectionsRef.current['transfer'] = el}
                className="p-6 border-b border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <Scale className="w-6 h-6 text-emerald-500" />
                  8. Membership Transfer, Cancellation & Termination
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">8.1 Transfer</h3>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm pl-4">
                      <li><strong>8.1.1.</strong> Membership transfer shall be allowed only for categories where transferability is specifically permitted.</li>
                      <li><strong>8.1.2.</strong> Patron, Founder, Life, and General/Permanent Memberships may be transferable subject to applicable Club rules.</li>
                      <li><strong>8.1.3.</strong> Donor, Associate/Use, and Honorary Memberships shall not be transferable.</li>
                      <li><strong>8.1.4.</strong> Any transfer must be approved by the appropriate authority of the Club.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">8.2 Cancellation by Member</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">A member may request cancellation of membership by submitting written notice to the Club.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">8.3 Termination by Club</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">The Club may suspend or terminate membership for:</p>
                    <ul className="list-disc list-inside pl-4 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                      <li>Serious violation of Club rules;</li>
                      <li>Non-payment of applicable dues;</li>
                      <li>Fraud or misrepresentation;</li>
                      <li>Criminal or unlawful conduct;</li>
                      <li>Damage to Club property;</li>
                      <li>Serious misconduct;</li>
                      <li>Conduct damaging to the reputation of the Club;</li>
                      <li>Repeated violation of policies.</li>
                    </ul>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm"><strong>8.4.</strong> Where appropriate, the member may be given an opportunity to explain or respond before final disciplinary action.</p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm"><strong>8.5.</strong> Termination of membership shall not automatically entitle the member to a refund of membership fees.</p>
                </div>
              </div>

              {/* Section 9: Guest Policy */}
              <div
                id="guest"
                ref={el => sectionsRef.current['guest'] = el}
                className="p-6 border-b border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <UsersIcon className="w-6 h-6 text-emerald-500" />
                  9. Guest and Associate Usage Policy
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p><strong>9.1.</strong> Members may bring guests according to the guest limits applicable to their membership category.</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-white">Membership Category</th>
                          <th className="px-4 py-2 text-right font-semibold text-gray-900 dark:text-white">Maximum Guests</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {[
                          ['Patron Member', 'Unlimited'],
                          ['Donor Member', 'Unlimited'],
                          ['Founder Member', 'Unlimited'],
                          ['Life Member', 'Maximum 6'],
                          ['General/Permanent Member', 'Maximum 4'],
                          ['Associate/Use Member', 'Maximum 4'],
                          ['Honorary Member', 'Unlimited'],
                        ].map(([category, limit]) => (
                          <tr key={category} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{category}</td>
                            <td className="px-4 py-2 text-gray-700 dark:text-gray-300 text-right">{limit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p><strong>9.3.</strong> Members shall remain responsible for the conduct of their guests.</p>
                  <p><strong>9.4.</strong> Guests must comply with all Club rules and regulations.</p>
                  <p><strong>9.5.</strong> Guest access does not automatically create membership rights.</p>
                  <p><strong>9.6.</strong> The Club may restrict or refuse guest access for security, capacity, operational, or disciplinary reasons.</p>
                  <p><strong>9.7.</strong> Associate/Use Members shall enjoy only the facilities and services specifically approved for their membership category.</p>
                </div>
              </div>

              {/* Section 10: Management */}
              <div
                id="management"
                ref={el => sectionsRef.current['management'] = el}
                className="p-6 border-b border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <Building className="w-6 h-6 text-emerald-500" />
                  10. Club Management and Decision-Making Policy
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">The Club shall be managed through an appropriate governance structure.</p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">10.1 Executive Committee</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">The Executive Committee shall consist of:</p>
                    <ul className="list-disc list-inside pl-4 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                      <li>1 President</li>
                      <li>11 Directors</li>
                    </ul>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mt-3">The positions include:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {executiveCommittee.map((item) => (
                        <div key={item.position} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm">
                          <span className="text-gray-700 dark:text-gray-300">{item.position}</span>
                          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{item.eligibility}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">10.2 Election Eligibility</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {executiveCommittee.map((item) => (
                        <div key={item.position} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm">
                          <span className="text-gray-700 dark:text-gray-300">{item.position}</span>
                          <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{item.eligibility}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">10.3 Advisory Committee</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">The Advisory Committee shall consist of:</p>
                    <ul className="list-disc list-inside pl-4 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                      <li>1 Chief Advisor (elected from Patron Members)</li>
                      <li>5 Advisors</li>
                    </ul>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">Advisor positions may include:</p>
                    <ul className="list-disc list-inside pl-4 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                      <li>Administration & Human Resource;</li>
                      <li>Finance & Business;</li>
                      <li>Other areas determined by the Club.</li>
                    </ul>
                  </div>

                  <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    <p><strong>10.4.</strong> Club decisions shall be taken by the authorized governing body in accordance with the Club's governing documents.</p>
                    <p><strong>10.5.</strong> Voting rights shall be limited to membership categories that have voting privileges.</p>
                    <p><strong>10.6.</strong> The Executive Committee may establish subcommittees for administration, finance, legal affairs, welfare, entertainment, infrastructure, and other Club activities.</p>
                  </div>
                </div>
              </div>

              {/* Section 11: Disciplinary */}
              <div
                id="disciplinary"
                ref={el => sectionsRef.current['disciplinary'] = el}
                className="p-6 border-b border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <Gavel className="w-6 h-6 text-emerald-500" />
                  11. Disciplinary Actions
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-3">Depending on the seriousness of the violation, the Club may take one or more of the following actions:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {disciplinaryActions.map((action, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                  <p><strong>11.1.</strong> The severity of the disciplinary action shall depend on the nature and seriousness of the violation.</p>
                  <p><strong>11.2.</strong> Serious misconduct may result in immediate temporary suspension pending investigation.</p>
                  <p><strong>11.3.</strong> A member may be given an opportunity to provide an explanation where appropriate.</p>
                  <p><strong>11.4.</strong> The decision of the authorized disciplinary or governing body shall be final, subject to the Club's governing documents and applicable law.</p>
                </div>
              </div>

              {/* Section 12: Amendment */}
              <div
                id="amendment"
                ref={el => sectionsRef.current['amendment'] = el}
                className="p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <FileSignature className="w-6 h-6 text-emerald-500" />
                  12. Amendment and Final Authority
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p><strong>12.1.</strong> The Club reserves the right to amend, revise, add, remove, or update these Terms & Conditions and Membership Policies.</p>
                  <p><strong>12.2.</strong> Amendments may be made to reflect:</p>
                  <ul className="list-disc list-inside pl-4 space-y-1">
                    <li>Changes in law;</li>
                    <li>Changes in Club operations;</li>
                    <li>Changes in membership structure;</li>
                    <li>Changes in fees;</li>
                    <li>Changes in facilities and privileges;</li>
                    <li>Decisions of the authorized governing body.</li>
                  </ul>
                  <p><strong>12.3.</strong> Any amendment shall be approved by the appropriate authority according to the governing documents of The Raipur Club Limited.</p>
                  <p><strong>12.4.</strong> In the event of any conflict between this policy and the legally governing documents of the Club, the legally governing documents shall prevail.</p>
                  <p><strong>12.5.</strong> The final authority for interpretation and implementation of this policy shall rest with the authorized governing body of The Raipur Club Limited, subject to applicable law.</p>
                </div>
              </div>
            </div>

            {/* Footer with club info */}
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 text-center">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-full p-2">
                    <span className="text-white font-bold text-lg">RC</span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-800 dark:text-white">The Raipur Club Limited</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Membership Terms & Conditions</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Last Updated: March 2026</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">|</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Version 1.0</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <Link href="/" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                  <Home className="w-4 h-4" /> Home
                </Link>
                <Link href="/membership" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                  <Crown className="w-4 h-4" /> Membership
                </Link>
                <Link href="/membership/compare" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                  <Scale className="w-4 h-4" /> Compare Plans
                </Link>
                <Link href="/register" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                  <FileCheck className="w-4 h-4" /> Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
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
        @media print {
          .sticky, .fixed, .animate-float-slow, .animate-float-reverse {
            display: none !important;
          }
          body {
            background: white !important;
          }
          .terms-content {
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TermsPage;