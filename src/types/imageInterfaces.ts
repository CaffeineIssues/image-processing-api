export interface imageObject {
    fieldname?: string
    originalname: string
    encoding: string
    mimetype: string
    buffer: Buffer
    size: number
}
export interface FileImage {
    owner: string
    originalName: string
    width?: number
    height?: number
}
