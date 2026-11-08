/** Set PUBLIC_WHATSAPP_PHONE to the country code + number without + or spaces. */
export const WHATSAPP_PHONE = import.meta.env.PUBLIC_WHATSAPP_PHONE || 'PHONE_NUMBER';
export const WHATSAPP_MESSAGE = "Hello, I'm interested in ordering a Suppercard NFC business card for 230 DH. Can you help me?";
export const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
