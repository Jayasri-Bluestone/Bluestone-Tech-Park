import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Mail, MapPin, Phone, Send, MessageCircle, Clock, CheckCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

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
  const [categories, setCategories] = useState([]);


useEffect(() => {
  const fetchCategories = async () => {
    try {
      // Fetch from your NEW categories endpoint
      const res = await fetch("http://localhost:5003/api/categories");
      const data = await res.json();
      setCategories(data);
      
      // Set the first category as default if available
      if (data.length > 0 && !formData.service) {
        setFormData(prev => ({ ...prev, service: data[0].name }));
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };
  fetchCategories();
}, []);


  // 1. STATE FOR FORM DATA
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    service: "Website Development",
    message: ""
  });

  // 2. STATE FOR ERRORS & STATUS
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 3. VALIDATION LOGIC
  const validate = () => {
    let tempErrors = {};
    if (!formData.firstName.trim()) tempErrors.firstName = "Required";
    if (!formData.lastName.trim()) tempErrors.lastName = "Required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) tempErrors.email = "Invalid Email";
    
    const phoneRegex = /^\d{10}$/; // Exactly 10 digits
    if (!phoneRegex.test(formData.phone)) tempErrors.phone = "Invalid Phone (10 digits)";
    
    if (!formData.message.trim()) tempErrors.message = "Message cannot be empty";
    
    setErrors(tempErrors);

// 2. TRIGGER ERROR TOAST IF VALIDATION FAILS
    if (Object.keys(tempErrors).length > 0) {
      toast.error("Please fix the errors in the form.");
    }
    return Object.keys(tempErrors).length === 0;
  };


  // 4. SUBMIT TO YOUR BACKEND
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
   // 3. OPTIONAL: LOADING TOAST
    const loadingToast = toast.loading("Sending your message...");

    try {
      const response = await fetch("http://localhost:5003/submit-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message
        }),
      });

    if (response.ok) {
        // 4. SUCCESS TOAST
        toast.success("Message Sent! Check your email.", { id: loadingToast });
        setFormData({ firstName: "", lastName: "", phone: "", email: "", service: "Website Development", message: "" });
      } else {
        toast.error("Failed to send message.", { id: loadingToast });
      }
    } catch (err) {
      // 5. ERROR TOAST
      toast.error("Server connection failed.", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
   

    <section className="py-20 bg-white overflow-hidden relative">

      <Toaster position="top-right" reverseOrder={false} />

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

            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 text-white font-bold tracking-widest uppercase text-[10px] md:text-sm px-4 py-2 bg-cyan-100 rounded-full border border-cyan-300">

              📞 Get In Touch

            </span>

          </motion.div>



          <motion.h2

            initial={{ opacity: 0, y: 20 }}

            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true }}

            className="text-4xl md:text-5xl md:text-6xl italic font-black mb-6 text-gray-900"

          >

            Let's Build Something{" "}

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600">

              Amazing Together

            </span>

          </motion.h2>



          <motion.p

            initial={{ opacity: 0 }}

            whileInView={{ opacity: 1 }}

            viewport={{ once: true }}

            transition={{ delay: 0.2 }}

            className="text-gray-600 max-w-2xl mx-auto text-sm md:text-lg"

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

              className="bg-gradient-to-r from-cyan-400 via-blue-300 to-cyan-500 border border-blue-200 rounded-2xl p-6 mt-6"

            >

              <h4 className="font-bold text-white mb-4">Why Choose Us?</h4>

              <div className="space-y-3">

                {benefits.map((benefit, idx) => (

                  <motion.div

                    key={idx}

                    className="flex items-center gap-3 text-white"

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
            
            <div className="relative bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-2">Send us a Message</h3>
              <p className="text-blue-100 text-sm mb-8">We'll respond within 24 hours</p>

              {/* ATTACH SUBMIT HANDLER */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <motion.div>
                    <label className="block text-xs font-bold text-white mb-2 uppercase tracking-wider">First Name</label>
                    <input
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className={`w-full px-4 py-3 rounded-xl bg-white/90 outline-none transition-all text-gray-900 ${errors.firstName ? 'ring-2 ring-red-400' : ''}`}
                    />
                  </motion.div>

                  <motion.div>
                    <label className="block text-xs font-bold text-white mb-2 uppercase tracking-wider">Last Name</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className={`w-full px-4 py-3 rounded-xl bg-white/90 outline-none transition-all text-gray-900 ${errors.lastName ? 'ring-2 ring-red-400' : ''}`}
                    />
                  </motion.div>
                </div>

                <motion.div>
                  <label className="block text-xs font-bold text-white mb-2 uppercase tracking-wider">Phone Number</label>
                  <input
                    type="text" // Changed to text for better regex handling
                    placeholder="1234567890"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl bg-white/90 outline-none transition-all text-gray-900 ${errors.phone ? 'ring-2 ring-red-400' : ''}`}
                  />
                  {errors.phone && <span className="text-[10px] text-red-100 font-bold">{errors.phone}</span>}
                </motion.div>

                <motion.div>
                  <label className="block text-xs font-bold text-white mb-2 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl bg-white/90 outline-none transition-all text-gray-900 ${errors.email ? 'ring-2 ring-red-400' : ''}`}
                  />
                </motion.div>

        <motion.div>
  <label className="block text-xs font-bold text-white mb-2 uppercase tracking-wider">
    Service Interested In
  </label>
  <select 
    value={formData.service}
    onChange={(e) => setFormData({...formData, service: e.target.value})}
    className="w-full px-4 py-3 rounded-xl bg-white/90 outline-none transition-all text-gray-900 font-medium"
    required
  >
    {/* Default Placeholder */}
    <option value="" disabled>Select a category</option>

    {/* Map through dynamic categories from DB */}
    {categories.map((cat) => (
      <option key={cat.id} value={cat.name}>
        {cat.name}
      </option>
    ))}
    
    {/* Fallback option */}
    <option value="Other">Other / General Inquiry</option>
  </select>
</motion.div>

                <motion.div>
                  <label className="block text-xs font-bold text-white mb-2 uppercase tracking-wider">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl bg-white/90 outline-none transition-all text-gray-900 resize-none ${errors.message ? 'ring-2 ring-red-400' : ''}`}
                  />
                </motion.div>

               <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-white text-blue-600 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
      >
        <span>{isSubmitting ? "Authenticating..." : "Send Message"}</span>
        <Send size={18} />
      </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
        
        {/* ... (Keep your CTA Section exactly as it is) ... */}
      </div>
    </section>
  );
};