import React from "react";
import { motion } from "framer-motion";


const PlanCard = () => {
  const plans = [
    {
      id: 1,
      name: "Free",
      price: "$0/mo",
      popular: false,
      features: [
        "Track income & expenses",
        "Basic financial dashboard",
        "Manual data entry",
      ],
      disabled: [
        "Export to PDF/Excel",
        "Priority support",
        "Advanced analytics",
      ],
    },
    {
      id: 2,
      name: "Standard",
      price: "$9/mo",
      popular: true,
      features: [
        "Smart category detection",
        "Monthly report generation",
        "Cloud data backup",
        "Export reports as PDF",
      ],
      disabled: ["Priority support", "AI budget assistant"],
    },
    {
      id: 3,
      name: "Premium",
      price: "$19/mo",
      popular: false,
      features: [
        "Detailed financial analytics",
        "Export reports as PDF/Excel",
        "Monthly category breakdown",
        "Priority support & updates",
        "Multi-user family accounts", "AI financial advisor"
        
      ],
      disabled: [],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-center text-green-600 mb-12">
        Choose Your Plan
      </h1>

      <div className="grid gap-8 md:grid-cols-3 place-items-center">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.2, 
              ease: "easeOut",
            }}
            
            className={`relative w-full md:max-w-sm mx-auto bg-white border rounded-2xl shadow-md hover:shadow-lg transition-all duration-300  ${
              plan.popular ? "border-green-600 scale-105" : "border-green-300"
            }`}
          >
            <div className="p-8">
              {/* Badge */}
              {plan.popular && (
                <span className="absolute -top-4 left-5/12 bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded-full shadow-sm">
                  Most Popular
                </span>
              )}

              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">
                  {plan.name}
                </h2>
                <span className="text-2xl font-semibold text-green-700">
                  {plan.price}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 text-gray-700 text-sm">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-green-600 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}

                {/* Disabled features */}
                {plan.disabled.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center text-gray-400 line-through"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 mr-2 text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <div className="mt-8">
                <button
                  className={`w-full font-semibold py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                    plan.popular
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  {plan.popular ? "Get Started" : "Choose Plan"}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PlanCard;
