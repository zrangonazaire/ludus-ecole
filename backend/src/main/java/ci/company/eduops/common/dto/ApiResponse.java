package ci.company.eduops.common.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/** Lightweight acknowledgement returned by command endpoints. */
@Schema(name = "ApiResponse", description = "Simple operation acknowledgement")
public class ApiResponse {

    private boolean success = true;
    private String message;
    private Object data;

    public ApiResponse() {
        // default constructor for serialization
    }

    public ApiResponse(String message) {
        this.message = message;
    }

    public ApiResponse(String message, Object data) {
        this.message = message;
        this.data = data;
    }

    public static ApiResponse ok(String message) {
        return new ApiResponse(message);
    }

    public static ApiResponse ok(String message, Object data) {
        return new ApiResponse(message, data);
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
