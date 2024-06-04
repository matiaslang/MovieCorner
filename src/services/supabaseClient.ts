
// Create a client to fetch data from supabase
import { createClient } from '@supabase/supabase-js'
import type { Movie } from '../types/movie'

export const supabaseClient = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
)

// Use the client to fetch data
export async function getAll() {
    const { data, error } = await supabaseClient
        .from('movies')
        .select('*')
    if (error) {
        throw error
    }
    return data
}

// Use the client to insert data as a type of movie
export async function addMovie(movie: Movie) {
    const { data, error } = await supabaseClient
        .from('movies')
        .insert(movie)
    if (error) {
        console.log(error)
        throw error
    }
    return data
}
 
