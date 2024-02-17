import { Document } from "@contentful/rich-text-types";

export interface Recipe {
    fields: Fields,
    sys: Sys
}

interface Sys {
    id: string
}

interface Fields {
    title: string
    slug: string
    thumbnail: ImageProps
    featureImage: ImageProps
    ingredients: string[]
    cookingTime: number
    method: Document
}

interface ImageProps {
    fields: ImageFields
}

interface ImageFields {
    title: string
    file: File
}

interface File {
    url: string
    details: Details
    fileName: string
    contentType: string
}

interface Details {
    size: number
    image: Image
}

interface Image {
    width: number
    height: number
}
