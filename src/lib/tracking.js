// Função para rastrear cliques no WhatsApp
export const trackWhatsAppClick = () => {
  // Meta Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact', {
      contact_method: 'whatsapp'
    });
  }
  
  // Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'contact', {
      method: 'whatsapp',
      event_category: 'engagement',
      event_label: 'WhatsApp Click'
    });
  }
};

// Função para rastrear solicitação de consultoria
export const trackConsultoriaClick = () => {
  // Meta Pixel - Lead
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: 'Consultoria Gratuita',
      content_category: 'Lead Generation'
    });
  }
  
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
      'send_to': 'AW-16834266345/CONVERSION_LABEL', // Substitua CONVERSION_LABEL pelo seu label real
      'value': 1.0,
      'currency': 'BRL'
    });
  }
};

// Função para rastrear visualização de seção
export const trackSectionView = (sectionName) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_section', {
      event_category: 'engagement',
      event_label: sectionName,
      section_name: sectionName
    });
  }
};

// Função para rastrear scroll profundo
export const trackScrollDepth = (depth) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll', {
      event_category: 'engagement',
      event_label: `${depth}%`,
      value: depth
    });
  }
};

// Função para rastrear cliques em serviços
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

// Função para rastrear tempo no site
export const trackTimeOnSite = (seconds) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'time_on_site', {
      event_category: 'engagement',
      value: seconds
    });
  }
};