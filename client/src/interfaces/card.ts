export default interface Card {
  _id?: number;
  ownerId?: number;
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  webSite: string;
  image? : {
  businessImgURL?: string;
  businessImgAlt?: string;},
  address? : {
  country: string;
  state?: string;
  city: string;
  street: string;
  houseNumber: string;
  zipcode: string;
}
  postDate? : string
}
