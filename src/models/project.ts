import mongoDB from 'mongodb';

export default interface Project {
    _id: mongoDB.ObjectId,
    title: string,
    tagline: string,
    iconLink: string,
    content: Content[]
    userId: number
    url: string,
}


export interface Content {
    title: string,
    contentType: string,
    content: string | string[] | object[]
}