import React, { useState } from 'react';

const projects = [
  {
    date: '2024 Sep - 2024 Dec',
    title: 'EchoLens Classification',
    country: 'France',
    technologies: ['Jupyter', 'Flask', 'Python', 'CSS', 'JavaScript', 'Streamlit'],
    about: 'The aim of the project focuses on audio classification using a pretrained model for feature extraction and a hybrid model for classification. The goal is to identify and classify audio signals into predefined categories, leveraging advanced machine learning and deep learning techniques.',
    link: 'https://github.com/thatsso-ish/Audio-Data-Modeling',
    image: ''
  },
  {
    date: '2024 Jun - 2024 Jul',
    title: 'News Article Categorization Through Machine Learning: A Comprehensive NLP Approach',
    country: 'Austria',
    technologies: ['Python', 'Jupyter', 'MLFlow', 'StreamLit'],
    about: 'The project focuses on performing a classification analysis to predict a target variable using various machine learning techniques. It includes data exploration, preprocessing, and training models such as Logistic Regression, SVM, KNN, and Random Forest. The project leverages MLflow for tracking experiments, logging parameters, and managing models. Additionally, Streamlit is used to create an interactive web application for visualizing the results and insights. This comprehensive approach enhances the efficiency and accessibility of the machine learning workflow.',
    link: 'https://github.com/thatsso-ish/Classification',
    image: ''
  },
  {
    date: '2024 May - 2024 Jun',
    title: 'Climate Connect',
    country: 'Germany',
    technologies: ['Jupyter'],
    about: 'This project aims to understand the impact of agricultural activities on climate change and develop strategies for sustainable practices. The project uses data from the Food and Agriculture Organization (FAO) and the Intergovernmental Panel on Climate Change (IPCC) to analyze CO2 emissions in the agri-food sector and predict temperature variations.',
    link: 'https://github.com/thatsso-ish/climateconnect',
    image: ''
  },
  {
    date: '2024 Jan',
    title: 'Hacker News',
    country: 'Croatia',
    technologies: ['Python'],
    about: `The goal is to implement all CRUD operations and build a copycat of Hacker News. The minimal social news website (with a focus on computer science & technology) allows users to submit article links and upvote them.`,
    link: 'https://github.com/thatsso-ish/hacker-news',
    image: ''
  },
  {
    date: '2023 Dec - 2024 Jan',
    title: 'Heart Failure Model',
    country: 'Italy',
    technologies: ['Jupyter'],
    about: 'The model predicts if a patient will die based on several medical features, leading to heart failure. To be integrated with SQL for storage and Tableau for visuals. A python module will ease use on new datasets.',
    link: 'https://github.com/thatsso-ish/heart-failure-model',
    image: ''
  },
  {
    date: '2023 Nov - 2023 Dec',
    title: 'Cricket Predictive Model',
    country: 'Spain',
    technologies: ['Jupyter'],
    about: 'This project builds a cricket prediction model to forecast the likelihood of a player getting out, using logistic regression and preprocessed batting data. Streamlit provides visualization, and predictions are stored in a MySQL database.',
    link: 'https://github.com/thatsso-ish/cricket_predictive_model',
    image: ''
  },
];

export default function ProjectCards() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div className="relative w-full">
      {/* Cards grid (blurred on modal open) */}
      <div className={`w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 py-4 sm:py-6 lg:py-8 px-1 sm:px-2 transition-all duration-300 ${openIdx !== null ? 'filter blur-md pointer-events-none select-none' : ''}`}>
        {projects.map((p, idx) => (
          <div
            key={p.title}
            className={
              `relative flex flex-col bg-white dark:bg-brand-dark border border-brand-gray-200 dark:border-brand-gray-900 rounded-xl sm:rounded-2xl min-h-[200px] sm:min-h-[230px] px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-7 shadow-md transition-all duration-300
              hover:border-brand-blue/70 hover:shadow-[0_6px_24px_1px_rgba(58,122,254,0.16)] hover:z-10 cursor-pointer`
            }
            onClick={() => setOpenIdx(idx)}
            tabIndex={0}
            aria-expanded={openIdx === idx}
            style={{ transitionProperty: 'box-shadow, border, transform' }}
          >
            <div className="flex flex-col gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="inline-block text-xs text-brand-blue bg-brand-blue/10 font-bold py-1 px-3 rounded-full tracking-wide uppercase">{p.date}</span>
              
                {/* <span className="inline-block bg-brand-gray-100 dark:bg-brand-gray-900 font-semibold text-brand-blue text-xs rounded ml-auto px-2 py-1 border border-brand-blue/15">{p.country}</span> */}
              </div>
              <h2 className="text-xl font-extrabold leading-tight text-brand-blue mb-1 tracking-wide max-w-full break-words">{p.title}</h2>
            </div>
            <div className="mb-3 flex flex-wrap gap-2">
              {p.technologies.map(tech => (
                <span key={tech} className="bg-brand-blue/10 text-brand-blue text-xs rounded-full px-3 py-1 font-semibold">
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-gray-500 dark:text-gray-300 text-sm line-clamp-4 mb-3">{p.about}</p>
            <a href={p.link} target="_blank" rel="noopener noreferrer" className="mt-auto text-brand-blue hover:underline text-xs font-semibold tracking-wide">View Project</a>
          </div>
        ))}
      </div>
      {/* Modal overlay (visible only if openIdx !== null) */}
      {openIdx !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          {/* Dimmed background */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px] transition-all duration-300" onClick={() => setOpenIdx(null)} />
          {/* Modal card */}
          <div className="relative bg-white dark:bg-brand-dark border-2 border-brand-blue/30 max-w-2xl w-[92vw] mx-auto rounded-3xl shadow-[0_12px_48px_6px_rgba(58,122,254,0.12)] z-50 px-12 py-12 flex flex-col animate-fade-in-up">
            <button
              className="absolute top-6 right-6 text-gray-400 bg-white/80 dark:bg-brand-dark/70 rounded-full shadow p-2 hover:bg-brand-blue/30 hover:text-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue"
              aria-label="Close details"
              onClick={() => setOpenIdx(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col gap-2 mb-2">
              <span className="inline-block text-xs text-brand-blue bg-brand-blue/10 font-bold py-1 px-3 rounded-full tracking-wide uppercase mb-2">{projects[openIdx].date}</span>
              <h2 className="text-2xl font-extrabold leading-tight text-brand-blue tracking-widest mb-2 max-w-full break-words">{projects[openIdx].title}</h2>
              <div className="mb-3 flex flex-wrap gap-3">
                {projects[openIdx].technologies.map(tech => (
                  <span key={tech} className="bg-brand-blue/10 text-brand-blue text-sm rounded-full px-3 py-1 font-semibold">
                    {tech}
                  </span>
                ))}
              </div>
              <hr className="border-t border-brand-blue/20 mb-7 mt-1" />
            </div>
            <p className="text-gray-700 dark:text-gray-200 text-lg mb-5 whitespace-pre-line mt-1 leading-relaxed tracking-wide">{projects[openIdx].about}</p>
            <a href={projects[openIdx].link} target="_blank" rel="noopener noreferrer" className="self-start text-brand-blue hover:underline text-base font-semibold tracking-wide px-6 py-2 bg-brand-blue/10 rounded-xl">View Project</a>
          </div>
        </div>
      )}
    </div>
  );
}
