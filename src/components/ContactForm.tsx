'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setShowSuccess(true);
        e.currentTarget.reset();
      } else {
        alert('送信に失敗しました。もう一度お試しください。');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('送信に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setShowSuccess(false);
  };

  return (
    <div className="bg-glass-100 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-xs font-bold uppercase tracking-wider text-gray-500">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:bg-white/10 transition-all duration-300 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] focus:border-blue-300"
              placeholder="Taro"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:bg-white/10 transition-all duration-300 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] focus:border-blue-300"
              placeholder="Yamada"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:bg-white/10 transition-all duration-300 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] focus:border-blue-300"
            placeholder="name@example.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:bg-white/10 transition-all duration-300 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] focus:border-blue-300 appearance-none"
          >
            <option value="product" className="bg-[#1a1a1a]">
              商品について (Product Inquiry)
            </option>
            <option value="shipping" className="bg-[#1a1a1a]">
              配送・返品について (Shipping & Returns)
            </option>
            <option value="repair" className="bg-[#1a1a1a]">
              修理・メンテナンス (Repair Service)
            </option>
            <option value="other" className="bg-[#1a1a1a]">
              その他 (Other)
            </option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:bg-white/10 transition-all duration-300 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] focus:border-blue-300 resize-none"
            placeholder="How can we help you?"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-white text-black font-bold tracking-widest rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-[1.02] mt-4 flex justify-center items-center group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
          {!isSubmitting && (
            <svg
              className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          )}
        </button>
      </form>

      <div
        className={`absolute inset-0 bg-[#0f0f11]/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 z-20 transition-all duration-500 ${
          showSuccess ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-3'
        }`}
      >
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-2xl font-serif mb-2">Thank you.</h3>
        <p className="text-gray-400 text-sm mb-6">
          メッセージを受け付けました。<br />
          確認後、担当者よりご連絡いたします。
        </p>
        <button
          onClick={resetForm}
          className="text-xs font-bold uppercase tracking-widest text-white border-b border-white/30 pb-1 hover:border-white transition-colors"
        >
          Send another message
        </button>
      </div>
    </div>
  );
}
