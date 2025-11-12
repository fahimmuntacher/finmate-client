import { Link } from "react-router";
import { motion } from "framer-motion";
import { BiRightTopArrowCircle } from "react-icons/bi";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import BannerCarousel from "./BannerCarousol";

const bannerData = [
  
  {
    id: 1,
    title: "Plan today, Prosper tomorrow.",
    desc: "Your financial success starts with one small step. Take control with Finmate.",
    image: "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    title: "Track. Save. Grow.",
    desc: "Build wealth with consistency — Finmate helps you stay on track effortlessly.",
    image: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    title: "Money managed, stress vanished.",
    desc: "Visualize your goals and achieve financial freedom with ease.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1000&q=80",
  },
];

export default function BannerSection() {
  return (
    <section className="relative overflow-hidden dark:bg-neutral-900">
    <BannerCarousel bannerData={bannerData}></BannerCarousel>

      {/* Background Shapes */}
      <motion.div className="hidden sm:block absolute top-0 left-0 w-64 h-64 
               bg-green-300 dark:bg-zinc-400 rounded-full opacity-30 
               -translate-x-32 -translate-y-32" />
      <motion.div className="hidden sm:block absolute bottom-0 right-0 w-80 h-80 
               bg-green-300 dark:bg-zinc-400 rounded-full opacity-20 
               translate-x-32 translate-y-32" />
    </section>
  );
}
