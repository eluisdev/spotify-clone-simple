export type albumData = {
    id: number;
    name: string;
    image: string;
    desc: string;
    bgColour: string;
}

export type albumsData = albumData[]

export type albumDB = Omit<albumData,'id'> & {
    _id : string
}
export type songData = {
    id: number;
    name: string;
    image: string;
    file: string;
    desc: string;
    duration: string;
}

export type songsData = songData[]

export type songDataDB = Omit<songData,'id'> & {
    _id: string,
    album: string,
    __v:number
}

export type typeTime = {
    currentTime: {
        second: number,
        minute: number
    },
    totalTime: {
        second: number,
        minute: number
    }
}