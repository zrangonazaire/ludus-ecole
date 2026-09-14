import { Level, LevelUpsertPayload } from '@core/models/domain.models';
import {
  AttendanceDataSource, ClassroomDataSource, TimetableDataSource, CurriculumDataSource, FeeDataSource, DashboardDataSource, EnrollmentDataSource,
  FinanceDataSource, GradeDataSource, ReferenceDataSource, StudentDataSource, TeacherDataSource,
  ReportCardDataSource, OptionDataSource, TransferDataSource, HealthDataSource,
  FamilyRequestDataSource, CouncilDataSource
} from '../data-source';

@Injectable()
export class ApiLevelDataSource implements LevelDataSource {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiBaseUrl + '/api/v1/levels';

  list(): Observable<Level[]> { return this.http.get<Level[]>(this.base); }
  get(id: string): Observable<Level> { return this.http.get<Level>(this.base + '/' + id); }
  create(payload: LevelUpsertPayload): Observable<Level> { return this.http.post<Level>(this.base, payload); }
  update(id: string, payload: LevelUpsertPayload): Observable<Level> { return this.http.put<Level>(this.base + '/' + id, payload); }
  archive(id: string): Observable<Level> { return this.http.post<Level>(this.base + '/' + id + '/archive', {}); }
  restore(id: string): Observable<Level> { return this.http.post<Level>(this.base + '/' + id + '/restore', {}); }
}