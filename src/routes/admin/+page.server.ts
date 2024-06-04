import { fail } from '@sveltejs/kit';
import { WithAuth, auth0Client, configureClient } from '../../services/oauthClient';
import type { Movie } from '../../types/movie';
import type { PageServerLoad } from './$types';
import { addMovie } from '../../services/supabaseClient';

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async () => {
    // const auth = WithAuth();
    // await auth.login();
    return {};
};

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const title = data.get('title');
        const rating = data.get('rating');
        const more_info = data.get('more_info');
        const is_movie = data.get('is_movie');
        const service: string[] = data.get('service')?.split(',');
        const genre: string[] = data.get('genre')?.split(',');

        if (!title) {
            return fail(400, { title, missing: true });
        }

        if (!rating) {
            return fail(400, { rating, missing: true });
        }


        const movie: Movie = {
            title: title.toString(),
            genres: genre,
            rating: rating.toString(),
            more_info: more_info.toString(),
            service: service,
            id: undefined,
            is_movie: is_movie,
            created_at: undefined,
            updated_at: undefined
        };
        try {
            await addMovie(movie);
            return { success: true };
        } catch (error) {
            console.error(error);
            return fail(500, { error });
        }
    }
};
