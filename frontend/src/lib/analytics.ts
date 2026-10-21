/**
 * Google Tag Manager / GA4 DataLayer Event Dispatcher
 *
 * Implements Kuda Tinarwo's digital analytics recommendations:
 * Distinguishes application starts, step progression, validation errors,
 * submissions, and confirmed backend completions instead of relying only
 * on a single generic form_submit event.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, any>[];
  }
}

/** Ensure window.dataLayer exists safely in browser runtime */
function pushToDataLayer(eventPayload: Record<string, any>) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    timestamp: new Date().toISOString(),
    ...eventPayload,
  });

  if (import.meta.env.DEV) {
    console.debug('[Analytics GTM dataLayer]', eventPayload);
  }
}

export const analytics = {
  /**
   * Fired when a customer initiates an onboarding flow or application journey
   */
  trackApplicationStart(service: string, metadata: Record<string, any> = {}) {
    pushToDataLayer({
      event: 'application_start',
      journey_service: service,
      journey_source: metadata.source || 'web_direct',
      ...metadata,
    });
  },

  /**
   * Fired when a customer navigates between steps inside a journey
   */
  trackApplicationStep(
    service: string,
    stepIndex: number,
    stepName: string,
    totalSteps: number,
    metadata: Record<string, any> = {}
  ) {
    pushToDataLayer({
      event: 'application_step_view',
      journey_service: service,
      step_index: stepIndex + 1,
      step_name: stepName,
      total_steps: totalSteps,
      ...metadata,
    });
  },

  /**
   * Fired when validation fails or submission encounters an API/network error
   */
  trackApplicationError(
    service: string,
    stepIndex: number,
    errorMessage: string,
    fieldId?: string
  ) {
    pushToDataLayer({
      event: 'application_error',
      journey_service: service,
      step_index: stepIndex + 1,
      error_message: errorMessage,
      field_id: fieldId || 'general',
    });
  },

  /**
   * Fired when the customer clicks Submit on an application
   */
  trackApplicationSubmission(service: string, ref: string, metadata: Record<string, any> = {}) {
    pushToDataLayer({
      event: 'application_submission',
      journey_service: service,
      application_ref: ref,
      ...metadata,
    });
  },

  /**
   * Fired when the server responds 201 Created and confirms receipt of the application
   */
  trackApplicationConfirmedCompletion(
    service: string,
    referenceCode: string,
    metadata: Record<string, any> = {}
  ) {
    pushToDataLayer({
      event: 'application_confirmed_completion',
      journey_service: service,
      reference_code: referenceCode,
      status: 'confirmed',
      ...metadata,
    });
  },

  /**
   * Fired when a customer clicks a conversion CTA (Apply, Get Quote, Request Callback)
   */
  trackConversionCta(
    action: 'apply' | 'quote' | 'callback' | 'relationship_manager' | 'login' | 'diaspora',
    label: string,
    destination: string
  ) {
    pushToDataLayer({
      event: 'conversion_cta_click',
      cta_action: action,
      cta_label: label,
      cta_destination: destination,
    });
  },

  /**
   * Page view tracking on virtual route changes
   */
  trackPageView(pageTitle: string, pagePath: string) {
    pushToDataLayer({
      event: 'page_view',
      page_title: pageTitle,
      page_location: window.location.href,
      page_path: pagePath,
    });
  },
};
