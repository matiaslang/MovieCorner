import { getAll } from '../services/supabaseClient';
import type { PageServerLoad } from './$types';

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async () => {
	return {
		movies: await getAll()
	};
};
