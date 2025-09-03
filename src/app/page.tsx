import dynamic from 'next/dynamic';
import { Building2, Zap, Settings } from 'lucide-react';

const ContactForm = dynamic(() => import('@/components/ContactForm').then(mod => ({ default: mod.ContactForm })), {
  loading: () => <div className="text-center py-8">Caricamento form...</div>
});

export default function Home() {
  return (
    <div className="min-h-screen" style={{
      background: `
        linear-gradient(
          -45deg,
          #F1F5F9 0%,
          #DBEAFE 15%,
          #A5F3FC 30%,
          #C4B5FD 50%,
          #BAE6FD 70%, 
          #E0F2FE 85%,
          #F1F5F9 100%
        )
      `,
      backgroundSize: '300% 300%',
      backgroundPosition: '0% 50%'
    }}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-sm border-b border-white/20">
        <div className="container">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h2 className="text-xl font-bold text-gradient-primary">
                Marco Contin <span className="text-gradient-accent">Digital</span>
              </h2>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#servizi" className="text-body hover:text-primary transition-colors font-medium">Servizi</a>
              <a href="#chi-sono" className="text-body hover:text-primary transition-colors font-medium">Chi Sono</a>
              <a href="#contatti" className="text-body hover:text-primary transition-colors font-medium">Contatti</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="section-lg text-center">
        <div className="container">
          <h1 className="heading-1 text-gradient-hero mb-6">
            Siti web veloci e automazioni per PMI
            <span className="block text-gradient-accent mt-2">Stack moderni, zero template</span>
          </h1>
          
          <p className="text-body-lg text-hero-enhanced mb-8 max-w-3xl mx-auto">
            Marco Contin, specialista digitale per PMI Veneto. 10 anni in ambiente industriale applicati al web: performance, automazione, risultati misurabili.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#contatti" className="btn btn-primary btn-lg">
              Prenota Consulenza Gratuita
            </a>
            <a href="#chi-sono" className="btn btn-secondary btn-lg">
              Scopri Il Processo
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servizi" className="section">
        <div className="container">
          <h2 className="heading-2 text-center text-gradient-primary mb-12">
            Servizi Specialistici
          </h2>
          
          <div className="grid grid-cols-1 grid-cols-md-3">
            {/* Fondamenta */}
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4">
                  <Building2 size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="heading-3 mb-1">Fondamenta Digitali</h3>
                  <div className="inline-block px-3 py-1 bg-primary text-white text-sm font-semibold rounded-full">
                    A partire da €1,590
                  </div>
                </div>
              </div>
              
              <p className="text-body mb-6">
                Stack moderni (React/Next.js) per PMI che vogliono presenza web professionale. Performance-first design, mai template WordPress.
              </p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-primary mr-2">▸</span>
                  <span className="text-body">Sito web ottimizzato &lt;2s caricamento</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▸</span>
                  <span className="text-body">Design responsive mobile-first</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▸</span>
                  <span className="text-body">SEO tecnico professionale</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▸</span>
                  <span className="text-body">Form contatti integrato</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▸</span>
                  <span className="text-body">Gestione autonoma contenuti</span>
                </li>
              </ul>
              
              <a href="/servizi/fondamenta-digitali" className="btn btn-secondary w-full">
                Scopri
              </a>
            </div>

            {/* Motore */}
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4">
                  <Zap size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="heading-3 mb-1">Motore di Crescita</h3>
                  <div className="inline-block px-3 py-1 bg-primary text-white text-sm font-semibold rounded-full">
                    A partire da €2,690
                  </div>
                </div>
              </div>
              
              <p className="text-body mb-6">
                Automazioni business e sistemi avanzati per PMI in espansione. Email marketing automatizzato, chatbot intelligenti, integrazioni CRM.
              </p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-primary mr-2">▸</span>
                  <span className="text-body">Email marketing automatizzato</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▸</span>
                  <span className="text-body">Chatbot intelligenti WhatsApp</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▸</span>
                  <span className="text-body">CRM integrato (Airtable)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▸</span>
                  <span className="text-body">Analytics avanzate</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▸</span>
                  <span className="text-body">Lead scoring automatico</span>
                </li>
              </ul>
              
              <a href="/servizi/motore-di-crescita" className="btn btn-secondary w-full">
                Scopri
              </a>
            </div>

            {/* Sistema */}
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4">
                  <Settings size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="heading-3 mb-1">Sistema Integrato</h3>
                  <div className="inline-block px-3 py-1 bg-primary text-white text-sm font-semibold rounded-full">
                    A partire da €5,490
                  </div>
                </div>
              </div>
              
              <p className="text-body mb-6">
                Soluzioni custom per PMI con esigenze complesse. Architettura su misura, integrazione sistemi esistenti, consulenza tecnica approfondita.
              </p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-primary mr-2">▸</span>
                  <span className="text-body">Architettura custom su misura</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▸</span>
                  <span className="text-body">Integrazione sistemi esistenti</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▸</span>
                  <span className="text-body">Consulenza tecnica specialistica</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▸</span>
                  <span className="text-body">Partnership continuativa</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▸</span>
                  <span className="text-body">Supporto prioritario</span>
                </li>
              </ul>
              
              <a href="/servizi/sistema-integrato" className="btn btn-secondary w-full">
                Scopri
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="section bg-primary/5">
        <div className="container">
          <div className="grid grid-cols-1 grid-cols-md-3 text-center">
            <div>
              <h3 className="text-3xl font-bold text-gradient-primary mb-2">10 anni</h3>
              <p className="text-body">Esperienza industriale applicata al digitale</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gradient-primary mb-2">PMI Veneto</h3>
              <p className="text-body">Specializzazione con servizio remoto Italia</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gradient-primary mb-2">Stack moderni</h3>
              <p className="text-body">React/Next.js, mai WordPress</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section id="chi-sono" className="section">
        <div className="container">
          <h2 className="heading-2 text-center text-gradient-primary mb-12">Chi Sono</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-body-lg mb-6">
              Da 10 anni in ambiente industriale ho imparato che ogni sistema deve funzionare perfettamente. Coordinamento produzione, automazione processi, ottimizzazione performance. Stessa mentalità, diverso campo: il web.
            </p>
            <p className="text-body-lg mb-6">
              Marco Contin, 33 anni, Badia Polesine (RO). Diplomatico meccanica/meccatronica, attualmente Computer Engineering & AI. <strong>Non sono ingegnere</strong>, sono uno specialista con approccio industriale al digitale.
            </p>
            <p className="text-body-lg">
              Tessuto industriale Veneto nelle vene. Comprendo le PMI perché ci ho lavorato dentro. React/Next.js perché funzionano, WordPress no. Stack scelti per efficienza, non per moda.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contatti" className="section">
        <div className="container">
          <h2 className="heading-2 text-center text-gradient-primary mb-12">Contatti</h2>
          
          {/* Contact Options */}
          <div className="text-center mb-12">
            <p className="text-body-lg mb-8">
              Calendly preferito - quando hai tempo di concentrarti sul progetto. Niente pressioni commerciali, solo analisi seria del tuo business digitale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a 
                href="https://calendly.com/marcocontin" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                Prenota Consulenza Gratuita
              </a>
              <a href="mailto:info@marcocontin.digital" className="btn btn-secondary btn-lg">
                Invia Email Diretta
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card max-w-2xl mx-auto">
            <h3 className="heading-3 text-center mb-8">
              Oppure compila il form per una risposta in 24h
            </h3>
            <ContactForm />
          </div>

          <div className="text-center text-sm text-body/70 mt-8">
            <p><strong>Telefono:</strong> Solo clienti esistenti + emergenze</p>
            <p><strong>Email:</strong> Risposta entro 24h lavorative</p>
            <p><strong>Sede:</strong> Badia Polesine (RO) • <strong>Servizio:</strong> Tutto Italia da remoto</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-gradient-primary">Marco Contin Digital</h3>
            <p className="text-slate-300 mb-4">Specialista digitale per PMI Veneto</p>
            <p className="text-slate-400 text-sm">Badia Polesine (RO) • Servizio remoto Italia</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
