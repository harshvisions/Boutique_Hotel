"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Calendar, ChevronRight, Wifi, Coffee, Sparkles, Map, Menu, X, ArrowRight } from "lucide-react";

const HERO_IMAGE = "/Hot-Tub_1.jpg";
const STORY_IMAGE = "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop";

const ROOMS = [
  {
    id: 1,
    title: "The Heritage Suite",
    price: "$450",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "The Classic Room",
    price: "$280",
    image: "/classroom.jpg",
  },
  {
    id: 3,
    title: "The Garden Pavilion",
    price: "$350",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=800&auto=format&fit=crop",
  },
];

const AMENITIES = [
  { icon: Wifi, title: "High-Speed Wi-Fi", description: "Complimentary throughout the property for seamless connectivity." },
  { icon: Coffee, title: "Organic Dining", description: "Farm-to-table breakfast included, crafted with local ingredients." },
  { icon: Sparkles, title: "Holistic Spa", description: "Rejuvenate with traditional treatments in our serene wellness center." },
  { icon: Map, title: "Local Tours", description: "Curated experiences and exclusive access in the historic district." },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  return (
    <main className="relative bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "glass py-4 shadow-sm" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className={`font-serif text-2xl font-semibold tracking-widest ${isScrolled ? "text-primary" : "text-white"}`}>
            SANCTUARY
          </div>
          
          <div className="hidden md:flex space-x-10 text-xs uppercase tracking-[0.2em] font-medium">
            {["Story", "Accommodations", "Amenities", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`transition-colors duration-300 hover:text-accent ${
                  isScrolled ? "text-primary/80" : "text-white/90"
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <button className={`px-6 py-2 border transition-all duration-300 text-xs uppercase tracking-widest font-medium ${
              isScrolled ? "border-primary text-primary hover:bg-primary hover:text-white" : "border-white text-white hover:bg-white hover:text-primary"
            }`}>
              Book Now
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={isScrolled ? "text-primary" : "text-white"} size={28} />
            ) : (
              <Menu className={isScrolled ? "text-primary" : "text-white"} size={28} />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center space-y-8"
          >
            {["Story", "Accommodations", "Amenities", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-4xl text-primary hover:text-accent transition-colors"
              >
                {item}
              </a>
            ))}
            <button className="mt-8 px-8 py-3 bg-primary text-white uppercase tracking-widest text-sm hover:bg-accent hover:text-primary transition-colors duration-300">
              Book Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <Image
            src={HERO_IMAGE}
            alt="Hero Background"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10 md:mt-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-accent uppercase tracking-[0.4em] text-xs md:text-sm mb-6 font-medium"
          >
            Welcome to your escape
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight drop-shadow-lg"
          >
            A Sanctuary of <br />
            <span className="italic font-light">Heritage & Comfort</span>
          </motion.h1>
        </div>

        {/* Floating Date Picker */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 w-11/12 max-w-4xl z-20"
        >
          <div className="glass-dark rounded-xl p-3 flex flex-col md:flex-row items-center justify-between shadow-2xl">
            <div className="flex-1 flex items-center gap-4 px-6 py-3 border-b md:border-b-0 md:border-r border-white/10 w-full hover:bg-white/5 transition-colors cursor-pointer rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
              <Calendar className="text-accent" size={24} strokeWidth={1.5} />
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-white/50 uppercase tracking-[0.2em]">Check-in</span>
                <span className="text-sm text-white font-medium mt-1">Select Date</span>
              </div>
            </div>
            <div className="flex-1 flex items-center gap-4 px-6 py-3 border-b md:border-b-0 md:border-r border-white/10 w-full hover:bg-white/5 transition-colors cursor-pointer">
              <Calendar className="text-accent" size={24} strokeWidth={1.5} />
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-white/50 uppercase tracking-[0.2em]">Check-out</span>
                <span className="text-sm text-white font-medium mt-1">Select Date</span>
              </div>
            </div>
            <div className="p-3 w-full md:w-auto">
              <button className="w-full bg-accent hover:bg-white text-primary px-10 py-4 rounded font-medium tracking-widest text-xs uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                Check Availability
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* The Story Section */}
      <section id="story" className="py-20 md:py-32 lg:py-48 relative">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
              className="lg:w-1/2 z-10"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-12 bg-accent" />
                <h2 className="text-accent uppercase tracking-[0.3em] text-xs font-semibold">The Story</h2>
              </div>
              <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary mb-10 leading-[1.1]">
                Where Timeless Elegance Meets Modern Serenity.
              </h3>
              <p className="text-primary/70 mb-6 leading-relaxed font-light text-lg">
                Nestled in the heart of the historic district, Sanctuary is more than just a boutique hotel—it is an experience curated for the discerning traveler. Originally built in the 19th century, our guest house has been meticulously restored to honor its architectural heritage.
              </p>
              <p className="text-primary/70 mb-12 leading-relaxed font-light text-lg">
                Every corner tells a story. From the hand-carved woodwork to the bespoke contemporary furnishings, we invite you to discover a space where time slows down, and every detail is designed for your absolute comfort.
              </p>
              <button className="group flex items-center gap-4 text-primary font-medium tracking-[0.2em] uppercase text-xs border-b border-primary/30 pb-2 hover:border-primary transition-all duration-300">
                Discover Our Heritage
                <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform duration-300" strokeWidth={1.5} />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="lg:w-1/2 relative h-[400px] md:h-[600px] lg:h-[800px] w-full"
            >
              <div className="absolute top-12 -left-12 bottom-12 right-12 bg-[#F5F2EA] -z-10 hidden lg:block" />
              <div className="relative h-full w-full overflow-hidden shadow-2xl">
                <Image
                  src={STORY_IMAGE}
                  alt="Our Heritage"
                  fill
                  className="object-cover transition-transform duration-[2s] hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-8 shadow-xl hidden md:block">
                <p className="font-serif text-5xl text-primary mb-2">1885</p>
                <p className="text-xs uppercase tracking-[0.2em] text-primary/60">Established</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section id="accommodations" className="py-20 md:py-32 lg:py-48 bg-[#F5F2EA]">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
          >
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-accent" />
                <h2 className="text-accent uppercase tracking-[0.3em] text-xs font-semibold">Accommodations</h2>
              </div>
              <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary">Your Private Retreat</h3>
            </div>
            <button className="group flex items-center gap-3 text-primary font-medium tracking-[0.2em] uppercase text-xs hover:text-accent transition-colors duration-300">
              View All Suites
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" strokeWidth={1.5} />
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {ROOMS.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden mb-6 shadow-lg">
                  <Image
                    src={room.image}
                    alt={room.title}
                    fill
                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-8 group-hover:translate-y-0">
                    <div className="bg-white/95 text-primary px-8 py-4 flex items-center gap-3 shadow-xl backdrop-blur-sm">
                      <span className="uppercase text-xs tracking-[0.2em] font-medium">Discover</span>
                      <ChevronRight size={16} strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-serif text-2xl lg:text-3xl text-primary mb-3 group-hover:text-accent transition-colors duration-300">{room.title}</h4>
                  <div className="flex items-center gap-4">
                    <span className="text-primary/50 text-xs uppercase tracking-[0.2em]">From</span>
                    <span className="text-primary font-medium text-lg tracking-wide">{room.price}</span>
                    <span className="text-primary/50 text-xs uppercase tracking-[0.2em]">/ Night</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curated Amenities */}
      <section id="amenities" className="py-20 md:py-32 lg:py-48 bg-white relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-primary/10" />
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="text-center mb-24 max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-accent" />
              <h2 className="text-accent uppercase tracking-[0.3em] text-xs font-semibold">Experiences</h2>
              <div className="h-[1px] w-8 bg-accent" />
            </div>
            <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary mb-8">Curated Amenities</h3>
            <p className="text-primary/60 font-light text-lg leading-relaxed">
              Every detail of your stay has been carefully considered to provide an atmosphere of total relaxation and refined indulgence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {AMENITIES.map((amenity, index) => (
              <motion.div
                key={amenity.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 rounded-full border border-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-sm group-hover:shadow-xl">
                  <amenity.icon size={36} className="text-primary/70 group-hover:text-accent transition-colors duration-500" strokeWidth={1} />
                </div>
                <h4 className="font-serif text-2xl text-primary mb-4">{amenity.title}</h4>
                <p className="text-primary/60 font-light text-sm leading-relaxed max-w-[250px]">
                  {amenity.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-primary text-white pt-20 md:pt-32 pb-8 md:pb-12 border-t border-primary/20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-8 mb-24">
            <div className="md:col-span-5 lg:col-span-4">
              <h2 className="font-serif text-3xl tracking-widest mb-8 text-white">SANCTUARY</h2>
              <p className="text-white/60 font-light mb-10 leading-relaxed text-sm pr-8">
                A sanctuary of heritage and comfort, offering an exclusive and serene retreat for the discerning traveler. Experience the art of living.
              </p>
              <div className="flex space-x-8">
                {['Instagram', 'Facebook', 'Twitter'].map((social) => (
                  <a key={social} href="#" className="text-white/80 hover:text-accent transition-colors text-xs uppercase tracking-[0.2em] font-medium">
                    {social}
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-3 lg:col-span-2 lg:col-start-6">
              <h4 className="font-serif text-xl mb-8 text-accent">Explore</h4>
              <ul className="space-y-4 text-white/70 font-light text-sm">
                {['Our Story', 'Accommodations', 'Dining', 'Spa & Wellness', 'Gallery'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4 lg:col-span-3">
              <h4 className="font-serif text-xl mb-8 text-accent">Contact</h4>
              <ul className="space-y-4 text-white/70 font-light text-sm">
                <li className="flex gap-4">
                  <Map size={18} className="text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span>123 Heritage Lane,<br />Historic District, CA 90210</span>
                </li>
                <li>contact@sanctuaryhotel.com</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>

            <div className="md:col-span-12 lg:col-span-3">
              <h4 className="font-serif text-xl mb-8 text-accent">Newsletter</h4>
              <p className="text-white/70 font-light text-sm mb-6">Subscribe for exclusive offers and stories from our sanctuary.</p>
              <div className="flex border-b border-white/30 focus-within:border-accent transition-colors pb-2">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="bg-transparent border-none outline-none py-2 px-0 text-sm w-full text-white placeholder:text-white/40"
                />
                <button className="text-accent hover:text-white transition-colors px-2">
                  <ArrowRight size={20} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/40 font-light tracking-widest uppercase">
            <p>&copy; {new Date().getFullYear()} Sanctuary Hotel. All rights reserved.</p>
            <div className="flex space-x-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
