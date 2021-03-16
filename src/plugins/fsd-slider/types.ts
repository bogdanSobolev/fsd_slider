// interface StringOptionsKeys {
//     [key: string]: string | number | object ;
// }
  
//   interface IDevice extends IObjectKeys {
//     id: number;
//     room_id: number;
//     name: string;
//     type: string;
//     description: string;
//   }

export interface Options {
    mod: string;
    maxValue: number;
    minValue: number;
    value: { left: number, right?: number };
    step: number;
}

export interface UserOptions {
    mod?: string;
    maxValue?: number | string;
    minValue?: number | string;
    value?: number | string | { left: number | string, right: number | string };
    step?: number | string;
}