import Imagekit from "@imagekit/nodejs"

const imagekit = new Imagekit({
    publickey :process.env.IMAGEKIT_PUBLIC_KEY,
    privatekey :process.env.IMAGEKIT_PRIVATE_KEY,
    urlendpoint:process.env.IMAGEKIT_URL_ENDPOINT
})

export default imagekit
