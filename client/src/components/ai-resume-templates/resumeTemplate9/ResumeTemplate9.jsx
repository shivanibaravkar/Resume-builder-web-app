// src/App.js
import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import './ResumeTemplate9.css';

const ResumeStudio = () => {
  // Resume data
  const [resumeData, setResumeData] = useState({
    name: "John Doe",
    role: "Full Stack Developer | JavaScript | React | Node.js",
    phone: "123-456-7890",
    email: "john.doe@example.com",
    linkedin: "linkedin.com/in/johndoe",
    location: "Pune, Maharashtra",
    summary: "Results-driven Full Stack Developer with 3+ years of experience in building scalable web applications using React, Node.js, and MongoDB. Proven ability to optimize performance, implement RESTful APIs, and deliver responsive UI designs.",
    experience: [
      {
        title: "Web Development Intern",
        companyName: "CodeChart Technologies",
        date: "Jun 2023 - Sep 2023",
        companyLocation: "San Francisco, CA",
        accomplishment: [
          "Built responsive frontend interfaces using React.js and Tailwind CSS for internal tools used by over 100 staff",
          "Integrated REST APIs to fetch and display real-time data from a Node.js backend",
          "Used Git and GitHub for version control and collaborated with senior developers via pull requests"
        ]
      },
      {
        title: "Cloud & DevOps Intern",
        companyName: "Nimbus CloudTech",
        date: "Jan 2023 - Apr 2023",
        companyLocation: "Austin, TX",
        accomplishment: [
          "Configured CI/CD pipelines using GitHub Actions for automated testing and deployment of web apps",
          "Assisted in setting up monitoring and alerting using Prometheus and Grafana on Kubernetes clusters",
          "Deployed and maintained containerized applications using Docker and Helm charts"
        ]
      }
    ],
    education: [
      {
        degree: "B.S. Computer Science",
        institution: "Stanford University",
        duration: "2019 - 2023",
        location: "Stanford, CA"
      }
    ],
    achievements: [
      {
        keyAchievements: "Hackathon Winner",
        describe: "Won first place in a 48-hour coding competition with an AI-powered resume builder"
      }
    ],
    skills: ["React.js", "JavaScript", "Node.js", "MongoDB", "Docker", "Kubernetes"],
    languages: ["English", "Spanish"],
    projects: [
      {
        title: "AI Resume Builder",
        description: "Developed a full-stack AI-powered resume builder with real-time PDF export",
        duration: "6 months"
      }
    ],
    courses: [
      {
        title: "Cloud Infrastructure",
        description: "Completed advanced course on cloud deployment and serverless architecture"
      }
    ],
    certifications: [
      {
        title: "AWS Certified Developer",
        issuedBy: "Amazon Web Services",
        year: "2023"
      }
    ],
    hobbies: ["Reading Tech Blogs", "Playing Chess"]
  });

  // UI state
  const [fontFamily, setFontFamily] = useState('Inter, sans-serif');
  const [fontColor, setFontColor] = useState('#2d3748');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showUploadDropdown, setShowUploadDropdown] = useState(false);
  const [showAIDropdown, setShowAIDropdown] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showShareNotification, setShowShareNotification] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  
  const fileInputRef = useRef(null);
  const resumeRef = useRef(null);

  // Toggle editing mode
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  // Handle input changes
  const handleInputChange = (section, field, value, index = null, subIndex = null) => {
    if (!isEditing) return;
    
    if (index === null) {
      // Top-level fields
      setResumeData(prev => ({ ...prev, [field]: value }));
    } else if (subIndex === null) {
      // Array of objects
      const updatedSection = [...resumeData[section]];
      updatedSection[index][field] = value;
      setResumeData(prev => ({ ...prev, [section]: updatedSection }));
    } else {
      // Nested arrays (like accomplishments)
      const updatedSection = [...resumeData[section]];
      updatedSection[index][field][subIndex] = value;
      setResumeData(prev => ({ ...prev, [section]: updatedSection }));
    }
  };

  // Add new section item
  const addSectionItem = (section) => {
    if (!isEditing) return;
    
    const newItem = {
      experience: {
        title: "New Position",
        companyName: "Company Name",
        date: "2023 - Present",
        companyLocation: "City, Country",
        accomplishment: ["New accomplishment"]
      },
      education: {
        degree: "New Degree",
        institution: "Institution Name",
        duration: "2023 - 2025",
        location: "City, Country"
      },
      achievements: {
        keyAchievements: "New Achievement",
        describe: "Achievement description"
      },
      projects: {
        title: "New Project",
        description: "Project description",
        duration: "6 months"
      },
      courses: {
        title: "New Course",
        description: "Course description"
      },
      certifications: {
        title: "New Certification",
        issuedBy: "Issuing Authority",
        year: "2023"
      }
    }[section];
    
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  // Remove section item
  const removeSectionItem = (section, index) => {
    if (!isEditing) return;
    
    const updatedSection = [...resumeData[section]];
    updatedSection.splice(index, 1);
    setResumeData(prev => ({ ...prev, [section]: updatedSection }));
  };

  // Add new accomplishment
  const addAccomplishment = (sectionIndex) => {
    if (!isEditing) return;
    
    const updatedExperience = [...resumeData.experience];
    updatedExperience[sectionIndex].accomplishment.push("New accomplishment");
    setResumeData(prev => ({ ...prev, experience: updatedExperience }));
  };

  // Remove accomplishment
  const removeAccomplishment = (sectionIndex, accomplishmentIndex) => {
    if (!isEditing) return;
    
    const updatedExperience = [...resumeData.experience];
    updatedExperience[sectionIndex].accomplishment.splice(accomplishmentIndex, 1);
    setResumeData(prev => ({ ...prev, experience: updatedExperience }));
  };

  // Upload resume functionality
  const handleManualEdit = () => {
    setShowUploadDropdown(false);
    setIsEditing(true);
    alert("You can now edit resume sections directly in the form fields");
  };

  const handleAIEdit = () => {
    setShowUploadDropdown(false);
    fileInputRef.current.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name;
      const fileType = fileName.split('.').pop().toLowerCase();
      
      if (fileType === 'pdf' || fileType === 'docx') {
        alert(`Uploaded: ${fileName}`);
        console.log(`File uploaded: ${fileName}`);
      } else {
        alert('Please select a PDF or DOCX file');
      }
    }
  };

  // AI Enhancement functionality
  const enhanceSection = (section) => {
    setShowAIDropdown(false);
    alert(`Enhancing ${section} with AI...`);
    console.log(`AI enhancement applied to: ${section}`);
  };

  // Save resume functionality
  const saveResume = () => {
    // Remove empty arrays
    const cleanedData = { ...resumeData };
    Object.keys(cleanedData).forEach(key => {
      if (Array.isArray(cleanedData[key]) && cleanedData[key].length === 0) {
        delete cleanedData[key];
      }
    });
    
    localStorage.setItem('resumeData', JSON.stringify(cleanedData));
    console.log('Resume saved:', cleanedData);
    alert('Resume saved successfully!');
  };

  // Share resume functionality
  const shareResume = () => {
    const resumeLink = window.location.href;
    navigator.clipboard.writeText(resumeLink)
      .then(() => {
        setShowShareNotification(true);
        setTimeout(() => setShowShareNotification(false), 3000);
      })
      .catch(() => alert('Failed to copy link to clipboard.'));
  };

  // Download PDF functionality
  const downloadPDF = async () => {
    setIsDownloading(true);
    
    try {
      const resumeElement = resumeRef.current;
      const canvas = await html2canvas(resumeElement, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Zoom functionality
  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 1.5));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.8));
  const resetZoom = () => setZoomLevel(1);

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo-container">
          <div className="logo">
            <span className="logo-icon">📝</span>
            <span>Resume Studio</span>
          </div>
          <div className="tagline">Craft your perfect resume with AI-powered tools</div>
        </div>
        <div className="header-actions">
          <div className={`edit-toggle ${isEditing ? 'editing' : 'viewing'}`} onClick={toggleEditing}>
            <div className="toggle-handle"></div>
            <span className="toggle-text">{isEditing ? "EDITING" : "VIEWING"}</span>
          </div>
          <div className="user-info">
            <div className="avatar">JD</div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="main-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3 className="section-title">Resume Tools</h3>
            
            {/* Upload Resume Dropdown */}
            <div className="tool-container">
              <button 
                className="tool-btn"
                onClick={() => setShowUploadDropdown(!showUploadDropdown)}
              >
                <span className="tool-icon">📤</span>
                Upload Resume
                <span className="chevron">▼</span>
              </button>
              
              {showUploadDropdown && (
                <div className="dropdown">
                  <div className="dropdown-item" onClick={handleManualEdit}>
                    <span className="dropdown-icon">✏️</span> Manual Edit
                  </div>
                  <div className="dropdown-item" onClick={handleAIEdit}>
                    <span className="dropdown-icon">🤖</span> AI Edit
                  </div>
                </div>
              )}
              
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".pdf,.docx"
                onChange={handleFileUpload}
              />
            </div>
            
            {/* AI Assistant Dropdown */}
            <div className="tool-container">
              <button 
                className="tool-btn"
                onClick={() => setShowAIDropdown(!showAIDropdown)}
              >
                <span className="tool-icon">🤖</span>
                AI Assistant
                <span className="chevron">▼</span>
              </button>
              
              {showAIDropdown && (
                <div className="dropdown">
                  <div className="dropdown-item" onClick={() => enhanceSection('Profile')}>
                    <span className="dropdown-icon">👤</span> Improve Profile
                  </div>
                  <div className="dropdown-item" onClick={() => enhanceSection('Experience')}>
                    <span className="dropdown-icon">💼</span> Enhance Experience
                  </div>
                  <div className="dropdown-item" onClick={() => enhanceSection('Projects')}>
                    <span className="dropdown-icon">🚀</span> AI-Powered Projects
                  </div>
                  <div className="dropdown-item" onClick={() => enhanceSection('Summary')}>
                    <span className="dropdown-icon">📝</span> Refine Summary
                  </div>
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="action-btn" onClick={saveResume}>
                <span className="action-icon">💾</span> Save Resume
              </button>
              <button className="action-btn" onClick={shareResume}>
                <span className="action-icon">🔗</span> Share Resume
              </button>
              <button className="action-btn" onClick={downloadPDF}>
                <span className="action-icon">📥</span> Download PDF
              </button>
              <button className={`action-btn ${isEditing ? 'finish-btn' : 'edit-btn'}`} onClick={toggleEditing}>
                <span className="action-icon">{isEditing ? '✅' : '✏️'}</span> 
                {isEditing ? 'Finish Editing' : 'Edit Resume'}
              </button>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h3 className="section-title">Customization</h3>
            
            {/* Font Family */}
            <div className="customization-option">
              <label>Font Style</label>
              <div className="select-container">
                <select 
                  value={fontFamily} 
                  onChange={(e) => setFontFamily(e.target.value)}
                  disabled={!isEditing}
                >
                  <option value="Inter, sans-serif">Inter (Default)</option>
                  <option value="Arial, sans-serif">Arial</option>
                  <option value="'Times New Roman', serif">Times New Roman</option>
                  <option value="Georgia, serif">Georgia</option>
                  <option value="'Gill Sans', sans-serif">Gill Sans</option>
                </select>
                <div className="select-arrow">▼</div>
              </div>
            </div>
            
            {/* Font Color */}
            <div className="customization-option">
              <label>Font Color</label>
              <div className="color-picker-container">
                <div 
                  className="color-preview" 
                  style={{ backgroundColor: fontColor }}
                  onClick={() => isEditing && setShowColorPicker(!showColorPicker)}
                />
                {showColorPicker && (
                  <div className="color-picker">
                    {['#2d3748', '#4a5568', '#718096', '#2b6cb0', '#2c5282', '#2a4365'].map(color => (
                      <div 
                        key={color}
                        className="color-option" 
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          setFontColor(color);
                          setShowColorPicker(false);
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Clear Theme */}
            <button className="tool-btn" disabled={!isEditing}>
              <span className="tool-icon">🎨</span> Clear Theme
            </button>
          </div>
          
          <div className="sidebar-section">
            <h3 className="section-title">Zoom Controls</h3>
            <div className="zoom-controls">
              <button onClick={zoomOut} className="zoom-btn">🔍−</button>
              <button onClick={resetZoom} className="zoom-btn">Reset</button>
              <button onClick={zoomIn} className="zoom-btn">🔍+</button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="content">
          <div className={`edit-mode-indicator ${isEditing ? 'editing' : 'viewing'}`}>
            {isEditing ? "EDIT MODE - Make changes to your resume" : "VIEW MODE - Preview your final resume"}
          </div>
          
          <div className="resume-container" style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}>
            <div 
              ref={resumeRef} 
              className="resume-preview"
              style={{ 
                fontFamily: fontFamily, 
                color: fontColor 
              }}
            >
              {/* Header */}
              <div className="resume-header">
                <div className="name-container">
                  <h1 
                    className="resume-name"
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    onBlur={(e) => handleInputChange(null, "name", e.target.innerText)}
                  >
                    {resumeData.name}
                  </h1>
                  <h2 
                    className="resume-title"
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    onBlur={(e) => handleInputChange(null, "role", e.target.innerText)}
                  >
                    {resumeData.role}
                  </h2>
                </div>
                <div className="contact-info">
                  <div>
                    <span className="contact-icon">📱</span> 
                    <span
                      contentEditable={isEditing}
                      suppressContentEditableWarning
                      onBlur={(e) => handleInputChange(null, "phone", e.target.innerText)}
                    >
                      {resumeData.phone}
                    </span>
                  </div>
                  <div>
                    <span className="contact-icon">✉️</span> 
                    <span
                      contentEditable={isEditing}
                      suppressContentEditableWarning
                      onBlur={(e) => handleInputChange(null, "email", e.target.innerText)}
                    >
                      {resumeData.email}
                    </span>
                  </div>
                  <div>
                    <span className="contact-icon">🔗</span> 
                    <span
                      contentEditable={isEditing}
                      suppressContentEditableWarning
                      onBlur={(e) => handleInputChange(null, "linkedin", e.target.innerText)}
                    >
                      {resumeData.linkedin}
                    </span>
                  </div>
                  <div>
                    <span className="contact-icon">📍</span> 
                    <span
                      contentEditable={isEditing}
                      suppressContentEditableWarning
                      onBlur={(e) => handleInputChange(null, "location", e.target.innerText)}
                    >
                      {resumeData.location}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="resume-body">
                {/* Summary */}
                <div className="resume-section">
                  <h3 className="section-title">Summary</h3>
                  <p 
                    className="summary-text"
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    onBlur={(e) => handleInputChange(null, "summary", e.target.innerText)}
                  >
                    {resumeData.summary}
                  </p>
                </div>
                
                {/* Experience */}
                <div className="resume-section">
                  <h3 className="section-title">Experience</h3>
                  {resumeData.experience.map((exp, idx) => (
                    <div key={idx} className="experience-item">
                      <div className="experience-header">
                        <div>
                          <h4 
                            className="job-title"
                            contentEditable={isEditing}
                            suppressContentEditableWarning
                            onBlur={(e) => handleInputChange("experience", "title", e.target.innerText, idx)}
                          >
                            {exp.title}
                          </h4>
                          <div className="company-info">
                            <span
                              contentEditable={isEditing}
                              suppressContentEditableWarning
                              onBlur={(e) => handleInputChange("experience", "companyName", e.target.innerText, idx)}
                            >
                              {exp.companyName}
                            </span>
                            <span> | </span>
                            <span
                              contentEditable={isEditing}
                              suppressContentEditableWarning
                              onBlur={(e) => handleInputChange("experience", "companyLocation", e.target.innerText, idx)}
                            >
                              {exp.companyLocation}
                            </span>
                          </div>
                        </div>
                        <div 
                          className="job-dates"
                          contentEditable={isEditing}
                          suppressContentEditableWarning
                          onBlur={(e) => handleInputChange("experience", "date", e.target.innerText, idx)}
                        >
                          {exp.date}
                        </div>
                      </div>
                      <ul className="accomplishments">
                        {exp.accomplishment.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <span
                              contentEditable={isEditing}
                              suppressContentEditableWarning
                              onBlur={(e) => {
                                const newAccomplishments = [...exp.accomplishment];
                                newAccomplishments[itemIdx] = e.target.innerText;
                                handleInputChange("experience", "accomplishment", newAccomplishments, idx);
                              }}
                            >
                              {item}
                            </span>
                            {isEditing && (
                              <button 
                                className="delete-btn"
                                onClick={() => removeAccomplishment(idx, itemIdx)}
                              >
                                ✕
                              </button>
                            )}
                          </li>
                        ))}
                      </ul>
                      {isEditing && (
                        <div className="section-controls">
                          <button 
                            className="add-btn"
                            onClick={() => addAccomplishment(idx)}
                          >
                            + Add Accomplishment
                          </button>
                          <button 
                            className="enhance-btn"
                            onClick={() => enhanceSection(`Experience ${idx+1}`)}
                          >
                            Enhance Experience
                          </button>
                          <button 
                            className="delete-btn"
                            onClick={() => removeSectionItem('experience', idx)}
                          >
                            ✕ Delete Experience
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button 
                      className="add-btn"
                      onClick={() => addSectionItem('experience')}
                    >
                      + Add Experience
                    </button>
                  )}
                </div>
                
                {/* Skills */}
                <div className="resume-section">
                  <h3 className="section-title">Skills</h3>
                  <div className="skills-container">
                    {resumeData.skills.map((skill, idx) => (
                      <div key={idx} className="skill-item">
                        <span
                          contentEditable={isEditing}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const updatedSkills = [...resumeData.skills];
                            updatedSkills[idx] = e.target.innerText;
                            setResumeData(prev => ({ ...prev, skills: updatedSkills }));
                          }}
                        >
                          {skill}
                        </span>
                        {isEditing && (
                          <button 
                            className="delete-btn"
                            onClick={() => {
                              const updatedSkills = [...resumeData.skills];
                              updatedSkills.splice(idx, 1);
                              setResumeData(prev => ({ ...prev, skills: updatedSkills }));
                            }}
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  {isEditing && (
                    <button 
                      className="add-btn"
                      onClick={() => {
                        const updatedSkills = [...resumeData.skills, "New Skill"];
                        setResumeData(prev => ({ ...prev, skills: updatedSkills }));
                      }}
                    >
                      + Add Skill
                    </button>
                  )}
                </div>
                
                {/* Projects */}
                <div className="resume-section">
                  <h3 className="section-title">Projects</h3>
                  {resumeData.projects.map((project, idx) => (
                    <div key={idx} className="project-item">
                      <div className="project-header">
                        <h4 
                          className="project-title"
                          contentEditable={isEditing}
                          suppressContentEditableWarning
                          onBlur={(e) => handleInputChange("projects", "title", e.target.innerText, idx)}
                        >
                          {project.title}
                        </h4>
                        <span 
                          className="project-duration"
                          contentEditable={isEditing}
                          suppressContentEditableWarning
                          onBlur={(e) => handleInputChange("projects", "duration", e.target.innerText, idx)}
                        >
                          {project.duration}
                        </span>
                      </div>
                      <p 
                        className="project-description"
                        contentEditable={isEditing}
                        suppressContentEditableWarning
                        onBlur={(e) => handleInputChange("projects", "description", e.target.innerText, idx)}
                      >
                        {project.description}
                      </p>
                      {isEditing && (
                        <div className="section-controls">
                          <button 
                            className="enhance-btn"
                            onClick={() => enhanceSection(`Project ${idx+1}`)}
                          >
                            Enhance Project
                          </button>
                          <button 
                            className="delete-btn"
                            onClick={() => removeSectionItem('projects', idx)}
                          >
                            ✕ Delete Project
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button 
                      className="add-btn"
                      onClick={() => addSectionItem('projects')}
                    >
                      + Add Project
                    </button>
                  )}
                </div>
                
                {/* Education */}
                <div className="resume-section">
                  <h3 className="section-title">Education</h3>
                  {resumeData.education.map((edu, idx) => (
                    <div key={idx} className="education-item">
                      <h4 
                        className="degree"
                        contentEditable={isEditing}
                        suppressContentEditableWarning
                        onBlur={(e) => handleInputChange("education", "degree", e.target.innerText, idx)}
                      >
                        {edu.degree}
                      </h4>
                      <div className="education-details">
                        <span
                          contentEditable={isEditing}
                          suppressContentEditableWarning
                          onBlur={(e) => handleInputChange("education", "institution", e.target.innerText, idx)}
                        >
                          {edu.institution}
                        </span>
                        <span> | </span>
                        <span
                          contentEditable={isEditing}
                          suppressContentEditableWarning
                          onBlur={(e) => handleInputChange("education", "location", e.target.innerText, idx)}
                        >
                          {edu.location}
                        </span>
                        <span> | </span>
                        <span
                          contentEditable={isEditing}
                          suppressContentEditableWarning
                          onBlur={(e) => handleInputChange("education", "duration", e.target.innerText, idx)}
                        >
                          {edu.duration}
                        </span>
                      </div>
                      {isEditing && (
                        <div className="section-controls">
                          <button 
                            className="delete-btn"
                            onClick={() => removeSectionItem('education', idx)}
                          >
                            ✕ Delete Education
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button 
                      className="add-btn"
                      onClick={() => addSectionItem('education')}
                    >
                      + Add Education
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Download Preloader */}
      {isDownloading && (
        <div className="preloader">
          <div className="spinner"></div>
          <p>Generating PDF...</p>
        </div>
      )}

      {/* Share Notification */}
      {showShareNotification && (
        <div className="notification">
          <p>Shareable link copied to clipboard!</p>
        </div>
      )}
    </div>
  );
};

export default ResumeStudio;