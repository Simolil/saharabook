import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight, ArrowLeft, CreditCard, ShieldCheck, QrCode, Download, Phone } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { formatCurrency, cn } from '@/src/lib/utils';
import { mockCamps } from '@/src/lib/mockData';

export default function BookingFlow() {
  const { campSlug } = useParams<{ campSlug: string }>();
  const camp = mockCamps.find(c => c.slug === campSlug) || mockCamps[0];
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    tentType: 'Royal Suite',
    guests: 2,
    fullName: '',
    email: '',
    whatsapp: ''
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const steps = [
    { number: 1, name: 'Selection' },
    { number: 2, name: 'Details' },
    { number: 3, name: 'Payment' },
    { number: 4, name: 'Confirm' }
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Tracker */}
        <div className="flex justify-between items-center mb-16 px-4">
           {steps.map((s, i) => (
             <div key={s.number} className="flex flex-col items-center flex-1 relative">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all z-10",
                  step >= s.number ? "bg-[#BA7517] text-white" : "bg-white border-2 border-gray-100 text-gray-300",
                  step === s.number ? "ring-4 ring-[#BA7517]/20" : ""
                )}>
                  {step > s.number ? <Check size={18} /> : s.number}
                </div>
                <span className={cn(
                  "mt-3 text-[10px] uppercase tracking-widest font-bold",
                  step >= s.number ? "text-[#26215C]" : "text-gray-300"
                )}>
                  {s.name}
                </span>
                {i < steps.length - 1 && (
                  <div className={cn(
                    "absolute top-5 left-1/2 w-full h-[2px] -z-0",
                    step > s.number ? "bg-[#BA7517]" : "bg-gray-100"
                  )} />
                )}
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           <div className="md:col-span-2">
              <AnimatePresence mode="wait">
                 {step === 1 && (
                   <motion.div 
                     key="step1"
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100"
                   >
                      <h2 className="text-3xl font-bold tracking-tighter text-[#26215C] mb-8">Refine your selection</h2>
                      <div className="space-y-6">
                         <div>
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Choose your shelter</label>
                            <div className="grid grid-cols-1 gap-4">
                               {['Royal Suite', 'Honeymoon Tent', 'Shared Dorm'].map(t => (
                                 <button 
                                   key={t}
                                   onClick={() => setFormData({...formData, tentType: t})}
                                   className={cn(
                                     "p-6 rounded-3xl border-2 text-left transition-all",
                                     formData.tentType === t ? "border-[#BA7517] bg-[#BA7517]/5" : "border-gray-50 hover:border-gray-200"
                                   )}
                                 >
                                    <h4 className="font-bold text-[#26215C]">{t}</h4>
                                    <p className="text-xs text-gray-500 mt-1">King bed, private ensuite bathroom, dune view.</p>
                                 </button>
                               ))}
                            </div>
                         </div>
                      </div>
                      <button onClick={nextStep} className="mt-12 w-full bg-[#BA7517] text-white py-4 rounded-full font-bold flex items-center justify-center space-x-2">
                         <span>Next: Guest Details</span>
                         <ArrowRight size={18} />
                      </button>
                   </motion.div>
                 )}

                 {step === 2 && (
                   <motion.div 
                     key="step2"
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100"
                   >
                      <h2 className="text-3xl font-bold tracking-tighter text-[#26215C] mb-8">Who is traveling?</h2>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div>
                              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Full Name</label>
                              <input 
                                type="text" 
                                value={formData.fullName}
                                onChange={e => setFormData({...formData, fullName: e.target.value})}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BA7517]/20" 
                                placeholder="John Doe"
                              />
                           </div>
                           <div>
                              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Email</label>
                              <input 
                                type="email" 
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BA7517]/20" 
                                placeholder="john@example.com"
                              />
                           </div>
                        </div>
                        <div>
                           <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">WhatsApp Number (For Operator Contact)</label>
                           <input 
                             type="tel" 
                             value={formData.whatsapp}
                             onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                             className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BA7517]/20" 
                             placeholder="+212 6..."
                           />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-12">
                         <button onClick={prevStep} className="bg-gray-100 text-[#26215C] py-4 rounded-full font-bold flex items-center justify-center space-x-2">
                           <ArrowLeft size={18} />
                           <span>Back</span>
                         </button>
                         <button onClick={nextStep} className="bg-[#BA7517] text-white py-4 rounded-full font-bold flex items-center justify-center space-x-2">
                           <span>Next: Payment</span>
                           <ArrowRight size={18} />
                         </button>
                      </div>
                   </motion.div>
                 )}

                 {step === 3 && (
                   <motion.div 
                     key="step3"
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100"
                   >
                      <h2 className="text-3xl font-bold tracking-tighter text-[#26215C] mb-8">Secure Payment</h2>
                      <div className="bg-[#26215C] p-8 rounded-3xl text-white mb-8">
                         <div className="flex justify-between items-start mb-12">
                            <h3 className="text-xl font-bold tracking-tight">SaharaBook<span className="text-[#BA7517]">Pay</span></h3>
                            <CreditCard size={24} className="opacity-50" />
                         </div>
                         <div className="space-y-4">
                            <div className="h-12 w-full bg-white/10 rounded-xl animate-pulse" />
                            <div className="grid grid-cols-2 gap-4">
                               <div className="h-12 bg-white/10 rounded-xl animate-pulse" />
                               <div className="h-12 bg-white/10 rounded-xl animate-pulse" />
                            </div>
                         </div>
                      </div>
                      <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-2xl border border-green-100 mb-8">
                         <ShieldCheck className="text-green-600" size={20} />
                         <span className="text-xs text-green-800 font-medium">Your payment is held in escrow until check-in.</span>
                      </div>
                      <button onClick={nextStep} className="w-full bg-[#BA7517] text-white py-4 rounded-full font-bold flex items-center justify-center space-x-2">
                         <span>Pay €440 & Confirm</span>
                      </button>
                   </motion.div>
                 )}

                 {step === 4 && (
                   <motion.div 
                     key="step4"
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-green-100 text-center"
                   >
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-white shadow-xl">
                         <Check className="text-green-600" size={40} />
                      </div>
                      <h2 className="text-3xl font-bold tracking-tighter text-[#26215C] mb-4">You're going to the Sahara!</h2>
                      <p className="text-gray-500 mb-12">Booking ID: <span className="text-[#BA7517] font-bold">SB-88219-X</span></p>
                      
                      {/* Offline Voucher */}
                      <div className="bg-[#FAF7F2] p-8 rounded-3xl border-2 border-dashed border-[#BA7517]/20 relative">
                         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-[10px] font-bold uppercase tracking-widest text-[#BA7517]">Official Voucher</div>
                         
                         <div className="flex justify-between mb-8 text-left">
                            <div>
                               <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Guest</p>
                               <p className="font-bold text-[#26215C]">{formData.fullName || "Samy Rz"}</p>
                            </div>
                            <div className="text-right">
                               <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Date</p>
                               <p className="font-bold text-[#26215C]">May 14, 2026</p>
                            </div>
                         </div>

                         <div className="bg-white p-6 rounded-2xl shadow-sm mb-8 flex justify-center">
                            <QRCodeSVG value={`https://saharabook.ma/v/${Math.random().toString(36).substr(2, 9)}`} size={120} fgColor="#26215C" />
                         </div>

                         <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center space-x-2 text-xs font-bold text-[#BA7517]">
                               <Phone size={14} />
                               <span>Operator WhatsApp: +212 6...</span>
                            </div>
                            <button className="p-2 hover:bg-white rounded-full transition-colors">
                               <Download size={18} />
                            </button>
                         </div>
                      </div>

                      <div className="mt-12 space-y-4">
                         <p className="text-xs text-gray-400 italic">This voucher has been saved for offline access.</p>
                         <Link to="/" className="inline-block text-[#BA7517] font-bold text-sm underline underline-offset-4">Return Home</Link>
                      </div>
                   </motion.div>
                 )}
              </AnimatePresence>
           </div>

           {/* Booking Summary Sidebar */}
           {step < 4 && (
             <div className="md:col-span-1">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-28">
                   <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">Your Stay</h3>
                   <div className="flex space-x-4 mb-6 pb-6 border-b border-gray-50">
                      <img 
                        src="/merzouga-sunset.jpg" 
                        className="w-16 h-16 object-cover rounded-xl" 
                        alt={camp.name}
                      />
                      <div>
                         <h4 className="font-bold text-sm text-[#26215C]">{camp.name}</h4>
                         <p className="text-[10px] text-[#BA7517] uppercase font-bold tracking-widest mt-1">{camp.destination}</p>
                      </div>
                   </div>

                   <div className="space-y-3 mb-8">
                      <div className="flex justify-between text-sm">
                         <span className="text-gray-400">Dates</span>
                         <span className="font-semibold">May 14 - 16</span>
                      </div>
                      <div className="flex justify-between text-sm">
                         <span className="text-gray-400">Tent Type</span>
                         <span className="font-semibold">{formData.tentType}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Guests</span>
                        <span className="font-semibold">{2}</span>
                      </div>
                   </div>

                   <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                      <span className="text-lg font-bold text-[#26215C]">Total</span>
                      <span className="text-xl font-bold text-[#26215C]">{formatCurrency(440)}</span>
                   </div>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
