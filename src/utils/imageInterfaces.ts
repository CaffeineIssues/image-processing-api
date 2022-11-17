export interface FileImage {
    owner: string
    image: unknown
    width: number
    height: number
}

export interface BufferImage {
    owner: string
    image: Buffer
    width: number
    height: number
}

export interface StringImage {
    owner: string
    image: string
    width: number
    height: number
}
