# 📊 AIRTABLE CRM SETUP - Marco Contin Digital

## **BASE: "MCD_CRM_2024"**

---

## **📋 TABELLA 1: "LEADS" (Principale)**

### **Struttura Campi:**

| Campo | Tipo | Configurazione |
|-------|------|----------------|
| **ID Lead** | Auto Number | Primario |
| **Nome** | Single line text | Required |
| **Email** | Email | Required |
| **Azienda** | Single line text | Required |
| **Telefono** | Phone number | Optional |
| **Budget** | Single select | Options below |
| **Messaggio** | Long text | Rich text enabled |
| **Data Contatto** | Created time | Auto |
| **Mese Contatto** | Formula | `DATETIME_FORMAT({Data Contatto}, "YYYY-MM")` |
| **Stato Lead** | Single select | Options below |
| **Lead Score** | Formula | Formula below |
| **Fonte** | Single select | Options below |
| **Settore** | Single select | Options below |
| **Dipendenti** | Single select | Options below |
| **Priorità** | Formula | Formula below |
| **Giorni da Contatto** | Formula | Formula below |
| **Prossima Azione** | Single line text | |
| **Data Prossima Azione** | Date | |
| **Assigned To** | Single select | Marco/Assistant |
| **Note Interne** | Long text | |
| **Progetti Collegati** | Link to "Progetti" | |
| **Valore Potenziale** | Currency (EUR) | |
| **Probabilità Chiusura** | Percent | |
| **Data Ultima Modifica** | Last modified time | |

---

### **🎯 OPZIONI SINGLE SELECT:**

#### **Budget:**
```
• Fondamenta Digitali (€1,590+)
• Motore di Crescita (€2,690+)  
• Sistema Integrato (€5,490+)
• Budget personalizzato
• Non specificato
```

#### **Stato Lead:**
```
• 🔴 Nuovo Lead
• 🟡 Contattato  
• 🟠 Qualificato
• 🔵 Proposta Inviata
• 🟢 Cliente Acquisito
• ⚫ Archiviato - Non Interessato
• ⚪ Archiviato - Non Qualificato
```

#### **Fonte:**
```
• Website Form
• Cal.com Booking
• Email Diretta
• LinkedIn
• Referral - Cliente
• Referral - Partner
• Social Media
• Google Ads
• Networking
• Cold Outreach
```

#### **Settore:**
```
• Manifattura
• Commercio
• Servizi Professionali
• Alimentare/Ristorazione
• Edilizia/Costruzioni
• Automotive
• Artigianato
• Retail
• Turismo/Hospitality
• Altro
```

#### **Dipendenti:**
```
• 1-5 dipendenti
• 6-15 dipendenti
• 16-50 dipendenti
• 51-100 dipendenti
• 100+ dipendenti
```

---

### **📊 FORMULE AVANZATE:**

#### **Lead Score (0-100):**
```javascript
IF({Budget} = "Sistema Integrato (€5,490+)", 30,
IF({Budget} = "Motore di Crescita (€2,690+)", 20,
IF({Budget} = "Fondamenta Digitali (€1,590+)", 15, 0))) +

IF({Settore} = "Manifattura", 20,
IF({Settore} = "Commercio", 15,
IF({Settore} = "Servizi Professionali", 15, 10))) +

IF({Dipendenti} = "51-100 dipendenti", 25,
IF({Dipendenti} = "16-50 dipendenti", 20,
IF({Dipendenti} = "6-15 dipendenti", 15,
IF({Dipendenti} = "1-5 dipendenti", 10, 0)))) +

IF({Fonte} = "Referral - Cliente", 20,
IF({Fonte} = "Cal.com Booking", 15,
IF({Fonte} = "Website Form", 10, 5))) +

IF(LEN({Messaggio}) > 200, 10,
IF(LEN({Messaggio}) > 100, 5, 0))
```

#### **Priorità:**
```javascript
IF({Lead Score} >= 80, "🔥 Alta",
IF({Lead Score} >= 60, "🟠 Media",
IF({Lead Score} >= 40, "🟡 Bassa", "❄️ Molto Bassa")))
```

#### **Giorni da Contatto:**
```javascript
DATETIME_DIFF(NOW(), {Data Contatto}, 'days')
```

