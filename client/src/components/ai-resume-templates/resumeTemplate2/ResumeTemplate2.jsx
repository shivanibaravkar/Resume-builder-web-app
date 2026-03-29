import React, { useState, useRef, useEffect } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const ResumeTemplate2 = () => {
  const [resumeData, setResumeData] = useState({
    name: "AKSHITHRAM",
    role: "Java Developer",
    phone: "+91 1234567890",
    email: "name@gmail.com",
    github: "",
    location: "Hyderabad, India",
    objective:
      "Results-driven Java Developer with 5+ years of experience in building scalable, high-performance backend systems and APIs. Proficient in Java, Spring Boot, Hibernate, and microservices architecture. Strong collaborator with a focus on clean code, agile methodologies, and continuous integration practices.",
    education: [
      {
        institution: "XYZ University",
        degree: "Bachelor of Engineering in Computer Science",
        date: "2019 - 2023",
      },
    ],
    skills: [
      "Full Stack Development",
      "Spring Framework",
      "Git / GitHub / GitLab for version control",
      "Relational Databases",
      "AWS, Azure",
    ],
    workExperience: [
      {
        role: "Web Development Intern",
        date: "2023 - 2024",
        details: [
          "Built responsive frontend interfaces using React.js and Tailwind CSS for internal tools used by over 100 staff members.",
          "Integrated REST APIs to fetch and display real-time data from a Node.js backend.",
          "Used Git and GitHub for version control and collaborated with senior developers via pull requests and code reviews.",
          "Wrote unit tests with Jest to ensure UI component reliability and minimize regressions.",
        ],
      },
      {
        role: "Cloud & DevOps Intern",
        date: "2024 - 2025",
        details: [
          "Configured CI/CD pipelines using GitHub Actions for automated testing and deployment of web apps.",
          "Assisted in setting up monitoring and alerting using Prometheus and Grafana on Kubernetes clusters.",
          "Deployed and maintained containerized applications using Docker and Helm charts.",
          "Wrote documentation for deployment workflows and environment configurations for internal teams.",
        ],
      },
    ],
    projects: [],
  });

  const [resumeStyle, setResumeStyle] = useState({
  backgroundColor: "#ffffff",
  fontFamily: "'Arial', sans-serif",
  color: "#000000",
});

// ✅ Add this immediately below
useEffect(() => {
  console.log("Updated background color:", resumeStyle.backgroundColor);
}, [resumeStyle.backgroundColor]);

  const [editMode, setEditMode] = useState(true);
  const [zoom, setZoom] = useState(1);
  const resumeRef = useRef(null);

  const handleInputChange = (e, section, index = null, field = null, subIndex = null) => {
    const value = e.target.value;
    setResumeData((prev) => {
      const newData = { ...prev };
      if (section === "root") {
        newData[field] = value;
      } else if (index !== null && field && subIndex === null) {
        newData[section][index][field] = value;
      } else if (index !== null && field && subIndex !== null) {
        newData[section][index][field][subIndex] = value;
      } else if (index !== null && !field) {
        newData[section][index] = value;
      }
      return newData;
    });
  };

  const handleAddItem = (section) => {
    setResumeData((prev) => {
      const newData = { ...prev };
      if (section === "education") newData.education.push({ institution: "", degree: "", date: "" });
      if (section === "skills") newData.skills.push("");
      if (section === "workExperience") newData.workExperience.push({ role: "", date: "", details: [""] });
      if (section === "projects") newData.projects.push({ title: "", details: "" });
      return newData;
    });
  };

  const handleRemoveItem = (section, index, subIndex = null) => {
    setResumeData((prev) => {
      const newData = { ...prev };
      if (subIndex !== null) {
        newData.workExperience[index].details.splice(subIndex, 1);
        if (newData.workExperience[index].details.length === 0) newData.workExperience[index].details.push("");
      } else {
        newData[section].splice(index, 1);
        if (newData[section].length === 0) {
          if (section === "education") newData.education.push({ institution: "", degree: "", date: "" });
          if (section === "skills") newData.skills.push("");
          if (section === "workExperience") newData.workExperience.push({ role: "", date: "", details: [""] });
          if (section === "projects") newData.projects.push({ title: "", details: "" });
        }
      }
      return newData;
    });
  };

  const handleAddDetail = (index) => {
    setResumeData((prev) => {
      const newData = { ...prev };
      newData.workExperience[index].details.push("");
      return newData;
    });
  };

  const handleDownload = async () => {
    const element = resumeRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      scrollY: -window.scrollY,
      backgroundColor: null,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume.pdf");
  };

  const handleSave = () => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    alert("Resume saved locally!");
  };

  useEffect(() => {
  const savedData = localStorage.getItem("resumeData");
  if (savedData && !resumeData.name) {
    setResumeData(JSON.parse(savedData));
    setEditMode(false);
  }
}, []);

  

  const handleColorChange = (color) => setResumeStyle((prev) => ({ ...prev, backgroundColor: color }));
  const handleFontChange = (font) => setResumeStyle((prev) => ({ ...prev, fontFamily: font }));

  return (
    <div className="flex flex-col md:flex-row min-h-screen" style={{ fontFamily: resumeStyle.fontFamily }}>

      {/* Sidebar */}
      <aside className="w-full md:w-[280px] bg-gray-100 p-4 border-r border-gray-300">
        <h2 className="text-xl font-bold mb-4">Resume Controls</h2>

        {/* Upload Resume */}
        <label className="block mb-2">Upload Resume:</label>
        <select onChange={(e) => setEditMode(e.target.value === 'manual')} className="w-full mb-4 p-2">
          <option value="" disabled selected>Select Option</option>
          <option value="manual">Manual Edit</option>
          <option value="ai">AI Edit</option>
        </select>

        {/* AI Assistant */}
        <label className="block mb-2">AI Assistant:</label>
        <select onChange={(e) => alert(`AI Action: ${e.target.value}`)} className="w-full mb-4 p-2">
          <option value="" disabled selected>Select Section</option>
          <option value="profile">Improve Profile with AI</option>
          <option value="experience">Enhance Experience with AI</option>
          <option value="projects">AI-Powered Projects Description</option>
        </select>

        {/* Save/Share/Download Buttons */}
        <button onClick={handleSave} className="w-full bg-blue-600 text-white py-2 mb-2">Save Resume</button>
        <button
  onClick={() => {
    const dummyLink = "https://your-resume-link.com"; // Replace with your actual shareable link if available
    navigator.clipboard.writeText(dummyLink).then(() => {
      alert("Link copied!");
    }).catch((err) => {
      console.error("Failed to copy:", err);
      alert("Failed to copy link.");
    });
  }}
  className="w-full bg-green-600 text-white py-2 mb-2"
>
  Share Resume
</button>

        <button onClick={handleDownload} className="w-full bg-purple-600 text-white py-2 mb-2">Download PDF</button>

        {/* Zoom Slider */}
        <label className="block mt-4">Zoom</label>
        <input type="range" min="0.5" max="1.5" step="0.1" value={zoom} onChange={(e) => setZoom(parseFloat(e.target.value))} className="w-full" />

        {/* Font Color */}
        <label className="block mt-4">Font Color</label>
        <input type="color" value={resumeStyle.color} onChange={(e) => setResumeStyle((prev) => ({ ...prev, color: e.target.value }))} className="w-full h-10 border-none" />

        {/* Background Color */}
        <label className="block mt-4">Background Color</label>
        <input
  type="color"
  value={resumeStyle.backgroundColor}
  onChange={(e) =>
    setResumeStyle((prev) => ({
      ...prev,
      backgroundColor: e.target.value, // Always HEX format from <input type="color">
    }))
  }
/>


        {/* Predefined Background Colors */}
<label className="block mt-4 font-semibold">Quick Backgrounds</label>
<div className="flex flex-wrap gap-2 mt-2">
  {[
    { name: "Blue", color: "#E6F0FF" },
    { name: "Gray", color: "#F7F7F7" },
    { name: "Ivory", color: "#FFFFF0" },
    { name: "Purple", color: "#F3E8FF" },
  ].map((bg, idx) => (
    <button
      key={idx}
      onClick={() => handleColorChange(bg.color)}
      style={{
        backgroundColor: bg.color,
        padding: "6px 12px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        fontSize: "0.8rem",
        cursor: "pointer",
      }}
    >
      {bg.name}
    </button>
  ))}
</div>


        {/* Font Family */}
        <label className="block mt-4">Font Family</label>
        <select value={resumeStyle.fontFamily} onChange={(e) => handleFontChange(e.target.value)} className="w-full h-10">
          <option value="'Arial', sans-serif">Arial</option>
          <option value="'Georgia', serif">Georgia</option>
          <option value="'Courier New', monospace">Courier New</option>
          <option value="'Times New Roman', serif">Times New Roman</option>
          <option value="'Tahoma', sans-serif">Tahoma</option>
        </select>
      </aside>

      {/* Resume Content */}
    <main
  ref={resumeRef}
  style={{
    transform: `scale(${zoom})`,
    transformOrigin: "top center",
    transition: "transform 0.3s ease",
    padding: "30px",
    boxSizing: "border-box",
    color: resumeStyle.color,
    fontFamily: resumeStyle.fontFamily,
    backgroundColor:resumeStyle.backgroundColor, // ✅ This is correct
    borderRadius: "8px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    maxWidth: "900px",
    margin: "auto",
  }}
>







        {/* Header: Name and Role */}
<section className="text-center border-b-2 border-gray-300 mb-6 pb-5">
  {editMode ? (
    <>
      <input
        type="text"
        placeholder="Full Name"
        value={resumeData.name}
        onChange={(e) => handleInputChange(e, "root", null, "name")}
        className="w-full text-4xl font-extrabold text-gray-900 text-center mb-2 border-none border-b-2 border-gray-400 outline-none bg-transparent"
      />
      <input
        type="text"
        placeholder="Your Role"
        value={resumeData.role}
        onChange={(e) => handleInputChange(e, "root", null, "role")}
        className="w-full text-lg font-semibold text-gray-700 text-center border-none border-b border-gray-300 outline-none bg-transparent"
      />
    </>
  ) : (
    <>
      <h1 className="text-5xl font-extrabold tracking-wide text-gray-900">{resumeData.name || "Your Name"}</h1>
      <h2 className="text-xl font-medium text-gray-600 mt-1">{resumeData.role || "Your Role"}</h2>
      <div className="mt-4">
       
        
      </div>
    </>
  )}
</section>


        {/* Contact Info */}
<section className="mb-8">
  <h2 className="text-xl font-bold border-b border-gray-300 pb-2 text-gray-800 mb-4">📇 Contact</h2>
  {editMode ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="email"
        placeholder="Email"
        value={resumeData.email}
        onChange={(e) => handleInputChange(e, "root", null, "email")}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="tel"
        placeholder="Phone"
        value={resumeData.phone}
        onChange={(e) => handleInputChange(e, "root", null, "phone")}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="GitHub URL"
        value={resumeData.github}
        onChange={(e) => handleInputChange(e, "root", null, "github")}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Location"
        value={resumeData.location}
        onChange={(e) => handleInputChange(e, "root", null, "location")}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  ) : (
    <ul className="text-gray-700 space-y-1 ml-2">
      {resumeData.email && <li><strong>Email:</strong> {resumeData.email}</li>}
      {resumeData.phone && <li><strong>Phone:</strong> {resumeData.phone}</li>}
      {resumeData.github && <li><strong>GitHub:</strong> {resumeData.github}</li>}
      {resumeData.location && <li><strong>Location:</strong> {resumeData.location}</li>}
    </ul>
  )}
