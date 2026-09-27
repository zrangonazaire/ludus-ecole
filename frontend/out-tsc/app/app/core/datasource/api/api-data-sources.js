import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import * as i0 from "@angular/core";
/**
 * Turns a query object into HttpParams, skipping undefined, null and empty
 * values so the backend receives only the filters the user actually set.
 *
 * Accepts any object (not `Record<string, unknown>`) so typed query interfaces
 * such as `PageQuery` can be passed without an index signature.
 */
function toParams(query) {
    let params = new HttpParams();
    Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            params = params.set(key, String(value));
        }
    });
    return params;
}
const API = environment.apiBaseUrl;
export class ApiStudentDataSource {
    http = inject(HttpClient);
    search(query) {
        return this.http.get(`${API}/students`, { params: toParams(query) });
    }
    getById(id) {
        return this.http.get(`${API}/students/${id}`);
    }
    update(id, payload) {
        return this.http.put(`${API}/students/${id}`, payload);
    }
    getEnrollments(studentId) {
        return this.http.get(`${API}/students/${studentId}/history`);
    }
    getFinancialSummary(studentId) {
        return this.http.get(`${API}/students/${studentId}/financial-summary`);
    }
    getReportCards(studentId) {
        return this.http.get(`${API}/students/${studentId}/report-cards`);
    }
    static ɵfac = function ApiStudentDataSource_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiStudentDataSource)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiStudentDataSource, factory: ApiStudentDataSource.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiStudentDataSource, [{
        type: Injectable
    }], null, null); })();
export class ApiEnrollmentDataSource {
    http = inject(HttpClient);
    search(query) {
        return this.http.get(`${API}/enrollments`, { params: toParams(query) });
    }
    check(studentId, classroomId, academicYearId) {
        return this.http.get(`${API}/enrollments/check`, { params: toParams({ studentId, classroomId, academicYearId }) });
    }
    create(payload) {
        return this.http.post(`${API}/enrollments`, payload);
    }
    validate(id) {
        return this.http.post(`${API}/enrollments/${id}/validate`, {});
    }
    update(id, payload) {
        return this.http.put(`${API}/enrollments/${id}`, payload);
    }
    static ɵfac = function ApiEnrollmentDataSource_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiEnrollmentDataSource)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiEnrollmentDataSource, factory: ApiEnrollmentDataSource.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiEnrollmentDataSource, [{
        type: Injectable
    }], null, null); })();
export class ApiClassroomDataSource {
    http = inject(HttpClient);
    list(academicYearId) {
        return this.http.get(`${API}/classrooms`, { params: toParams({ academicYearId }) });
    }
    search(query) {
        return this.http.get(`${API}/classrooms`, { params: toParams(query) });
    }
    getById(id) {
        return this.http.get(`${API}/classrooms/${id}`);
    }
    getStudents(classroomId) {
        return this.http.get(`${API}/classrooms/${classroomId}/students`);
    }
    levelCapacities(academicYearId) {
        return this.http.get(`${API}/classrooms/levels`, { params: toParams({ academicYearId }) });
    }
    create(payload) {
        return this.http.post(`${API}/classrooms`, payload);
    }
    createMany(payload) {
        return this.http.post(`${API}/classrooms/batch`, payload);
    }
    update(id, payload) {
        return this.http.put(`${API}/classrooms/${id}`, payload);
    }
    activate(id) {
        return this.http.post(`${API}/classrooms/${id}/activate`, {});
    }
    close(id, reason) {
        return this.http.post(`${API}/classrooms/${id}/close`, {}, { params: toParams({ reason }) });
    }
    static ɵfac = function ApiClassroomDataSource_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiClassroomDataSource)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiClassroomDataSource, factory: ApiClassroomDataSource.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiClassroomDataSource, [{
        type: Injectable
    }], null, null); })();
export class ApiTeacherDataSource {
    http = inject(HttpClient);
    create(payload) {
        return this.http.post(`${API}/teachers`, payload);
    }
    search(query) {
        return this.http.get(`${API}/teachers`, { params: toParams(query) });
    }
    /** Le tableau : comptes au profil Enseignant + fiches sans compte. */
    roster(query) {
        return this.http.get(`${API}/teachers/roster`, { params: toParams(query) });
    }
    getById(id) {
        return this.http.get(`${API}/teachers/${id}`);
    }
    /** The server derives the classes from the authenticated teacher (section 66). */
    myClasses() {
        return this.http.get(`${API}/teacher/classes`);
    }
    static ɵfac = function ApiTeacherDataSource_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiTeacherDataSource)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiTeacherDataSource, factory: ApiTeacherDataSource.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiTeacherDataSource, [{
        type: Injectable
    }], null, null); })();
