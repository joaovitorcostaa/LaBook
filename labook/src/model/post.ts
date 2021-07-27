export enum POST_TYPES {
    NORMAL = 'normal',
    EVENT = 'event'
 }

export type postData = {
    photo: string,
    description: string,
    created_at: string,
    type: POST_TYPES
 }
 
 export type post = {
    photo: string,
    description: string,
    created_at: string,
    type: POST_TYPES,
    id: string, 
    author_id: string
 }