</section>

       {/* Objective */}
<section className="mb-8">
  <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-3">🎯 Objective</h2>
  {editMode ? (
    <textarea
      rows={4}
      placeholder="Enter your career objective here..."
      value={resumeData.objective}
      onChange={(e) => handleInputChange(e, "root", null, "objective")}
      className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
    />
  ) : (
    <p className="italic text-gray-700 leading-relaxed px-2">
      {resumeData.objective}
    </p>
  )}
</section>


       {/* Education */}
<section className="mb-10">
  <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-4">🎓 Education</h2>
  <div className="flex flex-wrap gap-4">
    {resumeData.education?.map((edu, i) => (
      <div
        key={i}
        className="relative w-full sm:w-[45%] border border-gray-300 rounded-md p-4 shadow-sm bg-transparent"

      >
        {editMode && (
          <button
            onClick={() => handleRemoveItem("education", i)}
            className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full w-6 h-6 flex items-center justify-center"
            title="Remove"
          >
            &times;
          </button>
        )}
        {editMode ? (
          <>
            <input
              type="text"
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) => handleInputChange(e, "education", i, "institution")}
              className="w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => handleInputChange(e, "education", i, "degree")}
              className="w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Year / Date"
              value={edu.date}
              onChange={(e) => handleInputChange(e, "education", i, "date")}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>
        ) : (
          <>
            <h4 className="text-lg font-semibold text-gray-900">{edu.institution}</h4>
            <p className="text-sm font-medium text-gray-700">{edu.degree}</p>
            <p className="text-sm text-gray-500">{edu.date}</p>
          </>
        )}
      </div>
    ))}
    {editMode && (
      <button
        onClick={() => handleAddItem("education")}
        className="px-4 py-2 mt-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        + Add Education
      </button>
    )}
  </div>
