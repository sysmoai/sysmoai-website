import React, { useState } from 'react';
import { MessageCircle, Mail, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { WA_URLS } from '../lib/whatsapp';
import { EMAIL } from '@/lib/config';
import { useTheme } from '@/contexts/ThemeContext';
import { useCreateContactSubmission } from '@workspace/api-client-react';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  contact: z.string().min(5, 'Please enter your email or WhatsApp number'),
  message: z.string().min(10, 'Please describe the workflow or problem in at least 10 characters'),
  service: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { isDark } = useTheme();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const createSubmission = useCreateContactSubmission();

  const bg1 = isDark ? '#0A0B0F' : '#FFFFFF';
  const bg2 = isDark ? '#0D0F14' : '#F8FAFC';
  const heading = isDark ? '#F8FAFC' : '#0F172A';
  const body = isDark ? '#94A3B8' : '#475569';
  const border = isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0';
  const inputBg = isDark ? 'rgba(255,255,255,0.05)' : '#FFFFFF';

  React.useEffect(() => {
    document.title = 'Contact SYSmoAI | Discuss an AI Systems or Automation Project';
  }, []);

  const onSubmit = async (data: FormData) => {
    const hp = document.querySelector<HTMLInputElement>('form input[name="website"]');
    if (hp?.value) return;
    setSubmitError(null);
    try {
      await createSubmission.mutateAsync({
        data: {
          name: data.name,
          contact: data.contact,
          message: data.message,
          service: data.service && data.service.length > 0 ? data.service : null,
        },
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again or use email/WhatsApp.');
    }
  };

  return (
    <div style={{ background: bg1 }}>
      <section className="py-24 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold tracking-[0.18em] uppercase text-blue-500 mb-5">Contact SYSmoAI</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight" style={{ color: heading }}>Start with the workflow.</h1>
          <p className="text-lg leading-relaxed max-w-3xl mt-6" style={{ color: body }}>
            Tell us what happens today, which tools are involved, where the bottleneck is, and what outcome you want. We will use that context to decide whether a scoped AI or automation engagement is appropriate.
          </p>
        </div>
      </section>

      <section className="py-20" style={{ background: bg2 }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-5" style={{ color: heading }}>Direct contact</h2>
            <div className="space-y-4">
              <a href={WA_URLS.general} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl hover:border-blue-500" style={{ color: body, border: `1px solid ${border}` }}>
                <MessageCircle size={20} className="text-green-500" /> WhatsApp
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 p-4 rounded-xl hover:border-blue-500" style={{ color: body, border: `1px solid ${border}` }}>
                <Mail size={20} className="text-blue-500" /> {EMAIL}
              </a>
              <div className="flex items-center gap-3 p-4 rounded-xl" style={{ color: body, border: `1px solid ${border}` }}>
                <MapPin size={20} className="text-blue-500" /> Dhaka, Bangladesh
              </div>
            </div>
            <div className="mt-7 rounded-2xl p-6" style={{ background: bg1, border: `1px solid ${border}` }}>
              <h3 className="font-bold mb-3" style={{ color: heading }}>Useful context to include</h3>
              <ul className="space-y-2 text-sm" style={{ color: body }}>
                <li>• Current workflow and tools</li>
                <li>• The recurring bottleneck or manual work</li>
                <li>• Desired outcome</li>
                <li>• Any access, security, compliance, or timeline constraints</li>
              </ul>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="rounded-2xl p-8" style={{ background: bg1, border: `1px solid ${border}` }}>
                <h2 className="text-2xl font-bold mb-3" style={{ color: heading }}>Message received.</h2>
                <p style={{ color: body }}>Thank you. The inquiry has been recorded for review. Any next step, scope, timeline, or commercial term will be confirmed separately.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-2xl p-7" style={{ background: bg1, border: `1px solid ${border}` }}>
                <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}>
                  <label>Website (leave blank)<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: heading }}>Name *</label>
                  <input {...register('name')} className="w-full px-4 py-3 rounded-xl outline-none" style={{ background: inputBg, color: heading, border: `1px solid ${border}` }} />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: heading }}>Email or WhatsApp *</label>
                  <input {...register('contact')} className="w-full px-4 py-3 rounded-xl outline-none" style={{ background: inputBg, color: heading, border: `1px solid ${border}` }} />
                  {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: heading }}>Workflow / problem *</label>
                  <textarea {...register('message')} rows={6} className="w-full px-4 py-3 rounded-xl outline-none resize-none" style={{ background: inputBg, color: heading, border: `1px solid ${border}` }} />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold px-5 py-3.5 rounded-xl transition-colors">
                  {isSubmitting ? 'Sending…' : 'Send inquiry'}
                </button>
                {submitError && <p className="text-red-500 text-sm">{submitError}</p>}
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
