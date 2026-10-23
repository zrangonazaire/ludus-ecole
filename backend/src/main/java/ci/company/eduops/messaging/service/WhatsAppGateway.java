package ci.company.eduops.messaging.service;

/** Business messaging channel backed by the WhatsApp Cloud API when configured. */
public interface WhatsAppGateway {
    String send(String phone, String body);
    boolean isLive();
    String describe();
}
