import axios from "axios";

// Returns CSRF Token from Django template.
export async function getCSRFToken() {
    const {data: {csrfToken}} = await axios.get('/get_csrf_token/');
    return csrfToken;
}