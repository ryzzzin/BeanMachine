import getRandomName from './getRandomName';

export default function getRandomFirstName (): string {
  const name = getRandomName();
  return name.split(' ')[0];
}
