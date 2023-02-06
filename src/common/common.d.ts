export interface IProduct {
    title: string; 
    description: string; 
    price: number; 
    isFavorite: boolean; 
    rating: {
        rate: number; 
        count: number
    } 
}