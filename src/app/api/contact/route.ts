import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';

// Initialize Airtable
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID!);

interface ContactFormData {
  nome: string;
  email: string;
  azienda: string;
  telefono?: string;
  messaggio: string;
  budget: string;
}

// Lead Scoring Algorithm (replica della formula Airtable)
function calculateLeadScore(data: ContactFormData): number {
  let score = 0;
  
  // Budget score (0-30 points)
  switch (data.budget) {
    case 'sistema':
      score += 30;
      break;
    case 'motore':
      score += 20;
      break;
    case 'fondamenta':
      score += 15;
      break;
    case 'altro':
      score += 10;
      break;
  }
  
  // Source score (Website Form = 10 points)
  score += 10;
  
  // Message length score (0-10 points)
  if (data.messaggio.length > 200) {
    score += 10;
  } else if (data.messaggio.length > 100) {
    score += 5;
  }
  
  // Phone provided bonus (5 points)
  if (data.telefono && data.telefono.length > 0) {
    score += 5;
  }
  
  return Math.min(score, 100); // Cap at 100
}

// Determine priority based on score
function getPriority(score: number): string {
  if (score >= 80) return "🔥 Alta";
  if (score >= 60) return "🟠 Media";
  if (score >= 40) return "🟡 Bassa";
  return "❄️ Molto Bassa";
}

// Convert budget form value to display value
function getBudgetDisplay(budget: string): string {
  switch (budget) {
    case 'fondamenta':
      return 'Fondamenta Digitali (€1,590+)';
    case 'motore':
      return 'Motore di Crescita (€2,690+)';
    case 'sistema':
      return 'Sistema Integrato (€5,490+)';
    case 'altro':
      return 'Budget personalizzato';
    default:
      return 'Non specificato';
  }
}

// Get potential value based on budget
function getPotentialValue(budget: string): number {
  switch (budget) {
    case 'sistema':
      return 7500;
    case 'motore':
      return 3500;
    case 'fondamenta':
      return 2000;
    case 'altro':
      return 5000;
    default:
      return 0;
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();
    
    // Validate required fields
    if (!data.nome || !data.email || !data.azienda || !data.messaggio) {
      return NextResponse.json(
        { error: 'Campi obbligatori mancanti' },
        { status: 400 }
      );
    }

    // Calculate lead score and priority
    const leadScore = calculateLeadScore(data);
    const priority = getPriority(leadScore);
    const budgetDisplay = getBudgetDisplay(data.budget);
    const potentialValue = getPotentialValue(data.budget);

    // Create record in Airtable (Only writeable fields, formulas will calculate automatically)
    const record = await base('Leads').create({
      'Nome': data.nome,
      'Email': data.email,
      'Azienda': data.azienda,
      'Telefono': data.telefono || '',
      'Budget': budgetDisplay,
      'Messaggio': data.messaggio,
      'Fonte': 'Website Form',
      'Stato Lead': 'Nuovo Lead',
      'Note Interne': `Lead automatico da website. Score calcolato: ${leadScore} (${priority})`
    });

    console.log('✅ Lead creato in Airtable:', {
      id: record.getId(),
      nome: data.nome,
      azienda: data.azienda,
      score: leadScore,
      priority: priority
    });

    // Email di notifica (se configurato Resend)
    if (process.env.RESEND_API_KEY) {
      try {
        const emailData = {
          from: 'noreply@marcocontin.digital',
          to: process.env.NOTIFICATION_EMAIL || 'info@marcocontin.digital',
          subject: `🚨 Nuovo Lead ${priority} - ${data.azienda}`,
          html: `
            <h2>🎯 Nuovo Lead dal Sito Web</h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 16px 0;">
              <h3>📊 Lead Score: ${leadScore}/100 (${priority})</h3>
            </div>
            <p><strong>👤 Nome:</strong> ${data.nome}</p>
            <p><strong>📧 Email:</strong> ${data.email}</p>
            <p><strong>🏢 Azienda:</strong> ${data.azienda}</p>
            <p><strong>📞 Telefono:</strong> ${data.telefono || 'Non fornito'}</p>
            <p><strong>💰 Budget:</strong> ${budgetDisplay}</p>
            <p><strong>💎 Valore Potenziale:</strong> €${potentialValue.toLocaleString()}</p>
            <p><strong>📝 Messaggio:</strong></p>
            <div style="background: #ffffff; padding: 12px; border-left: 4px solid #0891b2; margin: 8px 0;">
              ${data.messaggio}
            </div>
            <p><strong>📅 Ricevuto:</strong> ${new Date().toLocaleString('it-IT')}</p>
            <hr>
            <p><small>🤖 Lead automaticamente salvato in Airtable CRM (ID: ${record.getId()})</small></p>
          `
        };

        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
        });

        console.log('📧 Email di notifica inviata');
      } catch (emailError) {
        console.error('❌ Errore invio email:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Richiesta inviata con successo',
      leadId: record.getId(),
      leadScore: leadScore,
      priority: priority
    });

  } catch (error) {
    console.error('❌ Errore invio ad Airtable:', error);
    
    return NextResponse.json(
      { 
        error: 'Errore interno del server',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'API Contact attiva',
    airtableConfigured: !!(process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID),
    timestamp: new Date().toISOString()
  });
}