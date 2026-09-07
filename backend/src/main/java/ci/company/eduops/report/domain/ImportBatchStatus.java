package ci.company.eduops.report.domain;

/**
 * Where a batch stands between the upload and the writes.
 *
 * <p>The values follow the column comment written in V28. The flow only ever
 * produces three of them — a file is read, then either confirmed or left
 * alone — but the others are kept so the enum and the schema tell the same
 * story to whoever reads either one.</p>
 */
public enum ImportBatchStatus {

    UPLOADED,
    PARSED,
    VALIDATED,

    /** Read and shown to the user. Nothing has been written yet. */
    PREVIEWED,

    CONFIRMED,

    /** The confirmed rows have been written. The batch is closed. */
    IMPORTED,

    /** Refused before any write: unreadable file, or nothing importable. */
    REJECTED
}
