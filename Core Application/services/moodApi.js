import axios from "axios";

const baseURL = process.env.MOODSTREAM_API
	? `${process.env.MOODSTREAM_API}/`
	: "https://animo-moodstream.wn.r.appspot.com/";

const moodApi = axios.create({
	baseURL,
	withCredentials: false,
	crossdomain: true,
});

export default moodApi;
