import { faker } from "@faker-js/faker";

export const generateCategory = () => ({
  id: faker.string.uuid(),
  name: faker.helpers.arrayElement([
    "Tecnología",
    "Negocios",
    "Salud",
    "Viajes",
    "Comida",
    "Educación",
    "Deportes",
    "Entretenimiento",
  ]),
  slug: faker.helpers.slugify(faker.lorem.word()),
  description: faker.lorem.sentence(),
  color: faker.color.rgb(),
  icon: faker.helpers.arrayElement([
    "icon-[mdi--laptop]",
    "icon-[mdi--briefcase]",
    "icon-[mdi--hospital]",
    "icon-[mdi--airplane]",
    "icon-[mdi--food]",
  ]),
});

export const generateAuthor = (index) => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  avatar: `https://i.pravatar.cc/150?img=${index}`,
  bio: faker.person.bio(),
  slug: faker.helpers.slugify(faker.person.firstName()),
  role: faker.person.jobTitle(),
  social: {
    twitter: faker.internet.userName(),
    linkedin: faker.internet.userName(),
    github: faker.internet.userName(),
  },
  joinedAt: faker.date.past({ years: 2 }).toISOString(),
});

export const generateTag = () => ({
  id: faker.string.uuid(),
  name: faker.lorem.word(),
  slug: faker.helpers.slugify(faker.lorem.word()),
  color: faker.color.rgb(),
});

export const generateComment = () => ({
  id: faker.string.uuid(),
  author: {
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
  },
  content: faker.lorem.paragraph(),
  date: faker.date.recent({ days: 7 }).toISOString(),
  likes: faker.number.int({ min: 0, max: 100 }),
});

export const generateFakePosts = (count = 5) => {
  return Array.from({ length: count }, (_, i) => {
    const postId = faker.string.uuid();

    return {
      id: postId,
      title: faker.lorem.sentence(),
      subtitle: faker.lorem.sentence(),
      date: faker.date.recent({ days: 30 }).toISOString(),
      updatedAt: faker.date.recent({ days: 15 }).toISOString(),
      excerpt: `<p>${faker.lorem.paragraphs(1)}</p>`,
      slug: faker.helpers.slugify(faker.lorem.words(3)),
      image: `https://picsum.photos/800/400?random=${i}`,
      imageAlt: faker.lorem.sentence(),
      readingTime: `${faker.number.int({ min: 2, max: 15 })} min read`,
      views: faker.number.int({ min: 100, max: 10000 }),
      likes: faker.number.int({ min: 5, max: 500 }),
      author: generateAuthor(i),
      category: generateCategory(),
      tags: Array.from(
        { length: faker.number.int({ min: 1, max: 5 }) },
        generateTag
      ),
      featured: faker.datatype.boolean({ probability: 0.3 }),
      premium: faker.datatype.boolean({ probability: 0.2 }),
      content: generatePostContent(i),
      comments: Array.from(
        { length: faker.number.int({ min: 0, max: 4 }) },
        generateComment
      ),
      relatedPosts: [],
    };
  });
};

// Generar contenido más rico para los posts
const generatePostContent = (index) => {
  const paragraphs = faker.number.int({ min: 3, max: 8 });
  const headings = faker.number.int({ min: 2, max: 5 });

  let content = `<div>`;

  // Introducción
  content += `<p>${faker.lorem.paragraphs(2)}</p>`;

  // Secciones con encabezados
  for (let i = 0; i < headings; i++) {
    content += `<h${i < 2 ? i + 2 : 3}>${faker.lorem.sentence()}</h${
      i < 2 ? i + 2 : 3
    }>`;
    content += `<p>${faker.lorem.paragraphs(
      faker.number.int({ min: 1, max: 3 })
    )}</p>`;

    // Añadir listas aleatoriamente
    if (faker.datatype.boolean({ probability: 0.4 })) {
      const listItems = faker.number.int({ min: 3, max: 7 });
      content += `<ul>`;
      for (let j = 0; j < listItems; j++) {
        content += `<li>${faker.lorem.sentence()}</li>`;
      }
      content += `</ul>`;
    }

    // Añadir imágenes aleatoriamente
    if (faker.datatype.boolean({ probability: 0.5 })) {
      content += `<img src="https://picsum.photos/600/300?random=${
        index + i * 10
      }" alt="${faker.lorem.sentence()}">`;
      content += `<p class="image-caption">${faker.lorem.sentence()}</p>`;
    }

    // Añadir citas aleatoriamente
    if (faker.datatype.boolean({ probability: 0.3 })) {
      content += `<blockquote><p>${faker.lorem.sentence()}</p><footer>— ${faker.person.fullName()}</footer></blockquote>`;
    }
  }

  // Conclusión
  content += `<h2>${faker.lorem.sentence()}</h2>`;
  content += `<p>${faker.lorem.paragraphs(2)}</p>`;

  content += `</div>`;

  return content;
};

// Función para generar posts relacionados (opcional)
export const generateRelatedPosts = (posts, count = 3) => {
  return faker.helpers
    .shuffle(posts)
    .slice(0, count)
    .map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      image: post.image,
      category: post.category,
      readingTime: post.readingTime,
    }));
};

// Generar datos para la página de inicio
export const generateHomePageData = (postCount = 5) => {
  const posts = generateFakePosts(postCount);

  return {
    featuredPost: posts.find((post) => post.featured) || posts[0],
    popularPosts: faker.helpers.shuffle(posts).slice(0, 3),
    recentPosts: [...posts]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 4),
    categories: Array.from({ length: 5 }, generateCategory),
    tags: Array.from({ length: 10 }, generateTag),
  };
};
