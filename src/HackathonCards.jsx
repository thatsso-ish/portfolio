import React, { useState } from 'react';

const hackathons = [
  {
    date: '2025 Oct',
    title: 'BCG Platinion Hackathon 2025',
    org: 'Offered by BCG Platinion',
    result: '2nd Place Winner',
    country: 'South Africa',
    technologies: ['React.js', 'MongoDB', 'Python', 'Product Ideation'],
    about: `Over an intense 30-hour sprint of building, breaking, fixing, and learning, our team of four developed a prototype for a learner incentive system aimed at revitalizing education. The product rewards students for attending school, participating in class, excelling academically, and engaging in extracurricular activities, bringing back the fun and purpose of learning. What sets our solution apart is its inclusive design: it caters not only to learners who can afford basic resources but also uplifts those who cannot. Earned points can be converted into essentials like food vouchers, stationery, hygiene packs, and school uniforms, ensuring that every learner has a fair shot at success. Despite the time pressure, we delivered a solid proof-of-concept that proved the viability of our approach. The real win was the collaborative growth and the powerful reminder that the best solutions emerge through teamwork and a shared commitment to equity.`
  },
  {
    date: '2025 Sep',
    title: 'Geekulcha Annual Hack 2025',
    org: 'Offered by Geekulcha & Telkom',
    result: 'Participant',
    country: 'Egypt',
    technologies: ['React.js', 'Google Gemini', 'Python', 'Application Programming Interfaces (API)'],
    about: `We worked on SafeMzansi: a product that prioritizes not just speed, but also safety. Too often, travelers and delivery personnel move blindly into unfamiliar areas, with ~71% of delivery workers becoming victims of crime. SafeMzansi doesn’t just give you the shortest route, it guides you with context on crime exposure in different areas and suggests the least dangerous route to your destination.`
  },
  {
    date: '2025 Aug',
    title: "Bet'25 Software Hackathon",
    org: 'Offered by BETSoftware',
    result: 'Top 10',
    country: 'Nigeria',
    technologies: ['React.js', 'AWS EC2', 'CouchDB', 'Python'],
    about: `A 36-hour sprint of building,breaking, fixing, and intense learning. Our team developed a prototype for a system designed to predict and track errors before they impact the user. Under significant time pressure, we created a solid proof-of-concept that demonstrated the viability of our approach. While the project had industry-shaking potential with more development, the real win was the collaborative growth and the powerful lesson that the best solutions emerge through teamwork.`
  },
  {
    date: '2023 Oct',
    title: "GradHackathon",
    org: 'Offered by Old Mutual',
    result: '2nd Position Winner',
    country: 'Morocco',
    technologies: ['Amazon S3', 'AWS Amplify Studio', 'Amazon Lex', 'Figma', 'Python'],
    about: `I participated in an exhilarating hackathon competition hosted by Old Mutual. I had the privilege of working alongside five brilliant individuals, and together we developed a fully functional chatbot utilizing Amazon services. The intense collaboration, innovative problem-solving, and relentless drive to succeed culminated in our team securing second place in the final round. This experience not only honed my technical skills but also underscored the power of teamwork and creative thinking.`
  },
  {
    date: '2019 Oct',
    title: "Foundations' Hackathon",
    org: 'Offered by Tshwane University of Tech.',
    result: 'Top 5',
    country: 'Cape Verde',
    technologies: ['Visual Basic', 'Small Basic Programming','Visual Basic for Applications (VBA)'],
    about: `Over several intense weeks of collaboration, design, and debugging: We built more than a system; we built trust in digital democracy. The real challenge wasn't the code, but designing for clarity and accessibility to empower every student. Our project streamlined campus elections into a secure, intuitive, and transparent experience, proving that the right technology can strengthen community engagement.`
  },
];

