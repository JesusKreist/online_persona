import dayjs from "dayjs";
import { addresses } from "../service/database/addresses-us-all.json";

interface RandomAddress {
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const getMiddleNameInitial = () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
};

export const getRandomAddress = (): RandomAddress => {
  const randomAddress = addresses[Math.floor(Math.random() * addresses.length)];
  if (!randomAddress.city) return getRandomAddress();

  return randomAddress;
};

export const randomAge = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

export const getDateOfBirth = (age: number): string => {
  const today = dayjs();

  const todayInYearOfBirth = today
    .subtract(age, "year")
    .startOf("day")
    .subtract(1, "day");

  let minDate = todayInYearOfBirth
    .subtract(age, "month")
    .add(3, "day")
    .startOf("day");

  const allDates: dayjs.Dayjs[] = [];

  while (
    minDate.isSame(todayInYearOfBirth) ||
    minDate.isBefore(todayInYearOfBirth)
  ) {
    allDates.push(minDate);
    minDate = minDate.add(1, "days");
  }

  const birthDay = allDates[Math.floor(Math.random() * allDates.length)];
  const userAge = Math.floor(today.diff(birthDay, "years", true));

  if (userAge !== age) return getDateOfBirth(age);
  return birthDay.format("MMMM DD, YYYY");
};

export const flipCoin = (value1: any, value2: any) =>
  Math.random() < 0.5 ? value1 : value2;
