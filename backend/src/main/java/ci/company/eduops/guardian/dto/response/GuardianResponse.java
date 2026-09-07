package ci.company.eduops.guardian.dto.response;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/** Administrative view of a legal representative and their linked pupils. */
public class GuardianResponse {

    private UUID id;
    private String firstName;
    private String lastName;
    private String fullName;
    private String phone;
    private String phoneSecondary;
    private String email;
    private String profession;
    private String city;
    private String preferredChannel;
    private String status;
    private List<LinkedStudent> students = new ArrayList<>();

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getPhoneSecondary() { return phoneSecondary; }
    public void setPhoneSecondary(String phoneSecondary) { this.phoneSecondary = phoneSecondary; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getProfession() { return profession; }
    public void setProfession(String profession) { this.profession = profession; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getPreferredChannel() { return preferredChannel; }
    public void setPreferredChannel(String preferredChannel) { this.preferredChannel = preferredChannel; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public List<LinkedStudent> getStudents() { return students; }
    public void setStudents(List<LinkedStudent> students) { this.students = students; }

    public static class LinkedStudent {
        private UUID id;
        private String name;
        private String studentNumber;

        public LinkedStudent() { }
        public LinkedStudent(UUID id, String name, String studentNumber) {
            this.id = id;
            this.name = name;
            this.studentNumber = studentNumber;
        }
        public UUID getId() { return id; }
        public void setId(UUID id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getStudentNumber() { return studentNumber; }
        public void setStudentNumber(String studentNumber) { this.studentNumber = studentNumber; }
    }
}