export class ApiAttendanceDataSource {
    http = inject(HttpClient);
    day(date) {
        return this.http.get(`${API}/attendance/day`, { params: toParams({ date }) });
    }
    lessons(classroomId, date) {
        return this.http.get(`${API}/attendance/lessons`, { params: toParams({ classroomId, date }) });
    }
    openSheet(classroomId, date, subjectId) {
        return this.http.get(`${API}/attendance/sheet`, { params: toParams({ classroomId, date, subjectId }) });
    }
    /** The idempotency key makes an offline replay safe (section 80). */
    submitSheet(sheet, idempotencyKey) {
        return this.http.post(`${API}/attendance`, {
            classroomId: sheet.classroomId,
            sessionDate: sheet.sessionDate,
            subjectId: sheet.subjectId,
            startTime: sheet.startTime,
            endTime: sheet.endTime,
            idempotencyKey,
            // Only the marks travel: the counters are the server's to compute, and a
            // client that sent its own would let a stale tab rewrite the totals.
            records: sheet.records.map((record) => ({
                studentId: record.studentId,
                status: record.status,
                arrivalTime: record.arrivalTime,
                departureTime: record.departureTime,
                minutesLate: record.minutesLate,
                reason: record.reason
            }))
        });
    }
    absences(query) {
        return this.http.get(`${API}/attendance/absences`, { params: toParams(query) });
    }
    justify(attendanceId, payload) {
        return this.http.post(`${API}/attendance/${attendanceId}/justify`, payload);
    }
    remind(attendanceId) {
        return this.http.post(`${API}/attendance/${attendanceId}/remind`, {});
    }
    static ɵfac = function ApiAttendanceDataSource_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiAttendanceDataSource)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiAttendanceDataSource, factory: ApiAttendanceDataSource.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiAttendanceDataSource, [{
        type: Injectable
    }], null, null); })();
export class ApiGradeDataSource {
    http = inject(HttpClient);
    board(query) {
        return this.http.get(`${API}/assessments`, { params: toParams(query) });
    }
    createAssessment(payload) {
        return this.http.post(`${API}/assessments`, payload);
    }
    updateAssessment(id, payload) {
        return this.http.put(`${API}/assessments/${id}`, payload);
    }
    changeStatus(id, target) {
        return this.http.post(`${API}/assessments/${id}/status`, {}, { params: toParams({ target }) });
    }
    gradeSheet(assessmentId) {
        return this.http.get(`${API}/assessments/${assessmentId}/grades`);
    }
    saveGrades(assessmentId, entries) {
        return this.http.put(`${API}/assessments/${assessmentId}/grades`, { entries });
    }
    submitGrades(assessmentId) {
        return this.http.post(`${API}/assessments/${assessmentId}/submit`, {});
    }
    validateGrades(assessmentId) {
        return this.http.post(`${API}/assessments/${assessmentId}/validate`, {});
    }
    publishGrades(assessmentId) {
        return this.http.post(`${API}/assessments/${assessmentId}/publish`, {});
    }
    correctGrade(gradeId, payload) {
        return this.http.post(`${API}/assessments/grades/${gradeId}/correct`, payload);
    }
    static ɵfac = function ApiGradeDataSource_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiGradeDataSource)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiGradeDataSource, factory: ApiGradeDataSource.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiGradeDataSource, [{
        type: Injectable
    }], null, null); })();
export class ApiFinanceDataSource {
    http = inject(HttpClient);
    searchPayments(query) {
        return this.http.get(`${API}/payments`, { params: toParams(query) });
    }
    recordPayment(payload) {
        return this.http.post(`${API}/payments`, payload);
    }
    getPayment(id) {
        return this.http.get(`${API}/payments/${id}`);
    }
    cancelPayment(id, reason) {
        return this.http.post(`${API}/payments/${id}/cancel`, { reason });
    }
    getStudentSummary(studentId) {
        return this.http.get(`${API}/students/${studentId}/financial-summary`);
    }
    outstanding(query) {
        return this.http.get(`${API}/outstanding`, { params: toParams(query) });
    }
    discountRequests(query = {}) {
        return this.http.get(`${API}/finance/discount-requests`, { params: toParams(query) });
    }
    discountRequest(id) {
        return this.http.get(`${API}/finance/discount-requests/${id}`);
    }
    createDiscountRequest(payload) {
        return this.http.post(`${API}/finance/discount-requests`, payload);
    }
    decideDiscountRequest(id, payload) {
        return this.http.post(`${API}/finance/discount-requests/${id}/decision`, payload);
    }
    applyDiscountRequest(id) {
        return this.http.post(`${API}/finance/discount-requests/${id}/apply`, {});
    }
    static ɵfac = function ApiFinanceDataSource_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiFinanceDataSource)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiFinanceDataSource, factory: ApiFinanceDataSource.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiFinanceDataSource, [{
        type: Injectable
    }], null, null); })();
