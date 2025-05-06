import { faker } from "@faker-js/faker";

export const generateCategory = () => ({
  id: faker.string.uuid(),
  name: faker.helpers.arrayElement([
    "Technology",
    "Business",
    "Health",
    "Travel",
    "Food",
  ]),
  slug: faker.helpers.slugify(faker.lorem.word()),
});

export const generateFakePosts = (count = 5) => {
  return Array.from({ length: count }, (_, i) => ({
    title: faker.lorem.sentence(),
    date: faker.date.recent({ days: 30 }).toISOString(),
    excerpt: `<p>${faker.lorem.paragraphs(1)}</p>`,
    slug: faker.helpers.slugify(faker.lorem.words(3)),
    image: `https://picsum.photos/400/300?random=${i}`,
    author: faker.person.fullName(),
    category: generateCategory(),
  }));
};
