import { supabase } from '../utils/supabaseClient'; // Ensure the correct import path

const fetchData = async() => {
    // Fetch Users
    const users = await supabase.from('app_users').select('*');
    console.log('Users:', users);
    //if (userError) console.error('Error fetching users:', userError);
    //else console.log('Users:', users);

    // Fetch Rides
    const { data: rides, error: rideError } = await supabase.from('rides').select('*');
    if (rideError) {
        console.error('Error fetching rides:', rideError);
    } 
    else {
        console.log('Rides:', rides);
    }

    // Fetch Reviews
    const { data: reviews, error: reviewError } = await supabase.from('reviews').select('*');
    if (reviewError) {
        console.error('Error fetching reviews:', reviewError);
    }
    else {
        console.log('Reviews:', reviews);
    }
};

const FetchDataPage = () => {
    insertUser([
        { id: '69665e80-7c58-45d6-90fb-7a8044ad5591', cin: '11111111' , firstname: 'test', lastname: 'tester', phone:'12345678', address: 'address', role:'passanger', 
            profilepictureurl:'testurl', cartegriseurl:'testurl'
        }
      ]);
    fetchData(); // Call the function to fetch data when the page is rendered

    return (
        <div>
            <h1>Fetch Data from Supabase</h1>
            <p>Check the console for fetched data (Users, Rides, and Reviews).</p>
        </div>
    );
};

async function insertUser(usersToInsert) {
    const { data, error } = await supabase
      .from('users')
      .insert(usersToInsert);
  
    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('Inserted data:', data);
    }
  }

export default FetchDataPage; // Make sure this is a default export