export class ApiDashboardDataSource {
    http = inject(HttpClient);
    load(academicYearId, campusId) {
        return this.http.get(`${API}/dashboard`, { params: toParams({ academicYearId, campusId }) });
    }
    static ɵfac = function ApiDashboardDataSource_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiDashboardDataSource)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiDashboardDataSource, factory: ApiDashboardDataSource.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiDashboardDataSource, [{
        type: Injectable
    }], null, null); })();
export class ApiReportCardDataSource {
    http = inject(HttpClient);
    batch(query) {
        return this.http.get(`${API}/report-cards`, { params: toParams(query) });
    }
    generate(payload) {
        return this.http.post(`${API}/report-cards/generate`, payload);
    }
    getById(reportCardId) {
        return this.http.get(`${API}/report-cards/${reportCardId}`);
    }
    remark(reportCardId, payload) {
        return this.http.put(`${API}/report-cards/${reportCardId}/remarks`, payload);
    }
    publish(reportCardId) {
        return this.http.post(`${API}/report-cards/${reportCardId}/publish`, {});
    }
    publishAll(query) {
        return this.http.post(`${API}/report-cards/publish`, {}, { params: toParams(query) });
    }
    verify(code) {
        return this.http.get(`${API}/report-cards/verify`, { params: toParams({ code }) });
    }
    static ɵfac = function ApiReportCardDataSource_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiReportCardDataSource)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiReportCardDataSource, factory: ApiReportCardDataSource.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiReportCardDataSource, [{
        type: Injectable
    }], null, null); })();
export class ApiCouncilDataSource {
    http = inject(HttpClient);
    list(query = {}) {
        return this.http.get(`${API}/councils`, { params: toParams(query) });
    }
    get(councilId) {
        return this.http.get(`${API}/councils/${councilId}`);
    }
    create(payload) {
        return this.http.post(`${API}/councils`, payload);
    }
    update(councilId, payload) {
        return this.http.put(`${API}/councils/${councilId}`, payload);
    }
    start(councilId) {
        return this.http.post(`${API}/councils/${councilId}/start`, {});
    }
    close(councilId) {
        return this.http.post(`${API}/councils/${councilId}/close`, {});
    }
    addParticipant(councilId, payload) {
        return this.http.post(`${API}/councils/${councilId}/participants`, payload);
    }
    removeParticipant(councilId, participantId) {
        return this.http.delete(`${API}/councils/${councilId}/participants/${participantId}`);
    }
    setParticipantPresence(councilId, participantId, present) {
        return this.http.put(`${API}/councils/${councilId}/participants/${participantId}/presence`, {}, { params: toParams({ present }) });
    }
    recordDecision(councilId, payload) {
        return this.http.post(`${API}/councils/${councilId}/decisions`, payload);
    }
    static ɵfac = function ApiCouncilDataSource_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiCouncilDataSource)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiCouncilDataSource, factory: ApiCouncilDataSource.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiCouncilDataSource, [{
        type: Injectable
    }], null, null); })();
export class ApiOptionDataSource {
    http = inject(HttpClient);
    overview() {
        return this.http.get(`${API}/options`);
    }
    create(payload) {
        return this.http.post(`${API}/options`, payload);
    }
    update(optionId, payload) {
        return this.http.put(`${API}/options/${optionId}`, payload);
    }
    archive(optionId) {
        return this.http.delete(`${API}/options/${optionId}`);
    }
    saveOfferings(optionId, payload) {
        return this.http.put(`${API}/options/${optionId}/offerings`, payload);
    }
    choices(query) {
        return this.http.get(`${API}/options/choices`, { params: toParams(query) });
    }
    assign(payload) {
        return this.http.post(`${API}/options/choices`, payload);
    }
    changeChoiceStatus(choiceId, status) {
        return this.http.put(`${API}/options/choices/${choiceId}/status`, { status });
    }
    static ɵfac = function ApiOptionDataSource_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiOptionDataSource)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiOptionDataSource, factory: ApiOptionDataSource.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiOptionDataSource, [{
        type: Injectable
    }], null, null); })();
