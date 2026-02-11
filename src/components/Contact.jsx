import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Send, MessageCircle, Clock, CheckCircle } from "lucide-react";

const contactCards = [
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Location",
    content: "123 Innovation Drive, Bluestone Tech Park, Silicon Valley, CA 94000",
    gradient: "from-blue-500 to-blue-600",
    color: "bg-blue-500",
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Phone",
    content: "+1 (555) 123-4567",
    gradient: "from-cyan-400 to-cyan-500",
    color: "bg-cyan-500",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email",
    content: "hello@bluestonetech.com",
    gradient: "from-sky-400 to-sky-500",
    color: "bg-sky-500",
  }
];

const benefits = [
  { icon: <Clock size={20} />, text: "24-Hour Response" },
  { icon: <CheckCircle size={20} />, text: "Expert Support" },
  { icon: <MessageCircle size={20} />, text: "Live Chat Available" }
];

export const Contact = () => {
  const [hovered, setHovered] = React.useState(null);
  const [formStep, setFormStep] = React.useState(1);

  return (
    <section className="py-32 bg-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-200/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="text-cyan-600 font-bold tracking-widest uppercase text-sm px-4 py-2 bg-cyan-100 rounded-full border border-cyan-300">
              📞 Get In Touch
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black mb-6 text-gray-900"
          >
            Let's Build Something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
              Amazing Together
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Have a question or ready to start your next project? We'd love to hear from you. Drop us a line and let's create something extraordinary.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Info Cards - Left Side */}
          <div className="space-y-4">
            {contactCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className="group relative"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${card.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                />
                
                <div className="relative bg-gradient-to-br from-white to-gray-50 border border-gray-200 p-6 rounded-2xl hover:border-blue-300 shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <motion.div
                      className={`w-14 h-14 rounded-xl ${card.color} flex items-center justify-center text-white flex-shrink-0 shadow-lg`}
                      whileHover={{ scale: 1.15, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {card.icon}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed break-words">
                        {card.content}
                      </p>
                    </div>
                  </div>
                  
                  {hovered === index && (
                    <motion.div
                      layoutId="hoverLine"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                      transition={{ type: "spring", bounce: 0.2 }}
                    />
                  )}
                </div>
              </motion.div>
            ))}

            {/* Benefits Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}bg-gradient-to-br from-slate-900 via-blue-900 to-blue-950
              className="bg-gradient-to-r from-blue-500 to-slate-700 border border-blue-200 rounded-2xl p-6 mt-6"
            >
              <h4 className="font-bold text-white mb-4">Why Choose Us?</h4>
              <div className="space-y-3">
                {benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-3 text-white/80"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                  >
                    <span className="text-white">{benefit.icon}</span>
                    <span className="text-sm font-semibold">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact Form - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-cyan-100/30 rounded-3xl blur-2xl -z-10" />
            
            <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-blue-950 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-2">Send us a Message</h3>
              <p className="text-blue-100 text-sm mb-8">We'll respond within 24 hours</p>

              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-xs font-bold text-white mb-2 uppercase tracking-wider">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full px-4 py-3 rounded-xl bg-white/90 border border-white/30 focus:border-white focus:ring-2 focus:ring-white/20 outline-none transition-all text-gray-900 placeholder:text-gray-500 hover:bg-white"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                  >
                    <label className="block text-xs font-bold text-white mb-2 uppercase tracking-wider">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full px-4 py-3 rounded-xl bg-white/90 border border-white/30 focus:border-white focus:ring-2 focus:ring-white/20 outline-none transition-all text-gray-900 placeholder:text-gray-500 hover:bg-white"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-xs font-bold text-white mb-2 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/90 border border-white/30 focus:border-white focus:ring-2 focus:ring-white/20 outline-none transition-all text-gray-900 placeholder:text-gray-500 hover:bg-white"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 }}
                >
                  <label className="block text-xs font-bold text-white mb-2 uppercase tracking-wider">
                    Service Interested In
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl bg-white/90 border border-white/30 focus:border-white focus:ring-2 focus:ring-white/20 outline-none transition-all text-gray-900 hover:bg-white">
                    <option>Website Development</option>
                    <option>Mobile App Development</option>
                    <option>Digital Marketing</option>
                    <option>Training Programs</option>
                    <option>Other Services</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-xs font-bold text-white mb-2 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 rounded-xl bg-white/90 border border-white/30 focus:border-white focus:ring-2 focus:ring-white/20 outline-none transition-all text-gray-900 placeholder:text-gray-500 hover:bg-white resize-none"
                  />
                </motion.div>

                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 }}
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-white hover:bg-blue-50 text-blue-600 font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg mt-2"
                >
                  <span>Send Message</span>
                  <motion.div whileHover={{ x: 4 }}>
                    <Send size={18} />
                  </motion.div>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-block bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-8 max-w-2xl">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <MessageCircle className="w-12 h-12 text-cyan-600" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Ready to Connect?</h3>
            <p className="text-gray-700 mb-6">
              Whether it's a quick question or a full project discussion, we're here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-400/50 transition-all"
              >
                Start a Project
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3 border border-blue-300 text-blue-600 font-bold rounded-xl hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50 transition-all"
              >
                Schedule a Call
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
