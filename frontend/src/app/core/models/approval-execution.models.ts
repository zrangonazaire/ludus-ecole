export interface ApprovalVote {
  userId: string; name: string; decision?: 'APPROVED' | 'REJECTED';
  comment?: string; decidedAt?: string;
}
export interface ApprovalStage {
  code: string; mode: 'ALL' | 'ONE'; status: string; members: ApprovalVote[];
}
export interface ApprovalExecution {
  id: string; operation: string; label: string; circuitName: string;
  status: 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'EFFECTIVE';
  currentLevel: number; stages: ApprovalStage[];
  payload: { input?: Record<string, unknown>; targetId?: string; academicYearId?: string };
  createdBy: string; createdAt: string; effectiveAt?: string; awaitingMyDecision: boolean;
}
