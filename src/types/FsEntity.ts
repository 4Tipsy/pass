export default interface FsEntity {
  name: string;
  type: 'file' | 'folder';
  fileType?: 'img' | 'txt' | 'other';
  sizeInMB?: number;
}