export default function HackathonCards() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div className="relative w-full">
      {/* Cards grid (blurred on modal open) */}
      <div className={`w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 py-4 sm:py-6 lg:py-8 px-1 sm:px-2 transition-all duration-300 ${openIdx !== null ? 'filter blur-md pointer-events-none select-none' : ''}`}>
        {hackathons.map((h, idx) => (
          <div
            key={h.title}
            className={
              `relative flex flex-col bg-white dark:bg-brand-dark border border-brand-gray-200 dark:border-brand-gray-900 rounded-xl sm:rounded-2xl min-h-[200px] sm:min-h-[235px] px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-7 shadow-md transition-all duration-300
              hover:border-brand-blue/70 hover:shadow-[0_6px_24px_1px_rgba(58,122,254,0.18)] hover:z-10 cursor-pointer
              ${openIdx === idx ? 'ring-4 ring-brand-blue/15 scale-[1.02] z-10' : ''}`
            }
            onClick={() => setOpenIdx(idx)}
            tabIndex={0}
            aria-expanded={openIdx === idx}
            style={{ transitionProperty: 'box-shadow, border, transform' }}
          >
            <div className="flex flex-col sm:flex-row sm:space-x-3 mb-3 items-start sm:items-center gap-2 sm:gap-0">
              <span className="inline-block text-xs text-brand-blue bg-brand-blue/10 font-bold py-1 px-2 sm:px-3 rounded-full tracking-wide uppercase w-fit">{h.date}</span>
              <span className="inline-block font-semibold text-emerald-700 dark:text-emerald-300 text-xs px-2 py-1 rounded-md bg-emerald-100/70 dark:bg-emerald-900/50 w-fit">{h.result}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold leading-tight text-brand-blue mb-2 tracking-wide max-w-full break-words">{h.title}</h2>
            <div className="text-xs sm:text-sm text-gray-400 mb-4 font-medium">{h.org}</div>
            <div className="mb-3 flex flex-wrap gap-1 sm:gap-2">
              {h.technologies.map(tech => (
                <span key={tech} className="bg-brand-blue/10 text-brand-blue text-xs rounded-full px-2 sm:px-3 py-1 font-semibold">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Modal overlay (visible only if openIdx !== null) */}
      {openIdx !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-40 p-4">
          {/* Dimmed background */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px] transition-all duration-300" onClick={() => setOpenIdx(null)} />
          {/* Modal card */}
          <div className="relative bg-white dark:bg-brand-dark border-2 border-brand-blue/30 max-w-2xl w-full mx-auto rounded-2xl sm:rounded-3xl shadow-[0_12px_48px_6px_rgba(58,122,254,0.11)] z-50 px-4 sm:px-8 lg:px-12 py-6 sm:py-8 lg:py-12 flex flex-col animate-fade-in-up">
            <button
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 bg-white/80 dark:bg-brand-dark/70 rounded-full shadow p-2 hover:bg-brand-blue/30 hover:text-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue"
              aria-label="Close details"
              onClick={() => setOpenIdx(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col gap-1 mb-4">
              <div className="flex space-x-3 items-center">
                <span className="inline-block text-sm text-brand-blue bg-brand-blue/10 font-bold py-1 px-3 rounded-full tracking-wide uppercase mr-0">{hackathons[openIdx].date}</span>
                <span className="inline-block font-semibold text-emerald-700 dark:text-emerald-300 text-xs px-2 py-1 rounded-md bg-emerald-100/70 dark:bg-emerald-900/50">{hackathons[openIdx].result}</span>
              </div>
              <h2 className="text-2xl font-extrabold leading-tight text-brand-blue tracking-widest mb-2 max-w-full break-words">
                {hackathons[openIdx].title}
              </h2>
              <div className="text-base text-gray-400 font-medium mb-3 pl-1">{hackathons[openIdx].org}</div>
              <div className="mb-5 flex flex-wrap gap-3">
                {hackathons[openIdx].technologies.map(tech => (
                  <span key={tech} className="bg-brand-blue/10 text-brand-blue text-sm rounded-full px-3 py-1 font-semibold">
                    {tech}
                  </span>
                ))}
              </div>
              <hr className="border-t border-brand-blue/20 mb-7 mt-1" />
            </div>
            <p className="text-gray-700 dark:text-gray-200 text-lg mb-2 whitespace-pre-line mt-1 leading-relaxed tracking-wide">{hackathons[openIdx].about}</p>
          </div>
        </div>
      )}
    </div>
  );
}
