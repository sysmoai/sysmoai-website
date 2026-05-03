import React, { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2 } from 'lucide-react';
import { WA_URLS } from '../lib/whatsapp';
import { useTheme } from '@/contexts/ThemeContext';
import { useCreateAuditRequest } from '@workspace/api-client-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } }
};

const WhatsAppIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const auditSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  whatsapp: z.string().optional(),
  businessType: z.enum(['f_commerce', 'service', 'agency', 'other'], {
    required_error: 'Please select your business type',
  }),
  monthlyOrders: z.enum(['<50', '50-200', '200-1000', '1000+'], {
    required_error: 'Please select your monthly order volume',
  }),
  dailyDmVolume: z.enum(['<20', '20-100', '100-500', '500+'], {
    required_error: 'Please select your daily message volume',
  }),
  currentTools: z.string().min(1, 'Please describe your current tools'),
  usesBkashNagad: z.enum(['yes', 'no', 'mix'], {
    required_error: 'Please select your payment method',
  }),
  preferredCurrency: z.enum(['BDT', 'USD']),
  biggestChallenge: z.string().min(10, 'Please describe your biggest challenge — at least 10 characters'),
});

type AuditFormData = z.infer<typeof auditSchema>;

function RadioGroup({
  label,
  banglaLabel,
  name,
  options,
  register,
  error,
  isDark,
}: {
  label: string;
  banglaLabel?: string;
  name: keyof AuditFormData;
  options: { value: string; label: string }[];
  register: ReturnType<typeof useForm<AuditFormData>>['register'];
  error?: string;
  isDark: boolean;
}) {
  const labelColor = isDark ? '#CBD5E1' : '#374151';
  const banglaLabelColor = isDark ? '#64748B' : '#9CA3AF';
  const optionBg = isDark ? 'rgba(255,255,255,0.04)' : '#F8FAFF';
  const optionBorder = isDark ? 'rgba(255,255,255,0.1)' : '#E2E8F0';
  const optionText = isDark ? '#E2E8F0' : '#374151';

  return (
    <div>
      <label className="block text-sm font-semibold mb-1.5" style={{ color: labelColor }}>
        {label}
        {banglaLabel && (
          <span className="ml-2 text-xs font-normal" style={{ color: banglaLabelColor }}>
            {banglaLabel}
          </span>
        )}
        <span className="text-red-500 ml-1">*</span>
      </label>
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150"
            style={{ background: optionBg, border: `1px solid ${optionBorder}`, color: optionText }}
          >
            <input
              type="radio"
              value={opt.value}
              {...register(name)}
              className="accent-blue-600 flex-shrink-0"
            />
            <span className="text-sm">{opt.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default function FreeAudit() {
  const { isDark } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const createAudit = useCreateAuditRequest();

  React.useEffect(() => {
    document.title = 'Free AI Audit — 30-Minute Business Review | SYSmoAI';
  }, []);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AuditFormData>({
    resolver: zodResolver(auditSchema),
    defaultValues: {
      preferredCurrency: (() => {
        try { return localStorage.getItem('sysmoai-currency') === 'USD' ? 'USD' : 'BDT'; } catch { return 'BDT'; }
      })() as 'BDT' | 'USD',
    },
  });

  const onSubmit = async (data: AuditFormData) => {
    setSubmitError(null);
    try {
      await createAudit.mutateAsync({
        data: {
          name: data.name,
          email: data.email,
          whatsapp: data.whatsapp || null,
          biggestChallenge: data.biggestChallenge,
          businessType: data.businessType,
          monthlyOrders: data.monthlyOrders,
          dailyDmVolume: data.dailyDmVolume,
          currentTools: data.currentTools,
          usesBkashNagad: data.usesBkashNagad,
          preferredCurrency: data.preferredCurrency,
        },
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again or message us on WhatsApp.'
      );
    }
  };

  const inputBg = isDark ? 'rgba(255,255,255,0.05)' : '#FFFFFF';
  const inputBorder = isDark ? 'rgba(255,255,255,0.12)' : '#E2E8F0';
  const inputText = isDark ? '#F1F5F9' : '#0A0B0F';
  const labelColor = isDark ? '#CBD5E1' : '#374151';
  const bodyColor = isDark ? '#94A3B8' : '#475569';
  const sectionBg = isDark ? '#060810' : '#F8FAFF';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0';

  const steps = [
    {
      time: 'First 10 minutes',
      icon: '🔍',
      title: 'We understand your business',
      desc: 'Emon asks targeted questions about your current workflow — what tools you use, where your time goes, what\'s breaking most often. No generic questions. All specific to your situation.',
    },
    {
      time: 'Next 15 minutes',
      icon: '🗺️',
      title: 'We map your #1 automation opportunity',
      desc: 'Based on your answers, Emon identifies the single workflow that will save the most time and money when automated. He explains exactly what to build, which tools to use, and what the result will look like.',
    },
    {
      time: 'Final 5 minutes',
      icon: '📋',
      title: 'You leave with a clear action plan',
      desc: 'Emon gives you a written action plan: the exact problem, the exact solution, the tools needed, the timeline, and the cost. You can implement this yourself or hire SYSmoAI to build it for you.',
    },
  ];

  const forYouItems = [
    "You're spending too much time on manual, repetitive tasks",
    "Your team is overwhelmed and you don't know where AI fits",
    "You've tried AI tools before but they didn't stick",
    "You want to automate but don't know where to start",
    "You're a Bangladesh SME, agency, or F-Commerce seller",
    "You're an international client looking for world-class AI at better rates",
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: isDark ? '#0A0B0F' : '#FFFFFF' }}>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <span className="inline-block px-4 py-1.5 bg-blue-500/20 text-blue-300 text-sm font-semibold rounded-full border border-blue-500/30 mb-6">
              100% Free · No Commitment · No Sales Pitch
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
          >
            Book Your Free 30-Minute AI Audit
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}
            className="text-xl text-blue-100 mb-4 leading-relaxed"
          >
            Emon Hossain personally reviews your business workflow, identifies your biggest AI automation opportunity, and gives you a clear action plan — free.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
            className="text-blue-300 text-sm"
          >
            Available for businesses in Bangladesh and worldwide.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
            <a href="#audit-form" className="inline-flex items-center gap-2 mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg">
              Request My Free Audit →
            </a>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm">Usually responds within 2 hours</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16" style={{ background: isDark ? '#0A0B0F' : '#FFFFFF' }}>
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl font-bold text-center mb-12" style={{ color: isDark ? '#F1F5F9' : '#0A0B0F' }}
          >
            What Happens in Your Free AI Audit
          </motion.h2>
          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className="flex gap-5 p-6 rounded-2xl transition-all duration-200"
                style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
              >
                <div className="text-4xl flex-shrink-0">{step.icon}</div>
                <div>
                  <div className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-1">{step.time}</div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: isDark ? '#F1F5F9' : '#0A0B0F' }}>{step.title}</h3>
                  <p className="leading-relaxed" style={{ color: bodyColor }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16" style={{ background: sectionBg }}>
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-bold text-center mb-8" style={{ color: isDark ? '#F1F5F9' : '#0A0B0F' }}
          >
            The Audit Is For You If...
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {forYouItems.map((item, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF', border: `1px solid ${cardBorder}` }}
              >
                <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                <span className="text-sm leading-relaxed" style={{ color: bodyColor }}>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit Form */}
      <section id="audit-form" className="py-20" style={{ background: isDark ? '#0A0B0F' : '#FFFFFF' }}>
        <div className="max-w-2xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3" style={{ color: isDark ? '#F1F5F9' : '#0A0B0F' }}>
              Request Your Free Audit
            </h2>
            <p style={{ color: bodyColor }}>
              Fill in the form below and Emon will personally reach out to schedule your 30-minute call.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 px-6 rounded-2xl"
              style={{ background: isDark ? 'rgba(34,197,94,0.08)' : 'rgba(240,253,244,1)', border: `1px solid ${isDark ? 'rgba(34,197,94,0.2)' : '#BBF7D0'}` }}
            >
              <div className="text-6xl mb-5">✅</div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: isDark ? '#86EFAC' : '#14532D' }}>Audit Request Received!</h3>
              <p className="mb-2 max-w-md mx-auto" style={{ color: isDark ? '#86EFAC' : '#166534' }}>
                Emon will personally review your request and reach out within <strong>2 hours</strong> on working days to schedule your free 30-minute audit.
              </p>
              <p className="text-sm mb-6" style={{ color: isDark ? '#6EE7B7' : '#15803D' }}>For the fastest response, continue on WhatsApp:</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href={WA_URLS.audit} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-all">
                  <WhatsAppIcon /> Continue on WhatsApp
                </a>
                <Link href="/services"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-all">
                  Browse our services
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6 text-sm" style={{ color: isDark ? '#475569' : '#9CA3AF' }}>
                <span>✓ 100% free</span>
                <span>✓ No obligation</span>
                <span>✓ Bangladesh & worldwide</span>
              </div>
            </motion.div>
          ) : (
            <motion.form
              initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 p-6 md:p-8 rounded-2xl"
              style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
            >
              {/* Basic Info */}
              <div className="space-y-5">
                <h3 className="font-bold text-base" style={{ color: isDark ? '#F1F5F9' : '#0A0B0F' }}>Your details</h3>
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: labelColor }}>
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input {...register('name')}
                    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: inputText }}
                    placeholder="Your name" />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: labelColor }}>
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input {...register('email')} type="email"
                    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: inputText }}
                    placeholder="your@email.com" />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: labelColor }}>
                    WhatsApp Number <span className="text-xs font-normal" style={{ color: bodyColor }}>(optional, for faster reply)</span>
                  </label>
                  <input {...register('whatsapp')}
                    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: inputText }}
                    placeholder="+880 1711-638693" />
                </div>
              </div>

              <div className="border-t" style={{ borderColor: cardBorder }} />

              {/* Qualifying questions */}
              <div className="space-y-6">
                <h3 className="font-bold text-base" style={{ color: isDark ? '#F1F5F9' : '#0A0B0F' }}>
                  About your business
                  <span className="ml-2 text-xs font-normal text-blue-500">(helps us tailor the audit)</span>
                </h3>

                <RadioGroup
                  label="Business type"
                  banglaLabel="ব্যবসার ধরন"
                  name="businessType"
                  register={register}
                  error={errors.businessType?.message}
                  isDark={isDark}
                  options={[
                    { value: 'f_commerce', label: 'F-Commerce (Facebook selling)' },
                    { value: 'service', label: 'Service business' },
                    { value: 'agency', label: 'Agency' },
                    { value: 'other', label: 'Other' },
                  ]}
                />

                <RadioGroup
                  label="Monthly orders or leads"
                  banglaLabel="মাসিক অর্ডার সংখ্যা"
                  name="monthlyOrders"
                  register={register}
                  error={errors.monthlyOrders?.message}
                  isDark={isDark}
                  options={[
                    { value: '<50', label: 'Less than 50' },
                    { value: '50-200', label: '50 – 200' },
                    { value: '200-1000', label: '200 – 1,000' },
                    { value: '1000+', label: '1,000+' },
                  ]}
                />

                <RadioGroup
                  label="Daily DM / message volume"
                  banglaLabel="দৈনিক মেসেজ সংখ্যা"
                  name="dailyDmVolume"
                  register={register}
                  error={errors.dailyDmVolume?.message}
                  isDark={isDark}
                  options={[
                    { value: '<20', label: 'Less than 20' },
                    { value: '20-100', label: '20 – 100' },
                    { value: '100-500', label: '100 – 500' },
                    { value: '500+', label: '500+' },
                  ]}
                />

                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: labelColor }}>
                    Current tools you use
                    <span className="ml-2 text-xs font-normal" style={{ color: bodyColor }}>
                      (বর্তমান টুলস)
                    </span>
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input {...register('currentTools')}
                    className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: inputText }}
                    placeholder="e.g. Manychat, Excel, manual, none..." />
                  {errors.currentTools && <p className="text-red-500 text-sm mt-1">{errors.currentTools.message}</p>}
                </div>

                <RadioGroup
                  label="Do you use bKash / Nagad for payments?"
                  banglaLabel="বিকাশ / নগদ ব্যবহার করেন?"
                  name="usesBkashNagad"
                  register={register}
                  error={errors.usesBkashNagad?.message}
                  isDark={isDark}
                  options={[
                    { value: 'yes', label: 'Yes, primarily' },
                    { value: 'mix', label: 'Mix of methods' },
                    { value: 'no', label: 'No' },
                  ]}
                />

                <RadioGroup
                  label="Preferred pricing currency"
                  banglaLabel="মূল্য মুদ্রা"
                  name="preferredCurrency"
                  register={register}
                  error={errors.preferredCurrency?.message}
                  isDark={isDark}
                  options={[
                    { value: 'BDT', label: 'BDT (Bangladeshi Taka ৳)' },
                    { value: 'USD', label: 'USD ($)' },
                  ]}
                />
              </div>

              <div className="border-t" style={{ borderColor: cardBorder }} />

              {/* Biggest challenge */}
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: labelColor }}>
                  Your biggest pain right now <span className="text-red-500">*</span>
                </label>
                <textarea {...register('biggestChallenge')} rows={4}
                  className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
                  style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: inputText }}
                  placeholder="e.g. I spend 6 hours a day replying to DMs and still miss orders. I have no system for follow-ups..." />
                {errors.biggestChallenge && <p className="text-red-500 text-sm mt-1">{errors.biggestChallenge.message}</p>}
              </div>

              <p className="text-xs" style={{ color: bodyColor }}>
                By submitting, you agree to our{' '}
                <a href="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</a>.
                We'll only use your details to respond to your audit request.
              </p>

              {submitError && (
                <p className="text-red-500 text-sm">{submitError}</p>
              )}

              <button type="submit" disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-4 rounded-xl font-bold text-lg transition-all min-h-[52px]">
                {isSubmitting ? 'Submitting...' : 'Request My Free Audit →'}
              </button>

              <div className="text-center">
                <p className="text-sm mb-3" style={{ color: bodyColor }}>Or book instantly via WhatsApp:</p>
                <a href={WA_URLS.audit} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                  <WhatsAppIcon />
                  WhatsApp Emon directly <span className="text-green-200 text-xs font-normal">(Fastest)</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm" style={{ color: bodyColor }}>
                <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-green-500" /> 100% free</span>
                <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-green-500" /> No obligation</span>
                <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-green-500" /> Bangladesh & worldwide</span>
              </div>
            </motion.form>
          )}
        </div>
      </section>

    </div>
  );
}
