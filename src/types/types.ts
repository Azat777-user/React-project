//-------------- Type for Profile --------------------------------------------------
export type PostType = {
    id: number
    message: string
    likesCount: number
}

type ContactType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactType
    photos: PhotosType
}
//--------------------------------------------------------------------------------------------

//--------------------------- Type for Dialogs -----------------------------------------------

export type DialogType = {
    id: number
    name: string,
}

export type MessageType = {
    id: number
    message: string
}

// -------------------------------------------------------------------------------------------

// -------------------------------------- Users ----------------------------------------------

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
}

// -------------------------------------------------------------------------------------------
