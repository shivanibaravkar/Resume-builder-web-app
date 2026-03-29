import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useResume } from "../../context/ResumeContext";
import Sidebar from "../Sidebar/Sidebar";

const Template15 = () => {
  const { resumeData, setResumeData } = useResume();
  const resumeRef = useRef();
  const [localData, setLocalData] = useState(resumeData);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field, value, index = null, subField = null) => {
    if (index !== null) {
      const updatedArray = [...localData[field]];
      if (subField) {
        updatedArray[index] = { ...updatedArray[index], [subField]: value };
      } else {
        updatedArray[index] = value;
      }
      setLocalData({ ...localData, [field]: updatedArray });
    } else {
      setLocalData({ ...localData, [field]: value });
    }
  };

  const handleSave = () => {
    setResumeData(localData);
    setIsEditing(false);
  };

  const handleDownload = async () => {
    const canvas = await html2canvas(resumeRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
    });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * pageWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);
    pdf.save("resume.pdf");
  };

  const handleEnhance = (section) => {
    // AI enhancement logic would go here
    console.log(`Enhancing ${section}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar 
          onEnhance={handleEnhance} 
          resumeRef={resumeRef} 
          onDownload={handleDownload}
        />
        <div className="flex-grow p-10 flex flex-col items-center">
          <div 
            ref={resumeRef} 
            style={{ 
              width: "210mm", 
              minHeight: "297mm", 
              backgroundColor: "#ffffff",
              color: "#1f2937",
              padding: "20mm"
            }}
          >
            {/* Header Section */}
            <div style={{ marginBottom: "12mm" }}>
              <h1 
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => handleInputChange("name", e.target.textContent)}
                style={{
                  fontSize: "22pt",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  marginBottom: "2mm"
                }}
              >
                {localData.name}
              </h1>
              <h2
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => handleInputChange("role", e.target.textContent)}
                style={{
                  fontSize: "12pt",
                  fontWeight: "600",
                  color: "#17a2b8",
                  marginBottom: "4mm"
                }}
              >
                {localData.role}
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4mm" }}>
                {localData.phone && (
                  <div style={{ display: "flex", alignItems: "center", gap: "1mm" }}>
                    <span>📱</span>
                    <span
                      contentEditable={isEditing}
                      suppressContentEditableWarning
                      onBlur={(e) => handleInputChange("phone", e.target.textContent)}
                    >
                      {localData.phone}
                    </span>
                  </div>
                )}
                {localData.email && (
                  <div style={{ display: "flex", alignItems: "center", gap: "1mm" }}>
                    <span>✉️</span>
                    <span
                      contentEditable={isEditing}
                      suppressContentEditableWarning
                      onBlur={(e) => handleInputChange("email", e.target.textContent)}
                    >
                      {localData.email}
                    </span>
                  </div>
                )}
                {localData.linkedin && (
                  <div style={{ display: "flex", alignItems: "center", gap: "1mm" }}>
                    <span>🔗</span>
                    <span
                      contentEditable={isEditing}
                      suppressContentEditableWarning
                      onBlur={(e) => handleInputChange("linkedin", e.target.textContent)}
                    >
                      {localData.linkedin}
                    </span>
                  </div>
                )}
                {localData.location && (
                  <div style={{ display: "flex", alignItems: "center", gap: "1mm" }}>
                    <span>📍</span>
                    <span
                      contentEditable={isEditing}
                      suppressContentEditableWarning
                      onBlur={(e) => handleInputChange("location", e.target.textContent)}
                    >
                      {localData.location}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Summary Section */}
            {localData.summary && (
              <div style={{ marginBottom: "12mm" }}>
                <h2 style={{
                  fontSize: "14pt",
                  fontWeight: "bold",
                  borderBottom: "1px solid #e5e7eb",
                  paddingBottom: "1mm",
                  marginBottom: "3mm"
                }}>
                  SUMMARY
                </h2>
                <p
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) => handleInputChange("summary", e.target.textContent)}
                  style={{
                    fontSize: "10pt",
                    lineHeight: "1.5"
                  }}
                >
                  {localData.summary}
                </p>
              </div>
            )}

            <div style={{ display: "flex", gap: "10mm" }}>
              {/* Left Column - Experience */}
              <div style={{ flex: 2 }}>
                {localData.experience?.length > 0 && (
                  <div style={{ marginBottom: "12mm" }}>
                    <h2 style={{
                      fontSize: "14pt",
                      fontWeight: "bold",
                      borderBottom: "1px solid #e5e7eb",
                      paddingBottom: "1mm",
                      marginBottom: "3mm"
                    }}>
                      EXPERIENCE
                    </h2>
                    {localData.experience.map((exp, idx) => (
                      <div key={idx} style={{ marginBottom: "6mm" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning
                            onBlur={(e) => handleInputChange("experience", e.target.textContent, idx, "title")}
                            style={{
                              fontSize: "12pt",
                              fontWeight: "bold"
                            }}
                          >
                            {exp.title}
                          </h3>
                          <span
                            contentEditable={isEditing}
                            suppressContentEditableWarning
                            onBlur={(e) => handleInputChange("experience", e.target.textContent, idx, "date")}
                            style={{
                              fontSize: "10pt",
                              color: "#6b7280"
                            }}
                          >
                            {exp.date}
                          </span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning
                            onBlur={(e) => handleInputChange("experience", e.target.textContent, idx, "companyName")}
                            style={{
                              fontSize: "10pt",
                              fontWeight: "600",
                              color: "#17a2b8"
                            }}
                          >
                            {exp.companyName}
                          </p>
                          <span
                            contentEditable={isEditing}
                            suppressContentEditableWarning
                            onBlur={(e) => handleInputChange("experience", e.target.textContent, idx, "companyLocation")}
                            style={{
                              fontSize: "10pt",
                              color: "#6b7280"
                            }}
                          >
                            {exp.companyLocation}
                          </span>
                        </div>
                        <div
                          contentEditable={isEditing}
                          suppressContentEditableWarning
                          onBlur={(e) => handleInputChange("experience", e.target.innerHTML, idx, "accomplishment")}
                          style={{
                            fontSize: "10pt",
                            marginTop: "2mm",
                            whiteSpace: "pre-line"
                          }}
                          dangerouslySetInnerHTML={{
                            __html: exp.accomplishment?.replace(/\n/g, "<br />") || ""
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Education Section */}
                {localData.education?.length > 0 && (
                  <div>
                    <h2 style={{
                      fontSize: "14pt",
                      fontWeight: "bold",
                      borderBottom: "1px solid #e5e7eb",
                      paddingBottom: "1mm",
                      marginBottom: "3mm"
                    }}>
                      EDUCATION
                    </h2>
                    {localData.education.map((edu, idx) => (
                      <div key={idx} style={{ marginBottom: "6mm" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning
                            onBlur={(e) => handleInputChange("education", e.target.textContent, idx, "degree")}
                            style={{
                              fontSize: "12pt",
                              fontWeight: "bold"
                            }}
                          >
                            {edu.degree}
                          </h3>
                          <span
                            contentEditable={isEditing}
                            suppressContentEditableWarning
                            onBlur={(e) => handleInputChange("education", e.target.textContent, idx, "duration")}
                            style={{
                              fontSize: "10pt",
                              color: "#6b7280"
                            }}
                          >
                            {edu.duration}
                          </span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning
                            onBlur={(e) => handleInputChange("education", e.target.textContent, idx, "institution")}
                            style={{
                              fontSize: "10pt",
                              fontWeight: "600",
                              color: "#17a2b8"
                            }}
                          >
                            {edu.institution}
                          </p>
                          <span
                            contentEditable={isEditing}
                            suppressContentEditableWarning
                            onBlur={(e) => handleInputChange("education", e.target.textContent, idx, "location")}
                            style={{
                              fontSize: "10pt",
                              color: "#6b7280"
                            }}
                          >
                            {edu.location}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column - Skills and Achievements */}
              <div style={{ 
                flex: 1, 
                backgroundColor: "#006666",
                color: "#ffffff",
                padding: "6mm",
                borderRadius: "2mm"
              }}>
                {/* Skills Section */}
                {localData.skills?.length > 0 && (
                  <div style={{ marginBottom: "12mm" }}>
                    <h2 style={{
                      fontSize: "14pt",
                      fontWeight: "bold",
                      borderBottom: "1px solid rgba(255,255,255,0.3)",
                      paddingBottom: "1mm",
                      marginBottom: "3mm"
                    }}>
                      SKILLS
                    </h2>
                    <div style={{ 
                      display: "flex", 
                      flexWrap: "wrap",
                      gap: "2mm",
                      fontSize: "10pt"
                    }}>
                      {localData.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          contentEditable={isEditing}
                          suppressContentEditableWarning
                          onBlur={(e) => handleInputChange("skills", e.target.textContent, idx, "category")}
                        >
                          {skill.category}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements Section */}
                {localData.achievements?.length > 0 && (
                  <div>
                    <h2 style={{
                      fontSize: "14pt",
                      fontWeight: "bold",
                      borderBottom: "1px solid rgba(255,255,255,0.3)",
                      paddingBottom: "1mm",
                      marginBottom: "3mm"
                    }}>
                      ACHIEVEMENTS
                    </h2>
                    <div style={{ fontSize: "10pt" }}>
                      {localData.achievements.map((achievement, idx) => (
                        <div key={idx} style={{ marginBottom: "4mm" }}>
                          <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning
                            onBlur={(e) => handleInputChange("achievements", e.target.textContent, idx, "title")}
                            style={{
                              fontWeight: "600",
                              marginBottom: "1mm"
                            }}
                          >
                            {achievement.title}
                          </h3>
                          <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning
                            onBlur={(e) => handleInputChange("achievements", e.target.textContent, idx, "description")}
                            style={{
                              color: "#e5e7eb"
                            }}
                          >
                            {achievement.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Edit/Save Controls */}
          <div className="mt-4">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Edit Resume
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template15;