export class ApiTransferDataSource {
    http = inject(HttpClient);
    board(search) {
        return this.http.get(`${API}/transfers`, { params: toParams({ search }) });
    }
    changeClass(payload) {
        return this.http.post(`${API}/transfers/class-change`, payload);
    }
    recordDeparture(payload) {
        return this.http.post(`${API}/transfers/departures`, payload);
    }
    updateDocuments(departureId, payload) {
        return this.http.put(`${API}/transfers/departures/${departureId}/documents`, payload);
    }
    clearDeparture(departureId) {
        return this.http.post(`${API}/transfers/departures/${departureId}/clear`, {});
    }
    cancelDeparture(departureId, reason) {
        return this.http.post(`${API}/transfers/departures/${departureId}/cancel`, { reason });
    }
    static ɵfac = function ApiTransferDataSource_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiTransferDataSource)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiTransferDataSource, factory: ApiTransferDataSource.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiTransferDataSource, [{
        type: Injectable
    }], null, null); })();
export class ApiReferenceDataSource {
    http = inject(HttpClient);
    academicYears() {
        return this.http.get(`${API}/academic-years`);
    }
    terms(academicYearId) {
        return this.http.get(`${API}/academic-years/${academicYearId}/terms`);
    }
    subjects() {
        return this.http.get(`${API}/subjects`);
    }
    globalSearch(term) {
        return this.http.get(`${API}/search`, { params: toParams({ q: term }) });
    }
    static ɵfac = function ApiReferenceDataSource_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiReferenceDataSource)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiReferenceDataSource, factory: ApiReferenceDataSource.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiReferenceDataSource, [{
        type: Injectable
    }], null, null); })();
export class ApiTimetableDataSource {
    http = inject(HttpClient);
    classroomGrid(classroomId) {
        return this.http.get(`${API}/timetables/classroom/${classroomId}`);
    }
    teacherGrid(teacherId) {
        return this.http.get(`${API}/timetables/teacher/${teacherId}`);
    }
    roomGrid(roomId) {
        return this.http.get(`${API}/timetables/room/${roomId}`);
    }
    palette(classroomId) {
        return this.http.get(`${API}/timetables/classroom/${classroomId}/palette`);
    }
    check(payload, excludeSlotId) {
        return this.http.post(`${API}/timetables/slots/check`, payload, { params: toParams({ excludeSlotId }) });
    }
    createSlot(payload) {
        return this.http.post(`${API}/timetables/slots`, payload);
    }
    updateSlot(slotId, payload) {
        return this.http.put(`${API}/timetables/slots/${slotId}`, payload);
    }
    deleteSlot(slotId) {
        return this.http.delete(`${API}/timetables/slots/${slotId}`);
    }
    publish(classroomId) {
        return this.http.post(`${API}/timetables/classroom/${classroomId}/publish`, {});
    }
    settings() {
        return this.http.get(`${API}/timetables/settings`);
    }
    updateSettings(payload) {
        return this.http.put(`${API}/timetables/settings`, payload);
    }
    static ɵfac = function ApiTimetableDataSource_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiTimetableDataSource)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiTimetableDataSource, factory: ApiTimetableDataSource.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiTimetableDataSource, [{
        type: Injectable
    }], null, null); })();
export class ApiCurriculumDataSource {
    http = inject(HttpClient);
    listSubjects(includeArchived = false) {
        return this.http.get(`${API}/subjects`, { params: toParams({ includeArchived }) });
    }
    createSubject(payload) {
        return this.http.post(`${API}/subjects`, payload);
    }
    updateSubject(id, payload) {
        return this.http.put(`${API}/subjects/${id}`, payload);
    }
    archiveSubject(id) {
        return this.http.post(`${API}/subjects/${id}/archive`, {});
    }
    restoreSubject(id) {
        return this.http.post(`${API}/subjects/${id}/restore`, {});
    }
    levels() {
        return this.http.get(`${API}/curriculum/levels`);
    }
    upsertLevelSubject(levelId, payload) {
        return this.http.put(`${API}/curriculum/levels/${levelId}/subjects`, payload);
    }
    removeLevelSubject(levelId, subjectId) {
        return this.http.delete(`${API}/curriculum/levels/${levelId}/subjects/${subjectId}`);
    }
    apply(payload) {
        return this.http.post(`${API}/curriculum/apply`, payload);
    }
    static ɵfac = function ApiCurriculumDataSource_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiCurriculumDataSource)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiCurriculumDataSource, factory: ApiCurriculumDataSource.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiCurriculumDataSource, [{
        type: Injectable
    }], null, null); })();
