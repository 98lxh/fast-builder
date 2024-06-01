export interface Device {
  name: string
  width: number
  height: number
}

/* 设备列表 */
export const devices: Device[] = [
  { name: 'iPhone 14 Pro Max', width: 414, height: 896 },
  { name: 'iPhone 5/6/7', width: 375, height: 667 },
  { name: 'iPad', width: 768, height: 1024 },
  { name: 'Android', width: 595, height: 842 },
  { name: 'iPhone XR', width: 414, height: 896 },
  { name: 'PC', width: 1200, height: 764 }
];
