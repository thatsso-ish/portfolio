import React from "react";

export default function ContactSection() {
  return (
    <section className="w-full max-w-4xl mx-auto bg-white dark:bg-brand-dark rounded-xl sm:rounded-2xl shadow-lg px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 mt-8 sm:mt-12 lg:mt-16 mb-8 sm:mb-10 lg:mb-12">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 lg:mb-10 text-brand-blue text-center lg:text-left">
        Get In <span className="text-brand-gray-900 dark:text-brand-gray-100">Touch</span>
      </h2>
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
        {/* Left: Quick actions/socials */}
        <div className="flex-1 flex flex-col justify-between space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
            <a href="tel:+27790526257" className="bg-brand-blue/90 hover:bg-brand-blue text-white font-semibold px-4 sm:px-6 lg:px-7 py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-md transition inline-block text-center text-sm sm:text-base lg:text-lg">Hire me</a>
            <a href="tel:+27790526257" className="border border-brand-blue text-brand-blue font-semibold px-4 sm:px-6 lg:px-7 py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-sm hover:bg-brand-blue hover:text-white transition inline-block text-center text-sm sm:text-base lg:text-lg">Let's talk</a>
          </div>
          <div className="flex gap-3 sm:gap-4 mt-2">
            <a href="https://www.linkedin.com/in/ismael-n-636a2a251/" target="_blank" rel="noopener noreferrer" className="bg-brand-blue/10 text-brand-blue rounded-full p-2 sm:p-3 hover:bg-brand-blue hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11.75 20h-3v-9h3v9zm-1.5-10.272c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.25 10.272h-3v-4.688c0-1.119-.883-2.031-2-2.031s-2 .912-2 2.031v4.688h-3v-9h3v1.562c.477-.794 1.385-1.312 2.294-1.312 1.794 0 3.206 1.551 3.206 3.437v5.313zm-11-8h-2.999l-.001-9h3v9zm14-9.001c0-.553-.447-.999-.999-.999s-.999.446-.999.999.447.999.999.999.999-.447.999-.999z"/></svg></a>
            <a href="https://github.com/thatsso-ish" target="_blank" rel="noopener noreferrer" className="bg-brand-blue/10 text-brand-blue rounded-full p-2 sm:p-3 hover:bg-brand-blue hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M12 .5c-6.6 0-12 5.4-12 12 0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.1-4-1.1-.5-1.1-1.3-1.4-1.3-1.4-1.1-.8 0-.8 0-.8 1.2 0 1.8 1.2 1.8 1.2.9 1.8 2.3 1.3 2.8 1 .1-.6.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.6 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.5.1-3.2 0 0 .9-.3 3 .9.9-.2 1.8-.4 2.7-.4.9 0 1.8.1 2.7.4 2.1-1.2 3-.9 3-.9.6 1.7.3 2.9.1 3.2.7.8 1.1 1.7 1.1 2.9 0 4.3-2.8 5.3-5.5 5.6.5.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6C20.6 22.3 24 17.8 24 12.5c0-6.6-5.4-12-12-12z"/></svg></a>
            <a href="mailto:itngobeniii@gmail.com" className="bg-brand-blue/10 text-brand-blue rounded-full p-2 sm:p-3 hover:bg-brand-blue hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zm0 12H4V8.99l8 6.99 8-6.98V18z"/></svg></a>
          </div>
        </div>
        {/* Right: Contact form */}
        <div className="flex-1">
          <form action="https://formspree.io/f/mkgwgvyk" method="POST" className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <label htmlFor="firstName" className="text-xs sm:text-sm font-semibold">First Name</label>
                <input type="text" id="firstName" name="firstName" className="mt-1 w-full rounded-lg border border-brand-gray-200 dark:border-brand-gray-900 bg-white dark:bg-brand-gray-900 px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-brand-blue/60" placeholder="First name" />
              </div>
              <div className="flex-1">
                <label htmlFor="secondName" className="text-xs sm:text-sm font-semibold">Second Name</label>
                <input type="text" id="secondName" name="secondName" className="mt-1 w-full rounded-lg border border-brand-gray-200 dark:border-brand-gray-900 bg-white dark:bg-brand-gray-900 px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-brand-blue/60" placeholder="Last name" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="text-xs sm:text-sm font-semibold">Your Email</label>
              <input type="email" id="email" name="email" className="mt-1 w-full rounded-lg border border-brand-gray-200 dark:border-brand-gray-900 bg-white dark:bg-brand-gray-900 px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-brand-blue/60" placeholder="name@example.com" />
            </div>
            <div>
              <label htmlFor="subject" className="text-xs sm:text-sm font-semibold">Your Subject</label>
              <input type="text" id="subject" name="subject" className="mt-1 w-full rounded-lg border border-brand-gray-200 dark:border-brand-gray-900 bg-white dark:bg-brand-gray-900 px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-brand-blue/60" placeholder="Subject" />
            </div>
            <div>
              <label htmlFor="message" className="text-xs sm:text-sm font-semibold">Message</label>
              <textarea id="message" name="message" rows={4} className="mt-1 w-full rounded-lg border border-brand-gray-200 dark:border-brand-gray-900 bg-white dark:bg-brand-gray-900 px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-brand-blue/60" placeholder="Write your message..." />
            </div>
            <button type="submit" className="w-full bg-brand-blue hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 rounded-lg shadow transition text-sm sm:text-base">Send</button>
          </form>
        </div>
      </div>
    </section>
  );
}
