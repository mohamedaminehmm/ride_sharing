import { supabase } from './supabaseClient';

export async function insertUser(usersToInsert) { 
    console.log(usersToInsert);
    const { data, error } = await supabase
        .from('app_users')
        .insert(usersToInsert);

    if (error) {
        console.error('Error inserting data:', error);
    } else {
        console.log('Inserted data:', data);
    }
}

export async function fetchUserByCin(cin) {
    const { data, error } = await supabase
        .from('app_users')
        .select('cin, password')
        .eq('cin', cin)
        .single(); // Ensures only one user is returned (or none)

    if (error) {
        console.error('Error fetching user:', error.message);
        return { retrievedCin: "", retrievedPassword: "" }; // Return empty strings if there's an error
    }

    if (!data) {
        // If no user is found, return empty strings
        return { retrievedCin: "", retrievedPassword: "" };
    }

    return {
        retrievedCin: data.cin,
        retrievedPassword: data.password,
    };
}
