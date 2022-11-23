/*
 * Project: Dynamedics Portal Web
 * Created Date: Friday, August 17th 2021, 4:30:28 am
 * Author: Senath Weerasinghe
 * -----

 * Modified By: Senath Weerasinghe at <sweerasinghe@mitrai.com>
 * -----
 * Copyright (c) 2021 Mitra Sparks
 * -----
 * HISTORY:
 * 
 */

export function arrayMoveMutable(array, fromIndex, toIndex) {
  const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

    const [item] = array.splice(fromIndex, 1);
    array.splice(endIndex, 0, item);
  }
}

export function arrayMoveImmutable(array, fromIndex, toIndex) {
  array = [...array];
  arrayMoveMutable(array, fromIndex, toIndex);
  return array;
}
