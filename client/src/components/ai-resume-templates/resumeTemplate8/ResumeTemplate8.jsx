import React, { useState, useRef } from 'react';

// Complete UI Components with full styling
const Button = ({ children, variant = 'default', size = 'default', className = '', onClick, ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 hover:text-gray-900',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300'
  };
  
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-8 px-3 text-sm',
    lg: 'h-12 px-8'
  };
  
  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ className = '', ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Textarea = ({ className = '', ...props }) => (
  <textarea
    className={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 resize-none ${className}`}
    {...props}
  />
);

const Card = ({ children, className = '', ...props }) => (
  <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const Badge = ({ children, variant = 'default', className = '', ...props }) => {
  const variants = {
    default: 'bg-blue-100 text-blue-800 border-blue-200',
    secondary: 'bg-gray-100 text-gray-800 border-gray-200',
    outline: 'bg-white text-gray-700 border-gray-300'
  };
  const [editMode, setEditMode] = useState(false);

  
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

// Icons - Complete set
const Upload = ({ className = '' }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const Bot = ({ className = '' }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);


const Save = ({ className = '' }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

const Share = ({ className = '' }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
  </svg>
);

const Download = ({ className = '' }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ZoomIn = ({ className = '' }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
  </svg>
);

const ZoomOut = ({ className = '' }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
  </svg>
);

const Mail = ({ className = '' }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const Phone = ({ className = '' }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MapPin = ({ className = '' }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Calendar = ({ className = '' }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const Building = ({ className = '' }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const ChevronDown = ({ className = '' }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

// Sample resume data
const initialResumeData = {
  personalInfo: {
    name: "Alex Johnson",
    title: "Senior Software Engineer",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA"
  },
  summary: "Experienced software engineer with 6+ years of expertise in full-stack development, cloud architecture, and team leadership. Proven track record of delivering scalable applications and mentoring junior developers. Passionate about clean code, performance optimization, and emerging technologies.",
  experiences: [
    {
      id: "1",
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      startDate: "2022-01",
      endDate: "Present",
      responsibilities: [
        "Lead development of microservices architecture serving 1M+ users",
        "Mentored 4 junior developers and conducted technical interviews",
        "Improved application performance by 45% through optimization",
        "Collaborated with product teams to define technical requirements"
      ]
    },
    {
      id: "2",
      title: "Full Stack Developer",
      company: "StartupXYZ",
      location: "Remote",
      startDate: "2020-03",
      endDate: "2021-12",
      responsibilities: [
        "Built responsive web applications using React and Node.js",
        "Implemented CI/CD pipelines reducing deployment time by 60%",
        "Designed RESTful APIs handling 10K+ requests per minute",
        "Collaborated with cross-functional teams in Agile environment"
      ]
    }
  ],
  skills: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "AWS", "Docker", "PostgreSQL", "Git", "Jenkins"],
  projects: [
    {
      id: "1",
      name: "E-commerce Platform",
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
      description: "Built a full-stack e-commerce platform with payment integration, inventory management, and real-time analytics. Achieved 99.9% uptime and handled 50K+ monthly transactions."
    },
    {
      id: "2",
      name: "Task Management App",
      technologies: ["React Native", "Firebase", "Redux"],
      description: "Developed a cross-platform mobile app for project management with real-time collaboration features. Published on both iOS and Android stores with 4.8+ rating."
    }
  ]
};

export default function CompleteResumeBuilder() {
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const resumeRef = useRef(null);
  
  
  

 // Navigation handlers
const handleUpload = () => {
  setShowUploadMenu(!showUploadMenu);
};
const fileInputRef = useRef(null);

const handleFileUploadClick = () => {
  if (fileInputRef.current) {
    fileInputRef.current.click();
  }
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    // Placeholder logic — we'll parse the file in next steps
    console.log("File uploaded:", file.name);
    alert(`Uploaded: ${file.name}`);
  }
};


const handleManualEdit = () => {
  alert("Manual Edit selected - File upload functionality would be implemented here");
  setShowUploadMenu(false);
};

const handleAIEdit = () => {
  alert("AI Edit selected - AI-powered resume parsing would be implemented here");
  setShowUploadMenu(false);
};
const [isEditing, setIsEditing] = useState(false);

const handleAIAssistant = () => {
  alert("AI Assistant activated - AI-powered suggestions and improvements would be implemented here");
};


  const handleSave = () => {
    alert("Resume saved successfully!");
  };

  const handleShare = () => {
    alert("Share functionality - A shareable link would be generated here");
  };

  const handleDownload = () => {
    alert("PDF download initiated - In a real app, this would generate and download a PDF");
    window.print();
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 150));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const formatDateRange = (startDate, endDate) => {
    const formatDate = (date) => {
      if (!date) return '';
      const [year, month] = date.split('-');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${monthNames[parseInt(month) - 1]} ${year}`;
    };
    
    const start = formatDate(startDate);
    const end = endDate === 'Present' ? 'Present' : formatDate(endDate);
    return `${start} - ${end}`;
  };

  return (
    <div className="min-h-screen bg-gray-100" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Top Navigation - Always Visible */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Logo and main actions */}
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
              
              {/* Upload Resume with Dropdown */}
              <div className="relative">
                <Button 
                  variant="outline" 
                  onClick={handleUpload}
                  className="flex items-center space-x-2 bg-white border-2 border-gray-300 hover:bg-gray-50"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Resume</span>
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
                {showUploadMenu && (
  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
    <button
      onClick={handleManualEdit}
      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
    >
      Manual Edit (.txt)
    </button>
    <button
      onClick={handleAIEdit}
      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
    >
      AI Edit
    </button>
  </div>
)}

              <input
  type="file"
  accept=".txt"
  ref={fileInputRef}
  onChange={handleFileChange}
  className="hidden"
