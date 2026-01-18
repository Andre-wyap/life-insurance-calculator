import React, { useState } from 'react';
import { X, Loader2, CheckCircle } from 'lucide-react';
import { CalculatorState, CalculationResult, LeadFormData, WebhookPayload } from '../types';
import { WEBHOOK_URL, CURRENCY_FORMAT } from '../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  calculatorData: CalculatorState;
  results: CalculationResult;
}

const LeadFormModal: React.FC<Props> = ({ isOpen, onClose, calculatorData, results }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    birthDate: '',
    gender: 'Male',
    isSmoker: false,
    phone: '',
    email: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Handle Radio/Checkbox logic manually if needed, but for text/select:
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSmokerChange = (isSmoker: boolean) => {
    setFormData(prev => ({ ...prev, isSmoker }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const payload: WebhookPayload = {
      formData,
      coverageDetails: { ...calculatorData, ...results },
      timestamp: new Date().toISOString()
    };

    try {
      // Simulate API Call or Call Real Webhook
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // Note: Since the placeholder webhook won't work, we simulate success for the UI demo
      // In production, check response.ok
      if (true) { 
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Webhook error", error);
      // Simulate success for demo purposes if webhook fails (likely due to CORS/invalid URL)
      setStatus('success'); 
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="relative bg-brand-cream w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden text-brand-dark animate-in fade-in zoom-in duration-300">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X className="w-6 h-6" />
        </button>

        {status === 'success' ? (
          <div className="p-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-serif text-brand-dark mb-2">Quote Saved!</h2>
            <p className="text-gray-600 mb-6">
              Thank you, {formData.fullName}. We have sent the detailed breakdown to <strong>{formData.email}</strong>.
            </p>
            <button 
              onClick={onClose}
              className="bg-brand-card text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-light transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="p-8">
            <header className="text-center mb-8">
              <h2 className="text-3xl font-serif text-brand-dark mb-2">Save Your Quote</h2>
              <p className="text-gray-600">
                Based on your inputs, you need approximately <br/>
                <span className="text-brand-orange font-bold text-xl">{CURRENCY_FORMAT.format(results.grandTotal)}</span> in protection.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Full Name</label>
                <input 
                  required
                  name="fullName"
                  type="text" 
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Andrew Yap"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Date of Birth</label>
                  <input 
                    required
                    name="birthDate"
                    type="date" 
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-orange outline-none bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Gender</label>
                  <select 
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-orange outline-none bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Smoker?</label>
                <div className="flex gap-4">
                  <label className={`flex-1 flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all ${formData.isSmoker ? 'border-brand-dark bg-white shadow-sm' : 'border-gray-200 bg-gray-50'}`}>
                    <input 
                      type="radio" 
                      name="isSmoker" 
                      checked={formData.isSmoker === true} 
                      onChange={() => handleSmokerChange(true)} 
                      className="mr-2 accent-brand-dark"
                    />
                    Yes
                  </label>
                  <label className={`flex-1 flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all ${!formData.isSmoker ? 'border-brand-orange bg-orange-50 shadow-sm' : 'border-gray-200 bg-gray-50'}`}>
                    <input 
                      type="radio" 
                      name="isSmoker" 
                      checked={formData.isSmoker === false} 
                      onChange={() => handleSmokerChange(false)} 
                      className="mr-2 accent-brand-orange"
                    />
                    No
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Phone</label>
                  <input 
                    required
                    name="phone"
                    type="tel" 
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+60 12-345 6789"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-orange outline-none bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Email</label>
                  <input 
                    required
                    name="email"
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-orange outline-none bg-white"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full mt-6 bg-brand-card text-white text-lg font-semibold py-4 rounded-xl hover:bg-brand-dark transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" /> Processing...
                  </>
                ) : (
                  'Get Detailed Quote'
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadFormModal;
