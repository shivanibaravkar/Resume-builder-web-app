import React, { useState, useRef } from 'react';
import {
  ChevronDown, Upload, Bot, Share2, Download, Wand2, Edit, Sparkles,
  ZoomIn, ZoomOut, Save, User, Briefcase, GraduationCap, Code, Trophy,
  Award, Languages, Heart, Phone, Mail, MapPin, Linkedin, Plus, X
} from 'lucide-react';

// Types
interface ResumeData {
  name?: string;
  role?: string;
  phone?: string;
  email?: string;
  linkedin?: string;
  location?: string;
  summary?: string;
  experience?: Array<{
    title: string;
    companyName: string;
    date: string;
    companyLocation: string;
    accomplishment?: string[];
  }>;
  education?: Array<{
    degree: string;
    institution: string;
    duration: string;
    location: string;
  }>;
  achievements?: Array<{
    keyAchievements: string;
    describe: string;
  }>;
  skills?: string[];
  languages?: string[];
  projects?: Array<{
    title: string;
    description: string;
    duration: string;
  }>;
  courses?: Array<{
    title: string;
    description: string;
  }>;
  certifications?: Array<{
    title: string;
    issuedBy: string;
    year: string;
  }>;
  hobbies?: string[];
}

const ResumeBuilderComplete: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: 'AKSHITHRAM',
    role: 'Java Developer',
    phone: '+91 1234567890',
    email: 'name@gmail.com',
    linkedin: '',
    location: 'Hyderabad, India',
    summary: 'Results-driven Java Developer with 5+ years of experience in building scalable, high-performance backend systems and APIs. Proficient in Java, Spring Boot, Hibernate, and microservices architecture. Strong collaborator with a focus on clean code, agile methodologies, and continuous integration practices.',
    experience: [
      {
        title: 'Web Development Intern',
        companyName: 'CodeCraft Technologies',
        date: '2023 - 2024',
        companyLocation: 'Remote',
        accomplishment: [
          'Built responsive frontend interfaces using React.js and Tailwind CSS for internal tools used by over 100 staff members.',
          'Integrated REST APIs to fetch and display real-time data from a Node.js backend.',
          'Used Git and GitHub for version control and collaborated with senior developers via pull requests and code reviews.',
          'Wrote unit tests with Jest to ensure UI component reliability and minimize regressions.'
        ]
      },
      {
        title: 'Cloud & DevOps Intern',
        companyName: 'Nimbus CloudTech',
        date: '2024 - 2025',
        companyLocation: 'Remote',
        accomplishment: [
          'Configured CI/CD pipelines using GitHub Actions for automated testing and deployment of web apps.',
          'Assisted in setting up monitoring and alerting using Prometheus and Grafana on Kubernetes clusters.',
          'Deployed and maintained containerized applications using Docker and Helm charts.',
          'Wrote documentation for deployment workflows and environment configurations for internal teams.'
        ]
      }
    ],
    education: [
      {
        institution: 'Technical College, Chennai',
        degree: 'B.Tech, CSE(AI&ML)',
        duration: '2022 - 2026',
        location: 'Chennai, India'
      }
    ],
    achievements: [],
    skills: [
      'Strong knowledge of Core Java',
      'Full Stack Development',
      'Spring Framework',
      'Relational Databases',
      'Git / GitHub / GitLab for version control',
      'AWS, Azure'
    ],
    languages: [],
    projects: [],
    courses: [],
    certifications: [],
    hobbies: []
  });

  const [zoomLevel, setZoomLevel] = useState(100);
  const [fontStyle, setFontStyle] = useState('Inter');
  const [fontColor, setFontColor] = useState('#1f2937');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadDropdownOpen, setUploadDropdownOpen] = useState(false);
  const [aiDropdownOpen, setAiDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [highlightEdit, setHighlightEdit] = useState(false);


  // Utility functions
  const handleZoomIn = () => {
    if (zoomLevel < 200) {
      setZoomLevel(prev => prev + 10);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 50) {
      setZoomLevel(prev => prev - 10);
    }
  };

  const handleSaveResume = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    alert('Resume saved successfully!');
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleShareResume = () => {
    const shareData = {
      title: 'My Resume',
      text: 'Check out my professional resume',
      url: window.location.href
    };
    
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Resume link copied to clipboard!');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, this would parse the uploaded resume
      alert('File upload functionality would be implemented here');
    }
  };

  const handleManualEdit = () => {
  setUploadDropdownOpen(false);
  setHighlightEdit(true);
  formRef.current?.scrollIntoView({ behavior: 'smooth' });

  setTimeout(() => setHighlightEdit(false), 3000); // remove highlight after 3 sec
};

  const handleAIEdit = () => {
    setUploadDropdownOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // AI Enhancement functions (mock implementations)
  const enhanceProfile = async () => {
    if (!resumeData.summary) {
      alert('Please add a professional summary first');
      return;
    }
    setIsLoading(true);
    // Mock AI enhancement
    setTimeout(() => {
      setResumeData(prev => ({
        ...prev,
        summary: prev.summary + ' Enhanced with AI insights and professional language optimization.'
      }));
      setIsLoading(false);
      alert('Profile enhanced with AI!');
    }, 1000);
    setAiDropdownOpen(false);
  };

  const enhanceExperience = async () => {
    if (!resumeData.experience?.length) {
      alert('Please add work experience first');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setResumeData(prev => ({
        ...prev,
        experience: prev.experience?.map(exp => ({
          ...exp,
          accomplishment: [...(exp.accomplishment || []), 'Enhanced achievement with quantified results']
        }))
      }));
      setIsLoading(false);
      alert('Experience enhanced with AI!');
    }, 1000);
    setAiDropdownOpen(false);
  };

  const enhanceProjects = async () => {
    if (!resumeData.projects?.length) {
      alert('Please add projects first');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setResumeData(prev => ({
        ...prev,
        projects: prev.projects?.map(project => ({
          ...project,
          description: project.description + ' Enhanced with technical details and impact metrics.'
        }))
      }));
      setIsLoading(false);
      alert('Projects enhanced with AI!');
    }, 1000);
    setAiDropdownOpen(false);
  };

  const enhanceSkill = (index: number) => {
    const skill = resumeData.skills?.[index];
    if (!skill) return;
    
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills?.map((s, i) => 
        i === index ? `${s} (Advanced)` : s
      )
    }));
    alert(`Skill "${skill}" enhanced!`);
  };

  // Form handlers
  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...(prev.experience || []), {
        title: '',
        companyName: '',
        date: '',
        companyLocation: '',
        accomplishment: []
      }]
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...(prev.projects || []), {
        title: '',
        description: '',
        duration: ''
      }]
    }));
  };

  const addSkill = () => {
    const skill = prompt('Enter a skill:');
    if (skill) {
      setResumeData(prev => ({
        ...prev,
        skills: [...(prev.skills || []), skill]
      }));
    }
  };

  const addAchievement = () => {
    setResumeData(prev => ({
      ...prev,
      achievements: [...(prev.achievements || []), {
        keyAchievements: '',
        describe: ''
      }]
    }));
  };

  const removeSkill = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills?.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Left corner buttons as requested */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSaveResume}
                disabled={isLoading}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Save className="mr-2 h-4 w-4" />
                Save
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </button>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900">Resume Builder Pro</h1>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2">
              <button
                onClick={handleZoomOut}
                className="p-1 rounded hover:bg-gray-200 transition-colors"
              >
                <ZoomOut className="h-4 w-4 text-gray-600" />
              </button>
              <span className="text-sm font-medium text-gray-700 min-w-12 text-center">
                {zoomLevel}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1 rounded hover:bg-gray-200 transition-colors"
              >
                <ZoomIn className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Main Action Buttons */}
            <div
  ref={formRef}
  className="bg-white rounded-xl shadow-sm border p-8"
  style={{
    transform: `scale(${zoomLevel / 100})`,
    transformOrigin: "top left",
    color: fontColor,
    fontFamily: fontStyle,
  }}
