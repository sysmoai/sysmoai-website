import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Clock } from 'lucide-react';

const WA_LINK = "https://wa.me/8801711638693?text=Hi%20SYSmoAI%2C%20I%27m%20interested%20in%20your%20AI%20services.";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const articles = [
  {
    title: "Why Every Bangladesh Business Needs AI in 2026",
    tags: ["AI", "Bangladesh", "Strategy"],
    excerpt: "The AI revolution isn't just for Silicon Valley. Here's why Bangladesh businesses that adopt AI in 2026 will outcompete those that don't.",
    readTime: "5 min read",
    date: "Coming Soon — April 2026",
    gradient: "from-[#1E3A8A] to-[#2563EB]",
  },
  {
    title: "How We Built 7 Websites on Replit",
    tags: ["Replit", "Web Development", "Systems"],
    excerpt: "From zero to seven production websites on Replit — lessons learned, tools used, and what we'd do differently.",
    readTime: "7 min read",
    date: "Coming Soon — April 2026",
    gradient: "from-[#5B21B6] to-[#7C3AED]",
  },
  {
    title: "AI Agent Economy: What It Means for Freelancers",
    tags: ["AI Agents", "Freelancing", "Future"],
    excerpt: "The rise of AI agents is reshaping what freelancers can offer. Here's how to position yourself for the agent economy.",
    readTime: "6 min read",
    date: "Coming Soon — April 2026",
    gradient: "from-[#065F46] to-[#059669]",
  },
];

export default function Blog() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-[#0A0B0F] py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[400px] bg-[#2563EB] opacity-[0.12] blur-[120px] rounded-[100%]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-[-0.02em] mb-6"
          >
            Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Insights on AI, automation, and business systems
          </motion.p>
        </div>
      </section>

      {/* Coming Soon Banner */}
      <section className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center font-medium text-white/90">
          New articles coming soon. Stay tuned for insights from the SYSmoAI team.
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" animate="show" variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles.map((article, i) => (
              <motion.article
                key={i} variants={fadeUp}
                className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                data-testid={`card-blog-stub-${i}`}
              >
                {/* Gradient Image Header */}
                <div className={`h-44 bg-gradient-to-br ${article.gradient} relative flex items-end p-5`}>
                  <span className="bg-black/30 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-sm">
                    Coming Soon
                  </span>
                </div>

                {/* Content */}
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {article.readTime}
                    </span>
                    <span>·</span>
                    <span>{article.date}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map(tag => (
                      <span key={tag} className="text-xs font-semibold text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-xl font-bold text-[#1A1A1A] mb-3 leading-snug">
                    <a href="#" className="hover:text-[#2563EB] transition-colors">
                      {article.title}
                    </a>
                  </h2>

                  <p className="text-gray-600 leading-relaxed mb-6 flex-1 text-sm">
                    {article.excerpt}
                  </p>

                  <div className="text-gray-400 text-sm font-semibold flex items-center gap-2 cursor-not-allowed">
                    Read Article <span>→</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="py-20 bg-[#0A0B0F]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-bold text-white mb-4">Get Notified When We Publish</h2>
            <p className="text-gray-400 text-lg mb-10">
              Get new articles delivered directly to your WhatsApp — no email newsletter, no spam.
            </p>
            <a
              href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-[1.03]"
              data-testid="link-blog-subscribe-whatsapp"
            >
              <MessageCircle size={22} />
              Get Notified via WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