</section>


        {/* Skills */}
<section className="mb-10">
  <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-4">🛠️ Skills</h2>
  <div className="flex flex-wrap gap-3">
    {resumeData.skills?.map((skill, i) => (
      <div
        key={i}
        className="flex items-center gap-2 border border-gray-400 px-4 py-2 rounded-full bg-gray-100 shadow-sm"
      >
        {editMode ? (
          <>
            <input
              type="text"
              value={skill}
              onChange={(e) => handleInputChange(e, "skills", i)}
              className="bg-transparent focus:outline-none text-sm min-w-[80px]"
              placeholder="Skill"
            />
            <button
              onClick={() => handleRemoveItem("skills", i)}
              className="text-red-600 font-bold hover:text-red-800"
              title="Remove Skill"
            >
              &times;
            </button>
          </>
        ) : (
         resumeData.skills.map((skillCategory, i) => (
  <div key={i}>
    <h4 className="font-semibold">{skillCategory.category}</h4>
    <ul className="list-disc list-inside ml-4">
      {skillCategory.items.map((item, j) => (
        <li key={j} className="text-sm text-gray-700">{item}</li>
      ))}
    </ul>
  </div>
))

        )}
      </div>
    ))}
    {editMode && (
      <button
        onClick={() => handleAddItem("skills")}
        className="text-sm px-4 py-2 border border-blue-500 text-blue-600 hover:bg-blue-50 rounded-full transition font-semibold"
      >
        + Add Skill
      </button>
    )}
  </div>
