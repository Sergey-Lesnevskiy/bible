import { Timestamp } from 'firebase/firestore';

export const convertFirestoreTimestamps = (data: any) => {
  if (!data) return data;

  if (data instanceof Timestamp) {
    return data.toDate();
  }

  if (Array.isArray(data)) {
    return data.map((item) => {
      if (item instanceof Timestamp) {
        return item.toDate();
      }
      if (
        item &&
        typeof item === 'object' &&
        item.type === 'firestore/timestamp/1.0'
      ) {
        return new Timestamp(item.seconds, item.nanoseconds).toDate();
      }
      return item;
    });
  }

  if (typeof data === 'object') {
    const result: any = {};
    for (const key in data) {
      if (data[key] instanceof Timestamp) {
        result[key] = data[key].toDate();
      } else if (
        data[key] &&
        typeof data[key] === 'object' &&
        data[key].type === 'firestore/timestamp/1.0'
      ) {
        // Для сериализованных Timestamp
        const ts = data[key];
        result[key] = new Timestamp(ts.seconds, ts.nanoseconds).toDate();
      } else if (Array.isArray(data[key])) {
        // Рекурсивно обрабатываем массивы
        result[key] = convertFirestoreTimestamps(data[key]);
      } else {
        result[key] = data[key];
      }
    }
    return result;
  }

  return data;
};
