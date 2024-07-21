import mongoDB from 'mongodb';

export default interface Project {
    _id: mongoDB.ObjectId,
    title: string,
    tagline: string,
    iconLink: string,
    sections: Section[]
    userId?: number // CHNAGE THIS TO REQUIRED.
}


export interface Section {
    title: string,
    contentType: string,
    content: string | string[] | object[]
}