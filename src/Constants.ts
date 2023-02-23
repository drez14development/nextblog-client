const dev = "http://localhost:4000"
const prod = "..."

export const API_URL = process.env.NODE_ENV === 'development' ? dev : prod
export const AVATAR_PATH = API_URL + "/uploads/avatars/";
export const POST_IMG_PATH = API_URL + "/uploads/post_images/";