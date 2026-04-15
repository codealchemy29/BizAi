import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">

        {/* HERO */}
        <section className="py-20 bg-gray-50 dark:bg-[#0A0A23] text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Get in Touch
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
              We’re here to help you grow with AI 🚀
            </p>
          </div>
        </section>

        {/* WHO WE ARE */}
       <section className="py-24 bg-white dark:bg-[#0A0A23]">
  <div className="max-w-6xl mx-auto px-6">

    {/* heading */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        Our Journey
      </h2>
    </div>

    <div className="relative">

      {/* connecting line */}
      <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-gray-200 dark:bg-white/10 -translate-y-1/2"></div>

      <div className="grid md:grid-cols-3 gap-8 relative">

        {/* WHO WE ARE */}
        <div className="group p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:shadow-xl transition">
          
          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4 relative z-10">
            1
          </div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Who We Are
          </h3>

          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            BizAISkill is a global AI learning platform focused on practical,
            real-world skills that actually translate into income and career growth.
          </p>
        </div>

        {/* MISSION */}
        <div className="group p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:shadow-xl transition">
          
          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4 relative z-10">
            2
          </div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Our Mission
          </h3>

          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            To make AI skills accessible, practical, and profitable for anyone, anywhere.
          </p>
        </div>

        {/* VISION */}
        <div className="group p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:shadow-xl transition">
          
          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4 relative z-10">
            3
          </div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Vision
          </h3>

          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            To build a global community of AI-powered professionals.
          </p>
        </div>

      </div>

    </div>

  </div>
</section>

       <section className="py-24 bg-gray-50 dark:bg-[#0A0A23]">
  <div className="max-w-5xl mx-auto px-6">

    {/* heading */}
    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        Contact & Support
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mt-3">
        Choose the best way to get help or connect with us.
      </p>
    </div>

    {/* options */}
    <div className="space-y-4">

      {/* EMAIL */}
      <div className="group flex items-center justify-between p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:shadow-lg hover:-translate-y-1 transition">
        
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-lg">
            📩
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Support Email
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              support@bizaiskill.com
            </p>
          </div>
        </div>

        <button className="text-blue-600 dark:text-blue-400 text-sm font-medium">
          Email →
        </button>
      </div>

      {/* COMMUNITY */}
      <div className="group flex items-center justify-between p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:shadow-lg hover:-translate-y-1 transition">
        
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-500/20 flex items-center justify-center text-lg">
            💬
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Community
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Telegram / Discord — highly recommended
            </p>
          </div>
        </div>

        <button className="text-green-600 dark:text-green-400 text-sm font-medium">
          Join →
        </button>
      </div>

      {/* FAQ */}
      <div className="group flex items-center justify-between p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:shadow-lg hover:-translate-y-1 transition">
        
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-lg">
            ❓
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              FAQs
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Find quick answers to common questions
            </p>
          </div>
        </div>

        <button className="text-purple-600 dark:text-purple-400 text-sm font-medium">
          View →
        </button>
      </div>

    </div>

  </div>
</section>
          

      </main>

      <Footer />
    </div>
  );
}