>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                {/* Upload Resume Dropdown */}
                <div className="relative">
                  <button
                    className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    onClick={() => setUploadDropdownOpen(!uploadDropdownOpen)}
                  >
                    <span className="flex items-center">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Resume
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {uploadDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <button
                        onClick={handleManualEdit}
                        className="w-full px-4 py-3 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Manual Edit
                      </button>
                      <button
                        onClick={handleAIEdit}
                        className="w-full px-4 py-3 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center border-t border-gray-100"
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        AI Edit
                      </button>
                    </div>
                  )}
                </div>

                {/* AI Assistant Dropdown */}
                <div className="relative">
                  <button
                    className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    onClick={() => setAiDropdownOpen(!aiDropdownOpen)}
                  >
                    <span className="flex items-center">
                      <Bot className="mr-2 h-4 w-4" />
                      AI Assistant
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {aiDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <button
                        onClick={enhanceProfile}
                        className="w-full px-4 py-3 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Improve Profile with AI
                      </button>
                      <button
                        onClick={enhanceExperience}
                        className="w-full px-4 py-3 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center border-t border-gray-100"
                      >
                        <Briefcase className="mr-2 h-4 w-4" />
                        Enhance Experience with AI
                      </button>
                      <button
                        onClick={enhanceProjects}
                        className="w-full px-4 py-3 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center border-t border-gray-100"
                      >
                        <Code className="mr-2 h-4 w-4" />
                        AI-Powered Projects Description
                      </button>
                    </div>
                  )}
                </div>

                {/* Share Resume */}
                <button
                  onClick={handleShareResume}
                  className="w-full flex items-center justify-start px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Resume
                </button>
              </div>
            </div>

            {/* Customization Controls */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customization</h3>
              <div className="space-y-4">
                {/* Font Style */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Font Style</label>
                  <select
                    value={fontStyle}
                    onChange={(e) => setFontStyle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Inter">Inter</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Lato">Lato</option>
                    <option value="Montserrat">Montserrat</option>
                  </select>
                </div>

                {/* Font Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Font Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={fontColor}
                      onChange={(e) => setFontColor(e.target.value)}
                      className="w-10 h-10 border border-gray-300 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={fontColor}
                      onChange={(e) => setFontColor(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Form */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Add</h3>
              <div className="space-y-2">
                <button
                  onClick={addExperience}
                  className="w-full px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  + Add Experience
                </button>
                <button
                  onClick={addProject}
                  className="w-full px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  + Add Project
                </button>
                <button
                  onClick={addSkill}
                  className="w-full px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  + Add Skill
                </button>
                <button
                  onClick={addAchievement}
                  className="w-full px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  + Add Achievement
                </button>
              </div>
            </div>

            {/* Dynamic Enhance Buttons */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Enhance</h3>
              <div className="space-y-2">
                {/* Skills */}
                {resumeData.skills?.map((skill, index) => (
                  <div key={`skill-${index}`} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">"{skill}"</span>
                    <button
                      onClick={() => enhanceSkill(index)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Wand2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                
                {/* Show message when no items */}
                {!resumeData.skills?.length && !resumeData.experience?.length && !resumeData.projects?.length && (
                  <p className="text-sm text-gray-600 text-center py-4">
                    Add skills, experience, or projects to see enhancement options
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Resume Preview */}
          <div className="lg:col-span-3">
            <div
              className="bg-white rounded-xl shadow-sm border p-8"
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: "top left",
                color: fontColor,
                fontFamily: fontStyle,
              }}
            >
              {/* Basic Info Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={resumeData.name || ''}
                  onChange={(e) => setResumeData(prev => ({ ...prev, name: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Your Role"
                  value={resumeData.role || ''}
                  onChange={(e) => setResumeData(prev => ({ ...prev, role: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={resumeData.email || ''}
                  onChange={(e) => setResumeData(prev => ({ ...prev, email: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={resumeData.phone || ''}
                  onChange={(e) => setResumeData(prev => ({ ...prev, phone: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="LinkedIn"
                  value={resumeData.linkedin || ''}
                  onChange={(e) => setResumeData(prev => ({ ...prev, linkedin: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={resumeData.location || ''}
                  onChange={(e) => setResumeData(prev => ({ ...prev, location: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <textarea
                  placeholder="Professional Summary"
                  value={resumeData.summary || ''}
                  onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                  className="col-span-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                />
              </div>

              {/* Header Section */}
              <div className="text-center mb-8 pb-6 border-b border-gray-200">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {resumeData.name || "Your Name"}
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  {resumeData.role || "Your Role"}
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                  {resumeData.phone && (
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4" />
                      <span>{resumeData.phone}</span>
                    </div>
                  )}
                  {resumeData.email && (
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4" />
                      <span>{resumeData.email}</span>
                    </div>
                  )}
                  {resumeData.linkedin && (
                    <div className="flex items-center">
                      <Linkedin className="mr-2 h-4 w-4" />
                      <span>{resumeData.linkedin}</span>
                    </div>
                  )}
                  {resumeData.location && (
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>{resumeData.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Professional Summary */}
              {resumeData.summary && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="mr-2 h-5 w-5 text-blue-600" />
                    Professional Summary
                  </h2>
                  <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
                </div>
              )}

              {/* Experience Section */}
              {resumeData.experience && resumeData.experience.length > 0 && (
  <div className="mb-8">
    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
      <Briefcase className="mr-2 h-5 w-5 text-blue-600" />
      Work Experience
    </h2>
    {resumeData.experience.map((exp, index) => (
      <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
          <input
            type="text"
            placeholder="Job Title"
            value={exp.title}
            onChange={(e) => {
              const newExp = [...(resumeData.experience || [])];
              newExp[index].title = e.target.value;
              setResumeData(prev => ({ ...prev, experience: newExp }));
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Company Name"
            value={exp.companyName}
            onChange={(e) => {
              const newExp = [...(resumeData.experience || [])];
              newExp[index].companyName = e.target.value;
              setResumeData(prev => ({ ...prev, experience: newExp }));
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Date Range"
            value={exp.date}
            onChange={(e) => {
              const newExp = [...(resumeData.experience || [])];
              newExp[index].date = e.target.value;
              setResumeData(prev => ({ ...prev, experience: newExp }));
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Location"
            value={exp.companyLocation}
            onChange={(e) => {
              const newExp = [...(resumeData.experience || [])];
              newExp[index].companyLocation = e.target.value;
              setResumeData(prev => ({ ...prev, experience: newExp }));
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Accomplishments Input Fields */}
        <div className="mb-3">
          <label className="font-medium text-gray-800 mb-2 block">Accomplishments</label>
          {exp.accomplishment?.map((point, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={point}
                onChange={(e) => {
                  const newExp = [...(resumeData.experience || [])];
                  newExp[index].accomplishment![i] = e.target.value;
                  setResumeData(prev => ({ ...prev, experience: newExp }));
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              />
              <button
                onClick={() => {
                  const newExp = [...(resumeData.experience || [])];
                  newExp[index].accomplishment!.splice(i, 1);
                  setResumeData(prev => ({ ...prev, experience: newExp }));
                }}
                className="text-red-600 hover:text-red-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}

          <button
            onClick={() => {
              const newExp = [...(resumeData.experience || [])];
              if (!newExp[index].accomplishment) newExp[index].accomplishment = [];
              newExp[index].accomplishment!.push('');
              setResumeData(prev => ({ ...prev, experience: newExp }));
            }}
            className="text-sm text-blue-600 hover:underline mt-1"
          >
            + Add Point
          </button>
        </div>

        {/* Delete Experience Button */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              const newExp = [...(resumeData.experience || [])];
              newExp.splice(index, 1);
              setResumeData(prev => ({ ...prev, experience: newExp }));
            }}
            className="text-sm text-red-500 hover:text-red-700"
          >
            🗑️ Delete Experience
          </button>
        </div>
      </div>
    ))}

    {/* Add New Experience */}
    <div className="mt-4">
      <button
        onClick={() => {
          const newExp = [
            ...(resumeData.experience || []),
            {
              title: '',
              companyName: '',
              date: '',
              companyLocation: '',
              accomplishment: ['']
            }
          ];
          setResumeData(prev => ({ ...prev, experience: newExp }));
        }}
        className="text-blue-600 hover:underline"
      >
        ➕ Add New Experience
      </button>
    </div>
  </div>
)}


              {/* Skills Section */}
              {/* Projects Section */}
{resumeData.projects && (
  <div className="mb-8">
   
    
    {resumeData.projects.map((project, index) => (
      <div key={index} className="mb-4 last:mb-0 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
          <input
            type="text"
            placeholder="Project Title"
            value={project.title}
            onChange={(e) => {
              const newProjects = [...resumeData.projects!];
              newProjects[index].title = e.target.value;
              setResumeData(prev => ({ ...prev, projects: newProjects }));
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Duration"
            value={project.duration}
            onChange={(e) => {
              const newProjects = [...resumeData.projects!];
              newProjects[index].duration = e.target.value;
              setResumeData(prev => ({ ...prev, projects: newProjects }));
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <textarea
            placeholder="Project Description"
            value={project.description}
            onChange={(e) => {
              const newProjects = [...resumeData.projects!];
              newProjects[index].description = e.target.value;
              setResumeData(prev => ({ ...prev, projects: newProjects }));
            }}
            className="col-span-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-gray-900">{project.title || 'Project Title'}</h3>
          <span className="text-sm text-gray-600">{project.duration}</span>
        </div>
        <p className="text-gray-700 mb-2">{project.description || 'Project description...'}</p>
        <div className="flex justify-end">
          <button
            onClick={() => {
              const newProjects = [...resumeData.projects!];
              newProjects.splice(index, 1);
              setResumeData(prev => ({ ...prev, projects: newProjects }));
            }}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    ))}

    
  </div>
)}


             {/* Achievements Section */}
{resumeData.achievements && (
  <div className="mb-8">
    

    {resumeData.achievements.map((achievement, index) => (
      <div key={index} className="mb-4 last:mb-0 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 gap-2 mb-4">
          <input
            type="text"
            placeholder="Achievement Title"
            value={achievement.keyAchievements}
            onChange={(e) => {
              const newAchievements = [...resumeData.achievements!];
              newAchievements[index].keyAchievements = e.target.value;
              setResumeData(prev => ({ ...prev, achievements: newAchievements }));
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <textarea
            placeholder="Achievement Description"
            value={achievement.describe}
            onChange={(e) => {
              const newAchievements = [...resumeData.achievements!];
              newAchievements[index].describe = e.target.value;
              setResumeData(prev => ({ ...prev, achievements: newAchievements }));
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>

        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {achievement.keyAchievements || 'Achievement Title'}
        </h3>
        <p className="text-gray-700 mb-2">
          {achievement.describe || 'Achievement description...'}
        </p>

        {/* Delete Button */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              const newAchievements = [...resumeData.achievements!];
              newAchievements.splice(index, 1);
              setResumeData(prev => ({ ...prev, achievements: newAchievements }));
            }}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    ))}

    
  </div>
)}

              {/* Empty State */}
              {!resumeData.name && !resumeData.summary && !resumeData.experience?.length && (
                <div className="text-center py-12">
                  <div className="text-4xl text-gray-300 mb-4">📄</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Start Building Your Resume</h3>
                  <p className="text-gray-600">
                    Fill in your information above and use the controls on the left to customize your resume.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Processing your resume...</p>
          </div>
        </div>
      )}

      {/* Hidden file input for AI upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default ResumeBuilderComplete;