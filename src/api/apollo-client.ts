import { ApolloClient, InMemoryCache } from "@apollo/client";
import {createUploadLink} from 'apollo-upload-client';
import { API_URL } from "../Constants";

const link = createUploadLink({ uri: `${API_URL}/graphql`});

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});

export default client;