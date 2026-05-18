import React from 'react';
import { LayoutDashboard, PlusCircle, CheckCircle, BarChart3, MessageSquare, ShieldCheck, Mail } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { cn } from '@/src/lib/utils';

export default function PartnerPortal() {
  const [activeTab, setActiveTab ] = React.useState('onboarding');

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      <Helmet>
        <title>Operator Portal | Bivouac.ma Partners</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-16">
         <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar nav */}
            <aside className="lg:col-span-1">
               <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-2">
                  {[
                    { id: 'onboarding', label: 'Onboarding', icon: PlusCircle },
                    { id: 'dashboard', label: 'My Dashboard', icon: LayoutDashboard },
                    { id: 'bookings', label: 'Active Bookings', icon: BarChart3 },
                    { id: 'reviews', label: 'Reviews', icon: MessageSquare }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                        activeTab === tab.id ? "bg-[#BA7517] text-white" : "text-[#26215C] hover:bg-gray-50"
                      )}
                    >
                      <tab.icon size={18} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
               </div>

               <div className="mt-8 bg-[#26215C] p-8 rounded-3xl text-white">
                  <ShieldCheck size={32} className="text-[#BA7517] mb-4" />
                  <h4 className="font-bold text-sm mb-2">Elite Status Pursuit</h4>
                  <p className="text-[10px] text-white/60 leading-relaxed uppercase tracking-widest font-medium">Response Rate: 98%</p>
                  <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-[#BA7517] w-[90%]" />
                  </div>
                  <p className="mt-2 text-[10px] text-white/40 italic">You are 10 reviews away from Elite status.</p>
               </div>
            </aside>

            {/* Main content */}
            <div className="lg:col-span-3">
               {activeTab === 'onboarding' && (
                 <div className="bg-white p-12 rounded-[40px] shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-3xl font-bold tracking-tighter text-[#26215C] mb-8">List your camp on <span className="text-[#BA7517]">Bivouac.ma</span></h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                       <div className="space-y-6">
                          <div>
                             <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Camp Name</label>
                             <input className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none" placeholder="e.g. Desert Soul Luxury Camp" />
                          </div>
                          <div>
                             <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Destination</label>
                             <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none">
                                <option>Merzouga (Erg Chebbi)</option>
                                <option>Zagora (Erg Chigaga)</option>
                                <option>Agafay Desert</option>
                             </select>
                          </div>
                       </div>
                       <div className="space-y-6">
                          <div>
                             <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Public Price (per night)</label>
                             <div className="relative">
                                <span className="absolute left-4 top-3.5 text-sm font-bold text-gray-400">€</span>
                                <input className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none" placeholder="200" />
                             </div>
                          </div>
                          <div>
                             <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Operator WhatsApp</label>
                             <input className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none" placeholder="+212 ..." />
                          </div>
                       </div>
                    </div>

                    <div className="p-8 bg-[#FAF7F2] rounded-3xl border border-[#BA7517]/10 mb-12">
                       <h4 className="font-bold text-[#26215C] mb-4">Onboarding Flow</h4>
                       <div className="space-y-4">
                          {[
                            "Step 1: Upload basic info & camp registration docs",
                            "Step 2: Admin physical site visit (or video walkthrough)",
                            "Step 3: Account verification & Stripe Connect setup",
                            "Step 4: Live listing with 'Verified' badge"
                          ].map((step, i) => (
                            <div key={i} className="flex items-center space-x-3 text-sm">
                               <div className="w-5 h-5 bg-white border border-gray-200 rounded-full flex items-center justify-center text-[10px] font-bold">{i+1}</div>
                               <span className="text-[#26215C]/80">{step}</span>
                            </div>
                          ))}
                       </div>
                    </div>

                    <button className="bg-[#BA7517] text-white px-12 py-4 rounded-full font-bold hover:bg-[#EF9F27] transition-all shadow-xl shadow-[#BA7517]/20">
                       Submit for Verification
                    </button>
                 </div>
               )}

               {activeTab === 'dashboard' && (
                 <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       {[
                         { label: 'Total Earnings', value: '€12,450', icon: BarChart3 },
                         { label: 'Upcoming Bookings', value: '18', icon: CheckCircle },
                         { label: 'Unread Reviews', value: '3', icon: MessageSquare }
                       ].map(stat => (
                         <div key={stat.label} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <stat.icon size={24} className="text-[#BA7517] mb-4" />
                            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">{stat.label}</p>
                            <h4 className="text-2xl font-bold text-[#26215C]">{stat.value}</h4>
                         </div>
                       ))}
                    </div>

                    <div className="bg-white p-12 rounded-[40px] shadow-sm border border-gray-100">
                       <h3 className="text-2xl font-bold text-[#26215C] mb-8">Recent Activity</h3>
                       <div className="space-y-6">
                          {[
                            { msg: "New Booking for May 24th - Erg Chebbi Luxury", time: "2 hours ago" },
                            { msg: "Review Received: 'Amazing experience, loved the food!'", time: "5 hours ago" },
                            { msg: "Payout of €1,200 processed to Stripe", time: "1 day ago" }
                          ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
                               <p className="text-sm font-semibold text-[#26215C]">{item.msg}</p>
                               <span className="text-xs text-gray-400">{item.time}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}
