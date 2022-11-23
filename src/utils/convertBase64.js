/*
 * Project: Dynamedics Portal Web
 * Created Date: Saturday August 14th 2021
 * Author: Dinusha Madhuranga
 * -----
 * Last Modified: Saturday August 14th 2021 1:17:04 pm
 * Modified By: Dinusha Madhuranga at <dmadhuranga@mitrai.com>
 * -----
 * Copyright (c) 2021 Mitra Sparks
 * -----
 * HISTORY:
 */

export const getBase64FromUrl = async (url) => {
  const data = await fetch(url, {
    headers: {
      'Cache-Control': 'no-cache'
    }
  });
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      const fileValues = reader.result.split(',');
      let contentType = fileValues[0].split(';');
      contentType = contentType[0].substring(5);
      const base64data = { contentType, data: fileValues[1] };
      resolve(base64data);
    };
  });
};

export const getBase64FromFile = (file) => {
  return new Promise((resolve) => {
    let baseURL = '';
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
};

export const convertToBinaryStream = (file, type) => {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    let binary = undefined;
    reader.onload = () => {
      let blobdata = b64toBlob(reader.result.split(',')[1], type, 512);
      resolve(blobdata);
    };
  });
};

const b64toBlob = (b64Data, contentType, sliceSize) => {
  contentType = contentType || 'image/png';
  sliceSize = sliceSize || 512;
  var byteCharacters = atob(b64Data);
  var byteArrays = [];
  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);
    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

export const getBase64FromUrlForDataSets = async (url) => {
  const data = await fetch(url, {
    headers: {
      'Cache-Control': 'no-cache'
    }
  });
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      const fileValues = reader.result.split(',');
      let contentType = fileValues[0].split(';');

      contentType = contentType[0].substring(5);

      if (
        contentType ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        contentType = 'file/xlsx';
      } else if (contentType === 'application/vnd.ms-excel') {
        contentType = 'file/csv';
      }
      const base64data = { contentType, data: fileValues[1] };
      resolve(base64data);
    };
  });
};