#### **Valore Potenziale Auto:**
```javascript
IF({Budget} = "Sistema Integrato (€5,490+)", 7500,
IF({Budget} = "Motore di Crescita (€2,690+)", 3500,
IF({Budget} = "Fondamenta Digitali (€1,590+)", 2000,
IF({Budget} = "Budget personalizzato", 5000, 0))))
```

---

## **📝 TABELLA 2: "PROGETTI"**

### **Struttura Campi:**

| Campo | Tipo | Configurazione |
|-------|------|----------------|
| **Nome Progetto** | Single line text | Primary |
| **Cliente** | Link to "Leads" | Required |
| **Tipo Servizio** | Single select | Options below |
| **Valore Contratto** | Currency (EUR) | |
| **Data Inizio** | Date | |
| **Data Fine Prevista** | Date | |
| **Data Fine Effettiva** | Date | |
| **Stato Progetto** | Single select | Options below |
| **Progresso %** | Percent | |
| **Giorni Rimanenti** | Formula | |
| **Ritardo/Anticipo** | Formula | |
| **Milestone** | Multiple select | Options below |
| **Tecnologie** | Multiple select | Options below |
| **Note Progetto** | Long text | |
| **Link Repository** | URL | |
| **Link Staging** | URL | |
| **Link Live** | URL | |

### **Opzioni:**

#### **Tipo Servizio:**
```
• Fondamenta Digitali
• Motore di Crescita
• Sistema Integrato
• Manutenzione
• Consulenza
• Custom Development
```

#### **Stato Progetto:**
```
• 📋 In Preparazione
• 🚀 In Sviluppo
• 🧪 Testing
• 🔄 Revisioni
• ✅ Completato
• 🚫 Sospeso
• ❌ Cancellato
```

#### **Milestone:**
```
• Discovery & Planning
• Design System
• Frontend Development
• Backend Development
• Content Integration
• Testing & QA
• Launch
• Training
• Handoff
```

#### **Tecnologie:**
```
• Next.js
• React
• TypeScript
• Tailwind CSS
• Vercel
• Airtable
• Resend
• Cal.com
• Google Analytics
• Custom API
```

### **Formule Progetti:**

#### **Giorni Rimanenti:**
```javascript
IF({Data Fine Prevista}, 
DATETIME_DIFF({Data Fine Prevista}, TODAY(), 'days'), 
"Non definita")
```

#### **Ritardo/Anticipo:**
```javascript
IF(AND({Data Fine Effettiva}, {Data Fine Prevista}),
DATETIME_DIFF({Data Fine Effettiva}, {Data Fine Prevista}, 'days') & 
IF(DATETIME_DIFF({Data Fine Effettiva}, {Data Fine Prevista}, 'days') > 0, " giorni ritardo", " giorni anticipo"),
IF(AND({Data Fine Prevista}, {Stato Progetto} != "Completato"),
IF(DATETIME_DIFF(TODAY(), {Data Fine Prevista}, 'days') > 0,
DATETIME_DIFF(TODAY(), {Data Fine Prevista}, 'days') & " giorni ritardo", 
"Nei tempi"), ""))
```

---

## **📞 TABELLA 3: "ATTIVITÀ"**

### **Struttura Campi:**

| Campo | Tipo | Configurazione |
|-------|------|----------------|
| **Data Attività** | Created time | Primary |
| **Lead/Cliente** | Link to "Leads" | Required |
| **Tipo Attività** | Single select | Options below |
| **Oggetto** | Single line text | |
| **Descrizione** | Long text | |
| **Durata (min)** | Number | |
| **Esito** | Single select | Options below |
| **Prossima Azione** | Single line text | |
| **Data Prossima Azione** | Date | |
| **File/Link** | Attachment | |

### **Opzioni:**

#### **Tipo Attività:**
```
• 📧 Email Inviata
• 📞 Chiamata Effettuata
• 📞 Chiamata Ricevuta
• 👥 Meeting/Videocall
• 📄 Proposta Inviata
• 💰 Contratto Firmato
• 🎯 Follow-up
• 📝 Note Interna
• 🔄 Update Progetto
```

