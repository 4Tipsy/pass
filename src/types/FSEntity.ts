export default interface FSEntity {
  name: string;
  type: 'file' | 'folder';
  fileType?: 'img' | 'txt' | 'other';
  sizeInMB?: number;
}