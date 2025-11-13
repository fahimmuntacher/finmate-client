import React, { useRef, useState, useEffect } from "react";
import Flicking from "@egjs/react-flicking";
import { AutoPlay } from "@egjs/flicking-plugins";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { BiRightTopArrowCircle } from "react-icons/bi";

const BannerCarousel = ({ bannerData }) => {
  const flickingRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const plugins = [
    new AutoPlay({
      duration: 4000,
      direction: "NEXT",
      stopOnHover: true,
    }),
  ];

  useEffect(() => {
    const flicking = flickingRef.current;
    if (!flicking) return;

    const handleChanged = (e) => {
      const index = e.index % bannerData.length;
      setCurrentIndex(index);
    };

    flicking.on("changed", handleChanged);
    return () => flicking.off("changed", handleChanged);
  }, [bannerData.length]);

  return (
    <div className="relative w-full overflow-hidden ">
      <Flicking
        ref={flickingRef}
        align="center"
        circular={true}
        duration={800}
        plugins={plugins}
        moveType="snap"
        bounce={0}
        adaptive={true}
        cameraTag="div"
        viewportTag="div"
        className="w-full px-4 md:px-12"
      >
        {bannerData.map((banner, index) => {
          const isActive = currentIndex === index;

          return (
            <motion.div
              key={banner.id}
              className={`panel flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 px-4 md:px-6 transition-all duration-700 ease-out dark:bg-gray-800`}
              style={{
                width: "85%",
                minWidth: "300px",
                height: "600px",
                transform: `scale(${isActive ? 1 : 0.9})`,
                opacity: isActive ? 1 : 0.6,
                filter: isActive ? "none" : "blur(0.5px)",
                boxShadow: isActive
                  ? "0 25px 40px rgba(0,0,0,0.15)"
                  : "0 10px 20px rgba(0,0,0,0.08)",
                // borderRadius: "1.5rem",
              }}
            >
              {/* Left Section */}
              <motion.div
                className="flex-1 text-center md:text-left"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1
                  className={`text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-sm transition-colors duration-500 ${
                    isActive ? "text-green-800 dark:text-green-400" : "text-green-600 dark:text-green-300"
                  }`}
                >
                  {banner.title}
                </h1>
                <p
                  className={`text-base md:text-lg mb-6 max-w-lg mx-auto md:mx-0 transition-colors duration-500 ${
                    isActive ? "text-gray-700 dark:text-gray-300" : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {banner.desc}
                </p>

                {isActive && (
                  <Link to="/add-transaction">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-8 py-3 rounded-xl bg-green-600 dark:bg-green-500 text-white font-semibold text-lg md:text-xl shadow-lg hover:bg-[#00C896] transition-all flex items-center justify-center gap-2"
                    >
                      Get Started <BiRightTopArrowCircle size={24} />
                    </motion.button>
                  </Link>
                )}
              </motion.div>

              {/* Right Section (image) */}
              <motion.div
                className="flex-1 flex items-center justify-center relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: isActive ? 1 : 0.95,
                  y: isActive ? 0 : 20,
                  filter: isActive ? "brightness(100%)" : "brightness(85%)",
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <img
                  src={banner.image}
                  alt="Finance Illustration"
                  className="w-full max-w-lg h-[400px] md:h-[450px] lg:h-[500px] object-cover rounded-3xl shadow-2xl transition-transform duration-700 ease-in-out hover:scale-105"
                />
              </motion.div>
            </motion.div>
          );
        })}
      </Flicking>

      {/* Pagination */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {bannerData.map((_, i) => (
          <button
            key={i}
            onClick={() => flickingRef.current?.moveTo(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "bg-green-700 scale-125"
                : "bg-green-300 hover:bg-green-500"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