#### **Esito:**
```
• ✅ Positivo
• 🟡 Neutrale
• ❌ Negativo
• 📞 Nessuna Risposta
• 📧 In Attesa Risposta
• 🔄 Da Riprogrammare
```

---

## **📊 VIEWS CONFIGURAZIONE:**

### **VIEW "Dashboard Leads":**
- **Filtro**: Stato != "Archiviato"
- **Ordinamento**: Lead Score (decrescente), Data Contatto
- **Campi**: Nome, Azienda, Budget, Stato, Lead Score, Priorità, Giorni da Contatto
- **Colori**: 
  - Lead Score 80+ = Verde
  - Lead Score 60-79 = Giallo
  - Lead Score <60 = Rosso

### **VIEW "Lead Caldi":**
- **Filtro**: Lead Score >= 70 AND Stato != "Archiviato"
- **Ordinamento**: Lead Score (decrescente)
- **Colori**: Tutto verde (leads prioritari)

### **VIEW "Follow-up Urgenti":**
- **Filtro**: Giorni da Contatto > 7 AND Stato IN ("Contattato", "Qualificato")
- **Ordinamento**: Giorni da Contatto (decrescente)
- **Colori**: Rosso per urgenti

### **VIEW "Pipeline Mensile" (PRINCIPALE PER STATISTICHE):**
- **Group by**: `Mese Contatto`
- **Summary**: 
  - COUNT di tutti i record (Nuovi Lead)
  - COUNT dove Stato = "🟠 Qualificato" 
  - COUNT dove Stato = "🔵 Proposta Inviata"
  - COUNT dove Stato = "🟢 Cliente Acquisito"
  - SUM di Valore Potenziale
- **Sort**: Group by Mese Contatto (decrescente)

### **VIEW "Progetti Attivi" (Tabella Progetti):**
- **Filtro**: Stato Progetto IN ("In Sviluppo", "Testing", "Revisioni")
- **Ordinamento**: Data Fine Prevista (crescente)
- **Colori**: Rosso per progetti in ritardo

---

## **🔄 SETUP API INTEGRATION:**

### **Campi Richiesti per API:**
- Nome (required)
- Email (required) 
- Azienda (required)
- Telefono (optional)
- Budget (from form select)
- Messaggio (required)
- Fonte = "Website Form" (auto)

### **Airtable API Info:**
- **Base ID**: [Da recuperare dall'URL Airtable]
- **Table Name**: "Leads"
- **API Key**: [Da creare in Account settings]

### **Next.js API Route Path:**
```
/src/app/api/contact/route.ts
```

---

## **🎨 COLOR CODING:**

### **Stati Lead:**
- 🔴 Nuovo Lead = Rosso
- 🟡 Contattato = Giallo
- 🟠 Qualificato = Arancione
- 🔵 Proposta Inviata = Blu
- 🟢 Cliente Acquisito = Verde
- ⚫ Archiviato Non Interessato = Grigio scuro
- ⚪ Archiviato Non Qualificato = Grigio chiaro

### **Priorità:**
- 🔥 Alta = Rosso
- 🟠 Media = Arancione  
- 🟡 Bassa = Giallo
- ❄️ Molto Bassa = Grigio

### **Progetti:**
- 📋 In Preparazione = Grigio
- 🚀 In Sviluppo = Blu
- 🧪 Testing = Arancione
- 🔄 Revisioni = Giallo
- ✅ Completato = Verde
- 🚫 Sospeso = Rosso
- ❌ Cancellato = Grigio scuro

---

## **🚀 NEXT STEPS:**
1. ✅ Creare Base Airtable "MCD_CRM_2024"
2. ✅ Setup tabelle e campi come specificato
3. ✅ Configurare views come specificato  
4. 🔄 **IN PROGRESS**: Setup API integration Next.js
5. ⏳ **PENDING**: Email automation con Resend
6. ⏳ **PENDING**: Cal.com webhook integration

---

## **📝 NOTES:**
- **Cal.com** utilizzato al posto di Calendly ovunque
- **Pipeline View** sostituisce tabella separata per semplicità
- **Lead Scoring** automatico da 0-100 basato su business rules
- **Color coding** per prioritizzazione visuale immediata