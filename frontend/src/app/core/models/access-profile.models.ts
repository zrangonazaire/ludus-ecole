/** A fine-grained right that can be included in an access profile. */
export interface AccessPermission {
  id: string;
  code: string;
  label: string;
  module: string;
  description?: string;
}

/** A named set of rights assigned to one or more user accounts. */
export interface AccessProfile {
  id: string;
  code: string;
  label: string;
  description?: string;
  systemProfile: boolean;
  editable: boolean;
  permissionCodes: string[];
  permissionCount: number;
  userCount: number;
}

export interface AccessProfileOverview {
  profiles: AccessProfile[];
  permissions: AccessPermission[];
}

export interface AccessProfilePayload {
  code: string;
  label: string;
  description?: string;
  permissionCodes: string[];
}
