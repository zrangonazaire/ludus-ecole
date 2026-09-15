package ci.company.eduops.payment;

import ci.company.eduops.payment.domain.PaymentMethod;
import ci.company.eduops.payment.dto.request.PaymentCreateRequest;
import jakarta.validation.Validation;
import org.junit.jupiter.api.Test;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.UUID;
import static org.junit.jupiter.api.Assertions.*;

class PaymentRequestTest {
    private PaymentCreateRequest request() {
        var request = new PaymentCreateRequest();
        request.setStudentId(UUID.randomUUID());
        request.setOperationId(UUID.randomUUID().toString());
        request.setPaymentMethod(PaymentMethod.CASH);
        request.setAmount(new BigDecimal("1500.25"));
        return request;
    }

    private boolean valid(PaymentCreateRequest request) {
        try (var factory = Validation.buildDefaultValidatorFactory()) {
            return factory.getValidator().validate(request).isEmpty();
        }
    }

    @Test void acceptsPaymentWithAutomaticAllocationsAndDefaultDate() {
        assertTrue(valid(request()));
    }

    @Test void rejectsBlankOperationId() {
        var request = request();
        request.setOperationId("  ");
        assertFalse(valid(request));
    }

    @Test void rejectsFutureDate() {
        var request = request();
        request.setPaymentDate(LocalDate.now().plusDays(1));
        assertFalse(valid(request));
    }

    @Test void rejectsAmountsThatWouldBeRoundedOrOverflowStorage() {
        var request = request();
        request.setAmount(new BigDecimal("1.001"));
        assertFalse(valid(request));
        request.setAmount(new BigDecimal("10000000000000"));
        assertFalse(valid(request));
    }

    @Test void rejectsNullAllocationListAndNullItems() {
        var request = request();
        request.setAllocations(null);
        assertFalse(valid(request));
        request.setAllocations(Arrays.asList((ci.company.eduops.payment.dto.request.PaymentAllocationRequest) null));
        assertFalse(valid(request));
    }
}
