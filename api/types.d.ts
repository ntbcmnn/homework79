export interface Category {
    id: string;
    title: string;
    description: string;
}

export interface Place {
    id: string;
    name: string;
    description: string;
}

export interface Item {
    id: string;
    category_id: string;
    place_id: string;
    name: string;
    description: string;
    image: string | null;
    registration_date: string;
}

export type CategoryMutation = Omit<Category, 'id'>;
export type PlaceMutation = Omit<Place, 'id'>;
export type ItemMutation = Omit<Item, 'id', 'registration_date'>;