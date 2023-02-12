export interface imageObject {
    fieldname?: string
    originalname?: string
    encoding?: string
    mimetype?: string
    buffer?: Buffer
    size?: number
}
export interface FileImage {
    owner: string
    image?: unknown
    width?: number
    height?: number
}
