import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { urlforback } from '../url';

const upgradetopriz = async () => {
    await loadStripe("pk_test_51Ov0drF5mcrvGlf5LqaVu0ru02vQ6E4nZ5wIJke3z31fqnJTg8uT3wjTJLnjuGSJxumxdR18TzI1cYl3ZDFqkUX000I0Z421r2");
    try {
        const response = await axios.post(`${urlforback}api/upgradeplan`, {
            "token": localStorage.getItem("token"),
        });
        if (response.status === 201) return window.location.href = response.data;
    } catch (error) {
        console.log(error);
    }
}

export default upgradetopriz;