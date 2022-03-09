
/**
 * @description 判断是否为为空值
 * @param value 
 * @returns 
 */
export function isEmptyValue(value: any) {
  if (value === '' || value === null || value === undefined) {
    return true;
  } else if (Array.isArray(value) && value.length === 0) {
    return true;
  } else if (
    typeof value === 'object' &&
    Object.keys(value)?.length === 0 &&
    value.constructor === Object
  ) {
    return true;
  }
  return false;
}
/**
 * @description 传入一个数字，返回数字的金额显示，以英文逗号隔开，每三位一组
 * @param val 
 * @returns 
 */
export function formatMoney(val: string | number): string {
  if (isEmptyValue(val)) return '';
  const num = Number(val);
  if (isNaN(num)) return val.toString();
  return num.toString().replace(/(\d)(?=(\d{3})+($|\.))/g, '$1,');
}
/**
 * @description 金额，每三位分一节 10,000
 * @param val  要分节的数字
 * @returns
 */

export function formatMoneyWithNumeral(val: number): string {
  // 是否有小数
  const point = val?.toString().split('.')?.[1]?.length;

  const formatStr = point === 0 ? '0,0' : '0,0' + '.'.padEnd(point + 1, '0');
  return formatStr;
  // return numeral(val).format(formatStr);
}
/**
 * 乘法，解决js基本运算不精确问题，传入的数转成整数，在进行运算
 * @param {*} num1
 * @param {*} num2
 */
export function mul(num1: number | string, num2: number | string) {
  if (isNaN(Number(num1)) || isNaN(Number(num2))) {
    return;
  }
  let allDecialLen = 0,
    num1Str = num1.toString(),
    num2Str = num2.toString();
  try {
    if (num1Str.split('.')[1]) {
      allDecialLen += num1Str.split('.')[1].length;
    }
  } catch (f) {
    console.error(f);
  }
  try {
    if (num2Str.split('.')[1]) {
      allDecialLen += num2Str.split('.')[1].length;
    }
  } catch (f) {
    console.error(f);
  }
  return (
    (Number(num1Str.replace('.', '')) * Number(num2Str.replace('.', ''))) /
    Math.pow(10, allDecialLen)
  );
}
/**
 * 加法，解决js基本运算不精确问题，传入的数转成整数，在进行运算
 * @param {*} num1
 * @param {*} num2
 */
export function add(num1: number | string, num2: number | string) {
  if (isNaN(Number(num1)) || isNaN(Number(num2))) {
    return;
  }
  let num1DecimalLen = 0;
  let num2DecimalLen = 0;
  let maxDecimalLen;
  try {
    if (num1.toString().split('.')[1]) {
      num1DecimalLen = num1.toString().split('.')[1].length;
    }
  } catch (f) {
    num1DecimalLen = 0;
    console.error(f);
  }
  try {
    if (num2.toString().split('.')[1]) {
      num2DecimalLen = num2.toString().split('.')[1].length;
    }
  } catch (f) {
    num2DecimalLen = 0;
    console.error(f);
  }
  maxDecimalLen = Math.pow(10, Math.max(num1DecimalLen, num2DecimalLen));
  return (mul(num1, maxDecimalLen) + mul(num2, maxDecimalLen)) / maxDecimalLen;
}
/**
 * 减法，解决js基本运算不精确问题，传入的数转成整数，在进行运算
 * @param {*} num1 number
 * @param {*} num2 number
 */

export function sub(num1: number | string, num2: number | string) {
  if (isNaN(Number(num1)) || isNaN(Number(num2))) {
    return;
  }
  let num1DecimalLen = 0;
  let num2DecimalLen = 0;
  let maxDecimalLen;
  try {
    if (num1.toString().split('.')[1]) {
      num1DecimalLen = num1.toString().split('.')[1].length;
    }
  } catch (f) {
    num1DecimalLen = 0;
    console.error(f);
  }
  try {
    if (num2.toString().split('.')[1]) {
      num2DecimalLen = num2.toString().split('.')[1].length;
    }
  } catch (f) {
    num2DecimalLen = 0;
    console.error(f);
  }
  maxDecimalLen = Math.pow(10, Math.max(num1DecimalLen, num2DecimalLen));
  return (mul(num1, maxDecimalLen) - mul(num2, maxDecimalLen)) / maxDecimalLen;
}
/**
 * 除法，解决js基本运算不精确问题，传入的数转成整数，在进行运算
 * @param {*} num1
 * @param {*} num2
 */
function div(num1: number | string, num2: number | string) {
  if (isNaN(Number(num1)) || isNaN(Number(num2))) {
    return;
  }
  let mulNum1,
    mulNum2,
    num1DecimalLen = 0,
    num2DecimalLen = 0;
  try {
    if (num1.toString().split('.')[1]) {
      num1DecimalLen = num1.toString().split('.')[1].length;
    }
  } catch (g) {
    console.error(g);
  }
  try {
    if (num2.toString().split('.')[1]) {
      num2DecimalLen = num2.toString().split('.')[1].length;
    }
  } catch (g) {
    console.error(g);
  }
  mulNum1 = Number(num1.toString().replace('.', ''));
  mulNum2 = Number(num2.toString().replace('.', ''));
  return mul(mulNum1 / mulNum2, Math.pow(10, num2DecimalLen - num1DecimalLen));
}
/**
 * 保留固定的几位小数，不做四舍五入
 * @param {*} num
 * @param {*} decimal
 */
function keepDecimal(num: number | string, decimal: number) {
  let _num = Number(num);
  let _decimal = Number(decimal || 0);
  if (isNaN(_num) || isNaN(_decimal)) {
    return;
  }
  return parseInt(num * Math.pow(10, _decimal)) / Math.pow(10, _decimal);
}
/**
 * @description 去除URL中的域名
 * @param string url
 */
export const wipeDomain = (url: string): string => {
  return url.replace(/^(http|https):\/\/[^/]+/, '');
};
/**
 * @description 根据图片url，获取图片的base64信息
 * @param url 
 * @returns Promise
 */
export const getImageBase64FromUrl = async (url: string) => {
  if (url) {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = decodeURIComponent(url);
      image.setAttribute('crossOrigin', 'Anonymous');
      image.onload = () => {
        const canvas = document.createElement('canvas');
        if (canvas) {
          canvas.width = image.width;
          canvas.height = image.height;
          const ctx: any = (canvas as any).getContext('2d');
          ctx.drawImage(image, 0, 0, image.width, image.height);
          const dataURL = (canvas as HTMLCanvasElement).toDataURL('image/jpeg');
          resolve(dataURL);
        }
      };
      image.onerror = () => {
        resolve(null);
      };
    });
  }
  return Promise.resolve();
};
/**
 * @description 根据图片的base64，获取Blob
 * @param dataURI 
 * @returns Blob
 */
export const dataURItoBlob = (dataURI: string) => {
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]; // mime类型
  const byteString = atob(dataURI.split(',')[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new Blob([intArray], { type: mimeString });
};
/**
 * @description 根据Blob，获取生成file
 * @param dataUrl 图片的base64
   @param fileName 文件名字
 * @returns File|null
 */
export const dataUrlToFile = (
  dataUrl: string,
  fileName: string,
): File | null => {
  const arr = dataUrl.split(',');
  if (arr && arr[0]) {
    const result = arr[0].match(/:(.*?);/);
    if (result && result[1]) {
      const mime = result[1],
        bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], fileName, { type: mime });
    }
  }
  return null;
};