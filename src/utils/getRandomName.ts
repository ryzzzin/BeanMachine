import names from '@/utils/names';

export default function getRandomName (): string {
  return names[Math.floor(Math.random() * names.length)];
}
