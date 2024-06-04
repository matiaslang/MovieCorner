export interface Movie {
    id: number | undefined;
    title: string;
    rating: number;
    genres: string[];
    created_at: string | undefined;
    updated_at: string | undefined;
    is_movie: boolean;
    more_info: string;
    service: string[];
}
