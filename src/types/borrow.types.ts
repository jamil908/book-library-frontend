export interface IBorrow {
  _id: string;
  book: string; 
  quantity: number;
  dueDate: string;
  createdAt?: string;
  updatedAt?: string;
}


export interface ICreateBorrow {
  bookId: string;
  quantity: number;
  dueDate: string; 
}


export interface IBorrowSummary {
  _id: string;
  bookTitle: string;
  isbn: string;
  totalQuantity: number;
}