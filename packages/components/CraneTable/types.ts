export interface TableColumn {
  [key: string]: any;
  title: string;
  key: string;
  type?: '' | 'index';
  width?: number;
  align?: 'left' | 'right' | 'center';
  fixed?: 'left' | 'right';
  buttons?: Buttons[];
}

export interface Pages {
  pageNum: number;
  pageSize: number;
  total?: number;
}

export interface Buttons {
  text: string;
  click: (row: any) => void;
  iif: boolean;
  confirm?: string;
  type: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text';
}

export interface CraneData {
  [key: string]: string;
}
