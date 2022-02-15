import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { generate } from "generate-password";
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

const shuffleArray = (a: any) => {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

export const getBulkAddresses = (count: number) => {
  const completeAddresses = addresses.filter((address) => !!address.city);
  const shuffledAddresses = shuffleArray(completeAddresses) as RandomAddress[];
  return shuffledAddresses.slice(0, count);
};

export const generatePerson = ({
  age,
  sex,
  passwordLength,
  minAge,
  maxAge,
  userAddress,
}: {
  age?: number;
  sex?: string;
  passwordLength?: number;
  minAge?: number;
  maxAge?: number;
  userAddress?: RandomAddress;
}) => {
  const ageFromRange =
    minAge && maxAge ? randomAge(minAge, maxAge) : randomAge(18, 62);
  age = age || ageFromRange;
  sex = sex || flipCoin("male", "female");
  passwordLength = passwordLength || 12;

  return {
    age: age,
    dateOfBirth: getDateOfBirth(age),
    firstName: faker.name.firstName(sex),
    lastName: faker.name.lastName("male"),
    middleName: getMiddleNameInitial(),
    phoneNumber: faker.phone.phoneNumber("!##-!##-####"),
    address: userAddress || getRandomAddress(),
    job: faker.name.jobTitle(),
    username: faker.internet.userName(),
    password: generate({
      length: passwordLength,
      numbers: true,
      uppercase: true,
    }),
  };
};
