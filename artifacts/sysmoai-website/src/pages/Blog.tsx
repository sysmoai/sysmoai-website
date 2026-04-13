import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Blog() {
  const articles = [
    {
      title: "Why Every Bangladesh Business Needs AI in 2026",
      tags: ["AI", "Bangladesh", "Strategy"],
      excerpt: "The AI revolution isn't just for Silicon Valley. Here's why Bangladesh businesses that adopt AI in 2026 will outcompete those that don't."
    },
    {
      title: "How We Built 7 Websites on Replit",
      tags: ["Replit", "Web Development", "Systems"],
      excerpt: "From zero to seven production websites on Replit — lessons learned, tools used, and what we'd do differently."
    },
    {
      title: "AI Agent Economy: What It Means for Freelancers",
      tags: ["AI Agents", "Freelancing", "Future"],
      excerpt: "The rise of AI agents is reshaping what freelancers can offer. Here's how to position yourself for the agent economy."
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      
      {/* Hero */}
      <section className="bg-[#0A0B0F] py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[400px] bg-[#2563EB] opacity-20 blur-[120px] rounded-[100%]"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-[-0.02em] mb-6"
          >
            Blog
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Insights on AI, automation, and business systems
          </motion.p>
        </div>
      </section>

      {/* Coming Soon Banner */}
      <section className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center font-medium">
          New articles coming soon. Stay tuned for insights from the SYSmoAI team.
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles.map((article, i) => (
              <motion.article 
                key={i} 
                variants={fadeUp}
                className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm flex flex-col h-full relative overflow-hidden group"
                data-testid={`card-blog-stub-${i}`}
              >
                <div className="absolute top-4 right-4 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Coming Soon
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6 mt-4">
                  {article.tags.map(tag => (
                    <span key={tag} className="text-xs font-semibold text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 group-hover:text-[#2563EB] transition-colors">
                  <a href="#" className="focus:outline-none">
                    {article.title}
                  </a>
                </h2>
                
                <p className="text-gray-600 leading-relaxed mb-8 flex-1">
                  {article.excerpt}
                </p>
                
                <div className="text-[#1A1A1A] font-semibold flex items-center gap-2 group-hover:gap-3 transition-all opacity-50 cursor-not-allowed">
                  Read Article <span aria-hidden="true">→</span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
