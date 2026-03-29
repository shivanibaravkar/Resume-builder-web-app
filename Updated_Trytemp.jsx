import { forwardRef } from 'react';
import { MapPin, Phone, Mail, User, Settings, Briefcase, GraduationCap, Code, Sparkles } from 'lucide-react';

const ResumeTemplateWithDynamicEnhanceButtons = forwardRef(({ resumeData, resumeStyle, editMode, onChange, zoom }, ref) => {
  const handleInputChange = (field, value, index, subIndex) => {
    onChange(field, value, index, subIndex);
  };

  // Enhanced Enhancement function for AI-powered improvements
  const enhanceContent = (section, index, type) => {
    // Simulated enhancement examples
    const enhancements = {
      workExperience: [
        'Spearheaded cross-functional initiatives that resulted in 40% improvement in team efficiency',
        'Architected scalable solutions handling 500% increase in user traffic',
        'Championed best practices leading to 50% reduction in production bugs'
      ],
      projects: [
        'Engineered robust architecture supporting concurrent user sessions',
        'Implemented advanced caching strategies improving response times by 60%',
        'Designed fault-tolerant systems with 99.99% uptime reliability'
      ],
      education: {
        degree: 'B.Tech, CSE(AI&ML) - Magna Cum Laude',
        institution: 'Technical College, Chennai - Top 10% of graduating class'
      },
      technicalSkills: [
        'Advanced Java Enterprise Development with Spring Boot & Microservices',
        'Full Stack Development with React, Node.js & Cloud Integration',
        'Spring Framework - Advanced IoC, AOP & Security Implementation'
      ]
    };

    // Apply enhancement based on section
    if (section === 'workExperience' && resumeData.workExperience[index]) {
      const newData = { ...resumeData };
      const randomEnhancement = enhancements.workExperience[Math.floor(Math.random() * enhancements.workExperience.length)];
      newData.workExperience[index].details.push(randomEnhancement);
      onChange('workExperience', newData.workExperience);
    } else if (section === 'projects' && resumeData.projects && resumeData.projects[index]) {
      const newData = { ...resumeData };
      const randomEnhancement = enhancements.projects[Math.floor(Math.random() * enhancements.projects.length)];
      newData.projects[index].details.push(randomEnhancement);
      onChange('projects', newData.projects);
    } else if (section === 'education' && resumeData.education[index]) {
      const newData = { ...resumeData };
      if (type === 'degree') {
        newData.education[index].degree = enhancements.education.degree;
      } else if (type === 'institution') {
        newData.education[index].institution = enhancements.education.institution;
      }
      onChange('education', newData.education);
    } else if (section === 'technicalSkills' && resumeData.technicalSkills[index]) {
      const newData = { ...resumeData };
      const randomEnhancement = enhancements.technicalSkills[Math.floor(Math.random() * enhancements.technicalSkills.length)];
      newData.technicalSkills[index] = randomEnhancement;
      onChange('technicalSkills', newData.technicalSkills);
    } else if (section === 'objective') {
      const enhancedObjective = 'Results-driven Java Developer with 5+ years of experience architecting enterprise-grade backend systems and leading cross-functional teams. Expert in Java ecosystem, Spring Boot microservices, and cloud-native architectures. Proven track record of delivering scalable solutions that improved system performance by 60% and reduced operational costs by 40%. Passionate about mentoring teams and driving technical excellence through agile methodologies and DevOps practices.';
      onChange('objective', enhancedObjective);
    }
  };

  // Get skill level for visual representation
  const getSkillLevel = (skill) => {
    const levels = {
      'Strong knowledge of Core Java': { percentage: 95, level: 'Expert' },
      'Full Stack Development': { percentage: 90, level: 'Expert' },
      'Spring Framework': { percentage: 85, level: 'Advanced' },
      'Relational Databases': { percentage: 80, level: 'Advanced' },
      'Git / GitHub / GitLab for version control': { percentage: 75, level: 'Intermediate' },
      'AWS, Azure': { percentage: 88, level: 'Advanced' }
    };
    return levels[skill] || { percentage: 70, level: 'Intermediate' };
  };

  const inputStyle = {
  padding: '10px',
  width: '100%',
  borderRadius: '5px',
  marginBottom: '10px',
  border: editMode ? '1px solid #ccc' : 'none',
  backgroundColor: editMode ? '#fff' : 'transparent',
  outline: 'none',
  fontSize: '16px',
  color: '#333',
  fontFamily: resumeStyle?.fontFamily || 'Arial',  // ✅ Safe access with fallback
};

  // Mobile responsive transform
  const resumeTransform = window.innerWidth < 1024 ? scale(${zoom}) : 'none';
  const resumeOrigin = window.innerWidth < 1024 ? 'top left' : 'center';

  return (
    <div className="flex-1 mobile-p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div 
          ref={ref}
          id="resume-preview"
          className="bg-white rounded-xl lg:rounded-2xl shadow-xl lg:shadow-2xl overflow-hidden border border-gray-200 animate-fade-in"
          style={{ 
            transform: resumeTransform,
            transformOrigin: resumeOrigin,
            fontFamily: resumeStyle?.fontFamily || 'Arial',
          }}
        >
          {/* Header Section */}
          <div 
            className="text-white mobile-p-6 lg:p-8 relative overflow-hidden"
            style={{ 
              background: linear-gradient(135deg, ${resumeStyle.primaryColor} 0%, ${resumeStyle.primaryColor}dd 100%)
            }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white transform translate-x-32 -translate-y-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white transform -translate-x-24 translate-y-24"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  {editMode ? (
                    <input
                      type="text"
                      value={resumeData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      style={{...inputStyle, fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '0.5rem'}}
                      className="text-white bg-transparent border-b-2 border-white/30 focus:border-white"
                    />
                  ) : (
                    <h1 className="mobile-text-2xl lg:text-4xl font-poppins font-bold mb-2">{resumeData.name}</h1>
                  )}
                  
                  {editMode ? (
                    <input
                      type="text"
                      value={resumeData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      style={{...inputStyle, fontSize: '1.25rem', marginBottom: '1rem'}}
                      className="text-white bg-transparent border-b-2 border-white/30 focus:border-white opacity-90"
                    />
                  ) : (
                    <h2 className="mobile-text-lg lg:text-xl font-medium opacity-90 mb-4">{resumeData.role}</h2>
                  )}
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {editMode ? (
                        <input
                          type="text"
                          value={resumeData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          style={{...inputStyle, fontSize: '0.875rem', marginBottom: '0'}}
                          className="text-white bg-transparent border-b border-white/30 focus:border-white"
                        />
                      ) : (
                        <span>{resumeData.location}</span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      {editMode ? (
                        <input
                          type="text"
                          value={resumeData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          style={{...inputStyle, fontSize: '0.875rem', marginBottom: '0'}}
                          className="text-white bg-transparent border-b border-white/30 focus:border-white"
                        />
                      ) : (
                        <span>{resumeData.phone}</span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      {editMode ? (
                        <input
                          type="text"
                          value={resumeData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          style={{...inputStyle, fontSize: '0.875rem', marginBottom: '0'}}
                          className="text-white bg-transparent border-b border-white/30 focus:border-white"
                        />
                      ) : (
                        <span>{resumeData.email}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Professional Avatar Placeholder */}
                <div className="mt-6 lg:mt-0 lg:ml-8">
                  <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                    <User className="w-12 h-12 lg:w-16 lg:h-16 text-white/80" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="mobile-p-4 lg:p-8 mobile-gap-4 lg:space-y-8 flex flex-col">
            
            {/* Professional Summary */}
            <section className="resume-section bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-poppins font-semibold text-gray-800 flex items-center">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                    style={{ backgroundColor: resumeStyle.primaryColor }}
                  >
                    <User className="w-4 h-4 text-white" />
                  </div>
                  Professional Summary
                </h3>
                {/* Dynamic Enhance Button for Summary */}
                {!editMode && (
                  <button
                    onClick={() => enhanceContent('objective', 0, 'summary')}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <Sparkles className="w-3 h-3" />
                    Enhance
                  </button>
                )}
              </div>
              {editMode ? (
                <textarea
                  value={resumeData.objective}
                  onChange={(e) => handleInputChange('objective', e.target.value)}
                  style={{...inputStyle, minHeight: '100px', resize: 'vertical'}}
                  className="text-gray-700 leading-relaxed border border-gray-300 rounded-lg p-3"
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{resumeData.objective}</p>
              )}
            </section>

            {/* Technical Skills with Progress Bars */}
            <section className="resume-section bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <h3 className="text-xl font-poppins font-semibold text-gray-800 mb-6 flex items-center">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                  style={{ backgroundColor: resumeStyle.primaryColor }}
                >
                  <Settings className="w-4 h-4 text-white" />
                </div>
                Technical Skills
              </h3>
              <div className="responsive-grid">
                {resumeData.technicalSkills.map((skill, index) => {
                  const { percentage, level } = getSkillLevel(skill);
                  return (
                    <div key={index} className="skill-item">
                      <div className="flex justify-between items-center mb-2">
                        {editMode ? (
                          <input
                            type="text"
                            value={skill}
                            onChange={(e) => {
                              const newSkills = [...resumeData.technicalSkills];
                              newSkills[index] = e.target.value;
                              onChange('technicalSkills', newSkills);
                            }}
                            style={{...inputStyle, fontSize: '0.875rem', marginBottom: '0'}}
                            className="text-gray-700 border border-gray-300 rounded px-2 py-1"
                          />
                        ) : (
                          <div className="flex items-center justify-between w-full">
                            <span className="text-sm font-medium text-gray-700">{skill}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">{level}</span>
                              {/* Dynamic Enhance Button for each Skill */}
                              <button
                                onClick={() => enhanceContent('technicalSkills', index, 'skill')}
                                className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-md hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                              >
                                <Sparkles className="w-3 h-3" />
                                Enhance
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full skill-progress animate-pulse-soft" 
                          style={{ 
                            width: ${percentage}%,
                            background: linear-gradient(90deg, ${resumeStyle.primaryColor} 0%, ${resumeStyle.primaryColor}cc 100%)
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Work Experience */}
            <section className="resume-section bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100">
              <h3 className="text-xl font-poppins font-semibold text-gray-800 mb-6 flex items-center">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                  style={{ backgroundColor: resumeStyle.primaryColor }}
                >
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                Work Experience
              </h3>
              
              <div className="space-y-6">
                {resumeData.workExperience.map((job, jobIndex) => (
                  <div key={jobIndex} className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 animate-slide-up">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex-1">
                            {editMode ? (
                              <input
                                type="text"
                                value={job.role}
                                onChange={(e) => {
                                  const newExperience = [...resumeData.workExperience];
                                  newExperience[jobIndex].role = e.target.value;
                                  onChange('workExperience', newExperience);
                                }}
                                style={{...inputStyle, fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem'}}
                                className="text-gray-800 border border-gray-300 rounded px-2 py-1"
                              />
                            ) : (
                              <h4 className="text-lg font-semibold text-gray-800">{job.role}</h4>
                            )}
                          </div>
                          {/* Dynamic Enhance Button for each Work Experience */}
                          {!editMode && (
                            <button
                              onClick={() => enhanceContent('workExperience', jobIndex, 'experience')}
                              className="ml-3 flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                              <Sparkles className="w-3 h-3" />
                              Enhance
                            </button>
                          )}
                        </div>
                        {editMode ? (
                          <input
                            type="text"
                            value={job.company}
                            onChange={(e) => {
                              const newExperience = [...resumeData.workExperience];
                              newExperience[jobIndex].company = e.target.value;
                              onChange('workExperience', newExperience);
                            }}
                            style={{...inputStyle, marginBottom: '0'}}
                            className="text-orange-600 font-medium border border-gray-300 rounded px-2 py-1"
                          />
                        ) : (
                          <p className="text-orange-600 font-medium">{job.company}</p>
                        )}
                      </div>
                      
                      {editMode ? (
                        <input
                          type="text"
                          value={job.date}
                          onChange={(e) => {
                            const newExperience = [...resumeData.workExperience];
                            newExperience[jobIndex].date = e.target.value;
                            onChange('workExperience', newExperience);
                          }}
                          style={{...inputStyle, marginBottom: '0'}}
                          className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-300 mt-2 lg:mt-0"
                        />
                      ) : (
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full mt-2 lg:mt-0">
                          {job.date}
                        </span>
                      )}
                    </div>
                    
                    <ul className="space-y-2 text-gray-700">
                      {job.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <div 
                            className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                            style={{ backgroundColor: resumeStyle.primaryColor }}
                          ></div>
                          {editMode ? (
                            <input
                              type="text"
                              value={detail}
                              onChange={(e) => {
                                const newExperience = [...resumeData.workExperience];
                                newExperience[jobIndex].details[detailIndex] = e.target.value;
                                onChange('workExperience', newExperience);
                              }}
                              style={{...inputStyle, marginBottom: '0'}}
                              className="flex-1 border border-gray-300 rounded px-2 py-1"
                            />
                          ) : (
                            <span>{detail}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects Section */}
            {resumeData.projects && resumeData.projects.length > 0 && (
              <section className="resume-section bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-100">
                <h3 className="text-xl font-poppins font-semibold text-gray-800 mb-6 flex items-center">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                    style={{ backgroundColor: resumeStyle.primaryColor }}
                  >
                    <Code className="w-4 h-4 text-white" />
                  </div>
                  Projects
                </h3>
                
                <div className="space-y-6">
                  {resumeData.projects.map((project, projectIndex) => (
                    <div key={projectIndex} className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 animate-slide-up">
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex-1">
                              {editMode ? (
                                <input
                                  type="text"
                                  value={project.name}
                                  onChange={(e) => {
                                    const newProjects = [...(resumeData.projects || [])];
                                    newProjects[projectIndex].name = e.target.value;
                                    onChange('projects', newProjects);
                                  }}
                                  style={{...inputStyle, fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem'}}
                                  className="text-gray-800 border border-gray-300 rounded px-2 py-1"
                                />
                              ) : (
                                <h4 className="text-lg font-semibold text-gray-800 mb-1">{project.name}</h4>
                              )}
                            </div>
                            {/* Dynamic Enhance Button for each Project */}
                            {!editMode && (
                              <button
                                onClick={() => enhanceContent('projects', projectIndex, 'project')}
                                className="ml-3 flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-sm hover:shadow-md"
                              >
                                <Sparkles className="w-3 h-3" />
                                Enhance
                              </button>
                            )}
                          </div>
                          
                          {editMode ? (
                            <input
                              type="text"
                              value={project.description}
                              onChange={(e) => {
                                const newProjects = [...(resumeData.projects || [])];
                                newProjects[projectIndex].description = e.target.value;
                                onChange('projects', newProjects);
                              }}
                              style={{...inputStyle, marginBottom: '0.5rem'}}
                              className="text-gray-600 border border-gray-300 rounded px-2 py-1"
                            />
                          ) : (
                            <p className="text-gray-600 mb-2">{project.description}</p>
                          )}
                          
                          {editMode ? (
                            <input
                              type="text"
                              value={project.technologies}
                              onChange={(e) => {
                                const newProjects = [...(resumeData.projects || [])];
                                newProjects[projectIndex].technologies = e.target.value;
                                onChange('projects', newProjects);
                              }}
                              style={{...inputStyle, marginBottom: '0'}}
                              className="font-medium border border-gray-300 rounded px-2 py-1"
                            />
                          ) : (
                            <p className="font-medium text-sm" style={{ color: resumeStyle.primaryColor }}>
                              Technologies: {project.technologies}
                            </p>
                          )}
                        </div>
                        
                        {editMode ? (
                          <input
                            type="text"
                            value={project.date}
                            onChange={(e) => {
                              const newProjects = [...(resumeData.projects || [])];
                              newProjects[projectIndex].date = e.target.value;
                              onChange('projects', newProjects);
                            }}
                            style={{...inputStyle, marginBottom: '0'}}
                            className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-300 mt-2 lg:mt-0"
                          />
                        ) : (
                          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full mt-2 lg:mt-0">
                            {project.date}
                          </span>
                        )}
                      </div>
                      
                      <ul className="space-y-2 text-gray-700">
                        {project.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start">
                            <div 
                              className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                              style={{ backgroundColor: resumeStyle.primaryColor }}
                            ></div>
                            {editMode ? (
                              <input
                                type="text"
                                value={detail}
                                onChange={(e) => {
                                  const newProjects = [...(resumeData.projects || [])];
                                  newProjects[projectIndex].details[detailIndex] = e.target.value;
                                  onChange('projects', newProjects);
                                }}
                                style={{...inputStyle, marginBottom: '0'}}
                                className="flex-1 border border-gray-300 rounded px-2 py-1"
                              />
                            ) : (
                              <span>{detail}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            <section className="resume-section bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
              <h3 className="text-xl font-poppins font-semibold text-gray-800 mb-4 flex items-center">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                  style={{ backgroundColor: resumeStyle.primaryColor }}
                >
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                Education
              </h3>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 mb-4 last:mb-0">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1">
                          {editMode ? (
                            <div className="space-y-2">
                              <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => {
                                  const newEducation = [...resumeData.education];
                                  newEducation[index].degree = e.target.value;
                                  onChange('education', newEducation);
                                }}
                                style={{...inputStyle, fontWeight: '600', marginBottom: '0'}}
                                className="text-gray-800 border border-gray-300 rounded px-2 py-1"
                              />
                              <input
                                type="text"
                                value={edu.institution}
                                onChange={(e) => {
                                  const newEducation = [...resumeData.education];
                                  newEducation[index].institution = e.target.value;
                                  onChange('education', newEducation);
                                }}
                                style={{...inputStyle, marginBottom: '0'}}
                                className="text-orange-600 font-medium border border-gray-300 rounded px-2 py-1"
                              />
                            </div>
                          ) : (
                            <>
                              <h4 className="text-lg font-semibold text-gray-800">{edu.degree}</h4>
                              <p className="text-orange-600 font-medium">{edu.institution}</p>
                            </>
                          )}
                        </div>
                        {/* Dynamic Enhance Button for each Education */}
                        {!editMode && (
                          <button
                            onClick={() => enhanceContent('education', index, 'education')}
                            className="ml-3 flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-sm hover:shadow-md"
                          >
                            <Sparkles className="w-3 h-3" />
                            Enhance
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2 lg:mt-0">
                      {editMode ? (
                        <input
                          type="text"
                          value={edu.date}
                          onChange={(e) => {
                            const newEducation = [...resumeData.education];
                            newEducation[index].date = e.target.value;
                            onChange('education', newEducation);
                          }}
                          style={{...inputStyle, marginBottom: '0'}}
                          className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-300"
                        />
                      ) : (
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{edu.date}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </section>

          </div>
        </div>
      </div>

      {/* CSS Animations and Responsive Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
        
        .font-poppins {
          font-family: 'Poppins', sans-serif;
        }
        
        .mobile-text-sm { font-size: 0.875rem; }
        .mobile-text-base { font-size: 1rem; }
        .mobile-text-lg { font-size: 1.125rem; }
        .mobile-text-xl { font-size: 1.25rem; }
        .mobile-text-2xl { font-size: 1.5rem; }
        
        .mobile-p-4 { padding: 1rem; }
        .mobile-p-6 { padding: 1.5rem; }
        
        .mobile-gap-4 > * + * { margin-top: 1rem; }
        
        .responsive-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        
        @media (min-width: 640px) {
          .mobile-text-sm { font-size: 1rem; }
          .mobile-text-base { font-size: 1.125rem; }
          .mobile-text-lg { font-size: 1.25rem; }
          .mobile-text-xl { font-size: 1.5rem; }
          .mobile-text-2xl { font-size: 1.875rem; }
          
          .responsive-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }
        
        @media (min-width: 1024px) {
          .mobile-text-2xl { font-size: 2.25rem; }
          .mobile-p-4 { padding: 2rem; }
          .mobile-p-6 { padding: 2rem; }
          .mobile-gap-4 > * + * { margin-top: 2rem; }
        }
      `}</style>
    </div>
  );
});

ResumeTemplateWithDynamicEnhanceButtons.displayName = 'ResumeTemplateWithDynamicEnhanceButtons';

export default ResumeTemplateWithDynamicEnhanceButtons;