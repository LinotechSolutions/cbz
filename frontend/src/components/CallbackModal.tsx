import React, { useState, useEffect } from 'react';
import { X, PhoneCall, CheckCircle2, Clock, Mail, User, Building2, Send, AlertCircle } from 'lucide-react';
import { cbzApi } from '../services/api';
import { analytics } from '../lib/analytics';
import { Logo } from './Logo';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialNote?: string;
}

export const CallbackModal: React.FC<CallbackModalProps> = ({
  isOpen,
  onClose,
  initialService = 'CBZ Bank',
  initialNote = '',
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(initialService);
  const [enquiryType, setEnquiryType] = useState('Request a Callback');
  const [preferredTime, setPreferredTime] = useState('Morning (08:00 – 12:00)');
  const [message, setMessage] = useState(initialNote);
  const [submitting, setSubmitting] = useState(false);
  const [referenceCode, setReferenceCode] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (initialService) setService(initialService);
    if (initialNote) setMessage(initialNote);
  }, [initialService, initialNote]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setErrorMessage('Please fill in your name, phone number, and email.');
      analytics.trackApplicationError('enquiry-callback', 0, 'Missing contact fields');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    const [firstName, ...rest] = fullName.trim().split(' ');
    const surname = rest.join(' ') || 'Customer';

    try {
      analytics.trackConversionCta('callback', `${enquiryType} - ${service}`, 'api/accounts/onboard');
      const res = await cbzApi.accounts.onboard({
        service: 'enquiry-callback',
        profile: {
          firstName,
          surname,
          nationalId: '63-0000000-X-00', // standard callback placeholder format
          dateOfBirth: '1990-01-01',
          phone: phone.trim(),
          email: email.trim(),
          address: 'Zimbabwe / Web Inquiry',
        },
        answers: {
          enquiryType,
          selectedService: service,
          preferredTime,
          message: message.trim(),
        },
      });

      const ref = res?.reference_code || `ENQ-${Date.now().toString().slice(-6)}`;
      setReferenceCode(ref);
      analytics.trackApplicationConfirmedCompletion('enquiry-callback', ref);
    } catch (err: any) {
      const msg = err?.message || 'We could not submit your request. Please try again.';
      setErrorMessage(msg);
      analytics.trackApplicationError('enquiry-callback', 0, msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setReferenceCode(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setErrorMessage('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#002554]/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="callback-title"
        className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto my-auto"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {referenceCode ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 id="callback-title" className="text-xl font-black text-[#002554]">
              Request Received Successfully
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong>{fullName}</strong>. A dedicated relationship manager from{' '}
              <strong>{service}</strong> will contact you via <strong>{phone}</strong> during your preferred timeframe.
            </p>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl max-w-xs mx-auto">
              <span className="text-2xs font-extrabold uppercase tracking-wider text-slate-400 block mb-0.5">
                Your Tracking Reference
              </span>
              <span className="text-lg font-black text-[#002554] tracking-wider font-mono">
                {referenceCode}
              </span>
            </div>

            <button
              onClick={handleReset}
              className="mt-4 px-6 py-3 bg-[#002554] hover:bg-[#0A3E80] text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <Logo brand="holdings" height={36} />
              <h2 id="callback-title" className="text-xl font-bold text-[#002554] mt-3">
                Request a Callback or Product Enquiry
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Tell us what you need and our team will get back to you with guidance and quotation details.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Tendai Moyo"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#002554] focus:ring-1 focus:ring-[#002554]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile / WhatsApp *
                  </label>
                  <div className="relative">
                    <PhoneCall className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+263 77..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#002554] focus:ring-1 focus:ring-[#002554]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#002554] focus:ring-1 focus:ring-[#002554]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Business Unit / Subsidiary
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#002554]"
                  >
                    <option value="CBZ Bank">CBZ Bank</option>
                    <option value="CBZ Insurance">CBZ Insurance</option>
                    <option value="Datvest Investments">Datvest Asset Management</option>
                    <option value="CBZ Properties">CBZ Properties</option>
                    <option value="CBZ Agro-Yield">CBZ Agro-Yield</option>
                    <option value="Red Sphere Finance">Red Sphere Finance</option>
                    <option value="CBZ Life">CBZ Life Assurance</option>
                    <option value="CBZ Diaspora Desk">CBZ Diaspora Desk</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Enquiry Type
                  </label>
                  <select
                    value={enquiryType}
                    onChange={(e) => setEnquiryType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#002554]"
                  >
                    <option value="Request a Callback">Request a Callback</option>
                    <option value="Speak to a Relationship Manager">Speak to Relationship Manager</option>
                    <option value="Get a Quotation">Get a Quotation</option>
                    <option value="General Product Enquiry">General Product Enquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Call Time
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#002554]"
                  >
                    <option value="Morning (08:00 – 12:00)">Morning (08:00 – 12:00)</option>
                    <option value="Afternoon (12:00 – 16:00)">Afternoon (12:00 – 16:00)</option>
                    <option value="Anytime during business hours">Anytime during business hours</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  How can we help? (Optional note)
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you are looking for..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#002554]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-[#E4002B] hover:bg-[#C50025] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