</section>


        {/* Work Experience */}
<section className="mb-10">
  <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-4">💼 Work Experience</h2>
  {resumeData.workExperience?.map((work, i) => (
    <div
      key={i}
      className="relative border border-gray-300 rounded-lg p-5 mb-5 shadow-sm bg-transparent"

    >
      {editMode && (
        <button
          onClick={() => handleRemoveItem("workExperience", i)}
          className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full w-7 h-7 flex items-center justify-center font-bold"
          title="Remove Work Experience"
        >
          &times;
        </button>
      )}

      {editMode ? (
        <>
          <input
            type="text"
            placeholder="Job Title or Role"
            value={work.role}
            onChange={(e) => handleInputChange(e, "workExperience", i, "role")}
            className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Date (e.g., Jan 2022 - Present)"
            value={work.date}
            onChange={(e) => handleInputChange(e, "workExperience", i, "date")}
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md"
          />
          <div>
            <h4 className="text-md font-semibold mb-2">Details</h4>
            {work.details.map((detail, subI) => (
              <div key={subI} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Responsibility / Achievement"
                  value={detail}
                  onChange={(e) => handleInputChange(e, "workExperience", i, "details", subI)}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md"
                />
                <button
                  onClick={() => handleRemoveItem("workExperience", i, subI)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                >
                  &times;
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAddDetail(i)}
              className="mt-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              + Add Detail
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{work.role}</h3>
          <p className="text-sm italic text-gray-600 mb-2">{work.date}</p>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            {work.details.map((d, idx) => (
              <li key={idx}>{d}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  ))}

  {editMode && (
    <button
      onClick={() => handleAddItem("workExperience")}
      className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
    >
      + Add Work Experience
    </button>
  )}
</section>


        {
       }
      </main>
    </div>
  );
};

export default ResumeTemplate2;
