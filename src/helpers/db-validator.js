import Client from "../client/client.mdoel.js";

export const existClient = async (email = '') => {
    const existClient = await Client.findOne({ email});
    if (existClient) {
        throw new Error(`The email is ${email}`);
    }
}