/>
  
                
                {/* Dropdown Menu */}
                {showUploadMenu && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <button
                        onClick={handleManualEdit}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Manual Edit
                      </button>
                      <button
                        onClick={handleAIEdit}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      >
                        AI Edit
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* AI Assistant */}
              <Button 
                variant="outline" 
                onClick={handleAIAssistant}
                className="flex items-center space-x-2 bg-white border-2 border-gray-300 hover:bg-gray-50"
              >
                <Bot className="w-4 h-4" />
                <span>AI Assistant</span>
              </Button>
            </div>
             {/* Edit Mode */}
<Button
  variant="outline"
  onClick={() => setIsEditing(prev => !prev)}
  className="flex items-center space-x-2 bg-white border-2 border-gray-300 hover:bg-gray-50"
>
  <span>Edit Mode</span>
</Button>

            
            
            {/* Right side - Action buttons */}
            <div className="flex items-center space-x-4">
              {/* Save Button */}
              <Button 
                variant="outline" 
                onClick={handleSave}
                className="flex items-center space-x-2 bg-white border-2 border-gray-300 hover:bg-gray-50"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </Button>

              {/* Share Button */}
              <Button 
                variant="outline" 
                onClick={handleShare}
                className="flex items-center space-x-2 bg-white border-2 border-gray-300 hover:bg-gray-50"
              >
                <Share className="w-4 h-4" />
                <span>Share</span>
              </Button>

              {/* Download PDF Button */}
              <Button 
                onClick={handleDownload}
                className="flex items-center space-x-2 bg-blue-600 text-white hover:bg-blue-700"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </Button>

              {/* Zoom Controls */}
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleZoomOut}
                  className="p-2 bg-white border-2 border-gray-300 hover:bg-gray-50"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm text-gray-600 font-medium min-w-[60px] text-center">
                  {zoomLevel}%
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleZoomIn}
                  className="p-2 bg-white border-2 border-gray-300 hover:bg-gray-50"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex justify-center py-8 px-4">
        <div 
          ref={resumeRef}
          className="bg-white shadow-2xl rounded-lg overflow-hidden"
          style={{ 
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.3s ease-in-out',
            width: '794px', // A4 width in pixels
            minHeight: '1123px' // A4 height in pixels
          }}
        >
          {/* Resume Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                {isEditing ? (
  <>
    <input
      value={resumeData.personalInfo.name}
      onChange={(e) =>
        setResumeData({
          ...resumeData,
          personalInfo: {
            ...resumeData.personalInfo,
            name: e.target.value,
          },
        })
      }
      className="text-4xl font-bold mb-2 bg-white text-black px-2 rounded"
    />
    <input
      value={resumeData.personalInfo.title}
      onChange={(e) =>
        setResumeData({
          ...resumeData,
          personalInfo: {
            ...resumeData.personalInfo,
            title: e.target.value,
          },
        })
      }
      className="text-xl text-black bg-white px-2 rounded"
    />
  </>
) : (
  <>
    <h1 className="text-4xl font-bold mb-2">{resumeData.personalInfo.name}</h1>
    <p className="text-xl text-blue-100">{resumeData.personalInfo.title}</p>
  </>
)}

              </div>
              <div className="mt-4 md:mt-0 md:ml-8">
  <div className="space-y-2 text-blue-100">
    <div className="flex items-center space-x-2">
      <Mail className="w-4 h-4" />
      {isEditing ? (
        <Input
          value={resumeData.personalInfo.email}
          onChange={(e) =>
            setResumeData({
              ...resumeData,
              personalInfo: {
                ...resumeData.personalInfo,
                email: e.target.value,
              },
            })
          }
          className="text-sm bg-blue-700 text-black border-blue-500"
        />
      ) : (
        <span>{resumeData.personalInfo.email}</span>
      )}
    </div>
    <div className="flex items-center space-x-2">
      <Phone className="w-4 h-4" />
      {isEditing ? (
        <Input
          value={resumeData.personalInfo.phone}
          onChange={(e) =>
            setResumeData({
              ...resumeData,
              personalInfo: {
                ...resumeData.personalInfo,
                phone: e.target.value,
              },
            })
          }
          className="text-sm bg-blue-700 text-black border-blue-500"
        />
      ) : (
        <span>{resumeData.personalInfo.phone}</span>
      )}
    </div>
    <div className="flex items-center space-x-2">
      <MapPin className="w-4 h-4" />
      {isEditing ? (
        <Input
          value={resumeData.personalInfo.location}
          onChange={(e) =>
            setResumeData({
              ...resumeData,
              personalInfo: {
                ...resumeData.personalInfo,
                location: e.target.value,
              },
            })
          }
          className="text-sm bg-blue-700 text-black border-blue-500"
        />
      ) : (
        <span>{resumeData.personalInfo.location}</span>
      )}
    </div>
  </div>
</div>

            </div>
          </div>

          {/* Resume Content */}
          <div className="p-8 space-y-8">
            {/* Professional Summary */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                Professional Summary
              </h2>
              {isEditing ? (
  <Textarea
    value={resumeData.summary}
    onChange={(e) =>
      setResumeData({ ...resumeData, summary: e.target.value })
    }
  />
) : (
  <p className="text-gray-700 leading-relaxed text-justify">
    {resumeData.summary}
  </p>
)}

            </section>

            {/* Work Experience */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
                Work Experience
              </h2>
              <div className="space-y-6">
                {resumeData.experiences.map((exp, index) => (
                  <div key={exp.id} className="border-l-4 border-blue-200 pl-6 relative">
                    <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-2 top-1"></div>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
                        <div className="flex items-center space-x-2 text-gray-600 mt-1">
                          <Building className="w-4 h-4" />
                          <span className="font-medium">{exp.company}</span>
                          <span>•</span>
                          <span>{exp.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-500 mt-1 md:mt-0">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">{formatDateRange(exp.startDate, exp.endDate)}</span>
                      </div>
                    </div>
                    <ul className="space-y-2 mt-4">
                      {exp.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="text-gray-700 leading-relaxed flex items-start">
                          <span className="text-blue-600 mr-3 mt-1.5 font-bold">•</span>
                          <span className="flex-1">{responsibility}</span>
{isEditing && (
  <button
    onClick={() => {
      const newExperiences = [...resumeData.experiences];
      newExperiences[index].responsibilities.splice(idx, 1);
      setResumeData({ ...resumeData, experiences: newExperiences });
    }}
    className="ml-2 text-red-600 hover:text-red-800 font-semibold text-sm"
  >
    Delete
  </button>
)}

                        </li>
                      ))}
                    </ul>
                    {isEditing && (
  <button
    onClick={() => {
      const newExperiences = [...resumeData.experiences];
      newExperiences[index].responsibilities.push("New responsibility...");
      setResumeData({ ...resumeData, experiences: newExperiences });
    }}
    className="mt-2 text-blue-600 hover:underline text-sm"
  >
    + Add Responsibility
  </button>
)}

                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
                Skills
              </h2>
              <div className="flex flex-wrap gap-3">
                {resumeData.skills.map((skill, index) => (
  <div key={index} className="flex items-center gap-2">
    <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1 text-sm">
      {skill}
    </Badge>
    {isEditing && (
      <button
        onClick={() => {
          const updatedSkills = [...resumeData.skills];
          updatedSkills.splice(index, 1);
          setResumeData({ ...resumeData, skills: updatedSkills });
        }}
        className="text-red-500 hover:text-red-700 text-xs"
      >
        ✕
      </button>
    )}
  </div>
))}
{isEditing && (
  <button
    onClick={() => {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, "New Skill"],
      });
    }}
    className="mt-2 text-blue-600 hover:underline text-sm"
  >
    + Add Skill
  </button>
)}

              </div>
            </section>

            {/* Projects */}
            <section>
              <div className="flex items-center justify-between mb-6 border-b-2 border-blue-600 pb-2">
  <h2 className="text-2xl font-bold text-gray-800">Key Projects</h2>
  <Button 
    variant="ghost" 
    onClick={() => setIsEditing(!isEditing)} 
    className="text-blue-600 hover:underline text-sm"
  >
    {isEditing ? "Done" : "Edit"}
  </Button>
</div>

              <div className="space-y-6">
                {resumeData.projects.map((project, index) => (
  <Card key={project.id} className="p-6 border-l-4 border-blue-200">
    {isEditing ? (
      <>
      {isEditing && (
  <Button
    onClick={() => {
      const newProject = {
        id: Date.now().toString(),
        name: "",
        technologies: [],
        description: ""
      };
      setResumeData({ ...resumeData, projects: [...resumeData.projects, newProject] });
    }}
    variant="outline"
    className="mt-4"
  >
    + Add Project
  </Button>
)}

        <Input
          value={project.name}
          onChange={(e) => {
            const updated = [...resumeData.projects];
            updated[index].name = e.target.value;
            setResumeData({ ...resumeData, projects: updated });
          }}
          placeholder="Project Name"
          className="mb-2"
        />
        <Textarea
          value={project.description}
          onChange={(e) => {
            const updated = [...resumeData.projects];
            updated[index].description = e.target.value;
            setResumeData({ ...resumeData, projects: updated });
          }}
          placeholder="Description"
          className="mb-2"
        />
        <Input
          value={project.technologies.join(', ')}
          onChange={(e) => {
            const updated = [...resumeData.projects];
            updated[index].technologies = e.target.value.split(',').map(t => t.trim());
            setResumeData({ ...resumeData, projects: updated });
          }}
          placeholder="Technologies (comma-separated)"
          className="mb-2"
        />
        <Button
          onClick={() => {
            const updated = [...resumeData.projects];
            updated.splice(index, 1);
            setResumeData({ ...resumeData, projects: updated });
          }}
          variant="outline"
          className="text-red-500 mt-2"
        >
          Delete
        </Button>
      </>
    ) : (
      <>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.name}</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {project.technologies.map((tech, i) => (
            <Badge key={i} variant="outline" className="text-xs border-gray-300 text-gray-600">
              {tech}
            </Badge>
          ))}
        </div>
        <p className="text-gray-700 leading-relaxed text-justify">{project.description}</p>
      </>
    )}
  </Card>
))}

              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showUploadMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUploadMenu(false)}
        ></div>
      )}
    </div>
  );
}