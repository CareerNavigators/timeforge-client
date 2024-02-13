export type Column={
    key:string
    title:string
    dataType:string
}
export type Row={
    createdAt:string
    email:string
    name:string
    role:string
    totalMeeting:string
    _id:string
}
export type User= {
    _id: string
    name: string
    email: string
    img_cover: string
    location: string
    timeZone: string
    img_profile: string
    desc: string
    createdAt: string
    updatedAt: string
    __v: number
    phone: string
    role: string
    totalMeeting: number
  }