import mongoDB from 'mongodb';

export default interface Project {
    _id: mongoDB.ObjectId,
    title: string,
    tagline: string,
    iconLink: string,
    description: string,
    techStack: string[],
    tags: string[],
    userId?: number // CHNAGE THIS TO REQUIRED.
}