import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { nome, email, telefone, cargo, linkedin, curriculo, mensagem } = req.body;

  // Validação básica
  if (!nome || !email || !telefone || !curriculo) {
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
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
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

    // Preparar dados para inserir na planilha (PÁGINA 2 - Candidaturas)
    const values = [
      [
        dataHora,
        nome,
        email,
        telefone,
        cargo,
        linkedin || 'Não informado',
        curriculo,
        mensagem || 'Sem mensagem'
      ]
    ];

    // Inserir dados na PÁGINA 2 (Candidaturas)
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Candidaturas!A:H', // Nome da aba: "Candidaturas"
      valueInputOption: 'USER_ENTERED',
      resource: { values },
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Candidatura enviada com sucesso!' 
    });

  } catch (error) {
    console.error('Erro ao enviar candidatura:', error);
    console.error('Detalhes:', error.message);

    return res.status(500).json({ 
      success: false, 
      message: 'Erro ao processar candidatura',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Erro interno'
    });
  }
}