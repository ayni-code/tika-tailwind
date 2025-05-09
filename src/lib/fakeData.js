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
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    date: faker.date.recent({ days: 30 }).toISOString(),
    excerpt: `<p>${faker.lorem.paragraphs(1)}</p>`,
    slug: faker.helpers.slugify(faker.lorem.words(3)),
    image: `https://picsum.photos/800/400?random=${i}`,
    author: {
      name: faker.person.fullName(),
      avatar: `https://i.pravatar.cc/150?img=${i}`,
      bio: faker.person.bio(),
      slug: faker.helpers.slugify(faker.person.firstName()),
    },
    category: generateCategory(),
    tags: Array.from({ length: 3 }, () => ({
      name: faker.lorem.word(),
      slug: faker.helpers.slugify(faker.lorem.word()),
    })),
    content: generatePostContent(i),
  }));
};

const generatePostContent = (index) => {
  return `
    <div>
      <p>${faker.lorem.paragraphs(2)}</p>
      
      <h2>${faker.lorem.sentence(4)}</h2>
      
      <p>${faker.lorem.paragraphs(3)}</p>
      
      <img src="https://picsum.photos/600/300?random=${
        index + 10
      }" alt="${faker.lorem.sentence(3)}">
      <p class="image-caption">${faker.lorem.sentence()}</p>
      
      <h3>${faker.lorem.sentence(3)}</h3>
      
      <p>${faker.lorem.paragraphs(2)}</p>
      
      
      <blockquote>
        <p>${faker.lorem.sentence()}</p>
        <footer>— ${faker.person.fullName()}</footer>
      </blockquote>
      
      <h2>${faker.lorem.sentence(5)}</h2>
      
      <p>${faker.lorem.paragraphs(2)}</p>
      
      <ul>
        <li>${faker.lorem.sentence()}</li>
        <li>${faker.lorem.sentence()}</li>
        <li>${faker.lorem.sentence()}</li>
      </ul>
    </div>
  `;
};
