
import { motion } from "framer-motion";
import { Zap, Shield, Globe } from "lucide-react";

const features = [
  {
    title: "Real-time Updates",
    icon: <Zap className="h-8 w-8 text-white" />,
    description: "Get daily updates from local markets with fresh pricing every morning.",
    bg: "from-red-500 to-orange-500",
  },
  {
    title: "Verified Vendors",
    icon: <Shield className="h-8 w-8 text-white" />,
    description: "All vendors are verified and their submitted data is reliable and accurate.",
    bg: "from-blue-500 to-purple-500",
  },
  {
    title: "Easy Comparison",
    icon: <Globe className="h-8 w-8 text-white" />,
    description: "Compare prices across different markets to find the best deals.",
    bg: "from-green-500 to-teal-500",
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Why Choose <span className="text-red-600">Us?</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
              className="text-center group"
            >
              <div
                className={`bg-gradient-to-br ${feature.bg} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