export class ApiFeeDataSource {
    http = inject(HttpClient);
    listTypes() {
        return this.http.get(`${API}/fees/types`);
    }
    createType(payload) {
        return this.http.post(`${API}/fees/types`, payload);
    }
    updateType(id, payload) {
        return this.http.put(`${API}/fees/types/${id}`, payload);
    }
    archiveType(id) {
        return this.http.post(`${API}/fees/types/${id}/archive`, {});
    }
    levels() {
        return this.http.get(`${API}/fees/levels`);
    }
    saveSchedule(payload) {
        return this.http.put(`${API}/fees/schedules`, payload);
    }
    deleteSchedule(scheduleId) {
        return this.http.delete(`${API}/fees/schedules/${scheduleId}`);
    }
    apply(payload) {
        return this.http.post(`${API}/fees/apply`, payload);
    }
    static ɵfac = function ApiFeeDataSource_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiFeeDataSource)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiFeeDataSource, factory: ApiFeeDataSource.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiFeeDataSource, [{
        type: Injectable
    }], null, null); })();
export class ApiHealthDataSource {
    http = inject(HttpClient);
    board(search) {
        return this.http.get(`${API}/health`, { params: toParams({ search }) });
    }
    record(studentId) {
        return this.http.get(`${API}/health/records/${studentId}`);
    }
    saveRecord(payload) {
        return this.http.put(`${API}/health/records`, payload);
    }
    addCondition(payload) {
        return this.http.post(`${API}/health/conditions`, payload);
    }
    updateCondition(conditionId, payload) {
        return this.http.put(`${API}/health/conditions/${conditionId}`, payload);
    }
    resolveCondition(conditionId) {
        return this.http.put(`${API}/health/conditions/${conditionId}/resolve`, {});
    }
    recordVisit(payload) {
        return this.http.post(`${API}/health/visits`, payload);
    }
    notifyGuardian(visitId) {
        return this.http.put(`${API}/health/visits/${visitId}/notify`, {});
    }
    saveVaccination(payload) {
        return this.http.put(`${API}/health/vaccinations`, payload);
    }
    vaccines() {
        return this.http.get(`${API}/health/vaccines`);
    }
    planExamination(payload) {
        return this.http.post(`${API}/health/examinations`, payload);
    }
    recordExamination(examinationId, payload) {
        return this.http.put(`${API}/health/examinations/${examinationId}`, payload);
    }
    static ɵfac = function ApiHealthDataSource_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiHealthDataSource)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiHealthDataSource, factory: ApiHealthDataSource.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiHealthDataSource, [{
        type: Injectable
    }], null, null); })();
export class ApiFamilyRequestDataSource {
    http = inject(HttpClient);
    board(query) {
        return this.http.get(`${API}/family-requests`, { params: toParams(query) });
    }
    create(payload) {
        return this.http.post(`${API}/family-requests`, payload);
    }
    update(requestId, payload) {
        return this.http.patch(`${API}/family-requests/${requestId}`, payload);
    }
    static ɵfac = function ApiFamilyRequestDataSource_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiFamilyRequestDataSource)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiFamilyRequestDataSource, factory: ApiFamilyRequestDataSource.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiFamilyRequestDataSource, [{
        type: Injectable
    }], null, null); })();
// ---- Level data source ----
export class ApiLevelDataSource {
    http = inject(HttpClient);
    base = `${API}/levels`;
    list(includeArchived = false) {
        let params = new HttpParams();
        if (includeArchived) {
            params = params.set('includeArchived', 'true');
        }
        return this.http.get(this.base, { params });
    }
    get(id) {
        return this.http.get(this.base + '/' + id);
    }
    create(payload) {
        return this.http.post(this.base, payload);
    }
    update(id, payload) {
        return this.http.put(this.base + '/' + id, payload);
    }
    archive(id) {
        return this.http.post(this.base + '/' + id + '/archive', {});
    }
    restore(id) {
        return this.http.post(this.base + '/' + id + '/restore', {});
    }
    static ɵfac = function ApiLevelDataSource_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiLevelDataSource)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiLevelDataSource, factory: ApiLevelDataSource.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiLevelDataSource, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=api-data-sources.js.map