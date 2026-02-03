
export enum ProcessStep {
  IDLE,
  EMBEDDED,
  DECOLORIZED,
  ATTACKED,
  RECONSTRUCTED,
  EXTRACTED,
  ANALYZED
}

export interface Metrics {
  psnr: number | null;
  ssim: number | null;
  ber?: number | null;
  mse?: number | null; // Added Mean Squared Error
}

export type DomainType = 'general' | 'medical' | 'military';
export type AssetRole = 'cover_image' | 'secret_payload' | 'stego_output' | 'reconstructed_cover' | 'extracted_payload';
export type ProcessStatus = 'pending' | 'processing' | 'completed' | 'failed';
export type UserRole = 'admin' | 'sender' | 'receiver' | 'auditor';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  domainAccess: DomainType[]; // RBAC
  clearanceLevel: number; // 1-4
  createdAt: string;
  lastLogin?: string;
}

export interface Project {
  id: string;
  userId: string;
  domain: DomainType;
  title?: string;
  description?: string;
  status: ProcessStatus;
  embeddingTechnique: string;
  createdAt: string;
  updatedAt: string;
}

export interface EncryptionMetadata {
  isEncrypted: boolean;
  algorithm?: 'AES-256-GCM';
  wrappedDataKey?: string; // Simulating KMS wrapped key
  iv?: string;
}

export interface Asset {
  id: string;
  projectId: string;
  role: AssetRole;
  originalFilename: string;
  storagePath: string;
  mimeType: string;
  fileSizeBytes: number;
  checksumSha256: string;
  encryption: EncryptionMetadata; // Security metadata
  metadata?: Record<string, any>; // JSONB support
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  username: string; // Denormalized for display
  action: 'LOGIN' | 'LOGOUT' | 'UPLOAD' | 'ENCRYPT' | 'DECRYPT' | 'DOWNLOAD' | 'ACCESS_DENIED';
  resourceId?: string;
  domain?: DomainType;
  details: string;
  timestamp: string;
  status: 'SUCCESS' | 'FAILURE';
}

export interface ExtractionLog {
  id: string;
  stegoAssetId: string;
  extractorUserId: string;
  success: boolean;
  recoveredChecksumSha256?: string;
  notes?: string;
  attemptTimestamp: string;
}
