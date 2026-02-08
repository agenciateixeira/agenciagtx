// src/pages/api/submit-exclusive.js
import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { nome, email, empresa, telefone, faturamento, mensagem } = req.body;

  // Validação básica
  if (!nome || !email || !empresa || !telefone) {
    return res.status(400).json({ 
      success: false, 
      message: 'Campos obrigatórios não preenchidos' 
    });
  }

  try {
    // Configuração da autenticação do Google Sheets
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Data e hora atual
    const dataHora = new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      dateStyle: 'short',
      timeStyle: 'medium'
    });

    // Preparar dados para inserir na planilha (PÁGINA 3)
    const values = [
      [
        dataHora,
        nome,
        email,
        empresa,
        telefone,
        faturamento || 'Não informado',
        mensagem || 'Sem mensagem',
        'GTX Exclusive' // Identificador de origem
      ]
    ];

    // Inserir dados na PÁGINA 3 (Sheet3)
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Exclusive!A:H', // PÁGINA 3 - Exclusive
      valueInputOption: 'USER_ENTERED',
      resource: { values },
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Solicitação enviada com sucesso!' 
    });

  } catch (error) {
    console.error('Erro ao enviar solicitação exclusive:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Erro ao processar solicitação',
      error: error.message 
    });
  }
}