export type TGenre = "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY";

export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: TGenre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// For creating a new book (without _id, timestamps)
export interface ICreateBook {
  title: string;
  author: string;
  genre: TGenre;
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
}

// For updating a book (all fields optional except id)
export interface IUpdateBook {
  id: string;
  title?: string;
  author?: string;
  genre?: TGenre;
  isbn?: string;
  description?: string;
  copies?: number;
  available?: boolean;
}

