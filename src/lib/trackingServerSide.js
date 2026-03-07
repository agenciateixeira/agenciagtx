/**
 * GTX - Server-Side Tracking com CAPI
 * Sistema completo de captura e envio de eventos
 */

import { createClient } from '@supabase/supabase-js';

// Cliente Supabase dedicado para TRACKING (não usa o supabaseClient.js original)
let trackingClient = null;

const getTrackingSupabaseClient = () => {
  if (!trackingClient) {
    const url = process.env.NEXT_PUBLIC_TRACKING_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_TRACKING_SUPABASE_ANON_KEY;

    if (!url || !key) {
      console.error('[GTX] ❌ Tracking Supabase credentials missing');
      return null;
    }

    trackingClient = createClient(url, key);
  }
  return trackingClient;
};

/**
 * Extrai cookies do navegador
 */
const getCookie = (name) => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
};

/**
 * Extrai parâmetros da URL
 */
const getUrlParams = () => {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  return {
    gclid: params.get('gclid'),
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    utm_content: params.get('utm_content'),
    utm_term: params.get('utm_term')
  };
};

/**
 * Busca IP do usuário
 */
const getUserIP = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('[GTX] Erro ao buscar IP:', error);
    return null;
  }
};

/**
 * Gera ID único para evento
 */
const generateEventID = () => {
  return 'evt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

/**
 * Captura todos os dados de tracking
 */
export const captureTrackingData = async () => {
  if (typeof window === 'undefined') return null;

  const urlParams = getUrlParams();
  const userIP = await getUserIP();

  return {
    // Cookies Meta
    fbp: getCookie('_fbp'),
    fbc: getCookie('_fbc'),

    // Google Click ID
    gclid: urlParams.gclid,

    // Event ID único
    event_id: generateEventID(),

    // UTMs
    utm_source: urlParams.utm_source,
    utm_medium: urlParams.utm_medium,
    utm_campaign: urlParams.utm_campaign,
    utm_content: urlParams.utm_content,
    utm_term: urlParams.utm_term,

    // Dados técnicos
    user_agent: navigator.userAgent,
    ip_address: userIP,
    url_origem: window.location.href,

    // Status inicial
    status: 'novo'
  };
};

/**
 * Salva lead no Supabase
 */
export const saveLeadToSupabase = async (leadData) => {
  try {
    const supabase = getTrackingSupabaseClient();

    if (!supabase) {
      console.error('[GTX] ❌ Tracking Supabase não configurado');
      return null;
    }

    const { data, error } = await supabase
      .from('leads')
      .insert([leadData])
      .select();

    if (error) {
      console.error('[GTX] Erro ao salvar lead:', error);
      return null;
    }

    console.log('[GTX] ✅ Lead salvo com sucesso:', data[0].id);
    return data[0];

  } catch (error) {
    console.error('[GTX] Erro ao salvar lead:', error);
    return null;
  }
};

/**
 * Envia evento para Meta Pixel (client-side)
 */
export const sendPixelEvent = (eventName, eventID, additionalParams = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, additionalParams, { eventID: eventID });
    console.log('[GTX] ✅ Pixel Event:', eventName, eventID);
  }
};

/**
 * Rastreia clique no WhatsApp com Server-Side Tracking completo
 * Esta é a função principal que você vai usar nos botões
 */
export const trackWhatsAppClick = async (additionalData = {}) => {
  try {
    console.log('[GTX] 📊 Iniciando tracking WhatsApp...');

    // 1. Captura dados de tracking
    const trackingData = await captureTrackingData();

    if (!trackingData) {
      console.warn('[GTX] ⚠️ Tracking data não disponível');
      return;
    }

    // 2. Merge com dados adicionais (nome, email, telefone do formulário)
    const leadData = { ...trackingData, ...additionalData };

    // 3. Salva no Supabase
    const savedLead = await saveLeadToSupabase(leadData);

    // 4. Envia evento Lead para Pixel (client-side)
    if (savedLead) {
      sendPixelEvent('Lead', trackingData.event_id, {
        content_name: 'WhatsApp Click',
        content_category: 'Lead Generation'
      });
    }

    // 5. Aguarda um pouco para garantir que salvou
    await new Promise(resolve => setTimeout(resolve, 300));

    return savedLead;

  } catch (error) {
    console.error('[GTX] ❌ Erro no tracking:', error);
    return null;
  }
};

/**
 * Rastreia solicitação de consultoria
 */
export const trackConsultoriaClick = async (formData = {}) => {
  try {
    // Captura dados
    const trackingData = await captureTrackingData();

    // Merge com dados do formulário
    const leadData = {
      ...trackingData,
      ...formData,
      status: 'qualificado' // Consultoria = lead mais qualificado
    };

    // Salva no Supabase
    const savedLead = await saveLeadToSupabase(leadData);

    // Envia eventos
    if (savedLead) {
      // Meta Pixel - Lead
      sendPixelEvent('Lead', trackingData.event_id, {
        content_name: 'Consultoria Gratuita',
        content_category: 'Lead Generation'
      });

      // Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'generate_lead', {
          event_category: 'Lead',
          event_label: 'Consultoria Gratuita',
          value: 1
        });
      }

      // Google Ads Conversion
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-16834266345/CONVERSION_LABEL',
          'value': 1.0,
          'currency': 'BRL'
        });
      }
    }

    return savedLead;

  } catch (error) {
    console.error('[GTX] Erro no tracking consultoria:', error);
    return null;
  }
};

// Exporta funções existentes para compatibilidade
export const trackSectionView = (sectionName) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_section', {
      event_category: 'engagement',
      event_label: sectionName,
      section_name: sectionName
    });
  }
};

export const trackScrollDepth = (depth) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll', {
      event_category: 'engagement',
      event_label: `${depth}%`,
      value: depth
    });
  }
};

export const trackServiceClick = (serviceName) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'ViewService', {
      service_name: serviceName
    });
  }

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_service', {
      event_category: 'engagement',
      event_label: serviceName
    });
  }
};

export const trackTimeOnSite = (seconds) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'time_on_site', {
      event_category: 'engagement',
      value: seconds
    });
  }
};
