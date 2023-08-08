

declare global {

  const SERVER_ADDRESS: string;

  interface Window {

    SERVER_ADDRESS?: string;
  }
}








/* 
  костыль
  хотя какая разница, один хрен .d.ts в сборке не участвуют
  а так хотя бы свг импорты линтер красным отмечать перестанет
  тс глаза зараза мозолит
 */
declare module '*.svg' {
  import React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}