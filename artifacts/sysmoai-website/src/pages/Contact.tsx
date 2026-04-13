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

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  async function onSubmit(data: FormValues) {
    // Submit to Formspree placeholder
    try {
      await fetch('https://formspree.io/f/placeholder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-[#0A0B0F] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-[-0.02em] mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-300"
          >
            Under 5 minutes response on WhatsApp
          </motion.p>
        </div>
      </section>

      {/* Contact Options & Form */}
      <section className="py-20 flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Left Column - Direct Contact */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Direct Contact</h2>
                <a 
                  href="https://wa.me/8801711638693" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-[#25D366] hover:bg-[#20b858] text-white p-6 rounded-2xl shadow-lg transition-transform hover:scale-[1.02] w-full"
                  data-testid="link-contact-whatsapp"
                >
                  <MessageCircle size={32} />
                  <div>
                    <div className="font-semibold text-lg">WhatsApp Us</div>
                    <div className="text-white/90">+880 1711-638693</div>
                  </div>
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                  <Mail className="text-[#2563EB]" size={24} />
                  <div>
                    <div className="font-semibold text-[#1A1A1A] mb-1">Email</div>
                    <a href="mailto:support@sysmoai.com" className="text-gray-600 hover:text-[#2563EB] transition-colors">
                      support@sysmoai.com
                    </a>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                  <MapPin className="text-[#2563EB]" size={24} />
                  <div>
                    <div className="font-semibold text-[#1A1A1A] mb-1">Location</div>
                    <div className="text-gray-600">
                      Dhaka, Bangladesh
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center gap-3 text-[#1E3A8A]">
                <Clock className="text-[#2563EB]" size={20} />
                <span className="font-medium">Under 5 minutes on WhatsApp</span>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Send a Message</h2>
              
              {isSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Message Sent!</h3>
                  <p>Thank you for reaching out. We will get back to you shortly.</p>
                  <Button 
                    variant="outline" 
                    className="mt-6"
                    onClick={() => setIsSuccess(false)}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#1A1A1A] font-semibold">Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} className="bg-gray-50 border-gray-200 focus:border-[#2563EB]" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#1A1A1A] font-semibold">Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@company.com" {...field} className="bg-gray-50 border-gray-200 focus:border-[#2563EB]" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#1A1A1A] font-semibold">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How can we help you?" 
                              className="min-h-[150px] bg-gray-50 border-gray-200 focus:border-[#2563EB]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold py-6 text-lg rounded-xl"
                      disabled={form.formState.isSubmitting}
                      data-testid="button-submit-contact"
                    >
                      {form.formState.isSubmitting ? "Sending..." : "Send Message"}
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

function CheckCircle2(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
