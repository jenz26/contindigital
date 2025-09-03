'use client';

import { useState } from 'react';

interface ContactFormData {
  nome: string;
  email: string;
  azienda: string;
  telefono?: string;
  messaggio: string;
  budget: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    nome: '',
    email: '',
    azienda: '',
    telefono: '',
    messaggio: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          nome: '',
          email: '',
          azienda: '',
          telefono: '',
          messaggio: '',
          budget: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nome" className="block text-sm font-semibold text-slate-700 mb-2">
            Nome *
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            required
            value={formData.nome}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="azienda" className="block text-sm font-semibold text-slate-700 mb-2">
            Azienda *
          </label>
          <input
            type="text"
            id="azienda"
            name="azienda"
            required
            value={formData.azienda}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
        
        <div>
          <label htmlFor="telefono" className="block text-sm font-semibold text-slate-700 mb-2">
            Telefono
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="budget" className="block text-sm font-semibold text-slate-700 mb-2">
          Budget indicativo
        </label>
        <select
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
        >
          <option value="">Seleziona budget</option>
          <option value="fondamenta">Fondamenta Digitali (€1,590+)</option>
          <option value="motore">Motore di Crescita (€2,690+)</option>
          <option value="sistema">Sistema Integrato (€5,490+)</option>
          <option value="altro">Budget personalizzato</option>
        </select>
      </div>

      <div>
        <label htmlFor="messaggio" className="block text-sm font-semibold text-slate-700 mb-2">
          Messaggio *
        </label>
        <textarea
          id="messaggio"
          name="messaggio"
          required
          rows={5}
          value={formData.messaggio}
          onChange={handleChange}
          placeholder="Raccontami del tuo progetto e delle tue necessità..."
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-vertical"
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary btn-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? 'Invio in corso...' : 'Invia Richiesta'}
        </button>
      </div>

      {submitStatus === 'success' && (
        <div className="text-center text-emerald-700 bg-emerald-50 p-4 rounded-lg border border-emerald-200">
          <strong>Grazie!</strong> La tua richiesta è stata inviata. Ti risponderò entro 24 ore lavorative.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="text-center text-red-700 bg-red-50 p-4 rounded-lg border border-red-200">
          Si è verificato un errore. Riprova o contattami direttamente via email.
        </div>
      )}
    </form>
  );
}