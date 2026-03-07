/**
 * GTX - Session Tracking System
 * Rastreia quantas vezes o usuário visitou o site
 */

import { createClient } from '@supabase/supabase-js';

// Debug mode - set to false in production
const DEBUG = false;
const log = (...args) => DEBUG && console.log(...args);
const logError = (...args) => console.error(...args); // Errors always show

// Cliente Supabase para tracking
let trackingClient = null;

const getTrackingSupabaseClient = () => {
  if (!trackingClient) {
    const url = process.env.NEXT_PUBLIC_TRACKING_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_TRACKING_SUPABASE_ANON_KEY;

    if (!url || !key) {
      logError('[GTX Sessions] ❌ Tracking Supabase credentials missing');
      return null;
    }

    trackingClient = createClient(url, key);
  }
  return trackingClient;
};

/**
 * Gera ou recupera o GTX User ID (cookie único do usuário)
 * Dura 365 dias
 */
export const getGTXUserID = () => {
  if (typeof document === 'undefined') return null;

  const cookieName = '_gtx_uid';
  const existingCookie = getCookie(cookieName);

  if (existingCookie) {
    return existingCookie;
  }

  // Gera novo ID
  const newID = 'gtx_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

  // Salva cookie por 365 dias
  const expires = new Date();
  expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000));
  document.cookie = `${cookieName}=${newID}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;

  log('[GTX Sessions] 🆔 Novo GTX User ID criado:', newID);
  return newID;
};

/**
 * Gera Session ID (único para cada visita)
 */
export const getSessionID = () => {
  if (typeof sessionStorage === 'undefined') return null;

  const storageKey = '_gtx_session_id';
  const existingSession = sessionStorage.getItem(storageKey);

  if (existingSession) {
    return existingSession;
  }

  // Gera novo Session ID
  const newSessionID = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  sessionStorage.setItem(storageKey, newSessionID);

  log('[GTX Sessions] 🎯 Nova sessão iniciada:', newSessionID);
  return newSessionID;
};

/**
 * Extrai cookie do navegador
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
    fbclid: params.get('fbclid'),
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    utm_content: params.get('utm_content'),
    utm_term: params.get('utm_term')
  };
};

/**
 * Detecta tipo de dispositivo
 */
const getDeviceType = () => {
  if (typeof window === 'undefined') return 'unknown';
  const ua = navigator.userAgent.toLowerCase();

  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
};

/**
 * Detecta navegador
 */
const getBrowser = () => {
  if (typeof window === 'undefined') return 'unknown';
  const ua = navigator.userAgent.toLowerCase();

  if (ua.indexOf('chrome') > -1 && ua.indexOf('edg') === -1) return 'chrome';
  if (ua.indexOf('safari') > -1 && ua.indexOf('chrome') === -1) return 'safari';
  if (ua.indexOf('firefox') > -1) return 'firefox';
  if (ua.indexOf('edg') > -1) return 'edge';
  if (ua.indexOf('opr') > -1 || ua.indexOf('opera') > -1) return 'opera';

  return 'other';
};

/**
 * Detecta sistema operacional
 */
const getOS = () => {
  if (typeof window === 'undefined') return 'unknown';
  const ua = navigator.userAgent.toLowerCase();

  if (ua.indexOf('win') > -1) return 'windows';
  if (ua.indexOf('mac') > -1) return 'mac';
  if (ua.indexOf('linux') > -1) return 'linux';
  if (ua.indexOf('android') > -1) return 'android';
  if (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1) return 'ios';

  return 'other';
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
    logError('[GTX Sessions] Erro ao buscar IP:', error);
    return null;
  }
};

/**
 * Registra uma nova sessão no Supabase
 */
export const trackSession = async () => {
  if (typeof window === 'undefined') return null;

  try {
    const supabase = getTrackingSupabaseClient();
    if (!supabase) return null;

    // Dados da sessão
    const gtxUID = getGTXUserID();
    const sessionID = getSessionID();
    const urlParams = getUrlParams();
    const userIP = await getUserIP();

    const sessionData = {
      gtx_uid: gtxUID,
      session_id: sessionID,
      landing_page: window.location.pathname,
      referrer: document.referrer || 'direct',

      // UTMs
      utm_source: urlParams.utm_source,
      utm_medium: urlParams.utm_medium,
      utm_campaign: urlParams.utm_campaign,
      utm_content: urlParams.utm_content,
      utm_term: urlParams.utm_term,

      // Tracking
      gclid: urlParams.gclid,
      fbclid: urlParams.fbclid,
      fbp: getCookie('_fbp'),
      fbc: getCookie('_fbc'),

      // Dados técnicos
      user_agent: navigator.userAgent,
      ip_address: userIP,
      device_type: getDeviceType(),
      browser: getBrowser(),
      os: getOS(),

      // Defaults
      pages_viewed: 1,
      converted: false
    };

    log('[GTX Sessions] 📊 Registrando sessão...', sessionID);

    const { data, error } = await supabase
      .from('sessions')
      .insert([sessionData])
      .select();

    if (error) {
      logError('[GTX Sessions] ❌ Erro ao salvar sessão:', error);
      return null;
    }

    log('[GTX Sessions] ✅ Sessão registrada:', data[0].id);
    return data[0];

  } catch (error) {
    logError('[GTX Sessions] ❌ Erro:', error);
    return null;
  }
};

/**
 * Busca quantas sessões o usuário já teve
 */
export const getUserSessionCount = async () => {
  if (typeof window === 'undefined') return 0;

  try {
    const supabase = getTrackingSupabaseClient();
    if (!supabase) return 0;

    const gtxUID = getGTXUserID();
    if (!gtxUID) return 0;

    const { data, error, count } = await supabase
      .from('sessions')
      .select('id', { count: 'exact', head: true })
      .eq('gtx_uid', gtxUID);

    if (error) {
      logError('[GTX Sessions] ❌ Erro ao contar sessões:', error);
      return 0;
    }

    log(`[GTX Sessions] 📊 Usuário tem ${count} sessões`);
    return count || 0;

  } catch (error) {
    logError('[GTX Sessions] ❌ Erro:', error);
    return 0;
  }
};

/**
 * Busca informações do usuário (se já converteu)
 */
export const getUserInfo = async () => {
  if (typeof window === 'undefined') return null;

  try {
    const supabase = getTrackingSupabaseClient();
    if (!supabase) return null;

    const gtxUID = getGTXUserID();
    if (!gtxUID) return null;

    const { data, error } = await supabase
      .from('leads')
      .select('nome, email, telefone, status, created_at')
      .eq('gtx_uid', gtxUID)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error || !data || data.length === 0) {
      return null;
    }

    log('[GTX Sessions] 👤 Usuário identificado:', data[0].nome);
    return data[0];

  } catch (error) {
    logError('[GTX Sessions] ❌ Erro:', error);
    return null;
  }
};

/**
 * Marca sessão como convertida e vincula com lead
 */
export const markSessionAsConverted = async (leadId) => {
  if (typeof window === 'undefined') return;

  try {
    const supabase = getTrackingSupabaseClient();
    if (!supabase) return;

    const sessionID = getSessionID();
    if (!sessionID) return;

    await supabase
      .from('sessions')
      .update({
        converted: true,
        lead_id: leadId
      })
      .eq('session_id', sessionID);

    log('[GTX Sessions] ✅ Sessão marcada como convertida');

  } catch (error) {
    logError('[GTX Sessions] ❌ Erro ao marcar conversão:', error);
  }
};
