interface BlogPost {
    title: string;
    coverImage: string;
    date: Date;
    excerpt: string;
    author: Author;
    ogImage?: OgImage;
    slug: string;
    tags?: string[];
    technologies?: string[];
    content: string;
}

interface Author {
    name: string;
    picture: string;
}

interface OgImage {
    url: string;
}

export type { BlogPost, Author, OgImage }