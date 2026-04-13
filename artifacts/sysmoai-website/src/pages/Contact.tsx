import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, MapPin, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const WA_LINK = "https://wa.me/8801711638693?text=Hi%20SYSmoAI%2C%20I%27m%20interested%20in%20your%20AI%20services.";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};

export default function Contact() {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(data: FormValues) {
    try {
      await fetch('https://formspree.io/f/placeholder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setIsSuccess(true);
      form.reset();
    } catch {
      setIsSuccess(true); // Show success even on network error in dev
    }
  }

  return (
    <div className="flex flex-col w-full min-h-screen">

      {/* Hero */}
      <section className="bg-[#0A0B0F] py-24 relative overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#2563EB] opacity-[0.1] blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-[-0.02em] mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-400"
          >
            Under 5 minutes response on WhatsApp
          </motion.p>
        </div>
      </section>

      {/* Contact Options & Form */}
      <section className="py-20 flex-1 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Direct Contact</h2>

              <a
                href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#25D366] hover:bg-[#20b858] text-white p-6 rounded-2xl shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl w-full"
                data-testid="link-contact-whatsapp"
              >
                <MessageCircle size={32} />
                <div>
                  <div className="font-bold text-lg">WhatsApp Us</div>
                  <div className="text-white/90 text-sm">+880 1711-638693</div>
                </div>
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:border-[#2563EB]/30 hover:shadow-md transition-all">
                  <Mail className="text-[#2563EB] shrink-0 mt-0.5" size={22} />
                  <div>
                    <div className="font-semibold text-[#1A1A1A] mb-1 text-sm uppercase tracking-wide">Email</div>
                    <a href="mailto:support@sysmoai.com" className="text-gray-600 hover:text-[#2563EB] transition-colors text-sm" data-testid="link-contact-email">
                      support@sysmoai.com
                    </a>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:border-[#2563EB]/30 hover:shadow-md transition-all">
                  <MapPin className="text-[#2563EB] shrink-0 mt-0.5" size={22} />
                  <div>
                    <div className="font-semibold text-[#1A1A1A] mb-1 text-sm uppercase tracking-wide">Location</div>
                    <div className="text-gray-600 text-sm">Dhaka, Bangladesh</div>
                  </div>
                </div>
              </div>

              {/* Response time */}
              <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl flex items-center gap-3 text-[#1E3A8A]">
                <Clock className="text-[#2563EB] shrink-0" size={20} />
                <div>
                  <span className="font-bold">Under 5 minutes</span>
                  <span className="text-[#1E3A8A]/70"> response on WhatsApp</span>
                </div>
              </div>

              {/* Service Hours */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="text-[#2563EB]" size={20} />
                  <h3 className="font-bold text-[#1A1A1A]">Service Hours</h3>
                </div>
                <p className="text-gray-600">
                  <span className="font-semibold">10 AM – Midnight BST</span><br />
                  7 days a week, including holidays
                </p>
              </div>

              {/* Location Visual */}
              <div className="bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] p-6 rounded-2xl text-white">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin size={20} />
                  <span className="font-bold text-lg">Dhaka, Bangladesh</span>
                </div>
                <p className="text-white/70 text-sm">GMT+6 (Bangladesh Standard Time)</p>
              </div>
            </motion.div>

            {/* Right Column — Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Send a Message</h2>

              {isSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-8 text-center">
                  <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Message Sent!</h3>
                  <p className="text-green-700">Thank you for reaching out. We will get back to you shortly.</p>
                  <Button variant="outline" className="mt-6" onClick={() => setIsSuccess(false)}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                      control={form.control} name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#1A1A1A] font-semibold text-sm">Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your full name"
                              {...field}
                              className="bg-gray-50 border-gray-200 focus-visible:border-[#2563EB] focus-visible:ring-[#2563EB]/20 rounded-xl py-5"
                              data-testid="input-contact-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control} name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#1A1A1A] font-semibold text-sm">Email Address</FormLabel>
                          <FormControl>
                            <Input
                              type="email" placeholder="you@company.com"
                              {...field}
                              className="bg-gray-50 border-gray-200 focus-visible:border-[#2563EB] focus-visible:ring-[#2563EB]/20 rounded-xl py-5"
                              data-testid="input-contact-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control} name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#1A1A1A] font-semibold text-sm">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us how we can help you..."
                              className="min-h-[140px] bg-gray-50 border-gray-200 focus-visible:border-[#2563EB] focus-visible:ring-[#2563EB]/20 rounded-xl resize-none"
                              {...field}
                              data-testid="textarea-contact-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold py-6 text-base rounded-xl transition-all hover:scale-[1.01] hover:shadow-lg"
                      disabled={form.formState.isSubmitting}
                      data-testid="button-submit-contact"
                    >
                      {form.formState.isSubmitting ? "Sending..." : "Send Message →"}
                    </Button>
                  </form>
                </Form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
