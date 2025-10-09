import React, { useState } from "react";

const Contact = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
    
    // Show success message (you can replace this with a toast notification)
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <div className="flex md:flex-row flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Left Section: Brand Navigation */}
      <div className="w-full md:w-20 h-16 md:h-screen border-b md:border-b-0 md:border-r border-gray-700/50 flex items-center justify-center md:justify-start md:flex-col md:py-8 bg-black/30 backdrop-blur-sm">
        <div className="flex md:flex-col items-center justify-between w-full px-4 md:px-0 md:space-y-8">
          <img
            src="https://i.postimg.cc/Y2f229jm/image-removebg-preview.png"
            className="h-10 md:h-12 md:w-auto"
            alt="MindSpace Logo"
          />
          <div className="flex md:flex-col items-center gap-4 md:gap-6">
            <a href="/" className="text-gray-400 hover:text-white transition-colors duration-200">
              <span className="text-lg">🏠</span>
            </a>
            <a href="/about" className="text-gray-400 hover:text-white transition-colors duration-200">
              <span className="text-lg">👥</span>
            </a>
            <a href="/journal" className="text-gray-400 hover:text-white transition-colors duration-200">
              <span className="text-lg">📝</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Info Column */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center space-y-8 px-6 sm:px-12 lg:px-16 py-12 bg-gradient-to-br from-gray-800/20 to-black/30 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <p className="text-sm font-medium uppercase tracking-widest text-blue-400">Get In Touch</p>
            </div>
            
            <h1 className="lg:text-7xl md:text-6xl sm:text-5xl text-4xl font-bold leading-tight">
              Let's get <br /> 
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent">
                in touch
              </span>
            </h1>

            <p className="text-xl font-medium text-gray-300 max-w-2xl leading-relaxed">
              Don't hesitate to say hello! We'd love to hear from you and help you on your wellness journey.
            </p>
          </div>

          <div className="space-y-6 mt-8">
            {[
              {
                icon: "📞",
                title: "Phone",
                content: "+1 (555) 123-4567",
                sub: "Mon-Fri from 9am to 6pm"
              },
              {
                icon: "✉️",
                title: "Email",
                content: "hello@mindspace.com",
                sub: "We reply within 24 hours"
              },
              {
                icon: "🏢",
                title: "Office",
                content: "230 Mind Street, New York, NY, USA",
                sub: "See on Google Map →",
                link: "#"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-4 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 hover:border-blue-500/30 transition-all duration-300 group"
              >
                <div className="text-2xl p-3 bg-gray-700/50 rounded-xl group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-400 text-sm">{item.title}</p>
                  <p className="text-white font-semibold text-lg mt-1">{item.content}</p>
                  {item.link ? (
                    <a
                      href={item.link}
                      className="text-blue-400 font-semibold text-sm mt-2 inline-flex items-center gap-2 hover:text-blue-300 transition-colors"
                    >
                      {item.sub}
                      <span className="text-lg">📍</span>
                    </a>
                  ) : (
                    <p className="text-gray-500 text-sm mt-2">{item.sub}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mt-8">
            {[
              { icon: "📘", label: "Facebook" },
              { icon: "📷", label: "Instagram" },
              { icon: "🐦", label: "Twitter" },
              { icon: "💼", label: "LinkedIn" }
            ].map((social, index) => (
              <a
                key={index}
                href="#"
                className="p-3 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-all duration-200 hover:scale-110 group"
                title={social.label}
              >
                <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                  {social.icon}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Right Form Column */}
        <div className="w-full lg:w-[45%] flex flex-col bg-gradient-to-br from-gray-800/10 to-black/20 backdrop-blur-sm">
          {/* Form Header */}
          <div className="p-8 border-b border-gray-700/50">
            <h2 className="text-3xl font-bold mb-4">
              Send us a <span className="text-blue-400">message</span>
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Excited to hear from you! Let's start something special together. 
              Reach out for any questions or collaboration about your mental wellness journey.
            </p>
          </div>

          {/* Contact Form */}
          <div className="flex-1 p-6 sm:p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl py-4 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl py-4 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl py-4 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl py-4 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="What's this about?"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl py-4 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                  placeholder="Tell us about your project or inquiry..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 ${
                  isSubmitting 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/25'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Send Message
                    <span className="text-xl">🚀</span>
                  </span>
                )}
              </button>
            </form>

            {/* Privacy Note */}
            <p className="text-center text-gray-500 text-sm mt-6">
              We respect your privacy. Your information is safe with us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;